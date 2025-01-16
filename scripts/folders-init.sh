#!/bin/bash

# Get all command-line arguments
resource_name="$1"
file_name="$1"

cd ..
# Check if resource name is provided
if [ -z "$resource_name" ]; then
    echo "Error: No resource name provided."
    exit 1
fi


# Check if resource_name has a trailing 's'
if [[ "$resource_name" == *s ]]; then
    file_name="${resource_name%s}"

    else
    mv src/"$resource_name" src/"${resource_name}s"
    resource_name="${resource_name}s"
fi

# Moves the resource from src to src/resources
 mv src/"$resource_name" src/resources && cd src/resources/"$resource_name" || exit 1

 # Creates all directories
 mkdir -p controllers
 mkdir -p services
 mkdir -p tests
 mkdir -p types
 mkdir -p constants
 mkdir -p utils

 # Move existing files to their respective directories.
 mv ./*.controller.ts ./controllers
 mv ./*.service.ts ./services
 mv ./*.spec.ts ./tests

 # Moves existing dto to inbound, then creates response dto and moving to outbound.
 cd dto || exit 1
 mkdir -p inbound && mkdir -p outbound
 mv ./*.dto.ts inbound
 touch "$file_name"_response.dto.ts && mv *_response.dto.ts outbound
 cd ..


# Create constant.ts file
 cd constants || exit 1
 touch "$file_name".constant.ts
 cd ..

 # Create enums.ts and interfaces file
 cd types || exit 1
 touch "$file_name".interfaces.ts && touch "$file_name".enums.ts
 cd ..


mkdir -p utils && cd utils || exit 1
touch "$file_name".utils.ts
cd ..
