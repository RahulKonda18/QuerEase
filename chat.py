import random
import json

import torch

from model import NeuralNet
from nltk_utils import bag_of_words, tokenize

device = torch.device('cuda' if torch.cuda.is_available() else 'cpu')

with open('intents.json', 'r') as json_data:
    intents = json.load(json_data)

FILE = "data.pth"
data = torch.load(FILE)

input_size = data["input_size"]
hidden_size = data["hidden_size"]
output_size = data["output_size"]
all_words = data['all_words']
tags = data['tags']
model_state = data["model_state"]

model = NeuralNet(input_size, hidden_size, output_size).to(device)
model.load_state_dict(model_state)
model.eval()

bot_name = "Sam"


def get_response(msg):
    sentence = tokenize(msg)
    X = bag_of_words(sentence, all_words)
    X = X.reshape(1, X.shape[0])
    X = torch.from_numpy(X).to(device)

    output = model(X)
    _, predicted = torch.max(output, dim=1)

    tag = tags[predicted.item()]

    probs = torch.softmax(output, dim=1)
    prob = probs[0][predicted.item()]
    if prob.item() > 0.75:
        for intent in intents['intents']:
            if tag == intent["tag"]:
                return ({
                    "answer": random.choice(intent['responses']),
                    "category": tag,
                    "similar": intent['patterns']
                })
    for intent in intents['intents']:
        if "unknown" == intent["tag"]:
            intent['patterns'].append(msg)

    # writing new data onto the json file
    newdata = json.dumps(intents, indent=4)
    with open('modified.json', 'w') as file:
        file.write(newdata)

    return ({
        "answer": "Thank you for your question! It seems currently I don't have information on that "
                  "specific question. I have escalated your query to our concerned team and"
                  " they will get back to you shortly.",
        "category": "new query",
        "similar": "NA"
    })


if __name__ == "__main__":
    print("Let's chat! (type 'quit' to exit)")
    while True:
        # sentence = "do you use credit cards?"
        sentence = input("You: ")
        if sentence == "quit":
            break

        resp = get_response(sentence)
        print(resp)
