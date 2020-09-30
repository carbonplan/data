import os
import warnings

import intake

MASTER_CATALOG = "https://raw.githubusercontent.com/carbonplan/data/master/catalogs/master.yaml"

# open master catalog, in the future, we may want to package the catalogs along side the
# carbonplan-data distribution
try:
    _catalog_env_vars = ["CARBONPLAN_DATA"]
    for v in _catalog_env_vars:
        if os.getenv(v) is None:
            warnings.warn(
                f"{v} environment variable not set, carbonplan.data.cat may not work as expected"
            )

    cat = intake.open_catalog(MASTER_CATALOG)
except:
    cat = intake.catalog.Catalog()
