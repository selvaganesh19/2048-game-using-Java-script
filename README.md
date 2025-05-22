# 🎮 2048 Game – Built with HTML, CSS & JavaScript

Welcome to the classic **2048 Puzzle Game**, recreated entirely using **Vanilla JavaScript**, **HTML5**, and **CSS3**. Swipe on mobile or use arrow keys on desktop to move the tiles. When two tiles with the same number touch, they merge into one! Can you reach **2048**?

---

## 🌐 Live Demo

👉 **[Play Now on Netlify 🚀](https://my-2048-app.netlify.app/)**  
No installation required – just click and play!

---

## 📸 Screenshots

<p align="center">
  <img src="https://github.com/user-attachments/assets/b103fc4c-099e-48ba-a30e-9c001f0f9c76" alt="2048 Game - Desktop View" width="500"/>
  <br/>
  <strong>💻 Desktop View</strong>
</p>

<p align="center">
  <img src="https://github.com/user-attachments/assets/2280a04d-b40e-482c-ab67-4f93c5913745" alt="2048 Game - Mobile View" width="250"/>
  <br/>
  <strong>📱 Mobile View</strong>
</p>

<p align="center"><em>Fully responsive design for both desktop and mobile devices!</em></p>


## ✨ Features

✅ Smooth animations & clean UI  
✅ Responsive layout (Mobile + PC)  
✅ Arrow key & swipe support  
✅ Auto score tracking  
✅ Restart Game option  
✅ Offline support via PWA  
✅ Lightweight and fast

---

## 🔧 Tech Stack

| Technology     | Purpose                          |
|----------------|----------------------------------|
| **HTML5**      | Game structure and layout        |
| **CSS3**       | Styling and responsiveness       |
| **JavaScript** | Game logic and interaction       |
| **Netlify**    | Deployment & hosting             |
| **PWA**        | Installable with offline support |

---

## 📁 Project Structure

``plaintext
2048-game/
├── static/
│   ├── index.html         # Main HTML page
│   ├── style.css          # Styling and layout
│   ├── script.js          # Game logic
│   ├── 2048-icon.png      # Game icon
│   ├── manifest.json      # PWA manifest
│   └── sw.js              # Service worker for offline mode
├── server.js              # Optional Node.js server (for local testing)
└── README.md              # Project README file

## 🚀 Getting Started Locally

You can run the project locally with Node.js for testing purposes (optional – not required for live deployment).

### 1. Clone the repository

``bash
git clone https://github.com/your-username/2048-game.git

cd 2048-game
2. Install dependencies

npm install

⚠️ This project has no production dependencies unless you are using the optional server.js. You can safely skip this step if you’re only using the static files.

3. Start the local server
node server.js

5. Open in browser

http://localhost:3000


📦 Deploying to Netlify
Since this is a fully static project (HTML/CSS/JS only), deploying on Netlify is super easy! Here's how:

✅ Steps:
Go to Netlify

1.Click "Add new site" → "Import an existing project"

2.Connect your GitHub repository

3.Configure the deploy settings:

4.Build Command: Leave blank (or enter N/A)

5.Publish Directory: static/

6.Click "Deploy Site"

🎉 Done! Your 2048 game is now live at:

👉 https://my-2048-app.netlify.app
