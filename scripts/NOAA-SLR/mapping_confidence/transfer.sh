#!/bin/bash
for state in AK AL AS CA CNMI CT DC DE FL GA Guam HI LA MA MD ME MS NC NH NJ NY OR PA PR RI SC TX USVI VA WA; do
  echo "Processing state: $state"
  rclone copy "noaa_slr_tmp:Mapping_Confidence/$state/" aws:carbonplan-data/NOAA_SLR/Mapping_Confidence/$state/ \
    --include "*.tif" \
    --progress \
    --transfers=32 \
    --checkers=16 \
    --retries=3 \
    --retries-sleep=10s \
    --stats=30s \
    --stats-one-line
done

