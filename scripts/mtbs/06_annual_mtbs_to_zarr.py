import numpy as np
import rasterio
import xarray as xr
from numcodecs.zlib import Zlib
from rasterio import Affine
from rasterio.crs import CRS
from rasterio.warp import Resampling, reproject, transform


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
    dst_band = np.zeros(dst_shape, np.float32)
    return dst_band, dst_transform, dst_crs, dst_shape


def calc_coords(shape, trans, crs):
    ny, nx = shape
    x, _ = trans * (np.arange(nx) + 0.5, np.zeros(nx) + 0.5)
    _, y = trans * (np.zeros(ny) + 0.5, np.arange(ny) + 0.5)
    xs, ys = np.meshgrid(x, y)
    lon, lat = transform(crs, {"init": "EPSG:4326"}, xs.flatten(), ys.flatten())

    return {
        "x": xr.DataArray(x, dims=("x",)),
        "y": xr.DataArray(y, dims=("y",)),
        "lat": xr.DataArray(np.asarray(lat).reshape((ny, nx)), dims=("y", "x")),
        "lon": xr.DataArray(np.asarray(lon).reshape((ny, nx)), dims=("y", "x")),
    }


src_nodata = 6
resampling = Resampling.average
resolution = 4000
years = np.arange(1984, 2019)
months = np.arange(1, 13)

for year in years:
    print(f"starting year {year}")
    src_path_year = f"/Users/freeman/workdir/carbonplan-data/raw/mtbs/conus/30m/severity/{year}.tif"

    with rasterio.open(src_path_year, "r") as src_raster_year:
        src_transform = src_raster_year.meta["transform"]
        src_crs = src_raster_year.meta["crs"]
        src_band_year = src_raster_year.read(1)
        src_resolution = resolution

        dst_band, dst_transform, dst_crs, dst_shape = make_dst_band(src_band_year, src_resolution)
        coords = calc_coords(dst_shape, dst_transform, dst_crs)

        for month in months:
            print(f"processing month {month}")
            varname = f"{year}.{month:02n}"
            src_path_month = (
                f"/Users/freeman/workdir/carbonplan-data/raw/mtbs/conus/30m/area/{varname}.tif"
            )

            with rasterio.open(src_path_month, "r") as src_raster_month:
                if month == 1:
                    src_band_month = src_raster_month.read(1)
                else:
                    src_band_month += src_raster_month.read(1)

        src_band_month[src_band_month > 1] = 1
        src_band_tmp = src_band_month * ((src_band_year == 3) | (src_band_year == 4)).astype(
            "uint8"
        )
        src_band_tmp[src_band_year == src_nodata] = src_nodata

        dst_band = dst_band.astype("float32")

        # this seems to require rasterio=1.0.25 and gdal=2.4.2
        reproject(
            src_band_tmp,
            dst_band,
            src_transform=src_transform,
            src_crs=src_crs,
            dst_transform=dst_transform,
            dst_crs=dst_crs,
            resampling=resampling,
            src_nodata=src_nodata,
            dst_nodata=src_raster_year.meta["nodata"],
        )

        meta = src_raster_year.meta
        meta.update(
            width=dst_shape[0],
            height=dst_shape[1],
            dtype=str(dst_band.dtype),
            crs=dst_crs.to_wkt(),
            transform=list(dst_transform),
            nodata=src_raster_year.meta["nodata"],
        )

        chunks = {"x": 512, "y": 512}
        ds = xr.DataArray(dst_band, dims=("y", "x"), attrs=meta).to_dataset(name=f"{year}")
        ds = ds.assign_coords(coords).chunk(chunks)

        ds.to_zarr(f"{year}.zarr", mode="w", encoding={f"{year}": {"compressor": Zlib()}})

# results = []
# for year in years:
#     varname = f'{year}'
#     ds = xr.open_zarr(f'{varname}.zarr')
#     results.append(ds[varname])

# dates = pd.date_range('1984', '2018', freq='YS')
# ds = xr.concat(results, xr.Variable('time', dates))
# ds.name = 'annual'
# ds['x'] = range(len(ds['x']))
# ds['y'] = range(len(ds['y']))
# ds = ds.to_dataset()
# chunks = ({'time': 1, 'x': 1209, 'y': 783})
# ds = ds.chunk(chunks)
# ds.to_zarr(
#     '/Users/freeman/workdir/carbonplan-data/processed/mtbs/conus/4000m/annual.zarr',
#     mode='w', encoding={'annual': {'compressor': Zlib()}}
# )
