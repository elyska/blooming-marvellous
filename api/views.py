from flask import Blueprint, jsonify, request
from . import db
from .models import Plants, Users, MyPlants
from flask_cors import CORS
from sqlalchemy import desc

main = Blueprint('main', __name__)
CORS(main, supports_credentials=True)

@main.route('/add-plant', methods=['POST'])
def addPlant():
	data = request.get_json()
	print(data)

	newPlant = MyPlants(plant_id=data["plantId"], username=data['authorised'])
	db.session.add(newPlant)
	db.session.commit()

	return 'Done', 201

@main.route('/register', methods=['POST'])
def register():
	userData = request.get_json()
	print(userData)

	if userData['password'] != userData['passwordAgain']:
		return 'Passwords do not match', 403

	newUser = Users(username=userData['username'], password=userData['password'])

	try:
		db.session.add(newUser)
		db.session.commit()
	except:
		return 'Error', 400


	return 'Done', 201

@main.route('/login', methods=['POST'])
def login():
	userData = request.get_json()
	user = Users.query.filter_by(username=userData['username']).first()
	
	if user != None and user.password == userData['password']:
		print("exists")
		return 'Done', 201
	
	return 'Incorrect password', 403

@main.route('/plants')
def plants():
	searchTerm = request.args.get('search', type = str)
	#plantList = Plants.query.all()

	if searchTerm == None:
		searchTerm = ""

	print(searchTerm)

	searchTerm = "%{}%".format(searchTerm)
	plantList = Plants.query.filter(Plants.name.like(searchTerm)).all()
	
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
