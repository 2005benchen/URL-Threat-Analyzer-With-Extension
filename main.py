from flask import Flask, render_template, request, jsonify
import requests
import pickle
import pandas as pd
from urllib.parse import urlparse, parse_qs

model = pickle.load(open('static/assets/model.sav', 'rb'))
app = Flask(__name__)
result1 = "Input URL for result"


@app.route('/', methods=["GET", "POST"])
def printFunction():
  if request.method == "GET":
    global result1
    return render_template("index.html", result=result1)

  # Assuming the only other method is POST
  data = request.form["urlInput"]

  # Make a prediction using the model
  url_features = generate_features(data)
  url_df = pd.DataFrame([url_features])
  prediction = model.predict(url_df)

  # Return the prediction
  if prediction[0] == 1:
    result1 = "Benign"
  else:
    result1 = "Malicious"

  return render_template("index.html", result=result1)


@app.route('/about', methods=["GET"])
def about():
  return render_template("about.html")


def parse_url(url):
  parsed_url = urlparse(url)
  components = {
    'scheme': parsed_url.scheme,
    'netloc': parsed_url.netloc,
    'path': parsed_url.path,
    'params': parsed_url.params,
    'query': parsed_url.query,
    'fragment': parsed_url.fragment
  }
  return components


def generate_features(url):
  parsed_components = parse_url(url)
  features = {}

  # Feature: Presence of specific keywords in the URL
  keywords = ['malware', 'phishing', 'attack', 'hacked', '.exe']
  for keyword in keywords:
    features[f'has_{keyword}_keyword'] = int(keyword in url.lower())

  # Feature: Length of different URL components
  for component, value in parsed_components.items():
    features[f'len_{component}'] = len(value)

  return features


app.run(host='0.0.0.0', port=81)
