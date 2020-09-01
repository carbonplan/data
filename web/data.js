module.exports = {
  nlcd: {
    plugins: {
      source: [
        {
          module: 'intake_xarray',
        },
      ],
    },
    sources: {
      raw_raster: {
        description: 'NLCD Land Cover Change Index',
        metadata: {
          url: 'https://www.mrlc.gov/',
          tags: ['land cover', 'cog'],
        },
        parameters: {
          option: {
            description: 'year (int) or change',
            type: 'str',
            default: 2016,
          },
          region: {
            description: 'conus or ak',
            type: 'str',
            default: 'conus',
            allowed: ['conus', 'ak'],
          },
        },
        driver: 'rasterio',
        args: {
          urlpath:
            'https://storage.googleapis.com/carbonplan-data/raw/nlcd/{{ region }}/30m/{{ option }}.tif',
          chunks: {
            y: 5120,
            x: 5120,
          },
        },
      },
      raster: {
        description: 'NLCD Land Cover Change Index',
        metadata: {
          url: 'https://www.mrlc.gov/',
          tags: ['land cover', 'cog'],
        },
        parameters: {
          option: {
            description: 'year (int) or change',
            type: 'str',
            default: 2016,
          },
          resolution: {
            description: 'pixel resolution in meters',
            type: 'str',
            default: '4000m',
            allowed: ['250m', '4000m'],
          },
          region: {
            description: 'conus or ak',
            type: 'str',
            default: 'conus',
            allowed: ['conus', 'ak'],
          },
        },
        driver: 'rasterio',
        args: {
          urlpath:
            'https://storage.googleapis.com/carbonplan-data/processed/nlcd/{{ region }}/{{ resolution }}/{{ option }}.tif',
          chunks: {
            y: 5120,
            x: 5120,
          },
        },
      },
    },
  },
  spawnetal2020: {
    plugins: {
      source: [
        {
          module: 'intake_xarray',
        },
      ],
    },
    sources: {
      raw_raster: {
        description:
          'Global Aboveground and Belowground Biomass Carbon Density Maps for the Year 2010',
        metadata: {
          url: 'https://doi.org/10.3334/ORNLDAAC/1763',
          tags: ['biomass', 'cog'],
        },
        parameters: {
          variable: {
            description:
              'aboveground, aboveground_uncertainty, belowground, or belowground_uncertainty',
            type: 'str',
            default: 'aboveground',
            allowed: [
              'aboveground',
              'aboveground_uncertainty',
              'belowground',
              'belowground_uncertainty',
            ],
          },
        },
        driver: 'rasterio',
        args: {
          urlpath:
            'https://storage.googleapis.com/carbonplan-data/raw/2010-harmonized-biomass/global/300m/{{ variable }}.tif',
          chunks: {
            y: 5120,
            x: 5120,
          },
        },
      },
    },
  },
  fia: {
    plugins: {
      source: [
        {
          module: 'intake_parquet',
        },
      ],
    },
    sources: {
      raw_table: {
        description:
          'Forest Inventory and Analysis Database (FIADB) in Parquet for CSV format - FIADB version 1.8.0.02.',
        metadata: {
          url: 'https://apps.fs.usda.gov/fia/datamart/datamart.html',
          tags: ['forest', 'fia'],
          todos: [
            'rename csv data to use lower case naming convention, add csv back to format',
          ],
        },
        driver: 'parquet',
        parameters: {
          name: {
            description: 'FIA data product name',
            type: 'str',
            default: 'plot',
            allowed: [
              'boundary',
              'cond',
              'cond_dwm_calc',
              'county',
              'dwm_coarse_woody_debris',
              'dwm_duff_litter_fuel',
              'dwm_fine_woody_debris',
              'dwm_microplot_fuel',
              'dwm_residual_pile',
              'dwm_transect_segment',
              'dwm_visit',
              'grnd_cvr',
              'invasive_subplot_spp',
              'lichen_lab',
              'lichen_plot_summary',
              'lichen_visit',
              'ozone_biosite_summary',
              'ozone_plot',
              'ozone_plot_summary',
              'ozone_species_summary',
              'ozone_validation',
              'ozone_visit',
              'p2veg_subplot_spp',
              'p2veg_subp_structure',
              'plot',
              'plotgeom',
              'plotsnap',
              'plot_regen',
              'pop_estn_unit',
              'pop_eval',
              'pop_eval_attribute',
              'pop_eval_grp',
              'pop_eval_typ',
              'pop_plot_stratum_assgn',
              'pop_stratum',
              'seedling',
              'seedling_regen',
              'sitetree',
              'soils_erosion',
              'soils_lab',
              'soils_sample_loc',
              'soils_visit',
              'subplot',
              'subplot_regen',
              'subp_cond',
              'subp_cond_chng_mtrx',
              'survey',
              'tree',
              'tree_grm_begin',
              'tree_grm_component',
              'tree_grm_estn',
              'tree_grm_midpt',
              'tree_grm_threshold',
              'tree_regional_biomass',
              'tree_woodland_stems',
              'veg_plot_species',
              'veg_quadrat',
              'veg_subplot',
              'veg_subplot_spp',
              'veg_visit',
            ],
          },
          format: {
            description: 'Pixel resolution in meters',
            type: 'str',
            default: 'parquet',
            allowed: ['parquet'],
          },
        },
        args: {
          urlpath: 'gs://carbonplan-data/raw/fia/{{ name }}.{{ format }}',
        },
      },
    },
  },
  gcp: {
    sources: {
      raw_table: {
        description: 'Global Carbon Budget 2019 raw data in parquet format',
        metadata: {
          url: 'https://www.globalcarbonproject.org/carbonbudget/19/data.htm',
          tags: ['carbon cycle'],
        },
        parameters: {
          name: {
            description: 'name of GCB dataset',
            type: 'str',
            default: 'global_carbon_budget',
            allowed: [
              'global_carbon_budget',
              'fossil_emissions_by_fuel_type',
              'land_use_change_emissions',
              'ocean_sink',
              'terrestrial_sink',
              'historical_budget',
              'consumption_emissions',
              'territorial_emissions',
              'transfer_emissions',
            ],
          },
        },
        driver: 'parquet',
        args: {
          urlpath: 'gs://carbonplan-data/raw/gcp/{{ name }}.parquet',
        },
      },
    },
  },
  nftd: {
    plugins: {
      source: [
        {
          module: 'intake_xarray',
        },
      ],
    },
    sources: {
      raw_raster: {
        description:
          'Extent, distribution, and forest type composition of the nation\u2019s forests.',
        metadata: {
          url: 'https://data.fs.usda.gov/geodata/rastergateway/forest_type/',
          tags: ['land cover', 'cog'],
        },
        parameters: {
          option: {
            description: 'error or raster',
            type: 'str',
            default: 'raster',
            allowed: ['error', 'raster'],
          },
          region: {
            description: 'conus or ak',
            type: 'str',
            default: 'conus',
            allowed: ['conus', 'ak'],
          },
          variable: {
            description: 'foresttype or forestgroup',
            type: 'str',
            default: 'foresttype',
            allowed: ['foresttype', 'forestgroup'],
          },
        },
        driver: 'rasterio',
        args: {
          urlpath:
            'https://storage.googleapis.com/carbonplan-data/raw/nftd/{{ region }}_{{ variable }}/250m/{{ option }}.tif',
          chunks: {
            y: 5120,
            x: 5120,
          },
        },
      },
      raster: {
        description:
          'Extent, distribution, and forest type composition of the nation\u2019s forests.',
        metadata: {
          url: 'https://data.fs.usda.gov/geodata/rastergateway/forest_type/',
          tags: ['land cover', 'cog'],
        },
        parameters: {
          region: {
            description: 'conus or ak',
            type: 'str',
            default: 'conus',
            allowed: ['conus', 'ak'],
          },
          option: {
            description: 'group/type [optional _error]',
            type: 'str',
            default: 'type',
            allowed: ['group', 'type', 'group_error', 'type_error'],
          },
          resolution: {
            description: 'pixel resolution in meters',
            type: 'str',
            default: '4000m',
            allowed: ['250m', '4000m'],
          },
        },
        driver: 'rasterio',
        args: {
          urlpath:
            'https://storage.googleapis.com/carbonplan-data/processed/nftd/{{ region }}/{{ resolution }}/{{ option }}.tif',
          chunks: {
            y: 5120,
            x: 5120,
          },
        },
      },
    },
  },
  fluxnet: {
    plugins: {
      source: [
        {
          module: 'intake_parquet',
        },
      ],
    },
    sources: {
      raw_aux: {
        description: 'Raw Aux FLUXNET data',
        metadata: {
          url: 'https://fluxnet.org/',
          tags: ['fluxnet', 'parquet'],
        },
        parameters: {
          station: {
            description: 'fluxnet station code',
            type: 'str',
            default: 'it-noe',
          },
          kind: {
            description: 'fluxnet data stream',
            type: 'str',
            default: 'auxmeteo',
            allowed: ['auxmeteo', 'auxnee'],
          },
          freq: {
            description: 'temporal frequency',
            type: 'str',
            default: 'dd',
            allowed: ['dd', 'hh', 'mm', 'ww', 'yy'],
          },
        },
        driver: 'parquet',
        args: {
          urlpath:
            'gs://carbonplan-data/raw/fluxnet/{{ station }}_{{ kind }}.parquet',
        },
      },
      raw_fullset: {
        description: 'Raw Fullset FLUXNET data',
        metadata: {
          url: 'https://fluxnet.org/',
          tags: ['fluxnet', 'parquet'],
        },
        parameters: {
          station: {
            description: 'fluxnet station code',
            type: 'str',
            default: 'it-noe',
          },
          kind: {
            description: 'fluxnet data stream',
            type: 'str',
            default: 'fullset',
            allowed: ['erai', 'fullset'],
          },
          freq: {
            description: 'temporal frequency',
            type: 'str',
            default: 'dd',
            allowed: ['dd', 'hh', 'mm', 'ww', 'yy'],
          },
        },
        driver: 'parquet',
        args: {
          urlpath:
            'gs://carbonplan-data/raw/fluxnet/{{ station }}_{{ kind }}_{{ freq }}.parquet',
        },
      },
    },
  },
  projects: {
    sources: {
      reports: {
        description: 'CarbonPlan Reports Data',
        driver: 'csv',
        args: {
          urlpath: 'https://api.carbonplan.org/projects.csv',
        },
        metadata: {
          origin_url: 'https://api.carbonplan.org/docs',
        },
      },
    },
  },
  climate: {
    plugins: {
      source: [
        {
          module: 'intake_xarray',
        },
      ],
    },
    sources: {
      raw_gridmet_opendap: {
        description: 'GRIDMET data from OpeNDAP',
        metadata: {
          url: 'http://www.climatologylab.org/gridmet.html',
        },
        args: {
          urlpath:
            "http://thredds.northwestknowledge.net:8080/thredds/dodsC/MET/{{ variable }}/{{ variable }}_{{ '%04d' % year }}.nc",
          auth: null,
          chunks: {
            lat: 585,
            lon: 1386,
          },
        },
        driver: 'opendap',
        parameters: {
          variable: {
            description: 'climate variable',
            type: 'str',
            default: 'pr',
            allowed: [
              'pr',
              'tmmn',
              'tmmx',
              'rmax',
              'rmin',
              'sph',
              'srad',
              'th',
              'vs',
              'bi',
              'fm100',
              'fm1000',
              'erc',
              'pdsi',
              'etr',
              'pet',
              'vpd',
            ],
          },
          year: {
            description: 'year',
            type: 'int',
            default: 2000,
          },
        },
      },
      raw_maca_opendap: {
        description: 'MACA data from OpeNDAP',
        metadata: {
          url: 'http://www.climatologylab.org/maca.html',
        },
        args: {
          urlpath:
            'http://thredds.northwestknowledge.net:8080/thredds/dodsC/agg_macav2metdata_{{ variable }}_{{ gcm }}_r1i1p1_{{ scenario }}_CONUS_daily.nc',
          auth: null,
          chunks: {
            lat: 585,
            lon: 1386,
          },
        },
        driver: 'opendap',
        parameters: {
          variable: {
            description: 'climate variable',
            type: 'str',
            default: 'pr',
            allowed: [
              'huss',
              'pr',
              'rhsmin',
              'rhsmax',
              'rsds',
              'tasmax',
              'tasmin',
              'uas',
              'vas',
              'vpd',
            ],
          },
          gcm: {
            description: 'climate model',
            type: 'str',
            default: 'IPSL-CM5A-LR',
          },
          scenario: {
            description: 'climate scenario',
            type: 'str',
            default: 'historical_1950_2005',
            allowed: [
              'historical_1950_2005',
              'rcp45_2006_2099',
              'rcp85_2006_2099',
            ],
          },
        },
      },
      raw_terraclimate: {
        description:
          'TerraClimate is a dataset of monthly climate and climatic water balance for global terrestrial surfaces from 1958-2019.',
        metadata: {
          url: 'http://www.climatologylab.org/terraclimate.html',
          tags: ['climate', 'zarr'],
        },
        driver: 'zarr',
        args: {
          urlpath: 'gs://carbonplan-data/raw/terraclimate/4000m/raster.zarr',
          storage_options: {
            token: 'anon',
          },
        },
      },
      terraclimate: {
        description:
          'TerraClimate is a dataset of monthly climate and climatic water balance for global terrestrial surfaces from 1958-2019.',
        metadata: {
          url: 'http://www.climatologylab.org/terraclimate.html',
          tags: ['climate', 'zarr'],
        },
        parameters: {
          region: {
            description: 'conus or ak',
            type: 'str',
            default: 'conus',
            allowed: ['conus', 'ak'],
          },
          resolution: {
            description: 'Pixel resolution in meters',
            type: 'str',
            default: '4000m',
            allowed: ['4000m'],
          },
        },
        driver: 'zarr',
        args: {
          urlpath:
            'gs://carbonplan-data/processed/terraclimate/{{ region }}/{{ resolution }}/raster.zarr',
          storage_options: {
            token: 'anon',
          },
        },
      },
    },
  },
  mtbs: {
    plugins: {
      source: [
        {
          module: 'intake_xarray',
        },
      ],
    },
    sources: {
      raw_raster: {
        description:
          'The burn severity mosaics consist of thematic raster images of MTBS burn severity classes for all currently completed MTBS fires for the continental United States. Mosaicked burn severity images are compiled annually for the continental United States. Data in this catalog have been converted to cloud optimized geotiff.',
        parameters: {
          year: {
            description: 'year',
            type: 'int',
            default: 1984,
          },
          region: {
            description: 'mtbs region',
            type: 'str',
            default: 'conus',
            allowed: ['conus', 'ak'],
          },
        },
        metadata: {
          url: 'https://www.mtbs.gov/',
          tags: ['fire', 'cog'],
        },
        driver: 'rasterio',
        args: {
          urlpath:
            "https://storage.googleapis.com/carbonplan-data/raw/mtbs/{{ region }}/30m/{{ '%d' % year }}.tif",
          chunks: {
            y: 5120,
            x: 5120,
          },
        },
      },
      raster: {
        description:
          'The burn severity mosaics consist of thematic raster images of MTBS burn severity classes for all currently completed MTBS fires for the continental United States. Mosaicked burn severity images are compiled annually for the continental United States. Data in this catalog have been converted upscaled and converted to Zarr.',
        parameters: {
          region: {
            description: 'conus or ak',
            type: 'str',
            default: 'conus',
            allowed: ['conus', 'ak'],
          },
          resolution: {
            description: 'Pixel resolution in meters',
            type: 'str',
            default: '4000',
            allowed: ['4000'],
          },
        },
        metadata: {
          url: 'https://www.mtbs.gov/',
          tags: ['fire', 'cog'],
        },
        driver: 'zarr',
        args: {
          urlpath:
            'gs://carbonplan-data/processed/mtbs/{{ region }}/{{ resolution }}/raster.zarr',
          storage_options: {
            token: 'anon',
          },
        },
      },
      fod_shp: {
        description:
          'MTBS National - Fire Occurrence Dataset. The fire occurrence location dataset is a vector point ESRI shapefile of the centroids of all currently completed MTBS fires occurring in the continental United States, Alaska, Hawaii and Puerto Rico.',
        metadata: {
          url: 'https://www.mtbs.gov/',
          tags: ['fire', 'shapefile'],
          ci: 'skip',
        },
        driver: 'shapefile',
        args: {
          urlpath:
            'gs://carbonplan-data/raw/MTBS/mtbs_fod_pts_data/mtbs_fod_pts_DD.shp',
        },
      },
      perims_shp: {
        description:
          'MTBS National - Burned Area Boundaries Dataset. The burned area boundaries dataset is a vector polygon ESRI shapefile of the extent of the burned areas of all currently completed MTBS fires for the continental United States, Alaska, Hawaii and Puerto Rico.',
        metadata: {
          url: 'https://www.mtbs.gov/',
          tags: ['fire', 'shapefile'],
          ci: 'skip',
        },
        driver: 'shapefile',
        args: {
          urlpath:
            'gs://carbonplan-data/raw/MTBS/mtbs_perimeter_data/mtbs_perims_DD.shp',
        },
      },
    },
  },
  master: {
    description: 'CarbonPlan Master Data Catalog',
    sources: {
      fia: {
        description:
          'Catalog for data from Forest Inventory Analysis (FIA) database',
        metadata: {},
        driver: 'intake.catalog.local.YAMLFileCatalog',
        args: {
          path: '{{CATALOG_DIR}}/fia.yaml',
        },
      },
      fluxnet: {
        description: 'Catalog for data from the FLUXNET dataset',
        metadata: {},
        driver: 'intake.catalog.local.YAMLFileCatalog',
        args: {
          path: '{{CATALOG_DIR}}/fluxnet.yaml',
        },
      },
      gcb: {
        description: 'Catalog for data from the Global Carbon Project',
        metadata: {},
        driver: 'intake.catalog.local.YAMLFileCatalog',
        args: {
          path: '{{CATALOG_DIR}}/gcp.yaml',
        },
      },
      mtbs: {
        description:
          'Catalog for data from the Monitoring Trends in Burn Severity (MTBS) dataset',
        metadata: {},
        driver: 'intake.catalog.local.YAMLFileCatalog',
        args: {
          path: '{{CATALOG_DIR}}/mtbs.yaml',
        },
      },
      nftd: {
        description:
          'Catalog for data from the National Forest Type Database (NFTD)',
        metadata: {},
        driver: 'intake.catalog.local.YAMLFileCatalog',
        args: {
          path: '{{CATALOG_DIR}}/nftd.yaml',
        },
      },
      nlcd: {
        description:
          'Catalog for data from the National Land Cover Database Database (NLCD)',
        metadata: {},
        driver: 'intake.catalog.local.YAMLFileCatalog',
        args: {
          path: '{{CATALOG_DIR}}/nlcd.yaml',
        },
      },
      projects: {
        description: 'CarbonPlan Projects Dataset Catalog',
        metadata: {},
        driver: 'intake.catalog.local.YAMLFileCatalog',
        args: {
          path: '{{CATALOG_DIR}}/projects.yaml',
        },
      },
      spawnetal2020: {
        description:
          'Catalog for data from Global Aboveground and Belowground Biomass Carbon Density Maps for the Year 2010 from Spawn et al (2020)',
        metadata: {},
        driver: 'intake.catalog.local.YAMLFileCatalog',
        args: {
          path: '{{CATALOG_DIR}}/nlcd.yaml',
        },
      },
    },
  },
}
