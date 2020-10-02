import numpy as np
import rasterio

grid = "mu_grid.e00"
var = "awc"
band = "awc.bsq"

src_raster = rasterio.open(grid)
profile = src_raster.profile
src_resolution = 1000

tmp_band = src_raster.read(1)
dtype = "uint16" if var == "bd" else "uint8"
f_band = np.fromfile(band, dtype=dtype)
w = src_raster.meta["width"]
h = src_raster.meta["height"]
src_band = f_band.reshape(int(f_band.shape[0] / (w * h)), h, w)

if var == "hsgpct":
    src_band = np.argmax(src_band, axis=0).astype(dtype)

if len(src_band.shape) == 3:
    src_band = src_band[0]

src_band[tmp_band == -2147483647] = 255

profile.update(dtype=rasterio.uint8, driver="GTiff", nodata=255)

with rasterio.open("awc.tif", "w", **profile) as dst:
    dst.write(src_band.astype(rasterio.uint8), 1)
