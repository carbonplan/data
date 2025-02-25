#!/bin/bash
for state in AK AL AS CA CT DC DE FL GA GU HI LA MA MD ME MP MS NC NH NJ NY OR PA PR RI SC TX VA VI WA; do
  echo "Processing state: $state"
  rclone copy "noaa_slr_tmp:Depth_Rasters/$state/" aws:carbonplan-data/NOAA_SLR/Depth_Rasters/$state/ \
    --include "*.tif" \
    --progress \
    --transfers=32 \
    --checkers=16 \
    --retries=3 \
    --retries-sleep=10s \
    --stats=30s \
    --stats-one-line
done

