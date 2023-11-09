# syntax=docker/dockerfile:1.4

# set docker image to use
FROM node:lts AS development

# set docker directory
WORKDIR /code

# copy package json files to new directory for installation
COPY package.json /code/package.json
COPY package-lock.json /code/package-lock.json

# install packages
RUN npm ci

# copy files from current directory into docker directory (minus dockerignore) 
COPY . /code

FROM development AS builder

FROM development as dev-envs
RUN <<EOF
apt-get update
apt-get install -y --no-install-recommends git
EOF

RUN <<EOF
useradd -s /bin/bash -m vscode
groupadd docker
usermod -aG docker vscode
EOF
# install Docker tools (cli, buildx, compose)
COPY --from=gloursdocker/docker / /

RUN npm run compile