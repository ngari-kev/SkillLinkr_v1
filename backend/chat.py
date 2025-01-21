from flask_socketio import SocketIO, emit, disconnect
from flask_jwt_extended import decode_token
from flask import request
import jwt

socketio = SocketIO(cors_allowed_origins="*", logger=True, engineio_logger=True)

# Store active users and their socket IDs
active_users = {}

@socketio.on('connect')
def handle_connect():
    try:
        token = request.args.get('token')
        if not token:
            print("No token provided")
            return False

        # Decode token to get username
        try:
            decoded_token = decode_token(token)
            username = decoded_token['sub']

            # Store user's socket ID
            active_users[username] = request.sid
            print(f"User connected: {username}")
            print(f"Active users: {active_users}")

            # Emit updated user list to all clients
            emit('users_update', list(active_users.keys()), broadcast=True)
            return True

        except jwt.ExpiredSignatureError:
            print("Token expired")
            return False
        except jwt.InvalidTokenError:
            print("Invalid token")
            return False

    except Exception as e:
        print(f"Connection error: {e}")
        return False

@socketio.on('disconnect')
def handle_disconnect():
    try:
        # Remove user from active users
        username = next((user for user, sid in active_users.items() if sid == request.sid), None)
        if username:
            del active_users[username]
            print(f"User disconnected: {username}")
            print(f"Active users: {active_users}")
            emit('users_update', list(active_users.keys()), broadcast=True)
    except Exception as e:
        print(f"Disconnect error: {e}")

@socketio.on_error()
def error_handler(e):
    print(f"SocketIO error: {e}")
