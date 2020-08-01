import pathlib

import intake
import pytest

root = pathlib.Path(__file__).parents[1]


def get_master_catalog():
    fname = root / "catalogs" / "master.yaml"
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
    elif item.container in ["xarray", "dataframe"]:

        if item.metadata.get("ci", None) == "skip":
            pytest.skip("dataset marked as ci: skip")
        elif item.metadata.get("ci", None) == "xfail":
            pytest.xfail("dataset marked as ci: xfail")
        try:
            _ = item.to_dask()
        except NotImplementedError:
            _ = item.read()
