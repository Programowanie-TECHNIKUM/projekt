import creds from '../../firebase-creds.js';
import { initializeApp } from 'firebase/app';

const app = initializeApp(creds);

export default app;