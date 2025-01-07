import cloudinary
import cloudinary.uploader
from flask import current_app

def configure_cloudinary(app):
    cloudinary.config(
        cloud_name=app.config['CLOUDINARY_CLOUD_NAME'],
        api_key=app.config['CLOUDINARY_API_KEY'],
        api_secret=app.config['CLOUDINARY_API_SECRET']
    )

def upload_image(file):
    try:
        result = cloudinary.uploader.upload(file,
            folder="profile_photos",
            allowed_formats=['jpg', 'png', 'jpeg', 'gif']
        )
        return result['secure_url']
    except Exception as e:
        current_app.logger.error(f"Cloudinary upload error: {str(e)}")
        raise e
