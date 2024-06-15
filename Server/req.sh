#!/bin/bash

# URL to send requests to
URL="http://localhost:3000"

# Number of iterations
NUM_ITERATIONS=10

# Iterate NUM_ITERATIONS times
for ((i=1; i<=NUM_ITERATIONS; i++))
do
  echo "Sending request #$i"
  curl -X GET $URL &
done

wait
echo ""
echo "all request sent!"
