from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, current_user
from models import ChatMessage, User, db

chat_bp = Blueprint('chat', __name__)

@chat_bp.route('/conversations', methods=['GET'])
@jwt_required()
def get_conversations():
    """Get list of users the current user has chatted with"""
    try:
        # Get unique conversations
        sent_to = db.session.query(ChatMessage.recipient_id).filter(
            ChatMessage.sender_id == current_user.id
        ).distinct()

        received_from = db.session.query(ChatMessage.sender_id).filter(
            ChatMessage.recipient_id == current_user.id
        ).distinct()

        user_ids = [id[0] for id in sent_to.union(received_from).all()]
        users = User.query.filter(User.id.in_(user_ids)).all()

        conversations = []
        for user in users:
            # Get last message
            last_message = ChatMessage.query.filter(
                ((ChatMessage.sender_id == current_user.id) &
                 (ChatMessage.recipient_id == user.id)) |
                ((ChatMessage.sender_id == user.id) &
                 (ChatMessage.recipient_id == current_user.id))
            ).order_by(ChatMessage.created_at.desc()).first()

            conversations.append({
                'user': {
                    'id': user.id,
                    'username': user.username,
                },
                'last_message': {
                    'content': last_message.content,
                    'created_at': last_message.created_at.isoformat(),
                    'is_sender': last_message.sender_id == current_user.id
                } if last_message else None,
                'unread_count': ChatMessage.query.filter_by(
                    sender_id=user.id,
                    recipient_id=current_user.id,
                    read=False
                ).count()
            })

        return jsonify({'conversations': conversations}), 200

    except Exception as e:
        return jsonify({'error': str(e)}), 500

@chat_bp.route('/messages/<user_id>', methods=['GET'])
@jwt_required()
def get_messages(user_id):
    """Get chat history with a specific user"""
    try:
        messages = ChatMessage.query.filter(
            ((ChatMessage.sender_id == current_user.id) &
             (ChatMessage.recipient_id == user_id)) |
            ((ChatMessage.sender_id == user_id) &
             (ChatMessage.recipient_id == current_user.id))
        ).order_by(ChatMessage.created_at).all()

        # Mark messages as read
        unread_messages = [m for m in messages
                         if m.recipient_id == current_user.id and not m.read]
        for message in unread_messages:
            message.read = True
        db.session.commit()

        return jsonify({
            'messages': [{
                'id': message.id,
                'content': message.content,
                'created_at': message.created_at.isoformat(),
                'is_sender': message.sender_id == current_user.id
            } for message in messages]
        }), 200

    except Exception as e:
        return jsonify({'error': str(e)}), 500

@chat_bp.route('/messages/<user_id>', methods=['POST'])
@jwt_required()
def send_message(user_id):
    """Send a message to a specific user"""
    try:
        data = request.get_json()
        content = data.get('content')

        if not content:
            return jsonify({'error': 'Message content is required'}), 400

        recipient = User.query.get(user_id)
        if not recipient:
            return jsonify({'error': 'Recipient not found'}), 404

        message = ChatMessage(
            sender_id=current_user.id,
            recipient_id=user_id,
            content=content
        )
        db.session.add(message)
        db.session.commit()

        return jsonify({
            'message': {
                'id': message.id,
                'content': message.content,
                'created_at': message.created_at.isoformat(),
                'is_sender': True
            }
        }), 201

    except Exception as e:
        return jsonify({'error': str(e)}), 500
