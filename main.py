#!/usr/bin/env python3
"""
Ollama running llama2:7b to start; future is move to bedrock
connect to AWS with boto3 and pull data to feed to the llama2 prompts
"""

from langchain_community.chat_models import ChatOllama
from langchain_core.prompts import PromptTemplate


def main():
    protocol = "http"
    fqdn = "localhost"
    port = 11434

    host = f"{protocol}://{fqdn}:{port}"
    model = "llama2:7b"
    llm = ChatOllama(base_url=host, model=model)

    template = "Tell me something interesting about the Roman Empire"
    prompt = PromptTemplate.from_template(template)

    # langchain_ollama = ChatOllama(model=model, base_url=host)
    chain = prompt | llm
    response = chain.invoke({})
    print(response)


if __name__ == "__main__":
    main()
