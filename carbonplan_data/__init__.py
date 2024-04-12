from __future__ import annotations

import os
import pathlib
from importlib.metadata import PackageNotFoundError as _PackageNotFoundError
from importlib.metadata import version as _version

import intake

try:
    __version__ = _version(__name__)
except _PackageNotFoundError:
    # package is not installed
    __version__ = "unknown"


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
