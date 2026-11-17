# 🌐 Online Multiplayer & Team Chat — Feature Plan
## Chor Police Dakat Babu (চোর পুলিশ ডাকাত বাবু)

> **Status:** Plan only — not yet implemented.  
> **Last Updated:** 2026-11-17  

---

## 🎯 Goal

Allow **4 real players** on different devices (phones, laptops) to:
1. Enter their name before joining
2. Join the same game room with a **Room Code**
3. Play the game in **real-time** (chits dealt, roles revealed, guesses made live)
4. Chat with each other during the game

---

## 🏗️ Architecture Overview

```
Player opens game on phone/laptop
        |
        v
  Enter Name + Room Code
        |
   Host or Join?
   /           \
Create Room    Join Room
(4-letter code) (enter code)
        |
   WebSocket Server (Real-time hub)
        |
   Room: 4 players connected
        |
   Game starts when all 4 ready
        |
   Game Events + Chat broadcast to all
```

---

## 📋 Phase 1 — Player Name Entry
**Effort:** ~30 min | **Server needed:** ❌ None

Before the game starts, each player types their own name instead of "Player 1 / Bot 1".

- Add a **Name Setup modal** shown before the first round
- Each player enters name on the shared device (Pass & Play) or on their own device (online)
- Names stored in `state.players[idx].name`
- Works with zero backend — can be done immediately

**UI Flow:**
```
[Start Screen]
  ┌─────────────────────────┐
  │  Enter Your Name        │
  │  ┌───────────────────┐  │
  │  │  Suvash          │  │
  │  └───────────────────┘  │
  │  [🎮 Start Game]        │
  └─────────────────────────┘
```

---

## 📋 Phase 2 — Online Multiplayer with Room Codes
**Effort:** ~1–2 days | **Server needed:** ✅ Firebase (recommended)

### Tech Stack Options

| Option | Pros | Cons | Cost |
|--------|------|------|------|
| **Firebase Realtime DB** | Zero server, easy, free tier | Google dependency | Free up to limits |
| **Partykit** | Built for multiplayer games, 1 file | Newer platform | Free tier available |
| **Supabase Realtime** | Open source, Postgres | Slightly more setup | Free tier |
| **Ably / Pusher** | Very easy WebSocket API | Paid after free tier | $0–$29/mo |
| **Self-hosted WebSocket** | Full control | Need a VPS/server | Server cost |

### 🏆 Recommended: Firebase Realtime Database
- Works with a **single HTML file** (add Firebase SDK via CDN)
- No server to maintain
- Free tier handles family-scale traffic easily
- Room data auto-deletes after game ends

### Room Code Flow

```
Host (Player 1)        Firebase          Player 2 / 3 / 4
      |                    |                     |
      |-- createRoom() --> |                     |
      |<-- Room ready ---- |                     |
      |                    |<-- joinRoom() ------|
      |                    |<-- joinRoom() ------|
      |                    |<-- joinRoom() ------|
      |<-- 4/4 joined ---- |                     |
      |-- startGame() --> |                     |
      |                    |-- gameStarted+roles->|
```

### Firebase Data Structure

```
rooms/
  CHOR-4821/
    players/
      0: { name: "Suvash",   ready: true,  score: 0 }
      1: { name: "Aradhaya", ready: true,  score: 0 }
      2: { name: "Anindya",  ready: true,  score: 0 }
      3: { name: "Guest",    ready: false, score: 0 }
    gameState/
      step: "GUESSING"
      currentRound: 2
      assignments: ["babu", "police", "chor", "dakat"]
      policePlayerId: 1
      targetSuspect: "chor"
    chat/
      msg001: { from: "Suvash",   text: "আমি জানি কে চোর 😄", time: 1234567 }
      msg002: { from: "Anindya",  text: "No way!",              time: 1234568 }
      msg003: { from: "Aradhaya", text: "পুলিশ ধরো তাড়াতাড়ি", time: 1234569 }
```

---

## 📋 Phase 3 — In-Game Team Chat
**Effort:** ~half day | **Server needed:** ✅ Same Firebase as Phase 2

### Chat UI

A slide-up chat panel at the bottom of the game — like a WhatsApp strip:

```
┌─────────────────────────────────┐
│ 💬 Game Chat (3 unread)   [▲]  │
├─────────────────────────────────┤
│ Suvash: আমি জানি কে চোর 😄     │
│ Anindya: No way!                │
│ Aradhaya: পুলিশ ধরো তাড়াতাড়ি  │
├─────────────────────────────────┤
│ [Type a message...]   [Send 📨] │
└─────────────────────────────────┘
```

### Chat Features

| Feature | Priority |
|---------|----------|
| Text messages | Must have |
| Emoji reactions on chit reveal (👏 🤣 😱 🫵) | Nice to have |
| "Player is typing..." indicator | Nice to have |
| Notification badge (unread count) | Must have |
| Sound ping on new message | Optional |
| Mute chat button | Optional |

### Chat Rules / Guardrails
- Messages are **ephemeral** — only visible during the game session
- Max **120 characters** per message
- **No chat during chit-peeking** in Pass & Play mode (prevents cheating)

---

## 📋 Phase 4 — Optional Extras (Future)

| Feature | Notes |
|---------|-------|
| Spectator mode | Watch without playing |
| Game history / past rounds | Store completed rounds |
| Family leaderboard | Persistent scores across sessions |
| Rematch button | Same room, new game |
| Player avatars / emojis | Let players pick their icon |

---

## 🗺️ Implementation Roadmap

```
✅ Done                🔜 Phase 1           📋 Phase 2           📋 Phase 3
Bilingual Toggle   →  Player Name Entry  →  Room Codes +     →  In-Game Chat
PWA + Offline         ~30 min               Online Sync          ~half day
                      No server             Firebase
                                            ~1–2 days
```

---

## ⚠️ Open Questions (Decide Before Building Phase 2)

1. **Backend choice** — Firebase (easiest) or something else?
2. **Room size** — Always exactly 4 players, or allow 2–4?
3. **Private rooms only** (share code) vs **public matchmaking** (find random players)?
4. **Disconnect handling** — If a player drops mid-game: bot takes over, or game pauses?
5. **Chat moderation** — Family app, likely no need, but confirm.
