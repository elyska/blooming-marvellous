from flask import Blueprint, jsonify, request
from . import db
from .models import Plants
from flask_cors import CORS
from sqlalchemy import desc

main = Blueprint('main', __name__)
CORS(main, supports_credentials=True)

@main.route('/plants')
def plants():
	plant_list = Plants.query.all()
	plants = []

	for plant in plant_list:
		image = ""
		if plant.image != None: 
			image = plant.image.split(";")[0]
			if image[-8:] == "/150/150": 
				image = image[0:-8] + "/600/600"
		plants.append({'id' : plant.id, 'name' : plant.name, 'alternateName' : plant.alternateName, 'image': image})


	return jsonify({'plants': plants})
