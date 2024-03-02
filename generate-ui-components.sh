#!/bin/bash

jq -c '.entities[]' ./schema/ui-schema-marketplace.json | while read i; do
	ENTITY=$(echo $i | jq -r '.ui')
	FIELDS=$(echo $i | jq -c '.fields')
	ng generate @schambeck/ng-crud-generator:ng-entity --name ${ENTITY} --path src/app/shared/model --fields ${FIELDS}
	ng generate @schambeck/ng-crud-generator:ng-service --name ${ENTITY} --path src/app/shared/service
	ng generate @schambeck/ng-crud-generator:ng-screen-module --name ${ENTITY} --path src/app/feature/${ENTITY}-screen
	ng generate @schambeck/ng-crud-generator:ng-list-component --name ${ENTITY} --path src/app/feature/${ENTITY}-screen/list-${ENTITY} --fields ${FIELDS}
	ng generate @schambeck/ng-crud-generator:ng-edit-component --name ${ENTITY} --path src/app/feature/${ENTITY}-screen/edit-${ENTITY} --fields ${FIELDS}
	ng generate @schambeck/ng-crud-generator:ng-autocomplete-component --name ${ENTITY} --path src/app/feature/custom-autocomplete-component/${ENTITY}-autocomplete
done
