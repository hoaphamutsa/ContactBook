from flask import Flask, request, Response
from flask_restful import Api
from flask_jsonpify import jsonify
from flask import abort
from flask_cors import CORS
from flask import make_response
from collections import namedtuple
import json

from ContactService import ContactService
from Contact import Contact

app = Flask(__name__)

# Enable Cross Origin Resource Sharing 
# https://github.com/corydolphin/flask-cors
CORS(app)

@app.errorhandler(404)
def not_found(error) -> Response:
    # generate a 404 response
    return make_response(jsonify({'error': 'Not found'}), 404)

@app.route('/contacts/api/v1.0', methods=['GET'])
def get_contacts() -> json:
    # return all contacts
    return jsonify( ContactService().getAllContacts() )

@app.route('/contacts/api/v1.0/<contact_name>', methods=['GET'])
def get_contact(contact_name) -> json or Response:
    """
    Search the database for contact with matching name. 
    If the request is invalid or there is no names that matches 
    the requested name, return a 404 Response.

    Parameters
    ----------
    contact_name: str
        requested contact name

    Returns
    -------
    json
        a contact that has name that matches with the requested name
    Response
        404 response
    """
    if len(contact_name) == 0:
        abort(404)
    result = ContactService().getContact(contact_name)
    if result == None:
        abort(404)
    return jsonify(result)

@app.route('/contacts/api/v1.0', methods=['POST'])
def create_contact() -> json or Response:
    """
    Insert a contact into the contact.db database. 
    If the contact object doesn't have name or phone number, return a 400 reponse.
    Otherwise, return a success in json form.
    """
    raw_string = str(request.data)[2:-1]
    
    if not raw_string:
        abort(400)
    if not json.loads(raw_string):
        abort(400)
    contact = convertJsonToContact(raw_string)
    if not contact.name or not contact.phoneNumber:
        abort(400)
    ContactService().createContact(contact)
    return jsonify({"result": True})

@app.route('/contacts/api/v1.0/<contact_name>', methods=['DELETE'])
def remove_contact(contact_name) -> json or Response:
    """
    Remove a contact from contact.db database.
    If there is no contact name made to this request, return a 404 reponse.
    Otherwise, return a success in json form.
    """
    if len(contact_name) == 0:
        abort(404)
    ContactService().removeContact(contact_name)
    return jsonify({'result': True})

@app.route('/contacts/api/v1.0', methods=['PUT'])
def update_contact() -> json or Response:
    """
    Update a contact with matching contact name in the contact.db database. 
    If the contact object doesn't have name or phone number, return a 400 reponse.
    Otherwise, return a success in json form.
    """
    raw_string = str(request.data)[2:-1]
    if not raw_string:
        abort(400)
    if not json.loads(raw_string):
        abort(400)
    contact = convertJsonToContact(raw_string)
    if not contact.name or not contact.phoneNumber:
        abort(400)
    ContactService().updateContact(contact)
    return jsonify({'result': True})
    
def convertJsonToContact(raw_json) -> Contact:
    """
    Convert a json string into a Contact object.
    Sample json string:
    "{ 'content': 
            { 'name':'test', 
              'phoneNumber: '111', 
              'address': '1 In N' Out Drive',
              'email': 'ilove.fastfood@gmail.com' } 
    }"
    """
    json_object = json.loads(raw_json)['content']
    return namedtuple("Contact", json_object.keys())(*json_object.values())

if __name__ == '__main__':
    app.run(port=5002, debug=True)