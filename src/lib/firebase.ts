import { envVars } from '@/configs'
import { FirebaseApp, initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'

const firebaseConfig = {
  apiKey: envVars.apiKey,
  authDomain: envVars.authDomain,
  projectId: envVars.projectId,
  storageBucket: envVars.storageBucket,
  messagingSenderId: envVars.measurementId,
  appId: envVars.appId,
  measurementId: envVars.measurementId,
}
const app: FirebaseApp = initializeApp(firebaseConfig)

const auth = getAuth(app)

export default auth
