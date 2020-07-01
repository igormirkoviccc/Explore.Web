#!/usr/bin/env bash
docker-compose down -v
#remove all
docker stop `docker ps -qa`
docker rm `docker ps -qa`
docker rmi -f `docker images -qa `
docker network rm `docker network ls -q`
docker volume prune
docker system prune -a -f
sudo rm -rf firm_api/node_modules/ firm_dashboard/node_modules/ gateway_api/node_modules/ gateway_dashboard/node_modules/ symbolset_api/node_modules/ volumes/f* volumes/gateway-database/
#ovo resetuje sve ispocetka
