from __future__ import annotations

import os
import pathlib

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
if "CARBONPLAN_DATA" not in os.environ:
    os.environ["CARBONPLAN_DATA"] = "https://storage.googleapis.com/carbonplan-data"

cat = intake.open_catalog(MASTER_CATALOG_PATH)
