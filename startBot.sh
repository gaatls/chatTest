#!/bin/bash

#Setup the necessary tokens for wit and slack
echo "Exporting Variables"
export SLACK_TOKEN=xoxb-62001164068-kOd7MJNCFqqJ1Qyy6OUznY37
export AI_TOKEN=e2818306090b4df2a7afc125041a61a7
echo "Variable export done"

#start the node process
echo "Starting Node..."
node --harmony index.js