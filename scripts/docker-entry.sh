#!/bin/bash
ENV=.env
echo "[entry] Creating $ENV"
if [ -e $ENV ]
    echo "[entry] $ENV exists, deleting"
    rm $ENV
fi

echo "NODE_ENV=production" 
echo "TOKEN=$DISCORD_TOKEN"