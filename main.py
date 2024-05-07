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

def ask_another_prompt():
    print("Do you want to ask another prompt? y/n")
    ask_prmpt = input()
    return ask_prmpt

def get_another_prompt():
    another_prompt = input()    
    return another_prompt

def main():
    try:
        output = subprocess.check_output(["pgrep", "-f", "ollama"])
        print("Ollama is already running!")
    except subprocess.CalledProcessError:
        print("Ollama is not running. Starting it...")
        subprocess.Popen(["ollama", "serve"], stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)

    json_findings = get_findings()

    protocol = "http"
    fqdn = "localhost"
    port = 11434

    host = f"{protocol}://{fqdn}:{port}"
    model = "llama2:7b"
    llm = ChatOllama(base_url=host, model=model)
    ask_prompt = True 
    while ask_prompt:
        prompt = get_another_prompt()
        template = f'Here is my json data {json_findings} and {prompt}'
        prompt = PromptTemplate.from_template(template)
        another_prmpt = ask_another_prompt()
        if another_prmpt.lower() in ["y","yes"]:
            ask_prompt = False
    # langchain_ollama = ChatOllama(model=model, base_url=host)
    #chain = prompt | llm
    #response = chain.invoke({})
    #print(response)


if __name__ == "__main__":
    main()
