
## Deployment Steps

- install firebase-tool on globally
```bash
npm install -g firebase-tools
```
- create `.env.local` file in root of document
```bash
  VITE_API_KEY= ""
  VITE_AUTH_DOMAIN= ""
  VITE_STORAGE_BUKET= ""
  VITE_MESSAGING_SENDER_ID= ""
  VITE_APP_ID= ""
  VITE_PROJECT_ID= ""
  VITE_DATABASE_URL= ""
  VITE_MEASUREMENT_ID= ""
```
- you an get above env parameter while create a new project on the firebase , enable live database, enable google &amp; email with password authentication.

- Login with firebase
```bash
  firebase login
```
- Deploy on the firebase
```bash
  firebase deploy
```
