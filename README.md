# 🎮 2048 Game – Built with HTML, CSS & JavaScript

Welcome to the classic **2048 Puzzle Game**, recreated entirely using **Vanilla JavaScript**, **HTML5**, and **CSS3**. Swipe or use arrow keys to slide the tiles. When two tiles with the same number touch, they merge into one! Can you reach **2048**?

## 🌐 Live Demo

👉 **[Play Now on Netlify 🚀](https://my-2048-app.netlify.app/)**  
No installation required. Just click and play!

---

## 📸 Screenshots

<p align="center">
  <img src="![image](https://github.com/user-attachments/assets/5d76f131-afef-42ad-aaff-19e80ed331e5)
" alt="2048 Game on Desktop" width="500"/>
  <br/>
  <em>Fully responsive design for Desktop and Mobile devices 📱💻</em>
</p>

---

## ✨ Features

✅ Smooth animations & clean UI  
✅ Responsive layout (Mobile + PC)  
✅ Arrow key & swipe support  
✅ Auto score tracking  
✅ "Restart Game" button  
✅ Offline support via PWA  
✅ Lightweight and fast

---

## 🔧 Tech Stack

| Technology    | Use                            |
|---------------|---------------------------------|
| **HTML5**     | Structure of the game board     |
| **CSS3**      | Styling & responsive design     |
| **JavaScript**| Game logic & DOM manipulation   |
| **Netlify**   | Hosting & deployment            |
| **PWA**       | Add-to-home, offline support    |

---

## 📁 Project Structure

2048-game/
├── static/
│ ├── index.html # Main HTML
│ ├── style.css # Styling and layout
│ ├── script.js # Game logic and controls
│ ├── 2048-icon.png # Game icon
│ ├── manifest.json # Web app manifest for PWA
│ └── sw.js # Service worker
├── server.js # Express server (optional for local testing)
└── README.md # This file

---

## 🚀 Getting Started Locally

You don't need a backend to play, but you can test it locally with Node.js:

### 1. Clone the repo
```bash
git clone https://github.com/your-username/2048-game.git
cd 2048-game

2. Install dependencies (if any)
bash
Copy
Edit
npm install
3. Run server locally
bash
Copy
Edit
node server.js
4. Open your browser
arduino
Copy
Edit
http://localhost:3000
📦 Deployment on Netlify
This project is 100% static, so it's easy to deploy:

Go to Netlify

Click "Add new site" > "Import an existing project"

Connect your GitHub repo

Set the build command to N/A and the publish directory to static/

Done! Your 2048 game is live!

✅ Deployed Link: https://my-2048-app.netlify.app

📄 License
This project is licensed under the MIT License – feel free to use, modify, and share!
