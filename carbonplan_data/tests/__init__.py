# Based on scikit-learn/sklearn/utils/estimator_checks.py
import itertools
from functools import partial


def get_entry_params(entry):
    user_parameters = entry.describe()["user_parameters"]
    if not user_parameters:
        return []

    keys = [p["name"] for p in user_parameters]
    try:
        values = [p["allowed"] for p in user_parameters]
    except KeyError:
        return []
    params = [None]
    params.extend([dict(zip(keys, p)) for p in itertools.product(*values)])
    return params


def _set_check_ids(obj):
    """Create pytest ids for checks.
    When `obj` is an intake entry, this returns the pprint version of the
    intake entry. When `obj` is a function, the name of the function is
    returned with its keyworld arguments.

    Parameters
    ----------
    obj : intake entry or function
        Items generated by `check_entry`

    Returns
    -------
    id : string or None

    See also
    --------
    check_entry
    """
    if hasattr(obj, "container"):
        c = getattr(obj, "_catalog", None)
        if c:
            name = f"{c.name}.{obj.name}"
        else:
            name = f"{obj.name}"
        return name
    if callable(obj):
        if not isinstance(obj, partial):
            return obj.__name__

        if not obj.keywords:
            return obj.func.__name__

        kwstring = ",".join([f"{k}={v}" for k, v in obj.keywords.items()])
        return f"{obj.func.__name__}({kwstring})"


def parametrize_with_checks(catalog):
    """Pytest specific decorator for parametrizing catalog checks.
    The `id` of each check is set to be a pprint version of the catalog
    and the name of the check with its keyword arguments.
    This allows to use `pytest -k` to specify which tests to run::
        pytest test_check_catalogs.py -k check_catalog_metadata

    Parameters
    ----------
    catalog : Intake Catalog
        Catalog to generated checks for.

    Returns
    -------
    decorator : `pytest.mark.parametrize`

    Examples
    --------
    >>> from carbonplan.data.tests import parametrize_with_checks
    >>> from carbonplan.data import cat
    >>> @parametrize_with_checks(cat)
    ... def test_catalog(entry, check):
    ...     check(entry)
    ...

    """
    import pytest

    checks_generator = itertools.chain.from_iterable(
        check_entry(name, entry) for name, entry in dict(catalog.walk(depth=10)).items()
    )

    checks_with_marks = list(
        _mark_xfail_checks(estimator, check, pytest) for estimator, check in checks_generator
    )

    return pytest.mark.parametrize("entry, check", checks_with_marks, ids=_set_check_ids)


def _mark_xfail_checks(entry, check, pytest):
    # TODO
    return entry, check


def _yield_all_checks(name, entry):
    yield check_entry_metadata

    for params in get_entry_params(entry):
        yield partial(check_get_entry_data, params=params)


def check_entry(name, entry):
    yield from ((entry, partial(check, name)) for check in _yield_all_checks(name, entry))


def check_get_entry_data(name, entry, params=None):
    import pytest

    if params is not None:
        entry = entry(**params)
    else:
        entry = entry()

    if entry.container == "catalog":
        entry.reload()
    elif entry.container in ["xarray", "dataframe"]:
        if entry.metadata.get("ci", None) == "skip":
            pytest.skip("dataset marked as ci: skip")  # TODO: move to _mark_xfail_checks
        elif entry.metadata.get("ci", None) == "xfail":
            pytest.xfail("dataset marked as ci: xfail")  # TODO: move to _mark_xfail_checks
        try:
            _ = entry.to_dask()
        except NotImplementedError:
            _ = entry.read()


def check_entry_metadata(name, entry):
    import pytest

    expected_keys = ["title", "summary", "description", "tags", "license", "providers"]
    if entry.container == "catalog":
        pytest.skip(
            "not checking metadata in top level catalog objects."
        )  # TODO: move to _mark_xfail_checks
    for key in expected_keys:
        assert key in entry().metadata
