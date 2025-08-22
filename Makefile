APP = ui-marketplace

DOCKER_IMAGE = ${APP}:latest
DOCKER_FOLDER = .
DOCKER_CONF = ${DOCKER_FOLDER}/Dockerfile
DOCKER_CONF_TAILSCALE = ${DOCKER_FOLDER}/Dockerfile.tailscale
DOCKER_CONF_DEV = ${DOCKER_FOLDER}/Dockerfile.dev
#REPO = schambeck
REPO = southamerica-east1-docker.pkg.dev/prj-marketplace/repo/schambeck

# angular

deps:
	npm install

run:
	ng serve -o

generate-ui-components:
	./generate-ui-components.sh

build:
	npm run build

build-prod:
	npm run build:prod

# docker

docker-build:
	docker build -f ${DOCKER_CONF} -t ${DOCKER_IMAGE} .

docker-build-tailscale:
	docker build -f ${DOCKER_CONF_TAILSCALE} -t ${DOCKER_IMAGE} .

docker-build-dev:
	docker build -f ${DOCKER_CONF_DEV} -t ${DOCKER_IMAGE} .

docker-tag:
	docker tag ${APP} ${REPO}/${DOCKER_IMAGE}

docker-push:
	docker push ${REPO}/${DOCKER_IMAGE}

docker-pull:
	docker pull ${REPO}/${DOCKER_IMAGE}

docker-run:
	docker run -d \
		--name ${APP} \
		--publish 4200:80 \
		${DOCKER_IMAGE}

docker-run-tailscale:
	docker run -d \
		--name ${APP} \
		--publish 443:443 \
		${DOCKER_IMAGE}
