APP = ui-marketplace

DOCKER_IMAGE = ${APP}:latest
DOCKER_FOLDER = .
DOCKER_CONF = ${DOCKER_FOLDER}/Dockerfile
DOCKER_CONF_SSL = ${DOCKER_FOLDER}/Dockerfile.ssl

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
	DOCKER_BUILDKIT=1 docker build -f ${DOCKER_CONF} -t ${DOCKER_IMAGE} .

docker-build-ssl:
	DOCKER_BUILDKIT=1 docker build -f ${DOCKER_CONF_SSL} -t ${DOCKER_IMAGE} .

docker-run:
	docker run -d \
		--name ${APP} \
		--publish 4200:80 \
		${DOCKER_IMAGE}

docker-run-ssl:
	docker run -d \
		--name ${APP} \
		--publish 4443:443 \
		${DOCKER_IMAGE}
