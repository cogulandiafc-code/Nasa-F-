from flask import Flask, request, jsonify
from flask_cors import CORS
import requests
import os
from dotenv import load_dotenv

load_dotenv(override=True)

app = Flask(__name__)
CORS(app)

NASA_API_KEY = os.getenv("NASA_API_KEY")

if NASA_API_KEY:
    print("LOG: NASA_API_KEY carregada com sucesso!")
else:
    print("LOG: Erro - NASA_API_KEY nao encontrada no .env!")

@app.route('/api/apod', methods=['GET'])
def get_apod():
    date = request.args.get('date')
    if not date:
        return jsonify({"error": "Date parameter is required"}), 400
    
    if not NASA_API_KEY:
        return jsonify({"error": "NASA_API_KEY not configured in backend/.env"}), 500

    url = f"https://api.nasa.gov/planetary/apod?api_key={NASA_API_KEY}&date={date}"
    
    try:
        # verify=False ignora erros de certificado SSL (comum em alguns ambientes Windows)
        response = requests.get(url, verify=False)
        response.raise_for_status()
        return jsonify(response.json())
    except requests.exceptions.HTTPError as err:
        return jsonify({"error": str(err), "details": response.text}), response.status_code
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True, port=5000)
