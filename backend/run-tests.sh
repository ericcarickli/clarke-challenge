#!/bin/bash

# Start Docker Compose in detached mode
docker-compose -f backend/docker-compose-test.yml up --build -d

# Run the tests
docker-compose -f backend/docker-compose-test.yml run --rm backend npm test

# Stop and remove containers
docker-compose -f backend/docker-compose-test.yml down --remove-orphans
