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
        metadata: {
          title: 'National Land Cover Database (raw)',
          summary: 'The National Land Cover Database - 2001 to 2016.',
          description:
            'The U.S. Geological Survey (USGS), in partnership with several federal agencies, has\ndeveloped and released four National Land Cover Database (NLCD) products over the past\ntwo decades: NLCD 1992, 2001, 2006, and 2011. These products provide spatially explicit\nand reliable information on the Nation\u2019s land cover and land cover change. To continue\nthe legacy of NLCD and further establish a long-term monitoring capability for the\nNation\u2019s land resources, the USGS has designed a new generation of NLCD products named\nNLCD 2016. The NLCD 2016 design aims to provide innovative, consistent, and robust\nmethodologies for production of a multi-temporal land cover and land cover change\ndatabase from 2001 to 2016 at 2\u20133-year intervals. Comprehensive research was conducted\nand resulted in developed strategies for NLCD 2016: a streamlined process for assembling\nand preprocessing Landsat imagery and geospatial ancillary datasets; a multi-source\nintegrated training data development and decision-tree based land cover classifications;\na temporally, spectrally, and spatially integrated land cover change analysis strategy;\na hierarchical theme-based post-classification and integration protocol for generating\nland cover and change products; a continuous fields biophysical parameters modeling\nmethod; and an automated scripted operational system for the NLCD 2016 production. The\nperformance of the developed strategies and methods were tested in twenty World Reference\nSystem-2 path/row throughout the conterminous U.S. An overall agreement ranging from\n71% to 97% between land cover classification and reference data was achieved for all\ntested area and all years. Results from this study confirm the robustness of this\ncomprehensive and highly automated procedure for NLCD 2016 operational mapping.\n',
          tags: ['forests'],
          type: 'image/tiff; application=geotiff; profile=cloud-optimized',
          license: 'Public Domain',
          providers: [
            {
              name: 'Multi-Resolution Land Characteristics (MRLC) Consortium',
              description:
                'The Multi-Resolution Land Characteristics (MRLC) consortium is a group of federal agencies who coordinate and generate consistent and relevant land cover information at the national scale for a wide variety of environmental, land management, and modeling applications.',
              url: 'https://www.mrlc.gov/',
            },
          ],
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
            '{{env(CARBONPLAN_DATA)}}/raw/nlcd/{{ region }}/30m/{{ option }}.tif',
          chunks: {
            y: 5120,
            x: 5120,
          },
        },
      },
      raster: {
        metadata: {
          title: 'National Land Cover Database (processed)',
          summary: 'The National Land Cover Database - 2001 to 2016.',
          description:
            "The U.S. Geological Survey (USGS), in partnership with several federal agencies, has\ndeveloped and released four National Land Cover Database (NLCD) products over the past\ntwo decades: NLCD 1992, 2001, 2006, and 2011. These products provide spatially explicit\nand reliable information on the Nation\u2019s land cover and land cover change. To continue\nthe legacy of NLCD and further establish a long-term monitoring capability for the\nNation\u2019s land resources, the USGS has designed a new generation of NLCD products named\nNLCD 2016. The NLCD 2016 design aims to provide innovative, consistent, and robust\nmethodologies for production of a multi-temporal land cover and land cover change\ndatabase from 2001 to 2016 at 2\u20133-year intervals. Comprehensive research was conducted\nand resulted in developed strategies for NLCD 2016: a streamlined process for assembling\nand preprocessing Landsat imagery and geospatial ancillary datasets; a multi-source\nintegrated training data development and decision-tree based land cover classifications;\na temporally, spectrally, and spatially integrated land cover change analysis strategy;\na hierarchical theme-based post-classification and integration protocol for generating\nland cover and change products; a continuous fields biophysical parameters modeling\nmethod; and an automated scripted operational system for the NLCD 2016 production. The\nperformance of the developed strategies and methods were tested in twenty World Reference\nSystem-2 path/row throughout the conterminous U.S. An overall agreement ranging from\n71% to 97% between land cover classification and reference data was achieved for all\ntested area and all years. Results from this study confirm the robustness of this\ncomprehensive and highly automated procedure for NLCD 2016 operational mapping.\n\nThese data have been processed to CarbonPlan's CONUS and Alaska study domains.\n",
          tags: ['forests'],
          type: 'image/tiff; application=geotiff; profile=cloud-optimized',
          license: 'Public Domain',
          providers: [
            {
              name: 'Multi-Resolution Land Characteristics (MRLC) Consortium',
              description:
                'The Multi-Resolution Land Characteristics (MRLC) consortium is a group of federal agencies who coordinate and generate consistent and relevant land cover information at the national scale for a wide variety of environmental, land management, and modeling applications.',
              url: 'https://www.mrlc.gov/',
            },
          ],
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
            '{{env(CARBONPLAN_DATA)}}/processed/nlcd/{{ region }}/{{ resolution }}/{{ option }}.tif',
          chunks: {
            y: 5120,
            x: 5120,
          },
        },
      },
    },
  },
  gridmet: {
    plugins: {
      source: [
        {
          module: 'intake_xarray',
        },
      ],
    },
    sources: {
      raw_gridmet: {
        metadata: {
          title: 'gridMET (raw)',
          summary:
            'High-resolution surface meteorologicaldata covering the conus US from 1979-yesterday.',
          description:
            'gridMET is a dataset of daily high-spatial resolution (~4-km, 1/24th degree) surface\nmeteorological data covering the contiguous US from 1979-yesterday.\nThese data can provide important inputs for ecological, agricultural, and\nhydrological models. These data are updated daily.  gridMET is the preferred naming\nconvention for these data; however, the data are also known as cited as METDATA.\n',
          tags: ['climate'],
          type: 'application/netcdf',
          license: 'Public Domain Mark 1.0',
          providers: [
            {
              name: 'Climatology Lab, University of California, Merced',
              description:
                "Data provided by Dr. John Abatzoglou's Climatology Lab at the University of California, Merced.",
              url: 'http://www.climatologylab.org',
            },
          ],
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
        args: {
          urlpath:
            "http://thredds.northwestknowledge.net:8080/thredds/dodsC/MET/{{ variable }}/{{ variable }}_{{ '%04d' % year }}.nc",
          auth: null,
          chunks: {
            lat: 585,
            lon: 1386,
          },
        },
      },
    },
  },
  maca: {
    plugins: {
      source: [
        {
          module: 'intake_xarray',
        },
      ],
    },
    sources: {
      raw_maca: {
        metadata: {
          title: 'MACA (raw)',
          summary:
            'Historical and future climate projections derived from CMIP5 using the MACA statistical downscaling technique.',
          description:
            'Multivariate Adaptive Constructed Analogs (MACA) is a statistical method for downscaling\nGlobal Climate Models (GCMs) from their native coarse resolution to a higher spatial\nresolution that captures reflects observed patterns of daily near-surface meteorology and\nsimulated changes in GCMs experiments.\n',
          tags: ['climate'],
          type: 'application/netcdf',
          license: 'Creative Commons CC0 1.0 Universal',
          providers: [
            {
              name: 'Climatology Lab, University of California, Merced',
              description:
                "Data provided by Dr. John Abatzoglou's Climatology Lab at the University of California, Merced.",
              url: 'http://www.climatologylab.org',
            },
          ],
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
        args: {
          urlpath:
            'http://thredds.northwestknowledge.net:8080/thredds/dodsC/agg_macav2metdata_{{ variable }}_{{ gcm }}_r1i1p1_{{ scenario }}_CONUS_daily.nc',
          auth: null,
          chunks: {
            lat: 585,
            lon: 1386,
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
        metadata: {
          title: 'Global Biomass (Spawn and Gibbs, 2020)',
          summary:
            'Global aboveground and belowground biomass carbon density maps for the year 2010',
          description:
            'This dataset provides temporally consistent and harmonized global maps of aboveground and\nbelowground biomass carbon density for the year 2010 at a 300-m spatial resolution. The\naboveground biomass map integrates land-cover specific, remotely sensed maps of woody,\ngrassland, cropland, and tundra biomass. Input maps were amassed from the published\nliterature and, where necessary, updated to cover the focal extent or time period. The\nbelowground biomass map similarly integrates matching maps derived from each aboveground\nbiomass map and land-cover specific empirical models. Aboveground and belowground maps were\nthen integrated separately using ancillary maps of percent tree cover and landcover and a\nrule-based decision tree. Maps reporting the accumulated uncertainty of pixel-level\nestimates are also provided.\n',
          tags: ['biomass', 'forests'],
          type: 'image/tiff; application=geotiff; profile=cloud-optimized',
          license: 'Public domain',
          providers: [
            {
              name: 'Oak Ridge National Laboratory',
              description:
                'The Oak Ridge National Laboratory Distributed Active Archive Center (ORNL DAAC) for\nBiogeochemical Dynamics is a NASA Earth Observing System Data and Information System\n(EOSDIS) data center managed by the Earth Science Data and Information System (ESDIS)\nProject.\n',
              url: 'https://doi.org/10.3334/ORNLDAAC/1763',
            },
          ],
          ci: 'xfail',
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
            '{{env(CARBONPLAN_DATA)}}/raw/2010-harmonized-biomass/global/300m/{{ variable }}.tif',
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
        metadata: {
          title: 'Forest Inventory Analysis (raw)',
          summary:
            'Data on status and trends in forest location, health, growth, mortality, and production.',
          description:
            "The Forest Inventory and Analysis dataset is a nationwide survey of the forest assets of\nthe United States. The Forest Inventory and Analysis (FIA) research program has been in\nexistence since mandated by Congress in 1928. FIA's primary objective is to determine\nthe extent, condition, volume, growth, and use of trees on the Nation's forest land.\n",
          tags: ['forests'],
          type: 'application/parquet',
          license: 'Public domain',
          providers: [
            {
              name: 'USDA Forest Service',
              description:
                'Data provided by the United States Department of Agriculture Forest Service.',
              url: 'https://www.fia.fs.fed.us/',
            },
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
        },
        args: {
          urlpath: '{{env(CARBONPLAN_DATA)}}/raw/fia/{{ name }}.parquet',
          engine: 'pyarrow',
        },
      },
    },
  },
  gcp: {
    sources: {
      raw_table: {
        metadata: {
          title: 'Global Carbon Project',
          summary:
            'Timeseries of the global carbon budget and carbon emissions.',
          description:
            'The annually updated Global Carbon Budget produced by the Global Carbon Project.\nAll datasets and modeling output to complete the Global Carbon Budget 2019 are\ndescribed in detail in\n[Friedlingstein et al. (2019)](https://doi.org/10.5194/essd-11-1783-2019).\n',
          tags: ['carbon'],
          type: 'application/parquet',
          license:
            'The use of data is conditional on citing the original data sources.',
          providers: [
            {
              name: 'Integrated Carbon Observation System',
              description:
                'The Integrated Carbon Observation System, ICOS, is a European-wide greenhouse gas\nresearch infrastructure. ICOS produces standardised data on greenhouse gas\nconcentrations in the atmosphere, as well as on carbon fluxes between the\natmosphere, the earth and oceans.\n',
              url: 'https://www.icos-cp.eu/global-carbon-budget-2019',
            },
          ],
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
          urlpath: '{{env(CARBONPLAN_DATA)}}/raw/gcp/{{ name }}.parquet',
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
        metadata: {
          title: 'National Forest Type Dataset (raw)',
          summary:
            'Extent, distribution, and forest type composition of the nation\u2019s forests.',
          description:
            'This geospatial dataset was created by the USFS Forest Inventory and Analysis (FIA) program\nand the Geospatial Technology and Applications Center (GTAC) to show the extent,\ndistribution, and forest type composition of the nation\u2019s forests.\n\nThe dataset was created by modeling forest type from FIA plot data as a function of more\nthan one hundred geospatially continuous predictor layers.\n\nThis process results in a view of forest type distribution in greater detail than is\npossible with the FIA plot data alone.\n',
          tags: ['forests'],
          type: 'image/tiff; application=geotiff; profile=cloud-optimized',
          license: 'Public Domain',
          providers: [
            {
              name: 'USDA Forest Service',
              description:
                'Data provided by the United States Department of Agriculture Forest Service.',
              url: 'https://www.fia.fs.fed.us/',
            },
          ],
          ci: 'xfail',
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
            '{{env(CARBONPLAN_DATA)}}/raw/nftd/{{ region }}_{{ variable }}/250m/{{ option }}.tif',
          chunks: {
            y: 5120,
            x: 5120,
          },
        },
      },
      raster: {
        metadata: {
          title: 'National Forest Type Dataset (processed)',
          summary:
            'Extent, distribution, and forest type composition of the nation\u2019s forests.',
          description:
            "This geospatial dataset was created by the USFS Forest Inventory and Analysis (FIA) program\nand the Geospatial Technology and Applications Center (GTAC) to show the extent,\ndistribution, and forest type composition of the nation\u2019s forests.\n\nThe dataset was created by modeling forest type from FIA plot data as a function of more\nthan one hundred geospatially continuous predictor layers.\n\nThis process results in a view of forest type distribution in greater detail than is\npossible with the FIA plot data alone.\n\nThese data have been processed to CarbonPlan's CONUS and Alaska study domains.\n",
          tags: ['forests'],
          type: 'image/tiff; application=geotiff; profile=cloud-optimized',
          license: 'Public Domain',
          providers: [
            {
              name: 'USDA Forest Service',
              description:
                'Data provided by the United States Department of Agriculture Forest Service.',
              url: 'https://www.fia.fs.fed.us/',
            },
          ],
          ci: 'xfail',
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
            '{{env(CARBONPLAN_DATA)}}/processed/nftd/{{ region }}/{{ resolution }}/{{ option }}.tif',
          chunks: {
            y: 5120,
            x: 5120,
          },
        },
      },
    },
  },
  grids: {
    plugins: {
      source: [
        {
          module: 'intake_xarray',
        },
      ],
    },
    sources: {
      conus4k: {
        metadata: {
          title: 'CONUS 4km grid',
          summary:
            'Grid definition for the CONUS 4km Albers Equal Area study area',
          description:
            'This dataset defines the grid used for many of our CONUS 4km data products.\nIt is particularly useful as a target grid when regridding/reprojecting other\ndatasets to this (common) grid.\n',
          tags: ['meta'],
          type: 'application/zarr',
          license: 'Creative Commons Attribution 4.0 International',
          providers: [
            {
              name: 'CarbonPlan',
              description:
                'CarbonPlan is a registered non-profit public benefit corporation working on\nthe science and data of carbon removal.\n',
              url: 'https://carbonplan.org',
            },
          ],
        },
        driver: 'zarr',
        args: {
          urlpath:
            '{{env(CARBONPLAN_DATA)}}/processed/grids/conus/4000m/domain.zarr/',
          consolidated: true,
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
        metadata: {
          title: 'FLUXNET Auxiliary Data (raw)',
          summary: 'Supporting metadata for the FLUXNET dataset.',
          description:
            'The preparation of this FLUXNET Dataset has been possible thanks only to the efforts of\nmany scientists and technicians around the world and the coordination among teams from\nregional networks. The previous versions of FLUXNET Dataset releases are the FLUXNET\nMarconi Dataset (2000) and the FLUXNET LaThuile Dataset (2007). The FLUXNET2015 Dataset\nincludes several improvements to the data quality control protocols and the data\nprocessing pipeline. Examples include close interaction with tower teams to improve data\nquality, new methods for uncertainty quantification, use of reanalysis data to fill long\ngaps of micrometeorological variable records, among others (see the data processing\npipeline page for details).\n',
          tags: ['climate', 'carbon'],
          type: 'application/parquet',
          license: 'Creative Commons Attribution 4.0 International',
          providers: [
            {
              name: 'FLUXNET',
              description:
                'FLUXNET is organized through the Regional Networks that contribute data to FLUXNET\ndatasets available at the FLUXNET webiste (https://fluxnet.org/), hosted at the\nLawrence Berkeley National Laboratory (USA).\n',
              url: 'https://fluxnet.org/',
            },
          ],
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
        },
        driver: 'parquet',
        args: {
          urlpath:
            '{{env(CARBONPLAN_DATA)}}/raw/fluxnet/{{ station }}_{{ kind }}.parquet',
        },
      },
      raw_fullset: {
        metadata: {
          title: 'FLUXNET FULLSET Data (raw)',
          summary:
            'Global network of micrometeorological flux measurement measuring carbon, energy and water cycles.',
          description:
            'The preparation of this FLUXNET Dataset has been possible thanks only to the efforts of\nmany scientists and technicians around the world and the coordination among teams from\nregional networks. The previous versions of FLUXNET Dataset releases are the FLUXNET\nMarconi Dataset (2000) and the FLUXNET LaThuile Dataset (2007). The FLUXNET2015 Dataset\nincludes several improvements to the data quality control protocols and the data\nprocessing pipeline. Examples include close interaction with tower teams to improve data\nquality, new methods for uncertainty quantification, use of reanalysis data to fill long\ngaps of micrometeorological variable records, among others (see the data processing\npipeline page for details).\n',
          tags: ['climate', 'carbon'],
          type: 'application/parquet',
          license: 'Creative Commons Attribution 4.0 International',
          providers: [
            {
              name: 'FLUXNET',
              description:
                'FLUXNET is organized through the Regional Networks that contribute data to FLUXNET\ndatasets available at the FLUXNET webiste (https://fluxnet.org/), hosted at the\nLawrence Berkeley National Laboratory (USA).\n',
              url: 'https://fluxnet.org/',
            },
          ],
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
            '{{env(CARBONPLAN_DATA)}}/raw/fluxnet/{{ station }}_{{ kind }}_{{ freq }}.parquet',
        },
      },
    },
  },
  terraclimate: {
    plugins: {
      source: [
        {
          module: 'intake_xarray',
        },
      ],
    },
    sources: {
      raw_terraclimate: {
        metadata: {
          title: 'TerraClimate (raw)',
          summary:
            'Global climate and climaticwater balance data from 1958-2019.',
          description:
            'TerraClimate is a dataset of monthly climate and climatic water balance for global\nterrestrial surfaces from 1958-2019. These data provide important inputs for ecological\nand hydrological studies at global scales that require high spatial resolution and\ntime-varying data. All data have monthly temporal resolution and a ~4-km (1/24th degree)\nspatial resolution. The data cover the period from 1958-2019.\n',
          tags: ['climate'],
          type: 'application/netcdf',
          license: 'Creative Commons Public Domain (CC0)',
          providers: [
            {
              name: 'Climatology Lab, University of California, Merced',
              description:
                "Data provided by Dr. John Abatzoglou's Climatology Lab at the University of California, Merced.",
              url: 'http://www.climatologylab.org',
            },
          ],
        },
        driver: 'zarr',
        args: {
          urlpath:
            '{{env(CARBONPLAN_DATA)}}/raw/terraclimate/4000m/raster.zarr',
          consolidated: true,
        },
      },
      terraclimate: {
        metadata: {
          title: 'TerraClimate (processed)',
          summary:
            'Global climate and climaticwater balance data from 1958-2019.',
          description:
            "TerraClimate is a dataset of monthly climate and climatic water balance for global\nterrestrial surfaces from 1958-2019. All data have monthly temporal resolution and a\n~4-km (1/24th degree) spatial resolution. The data cover the period from 1958-2019.\n\nThese data have been processed to CarbonPlan's CONUS and Alaska study domains.\n",
          tags: ['climate'],
          type: 'application/zarr',
          license: 'Creative Commons Public Domain (CC0)',
          providers: [
            {
              name: 'Climatology Lab, University of California, Merced',
              description:
                "Data provided by Dr. John Abatzoglou's Climatology Lab at the University of California, Merced.",
              url: 'http://www.climatologylab.org',
            },
          ],
          ci: 'skip',
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
            '{{env(CARBONPLAN_DATA)}}/processed/terraclimate/{{ region }}/{{ resolution }}/raster.zarr',
          consolidated: true,
        },
      },
    },
  },
  projects: {
    sources: {
      reports: {
        metadata: {
          title: "CarbonPlan Project's Database",
          summary:
            'Public database of carbon removal project proposals evaluated by CarbonPlan.',
          description:
            'This is a public database of reports on carbon removal project proposals. These reports\nreflect our independent analysis of public information.\n',
          tags: ['carbon'],
          type: 'text/csv',
          license: 'Creative Commons Attribution 4.0 International',
          providers: [
            {
              name: 'CarbonPlan',
              description:
                'CarbonPlan is a registered non-profit public benefit corporation working on\nthe science and data of carbon removal.\n',
              url: 'https://carbonplan.org',
            },
          ],
        },
        driver: 'csv',
        args: {
          urlpath: 'https://api.carbonplan.org/projects.csv',
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
        metadata: {
          title: 'MTBS (raw)',
          summary:
            'Annual burn severity mosaics for the continental United States and Alaska.',
          description:
            'Monitoring Trends in Burn Severity (MTBS) is an interagency program whose goal is to\nconsistently map the burn severity and extent of large fires across all lands of the\nUnited States from 1984 to present. This includes all fires 1000 acres or greater in\nthe western United States and 500 acres or greater in the eastern Unites States. The\nextent of coverage includes the continental U.S., Alaska, Hawaii and Puerto Rico.\n\nThe burn severity mosaics consist of thematic raster images of MTBS burn severity\nclasses for all currently completed MTBS fires for the continental United States,\nAlaska, Hawaii and Puerto Rico. Mosaicked burn severity images are compiled annually\nfor each year by US State and the continental United States.\n',
          tags: ['forests'],
          type: 'image/tiff; application=geotiff; profile=cloud-optimized',
          license: 'Public Domain',
          providers: [
            {
              name: 'Monitoring Trends in Burn Severity',
              description:
                'Monitoring Trends in Burn Severity (MTBS) is an interagency program that includes the USGS, NASA, USFS, USDI, and USDA.',
              url: 'https://www.mtbs.gov/',
            },
          ],
        },
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
        driver: 'rasterio',
        args: {
          urlpath:
            "{{env(CARBONPLAN_DATA)}}/raw/mtbs/{{ region }}/30m/{{ '%d' % year }}.tif",
          chunks: {
            y: 5120,
            x: 5120,
          },
        },
      },
      raster: {
        metadata: {
          title: 'MTBS (processed)',
          summary:
            'Annual burn severity mosaics for the continental United States and Alaska.',
          description:
            "Monitoring Trends in Burn Severity (MTBS) is an interagency program whose goal is to\nconsistently map the burn severity and extent of large fires across all lands of the\nUnited States from 1984 to present. This includes all fires 1000 acres or greater in\nthe western United States and 500 acres or greater in the eastern Unites States.\n\nThe burn severity mosaics consist of thematic raster images of MTBS burn severity\nclasses for all currently completed MTBS fires for the continental United States,\nAlaska, Hawaii and Puerto Rico. Mosaicked burn severity images are compiled annually\nfor each year by US State and the continental United States.\n\nThese data have been processed to CarbonPlan's CONUS and Alaska study domains.\n",
          tags: ['forests'],
          type: 'application/zarr',
          license: 'Public Domain',
          providers: [
            {
              name: 'Monitoring Trends in Burn Severity',
              description:
                'Monitoring Trends in Burn Severity (MTBS) is an interagency program that includes the USGS, NASA, USFS, USDI, and USDA.',
              url: 'https://www.mtbs.gov/',
            },
          ],
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
            '{{env(CARBONPLAN_DATA)}}/processed/mtbs/{{ region }}/{{ resolution }}/raster.zarr',
          consolidated: true,
        },
      },
      fod_shp: {
        metadata: {
          title: 'MTBS Occurance (vector data)',
          summary: 'Fire occurance location dataset in vector/point format.',
          description:
            'The fire occurrence location dataset is a vector point ESRI shapefile of the centroids of\nall currently completed MTBS fires occurring in the continental United States, Alaska,\nHawaii and Puerto Rico.\n',
          tags: ['fire', 'forests'],
          type: 'application/octet-stream',
          license: 'Public Domain',
          providers: [
            {
              name: 'Monitoring Trends in Burn Severity',
              description:
                'Monitoring Trends in Burn Severity (MTBS) is an interagency program that includes the USGS, NASA, USFS, USDI, and USDA.',
              url: 'https://www.mtbs.gov/',
            },
          ],
          ci: 'skip',
        },
        driver: 'shapefile',
        args: {
          urlpath:
            '{{env(CARBONPLAN_DATA)}}/raw/mtbs/mtbs_fod_pts_data/mtbs_fod_pts_DD.shp',
        },
      },
      perims_shp: {
        metadata: {
          title: 'MTBS Boundaries (vector data)',
          summary: 'Burned area boundaries data in vector/polygon format.',
          description:
            'The burned area boundaries dataset is a vector polygon ESRI shapefile of the extent of the\nburned areas of all currently completed MTBS fires for the continental United States,\nAlaska, Hawaii and Puerto Rico.\n',
          tags: ['forests'],
          type: 'application/octet-stream',
          license: 'Public Domain',
          providers: [
            {
              name: 'Monitoring Trends in Burn Severity',
              description:
                'Monitoring Trends in Burn Severity (MTBS) is an interagency program that includes the USGS, NASA, USFS, USDI, and USDA.',
              url: 'https://www.mtbs.gov/',
            },
          ],
          ci: 'skip',
        },
        driver: 'shapefile',
        args: {
          urlpath:
            '{{env(CARBONPLAN_DATA)}}/raw/mtbs/mtbs_perimeter_data/mtbs_perims_DD.shp',
        },
      },
    },
  },
  master: {
    description: 'CarbonPlan Master Data Catalog',
    sources: {
      gridmet: {
        name: 'gridMET',
        description:
          'Gridded daily surface meteorological data covering the continental US',
        metadata: {
          tags: ['climate'],
        },
        driver: 'intake.catalog.local.YAMLFileCatalog',
        args: {
          path: '{{CATALOG_DIR}}/gridmet.yaml',
        },
      },
      terraclimate: {
        name: 'TerraClimate',
        description:
          'Global gridded monthly climate and hydroclimate data from 1958-present.',
        metadata: {
          tags: ['climate'],
        },
        driver: 'intake.catalog.local.YAMLFileCatalog',
        args: {
          path: '{{CATALOG_DIR}}/terraclimate.yaml',
        },
      },
      maca: {
        name: 'MACA',
        description:
          'Statistically downscaled climate data using the MACA method.',
        metadata: {
          tags: ['climate'],
        },
        driver: 'intake.catalog.local.YAMLFileCatalog',
        args: {
          path: '{{CATALOG_DIR}}/maca.yaml',
        },
      },
      fia: {
        name: 'Forest Inventory Analysis (FIA)',
        description:
          'Catalog for data from Forest Inventory Analysis (FIA) database',
        metadata: {
          tags: ['forests'],
        },
        driver: 'intake.catalog.local.YAMLFileCatalog',
        args: {
          path: '{{CATALOG_DIR}}/fia.yaml',
        },
      },
      fluxnet: {
        name: 'FLUXNET',
        description: 'Catalog for data from the FLUXNET dataset',
        metadata: {
          tags: ['climate', 'carbon'],
        },
        driver: 'intake.catalog.local.YAMLFileCatalog',
        args: {
          path: '{{CATALOG_DIR}}/fluxnet.yaml',
        },
      },
      gcp: {
        name: 'Global Carbon Project (GCP)',
        description: 'Catalog for data from the Global Carbon Project',
        metadata: {
          tags: ['climate', 'carbon'],
        },
        driver: 'intake.catalog.local.YAMLFileCatalog',
        args: {
          path: '{{CATALOG_DIR}}/gcp.yaml',
        },
      },
      mtbs: {
        name: 'Monitoring Trends in Burn Severity (MTBS)',
        description:
          'Catalog for data from the Monitoring Trends in Burn Severity (MTBS) dataset',
        metadata: {
          tags: ['forests'],
        },
        driver: 'intake.catalog.local.YAMLFileCatalog',
        args: {
          path: '{{CATALOG_DIR}}/mtbs.yaml',
        },
      },
      nftd: {
        name: 'National Forest Type Database (NFTD)',
        description:
          'Catalog for data from the National Forest Type Database (NFTD)',
        metadata: {
          tags: ['forests'],
        },
        driver: 'intake.catalog.local.YAMLFileCatalog',
        args: {
          path: '{{CATALOG_DIR}}/nftd.yaml',
        },
      },
      nlcd: {
        name: 'National Land Cover Database (NLCD)',
        description:
          'Catalog for data from the National Land Cover Database (NLCD)',
        metadata: {
          tags: ['forests'],
        },
        driver: 'intake.catalog.local.YAMLFileCatalog',
        args: {
          path: '{{CATALOG_DIR}}/nlcd.yaml',
        },
      },
      projects: {
        name: 'CarbonPlan Project Reports',
        description: 'CarbonPlan Projects Dataset Catalog',
        metadata: {
          tags: ['carbon'],
        },
        driver: 'intake.catalog.local.YAMLFileCatalog',
        args: {
          path: '{{CATALOG_DIR}}/projects.yaml',
        },
      },
      spawnetal2020: {
        name: 'Global Above- and Belowground Biomass',
        description:
          'Catalog for data from Global Aboveground and Belowground Biomass Carbon Density Maps for the Year 2010 from Spawn et al (2020)',
        metadata: {
          tags: ['forests'],
        },
        driver: 'intake.catalog.local.YAMLFileCatalog',
        args: {
          path: '{{CATALOG_DIR}}/spawnetal2020.yaml',
        },
      },
      grids: {
        name: 'Project Grids',
        description: 'Catalog grid files and domain definitions.',
        metadata: {
          tags: ['meta'],
        },
        driver: 'intake.catalog.local.YAMLFileCatalog',
        args: {
          path: '{{CATALOG_DIR}}/grids.yaml',
        },
      },
    },
  },
}
