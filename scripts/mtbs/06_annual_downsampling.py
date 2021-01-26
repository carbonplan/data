import os

import numpy as np
from rio_cogeo.cogeo import cog_translate
from rio_cogeo.profiles import cog_profiles

dst_profile = cog_profiles.get("deflate")

from carbonplan_data.utils import projections, setup

workdir, upload = setup("jeremy")
workdir

resolution = 30

for region in ["conus"]:
    for year in np.arange(1984, 2019):
        source = (workdir / f"raw/mtbs/{region}/30m/{year}.tif").as_posix()
        print(source)
        crs, extent = projections("albers", region)
        resampling = "nearest"
        cmd = ("gdalwarp " "-t_srs '%s' " "-te %s " "-tr %s %s " "-r %s " "%s " "%s") % (
            crs,
            extent,
            resolution,
            resolution,
            resampling,
            source,
            "./raster.tif",
        )
        os.system(cmd)
        cog_translate("./raster.tif", f"./{year}.tif", dst_profile)
        os.remove("./raster.tif")
