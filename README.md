<img
  src='https://carbonplan-assets.s3.amazonaws.com/monogram/dark-small.png'
  height='48'
/>

# carbonplan / data

**data catalog and curation**

[![GitHub][github-badge]][github]
![Build Status][]
![MIT License][]

[github]: https://github.com/carbonplan/data
[github-badge]: https://flat.badgen.net/badge/-/github?icon=github&label
[build status]: https://flat.badgen.net/github/checks/carbonplan/data
[mit license]: https://flat.badgen.net/badge/license/MIT/blue

This repository includes our master data catalog as well as our pre-processing utilities.

## usage

```python
# open the top level catalog
cat = intake.open_catalog('https://raw.githubusercontent.com/carbonplan/data/master/intake-catalogs/master.yaml')

# extract an entry as a Dask-backed Xarray Dataset
cat.fire.mtbs_raster.to_dask()
```

---

## developer documentation

To run the unit and integration tests for this API, run:

```shell
$ py.test -v
```

Catalog entries scan be marked as either _skip_ or _xfail_ by setting the `ci` key in the metadata dictionary:

```yaml
foo:
  description: 'skip this entry in the CI tests'
  metadata:
    ci: skip
```

## license

All the code in this repository is [MIT](https://choosealicense.com/licenses/mit/) licensed. Some of the data provided by this API is sourced from content made available under a [CC-BY-4.0](https://choosealicense.com/licenses/cc-by-4.0/) license. We include attribution for this content, and we please request that you also maintain that attribution if using this data.

## about us

CarbonPlan is a non-profit organization that uses data and science for carbon removal. We aim to improve the transparency and scientific integrity of carbon removal and climate solutions through open data and tools. Find out more at [carbonplan.org](https://carbonplan.org/) or get in touch by [opening an issue](https://github.com/carbonplan/data/issues/new) or [sending us an email](mailto:hello@carbonplan.org).
