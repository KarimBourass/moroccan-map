FROM alpine:latest

# Install curl and bash
RUN apk add --no-cache curl bash

# Copy the download script into the image
COPY ./data/download_map.sh /download_map.sh

# Make the script executable
RUN chmod +x /download_map.sh

# Set the entrypoint to run the script
ENTRYPOINT ["/download_map.sh"]
