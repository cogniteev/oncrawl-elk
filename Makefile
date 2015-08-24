export ELK_APP ?= elk
export ELK_CONFIG ?= standard.yml
DOCKER_COMPOSE ?= docker-compose
DOCKER ?= docker

EXTRA_IMAGES = 												\
	cogniteev/elk-kibana-config:latest 	\
	cogniteev/elk-logstash:latest 			\
	cogniteev/elk-export-es-index

ps logs rm kill:
	@$(DOCKER_COMPOSE) -p $(ELK_APP) -f $(ELK_CONFIG) $@

env:
	@echo alias dc-$(ELK_APP)=\"$(DOCKER_COMPOSE) -p ''\''$(ELK_APP)'\''' -f ''\''$(PWD)/$(ELK_CONFIG)'\'''\"

pull:
	$(DOCKER_COMPOSE) -f $(ELK_CONFIG) pull
	$(foreach image,$(EXTRA_IMAGES),docker pull $(image);)

up:
	$(DOCKER_COMPOSE) -p $(ELK_APP) -f $(ELK_CONFIG) up -d

wait:
	$(DOCKER) wait `$(MAKE) ps | awk '{print $$1}' | tail -n +3 | grep "kibana_1$$"`
