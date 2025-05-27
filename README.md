# Aloha Tune
Aloha Tuner is a simple and user-friendly web application for tuning Ukuleles. The project was started to provide a web-based Ukulele Tuner that was also a PWA. I also wanted something with a touch of Hawaiian-inspired design, while being clean, straightforward, and free of unnecessary clutter. 

This project is still a work in progress and serves as a way to grow my skills in software development while combining my interests in music and design.

![aloha](https://github.com/user-attachments/assets/23b1cf4e-303e-40bc-8f36-3317998a8a5a)

## What the App Does

- **Auto Tuner**: Detects the pitch of a plucked string through the microphone and provides feedback (e.g., "Too High", "Too Low", or "Perfect").
- **Manual Tuner**: Plays reference tones so you can tune by ear.
- **Light and Dark Modes**: A simple toggle to switch between themes.
- **Responsive Design**: Works on desktop and mobile.
- **Support for different tunings**: Standard, Low G, Baritone and D.

## Technologies

The app is built with:
- **React** for building the user interface.
- **SCSS** for styling with variables and reusable components.
- **Tone.js** for audio generation and pitch detection.
- **Vite** for development and build performance.
- **Firebase** for Hosting.

## Changelog

### 2025

- **[January 2025]** Designed the Aloha Tune application in Figma
- **[January 2025]** Set up project structure, including React Router & Tone.js
- **[January 2025]** Implemented a static UI using SCSS variables
- **[January 2025]** Added Light / Dark Mode toggle
- **[January 2025]** Captured microphone input for real-time tuning
- **[January 2025]** Implemented string selection for Manual Tuning
- **[March 2025]** Implemented real-time pitch detection using Tone.js
- **[March 2025]** Fixed issue where "C" appeared before first detection
- **[March 2025]** Improved pitch accuracy & stability
- **[March 2025]** Deployed to Firebase
- **[Mai 2025]** Visual tuning feedback added (too high, too low, in tune)
- **[Mai 2025]** Alternative Tuning Options available

### Coming Soon

- **Improved frequency smoothing for better accuracy**
- **Enhanced UI & animations**
