#!/bin/bash

rclone copy "noaa_slr_tmp:Tidal_Surfaces/" aws:carbonplan-data/NOAA_SLR/Tidal_Surfaces/ \
--include "*.tif" \
--progress \
--transfers=32 \
--checkers=16 \
--retries=3 \
--retries-sleep=10s \
--stats=30s \
--stats-one-line

