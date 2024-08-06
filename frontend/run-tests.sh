#!/bin/bash

# Start Docker Compose
docker-compose -f frontend/docker-compose-test.yml up

# Stop and remove containers
docker-compose -f frontend/docker-compose-test.yml down --remove-orphans
