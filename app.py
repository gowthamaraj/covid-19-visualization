from flask import Flask
from flask import request, jsonify
from flask_pymongo import PyMongo
from bson.json_util import dumps
from flask_cors import CORS
from datetime import datetime

app = Flask(__name__)
app.config["DEBUG"] = True
app.config["MONGO_URI"] = "mongodb+srv://readonly:readonly@covid-19.hip2i.mongodb.net/covid19"
mongo = PyMongo(app)
cors = CORS(app)

@app.route('/')
def home_page():
    s1 = datetime.strptime("2020-02-20T00:00:00Z","%Y-%m-%dT%H:%M:%SZ")
    data = mongo.db["global"].find({'country': 'India'})
    json_docs = []
    for doc in data:
        s2 = datetime.strptime(doc['date'].isoformat()[0:19],"%Y-%m-%dT%H:%M:%S")
        if (s2.date()>s1.date()):
            json_docs.append({'date':doc['date'],'confirmed':doc['confirmed'],'deaths':doc['deaths'],'recovered':doc['recovered']})
    return {"data":json_docs}
    

if __name__ == "__main__":
    app.run()