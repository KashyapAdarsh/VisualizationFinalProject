import sqlite3
import pandas as pd
import json


def make_JSON() :
    conn = sqlite3.connect('..\\database\\database.sqlite')

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