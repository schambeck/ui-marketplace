APP = ui-marketplace
VERSION = 1.0.0

DOCKER_IMAGE = ${APP}:latest
DOCKER_FOLDER = .
DOCKER_CONF = ${DOCKER_FOLDER}/Dockerfile

# angular

deps:
	npm install

run:
	ng serve -o

generate-ui-components:
	./generate-ui-components.sh

dist:
	npn run build

# docker

docker-build:
	DOCKER_BUILDKIT=1 docker build -f ${DOCKER_CONF} -t ${DOCKER_IMAGE} .

docker-run:
	docker run -d \
		--name ${APP} \
		--publish 4200:80 \
		${DOCKER_IMAGE}
