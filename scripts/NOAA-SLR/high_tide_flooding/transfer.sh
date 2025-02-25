#!/bin/bash

rclone copy "noaa_slr_tmp:High_Tide_Flooding/" aws:carbonplan-data/NOAA_SLR/High_Tide_Flooding/ \
--include "*.tif" \
--progress \
--transfers=32 \
--checkers=16 \
--retries=3 \
--retries-sleep=10s \
--stats=30s \
--stats-one-line

