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
	print("Hello")
	print(name)
	plant = Plants.query.filter_by(name=name).first()
	# get the first image
	image = ""
	if plant.image != None: 
		image = plant.image.split(";")[0]
		if image[-8:] == "/150/150": 
			image = image[0:-8] + "/600/600"

	# get compatible plants
	compatible = plant.compatiblePlants.split(", ")
	compatibleWithImage = []
	compatibleWithoutImage = ""
	for e in compatible:
		#a = "%{}%".format(e) #not neccessary
		#plant1 = Plants.query.filter(Plants.name.like(e)).first()
		#plant1 = Plants.query.all()
		compatiblePlant = Plants.query.filter_by(name=e.capitalize()).first()
		compImage = ""
		if compatiblePlant:
			compImage = compatiblePlant.image.split(";")[0]
			compatibleWithImage.append({"name": compatiblePlant.name, "image": compImage})
		else: 
			if compatibleWithoutImage != "":
				compatibleWithoutImage += ", " + e
			else:
				compatibleWithoutImage += e
	print("compatibleWithImage")
	print(compatibleWithImage)
	print("compatibleWithoutImage")
	print(compatibleWithoutImage)


	plantDetail = {
		'id' : plant.id, 
		'name' : plant.name, 
		'alternateName' : plant.alternateName, 
		'image': image,
		'sowInstructions' : plant.sowInstructions,
    	'spaceInstructions' : plant.spaceInstructions,
    	'harvestInstructions' : plant.harvestInstructions,
    	'compatibleWithImage' : compatibleWithImage,
    	'compatibleWithoutImage' : compatibleWithoutImage,
    	'avoidInstructions' : plant.avoidInstructions,
    	'culinaryHints' : plant.culinaryHints,
    	'culinaryPreservation' : plant.culinaryPreservation,
    	'wateringInterval' : plant.wateringInterval,
	}

	return jsonify({'plants': plantDetail})
