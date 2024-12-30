#!/usr/bin/python3
from api import app
from flask_cors import CORS

cors = CORS(app,
    resources={r"/*": {
        "origins": "*",
        "methods": ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
        "allow_headers": "*"
    }})

if __name__ == "__main__":
    app.run(host='0.0.0.0', port='5000', threaded=True)
