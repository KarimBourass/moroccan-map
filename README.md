# Moroccan Map

An Angular application that provides an interactive map of Morocco using MapLibre GL and Leaflet, with offline tile support via TileServer GL.

## Overview

This project allows users to:
- View and interact with a detailed map of Morocco
- Access the map offline after initial download
- Deploy the application locally or via Docker

## Features

- Offline map data for Morocco
- Interactive map interface
- Responsive design
- Docker containerization for easy deployment

## Prerequisites

- Node.js (v18 or higher recommended)
- npm (v9 or higher)
- Docker and Docker Compose (for containerized deployment)
- Bash shell (for running the download script)

## Installation

### Local Development Setup

1. Clone the repository:
   ```bash
   git clone [repository-url]
   cd moroccan-map
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Make the download script executable:
   ```bash
   chmod +x download_map.sh
   ```

4. Download the map data:
   ```bash
   ./download_map.sh
   ```

### Docker Setup

1. Make the download script executable:
   ```bash
   chmod +x download_map.sh
   ```

2. Run the Docker Compose setup:
   ```bash
   docker-compose up -d
   ```
   This will:
   - Download the Morocco map data if not already present
   - Start the TileServer GL container to serve the map tiles

## Usage

### Running the Application Locally

```bash
npm start
```

The application will be available at `http://localhost:4200/`.

### Accessing the Map Server

The TileServer GL instance will be available at `http://localhost:8080/`.

## Project Structure

- `/src` - Angular application source code
- `/data` - Map data storage (created by the download script)
- `download_map.sh` - Script to download Morocco map tiles
- `docker-compose.yaml` - Docker Compose configuration for TileServer GL

## Technologies Used

- Angular 19
- MapLibre GL
- Leaflet
- TileServer GL
- Docker


## Acknowledgements

- Map data provided by OpenStreetMap contributors
- Tile data hosted by MapTiler