IMAGE   := node:24-alpine
WORKDIR := /app
RUN     := docker run --rm \
             -v "$(PWD)":$(WORKDIR) \
             -w $(WORKDIR) \
             $(IMAGE)

.PHONY: install build start dev codegen format format-check

install:
	$(RUN) npm ci

build:
	$(RUN) npm run build

start:
	$(RUN) npm start

dev:
	$(RUN) npm run dev

codegen:
	$(RUN) npm run codegen

format:
	$(RUN) npm run format

format-check:
	$(RUN) npm run format:check
