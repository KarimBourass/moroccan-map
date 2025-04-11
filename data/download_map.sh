#!/bin/bash

set -e

# Create the data directory if it doesn't exist
mkdir -p data

# Download the map file if not already downloaded
if [ ! -f data/osm_morocco.mbtiles ]; then
  echo "Downloading Morocco map..."
  curl -L "https://data.maptiler.com/download/WyIwMjc0M2M1ZC00MmM3LTQyODEtODVkYy1kYjZmM2E2NGM0NDEiLG51bGwsMTcwMzJd.Z_j5Og.o2hzMakcD3WxDS5a5wSLlTqdu8Y/maptiler-osm-2020-02-10-v3.11-africa_morocco.mbtiles" -o data/osm_morocco.mbtiles
  echo "Download complete!"
else
  echo "Map file already exists. Skipping download."
fi