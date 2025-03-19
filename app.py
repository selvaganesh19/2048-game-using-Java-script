from flask import Flask, render_template, send_from_directory

app = Flask(__name__)

# Serve the main game page
@app.route('/')
def index():
    return render_template('index.html')

# Serve static files (CSS, JS, Images)
@app.route('/static/<path:filename>')
def static_files(filename):
    return send_from_directory('static', filename)

# Serve the manifest.json
@app.route('/manifest.json')
def manifest():
    return send_from_directory('static', 'manifest.json')

# Serve the service worker (sw.js)
@app.route('/sw.js')
def service_worker():
    return send_from_directory('static', 'sw.js')

if __name__ == '__main__':
    app.run(debug=True)