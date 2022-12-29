from pymongo import MongoClient
import paho.mqtt.publish as publish
import paho.mqtt.client as client
import random
import json

conn = MongoClient()
db = conn.database
collection = db.TPMS


def tpmsData(mosq,obj,msg):
    print("masuk data")
    data = str(msg.payload,'utf-8')
    dataJSON = json.loads(data)
    collection.insert_one(dataJSON)
    publish.single("/TPMS",data,hostname="103.226.138.21")


Client = client.Client("node"+str(random.randint(1000,9999)))
Client.message_callback_add("/rtl_433",tpmsData)
Client.connect('localhost',1883,60)
Client.subscribe("/#",0)
Client.loop_forever()