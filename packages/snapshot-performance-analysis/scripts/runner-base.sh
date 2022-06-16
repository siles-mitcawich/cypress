#!/usr/bin/env bash

set -o pipefail;
DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" >/dev/null 2>&1 && pwd )"

ROOT=$DIR/../../..
ELECTRON=$ROOT/node_modules/.bin/electron
APP=$ROOT/packages/snapshot-performance-analysis/app/index.js
NUMBER_OF_RUNS=$1

export RUN='react'
export RUN_AGAINST_EXPERIMENT_DIRECTORY=1
export PROJECT_BASE_DIR=`pwd`

function run {
  CLEAR_DATA=1 $ELECTRON $APP
  for (( i = 0; i <= $NUMBER_OF_RUNS; i++ )) ; do $ELECTRON $APP; done
  DUMP_RESULTS=1 $ELECTRON $APP
}

# Vanilla
export ASSET_TYPE='vanilla'
run

# Bundle 
# export ASSET_TYPE='bundle'
# run

# ## Bundle minified
# export ASSET_TYPE='bundle_minify'
# run