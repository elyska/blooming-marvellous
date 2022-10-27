from . import db

class Plants(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(255))
    alternateName = db.Column(db.String(255))
    sowInstructions = db.Column(db.String(255))
    spaceInstructions = db.Column(db.String(255))
    harvestInstructions = db.Column(db.String(255))
    compatiblePlants = db.Column(db.String(255))
    avoidInstructions = db.Column(db.String(255))
    culinaryHints = db.Column(db.String(255))
    culinaryPreservation = db.Column(db.String(255))
    image = db.Column(db.String(255))
    url = db.Column(db.String(255))
    wateringInterval = db.Column(db.Integer)

class Users(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(255))
    password = db.Column(db.String(255))
    