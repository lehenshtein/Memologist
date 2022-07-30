#!/usr/bin/env bash

echo "Building Angular app for $NODE_ENV"

build_stage='ng build --configuration=staging && ng run memologist:server:staging'
if [ $NODE_ENV = "staging" ]; then
 echo "running $build_stage ..."
 eval "$build_stage"
fi

build_prod='ng build && ng run memologist:server:production'
if [ $NODE_ENV = "production" ]; then
 echo "running $build_prod ..."
 eval "$build_prod"
fi
