import Constants from 'expo-constants';

// support both manifest and expoConfig shapes
const manifest: any = (Constants as any).manifest ?? (Constants as any).expoConfig;
const hostPort = manifest?.debuggerHost?.split(',')[0];    // "192.168.1.6:19000"
const host = hostPort?.split(':')[0];                      // "192.168.1.6"

// Use port 5001 if running server.py, otherwise adjust to 5000 if you run app.py
const DEV_PORT = 5001;

export const API_URL = host
  ? `http://${host}:${DEV_PORT}/api`
  : 'https://5b1d-103-214-60-89.ngrok-free.app/api';

export default function Config() { return null; }
