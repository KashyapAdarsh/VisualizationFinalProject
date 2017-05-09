import sqlite3
import pandas as pd

DATABASE_PATH = "../Database/"
DATABASE_NAME = "database.sqlite"

PLAYER_API_ID = 'player_api_id'
PLAYER_FIFA_API_ID = 'player_fifa_api_id'

class QueryExecutor:

    # This function is used to get the top N players
    # based on overall rating.
    def get_top_n_players(self, n):
        print 'TODO'


    # This function is used to get the top N players
    # based on the category chosen.
    def get_top_n_players_in_category(self, n, category):
        connection = sqlite3.connect(DATABASE_PATH + DATABASE_NAME)
        player_data = pd.read_sql_query("Select * from Player", connection)
        player_attributes = pd.read_sql_query("Select * from Player_Attributes", connection)

        key_attributes = ['id', PLAYER_FIFA_API_ID, PLAYER_API_ID, category]
        player_attributes.nlargest(1, category)[key_attributes]

        # Dataset with average of each player based on that category
        category_dataset = player_attributes.groupby([PLAYER_API_ID], as_index = False)[category].mean()
        top_n_players_in_category = category_dataset.nlargest(n, category)
        top_n_player_names = pd.merge(top_n_players_in_category, player_data, on = [PLAYER_API_ID], how = 'outer')

        # returning player names, category value
        return top_n_player_names['player_name'].head(n).tolist(), top_n_player_names[category].head(n).tolist()


    def get_radar_data(self):
        connection = sqlite3.connect(DATABASE_PATH + DATABASE_NAME)
        player_data = pd.read_sql_query("Select * from Player", connection)
        player_attributes = pd.read_sql_query("Select * from Player_Attributes", connection)

        key_attributes = ['id', PLAYER_FIFA_API_ID, PLAYER_API_ID, 'crossing', 'dribbling', 'overall_rating']
        player_attributes.nlargest(1, 'overall_rating')[key_attributes]

        player_name_and_id = pd.merge(player_data,player_attributes,on=['player_api_id'],how='outer')
        average_rating_for_each_player = player_name_and_id.groupby(['player_name','player_api_id','player_fifa_api_id_x']).mean().reset_index()

        required_columns = ['player_name', 'player_api_id', 'player_fifa_api_id_x', 'height', 'weight', 'overall_rating', 'crossing', 'finishing', 'heading_accuracy', 'short_passing', 'volleys', 'dribbling', 'free_kick_accuracy', 'long_passing', 'ball_control', 'acceleration', 'sprint_speed', 'agility', 'reactions', 'balance', 'shot_power', 'stamina', 'strength', 'long_shots', 'aggression', 'interceptions', 'positioning', 'vision', 'penalties', 'marking', 'standing_tackle', 'sliding_tackle', 'gk_diving', 'gk_handling', 'gk_kicking', 'gk_positioning', 'gk_reflexes']
        average_rating_for_each_player = average_rating_for_each_player[required_columns]
        average_rating_for_each_player = average_rating_for_each_player.nlargest(10, 'overall_rating')
        return average_rating_for_each_player.head(10)


    def __init__(self):
        print "nothing"