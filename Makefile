IMAGE   := node:24-alpine
WORKDIR := /app
RUN     := docker run --rm \
             -v "$(PWD)":$(WORKDIR) \
             -w $(WORKDIR) \
             $(IMAGE)

.PHONY: install build start dev codegen schema format format-check

install:
	$(RUN) npm ci

build:
	$(RUN) npm run build

start:
	$(RUN) npm start

dev:
	$(RUN) npm run dev

schema:
	$(RUN) npm run schema:fetch

codegen:
	$(RUN) npm run codegen

format:
	$(RUN) npm run format

format-check:
	$(RUN) npm run format:check
