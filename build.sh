#!/usr/bin/env bash

echo "Building Angular app for $NODE_ENV"

build_stage='ng build --configuration=staging && ng run memologist:server'
if [ $NODE_ENV = "staging" ]; then
 echo "running $build_stag ..."
 eval "$build_stag"
fi

build_prod='ng build && ng run memologist:server'
if [ $NODE_ENV = "production" ]; then
 echo "running $build_prod ..."
 eval "$build_prod"
fi
