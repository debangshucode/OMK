from flask import jsonify , request
from bson import ObjectId
from deepface import DeepFace
from pymongo import MongoClient
import os
from bson.json_util import dumps
import shutil
from flask import Flask
from pathlib import Path
from dotenv import load_dotenv
app = Flask(__name__)

load_dotenv()

MONGO_URI = os.getenv("PYTHON_MONGO_URI")
client = MongoClient(MONGO_URI)
db = client["test"]
collection = db["albums"]


@app.route('/find', methods=['POST'])
def match_face():
    album_id = request.form.get("albumId")  # assuming it's passed as form-data
    image_file = request.files['image']

    if not album_id or not image_file:
        return jsonify({"error": "albumId and image are required"}), 400

    # Upload image temporarily
    temp_dir = "temp_face_compare"
    os.makedirs(temp_dir, exist_ok=True)
    temp_image_path = os.path.join(temp_dir, image_file.filename)
    image_file.save(temp_image_path)

    # Load all media files from DB
    album = db.albums.find_one({'_id': ObjectId(album_id)})
    if not album:
        return jsonify({"error": "Album not found"}), 404

    media_files = album.get("mediaFiles", [])

    # Construct full paths and copy to temp folder for matching
    UPLOAD_BASE_PATH = Path(__file__).resolve().parent.parent
    temp_db_path = os.path.join(temp_dir, "db")
    os.makedirs(temp_db_path, exist_ok=True)

    path_mapping = {}
    for media in media_files:
        mongo_path = media.get("filePath")  # e.g., "/uploads/..."
        if not mongo_path:
            continue

        abs_path = os.path.join(UPLOAD_BASE_PATH, mongo_path.lstrip("/\\"))
        if os.path.exists(abs_path):
            filename = os.path.basename(abs_path)
            shutil.copy(abs_path, os.path.join(temp_db_path, filename))
            path_mapping[filename] = mongo_path  # map filename to original path

    # Face match
    result = DeepFace.find(
        img_path=temp_image_path,
        db_path=temp_db_path,
        model_name="Dlib",
        enforce_detection=False
    )

    # Clean up
    os.remove(temp_image_path)
    shutil.rmtree(temp_db_path)

    # Extract matched file names
    matches = result[0].to_dict(orient='records')
    matched_filenames = {os.path.basename(m['identity']) for m in matches}

    # Filter media files that matched
    matched_media = [
        media for media in media_files
        if os.path.basename(media.get("filePath", "")) in matched_filenames
    ]

    matched_response = {
    "matchedMedia": [
        {
            "filePath": str(UPLOAD_BASE_PATH / media.get("filePath").lstrip("/\\"))
        }
        for media in matched_media
        ]
    }
    return jsonify(matched_response)   

#     return jsonify({
#     "matchedMedia": [
#         {"filePath": media.get("filePath")} for media in matched_media
#     ]
# })


if __name__ == "__main__":
    app.run(port=5000)