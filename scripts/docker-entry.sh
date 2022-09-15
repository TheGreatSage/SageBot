#!/bin/bash
ENV=.env
echo "[entry] Creating $ENV"
if [ -e $ENV ]
then
    echo "[entry] $ENV exists, deleting"
    rm $ENV
fi

echo "NODE_ENV=production"  >> $ENV
echo "TOKEN=$DISCORD_TOKEN" >> $ENV

echo "[entry] Running run"
exec "$@"