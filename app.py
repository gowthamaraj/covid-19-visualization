from flask import Flask
from flask import request, jsonify
from flask_pymongo import PyMongo,DESCENDING
from bson.json_util import dumps
from flask_cors import CORS
from datetime import datetime

app = Flask(__name__)
app.config["DEBUG"] = True
app.config["MONGO_URI"] = "mongodb+srv://readonly:readonly@covid-19.hip2i.mongodb.net/covid19"
mongo = PyMongo(app)
cors = CORS(app)

@app.route('/country')
def home_page():
    s1 = datetime.strptime("2020-02-20T00:00:00Z","%Y-%m-%dT%H:%M:%SZ")
    country = request.args['c'] 
    data = mongo.db["global"].find({'country': country,'date':{'$gt':s1}})
    
    json_docs = []
    for doc in data:
        s2 = datetime.strptime(doc['date'].isoformat()[0:19],"%Y-%m-%dT%H:%M:%S")
        if (s2.date()>s1.date()):
            json_docs.append({'date':doc['date'],'confirmed':doc['confirmed'],'deaths':doc['deaths'],'recovered':doc['recovered'],'population':doc['population']})
    return {"data":json_docs}

@app.route('/all')
def all_country():
    json_docs = []
    for countries in mongo.db["global"].find().distinct('country'):
        json_docs.append(countries)
    return {'data':json_docs}

@app.route('/date')
def all_population():
    date = request.args['d'] + 'T00:00:00Z'
    d=datetime.strptime(date,"%Y-%m-%dT%H:%M:%SZ")
    json_docs = []
    for item in mongo.db["countries_summary"].find({'date':{'$eq':d}}).sort([("confirmed",DESCENDING)]).limit(10):
        if 'population' in item:
            json_docs.append({'country':item['country'],'confirmed':item['confirmed'],'population':item['population'],'recovered':item['recovered']})
    return {'data':json_docs}
    

if __name__ == "__main__":
    app.run()