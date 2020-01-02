from flask import Flask, request
from flask_restful import Resource, Api
from flask_jsonpify import jsonify
from flask import abort
from flask_cors import CORS, cross_origin
from flask import make_response
import json
from collections import namedtuple

from ContactBookAPI import ContactBookAPI
from Contact import Contact

app = Flask(__name__)
CORS(app)

@app.errorhandler(404)
def not_found(error):
    return make_response(jsonify({'error': 'Not found'}), 404)

@app.route('/contacts/api/v1.0', methods=['GET'])
def get_contacts():
    return jsonify( ContactBookAPI().getAllContacts() ), 200

@app.route('/contacts/api/v1.0/<contact_name>', methods=['GET'])
def get_contact(contact_name):
    if len(contact_name) == 0:
        abort(404)
    
    result = ContactBookAPI().getContact(contact_name)
    if result == None:
        abort(404)

    return jsonify(result)

@app.route('/contacts/api/v1.0', methods=['POST'])
def create_contact():
    
    raw_string = str(request.data)[2:-1]
    
    if not raw_string:
        abort(400)
    if not json.loads(raw_string):
        abort(400)

    json_object = json.loads(raw_string)['content']
    contact = namedtuple("Contact", json_object.keys())(*json_object.values())
    ContactBookAPI().createContact(contact)
    return jsonify({"result": True})

@app.route('/contacts/api/v1.0/<contact_name>', methods=['DELETE'])
def remove_contact(contact_name):
    if len(contact_name) == 0:
        abort(404)
    ContactBookAPI().removeContact(contact_name)
    return jsonify({'result': True})

@app.route('/contacts/api/v1.0/<contact_id>', methods=['PUT'])
def update_contact(contactId: int):
    if not contactId:
        abort(404)

    return jsonify({'result': True})
    

if __name__ == '__main__':
    app.run(port=5002, debug=True)