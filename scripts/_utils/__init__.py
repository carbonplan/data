import os
import pathlib
import zipfile

import urlpath
import wget
import yaml

root = pathlib.Path(__file__).parents[2]


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
