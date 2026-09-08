#!/bin/bash
set -e

REMOTE_HOST="fly@web.foxjazz.net"
REMOTE_PORT="2232"
REMOTE_PATH="/var/web/poly"
BUILD_DIR="dist/Fox2PolyFront/browser"

echo "Building Angular app..."
ng build --configuration production

echo "Deploying to $REMOTE_HOST:$REMOTE_PATH ..."
rsync -avz --delete -e "ssh -p $REMOTE_PORT" "$BUILD_DIR"/ "$REMOTE_HOST:$REMOTE_PATH"/

echo "Deployed. Live at https://poly.foxjazz.net"
