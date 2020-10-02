import os
import pathlib
import warnings

import intake

CATALOG_DIR_PATH = pathlib.Path(__file__)
MASTER_CATALOG_PATH = str(CATALOG_DIR_PATH.parent / "catalogs/master.yaml")

# open master catalog
_catalog_env_vars = ["CARBONPLAN_DATA"]
for v in _catalog_env_vars:
    if os.getenv(v) is None:
        warnings.warn(
            f"{v} environment variable not set, carbonplan.data.cat may not work as expected"
        )

cat = intake.open_catalog(MASTER_CATALOG_PATH)
