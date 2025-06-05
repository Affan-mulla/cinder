# 🎙️ Cinder

> Record. Collaborate. Publish.

Cinder is a full-stack, browser-based podcast recording platform inspired by [Riverside.fm](https://riverside.fm). It allows hosts to create high-quality recording sessions with guests using real-time video/audio powered by **LiveKit** and backed by **Supabase** for auth and storage.

---

## 🚀 Tech Stack

| Tech          | Description                                  |
| ------------- | -------------------------------------------- |
| Next.js       | Full-stack React framework with App Router   |
| LiveKit SFU   | Real-time video/audio via WebRTC             |
| Supabase      | Auth, PostgreSQL DB, and file storage        |
| Prisma        | Database ORM                                 |
| Tailwind CSS  | Utility-first styling                        |
| TypeScript    | Strongly typed codebase                      |

---

## ✨ Features

- ✅ Studio-quality local recording
- 🔐 Auth with email/password + Google (Supabase)
- 🎥 Real-time audio/video using LiveKit (SFU)
- 🧠 SSR middleware for session-based auth
- 📂 File uploads for audio/video post-session
- 📊 Dashboard for host to manage sessions
- 🖥️ Clean UI with sidebar navigation

---


## 🧪 Local Setup

```bash
git clone https://github.com/Affan-mulla/cinder
cd cinder
npm install
cp .env.example .env         # Add Supabase + LiveKit credentials
npx prisma migrate dev       # Setup DB schema
npm run dev                  # Start the dev server
```

## 🛠️ Contributing
Pull requests are welcome. For major changes, open an issue first to discuss what you’d like to change.

