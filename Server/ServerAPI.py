from flask import Flask, request, jsonify, Response, render_template
from Connection import QueryExecutor
import ServerHelper

app = Flask(__name__)
Executor = QueryExecutor()

@app.route('/')
def index():
    return render_template('../index2.html')


@app.route('/getCollapsibleTreeData', methods=['POST', 'GET'])
def getCollapsibleTreeData():
    requestType = request.form['name']
    print("Received request")

    response = []
    if(requestType == "collapsible_tree"):
        data = ServerHelper.make_JSON()
        
    response = jsonify({'DATA': data})
    response.headers.add('Access-Control-Allow-Origin', '*')
    return response

# API to get the top - n players in each category
@app.route('/getTopNInCategory', methods=['POST', 'GET'])
def getTopNInCategory():
    N = request.form['N']
    category = request.form['category']

    names, values = Executor.get_top_n_players_in_category(int(N), category)
    data = ServerHelper.create_response_for_bargraph(names, values)

    response = jsonify({'points': data})
    response.headers.add('Access-Control-Allow-Origin', '*')
    return response

@app.route('/getRadarData', methods=['POST', 'GET'])
def getRadarData():
    data = Executor.get_radar_data()
    names, remaining_data = ServerHelper.get_radar_specific_data(data)
    response = jsonify({'LegendOptions': names, 'd': remaining_data})
    response.headers.add('Access-Control-Allow-Origin', '*')
    return response

if __name__ == "__main__":
    app.run(host='127.0.0.1', port=5000, debug=True)