from flask import Flask, request, jsonify
from deepface import DeepFace
import os
app = Flask(__name__)

def find_face():
    try:
        file = request.files.get('image')
        folder_name = request.form.get('folder')

        # ✅ Check if folder was sent
        if not folder_name:
            return jsonify({'error': 'Missing "folder" field in request'}), 400

        db_path = os.path.join(os.getcwd(), folder_name)
        if not os.path.isdir(db_path):
            return jsonify({'error': 'Invalid folder path'}), 400

        # ✅ Save uploaded image temporarily
        upload_path = os.path.join("temp_uploads", file.filename)
        os.makedirs("temp_uploads", exist_ok=True)
        file.save(upload_path)

        # ✅ Run DeepFace
        result = DeepFace.find(
            img_path=upload_path,
            db_path=db_path,
            model_name="Dlib",
            enforce_detection=False
        )

        os.remove(upload_path)

        matches = result[0].to_dict(orient='records')

        for match in matches:
            filename = os.path.basename(match['identity'])
            match['url'] = f"http://localhost:5000/images/{folder_name}/{filename}"

        return jsonify(matches)

    except Exception as e:
        print("Error:", str(e))
        return jsonify({'error': 'Face match failed', 'details': str(e)}), 500


if __name__ == '__main__':
    app.run(port=5000)
