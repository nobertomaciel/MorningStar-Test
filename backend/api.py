from flask import Flask, jsonify, request
from flask import make_response
from flask_mysqldb import MySQL
from flask_cors import CORS
import re


app = Flask(__name__)
app.config['MYSQL_HOST'] = 'localhost'
app.config['MYSQL_USER'] = 'noberto'
app.config['MYSQL_PASSWORD'] = 'Star1234'
app.config['MYSQL_DB'] = 'morningstar'
mysql = MySQL(app)

CORS(app)

@app.route('/')
def raiz():
    return "servidor ativo"

def organizeData(data):
    keysList = ["id","productName","productType","productManufactorer","productDescription","dateTime"]
    assocData = []
    for arr in data:
        d = dict()
        for i in range(0, len(keysList)):
            d[keysList[i]] = arr[i]
        assocData.append(d)
    return assocData

def addHeaders(data):
    response = make_response(jsonify(data))
    response.headers['Content-Type'] = 'application/json'
    response.headers['Access-Control-Allow-Origin'] = '*'
    response.headers['Access-Control-Allow-Methods'] = 'GET,PUT,POST,DELETE'
    response.mimetype = 'application/json'
    return response

@app.route('/dataselect', methods=['GET'])
def get_data_select():
    try:
        cur = mysql.connection.cursor()
        cur.execute("SELECT idProduct, productName FROM produtos")
        data = cur.fetchall()
        cur.close()
        data = addHeaders(organizeData(data))
        return data
    except Exception as e:
        return jsonify({'message': re.findall(r"\d{4}", str(e))})

@app.route('/data', methods=['GET'])
def get_data():
    try:
        cur = mysql.connection.cursor()
        cur.execute("SELECT idProduct, productName, productType, manufactorer, description, dateTime FROM produtos")
        data = cur.fetchall()
        cur.close()
        data = addHeaders(organizeData(data))
        return data
    except Exception as e:
        return jsonify({'message': re.findall(r"\d{4}", str(e))})

@app.route('/data/<int:id>', methods=['GET'])
def get_data_by_id(id):
    try:
        cur = mysql.connection.cursor()
        cur.execute('''SELECT * FROM produtos WHERE idProduct = %s''', (id,))
        data = cur.fetchall()
        cur.close()
        data = addHeaders(organizeData(data))
        return data
    except Exception as e:
        return jsonify({'message': re.findall(r"\d{4}", str(e))})

@app.route('/data', methods=['POST'])
def add_data():
    try:
        cur = mysql.connection.cursor()
        productName = request.json['productName']
        productType = request.json['productType']
        productManufactorer = request.json['productManufactorer']
        productDescription = request.json['productDescription']
        cur.execute('''INSERT INTO produtos (productName, productType, manufactorer, description) VALUES (%s, %s, %s, %s)''', (productName, productType, productManufactorer, productDescription))
        mysql.connection.commit()
        cur.close()
        return jsonify({'message': 'Data added successfully'})
    except Exception as e:
        return jsonify({'message': re.findall(r"\d{4}", str(e))})


@app.route('/data/<int:id>', methods=['PUT'])
def update_data(id):
    try:
        cur = mysql.connection.cursor()
        productName = request.json['productName']
        productType = request.json['productType']
        productManufactorer = request.json['productManufactorer']
        productDescription = request.json['productDescription']
        cur.execute('''UPDATE produtos SET productName = %s, productType = %s, manufactorer = %s, description = %s WHERE idProduct = %s''', (productName, productType, productManufactorer, productDescription, id))
        mysql.connection.commit()
        cur.close()
        return jsonify({'message': 'Data updated successfully'})
    except Exception as e:
        return jsonify({'message': re.findall(r"\d{4}", str(e))})


@app.route('/data/<int:id>', methods=['DELETE'])
def delete_data(id):
    try:
        cur = mysql.connection.cursor()
        cur.execute('''DELETE FROM produtos WHERE idProduct = %s''', (id,))
        mysql.connection.commit()
        cur.close()
        return jsonify({'message': 'Data deleted successfully'})
    except Exception as e:
        return jsonify({'message': re.findall(r"\d{4}", str(e))})

if __name__ == '__main__':
    app.run(debug=True)