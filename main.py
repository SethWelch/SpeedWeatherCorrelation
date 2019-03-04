from flask import Flask, jsonify, render_template
import json
import logging

app = Flask(__name__)

@app.route("/")
def home():
    return render_template('index.html')

@app.route("/api/data", methods=['GET'])
def getFileData():
    file = open("sw-cron/data.json", "r+")
    data = file.read()
    file.close()
    return jsonify(data)

@app.after_request
def after_request(response):
  response.headers.add('Access-Control-Allow-Origin', '*')
  response.headers.add('Access-Control-Allow-Headers', 'Content-Type,Authorization')
  response.headers.add('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS')
  return response

if __name__ == "__main__":
    app.run(debug=True)
