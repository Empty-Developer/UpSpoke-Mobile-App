# UpSpoke

[![wakatime](https://wakatime.com/badge/user/fdcea843-56ea-404c-838b-f7f306de46b6/project/8ac0f7e0-c130-486b-96a5-44b26f30c9c6.svg)](https://wakatime.com/badge/user/fdcea843-56ea-404c-838b-f7f306de46b6/project/8ac0f7e0-c130-486b-96a5-44b26f30c9c6)
![Platform](https://img.shields.io/badge/platform-iOS%20%7C%20Android-lightgrey)
![Expo](https://img.shields.io/badge/expo-55-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-5.9-3178C6?logo=typescript&logoColor=white)
![License](https://img.shields.io/badge/license-private-red)

<p align="center">
  <img src="./image/logo.png" alt="UpSpoke Logo" width="160">
</p>

<p align="center">
  <strong>A mobile app for learning English through structured lessons, real-life conversations, and hands-on speaking practice.</strong>
</p>

---

## Overview

**UpSpoke** is a React Native mobile application built with Expo that helps users improve their English language skills. The onboarding flow adapts the experience to each learner's current level, motivation, and interests — so every user gets a personalized path from day one.

The app focuses on three core pillars:

- **Lessons** — structured content covering grammar, vocabulary, and real-world usage
- **Conversations** — dialogue-based practice for building confidence in speaking
- **Practice** — active exercises to reinforce what was learned

---

## Features

- **Personalized Onboarding** — select your proficiency level (Beginner / Intermediate / Advanced), learning motivation (Travel, Work, Family, Culture, Hobby), and topic interests (Food, Business, Technology, Music, etc.)
- **Lessons** — browse and complete English lessons organized by difficulty and topic
- **Conversations / Dialogues** — practice real dialogue scenarios
- **Practice Mode** — targeted exercises to strengthen speaking and comprehension
- **User Profile** — track your learning progress and preferences
- **Light & Dark Mode** — automatic adaptation to system theme
- **Haptic Feedback** — satisfying tactile response on tab navigation
- **Subscription / Premium** — paywall for access to advanced content
- **Authentication** — secure sign-in via Supabase Auth (including OAuth)

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | [Expo](https://expo.dev/) 55 + React Native 0.83.4 |
| Language | TypeScript 5.9 |
| Navigation | [Expo Router](https://expo.github.io/router/) (file-based) |
| Styling | [NativeWind](https://www.nativewind.dev/) v4 (Tailwind CSS) |
| Backend / Auth | [Supabase](https://supabase.com/) |
| Animations | [React Native Reanimated](https://docs.swmansion.com/react-native-reanimated/) v4 |
| Gestures | React Native Gesture Handler |
| Notifications | [Sonner Native](https://github.com/gunnartorfis/sonner-native) |
| Icons | [@expo/vector-icons](https://icons.expo.fyi/) (Ionicons) |
| Font | EB Garamond (Google Fonts) |
| Package Manager | [Bun](https://bun.sh/) |

---

## Project Structure

```
UpSpoke-Mobile-App/
└── learning-app/
    ├── app/
    │   ├── (tabs)/
    │   │   ├── lessons.tsx        # Lessons tab
    │   │   ├── conversations.tsx  # Conversations tab
    │   │   └── profile.tsx        # Profile tab
    │   ├── onboarding.tsx         # Onboarding flow
    │   ├── practice.tsx           # Practice session screen
    │   └── _layout.tsx            # Root layout & auth gate
    ├── components/                # Reusable UI components
    ├── constants/                 # Theme, colors, config
    ├── context/                   # React Context providers (Auth, etc.)
    ├── hooks/                     # Custom hooks
    ├── lib/                       # Utility libraries
    ├── providers/                 # App-level providers
    ├── supabase/                  # Supabase client & migrations
    └── utils/                     # Helper functions
```

---

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) 18+
- [Bun](https://bun.sh/) (used as package manager)
- [Expo CLI](https://docs.expo.dev/workflow/expo-cli/)
- A [Supabase](https://supabase.com/) project with Auth enabled

### Installation

```bash
# Clone the repository
git clone https://github.com/Empty-Developer/UpSpoke-Mobile-App.git
cd UpSpoke-Mobile-App/learning-app

# Install dependencies
bun install
```

### Environment Variables

Create a `.env.local` file in `learning-app/` and fill in your Supabase credentials:

```env
EXPO_PUBLIC_SUPABASE_URL=your_supabase_project_url
EXPO_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### Running the App

```bash
# Start development server
bun start

# Run on iOS simulator
bun ios

# Run on Android emulator
bun android

# Run in web browser
bun web
```

---

## Roadmap

### Planned Features

- [ ] Push notifications for daily learning streaks
- [ ] Lesson completion tracking and progress dashboard
- [ ] Expanded conversation scenario library
- [ ] Offline mode for downloaded lessons

### AI Integration *(Coming in a future release)*

> **Note:** The AI feature is planned and will be integrated in a future version of UpSpoke. No implementation has been started yet.

The planned AI system will introduce two connected capabilities:

- **AI Speaking Assistant** — an interactive voice-based AI companion that listens to the user's spoken English, provides real-time pronunciation and grammar feedback, and guides them through structured speaking exercises
- **AI Theme Discussion** — a conversational AI module where users can choose a topic (e.g., Business, Travel, Technology) and have an open-ended dialogue in English, with the AI adapting difficulty based on the user's level

These features will be powered by a large language model combined with speech-to-text and text-to-speech processing, deeply integrated with the existing lesson and profile personalization system.

---

## Contributing

This is a private project. Contributions are not open to the public at this time.

---

## License

Private — all rights reserved.

---

<p align="center">Built with care by <a href="https://github.com/Empty-Developer">Empty-Developer</a></p>
