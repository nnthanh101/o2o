#!/bin/bash
#

# Read config
API_PORT=${IPFS_ADDRES_API:-"5001"}
GATEWAY_PORT=${IPFS_ADDRES_GATEWAY:-"8081"}

# Update config
ipfs config Addresses.API /ip4/0.0.0.0/tcp/$API_PORT
ipfs config Addresses.Gateway /ip4/0.0.0.0/tcp/$GATEWAY_PORT
ipfs config --json API.HTTPHeaders.Access-Control-Allow-Origin "[\"*\"]"

# Run daemon
ipfs daemon --init
