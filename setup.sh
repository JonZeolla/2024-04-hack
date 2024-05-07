#!/usr/bin/env bash
pipenv install --dev
nohup ollama serve >./ollama.log 2>&1 &
ollama pull llama2:7b
