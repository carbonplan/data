import os
import pathlib
import warnings

import intake
from pkg_resources import DistributionNotFound, get_distribution

try:
    version = get_distribution(__name__).version
except DistributionNotFound:  # pragma: no cover
    version = "0.0.0"  # pragma: no cover
__version__ = version

CATALOG_DIR_PATH = pathlib.Path(__file__)
MASTER_CATALOG_PATH = str(CATALOG_DIR_PATH.parent / "catalogs/master.yaml")
KNOWN_DATA_LOCATIONS = [
    "https://storage.googleapis.com/carbonplan-data",
    "https://carbonplan.blob.core.windows.net/carbonplan-data",
]

# open master catalog
_catalog_env_vars = ["CARBONPLAN_DATA"]
for v in _catalog_env_vars:
    if os.getenv(v) is None:
        msg = (
            f"{v} environment variable not set, `carbonplan.data.cat` may not work as expected."
            f"Known data locations include: {KNOWN_DATA_LOCATIONS}."
        )
        warnings.warn(msg)

cat = intake.open_catalog(MASTER_CATALOG_PATH)
