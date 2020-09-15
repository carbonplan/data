import intake

MASTER_CATALOG = "https://carbonplan.org/data/api/intake/master.yaml"

# open master catalog, in the future, we may want to package the catalogs along side the
# carbonplan-data distribution
try:
    cat = intake.open_catalog(MASTER_CATALOG)
except:
    cat = intake.catalog.Catalog()
