from flask import Flask, request, send_file
from flask_cors import CORS  # Import CORS
import os

app = Flask(__name__)
CORS(app)

@app.route('/api/ask', methods=['POST'])
def process_video():
    # prompt=request.form['prompt']
    # Process the video (replace with your logic)
    output_video_path = "/home/ibilees/Downloads/Calling (Spider-Man： Across the Spider-Verse) [D5d5xinZI3E]_17.52.17.mp4"
    
    # Ensure the file exists before sending
    if not os.path.exists(output_video_path):
        return {"error": "Video not found"}, 404

    return send_file(output_video_path, mimetype='video/mp4')

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)
