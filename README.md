# Route 66 Bikers 🏍️

A React Native (Expo) starter app for a biker community with livestreaming,
social posts, profiles, and authentication.

## Screens included
- **Login / Sign Up** — mock auth flow (see `src/context/AuthContext.js`) ready to be wired to a real backend (Firebase Auth, Supabase, etc.)
- **Community** — a social feed where riders can post updates and browse others' posts
- **Livestream** — a "Go Live" screen scaffolded for the Agora RTC SDK
- **Profile** — rider profile with stats, bike info, and stream history

## Tech stack
- React Native + Expo (SDK 51)
- React Navigation (stack + bottom tabs)
- react-native-agora (for livestreaming — requires your own Agora App ID)

## Getting started

```bash
npm install
npx expo start
```

Scan the QR code with the Expo Go app (iOS/Android) or run on a simulator.

## Setting up livestreaming (Agora)

1. Create a free account at https://console.agora.io
2. Create a new project to get your **App ID**
3. Open `src/screens/LivestreamScreen.js` and replace:
   ```js
   const AGORA_APP_ID = 'YOUR_AGORA_APP_ID_HERE';
   ```
   with your real App ID (better yet, load it from an environment variable
   so you never commit real keys to GitHub).
4. Uncomment and complete the Agora engine initialization code marked with
   `// TODO` in that file.
5. For production apps, generate temporary Agora tokens on a backend server
   rather than shipping an App ID with no token security.

## Connecting real authentication & data

Right now, login/signup and the community feed use mock/local data so you
can see the full app flow immediately. To make it production-ready:

- Replace `AuthContext.js` mock functions with real calls to your auth
  provider (Firebase Auth, Supabase Auth, Auth0, or your own API).
- Replace the `MOCK_POSTS` array in `CommunityScreen.js` with a real fetch
  from your database (Firestore, Supabase, or a custom REST/GraphQL API).
- Wire the "Post" composer button to actually save new posts.

## Project structure

```
route66-bikers/
├── App.js
├── app.json
├── package.json
├── babel.config.js
└── src/
    ├── components/
    │   └── PostCard.js
    ├── context/
    │   └── AuthContext.js
    ├── navigation/
    │   └── AppNavigator.js
    ├── screens/
    │   ├── LoginScreen.js
    │   ├── SignUpScreen.js
    │   ├── CommunityScreen.js
    │   ├── LivestreamScreen.js
    │   └── ProfileScreen.js
    └── theme/
        └── colors.js
```

## Pushing to GitHub

```bash
cd route66-bikers
git init
git add .
git commit -m "Initial commit: Route 66 Bikers app scaffold"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/route66-bikers.git
git push -u origin main
```

## Notes
- This is a functional **starter/scaffold**, not a finished production app.
  Auth and posts are mocked so the UI flow works immediately — you'll need
  to connect a real backend for persistent data.
- The `.gitignore` is already set up to exclude `node_modules`, `.expo`,
  and common secret/key file patterns.
