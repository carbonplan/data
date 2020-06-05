import pathlib

import intake
import pytest

root = pathlib.Path(__file__).parents[1]


def get_master_catalog():
    fname = root / "intake-catalogs" / "master.yaml"
    return intake.open_catalog(fname.as_posix())


@pytest.fixture
def catalog():
    return get_master_catalog()


ALL_ENTRIES = list(get_master_catalog().walk(depth=10))


@pytest.mark.parametrize("dataset_name", ALL_ENTRIES)
def test_get_intake_source(catalog, dataset_name):
    item = catalog[dataset_name]
    if item.container == "catalog":
        item.reload()
    else:
        if item._driver in ["csv", "rasterio", "zarr"]:
            _ = item.to_dask()
        elif item._driver in ["intake_esm.esm_datastore", "parquet"]:
            _ = item.get()
