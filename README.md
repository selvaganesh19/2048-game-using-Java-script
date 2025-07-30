## 🧠 Modern 2048 Game – JavaScript + PWA + Sound + Animations

A beautifully redesigned 2048 game built with HTML, CSS, and JavaScript.
Features a mobile-optimized UI, swipe & keyboard controls, sound effects, animations, and PWA install support.

### 🌟 Live Demo (Optional)

> Hosted Link - https://my-2048-app.netlify.app/

---

### 🚀 Features

* 🎨 Modern, vibrant UI with smooth animations
* 🎮 Keyboard & mobile swipe support
* 🔊 Sound effects for tile movement and merges
* 🧠 Smart tile sliding and merging logic
* 📲 PWA support (Installable on mobile & desktop)
* 🧩 Game over overlay and restart support
* 💾 High score saved in local storage
* ⚡ Lightweight and fast-loadings

---

### 📷 Screenshots

> ![image](https://github.com/user-attachments/assets/d3588185-42e0-4d4a-84f2-10f90d42ed7d)


---

### 📁 Project Structure

```
modern-2048-game/
├── static/
│   ├── index.html         # Main game interface
│   ├── style.css          # Custom styles and animations
│   ├── script.js          # Game logic, sounds, and swipe handling
│   ├── sw.js              # Service Worker for PWA
│   ├── manifest.json      # Web app manifest
│   ├── move.mp3           # Sound for tile movement
│   ├── merge.mp3          # Sound for tile merge
│   ├── gameover.mp3       # Optional game over sound
│   └── 2048-icon.png      # App icon
├── server.js              # Express.js server
└── README.md              # You are here
```

---

### 💻 Run Locally

#### Clone the Repo

```bash
git clone https://github.com/selvaganesh19/2048-game-using-Java-script
cd modern-2048-game
```

#### Install dependencies & start server

```bash
npm install
node server.js
```

Open your browser:
👉 [http://localhost:3000](http://localhost:3000)

---

### 📲 How to Install (PWA)

1. Visit the site on your mobile or desktop
2. Tap “Install” when prompted
3. Enjoy the full-screen 2048 experience!

---

### 📦 Deploy on Render / Netlify / Vercel

* **Render:** for full backend (Node.js)
* **Netlify/Vercel:** drag `static/` folder if using frontend only
* Remember to set the homepage route (`/`) in `server.js`

---

### ✨ Credits

* Built by [Selvaganesh V](https://github.com/selvaganesh19)
* Original 2048 concept by Gabriele Cirulli

---

## 📄 License

This project is licensed under the [MIT License](LICENSE).

---
