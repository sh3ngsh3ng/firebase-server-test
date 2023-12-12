# Demo for connecting express to firebase emulator
## Steps:
- Install firebase-admin `npm i firebase-admin`
- Start emulator with `emulators:start --only auth --project <project-name>`
- Initialize firebase pointing projectId to "<project-name>"
- Set environment variable to point towards emulator `FIREBASE_AUTH_EMULATOR_HOST="127.0.0.1:9099`
- Firebase admin SDK will automatically points towards the emulator. No need to use connectAuthEmulator method.