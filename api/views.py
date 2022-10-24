from flask import Blueprint, jsonify, request
from . import db
from .models import Plants
from flask_cors import CORS
from sqlalchemy import desc

main = Blueprint('main', __name__)
CORS(main, supports_credentials=True)

@main.route('/plants')
def plants():
	plant_list = Plants.query.order_by(desc("id"))
	plants = []
	
	for palnt in plant_list:
		plants.append({'name' : movie.name, 'sowInstructions' : movie.sowInstructions})


	return jsonify ({'plants': plants})
