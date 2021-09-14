import pytest
import xarray as xr

from carbonplan_data.utils import get_versions, set_zarr_encoding


@pytest.fixture
def temperature():
    ds = xr.tutorial.open_dataset("air_temperature")
    return ds


def test_set_zarr_encoding(temperature):
    temperature["air"].encoding["foo"] = "bar"
    ds = set_zarr_encoding(temperature)
    assert "foo" not in ds.air.encoding
    assert ds.air.encoding.get("compressor", None)
    assert ds.air.encoding.get("_FillValue", None)

    ds = set_zarr_encoding(temperature, float_dtype="float16")
    assert "f2" in ds.air.dtype.str


def test_get_versions():
    versions = get_versions()
    assert versions["carbonplan_data"]
