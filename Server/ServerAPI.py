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
    data = create_response(names, values)

    response = jsonify({'points': data})
    response.headers.add('Access-Control-Allow-Origin', '*')
    return response

@app.route('/getRadarData', methods=['POST', 'GET'])
def getRadarData():
    data = Executor.get_radar_data()
    names, remaining_data = get_radar_specific_data(data)
    response = jsonify({'LegendOptions': names, 'd': remaining_data})
    response.headers.add('Access-Control-Allow-Origin', '*')
    return response

def create_response(xValue, yValue):
    retval =[]
    for index in range(0, len(xValue)):
        retval.append({"X": xValue[index], "Y": yValue[index]})

    return retval

def get_radar_specific_data(data):
    player_names = []
    player_data = []

    for index, row in data.iterrows():
        current_player = []
        player_names.append(row['player_name'])
        
        current_player.append({"axis":'Height', "value":float(row['height']) / 100})
        current_player.append({"axis":'Weight', "value":float(row['weight']) / 100})
        current_player.append({"axis":'Crossing', "value":float(row['height']) / 100})
        current_player.append({"axis":'Finishing', "value":float(row['height']) / 100})
        current_player.append({"axis":'Short Passing', "value":float(row['height']) / 100})
        current_player.append({"axis":'Volleys',"value":float(row['height']) / 100})
        current_player.append({"axis":'Dribbling', "value":float(row['height']) / 100})
        current_player.append({"axis":'Free Kick Accuracy', "value":float(row['free_kick_accuracy']) / 100})
        current_player.append({"axis":'Long Passing', "value":float(row['long_passing']) / 100})
        current_player.append({"axis":'Ball Control', "value":float(row['ball_control']) / 100})
        current_player.append({"axis":'Acceleration', "value":float(row['acceleration']) / 100})
        current_player.append({"axis":'Sprint Speed', "value":float(row['sprint_speed']) / 100})
        current_player.append({"axis":'Agility', "value":float(row['agility']) / 100})
        current_player.append({"axis":'Reactions', "value":float(row['reactions']) / 100})
        current_player.append({"axis":'Balance', "value":float(row['balance']) / 100})
        current_player.append({"axis":'GK Diving', "value":float(row['gk_diving']) / 100})
        current_player.append({"axis":'GK Positioning', "value":float(row['gk_positioning']) / 100})
        current_player.append({"axis":'GK Reflexes', "value":float(row['gk_reflexes']) / 100})
        current_player.append({"axis":'GK Handling', "value":float(row['gk_handling']) / 100})
        current_player.append({"axis":'Strength', "value":float(row['strength']) / 100})
        current_player.append({"axis":'Stamina', "value":float(row['stamina']) / 100})
        current_player.append({"axis":'Sliding Tackle', "value":float(row['sliding_tackle']) / 100})
        current_player.append({"axis":'Standing Tackle', "value":float(row['standing_tackle']) / 100})
        current_player.append({"axis":'Marking', "value":float(row['marking']) / 100})
        current_player.append({"axis":'Aggression', "value":float(row['aggression']) / 100})
        current_player.append({"axis":'Interceptions', "value":float(row['interceptions']) / 100})
        player_data.append(current_player)

    return player_names, player_data

if __name__ == "__main__":
    app.run(host='127.0.0.1', port=5000, debug=True)