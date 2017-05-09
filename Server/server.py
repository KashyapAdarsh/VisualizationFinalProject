import numpy as np
import pandas as pd
import matplotlib.pylab as plt
import random
import operator
import get_tree_data

from flask import Flask, render_template, request, jsonify
app = Flask(__name__)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/getData', methods=['POST', 'GET'])
def getData():
    requestType = request.form['name']
    print("Received request")

    response = []
    if(requestType == "collapsible_tree"):
        data = get_tree_data.make_JSON()
        
    response = jsonify({'DATA': data})
    response.headers.add('Access-Control-Allow-Origin', '*')
    return response

if __name__ == "__main__":
    app.run(host = '127.0.0.1', port = 5000, debug = True)