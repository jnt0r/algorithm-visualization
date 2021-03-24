#!/bin/bash

apt update
apt -y install nodejs
apt -y install npm

nodejs -v
npm -v

npm install

echo "Environment installation successful"
