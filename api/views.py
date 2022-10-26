from flask import Blueprint, jsonify, request
from . import db
from .models import Plants
from flask_cors import CORS
from sqlalchemy import desc

main = Blueprint('main', __name__)
CORS(main, supports_credentials=True)

@main.route('/plants')
def plants():
	plantList = Plants.query.all()
	plants = []

	for plant in plantList:
		# get the first image
		image = ""
		if plant.image != None: 
			image = plant.image.split(";")[0]
			if image[-8:] == "/150/150": 
				image = image[0:-8] + "/600/600"
		plants.append({'id' : plant.id, 'name' : plant.name, 'alternateName' : plant.alternateName, 'image': image})


	return jsonify({'plants': plants})

@main.route('/plant/<name>')
def plantDetail(name):
	print(name)
	plant = Plants.query.filter_by(name=name).first()
	# get the first image
	image = ""
	if plant.image != None: 
		image = plant.image.split(";")[0]
		if image[-8:] == "/150/150": 
			image = image[0:-8] + "/600/600"
	plantDetail = {
		'id' : plant.id, 
		'name' : plant.name, 
		'alternateName' : plant.alternateName, 
		'image': image,
		'sowInstructions' : plant.sowInstructions,
    	'spaceInstructions' : plant.spaceInstructions,
    	'harvestInstructions' : plant.harvestInstructions,
    	'compatiblePlants' : plant.compatiblePlants,
    	'avoidInstructions' : plant.avoidInstructions,
    	'culinaryHints' : plant.culinaryHints,
    	'culinaryPreservation' : plant.culinaryPreservation,
    	'wateringInterval' : plant.wateringInterval,
	}

	return jsonify({'plants': plantDetail})
