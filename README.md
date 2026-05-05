# SyncRoom 🎥

A peer-to-peer real-time video communication platform built with the MERN stack. SyncRoom enables users to create and join rooms for live video calls, powered by WebRTC for direct browser-to-browser streaming and Socket.io for signaling.

---

## ✨ Features

- **Peer-to-peer video calling** — Direct browser-to-browser communication using WebRTC, no media server needed
- **Room-based architecture** — Create or join unique rooms to manage concurrent sessions independently
- **Real-time signaling** — WebSocket-based signaling server handles offer/answer exchange and ICE candidate negotiation via Socket.io
- **Authentication** — REST APIs for register/login; rooms are managed dynamically via Socket.io events, not persisted in DB
- **Bidirectional communication** — Real-time messaging and signaling using Socket.io (WebSockets) for low-latency messaging

---

## 🛠 Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React.js |
| Backend | Node.js, Express.js |
| Database | MongoDB |
| Real-time | Socket.io, WebSockets |
| P2P Video | WebRTC |
| Architecture | MVC, REST APIs |

---

## 🏗 How It Works

```
User A                    Signaling Server                    User B
  |                       (Socket.io)                           |
  |---- Create Room ------>|                                    |
  |                        |<----------- Join Room -------------|
  |<---- Room Joined ------|-----------> Room Joined ---------->|
  |                        |                                    |
  |---- SDP Offer -------->|-----------> SDP Offer ------------>|
  |<---- SDP Answer -------|------------ SDP Answer ------------|
  |---- ICE Candidates --->|-----------> ICE Candidates ------->|
  |                                                             |
  |<=================== P2P Video Stream ====================>  |
```

Once signaling is complete, video streams directly peer-to-peer — the server is no longer in the media path.

---

## 📂 Project Structure

```
SyncRoom/
├── frontend/
│   ├── src/
│   │   ├── components/      # React UI components
│   │   ├── pages/           # Room and landing pages
│   │   └── socket/          # Socket.io client setup
│   └── package.json
├── backend/
│   ├── controllers/         # MVC controllers
│   ├── routes/              # Express route definitions
│   ├── models/              # MongoDB schemas
│   ├── socket/              # Signaling server logic
│   └── server.js
└── README.md
```

---

## ⚙️ Setup & Installation

### Prerequisites
- Node.js v18+
- MongoDB (local or Atlas)

### 1. Clone the repository
```bash
git clone https://github.com/Ishitaa4/Syncroom.git
cd Syncroom
```

### 2. Install dependencies
```bash
# Backend
cd backend && npm install

# Frontend
cd ../frontend && npm install
```

### 3. Configure environment variables

Create a `.env` file in the `backend/` directory:
```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
```

### 4. Run the application
```bash
# Start backend (from /backend)
npm run dev

# Start frontend (from /frontend)
npm start
```

Frontend runs on `http://localhost:3000`, backend on `http://localhost:5000`.

---

## 🔑 Key Technical Decisions

- **WebRTC without a media server** — pure P2P approach eliminates server-side media processing, reducing latency and infrastructure cost. Trade-off: users behind strict NAT would require a TURN server, which is not currently implemented
- **Socket.io for signaling** — used over raw WebSockets for built-in reconnection handling and room event management
- **Dynamic room management** — rooms exist in memory via Socket.io events rather than DB persistence, keeping the architecture lightweight for this use case
- **MVC architecture** — controllers, routes, and models kept separated for maintainability

---

## 📬 Contact

**Ishita Chowdhury**
- GitHub: [@Ishitaa4](https://github.com/Ishitaa4)
- LinkedIn: [ishita-chowdhury174](https://www.linkedin.com/in/ishita-chowdhury174)
- Email: ishita.ch1704@gmail.com
