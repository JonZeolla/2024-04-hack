#!/usr/bin/env python3
"""
Ollama running llama2:7b to start; future is move to bedrock
connect to AWS with boto3 and pull data to feed to the llama2 prompts
"""

import os
import subprocess
from langchain_community.chat_models import ChatOllama
from langchain_core.prompts import PromptTemplate
from guard_duty import get_findings


def main():
    try:
        output = subprocess.check_output(["pgrep", "-f", "ollama"])
        print("Ollama is already running!")
    except subprocess.CalledProcessError:
        print("Ollama is not running. Starting it...")
        subprocess.Popen(["ollama", "serve"], stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)

    get_findings()

    protocol = "http"
    fqdn = "localhost"
    port = 11434

    host = f"{protocol}://{fqdn}:{port}"
    model = "llama2:7b"
    llm = ChatOllama(base_url=host, model=model)

    template = "Tell me something interesting about the Roman Empire"
    prompt = PromptTemplate.from_template(template)

    # langchain_ollama = ChatOllama(model=model, base_url=host)
    #chain = prompt | llm
    #response = chain.invoke({})
    #print(response)


if __name__ == "__main__":
    main()
