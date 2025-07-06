from flask import Flask, request, jsonify, send_from_directory
from deepface import DeepFace
import os

app = Flask(__name__)

# 📁 Serve static images for previewing matched results
@app.route('/images/<folder>/<filename>')
def serve_image(folder, filename):
    return send_from_directory(os.path.join(os.getcwd(), folder), filename)

# ✅ Main face-matching API endpoint
@app.route('/find', methods=['POST'])
def find_face():
    try:
        file = request.files.get('image')
        folder_name = request.form.get('folder')

        print("Received image:", file)
        print("Received folder name:", folder_name)

        if not file:
            return jsonify({'error': 'Missing file (image) in request'}), 400

        if not folder_name:
            return jsonify({'error': 'Missing "folder" field in request'}), 400

        db_path = os.path.join(os.getcwd(), folder_name)
        print("Resolved db_path:", db_path)

        if not os.path.isdir(db_path):
            return jsonify({'error': f'Invalid folder path: {db_path}'}), 400

        # ✅ Save uploaded image temporarily
        os.makedirs("temp_uploads", exist_ok=True)
        upload_path = os.path.join("temp_uploads", file.filename)
        file.save(upload_path)

        # ✅ Run DeepFace with Dlib
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
