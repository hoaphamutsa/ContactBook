from flask import Flask, request
from flask_cors import CORS, cross_origin
from flask_restful import Resource, Api
from json import dumps
from flask_jsonpify import jsonify
from ContactBookAPI import ContactBookAPI
from Contact import Contact

app = Flask(__name__)
api = Api(app)

CORS(app)

@app.route("/")
def hello():
    return jsonify({'text':'Hello World!'})

class AllContact(Resource):
    def get(self):
        return jsonify(ContactBookAPI().getAllContact())

class OneContact(Resource):
    def get(self, contactName):
        return jsonify(ContactBookAPI().getContact(contactName))       


api.add_resource(AllContact, '/contacts') # Route_1
api.add_resource(OneContact, '/contacts/<contact_name>') # Route_3


if __name__ == '__main__':
     app.run(port=5002)

