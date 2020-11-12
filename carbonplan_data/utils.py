import os
import pathlib
import zipfile

import urlpath
import wget
import yaml

root = pathlib.Path(__file__).parents[2]


def projections(name, region):
    if name == "albers":
        if region == "conus":
            crs = albers_conus_crs()
            extent = albers_conus_extent()
        elif region == "ak":
            crs = albers_ak_crs()
            extent = albers_ak_extent()
        else:
            raise ValueError(f'region "{region}" not found')
    else:
        raise ValueError(f'projection "{name}" name not found')
    return crs, extent


def albers_conus_extent():
    return "-2493045.0 177285.0 2342655.0 3310005.0"


def albers_conus_crs():
    return (
        'PROJCS["Albers_Conical_Equal_Area",'
        'GEOGCS["WGS 84",DATUM["WGS_1984",'
        'SPHEROID["WGS 84",6378137,298.257223563,AUTHORITY["EPSG","7030"]],'
        "TOWGS84[0,0,0,-0,-0,-0,0],"
        'AUTHORITY["EPSG","6326"]],'
        'PRIMEM["Greenwich",0,AUTHORITY["EPSG","8901"]],'
        'UNIT["degree",0.0174532925199433,AUTHORITY["EPSG","9122"]],'
        'AUTHORITY["EPSG","4326"]],'
        'PROJECTION["Albers_Conic_Equal_Area"],'
        'PARAMETER["standard_parallel_1",29.5],'
        'PARAMETER["standard_parallel_2",45.5],'
        'PARAMETER["latitude_of_center",23],'
        'PARAMETER["longitude_of_center",-96],'
        'PARAMETER["false_easting",0],'
        'PARAMETER["false_northing",0],'
        'UNIT["meters",1]]'
    )


def albers_conus_transform(res=4000):
    return [res, 0.0, -2493045.0, 0.0, -res, 3310005.0]


def albers_ak_extent():
    return "-2232345.0 344805.0 1494735.0 2380125.0"


def albers_ak_crs():
    return (
        'PROJCS["WGS_1984_Albers",'
        'GEOGCS["WGS 84",DATUM["WGS_1984",'
        'SPHEROID["WGS 84",6378137,298.257223563,AUTHORITY["EPSG","7030"]],'
        'AUTHORITY["EPSG","6326"]],PRIMEM["Greenwich",0],'
        'UNIT["degree",0.0174532925199433],AUTHORITY["EPSG","4326"]],'
        'PROJECTION["Albers_Conic_Equal_Area"],'
        'PARAMETER["standard_parallel_1",55],'
        'PARAMETER["standard_parallel_2",65],'
        'PARAMETER["latitude_of_center",50],'
        'PARAMETER["longitude_of_center",-154],'
        'PARAMETER["false_easting",0],'
        'PARAMETER["false_northing",0],'
        'UNIT["metre",1,AUTHORITY["EPSG","9001"]]]'
    )


def albers_ak_transform(res=4000):
    return [res, 0.0, -2232345.0, 0.0, -res, 2380125.0]


def setup(name):
    if name == "jeremy":
        creds = "/Users/freeman/.config/gcloud/legacy_credentials/jeremy@carbonplan.org/adc.json"
        workdir = pathlib.Path("/Users/freeman/workdir/carbonplan-data/")
    if name == "joe":
        creds = "/Users/jhamman/.config/gcloud/legacy_credentials/joe@carbonplan.org/adc.json"
        workdir = pathlib.Path("/Users/jhamman/workdir/carbonplan_data_downloads/")
    os.environ["GOOGLE_APPLICATION_CREDENTIALS"] = creds

    from google.cloud import storage

    storage.blob._DEFAULT_CHUNKSIZE = 5 * 1024 * 1024  # 5 MB
    storage.blob._MAX_MULTIPART_SIZE = 5 * 1024 * 1024  # 5 MB

    def upload(src, target, bucket="carbonplan-data"):
        storage_client = storage.Client("carbonplan")
        bucket = storage_client.bucket(bucket)
        blob = bucket.blob(target)
        blob.upload_from_filename(src)

    return workdir, upload


def get_sources():

    with open(root / "sources.yaml") as f:
        sources = yaml.load(f, Loader=yaml.FullLoader)

    return sources


def get_workdir(workdir):

    # fallback to cwd
    if workdir is None:
        workdir = os.getcwd()

    # cast to pathlib obj
    if isinstance(workdir, str):
        workdir = pathlib.Path(workdir)

    # make sure workdir exists
    workdir.mkdir(parents=True, exist_ok=True)

    return workdir


def process_sources(name, workdir=None):

    sources = get_sources()
    workdir = get_workdir(workdir)

    results = {"download": [], "unzip": []}

    for key, dset in sources[name]["data"].items():

        # download
        if "download" in dset["actions"]:
            for url in dset["urlpath"]:
                url = urlpath.URL(url)
                out = workdir / url.name
                if not out.exists():
                    print(f"downloading {url}")
                    wget.download(str(url), out=str(out))

                results["download"].append(out)

                # unzip
                if "unzip" in dset["actions"]:
                    outdir = workdir / out.stem
                    if not outdir.exists():
                        outdir.mkdir(parents=True)
                        with zipfile.ZipFile(out, "r") as f:
                            print(f"extracting contents of {out}")
                            f.extractall(outdir)

                    results["unzip"].append(outdir.glob("**/*"))

    return results
