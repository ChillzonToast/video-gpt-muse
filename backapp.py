
from flask import Flask, request, send_file
from flask_cors import CORS  # Import CORS
import os

app = Flask(__name__)
CORS(app)  # This allows cross-origin requests from your React app

@app.route('/api/ask', methods=['POST'])
def process_video():
    # In the future, you can extract the prompt from request.json['prompt']
    # and use it to generate or select a video
    
    # For now, we're just returning a static video file
    # Replace this path with the path to your video file
    output_video_path = "/path/to/your/sample_video.mp4"
    
    # Ensure the file exists before sending
    if not os.path.exists(output_video_path):
        return {"error": "Video not found"}, 404

    return send_file(output_video_path, mimetype='video/mp4')

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)
