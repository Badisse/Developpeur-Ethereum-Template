# Hardhat X Typescript X Docker
> Starter kit for Hardhat (typescript) working with Docker and Docker Compose.  

## Table of Contents
* [General Info](#general-information)
* [Technologies Used](#technologies-used)
* [Setup](#setup)
* [Project Status](#project-status)
* [Room for Improvement](#room-for-improvement)


## General Information
- No dependencies required except [Docker](https://docs.docker.com/) and [Docker Compose](https://docs.docker.com/compose/compose-file/)
- Build an app from scratch with [Hardhat](https://hardhat.org/hardhat-runner/docs/getting-started)


## Technologies Used
- Docker - version 20.10.18
- Docker Compose - version 3.8
- Hardhat - version 2.12.0
- Typescript - version 4.8.4


## Setup
### Requirements
Before using this repo, make sure you have installed:
- [Docker](https://docs.docker.com/engine/install/)
- [Docker Compose](https://docs.docker.com/compose/install/)

### Get started
First you have to get the repo
```bash
# Clone the repo 
git clone git@github.com:Badisse/hardhat-typescript-docker-template.git

# Get into the repo
cd hardhat-typescript-docker-template
```

You can now run the project:

```bash
# Build container
make build

# Run the container
make start
```


## Project Status
Project is: _in progress_ 


## Room for Improvement
- Improve the docker image
- Improve the docker compose setup
- Improve the makefile

