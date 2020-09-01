import itertools
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


def get_item_params(item):
    user_parameters = item.describe()["user_parameters"]
    if not user_parameters:
        return []

    keys = [p["name"] for p in user_parameters]
    try:
        values = [p["allowed"] for p in user_parameters]
    except KeyError:
        return []
    params = [dict(zip(keys, p)) for p in itertools.product(*values)]

    return params


def entries_with_params(catalog):
    out = []
    for entry in catalog.walk(depth=10):
        out.append((entry, {}))  # default open
        for params in get_item_params(catalog[entry]):
            out.append((entry, params))  # parameterized open
    return out


MASTER_CATALOG = get_master_catalog()
ALL_PARAMETERS = entries_with_params(MASTER_CATALOG)


def idfn(val):
    """helper function to format the id names of parameters"""
    return str(val)


@pytest.mark.parametrize("name_and_params", ALL_PARAMETERS, ids=idfn)
def test_get_intake_source(catalog, name_and_params):
    dataset_name, params = name_and_params

    item = catalog[dataset_name]
    if params:
        item = item(**params)

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
