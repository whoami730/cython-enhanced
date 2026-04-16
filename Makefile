#!/bin/make

all: init

install: init build-lang-server

build: syntax build-lang-server

init:
	npm install

dev:
	npm install --include=dev

syntax:
	node scripts/build-syntax.js

build-lang-server:
	cd cyright/packages/vscode-pyright && npm run webpack

vsix: syntax build-lang-server
	npm run package