import os

from carbonplan.data import MASTER_CATALOG_PATH, cat

from . import parametrize_with_checks


def test_yaml_catalogs_in_distribution():
    assert os.path.exists(MASTER_CATALOG_PATH)


@parametrize_with_checks(cat)
def test_catalog_entries(entry, check):
    check(entry)
