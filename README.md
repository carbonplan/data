<p align="left" >
<a href='https://carbonplan.org'>
<picture>
  <source media="(prefers-color-scheme: dark)" srcset="https://carbonplan-assets.s3.amazonaws.com/monogram/light-small.png">
  <img alt="CarbonPlan monogram." height="48" src="https://carbonplan-assets.s3.amazonaws.com/monogram/dark-small.png">
</picture>
</a>
</p>

# carbonplan / data

**data catalog and curation**

[![CI](https://github.com/carbonplan/data/actions/workflows/main.yaml/badge.svg)](https://github.com/carbonplan/data/actions/workflows/main.yaml)
[![PyPI](https://img.shields.io/pypi/v/carbonplan-data)](https://pypi.org/project/carbonplan-data/)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)

This repository includes our main data catalog as well as our pre-processing utilities.

## install

```shell
python -m pip install carbonplan[data]
```

## usage

The CarbonPlan data archives are currently mirrored on Google Cloud Storage (US-Central) and
Microsoft Azure (US-West). Set the `CARBONPLAN_DATA` environment variable before using the
Intake catalog below:

```shell
# google (us-central)
export CARBONPLAN_DATA="https://storage.googleapis.com/carbonplan-data"
# or
# azure (us-west)
export CARBONPLAN_DATA="https://carbonplan.blob.core.windows.net/carbonplan-data"
```

```python
# open the top level catalog
from carbonplan.data import cat

# extract an entry as a Dask-backed Xarray Dataset
cat.mtbs["raster"](region="conus", resolution="4000m").to_dask()
```

---

## developer documentation

To run the unit and integration tests for this API, run:

```shell
$ pytest -v
```

Catalog entries scan be marked as either _skip_ or _xfail_ by setting the `ci` key in the metadata dictionary:

```yaml
foo:
  description: "skip this entry in the CI tests"
  metadata:
    ci: skip
```

## license

All the code in this repository is [MIT](https://choosealicense.com/licenses/mit/)-licensed. When possible, the data is licensed using the [CC-BY-4.0](https://choosealicense.com/licenses/cc-by-4.0/) license. We include attribution and additional license information for third party datasets, and we request that you also maintain that attribution if using this data.

## about us

CarbonPlan is a nonprofit organization that uses data and science for climate action. We aim to improve the transparency and scientific integrity of climate solutions with open data and tools. Find out more at [carbonplan.org](https://carbonplan.org/) or get in touch by [opening an issue](https://github.com/carbonplan/data/issues/new) or [sending us an email](mailto:hello@carbonplan.org).
