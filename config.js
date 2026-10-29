/* ===== Konfigurasi E-Absensi =====
   Firebase config proyek e-absensi-ece45.
   Nilai-nilai ini memang dirancang untuk publik; keamanan data dijaga oleh firestore.rules. */
window.FIREBASE_CONFIG = {
  apiKey: "AIzaSyDd1A6H4-JN3gSXaA0L3KV3MDhsEFgPHjc",
  authDomain: "e-absensi-ece45.firebaseapp.com",
  projectId: "e-absensi-ece45",
  storageBucket: "e-absensi-ece45.firebasestorage.app",
  messagingSenderId: "588132417018",
  appId: "1:588132417018:web:0a5fdb11f54548541ab843",
  measurementId: "G-984K908Q2R"
};

/* Domain semu untuk akun login. Username "ega" menjadi ega@e-absensi.local di Firebase Authentication.
   Jangan diubah setelah ada staf terdaftar. */
window.EMAIL_DOMAIN = "e-absensi.local";
