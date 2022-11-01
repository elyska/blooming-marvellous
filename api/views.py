from flask import Blueprint, jsonify, request
from . import db
from .models import Plants, Users, MyPlants
from flask_cors import CORS
from sqlalchemy import desc
from datetime import datetime, date

main = Blueprint('main', __name__)
CORS(main, supports_credentials=True)

@main.route('/user-plants')
def userPlants():
	# get the username from url arguments
	username = request.args.get('username', type = str)
	# find all user's plants
	plantList = MyPlants.query.filter_by(username=username).all()
	
	# save user's plants as a string of IDs (to be saved in cookies)
	myPlants = ""
	for e in plantList:
		myPlants += str(e.plant_id) + ", "

	return jsonify({'myPlants': myPlants})


@main.route('/user-reminders')
def userReminders():
	# get the username from url arguments
	username = request.args.get('username', type = str)
	# find all user's plants that have a reminder set
	plantList = MyPlants.query.filter_by(username=username, reminder=1).all()

	# save as a string of IDs (to be saved in cookies)
	myReminders= ""
	for e in plantList:
		myReminders += str(e.plant_id) + ", "

	return jsonify({'myReminders': myReminders})

@main.route('/add-reminder', methods=['POST'])
def addReminder():
	data = request.get_json()

	today = date.today()

	# add reminder to a plant, save current date
	MyPlants.query.filter_by(plant_id=data["plantId"], username=data['authorised']).update(dict(reminder=1, date=today))
	db.session.commit()

	return 'Done', 201

@main.route('/remove-reminder', methods=['POST'])
def removeReminder():
	data = request.get_json()
	print(data)

	MyPlants.query.filter_by(plant_id=data["plantId"], username=data['authorised']).update(dict(reminder=0, date=None))
	db.session.commit()
	
	return 'Done', 201

@main.route('/add-plant', methods=['POST'])
def addPlant():
	data = request.get_json()
	print(data)

	newPlant = MyPlants(plant_id=data["plantId"], username=data['authorised'], reminder=0)
	db.session.add(newPlant)
	db.session.commit()

	return 'Done', 201

@main.route('/remove-plant', methods=['POST'])
def removePlant():
	data = request.get_json()
	
	MyPlants.query.filter_by(plant_id=data["plantId"], username=data['authorised']).delete()
	db.session.commit()
	
	return 'Done', 201

@main.route('/register', methods=['POST'])
def register():
	userData = request.get_json()

	# if passwords don't match, return error
	if userData['password'] != userData['passwordAgain']:
		return 'Passwords do not match', 403

	newUser = Users(username=userData['username'], password=userData['password'])

	try:
		db.session.add(newUser)
		db.session.commit()
	except:
		# if username already exists, return error
		return 'Error', 400


	return 'Done', 201

@main.route('/login', methods=['POST'])
def login():
	userData = request.get_json()
	user = Users.query.filter_by(username=userData['username']).first()
	
	if user != None and user.password == userData['password']:
		return 'Done', 201
	
	return 'Incorrect password', 403

@main.route('/plants')
def plants():
	# get the search term from url arguments
	searchTerm = request.args.get('search', type = str)

	if searchTerm == None:
		searchTerm = ""

	# select all plants that match the search term
	searchTerm = "%{}%".format(searchTerm)
	plantList = Plants.query.filter(Plants.name.like(searchTerm)).all()
	
	plants = []

	for plant in plantList:
		# get the first image of the plant
		image = ""
		if plant.image != None: 
			image = plant.image.split(";")[0]
			if image[-8:] == "/150/150": 
				image = image[0:-8] + "/600/600" # resize the image
		plants.append({'id' : plant.id, 'name' : plant.name, 'alternateName' : plant.alternateName, 'image': image})


	return jsonify({'plants': plants})

@main.route('/my-plants')
def myPlants():
	username = request.args.get('username', type = str)
	
	# returns list of tuples
	plantList = Plants.query.join(MyPlants, Plants.id == MyPlants.plant_id).add_columns(MyPlants.reminder, MyPlants.date, MyPlants.username).filter(MyPlants.username == username).all()

	plants = []

	for plantTuple in plantList:
		plant = plantTuple[0]
		reminder = plantTuple[1]
		# get the first image
		image = ""
		if plant.image != None: 
			image = plant.image.split(";")[0]
			if image[-8:] == "/150/150": 
				image = image[0:-8] + "/600/600"

		# check if plant needs watering today
		waterToday = False
		if plant.wateringInterval != None and plant.wateringInterval != "" and plantTuple[2] != None: 
			reminderAdded = datetime.strptime(plantTuple[2], '%Y-%m-%d').date() # date when reminder was added to date object
			today = date.today()
			delta = (today - reminderAdded).days # time difference in day (int)
			waterToday = delta % plant.wateringInterval == 0

		plants.append({'id' : plant.id, 'name' : plant.name, 'alternateName' : plant.alternateName, 'image': image, 'reminder': reminder,'waterToday': waterToday})

	return jsonify({'plants': plants})

@main.route('/plant/<name>')
def plantDetail(name):
	# get arguments
	username = request.args.get('username', type = str)

	#get plant url variable
	plant = Plants.query.filter_by(name=name).first()
	
	# get the first image
	image = ""
	if plant.image != None: 
		image = plant.image.split(";")[0]
		if image[-8:] == "/150/150": 
			image = image[0:-8] + "/600/600"

	# get compatible plants that have an image - compatible plants become recommended plants
	compatible = plant.compatiblePlants.split(", ")
	compatibleWithImage = []
	for e in compatible:
		compatiblePlant = Plants.query.filter_by(name=e.capitalize()).first()
		compImage = ""
		# get an image of a compatible plant
		if compatiblePlant:
			compImage = compatiblePlant.image.split(";")[0]
			compatibleWithImage.append({"name": compatiblePlant.name, "image": compImage})

	plantDetail = {
		'id' : plant.id, 
		'name' : plant.name, 
		'alternateName' : plant.alternateName, 
		'image': image,
		'sowInstructions' : plant.sowInstructions,
    	'spaceInstructions' : plant.spaceInstructions,
    	'harvestInstructions' : plant.harvestInstructions,
    	'compatibleWithImage' : compatibleWithImage,
    	'avoidInstructions' : plant.avoidInstructions,
    	'culinaryHints' : plant.culinaryHints,
    	'culinaryPreservation' : plant.culinaryPreservation,
    	'wateringInterval' : plant.wateringInterval,
	}

	# check if plant is added
	exists = MyPlants.query.filter_by(plant_id=plantDetail["id"], username=username).first()

	if exists == None:
		plantDetail["added"] = False
	else:
		plantDetail["added"] = True
		plantDetail["reminder"] = exists.reminder

	return jsonify({'plants': plantDetail})
