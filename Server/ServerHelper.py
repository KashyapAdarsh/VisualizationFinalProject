import sqlite3
import pandas as pd
import json


def make_JSON() :
    conn = sqlite3.connect('../Database/database.sqlite')

    json_data = {}
    root = "country"

    # Adding first level data - Root
    json_data["name"] = root
    json_data["children"] = []

    # Get all the Countries for first level data
    pdf_country = pd.read_sql_query("SELECT * from Country",conn)
    Countries = pdf_country['name'].tolist()

    # Adding second level data - Country names
    for country in Countries:
        children = {}
        children["name"] = country
        children["children"] = []
        json_data["children"].append(children)

        # Get all the leagues
        pdf_league = pd.read_sql_query("SELECT * from League",conn)
        Leagues = pdf_league['name'].tolist()

    # Adding third level data - League names
    for i in range(len(Countries)):
        children = {}
        children["name"] = Leagues[i]
        children["children"] = []
        json_data["children"][i]["children"].append(children)

    # Adding fourth level data - Team names    
    league_id = pdf_league['id'].tolist()
    
    teams_per_league = []
    
    # Fetching all the team names from ID's from two different table
    for ID in league_id:
        pdf_match = pd.read_sql_query("SELECT home_team_api_id, away_team_api_id from Match where league_id = %s" % ID,conn)   
        teams = set(pdf_match['home_team_api_id'].tolist() + pdf_match['away_team_api_id'].tolist())
        team_names = []
        for team in teams:
            team_names = team_names + (pd.read_sql_query("SELECT team_long_name from Team where team_api_id = %s" % team, conn)['team_long_name'].tolist())
        teams_per_league.append(team_names)
    
    for i in range(len(Countries)):
        for team in teams_per_league[i]: 
            children = {}
            children["name"] = team
            #children["children"] = []
            json_data["children"][i]["children"][0]["children"].append(children) 
     
    return json_data

def create_response_for_bargraph(xValue, yValue):
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

def create_parallelcoordinate_response(attributes):
    data = {}
    print "Len: ", len(attributes)
    data.update({"A": attributes[0][0], "B": attributes[0][1], "C": attributes[0][2], "D": attributes[0][3], "E": attributes[0][4]})
    return data