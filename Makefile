ELK_APP ?= elk
ELK_CONFIG ?= standard

DOCKER_COMPOSE ?= docker-compose

env:
	@echo alias dc-$(ELK_APP)=\"$(DOCKER_COMPOSE) -p ''\''$(ELK_APP)'\''' -f ''\''$(ELK_CONFIG).yml'\'''\"
