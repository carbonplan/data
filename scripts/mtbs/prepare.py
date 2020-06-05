import rasterio
import zarr
from numcodecs.zlib import Zlib
from numpy import zeros
from rasterio import Affine
from rasterio.crs import CRS
from rasterio.warp import Resampling, reproject

RAW_PATH = "/Users/freeman/data/treeplan/raw/"
PROCESSED_PATH = "/Users/freeman/github/carbonplan/data/processed/"


def base_crs():
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


def make_dst_band(src_band, src_resolution):
    left = -2493045.0
    right = 2342655.0
    top = 3310005.0
    bottom = 177285.0
    dst_transform = Affine(30.0, 0.0, left, 0.0, -30.0, top)
    dst_resolution = dst_transform[0]
    dst_transform = dst_transform * Affine.scale(
        src_resolution / dst_resolution, src_resolution / dst_resolution
    )
    dst_crs = CRS.from_wkt(base_crs())

    dst_shape = [
        round((top - bottom) / src_resolution),
        round((right - left) / src_resolution),
    ]

    dst_band = zeros(dst_shape, src_band.dtype)
    return dst_band, dst_transform, dst_crs, dst_shape


def prepare_mtbs(year, resolution):
    src_path = RAW_PATH + "MTBS/%s/mtbs_CONUS_%s.tif" % (year, year)
    src_raster = rasterio.open(src_path)
    src_transform = src_raster.meta["transform"]
    src_crs = src_raster.meta["crs"]
    src_band = src_raster.read(1)
    src_resolution = resolution

    dst_band, dst_transform, dst_crs, dst_shape = make_dst_band(src_band, src_resolution)

    if resolution == 30:
        resampling = Resampling.nearest
    elif resolution > 30:
        resampling = Resampling.average
        # set moderate or high burn severity to 1 and others to 1
        src_band_tmp = ((src_band == 3) | (src_band == 4)).astype("uint8")
        # set masked regions to nodata value
        src_band_tmp[src_band == 6] = 6
        src_band = src_band_tmp
        dst_band = dst_band.astype("float32")  # convert to float for averaging
        src_nodata = 6

    reproject(
        src_band,
        dst_band,
        src_transform=src_transform,
        src_crs=src_crs,
        dst_transform=dst_transform,
        dst_crs=dst_crs,
        resampling=resampling,
        src_nodata=src_nodata,
        dst_nodata=src_raster.meta["nodata"],
    )

    meta = src_raster.meta
    meta.update(
        width=dst_shape[0],
        height=dst_shape[1],
        dtype=str(dst_band.dtype),
        crs=dst_crs.to_wkt(),
        transform=list(dst_transform),
        nodata=src_raster.meta["nodata"],
    )

    store = zarr.open(PROCESSED_PATH + "MTBS.%s.%sm.zarr" % (year, resolution), "w")
    store.attrs.put(meta)
    store.array("0", dst_band, chunks=(512, 512), compressor=Zlib())


years = ["%s" % (d + 1984) for d in range(2018 - 1984)]
[prepare_mtbs(year, 500) for year in years]
