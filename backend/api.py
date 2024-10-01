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

def organizeSelectData(data):
    keysList = ["id","productName","productType","productManufactorer","productDescription","dateTime","estoque"]
    assocData = []
    for arr in data:
        d = dict()
        for i in range(0, len(keysList)):
            d[keysList[i]] = arr[i]
        assocData.append(d)
    return assocData

def organizeMovimentData(data):
    keysList = ["idProduct","month","quantity","type", "productName"]
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
        data = addHeaders(organizeSelectData(data))
        return data
    except Exception as e:
        return jsonify({'message': re.findall(r"\d{4}", str(e))})

@app.route('/data', methods=['GET'])
def get_data():
    try:
        # SELECT produtos.idProduct, produtos.productName, produtos.productType, produtos.manufactorer, produtos.description, produtos.dateTime, COALESCE(SUM(CASE WHEN movimento.type = 1 THEN movimento.quantity ELSE 0 END), 0) - COALESCE(SUM(CASE WHEN movimento.type = 2 THEN movimento.quantity ELSE 0 END), 0) AS estoque FROM produtos LEFT JOIN movimento ON produtos.idProduct = movimento.idProduct GROUP BY produtos.idProduct;
        # SELECT produtos.idProduct, produtos.productName, produtos.productType, produtos.manufactorer, produtos.description, produtos.dateTime, SUM(CASE WHEN type = 1 THEN quantity ELSE 0 END) - SUM(CASE WHEN type = 2 THEN quantity ELSE 0 END) AS estoque FROM movimento INNER JOIN produtos ON produtos.idProduct=movimento.idProduct GROUP BY produtos.idProduct;
        cur = mysql.connection.cursor()
        # cur.execute("SELECT produtos.idProduct, produtos.productName, produtos.productType, produtos.manufactorer, produtos.description, produtos.dateTime FROM produtos INNER JOIN movimento ON produtos.idProduct=movimento.idProduct")
        # cur.execute("SELECT produtos.idProduct, produtos.productName, produtos.productType, produtos.manufactorer, produtos.description, produtos.dateTime, SUM(CASE WHEN type = 1 THEN quantity ELSE 0 END) - SUM(CASE WHEN type = 2 THEN quantity ELSE 0 END) AS estoque FROM movimento INNER JOIN produtos ON produtos.idProduct=movimento.idProduct GROUP BY produtos.idProduct")
        cur.execute("SELECT produtos.idProduct, produtos.productName, produtos.productType, produtos.manufactorer, produtos.description, produtos.dateTime, COALESCE(SUM(CASE WHEN movimento.type = 1 THEN movimento.quantity ELSE 0 END), 0) - COALESCE(SUM(CASE WHEN movimento.type = 2 THEN movimento.quantity ELSE 0 END), 0) AS estoque FROM produtos LEFT JOIN movimento ON produtos.idProduct = movimento.idProduct GROUP BY produtos.idProduct")
        data = cur.fetchall()
        cur.close()
        data = addHeaders(organizeSelectData(data))
        return data
    except Exception as e:
        return jsonify({'message': re.findall(r"\d{4}", str(e))})

@app.route('/getmoviment/<int:id>', methods=['GET'])
def get_moviment_by_id(id):
    try:
        cur = mysql.connection.cursor()
        cur.execute('''SELECT movimento.idProduct, MONTH(movimento.dateTime) AS month, SUM(movimento.quantity) AS quantity, movimento.type, produtos.productName FROM movimento INNER JOIN produtos on produtos.idProduct=movimento.idProduct WHERE movimento.idProduct = %s GROUP BY month, movimento.idProduct, type ORDER BY movimento.type''', (id,))
        data = cur.fetchall()
        cur.close()
        data = addHeaders(organizeMovimentData(data))
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

@app.route('/moviment', methods=['POST'])
def add_movimentData():
    try:
        cur = mysql.connection.cursor()
        idProduct = request.json['idProduct']
        movimentType = request.json['movimentType']
        quantity = request.json['quantity']
        cur.execute('''INSERT INTO movimento (idProduct, type, quantity) VALUES (%s, %s, %s)''', (idProduct, movimentType, quantity))
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
        cur.execute('''DELETE IGNORE FROM movimento WHERE idProduct = %s''', (id,))
        cur.execute('''DELETE FROM produtos WHERE idProduct = %s''', (id,))
        mysql.connection.commit()
        cur.close()
        return jsonify({'message': 'Data deleted successfully'})
    except Exception as e:
        return jsonify({'message': re.findall(r"\d{4}", str(e))})

if __name__ == '__main__':
    app.run(debug=True)