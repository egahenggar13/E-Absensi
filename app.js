const LOGO = "logo.png";
const APP_VERSION = "Versi 10 · 30 Okt 2026";

/* ===================== Konfigurasi & util ===================== */
const TZ = "Asia/Kuala_Lumpur";
const DEFAULT_PREMIS = [
  { id:"kbri",  nama:"KBRI Kuala Lumpur",              alamat:"233 Jalan Tun Razak",              lat:3.14667, lng:101.72194, radius:150 },
  { id:"wisma", nama:"Wisma Duta Indonesia",           alamat:"Kawasan Jalan U-Thant",            lat:3.15386, lng:101.71838, radius:300 },
  { id:"sikl",  nama:"Sekolah Indonesia Kuala Lumpur", alamat:"1 Lorong Tun Ismail",              lat:3.16465, lng:101.69080, radius:150 }
];
/* Jadwal kerja. Petugas Keamanan memilih shift, kecuali saat bertugas di SIKL (jam tetap SIKL). Fungsi lain memakai jam kantor. */
const JADWAL_INFO = {
  umum:   { nama:"Jam kerja kantor",    ket:"Semua fungsi selain Petugas Keamanan" },
  sikl:   { nama:"Jaga SIKL",           ket:"Petugas Keamanan yang bertugas di Sekolah Indonesia Kuala Lumpur" },
  pagi:   { nama:"Shift Pagi",          ket:"Petugas Keamanan, tanpa lembur" },
  lembur: { nama:"Shift Pagi + Lembur", ket:"Petugas Keamanan, dengan lembur" },
  malam:  { nama:"Shift Malam",         ket:"Petugas Keamanan, sampai pagi hari berikutnya" }
};
const DEFAULT_JADWAL = { umum:{mulai:"09:00",selesai:"17:00"}, sikl:{mulai:"08:00",selesai:"15:30"}, pagi:{mulai:"08:00",selesai:"16:30"}, lembur:{mulai:"08:00",selesai:"20:00"}, malam:{mulai:"20:00",selesai:"08:00"} };
const SHIFT_IDS = ["pagi","lembur","malam"];
const DEFAULT_CFG = { nama:"KBRI Kuala Lumpur", premis:DEFAULT_PREMIS, jadwal:DEFAULT_JADWAL, toleransi:15 };
/* Tanggal merah KBRI KL (libur Indonesia & Malaysia). 2026: SKB 3 Menteri + cuti umum WP Kuala Lumpur. 2027: Edaran KBRI KL No. 1615/KP/09/2026/02. Admin bisa mengubahnya di Pengaturan. */
const DEFAULT_LIBUR = {"2026-01-01": "Tahun Baru Masehi (Indonesia & Malaysia)", "2026-01-16": "Isra Mikraj (Indonesia)", "2026-02-01": "Hari Wilayah Persekutuan & Thaipusam (Malaysia)", "2026-02-02": "Pengganti Hari Wilayah Persekutuan (Malaysia)", "2026-02-03": "Pengganti Thaipusam (Malaysia)", "2026-02-16": "Cuti Bersama Imlek (Indonesia)", "2026-02-17": "Tahun Baru Imlek (Indonesia & Malaysia)", "2026-02-18": "Tahun Baharu Cina hari kedua (Malaysia)", "2026-03-07": "Nuzul Al-Quran (Malaysia)", "2026-03-18": "Cuti Bersama Nyepi (Indonesia)", "2026-03-19": "Hari Suci Nyepi (Indonesia)", "2026-03-20": "Cuti Bersama Idulfitri (Indonesia)", "2026-03-21": "Idulfitri / Hari Raya Puasa (Indonesia & Malaysia)", "2026-03-22": "Idulfitri / Hari Raya Puasa (Indonesia & Malaysia)", "2026-03-23": "Cuti Bersama Idulfitri (Indonesia) / Pengganti Hari Raya (Malaysia)", "2026-03-24": "Cuti Bersama Idulfitri (Indonesia)", "2026-04-03": "Wafat Yesus Kristus (Indonesia)", "2026-04-05": "Paskah (Indonesia)", "2026-05-01": "Hari Buruh / Hari Pekerja (Indonesia & Malaysia)", "2026-05-14": "Kenaikan Yesus Kristus (Indonesia)", "2026-05-15": "Cuti Bersama Kenaikan Yesus Kristus (Indonesia)", "2026-05-27": "Iduladha / Hari Raya Haji (Indonesia & Malaysia)", "2026-05-28": "Cuti Bersama Iduladha (Indonesia)", "2026-05-31": "Waisak / Hari Wesak (Indonesia & Malaysia)", "2026-06-01": "Hari Lahir Pancasila (Indonesia) / Hari Keputeraan YDP Agong (Malaysia)", "2026-06-16": "1 Muharam (Indonesia)", "2026-06-17": "Awal Muharam (Malaysia)", "2026-08-17": "Proklamasi Kemerdekaan (Indonesia)", "2026-08-25": "Maulid Nabi / Maulidur Rasul (Indonesia & Malaysia)", "2026-08-31": "Hari Kebangsaan (Malaysia)", "2026-09-16": "Hari Malaysia (Malaysia)", "2026-11-08": "Deepavali (Malaysia)", "2026-11-09": "Pengganti Deepavali (Malaysia)", "2026-12-24": "Cuti Bersama Natal (Indonesia)", "2026-12-25": "Natal / Hari Krismas (Indonesia & Malaysia)", "2027-01-01": "Tahun Baru Masehi (Indonesia & Malaysia)", "2027-01-05": "Isra Mikraj (Indonesia)", "2027-01-22": "Thaipusam (Malaysia)", "2027-02-01": "Hari Wilayah Persekutuan (Malaysia)", "2027-02-05": "Cuti Bersama Imlek (Indonesia)", "2027-02-06": "Tahun Baru Imlek (Indonesia & Malaysia)", "2027-02-07": "Tahun Baharu Cina hari kedua (Malaysia)", "2027-02-08": "Pengganti Tahun Baharu Cina hari kedua (Malaysia)", "2027-02-24": "Nuzul Al-Quran (Malaysia)", "2027-03-08": "Hari Suci Nyepi (Indonesia)", "2027-03-09": "Cuti Bersama Idulfitri (Indonesia)", "2027-03-10": "Idulfitri / Hari Raya Puasa (Indonesia & Malaysia)", "2027-03-11": "Idulfitri / Hari Raya Puasa (Indonesia & Malaysia)", "2027-03-12": "Cuti Bersama Idulfitri (Indonesia)", "2027-03-15": "Cuti Bersama Idulfitri (Indonesia)", "2027-03-25": "Cuti Bersama Wafat Yesus Kristus (Indonesia)", "2027-03-26": "Wafat Yesus Kristus (Indonesia)", "2027-03-28": "Paskah (Indonesia)", "2027-05-01": "Hari Buruh / Hari Pekerja (Indonesia & Malaysia)", "2027-05-06": "Kenaikan Yesus Kristus (Indonesia)", "2027-05-17": "Iduladha / Hari Raya Qurban (Indonesia & Malaysia)", "2027-05-18": "Cuti Bersama Iduladha (Indonesia)", "2027-05-19": "Cuti Bersama Waisak (Indonesia)", "2027-05-20": "Waisak / Hari Wesak (Indonesia & Malaysia)", "2027-06-01": "Hari Lahir Pancasila (Indonesia)", "2027-06-06": "1 Muharam / Awal Muharam (Indonesia & Malaysia)", "2027-06-07": "Pengganti Awal Muharam (Malaysia)", "2027-08-15": "Maulid Nabi / Maulidur Rasul (Indonesia & Malaysia)", "2027-08-16": "Pengganti Maulidur Rasul (Malaysia)", "2027-08-17": "Proklamasi Kemerdekaan (Indonesia)", "2027-08-31": "Hari Kebangsaan (Malaysia)", "2027-09-16": "Hari Malaysia (Malaysia)", "2027-10-28": "Deepavali (Malaysia)", "2027-12-24": "Cuti Bersama Natal (Indonesia)", "2027-12-25": "Natal / Hari Krismas (Indonesia & Malaysia)", "2027-12-26": "Isra Mikraj (Indonesia)"};
function normCfg(d){ const c={...DEFAULT_CFG,...d}; c.libur = (d && d.libur && typeof d.libur==="object") ? d.libur : DEFAULT_LIBUR; if(!Array.isArray(c.premis)||!c.premis.length) c.premis=DEFAULT_PREMIS;
  c.jadwal={...DEFAULT_JADWAL,...(d?.jadwal||{})}; ["lat","lng","radius","alamat","jamMasuk","jamPulang"].forEach(k=>delete c[k]); return c; }
const isSecurity = f => /keamanan|security|satpam/i.test(String(f||""));
function jadwalById(id){ const j=S.cfg.jadwal[id]||DEFAULT_JADWAL[id]; return { id, nama:JADWAL_INFO[id].nama, mulai:j.mulai, selesai:j.selesai, lintas: toMin(j.selesai)<=toMin(j.mulai) }; }
function jadwalFor(fungsi, premisId, shiftId){ return jadwalById(!isSecurity(fungsi) ? "umum" : premisId==="sikl" ? "sikl" : (shiftId||"pagi")); }
const jadwalText = j => j ? `${j.nama} ${j.mulai}–${j.selesai}` : "";
/* Saran shift dari jam sekarang */
function suggestShift(jenis){ const h=+timeStr().slice(0,2); return jenis==="masuk" ? (h>=17||h<5 ? "malam" : "pagi") : (h<12 ? "malam" : h<18 ? "pagi" : "lembur"); }
/* Premis terdekat: masuk area bila jarak <= radius premis */
function detectPremis(lat,lng){
  const all=S.cfg.premis.map(p=>({...p,jarak:haversine(lat,lng,p.lat,p.lng)})).sort((a,b)=>a.jarak-b.jarak);
  const near=all[0]; return { premis: near.jarak<=near.radius ? near : null, terdekat: near };
}
/* Durasi kerja dari dua timestamp ISO */
function durMin(a,b){ return Math.max(0,Math.round((new Date(b)-new Date(a))/60000)); }
const fmtDur = m => `${Math.floor(m/60)} j ${String(m%60).padStart(2,"0")} m`;
function lengkap(r){ return !!(r?.masuk && r?.pulang); }
function markFor(r){
  if(!r || (!r.masuk && !r.pulang)) return `<span class="chk none" title="Belum absen">${I.dash}</span>`;
  return lengkap(r) ? `<span class="chk ok" title="Absen masuk dan pulang lengkap">${I.tick}</span>` : `<span class="chk no" title="${r.masuk?'Belum absen pulang':'Tidak ada absen masuk'}">${I.cross}</span>`;
}
function durText(r){
  if(lengkap(r)) return fmtDur(durMin(r.masuk.ts,r.pulang.ts));
  if(r?.masuk && Date.now()-new Date(r.masuk.ts) < 16*3600e3) return fmtDur(durMin(r.masuk.ts,new Date().toISOString()))+" (berjalan)";
  return "—";
}
const premisName = x => x?.premisNama || (x?.dalamRadius===false ? "Di luar premis" : (x ? "KBRI Kuala Lumpur" : ""));
const FUNGSI = ["Petugas Keamanan / Security","Staff Keuangan","Komunikasi","BPKRT","Ekonomi","Politik","Pertahanan","Pensosbud","Pendidikan","Staff Dubes dan DCM","Konsuler","Perhubungan","Riset","Perdagangan","Imigrasi","Hukum","Ketenagakerjaan","Atpol"];

const $ = (s, el=document) => el.querySelector(s);
const esc = s => String(s ?? "").replace(/[&<>"']/g, c => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
const initials = n => String(n||"?").trim().split(/\s+/).slice(0,2).map(w=>w[0]).join("").toUpperCase();
const dateKey = (d=new Date()) => d.toLocaleDateString("en-CA",{timeZone:TZ});
const timeStr = (d=new Date()) => d.toLocaleTimeString("en-GB",{timeZone:TZ,hour12:false});
const longDate = (d=new Date()) => d.toLocaleDateString("id-ID",{timeZone:TZ,weekday:"long",day:"numeric",month:"long",year:"numeric"});
const shortDate = key => new Date(key+"T12:00:00+08:00").toLocaleDateString("id-ID",{timeZone:TZ,weekday:"short",day:"numeric",month:"short"});
const toMin = hhmm => { const [h,m]=String(hhmm||"0:0").split(":").map(Number); return h*60+(m||0); };
function haversine(a,b,c,d){const R=6371e3,t=x=>x*Math.PI/180;const dl=t(c-a),dg=t(d-b);const h=Math.sin(dl/2)**2+Math.cos(t(a))*Math.cos(t(c))*Math.sin(dg/2)**2;return 2*R*Math.asin(Math.sqrt(h));}
const fmtDist = m => m>=1000 ? (m/1000).toFixed(1)+" km" : Math.round(m)+" m";
async function sha256(s){const b=await crypto.subtle.digest("SHA-256",new TextEncoder().encode(s));return [...new Uint8Array(b)].map(x=>x.toString(16).padStart(2,"0")).join("");}
const randSalt = () => [...crypto.getRandomValues(new Uint8Array(8))].map(x=>x.toString(16).padStart(2,"0")).join("");
const store = { get(k){try{return localStorage.getItem(k)}catch(e){return null}}, set(k,v){try{localStorage.setItem(k,v)}catch(e){}}, del(k){try{localStorage.removeItem(k)}catch(e){}} };
function toast(msg){const t=document.createElement("div");t.className="toast";t.textContent=msg;document.body.appendChild(t);setTimeout(()=>t.remove(),2600);}

const I = {
  cal:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4.5" width="18" height="16.5" rx="4"/><path d="M8 2.5v4M16 2.5v4M3 10h18"/></svg>',
  clip:'<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 11.5l-8.6 8.6a5 5 0 0 1-7.1-7.1l9.2-9.2a3.4 3.4 0 0 1 4.8 4.8l-9.2 9.2a1.7 1.7 0 0 1-2.4-2.4l8.5-8.5"/></svg>',
  tick:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3.2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12.5l4.5 4.5L19 7.5"/></svg>',
  cross:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3.2" stroke-linecap="round"><path d="M7 7l10 10M17 7L7 17"/></svg>',
  dash:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round"><path d="M7 12h10"/></svg>',
  bldg:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 21s-7-6.2-7-12a7 7 0 0 1 14 0c0 5.8-7 12-7 12z"/><circle cx="12" cy="9" r="2.5"/></svg>',
  logo:'<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 21V9l8-5 8 5v12"/><path d="M9 21v-6h6v6"/><path d="M12 4v-2"/></svg>',
  home:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 11l9-7 9 7"/><path d="M5 10v10h14V10"/></svg>',
  hist:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></svg>',
  user:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="8" r="4"/><path d="M4 21c1.5-4 4.5-6 8-6s6.5 2 8 6"/></svg>',
  chart:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="5"/><path d="M8 16v-4M12 16V8M16 16v-6"/></svg>',
  team:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="9" cy="8" r="3.5"/><path d="M2.5 20c1-3.5 3.5-5 6.5-5s5.5 1.5 6.5 5"/><circle cx="17" cy="9" r="2.5"/><path d="M17 14c2.5 0 4 1.5 4.5 4"/></svg>',
  gear:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.7 1.7 0 0 0 .3 1.8l.1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1.7 1.7 0 0 0-1.8-.3 1.7 1.7 0 0 0-1 1.5V21a2 2 0 1 1-4 0v-.1a1.7 1.7 0 0 0-1.1-1.5 1.7 1.7 0 0 0-1.8.3l-.1.1a2 2 0 1 1-2.8-2.8l.1-.1a1.7 1.7 0 0 0 .3-1.8 1.7 1.7 0 0 0-1.5-1H3a2 2 0 1 1 0-4h.1a1.7 1.7 0 0 0 1.5-1.1 1.7 1.7 0 0 0-.3-1.8l-.1-.1a2 2 0 1 1 2.8-2.8l.1.1a1.7 1.7 0 0 0 1.8.3H9a1.7 1.7 0 0 0 1-1.5V3a2 2 0 1 1 4 0v.1a1.7 1.7 0 0 0 1 1.5 1.7 1.7 0 0 0 1.8-.3l.1-.1a2 2 0 1 1 2.8 2.8l-.1.1a1.7 1.7 0 0 0-.3 1.8V9a1.7 1.7 0 0 0 1.5 1H21a2 2 0 1 1 0 4h-.1a1.7 1.7 0 0 0-1.5 1z"/></svg>',
  pin:'<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 21s-7-6.2-7-12a7 7 0 0 1 14 0c0 5.8-7 12-7 12z"/><circle cx="12" cy="9" r="2.5"/></svg>',
  face:'<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 8V6a2 2 0 0 1 2-2h2M16 4h2a2 2 0 0 1 2 2v2M20 16v2a2 2 0 0 1-2 2h-2M8 20H6a2 2 0 0 1-2-2v-2"/><path d="M9 10h.01M15 10h.01M9.5 15a3.5 3.5 0 0 0 5 0"/></svg>',
  in:'<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"/><path d="M10 17l5-5-5-5M15 12H3"/></svg>',
  out:'<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><path d="M16 17l5-5-5-5M21 12H9"/></svg>',
  eye:'<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12z"/><circle cx="12" cy="12" r="3"/></svg>',
  check:'<svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M8 12.5l3 3 5-6"/></svg>',
  sheet:'<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="4" y="3" width="16" height="18" rx="3"/><path d="M4 9h16M4 15h16M10 9v12"/></svg>',
  dl:'<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 4v11M7 10l5 5 5-5M5 20h14"/></svg>',
  copy:'<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="8" y="8" width="12" height="12" rx="3"/><path d="M16 8V6a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h2"/></svg>'
};

/* ===================== State ===================== */
const S = { db:null, auth:null, booted:false, setupNeeded:false, wajah:undefined, cfg:{...DEFAULT_CFG}, me:null, tab:null,
  today:null, history:[], staff:[], rekapDate:dateKey(), rekap:[], subs:[], rekapUnsub:null, stream:null };

/* Re-render only when the current screen shows the data that changed, so typing in a form is never wiped */
const DEPS={home:["cfg","today","history","cuaca","wajah","izin"],riwayat:["history","izin","kal"],profil:["wajah"],rekap:["cfg","staff","rekap","izin"],kalender:["staff","izin","kal"],staff:["staff"],atur:[]};
function refresh(k){ if(S.me && (DEPS[S.tab]||[]).includes(k)) render(); }
function clearSubs(){ S.subs.forEach(u=>{try{u()}catch(e){}}); S.subs=[]; if(S.rekapUnsub){try{S.rekapUnsub()}catch(e){} S.rekapUnsub=null;} if(S.todayUnsub){try{S.todayUnsub()}catch(e){} S.todayUnsub=null;} if(S.ydayUnsub){try{S.ydayUnsub()}catch(e){} S.ydayUnsub=null;} }

/* ===================== Boot ===================== */
render();
setInterval(()=>{ const c=$("#clock"); if(c){ const t=timeStr(); c.innerHTML=t.slice(0,5)+'<small>:'+t.slice(6)+'</small>'; }
  if (S.me && S.me.role!=="admin" && S.db && S.me.uid && S.dayKey && S.dayKey!==dateKey()) { subToday(); render(); }
  const d=$("#durLive"); if(d && S.me){ const a=activeRec().rec; if(a?.masuk && !a.pulang) d.textContent=fmtDur(durMin(a.masuk.ts,new Date().toISOString())); } },1000);

/* Firebase: login (Authentication), database (Firestore), offline cache */
const configOk = () => !!(window.FIREBASE_CONFIG && FIREBASE_CONFIG.apiKey && !/GANTI|YOUR_/i.test(FIREBASE_CONFIG.apiKey));
const emailOf = u => `${u}@${window.EMAIL_DOMAIN || "e-absensi.local"}`;
(async () => {
  if (!configOk() || !window.firebase) { S.booted = "noconfig"; render(); return; }
  firebase.initializeApp(FIREBASE_CONFIG);
  S.auth = firebase.auth(); S.db = firebase.firestore();
  try { await S.db.enablePersistence({ synchronizeTabs:true }); } catch(e){}
  try { const st = await S.db.doc("config/setup").get(); S.setupNeeded = !st.exists; } catch(e){ S.setupNeeded = false; }
  S.auth.onAuthStateChanged(async u => {
    if (S.settingUp) return;            // penyiapan pertama mengurus sesinya sendiri
    if (!u) { if (S.me) endSession(); S.booted = true; render(); return; }
    try {
      const s = await S.db.doc("staff/"+u.uid).get();
      if (!s.exists || s.data().aktif === false) { await S.auth.signOut(); S.booted = true; S.loginMsg = "Akun ini tidak aktif atau belum terdaftar sebagai staf. Hubungi admin."; render(); return; }
      S.booted = true; startSession({ ...s.data(), uid:u.uid });
    } catch(e) { S.booted = true; S.loginMsg = "Tidak bisa memuat data akun. Periksa koneksi lalu coba lagi."; render(); }
  });
})();

/* ===================== Auth ===================== */
async function login(e){
  e.preventDefault();
  const u = $("#lu").value.trim().toLowerCase(), p = $("#lp").value, err = $("#lerr"), btn = $("#lbtn");
  err.hidden = true; S.loginMsg = "";
  if (!S.auth) { err.textContent = "Aplikasi belum terhubung ke Firebase. Isi config.js terlebih dahulu."; err.hidden=false; return; }
  if (!u || !p) { err.textContent = "Isi username dan password."; err.hidden=false; return; }
  if (!/^[a-z0-9._-]{3,40}$/.test(u)) { err.textContent = "Username atau password salah."; err.hidden=false; return; }
  btn.disabled = true; btn.textContent = "Memeriksa…";
  try { await S.auth.signInWithEmailAndPassword(emailOf(u), p); }
  catch(ex) {
    const c = ex?.code || "";
    err.textContent = /too-many-requests/.test(c) ? "Terlalu banyak percobaan. Tunggu beberapa menit lalu coba lagi."
      : /network/.test(c) ? "Tidak ada koneksi internet. Periksa jaringan lalu coba lagi."
      : "Username atau password salah.";
    err.hidden=false; btn.disabled=false; btn.textContent="Masuk";
  }
}
function endSession(){ closeSheet(); clearSubs(); S.me=null; S.tab=null; S.today=null; S.yday=null; S.history=[]; S.allRecs=[]; S.izin=[]; S.kalRecs=null; S.staff=[]; S.rekap=[]; S.dayKey=null; S.wajah=undefined; }
async function logout(){ endSession(); render(); try { await S.auth?.signOut(); } catch(e){} }

/* Penyiapan pertama: membuat akun admin pertama dan pengaturan awal dalam satu batch */
async function setupFirstAdmin(e){
  e.preventDefault();
  const nama=$("#suNama").value.trim(), u=$("#suUser").value.trim().toLowerCase(), p=$("#suPass").value, err=$("#suErr"), btn=$("#suBtn");
  const fail=m=>{ err.textContent=m; err.hidden=false; btn.disabled=false; btn.textContent="Buat akun admin"; };
  err.hidden=true;
  if(!nama) return fail("Isi nama admin.");
  if(!/^[a-z0-9._-]{3,40}$/.test(u)) return fail("Username 3–40 karakter: huruf kecil, angka, titik, strip.");
  if(p.length<8) return fail("Password admin minimal 8 karakter.");
  btn.disabled=true; btn.textContent="Menyiapkan…"; S.settingUp=true;
  try {
    const cred = await S.auth.createUserWithEmailAndPassword(emailOf(u), p);
    const uid = cred.user.uid, b = S.db.batch();
    b.set(S.db.doc("config/setup"), { done:true, admin:uid, dibuat:new Date().toISOString() });
    b.set(S.db.doc("config/kantor"), { ...DEFAULT_CFG });
    b.set(S.db.doc("staff/"+uid), { uid, nama, fungsi:"Admin Kepegawaian", username:u, role:"admin", aktif:true, dibuat:new Date().toISOString() });
    await b.commit();
    S.setupNeeded=false; S.settingUp=false;
    const s = await S.db.doc("staff/"+uid).get(); startSession({ ...s.data(), uid });
  } catch(ex) {
    S.settingUp=false; try{ if(S.auth.currentUser) await S.auth.currentUser.delete(); }catch(_){}
    const c=ex?.code||"";
    fail(/email-already-in-use/.test(c) ? "Username itu sudah dipakai." : /weak-password/.test(c) ? "Password terlalu lemah." : "Penyiapan gagal. Pastikan Authentication (Email/Password) dan Firestore sudah aktif, lalu coba lagi.");
  }
}

function startSession(d){
  clearSubs();
  S.me = d; S.tab = d.role === "admin" ? "rekap" : "home";
  S.subs.push(S.db.doc("config/kantor").onSnapshot(s => { if (s.exists) { S.cfg = normCfg(s.data()); refresh("cfg"); } }, ()=>{}));
  S.calMonth = dateKey().slice(0,7);
  if (d.role === "admin") {
    S.subs.push(S.db.collection("izin").onSnapshot(q => { S.izin = q.docs.map(x=>({...x.data(), _id:x.id})); refresh("izin"); }, ()=>{}));
    S.subs.push(S.db.collection("wajah").onSnapshot(q => { S.wajahAll = Object.fromEntries(q.docs.map(x=>[x.id, x.data()])); refresh("staff"); }, ()=>{}));
    S.subs.push(S.db.collection("staff").onSnapshot(q => { S.staff = q.docs.map(x=>({...x.data(), uid:x.id})).sort((a,b)=>String(a.nama).localeCompare(String(b.nama))); refresh("staff"); }, ()=>{}));
    subRekap();
  } else {
    subToday();
    startWeather();
    S.subs.push(S.db.collection("izin").where("uid","==",d.uid).onSnapshot(q => { S.izin = q.docs.map(x=>({...x.data(), _id:x.id})); refresh("izin"); }, ()=>{}));
    S.subs.push(S.db.collection("absensi").where("uid","==",d.uid).onSnapshot(q => {
      S.allRecs = q.docs.map(x=>({...x.data(), _id:x.id}));
      S.history = [...S.allRecs].sort((a,b)=>b.tanggal.localeCompare(a.tanggal)||(b.sesi||1)-(a.sesi||1)).slice(0,40);
      refresh("history"); refresh("today");
    }, ()=>{}));
    S.subs.push(S.db.doc("staff/"+d.uid).onSnapshot(s => { if (!s.exists || s.data().aktif===false) { toast("Akun tidak aktif lagi."); logout(); } else { S.me = { ...s.data(), uid:d.uid }; } }, ()=>{}));
    S.subs.push(S.db.doc("wajah/"+d.uid).onSnapshot(s => { S.wajah = s.exists ? s.data() : null; refresh("wajah"); }, ()=>{ S.wajah = null; }));
  }
  render();
}
/* Today's record; re-subscribed when the date changes while the app stays open */
function subToday(){ S.dayKey = dateKey(); refresh("today"); }
function subRekap(){
  if (S.rekapUnsub) { try{S.rekapUnsub()}catch(e){} }
  S.rekap = [];
  S.rekapUnsub = S.db.collection("absensi").where("tanggal","==",S.rekapDate).onSnapshot(q => { S.rekap = q.docs.map(x=>x.data()); refresh("rekap"); }, ()=>{});
}

/* ===================== Cuaca ===================== */
/* Cuaca Kuala Lumpur langsung dari Open-Meteo (gratis, tanpa kunci API), diperbarui tiap 30 menit */
const WMO = c => c===0 ? ["sun","Cerah"] : c===1 ? ["sun","Cerah berawan"] : c===2 ? ["cloud","Berawan"] : c===3 ? ["cloud","Mendung"]
  : (c===45||c===48) ? ["fog","Kabut"] : (c>=51&&c<=57) ? ["rain", c>=55?"Gerimis lebat":"Gerimis"] : (c>=61&&c<=67) ? ["rain", c>=65?"Hujan lebat":c>=63?"Hujan":"Hujan ringan"]
  : (c>=80&&c<=82) ? ["rain", c===82?"Hujan deras":"Hujan lokal"] : c>=95 ? ["storm", c>=96?"Badai petir lebat":"Badai petir"] : ["cloud","Berawan"];
let wxTimer=null;
/* Lokasi cuaca: posisi GPS terakhir staf (dari absen) bila ada, selain itu KBRI KL */
function wxLoc(){ try{ const g=JSON.parse(store.get("wxloc")||"null"); if(g && Date.now()-g.t < 6*3600e3) return g; }catch(e){} return { lat:3.1467, lng:101.7219 }; }
let wxBusy=false;
async function loadWeather(force){
  if(wxBusy) return; wxBusy=true; if(force){ S.wxLoading=true; refresh("cuaca"); }
  try{
    const L=wxLoc();
    const url=`https://api.open-meteo.com/v1/forecast?latitude=${L.lat.toFixed(4)}&longitude=${L.lng.toFixed(4)}`
      + "&current=temperature_2m,apparent_temperature,weather_code,is_day,precipitation,rain,showers"
      + "&minutely_15=precipitation,weather_code&forecast_minutely_15=4&past_minutely_15=1"
      + "&daily=temperature_2m_max,temperature_2m_min,precipitation_probability_max&timezone=Asia%2FKuala_Lumpur&forecast_days=1";
    const d=await fetch(url,{cache:"no-store"}).then(r=>r.json());
    let [jenis,kondisi]=WMO(d.current.weather_code);
    // Curah hujan 15 menit terakhir/berjalan lebih cepat menangkap hujan dibanding kode cuaca per jam
    const m15=d.minutely_15?.precipitation||[], mm=Math.max(+d.current.precipitation||0, +d.current.rain||0, +d.current.showers||0, +(m15[0]||0), +(m15[1]||0));
    const c15=(d.minutely_15?.weather_code||[]).slice(0,2).map(Number);
    if(c15.some(c=>c>=95)){ jenis="storm"; kondisi="Badai petir"; }
    else if(mm>0 && (jenis==="cloud"||jenis==="sun"||jenis==="fog")){ jenis="rain"; kondisi = mm<0.5 ? "Gerimis" : mm<2.5 ? "Hujan ringan" : "Hujan"; }
    const akan=m15.slice(1).some(x=>+x>0) && jenis!=="rain" && jenis!=="storm";
    S.cuaca={ suhu:d.current.temperature_2m, terasa:d.current.apparent_temperature, kondisi, jenis, siang:!!d.current.is_day, akanHujan:akan,
      tinggi:d.daily.temperature_2m_max[0], rendah:d.daily.temperature_2m_min[0], hujan:d.daily.precipitation_probability_max[0], diperbarui:new Date().toISOString() };
    store.set("cuaca", JSON.stringify(S.cuaca));
  }catch(e){ try{ const c=JSON.parse(store.get("cuaca")||"null"); if(c) S.cuaca=c; }catch(_){} if(force) toast("Cuaca belum bisa diperbarui. Periksa koneksi."); }
  wxBusy=false; S.wxLoading=false; refresh("cuaca");
}
/* Perbarui tiap 10 menit, dan langsung saat aplikasi dibuka kembali bila data > 5 menit */
function startWeather(){
  if(wxTimer) return; loadWeather(); wxTimer=setInterval(()=>{ if(!document.hidden) loadWeather(); }, 10*60*1000);
  document.addEventListener("visibilitychange", ()=>{ if(!document.hidden && S.me && (!S.cuaca || Date.now()-new Date(S.cuaca.diperbarui) > 5*60*1000)) loadWeather(); });
}
const WX_ICON = {
  sun:'<svg viewBox="0 0 48 48"><circle cx="24" cy="24" r="10" fill="#FFE27A"/><g stroke="#FFF3B0" stroke-width="3.5" stroke-linecap="round"><path d="M24 4v6M24 38v6M4 24h6M38 24h6M9.9 9.9l4.2 4.2M33.9 33.9l4.2 4.2M9.9 38.1l4.2-4.2M33.9 14.1l4.2-4.2"/></g></svg>',
  moon:'<svg viewBox="0 0 48 48"><path d="M31 6a17 17 0 1 0 11 29A14 14 0 0 1 31 6z" fill="#FFF1B8"/><circle cx="12" cy="10" r="1.6" fill="#fff"/><circle cx="40" cy="14" r="1.2" fill="#fff"/></svg>',
  cloud:'<svg viewBox="0 0 48 48"><path d="M15 36h20a9 9 0 0 0 0-18 12 12 0 0 0-23 3A7.5 7.5 0 0 0 15 36z" fill="#fff"/></svg>',
  rain:'<svg viewBox="0 0 48 48"><path d="M15 30h20a8 8 0 0 0 0-16 11 11 0 0 0-21 3A6.5 6.5 0 0 0 15 30z" fill="#fff"/><g stroke="#BFF1FF" stroke-width="3" stroke-linecap="round"><path d="M17 35l-2 5M25 35l-2 5M33 35l-2 5"/></g></svg>',
  storm:'<svg viewBox="0 0 48 48"><path d="M15 28h20a8 8 0 0 0 0-16 11 11 0 0 0-21 3A6.5 6.5 0 0 0 15 28z" fill="#fff"/><path d="M26 28l-6 9h5l-3 8 9-11h-5l3-6z" fill="#FFD84D"/></svg>',
  fog:'<svg viewBox="0 0 48 48"><path d="M15 26h20a8 8 0 0 0 0-16 11 11 0 0 0-21 3A6.5 6.5 0 0 0 15 26z" fill="#fff"/><g stroke="#fff" stroke-width="3" stroke-linecap="round" opacity=".8"><path d="M10 33h28M14 39h22"/></g></svg>'
};
/* Langit pada kartu jam: kunci tampilan dari jenis cuaca + siang/malam */
function skyKey(){
  const w=S.cuaca; if(!w || typeof w.suhu!=="number" || !((Date.now()-new Date(w.diperbarui))/3600e3 < 12)) return null;
  const h=+timeStr().slice(0,2), siang = typeof w.siang==="boolean" ? w.siang : (h>=7 && h<19);
  const j = ["sun","moon"].includes(w.jenis) ? (siang?"sun":"clear") : (WX_ICON[w.jenis]?w.jenis:"cloud");
  return j==="sun" ? "sun-d" : j==="clear" ? "clear-n" : `${j}-${siang?"d":"n"}`;
}
function rnd(seed){ let x=seed; return ()=>{ x=(x*9301+49297)%233280; return x/233280; }; }
function skyLayer(key){
  if(!key) return "";
  const r=rnd(7), parts=[];
  const [j,dn]=key.split("-");
  if(j==="sun") parts.push('<i class="sunglow"></i>');
  if(j==="clear"){ parts.push('<i class="moonglow"></i>'); for(let i=0;i<26;i++) parts.push(`<i class="star" style="left:${(r()*100).toFixed(1)}%;top:${(r()*70).toFixed(1)}%;animation-delay:${(r()*3).toFixed(2)}s;opacity:${(.3+r()*.7).toFixed(2)}"></i>`); }
  const nCloud = {sun:1,clear:0,cloud:7,rain:5,storm:6,fog:2}[j]||0, cOp = dn==="n" ? .32 : .5;
  for(let i=0;i<nCloud;i++){ const w=140+r()*170; parts.push(`<i class="cl" style="width:${w|0}px;height:${(w*.45)|0}px;left:${(r()*100-30).toFixed(1)}%;top:${(r()*55-12).toFixed(1)}%;opacity:${(cOp*(.7+r()*.5)).toFixed(2)};animation-duration:${(14+r()*14)|0}s;animation-delay:${(-r()*14).toFixed(1)}s"></i>`); }
  if(j==="rain"||j==="storm"){ const n=j==="storm"?60:42; for(let i=0;i<n;i++) parts.push(`<i class="drop" style="left:${(r()*110).toFixed(1)}%;animation-delay:${(-r()*1.2).toFixed(2)}s;animation-duration:${(.65+r()*.5).toFixed(2)}s;opacity:${(.35+r()*.6).toFixed(2)}"></i>`); }
  if(j==="storm") parts.push('<i class="flash"></i>');
  if(j==="fog") for(let i=0;i<4;i++) parts.push(`<i class="mist" style="top:${20+i*22}%;animation-duration:${(20+r()*20)|0}s"></i>`);
  return `<div class="sky" aria-hidden="true">${parts.join("")}</div>`;
}
function sebabGagal(e){
  const c=e?.code||"";
  if(/permission-denied|insufficient/i.test(c+(e?.message||""))) return "Ditolak oleh aturan database. Pastikan aplikasi sudah versi terbaru dan Firestore Rules sudah diperbarui.";
  if(/unavailable|network|offline/i.test(c+(e?.message||""))) return "Tidak ada koneksi internet. Coba lagi.";
  return "Gagal menyimpan ("+(c||"tidak diketahui")+"). Coba lagi.";
}
function menitLalu(iso){ const m=Math.round((Date.now()-new Date(iso))/60000); return m<1 ? "baru saja" : m<60 ? `${m} mnt lalu` : `${Math.round(m/60)} jam lalu`; }
function weatherInline(){
  const key=skyKey(); if(!key) return "";
  const w=S.cuaca, ic = key.startsWith("clear") ? WX_ICON.moon : key.startsWith("sun") ? WX_ICON.sun : (WX_ICON[key.split("-")[0]]||WX_ICON.cloud);
  const jam=new Date(w.diperbarui).toLocaleTimeString("en-GB",{timeZone:TZ,hour:"2-digit",minute:"2-digit"});
  return `<div class="wxi" aria-label="Cuaca Kuala Lumpur ${Math.round(w.suhu)} derajat, ${esc(w.kondisi)}">
    <div class="tmp">${Math.round(w.suhu)}°</div>
    <div class="cnd">${ic}<span>${esc(w.kondisi)}</span></div>
    ${typeof w.tinggi==="number"?`<div class="hl">T:${Math.round(w.tinggi)}°  R:${Math.round(w.rendah)}°${typeof w.hujan==="number"?` · ☂${w.hujan}%`:''}</div>`:''}
    <button type="button" class="src" id="wxRefresh" aria-label="Perbarui cuaca">${S.wxLoading?'Memperbarui…':`${w.akanHujan?'Hujan dalam 1 jam · ':''}${menitLalu(w.diperbarui)} · ↻`}</button>
  </div>`;
}

/* ===================== Status helpers ===================== */
function statusMasuk(jam, j){
  let m=toMin(jam.slice(0,5)); const start=toMin(j.mulai);
  if (j.lintas && m < 12*60 && start >= 12*60) m += 1440;          // lewat tengah malam pada shift malam
  return m <= start + Number(S.cfg.toleransi||0) ? "Tepat waktu" : "Terlambat";
}
/* Batas pulang: tanggal mulai + jam selesai (+1 hari untuk shift lintas hari) */
function statusPulang(now, j, startKey){
  let end = new Date(`${startKey||dateKey(now)}T${j.selesai}:00+08:00`);
  if (j.lintas && startKey) end = new Date(end.getTime()+86400000);
  return now < end ? "Pulang cepat" : "Sesuai jadwal";
}
/* Catatan yang sedang berjalan: shift malam kemarin yang belum ditutup menang atas hari ini yang masih kosong */
const bySesi=(a,b)=>(a.sesi||1)-(b.sesi||1);
function todayRecs(){ return (S.allRecs||[]).filter(r=>r.tanggal===S.dayKey).sort(bySesi); }
/* Sesi aktif: sesi hari ini yang belum absen pulang; shift malam kemarin yang belum ditutup bila hari ini masih kosong */
function activeRec(){
  const t=todayRecs(), open=[...t].reverse().find(r=>r.masuk&&!r.pulang);
  if (open) return { rec:open, key:open.tanggal, kemarin:false, sesiCount:t.length };
  const yKey=dateKey(new Date(Date.now()-86400000));
  const y=(S.allRecs||[]).filter(r=>r.tanggal===yKey && r.masuk && !r.pulang && r.jadwal?.lintas).sort(bySesi).pop();
  if (y && !t.length) return { rec:y, key:y.tanggal, kemarin:true, sesiCount:0 };
  return { rec:t[t.length-1]||null, key:S.dayKey, kemarin:false, sesiCount:t.length };
}
/* Hari libur di KL: Sabtu, Minggu, atau tanggal merah. Absen tetap dibuka (lembur / jadwal jaga Security). */
function hariLibur(k){ const h=new Date(k+"T12:00:00+08:00").toLocaleDateString("en-US",{timeZone:TZ,weekday:"short"}); return h==="Sat"||h==="Sun"||!!(S.cfg.libur||{})[k]; }
function namaLibur(k){ const lib=(S.cfg.libur||{})[k]; if(lib) return lib; const h=new Date(k+"T12:00:00+08:00").toLocaleDateString("id-ID",{timeZone:TZ,weekday:"long"}); return h==="Sabtu"||h==="Minggu" ? `Hari ${h}` : ""; }
const LEMBUR = "Lembur hari libur";
/* Staf non-Security yang absen di hari libur dicatat sebagai lembur, bukan terlambat / pulang cepat */
function sMasuk(jam, j, tgl){ return !isSecurity(S.me.fungsi) && hariLibur(tgl) ? LEMBUR : statusMasuk(jam, j); }
function sPulang(now, j, startKey, tgl){ return !isSecurity(S.me.fungsi) && hariLibur(startKey||tgl) ? LEMBUR : statusPulang(now, j, startKey); }
function pillStatus(v){ return `<span class="pill ${v==="Terlambat"||v==="Pulang cepat"?'p-warn':v===LEMBUR?'p-info':'p-ok'}">${esc(v)}</span>`; }
function pillFor(rec){
  if (!rec || (!rec.masuk && !rec.pulang)) return '<span class="pill p-mute">Belum absen</span>';
  if (!rec.masuk) return '<span class="pill p-bad">Tanpa absen masuk</span>';
  let h = pillStatus(rec.status);
  if (rec.masuk.dalamRadius === false) h += ' <span class="pill p-bad">Luar premis</span>';
  return h;
}

/* ===================== Render ===================== */
function render(){
  const root = $("#root");
  if (!S.me) { if (S.booted===false) { root.innerHTML = `<div class="login"><img class="logo-lg" src="${LOGO}" alt=""><p class="muted" style="text-align:center">Memuat…</p></div>`; removeNav(); return; }
    const keep={u:$("#lu")?.value||"",p:$("#lp")?.value||""}; root.innerHTML = viewLogin(); if($("#lu")){ $("#lu").value=keep.u; $("#lp").value=keep.p; } $("#lform")?.addEventListener("submit", login); $("#suForm")?.addEventListener("submit", setupFirstAdmin); $("#pwt")?.addEventListener("click", ()=>{const i=$("#lp");i.type=i.type==="password"?"text":"password";}); removeNav(); return; }
  const focusId = document.activeElement?.id;
  const views = { home:viewHome, riwayat:viewRiwayat, profil:viewProfil, rekap:viewRekap, kalender:viewKalenderAdmin, staff:viewStaff, atur:viewAtur };
  root.innerHTML = topbar() + (views[S.tab]||viewHome)();
  bindView();
  renderNav();
  if (focusId && $("#"+focusId)) $("#"+focusId).focus();
}

function topbar(){
  return `<div class="topbar"><div class="brand"><img class="emblem" src="${LOGO}" alt="Logo KBRI Kuala Lumpur"><div><b>E-Absensi</b><span>${esc(S.cfg.nama)}</span></div></div>
  <button class="avatar" data-go="${S.me.role==='admin'?'atur':'profil'}" aria-label="Profil">${esc(initials(S.me.nama))}</button></div>`;
}

function viewLogin(){
  const warn = S.booted==="noconfig" ? `<div class="banner">Aplikasi belum terhubung ke Firebase. Isi file config.js sesuai panduan README.</div>`
    : S.loginMsg ? `<div class="banner">${esc(S.loginMsg)}</div>` : "";
  if (S.setupNeeded && S.auth) return viewSetup();
  return `<div class="login">
    <img class="logo-lg" src="${LOGO}" alt="Logo Kedutaan Besar Republik Indonesia Kuala Lumpur">
    <div class="stack center" style="gap:6px"><span class="eyebrow" style="display:flex;flex-direction:column;gap:2px"><span>Kedutaan Besar Republik Indonesia</span><span>Kuala Lumpur</span></span><h1>Selamat datang di E-Absensi</h1><p class="muted">Masuk dengan akun staf untuk mencatat kehadiran hari ini.</p></div>
    ${warn}
    <form id="lform" class="card stack" autocomplete="on">
      <label class="f">Username<input class="input" id="lu" autocomplete="username" autocapitalize="none" placeholder="contoh: ega.lukita"></label>
      <label class="f">Password<div class="pw"><input class="input" id="lp" type="password" autocomplete="current-password" placeholder="••••••••"><button type="button" id="pwt" aria-label="Tampilkan password">${I.eye}</button></div></label>
      <p id="lerr" class="small" style="color:var(--bad);font-weight:600" hidden></p>
      <button class="cta" id="lbtn" type="submit">Masuk</button>
    </form>
    <p class="small muted" style="text-align:center">Lupa password? Minta admin kepegawaian untuk mengatur ulang.</p>
    ${installHint()}
    <p class="small muted" style="text-align:center;opacity:.7">${APP_VERSION}</p>
  </div>`;
}

function viewSetup(){
  return `<div class="login">
    <img class="logo-lg" src="${LOGO}" alt="Logo Kedutaan Besar Republik Indonesia Kuala Lumpur">
    <div class="stack center" style="gap:6px"><span class="eyebrow">Penyiapan pertama</span><h1>Buat akun admin</h1><p class="muted">Langkah ini hanya muncul sekali. Akun admin dipakai untuk mendaftarkan staf dan melihat rekap.</p></div>
    <form id="suForm" class="card stack" autocomplete="off">
      <label class="f">Nama admin<input class="input" id="suNama" placeholder="contoh: Admin Kepegawaian"></label>
      <label class="f">Username admin<input class="input mono" id="suUser" autocapitalize="none" placeholder="admin"></label>
      <label class="f">Password (min. 8 karakter)<input class="input" id="suPass" type="password" autocomplete="new-password"></label>
      <p id="suErr" class="small" style="color:var(--bad);font-weight:600" hidden></p>
      <button class="cta" id="suBtn" type="submit">Buat akun admin</button>
    </form>
  </div>`;
}

function viewHome(){
  const A = activeRec(), t = A.rec, now = timeStr(), sec = isSecurity(S.me.fungsi);
  const doneIn = !!t?.masuk, doneOut = !!t?.pulang, open = doneIn && !doneOut;
  const cta = open
    ? `<button class="cta out" id="doOut">${I.out} Absen Pulang${A.kemarin?' Shift Malam':''}</button><button class="cta sec" id="doIn">${I.in} Absen Masuk lagi (sesi baru)</button>`
    : `<button class="cta" id="doIn">${I.in} Absen Masuk${A.sesiCount?' (sesi baru)':''}</button><button class="cta sec" id="doOut">${I.out} Absen Pulang${A.sesiCount?'':' (tanpa absen masuk)'}</button>`;
  const izinHariIni = izinOn(S.dayKey, S.me.uid);
  const hari = A.kemarin ? [t] : todayRecs();
  const totalMin = hari.reduce((m,r)=> m + (lengkap(r) ? durMin(r.masuk.ts,r.pulang.ts) : 0), 0);
  const semuaLengkap = hari.length && hari.every(lengkap);
  const durBox = !t ? "" : open
    ? `<div class="dur"><div class="row" style="gap:10px">${markFor(t)}<div><span class="eyebrow">Sedang bekerja${t.sesi>1?` · sesi ${t.sesi}`:''}</span><p class="small muted">${totalMin?`Sesi sebelumnya ${fmtDur(totalMin)}`:'Belum absen pulang'}</p></div></div><b id="durLive">${fmtDur(durMin(t.masuk.ts,new Date().toISOString()))}</b></div>`
    : `<div class="dur"><div class="row" style="gap:10px">${semuaLengkap?markFor(t):`<span class="chk no" title="Ada sesi tidak lengkap">${I.cross}</span>`}<div><span class="eyebrow">Total jam kerja hari ini</span><p class="small muted">${hari.length>1?`${hari.length} sesi · `:''}${semuaLengkap?'Masuk dan pulang lengkap':'Ada absen yang tidak lengkap'}</p></div></div><b${hari.some(lengkap)?'':' class="muted"'}>${hari.some(lengkap)?fmtDur(totalMin):'—'}</b></div>`;
  const premisList = S.cfg.premis.map(p=>`<span class="premis">${I.bldg}${esc(p.nama)}</span>`).join(" ");
  const tilePremis = x => x ? `<span class="premis" style="${x.dalamRadius===false?'background:var(--bad-soft);color:var(--bad)':''}">${I.bldg}${esc(premisName(x))}</span>` : '';
  return `
  <section class="hero${skyKey()?` sky-${skyKey()}`:''}">
    ${skyLayer(skyKey())}
    <div class="hero-top"><div>
      <span class="eyebrow">Halo, ${esc(S.me.nama.split(" ")[0])}</span>
      <div class="clock" id="clock">${now.slice(0,5)}<small>:${now.slice(6)}</small></div>
      <div class="date">${longDate()}</div>
    </div>${weatherInline()}</div>
    <div class="shift">${t?.jadwal ? `<span>${esc(jadwalText(t.jadwal))}${A.kemarin?' (mulai kemarin)':''}</span>`
      : sec ? [...SHIFT_IDS,"sikl"].map(id=>`<span>${esc(jadwalText(jadwalById(id)))}</span>`).join("")
      : `<span>${esc(jadwalText(jadwalById("umum")))}</span>`}<span>Toleransi ${esc(S.cfg.toleransi)} mnt</span></div>
  </section>
  <div class="tiles">
    <div class="tile"><span class="eyebrow">Masuk</span><span class="t ${t?.masuk?'':'empty'}">${t?.masuk? esc(t.masuk.jam.slice(0,5)) : '--:--'}</span>${t?.masuk? pillFor(t)+tilePremis(t.masuk) : '<span class="small muted">Belum tercatat</span>'}</div>
    <div class="tile"><span class="eyebrow">Pulang</span><span class="t ${t?.pulang?'':'empty'}">${t?.pulang? esc(t.pulang.jam.slice(0,5)) : '--:--'}</span>${t?.pulang? pillStatus(t.statusPulang||'Sesuai jadwal')+tilePremis(t.pulang) : '<span class="small muted">Belum tercatat</span>'}</div>
  </div>
  ${durBox}
  ${izinHariIni ? izinBanner(izinHariIni) : (hariLibur(S.dayKey) ? `<div class="card flat stack libur-info"><div class="row" style="gap:10px">${I.cal.replace('<svg ','<svg width="24" height="24" ')}<div><b>Hari libur: ${esc(namaLibur(S.dayKey))}</b><p class="small">${isSecurity(S.me.fungsi)?'Absen tetap berjalan sesuai jadwal jaga.':'Absen tetap bisa dipakai untuk lembur atau tugas mendadak, dan tercatat sebagai lembur hari libur.'}</p></div></div></div>` : '')}
  ${izinHariIni?.jenis==="cuti" ? '' : cta}
  <button class="btn ghost block" id="izinBtn">${I.cal.replace('<svg ','<svg width="18" height="18" ')} Ajukan cuti / izin sakit</button>
  <div class="card flat stack" style="gap:8px">
    <span class="eyebrow">Premis kerja terdaftar</span>
    <div class="row wrap" style="gap:6px">${premisList}</div>
    <p class="small muted">Lokasi GPS saat absen menentukan premis secara otomatis.</p>
  </div>
  <div class="card stack"><div class="row between"><h3 style="font-size:16px">Minggu ini</h3><button class="btn ghost small" data-go="riwayat">Lihat semua</button></div>${histList(S.history.slice(0,5))}</div>`;
}

function histList(arr){
  if (!arr.length) return `<div class="empty">${I.hist}<p>Riwayat kehadiranmu akan muncul di sini setelah absen pertama.</p></div>`;
  return `<div class="list">${arr.map(r=>`<div class="item">${markFor(r)}<div class="grow"><div class="name">${shortDate(r.tanggal)}${r.sesi>1?` · sesi ${r.sesi}`:''}</div><div class="sub">${esc(premisName(r.masuk||r.pulang))}${r.jadwal?` · ${esc(r.jadwal.nama)}`:''}</div></div>
    <div class="times">${esc(r.masuk?.jam?.slice(0,5)||'--:--')} <span class="muted">→</span> ${esc(r.pulang?.jam?.slice(0,5)||'--:--')}<span class="dur-s">${esc(durText(r))}</span></div></div>`).join("")}</div>`;
}

function viewRiwayat(){
  const h = S.history, late = h.filter(r=>r.status==="Terlambat").length, ok = h.filter(lengkap);
  const totalMin = ok.reduce((a,r)=>a+durMin(r.masuk.ts,r.pulang.ts),0);
  return `<h2 style="font-size:24px">Riwayat Kehadiran</h2>
  <div class="stats">
    <div class="stat" style="color:var(--ok)"><b>${ok.length}</b><span>Lengkap</span></div>
    <div class="stat" style="color:var(--bad)"><b>${h.length-ok.length}</b><span>Tidak lengkap</span></div>
    <div class="stat" style="color:var(--warn)"><b>${late}</b><span>Terlambat</span></div>
    <div class="stat" style="color:var(--primary)"><b>${ok.length?Math.round(totalMin/ok.length/6)/10:0}</b><span>Rata² jam</span></div>
  </div>
  ${calendarCard((S.allRecs||[]), (S.izin||[]), "Kalender kehadiran")}
  ${izinListCard(S.izin||[], false)}
  <div class="card">${histList(h)}</div>
  <p class="small muted"><span class="chk ok" style="width:18px;height:18px;vertical-align:-4px">${I.tick}</span> masuk & pulang lengkap &nbsp; <span class="chk no" style="width:18px;height:18px;vertical-align:-4px">${I.cross}</span> hanya masuk atau hanya pulang. Menampilkan 30 catatan terakhir.</p>`;
}

function viewProfil(){
  return `<h2 style="font-size:24px">Profil</h2>
  <div class="card row"><div class="ini" style="width:56px;height:56px;border-radius:18px;font-size:18px">${esc(initials(S.me.nama))}</div>
    <div style="min-width:0"><b style="font-size:17px">${esc(S.me.nama)}</b><p class="small muted">${esc(S.me.fungsi)}</p><p class="small muted mono">@${esc(S.me.username)}</p></div></div>
  ${faceCard()}
  ${installHint()}
  ${pwCard()}
  <button class="btn danger block" id="logout">Keluar</button>
  <p class="small muted" style="text-align:center;opacity:.7">${APP_VERSION}</p>`;
}
function faceCard(){
  const w=S.wajah, ok=w?.disetujui===true;
  const pill = !w ? '<span class="pill p-bad">Belum terdaftar</span>' : ok ? '<span class="pill p-ok">Disetujui</span>' : '<span class="pill p-warn">Menunggu admin</span>';
  const ket = !w ? 'Daftarkan wajahmu sekali. Setelah disetujui admin, wajah dicocokkan setiap kali absen.'
    : ok ? `Disetujui ${esc(new Date(w.disetujuiPada||w.dibuat).toLocaleDateString("id-ID",{timeZone:TZ,day:"numeric",month:"long",year:"numeric"}))}. Untuk mengulang pendaftaran, minta admin menghapus data wajahmu.`
    : 'Data wajahmu sudah terkirim dan sedang menunggu pemeriksaan admin. Absen bisa dilakukan setelah disetujui.';
  return `<div class="card stack"><div class="row between"><h3 style="font-size:16px">Data wajah</h3>${pill}</div>
    <p class="small muted">${ket}</p>${w?'':'<button class="btn primary" id="enrollBtn">Daftarkan wajah</button>'}</div>`;
}

function pwCard(){
  return `<form class="card stack" id="pwForm"><h3 style="font-size:16px">Ganti password</h3>
    <label class="f">Password lama<input class="input" id="pwOld" type="password" autocomplete="current-password"></label>
    <label class="f">Password baru (min. 6 karakter)<input class="input" id="pwNew" type="password" autocomplete="new-password"></label>
    <button class="btn primary" type="submit">Simpan password</button></form>`;
}

/* ---------- Admin ---------- */
function viewRekap(){
  const active = S.staff.filter(s=>s.role!=="admin" && s.aktif!==false);
  const byUser = Object.fromEntries(S.rekap.map(r=>[r.uid,r]));
  const hadir = new Set(S.rekap.filter(r=>r.masuk).map(r=>r.uid)).size, late = S.rekap.filter(r=>r.status==="Terlambat").length, tdk = S.rekap.filter(r=>!lengkap(r)).length;
  const izinHari = (S.izin||[]).filter(z=>z.mulai<=S.rekapDate && z.selesai>=S.rekapDate);
  const izinUid = new Set(izinHari.map(z=>z.uid));
  const libRekap = hariLibur(S.rekapDate);
  const belum = active.filter(s=>!byUser[s.uid] && !izinUid.has(s.uid) && (!libRekap || isSecurity(s.fungsi)));
  const rows = [...S.rekap].sort((a,b)=>((a.masuk||a.pulang)?.jam||"").localeCompare((b.masuk||b.pulang)?.jam||""));
  const perPremis = S.cfg.premis.map(p=>({p, n:S.rekap.filter(r=>(r.masuk||r.pulang)?.premisId===p.id || (!(r.masuk||r.pulang)?.premisId && p.id==="kbri" && (r.masuk||r.pulang)?.dalamRadius!==false)).length}));
  const luar = S.rekap.filter(r=>(r.masuk||r.pulang)?.dalamRadius===false).length;
  return `<div class="row between wrap"><div><span class="eyebrow">Rekap harian</span><h2 style="font-size:24px">${S.rekapDate===dateKey()?'Hari ini':shortDate(S.rekapDate)}</h2></div>
    <input type="date" class="input" id="rDate" value="${esc(S.rekapDate)}" style="width:auto"></div>
  <div class="stats">
    <div class="stat" style="color:var(--ok)"><b>${hadir}</b><span>Hadir</span></div>
    <div class="stat" style="color:var(--warn)"><b>${late}</b><span>Terlambat</span></div>
    <div class="stat" style="color:var(--bad)"><b>${tdk}</b><span>Tidak lengkap</span></div>
    <div class="stat" style="color:var(--muted)"><b>${belum.length}</b><span>Belum absen</span></div>
  </div>
  <div class="card stack" style="gap:8px"><span class="eyebrow">Kehadiran per premis</span>
    ${perPremis.map(({p,n})=>`<div class="row between"><span class="premis">${I.bldg}${esc(p.nama)}</span><b class="mono">${n}</b></div>`).join("")}
    ${luar?`<div class="row between"><span class="premis" style="background:var(--bad-soft);color:var(--bad)">${I.bldg}Di luar premis</span><b class="mono">${luar}</b></div>`:''}
  </div>
  <div class="card stack"><h3 style="font-size:16px">Sudah absen</h3>
    ${rows.length ? `<div class="list">${rows.map(r=>`<div class="item">${markFor(r)}<div class="grow"><div class="name">${esc(r.nama)}${r.sesi>1?` <span class="small muted">· sesi ${r.sesi}</span>`:''}</div><div class="sub">${esc(r.fungsi)}</div><div class="sub">${esc(premisName(r.masuk||r.pulang))} · ${esc(durText(r))}</div>${r.jadwal?`<div class="sub">${esc(jadwalText(r.jadwal))}</div>`:''}<div style="margin-top:4px">${pillFor(r)}${(r.masuk||r.pulang)?.keterangan?` <span class="small muted">· ${esc((r.masuk||r.pulang).keterangan)}</span>`:''}</div></div>
      <div class="times">${esc(r.masuk?.jam?.slice(0,5)||'--:--')}<br><span class="muted">${esc(r.pulang?.jam?.slice(0,5)||'--:--')}</span></div></div>`).join("")}</div>`
      : `<div class="empty">${I.chart}<p>Belum ada staf yang absen pada tanggal ini.</p></div>`}
  </div>
  ${libRekap?`<div class="card flat libur-info small"><b>Hari libur: ${esc(namaLibur(S.rekapDate))}.</b> Hanya Petugas Keamanan yang dihitung belum absen; staf lain yang hadir tercatat lembur.</div>`:''}
  ${izinHari.length?`<div class="card stack"><h3 style="font-size:16px">Cuti & izin</h3><div class="list">${izinHari.map(z=>izinRow(z,true)).join("")}</div></div>`:''}
  ${belum.length?`<div class="card stack"><h3 style="font-size:16px">Belum absen</h3><div class="list">${belum.map(s=>`<div class="item"><div class="ini" style="background:var(--surface-2);color:var(--muted)">${esc(initials(s.nama))}</div><div class="grow"><div class="name">${esc(s.nama)}</div><div class="sub">${esc(s.fungsi)}</div></div></div>`).join("")}</div></div>`:''}
  ${exportCard()}`;
}

function exportCard(){
  const d = S.rekapDate;
  const ef = S.exFrom||d, et = S.exTo||d;
  return `<div class="card stack"><div class="row" style="gap:10px"><span style="color:var(--ok)">${I.sheet}</span><h3 style="font-size:16px">Ekspor ke Google Sheets</h3></div>
    <div class="grid2"><label class="f">Dari<input type="date" class="input" id="exFrom" value="${esc(ef)}"></label><label class="f">Sampai<input type="date" class="input" id="exTo" value="${esc(et)}"></label></div>
    <button class="btn primary block" id="exCopy">${I.copy} Salin data untuk Google Sheets</button>
    <button class="btn ghost block" id="exCsv">${I.dl} Unduh file CSV</button>
    <p class="small muted">Cara cepat: tekan <b>Salin</b>, buka <a href="https://sheets.new" target="_blank" rel="noopener" style="color:var(--primary);font-weight:700">sheets.new</a>, klik sel A1, lalu tempel. File CSV juga bisa diimpor lewat File → Impor di Google Sheets.</p>
  </div>`;
}

function wajahPill(uid){ const w=(S.wajahAll||{})[uid]; return !w ? '<span class="pill p-mute">Wajah belum</span>' : w.disetujui===true ? '<span class="pill p-ok">Wajah OK</span>' : '<span class="pill p-warn">Wajah menunggu</span>'; }
function viewStaff(){
  const list = S.staff, tunggu = list.filter(s=>{ const w=(S.wajahAll||{})[s.uid]; return w && w.disetujui!==true; });
  return `<div class="row between"><div><span class="eyebrow">${list.filter(s=>s.role!=='admin').length} staf terdaftar</span><h2 style="font-size:24px">Data Staf</h2></div><button class="btn primary" id="addStaff">+ Tambah</button></div>
  ${tunggu.length?`<div class="card flat libur-info small"><b>${tunggu.length} data wajah menunggu persetujuan.</b> Buka "Ubah" pada staf bertanda kuning untuk memeriksa fotonya.</div>`:''}
  <div class="card">${list.length?`<div class="list">${list.map(s=>`<div class="item"><div class="ini" ${s.aktif===false?'style="background:var(--surface-2);color:var(--muted)"':''}>${esc(initials(s.nama))}</div>
    <div class="grow"><div class="name">${esc(s.nama)}</div><div class="sub">${esc(s.fungsi)} · @${esc(s.username)}</div>
    <div style="margin-top:4px">${s.role==='admin'?'<span class="pill p-info">Admin</span>':''} ${s.aktif===false?'<span class="pill p-mute">Nonaktif</span>':''} ${s.role!=='admin'?wajahPill(s.uid):''}</div></div>
    <button class="btn ghost" data-edit="${esc(s.uid)}">Ubah</button></div>`).join("")}</div>`
    : `<div class="empty">${I.team}<p>Belum ada staf. Tekan <b>Tambah</b> untuk mendaftarkan staf pertama.</p></div>`}</div>`;
}

function viewAtur(){
  const c = S.cfg;
  return `<h2 style="font-size:24px">Pengaturan</h2>
  <form class="card stack" id="cfgForm"><h3 style="font-size:16px">Jadwal kerja</h3>
    ${Object.keys(JADWAL_INFO).map(id=>`<div class="card flat stack" style="padding:14px;gap:8px">
      <div><b>${esc(JADWAL_INFO[id].nama)}</b><p class="small muted">${esc(JADWAL_INFO[id].ket)}</p></div>
      <div class="grid2"><label class="f">Mulai (24 jam)<input class="input mono" id="j_${id}_m" inputmode="numeric" maxlength="5" placeholder="08:00" value="${esc(c.jadwal[id].mulai)}"></label><label class="f">Selesai (24 jam)<input class="input mono" id="j_${id}_s" inputmode="numeric" maxlength="5" placeholder="17:00" value="${esc(c.jadwal[id].selesai)}"></label></div>
    </div>`).join("")}
    <label class="f">Toleransi terlambat (menit)<input class="input mono" id="cTol" type="number" min="0" value="${esc(c.toleransi)}"></label>
    <h3 style="font-size:16px;margin-top:8px">Premis kerja</h3>
    <p class="small muted">Saat absen, aplikasi memilih premis terdekat yang radiusnya mencakup posisi GPS staf. Berdirilah di premis, lalu tekan "Pakai lokasi saya" untuk titik yang paling akurat.</p>
    ${c.premis.map((p,i)=>`<div class="card flat stack" style="padding:14px;gap:10px">
      <label class="f">Nama premis<input class="input" id="pN${i}" value="${esc(p.nama)}"></label>
      <div class="grid2"><label class="f">Latitude<input class="input mono" id="pLa${i}" inputmode="decimal" value="${esc(p.lat)}"></label><label class="f">Longitude<input class="input mono" id="pLo${i}" inputmode="decimal" value="${esc(p.lng)}"></label></div>
      <div class="grid2" style="align-items:end"><label class="f">Radius (meter)<input class="input mono" id="pR${i}" type="number" min="20" value="${esc(p.radius)}"></label><button type="button" class="btn ghost" data-here="${i}">${I.pin.replace('width="28" height="28"','width="18" height="18"')} Pakai lokasi saya</button></div>
    </div>`).join("")}
    <button class="btn primary" type="submit">Simpan pengaturan</button>
  </form>
  ${liburCard()}
  ${pwCard()}
  <button class="btn danger block" id="logout">Keluar</button>`;
}
function liburCard(){
  const lib=S.cfg.libur||{}, today=dateKey(), next=Object.keys(lib).filter(k=>k>=today).sort().slice(0,S.liburAll?400:8);
  const sisa=Object.keys(lib).filter(k=>k>=today).length;
  return `<div class="card stack"><h3 style="font-size:16px">Tanggal merah</h3>
    <p class="small muted">Dipakai untuk ucapan "jangan lupa liburan" saat absen pulang sehari sebelumnya, dan ditandai di kalender. Sudah terisi libur Indonesia & Malaysia 2026–2027 sesuai edaran KBRI KL.</p>
    <div class="list">${next.map(k=>`<div class="item"><div class="grow"><div class="name">${esc(lib[k])}</div><div class="sub">${esc(fmtTgl(k))}</div></div><button class="btn danger" style="padding:6px 12px;font-size:12.5px" data-delLibur="${k}">Hapus</button></div>`).join("") || '<p class="small muted">Belum ada tanggal merah mendatang.</p>'}</div>
    ${sisa>next.length?`<button class="btn ghost" id="liburAll">Tampilkan semua (${sisa})</button>`:''}
    <form class="stack" id="liburForm" style="gap:8px"><div class="grid2"><label class="f">Tanggal<input type="date" class="input" id="lbTgl"></label><label class="f">Nama libur<input class="input" id="lbNama" placeholder="contoh: Hari Raya"></label></div>
      <button class="btn primary" type="submit">Tambah tanggal merah</button></form></div>`;
}
async function simpanLibur(map){ try{ await S.db.doc("config/kantor").update({ libur:map }); S.cfg.libur=map; render(); toast("Tanggal merah diperbarui."); }catch(e){ toast("Gagal menyimpan tanggal merah."); } }

/* ---------- Nav ---------- */
function removeNav(){ $("#nav")?.remove(); }
function renderNav(){
  removeNav();
  const items = S.me.role==="admin" ? [["rekap","Rekap",I.chart],["kalender","Kalender",I.cal],["staff","Staf",I.team],["atur","Atur",I.gear]] : [["home","Beranda",I.home],["riwayat","Riwayat",I.hist],["profil","Profil",I.user]];
  const n = document.createElement("nav"); n.className="nav"; n.id="nav";
  n.innerHTML = items.map(([k,l,ic])=>`<button data-go="${k}" class="${S.tab===k?'on':''}" aria-label="${l}">${ic}<span>${l}</span></button>`).join("");
  document.body.appendChild(n);
  n.querySelectorAll("[data-go]").forEach(b=>b.onclick=()=>{S.tab=b.dataset.go; if(S.tab==="kalender") loadKalAdmin(); render();window.scrollTo(0,0);});
}

function bindView(){
  document.querySelectorAll("#root [data-go]").forEach(b=>b.onclick=()=>{S.tab=b.dataset.go;render();window.scrollTo(0,0);});
  $("#logout") && ($("#logout").onclick = logout);
  $("#doIn") && ($("#doIn").onclick = ()=>openFlow("masuk"));
  $("#doOut") && ($("#doOut").onclick = ()=>openFlow("pulang"));
  $("#pwForm") && ($("#pwForm").onsubmit = changePw);
  $("#enrollBtn") && ($("#enrollBtn").onclick = ()=>openEnroll());
  $("#izinBtn") && ($("#izinBtn").onclick = ()=>openIzinForm());
  $("#wxRefresh") && ($("#wxRefresh").onclick = ()=>loadWeather(true));
  document.querySelectorAll("[data-cal]").forEach(b=>b.onclick=()=>{ S.calMonth=shiftMonth(S.calMonth,+b.dataset.cal); if(S.tab==="kalender") loadKalAdmin(); render(); });
  document.querySelectorAll("[data-berkas]").forEach(b=>b.onclick=()=>openBerkas(b.dataset.berkas, b.dataset.nama));
  document.querySelectorAll("[data-hapusizin]").forEach(b=>b.onclick=()=>hapusIzin(b.dataset.hapusizin));
  $("#calStaff") && ($("#calStaff").onchange = e=>{ S.calStaff=e.target.value; render(); });
  $("#rDate") && ($("#rDate").onchange = e=>{ if(e.target.value){S.rekapDate=e.target.value; S.exFrom=S.exTo=null; subRekap(); render();} });
  $("#exFrom") && ($("#exFrom").onchange = e=>{ S.exFrom=e.target.value; });
  $("#exTo") && ($("#exTo").onchange = e=>{ S.exTo=e.target.value; });
  $("#exCopy") && ($("#exCopy").onclick = ()=>doExport("copy"));
  $("#exCsv") && ($("#exCsv").onclick = ()=>doExport("csv"));
  $("#addStaff") && ($("#addStaff").onclick = ()=>openStaffForm(null));
  document.querySelectorAll("[data-edit]").forEach(b=>b.onclick=()=>openStaffForm(S.staff.find(s=>s.uid===b.dataset.edit)));
  $("#cfgForm") && ($("#cfgForm").onsubmit = saveCfg);
  $("#liburAll") && ($("#liburAll").onclick = ()=>{ S.liburAll=true; render(); });
  document.querySelectorAll("[data-dellibur]").forEach(b=>b.onclick=()=>{ const m={...(S.cfg.libur||{})}; delete m[b.dataset.dellibur]; simpanLibur(m); });
  $("#liburForm") && ($("#liburForm").onsubmit = e=>{ e.preventDefault(); const t=$("#lbTgl").value, n=$("#lbNama").value.trim(); if(!t||!n) return toast("Isi tanggal dan nama libur."); simpanLibur({...(S.cfg.libur||{}), [t]:n}); });
  document.querySelectorAll("[data-here]").forEach(b=>b.onclick=()=>{ const i=b.dataset.here; getPos().then(p=>{ $("#pLa"+i).value=p.coords.latitude.toFixed(6); $("#pLo"+i).value=p.coords.longitude.toFixed(6); toast("Lokasi diisi. Tekan Simpan."); }).catch(()=>toast("Lokasi tidak bisa dibaca di tampilan ini.")); });
}

/* ===================== Actions ===================== */
async function changePw(e){
  e.preventDefault();
  const o=$("#pwOld").value, n=$("#pwNew").value;
  if (n.length<6) return toast("Password baru minimal 6 karakter.");
  try {
    const u=S.auth.currentUser; const cred=firebase.auth.EmailAuthProvider.credential(u.email, o);
    await u.reauthenticateWithCredential(cred); await u.updatePassword(n);
    $("#pwOld").value=""; $("#pwNew").value=""; toast("Password diperbarui.");
  } catch(ex){ toast(/wrong-password|invalid-credential/.test(ex?.code||"") ? "Password lama salah." : "Gagal menyimpan. Coba lagi."); }
}

async function saveCfg(e){
  e.preventDefault();
  const tol=parseInt($("#cTol").value,10), premis=[];
  for (let i=0;i<S.cfg.premis.length;i++){
    const lat=parseFloat($("#pLa"+i).value), lng=parseFloat($("#pLo"+i).value), rad=parseInt($("#pR"+i).value,10), nama=$("#pN"+i).value.trim();
    if(!nama) return toast("Nama premis wajib diisi.");
    if(!isFinite(lat)||!isFinite(lng)||Math.abs(lat)>90||Math.abs(lng)>180) return toast(`Koordinat ${nama} tidak valid.`);
    if(!(rad>=20)) return toast("Radius minimal 20 meter.");
    premis.push({...S.cfg.premis[i], nama, lat, lng, radius:rad});
  }
  const jadwal={};
  for (const id of Object.keys(JADWAL_INFO)){ const fix=v=>{ const t=v.trim().replace(".",":"); const m=t.match(/^(\d{1,2}):?(\d{2})$/); if(!m) return ""; const h=+m[1], mi=+m[2]; return h<24&&mi<60 ? String(h).padStart(2,"0")+":"+m[2] : ""; };
    const m=fix($(`#j_${id}_m`).value), x=fix($(`#j_${id}_s`).value); if(!m||!x) return toast(`Jam ${JADWAL_INFO[id].nama} harus format 24 jam, contoh 08:00.`); if(m===x) return toast(`Jam mulai dan selesai ${JADWAL_INFO[id].nama} tidak boleh sama.`); jadwal[id]={mulai:m,selesai:x}; }
  const cfg={nama:"KBRI Kuala Lumpur", premis, jadwal, toleransi:isFinite(tol)?tol:0, libur:S.cfg.libur||DEFAULT_LIBUR};
  try { await S.db.doc("config/kantor").set(cfg); S.cfg=cfg; toast("Pengaturan disimpan."); render(); } catch(ex){ toast("Gagal menyimpan pengaturan."); }
}

/* ---------- Staff form sheet ---------- */
function openStaffForm(s){
  const isNew=!s;
  openSheet(`<h2 style="font-size:22px">${isNew?'Tambah staf':'Ubah data staf'}</h2>
    <form class="stack" id="sf" style="margin-top:14px">
      <label class="f">Nama lengkap<input class="input" id="sNama" value="${esc(s?.nama||'')}" required></label>
      <label class="f">Fungsi / bagian<select class="input" id="sFungsi" required><option value="">Pilih fungsi…</option>${[...FUNGSI, ...(s?.fungsi && !FUNGSI.includes(s.fungsi) ? [s.fungsi] : [])].map(f=>`<option ${s?.fungsi===f?'selected':''}>${esc(f)}</option>`).join("")}</select></label>
      <p class="small muted" id="sJadwal"></p>
      <label class="f">Username<input class="input mono" id="sUser" autocapitalize="none" value="${esc(s?.username||'')}" ${isNew?'':'disabled'} placeholder="nama.belakang"></label>
      ${isNew?`<label class="f">Password awal (min. 6 karakter)<input class="input" id="sPass" type="text" autocomplete="off"></label>`:''}
      <div class="grid2">
        <label class="f">Peran<select class="input" id="sRole"><option value="staff" ${s?.role!=='admin'?'selected':''}>Staf</option><option value="admin" ${s?.role==='admin'?'selected':''}>Admin</option></select></label>
        <label class="f">Status<select class="input" id="sAktif"><option value="1" ${s?.aktif!==false?'selected':''}>Aktif</option><option value="0" ${s?.aktif===false?'selected':''}>Nonaktif</option></select></label>
      </div>
      <p id="sErr" class="small" style="color:var(--bad);font-weight:600" hidden></p>
      <button class="cta" type="submit">${isNew?'Simpan staf':'Simpan perubahan'}</button>
      ${isNew?'':faceAdminBox(s)}
      ${isNew?'':`<button type="button" class="btn ghost block" id="sFace">Hapus data wajah (daftar ulang)</button><div id="delZone"><button type="button" class="btn danger block" id="sDel">Hapus staf</button></div>
      <p class="small muted">Lupa password: hapus akun ini di Firebase Console → Authentication, lalu tambahkan lagi dengan username yang sama.</p>`}
    </form>`);
  const showJ=()=>{ const f=$("#sFungsi").value; $("#sJadwal").textContent = !f ? "" : isSecurity(f) ? `Jadwal: shift dipilih saat absen (Pagi / Pagi + Lembur / Malam). Saat jaga di SIKL otomatis ${jadwalById("sikl").mulai}–${jadwalById("sikl").selesai}.` : `Jadwal: ${jadwalText(jadwalById("umum"))}.`; };
  $("#sFungsi").onchange=showJ; showJ();
  $("#sf").onsubmit = async e => {
    e.preventDefault();
    const err=$("#sErr"); err.hidden=true;
    const nama=$("#sNama").value.trim(), fungsi=$("#sFungsi").value.trim(), user=(isNew?$("#sUser").value:s.username).trim().toLowerCase(), pass=isNew?$("#sPass").value:"";
    const fail=m=>{err.textContent=m;err.hidden=false;};
    if(!nama||!fungsi) return fail("Nama dan fungsi wajib diisi.");
    if(!/^[a-z0-9._-]{3,40}$/.test(user)) return fail("Username 3–40 karakter: huruf kecil, angka, titik, strip.");
    if(isNew && pass.length<6) return fail("Password awal minimal 6 karakter.");
    if(!isNew && s.uid===S.me.uid && ($("#sRole").value!=="admin"||$("#sAktif").value==="0")) return fail("Kamu tidak bisa menurunkan atau menonaktifkan akunmu sendiri.");
    try {
      const body={nama,fungsi,username:user,role:$("#sRole").value,aktif:$("#sAktif").value==="1"};
      if(isNew){
        const sec = firebase.apps.find(a=>a.name==="pendaftar") || firebase.initializeApp(FIREBASE_CONFIG,"pendaftar");
        const cred = await sec.auth().createUserWithEmailAndPassword(emailOf(user), pass);
        const uid = cred.user.uid; await sec.auth().signOut();
        await S.db.doc("staff/"+uid).set({ ...body, uid, dibuat:new Date().toISOString() });
      } else await S.db.doc("staff/"+s.uid).update(body);
      closeSheet(); toast(isNew?"Staf ditambahkan.":"Data staf diperbarui.");
    } catch(ex){ const c=ex?.code||""; fail(/email-already-in-use/.test(c) ? "Username sudah dipakai." : /weak-password/.test(c) ? "Password terlalu lemah." : "Gagal menyimpan. Periksa koneksi lalu coba lagi."); }
  };
  $("#sApprove") && ($("#sApprove").onclick = async ()=>{
    try{ await S.db.doc("wajah/"+s.uid).update({ disetujui:true, disetujuiPada:new Date().toISOString(), disetujuiOleh:S.me.uid }); toast("Data wajah disetujui."); closeSheet(); }catch(e){ toast("Gagal menyetujui."); }
  });
  $("#sFace") && ($("#sFace").onclick = async ()=>{
    try{ await S.db.doc("wajah/"+s.uid).delete(); toast("Data wajah dihapus. Staf bisa mendaftar ulang dari Profil."); }catch(e){ toast("Gagal menghapus data wajah."); }
  });
  $("#sDel") && ($("#sDel").onclick = ()=>{
    if(s.uid===S.me.uid) return toast("Akun yang sedang dipakai tidak bisa dihapus.");
    $("#delZone").innerHTML=`<div class="card flat stack"><p class="small"><b>Hapus ${esc(s.nama)}?</b> Riwayat absensinya tetap tersimpan.</p><div class="grid2"><button type="button" class="btn ghost" id="dNo">Batal</button><button type="button" class="btn danger" id="dYes">Ya, hapus</button></div></div>`;
    $("#dNo").onclick=()=>{ closeSheet(); openStaffForm(s); };
    $("#dYes").onclick=async()=>{ try{ await S.db.doc("staff/"+s.uid).delete(); closeSheet(); toast("Staf dihapus. Akun loginnya bisa dihapus juga di Firebase Console."); }catch(e){ toast("Gagal menghapus."); } };
  });
}

/* ---------- Sheet ---------- */
function openSheet(html){
  const host=$("#sheetHost");
  host.innerHTML=`<div class="scrim" id="scrim"><div class="sheet" role="dialog" aria-modal="true"><div class="grab"></div><div id="sheetBody">${html}</div></div></div>`;
  $("#scrim").addEventListener("click",e=>{ if(e.target.id==="scrim") closeSheet(); });
}
function closeSheet(){ stopCam(); $("#sheetHost").innerHTML=""; }
function stopCam(){ if(S.stream){ S.stream.getTracks().forEach(t=>t.stop()); S.stream=null; } }

/* ===================== Alur absen: Lokasi → Wajah → Konfirmasi ===================== */
const F = {};
function getPos(){ return new Promise((res,rej)=>{ if(!navigator.geolocation) return rej(new Error("no-geo")); navigator.geolocation.getCurrentPosition(res,rej,{enableHighAccuracy:true,timeout:12000,maximumAge:0}); }); }

function openFlow(jenis){
  const cutiNow = izinOn(dateKey(), S.me.uid);
  if (cutiNow?.jenis==="cuti") return toast("Kamu sedang cuti. Absen dinonaktifkan.");
  const A = activeRec();
  // Absen pulang menutup catatan aktif (termasuk shift malam kemarin); absen masuk selalu untuk hari ini
  const target = jenis==="pulang" && A.rec?.masuk && !A.rec.pulang ? { key:A.rec.tanggal, rec:A.rec, id:A.rec._id } : { key:dateKey(), rec:null, id:null };
  Object.assign(F,{jenis,pos:null,face:null,ket:"",target,shift:null});
  openSheet(""); stepLokasi();
}
function stepsBar(n){ return `<div class="steps">${[1,2,3].map(i=>`<i class="${i<=n?'on':''}"></i>`).join("")}</div>`; }
function flowHead(n,title,sub){ return `${stepsBar(n)}<span class="eyebrow">Absen ${F.jenis} · langkah ${n} dari 3</span><h2 style="font-size:22px;margin-top:4px">${title}</h2><p class="muted small" style="margin-top:4px">${sub}</p>`; }

function stepLokasi(){
  $("#sheetBody").innerHTML = flowHead(1,"Memeriksa lokasi","Pastikan GPS ponsel aktif dan kamu berada di area kantor.") +
   `<div class="mapbox" style="margin-top:16px"><div class="radar pulse">${I.pin}</div><div><b>Mencari posisi…</b><p class="small muted">Biasanya selesai dalam beberapa detik.</p></div></div>`;
  getPos().then(p=>setPos(p.coords.latitude,p.coords.longitude,p.coords.accuracy,"gps")).catch(()=>{
    $("#sheetBody").innerHTML = flowHead(1,"Lokasi tidak terbaca","Izin lokasi ditolak atau GPS tidak tersedia di tampilan ini.") +
     `<div class="banner" style="margin-top:14px">Aktifkan izin lokasi lalu coba lagi. Untuk uji coba prototipe, kamu bisa memakai lokasi demo (tercatat sebagai demo).</div>
      <div class="stack" style="margin-top:14px"><button class="btn primary block" id="gRetry">Coba lagi</button><button class="btn ghost block" id="gDemo">Pakai lokasi demo</button><button class="btn block" id="gCancel">Batal</button></div>`;
    $("#gRetry").onclick=stepLokasi; $("#gCancel").onclick=closeSheet;
    $("#gDemo").onclick=()=>{
      $("#sheetBody").innerHTML = flowHead(1,"Pilih lokasi demo","Hanya untuk uji coba prototipe. Catatan absen akan ditandai sebagai demo.") +
        `<div class="pchoice" style="margin-top:14px">${S.cfg.premis.map((p,i)=>`<button class="btn ghost block" data-demo="${i}">${I.bldg.replace('<svg ','<svg width="18" height="18" ')}${esc(p.nama)}</button>`).join("")}<button class="btn ghost block" data-demo="out">Di luar semua premis</button></div>`;
      document.querySelectorAll("[data-demo]").forEach(b=>b.onclick=()=>{ const v=b.dataset.demo; if(v==="out") setPos(3.1390,101.6869,20,"demo"); else { const p=S.cfg.premis[+v]; setPos(p.lat+0.0002,p.lng-0.0002,15,"demo"); } });
    };
  });
}
function setPos(lat,lng,acc,mode){
  if(mode==="gps") store.set("wxloc", JSON.stringify({lat,lng,t:Date.now()}));
  const {premis, terdekat} = detectPremis(lat,lng), dalam = !!premis, ref = premis||terdekat;
  F.pos={lat:+lat.toFixed(6),lng:+lng.toFixed(6),akurasi:Math.round(acc||0),jarak:Math.round(ref.jarak),dalamRadius:dalam,
         premisId:dalam?premis.id:"", premisNama:dalam?premis.nama:"Di luar premis", terdekat:terdekat.nama, mode};
  $("#sheetBody").innerHTML = flowHead(1, dalam?`Kamu di ${esc(premis.nama)}`:"Di luar premis kerja", dalam?"Premis terdeteksi otomatis dari GPS. Lanjutkan ke verifikasi wajah.":"Posisimu tidak berada di premis mana pun. Tulis keterangan, misalnya dinas luar.") +
   `<div class="mapbox" style="margin-top:16px"><div class="radar" style="${dalam?'':'background:var(--bad-soft);color:var(--bad)'}">${I.pin}</div>
    <div style="min-width:0"><span class="premis" style="${dalam?'':'background:var(--bad-soft);color:var(--bad)'}">${I.bldg}${esc(F.pos.premisNama)}</span>
    <p class="small muted" style="margin-top:6px"><b class="mono" style="color:var(--fg)">${fmtDist(ref.jarak)}</b> dari ${esc(ref.nama)} · radius ${ref.radius} m</p>
    <p class="small muted mono">${F.pos.lat}, ${F.pos.lng} · ±${F.pos.akurasi} m</p>${mode==='demo'?'<span class="pill p-info">Lokasi demo</span>':''}</div></div>
    ${dalam?'':`<label class="f" style="margin-top:14px">Keterangan<input class="input" id="gKet" placeholder="contoh: Dinas luar ke Wisma Putra"></label>`}
    <div class="stack" style="margin-top:16px"><button class="cta" id="gNext">Lanjut ke scan wajah</button><button class="btn block" id="gCancel">Batal</button></div>`;
  $("#gCancel").onclick=closeSheet;
  $("#gNext").onclick=()=>{ if(!dalam){ const k=$("#gKet").value.trim(); if(k.length<4) return toast("Tulis keterangan dulu."); F.ket=k; } else F.ket=""; stepWajah(); };
}

async function stepWajah(){
  if (S.wajah === null) {
    $("#sheetBody").innerHTML = flowHead(2,"Wajah belum terdaftar","Daftarkan wajahmu sekali. Setelah disetujui admin, kamu bisa absen.") +
      `<div class="stack" style="margin-top:16px"><button class="cta" id="goEnroll">${I.face} Daftarkan wajah sekarang</button><button class="btn block" id="fCancel">Batal</button></div>`;
    $("#goEnroll").onclick=()=>openEnroll(); $("#fCancel").onclick=closeSheet; return;
  }
  if (S.wajah && S.wajah.disetujui !== true) {
    $("#sheetBody").innerHTML = flowHead(2,"Menunggu persetujuan admin","Data wajahmu sudah terkirim. Absen bisa dilakukan setelah admin memeriksa dan menyetujuinya.") +
      `<div class="stack" style="margin-top:16px"><button class="btn block" id="fCancel">Tutup</button></div>`;
    $("#fCancel").onclick=closeSheet; return;
  }
  solidSheet();
  $("#sheetBody").innerHTML = flowHead(2,"Scan wajah","Lihat lurus ke kamera dan tahan sebentar.") +
   `<div class="scanner" id="scan" style="margin-top:18px"><div class="ring spin"></div><span class="muted small">Membuka kamera…</span></div>
    <div class="steps" id="vSteps" style="margin-top:12px"><i></i><i></i><i></i></div>
    <p class="small muted" id="scanMsg" style="text-align:center;min-height:2.6em"></p>
    <div class="stack" id="faceAct" style="margin-top:6px"><button class="btn block" id="fBack">Kembali</button></div>`;
  const back=()=>{ S.scanToken=(S.scanToken||0)+1; stopCam(); setPos(F.pos.lat,F.pos.lng,F.pos.akurasi,F.pos.mode); if(F.ket&&$("#gKet")) $("#gKet").value=F.ket; };
  $("#fBack").onclick=back;
  const box=$("#scan"), msg=t=>{ const m=$("#scanMsg"); if(m) m.textContent=t; };
  const mark=n=>document.querySelectorAll("#vSteps i").forEach((el,i)=>el.classList.toggle("on", i<n));
  let v=null;
  try { v = await openCamera(box); } catch(e){ v=null; }
  if(!$("#scan")) return;
  if(!v){
    box.innerHTML=`<div class="ring" style="border-color:var(--bad)"></div><span style="color:var(--bad)">${I.face.replace('width="22" height="22"','width="64" height="64"')}</span>`;
    msg("Kamera langsung dibutuhkan untuk cek wajah hidup. Izinkan akses kamera untuk situs ini di pengaturan browser (Safari: aA → Pengaturan Situs Web → Kamera → Izinkan), lalu coba lagi.");
    $("#faceAct").innerHTML=`<button class="cta" id="fRetake">Coba lagi</button><button class="btn block" id="fBack">Kembali</button>`;
    $("#fRetake").onclick=stepWajah; $("#fBack").onclick=back; return;
  }
  msg("Menyiapkan pengenal wajah… (pertama kali butuh beberapa detik)");
  try { await loadFace(); } catch(e){ msg(e.message); return; }
  const token = (S.scanToken = (S.scanToken||0)+1);
  let cocok=[], percobaan=0, terakhir=null;
  const MAKS = 14;
  while ($("#vid") && S.scanToken===token && percobaan < MAKS) {
    const frame = grabFrame(v, 480);
    if (ketajaman(frame) < TAJAM_MIN) { msg("Gambar buram. Tahan HP agar tidak goyang."); await sleep(250); continue; }
    let r; try { r = await faceDescriptor(frame, true); } catch(e){ r={err:e.message}; }
    if (!$("#vid") || S.scanToken!==token) return;
    if (r.err) { msg(r.err); await sleep(300); continue; }
    percobaan++;
    const jarak = jarakKe(r.d, S.wajah);
    if (jarak <= FACE_THRESHOLD) { cocok.push(jarak); terakhir=frame; mark(cocok.length); msg(`Memverifikasi… ${cocok.length} dari 3`); }
    else { cocok=[]; mark(0); msg("Wajah belum cocok. Hadap lurus ke kamera."); }
    if (cocok.length >= 3) {
      const rata = cocok.reduce((a,b)=>a+b,0)/cocok.length;
      // Liveness: 2 tantangan acak, lalu cek ulang identitas agar wajah tidak ditukar di tengah jalan
      const live = await cekHidup(v, msg, token, 2);
      if (!$("#vid") || S.scanToken!==token) return;
      if (!live.ok) { stopCam(); return gagalHidup(box, live.alasan); }
      const akhir = grabFrame(v, 480); let r2; try{ r2=await faceDescriptor(akhir, true); }catch(e){ r2={err:e.message}; }
      if (r2.err || jarakKe(r2.d, S.wajah) > FACE_THRESHOLD) { stopCam(); return gagalHidup(box, "Wajah berganti saat verifikasi. Ulangi dengan wajah pemilik akun."); }
      stopCam(); F.face={ cocok:true, jarak:+rata.toFixed(3), frame:3, liveness:live.tantangan };
      return sukses(box, akhir, rata);
    }
    await sleep(200);
  }
  if (!$("#vid") || S.scanToken!==token) return;
  stopCam();
  box.innerHTML=`<div class="ring" style="border-color:var(--bad)"></div><span style="color:var(--bad)">${I.face.replace('width="22" height="22"','width="64" height="64"')}</span>`;
  msg("");
  $("#faceAct").innerHTML=`<div class="card flat" style="text-align:center;color:var(--bad)"><b>Wajah tidak cocok dengan akun ini.</b><p class="small">Absen hanya bisa dilakukan oleh pemilik akun.</p></div>
    <button class="cta" id="fRetake">Coba lagi</button><button class="btn block" id="fBack2">Batal</button>`;
  $("#fRetake").onclick=stepWajah; $("#fBack2").onclick=closeSheet;
}
/* Hasil cocok: foto beku yang tajam + tanda centang, lalu otomatis lanjut */
function sukses(box, frame, rata){
  box.innerHTML=`<img src="${frame.toDataURL("image/jpeg",.92)}" class="noflip" alt="Wajah terverifikasi"><div class="ok-badge">${I.tick}</div>`;
  box.classList.add("verified");
  const m=$("#scanMsg"); if(m) m.textContent="";
  $("#faceAct").innerHTML=`<div style="text-align:center"><span class="pill p-ok">Wajah cocok · skor ${rata.toFixed(2)}</span></div>`;
  setTimeout(()=>{ if($("#scan")?.classList.contains("verified")) stepKonfirmasi(); }, 900);
}
/* Selama alur kamera, sheet dibuat padat (tanpa efek buram) agar tampilan fokus */
function solidSheet(){ document.querySelector(".sheet")?.classList.add("cam"); document.querySelector(".scrim")?.classList.add("cam"); }
const sleep = ms => new Promise(r=>setTimeout(r,ms));
/* Kamera depan langsung di halaman. iPhone butuh play() eksplisit dan tidak menggambar video di bawah lapisan blur, jadi blur sheet dimatikan selama kamera aktif. */
async function openCamera(box){
  if(!navigator.mediaDevices?.getUserMedia) return null;
  const st = await navigator.mediaDevices.getUserMedia({ video:{ facingMode:"user", width:{ideal:640}, height:{ideal:480} }, audio:false });
  if(!document.body.contains(box)){ st.getTracks().forEach(t=>t.stop()); return null; }
  stopCam(); S.stream=st;
  document.querySelector(".sheet")?.classList.add("cam"); document.querySelector(".scrim")?.classList.add("cam");
  const v=document.createElement("video");
  v.id="vid"; v.muted=true; v.autoplay=true; v.playsInline=true;
  v.setAttribute("playsinline",""); v.setAttribute("webkit-playsinline",""); v.setAttribute("muted","");
  box.innerHTML=""; box.appendChild(v); box.insertAdjacentHTML("beforeend",'<div class="ring"></div>');
  v.srcObject=st;
  try { await v.play(); } catch(e){}
  if(!v.videoWidth) await new Promise(res=>{ v.addEventListener("loadeddata",res,{once:true}); v.addEventListener("playing",res,{once:true}); setTimeout(res,3500); });
  if(!v.videoWidth){ try{ await v.play(); }catch(e){} await sleep(600); }
  if(!v.videoWidth){ stopCam(); return null; }
  return v;
}
/* Ambil satu bingkai persegi dari video, dicerminkan seperti selfie */
function grabFrame(v, size=400){
  const c=document.createElement("canvas"), sz=Math.min(v.videoWidth,v.videoHeight); c.width=c.height=size;
  const x=c.getContext("2d"); x.translate(size,0); x.scale(-1,1);
  x.drawImage(v,(v.videoWidth-sz)/2,(v.videoHeight-sz)/2,sz,sz,0,0,size,size); return c;
}
/* Cadangan bila kamera langsung tidak bisa dibuka: ambil foto lewat aplikasi kamera */
function photoFallback(onBack, onPhoto){
  $("#scan").innerHTML=`<div class="ring"></div><span style="color:var(--primary)">${I.face.replace('width="22" height="22"','width="64" height="64"')}</span>`;
  const m=$("#scanMsg"); if(m) m.textContent="Kamera langsung tidak bisa dibuka. Izinkan akses kamera di pengaturan, atau ambil foto lewat aplikasi kamera.";
  $("#faceAct").innerHTML=`<label class="cta" for="fFile" style="cursor:pointer">${I.face} Ambil foto selfie</label><input type="file" id="fFile" accept="image/*" capture="user" hidden><button class="btn block" id="fBack">Kembali</button>`;
  $("#fFile").onchange=e=>{ const f=e.target.files?.[0]; if(!f) return; const r=new FileReader(); r.onload=()=>onPhoto(r.result); r.readAsDataURL(f); e.target.value=""; };
  $("#fBack").onclick=onBack;
}
/* Pencocokan wajah: deteksi + sidik wajah 128 angka (face-api), dibandingkan dengan data terdaftar */
async function faceCaptured(src,flipped){
  solidSheet();
  $("#scan").innerHTML=`<img id="faceImg" src="${src}" class="${flipped?'noflip':''}" alt="Foto wajah"><div class="ring spin"></div>`;
  $("#faceAct").innerHTML=`<p class="muted" style="text-align:center;font-weight:600">Mencocokkan wajah…</p>`;
  let res;
  try { res = await faceDescriptor(src); } catch(e){ res = { err: e.message||String(e) }; }
  if(!$("#scan")) return;
  $("#scan").querySelector(".ring")?.classList.remove("spin");
  const retry = msg => { $("#faceAct").innerHTML=`<div style="text-align:center"><span class="pill p-bad">${esc(msg)}</span></div><button class="cta" id="fRetake">Ulangi foto</button><button class="btn block" id="fBack2">Batal</button>`; $("#fRetake").onclick=stepWajah; $("#fBack2").onclick=closeSheet; };
  if(res.err) return retry(res.err);
  if(!S.wajah?.descriptor || S.wajah.disetujui!==true) return retry("Data wajah belum disetujui admin.");
  const jarak = jarakKe(res.d, S.wajah);
  if(jarak > FACE_THRESHOLD - 0.04) return retry("Wajah tidak cocok dengan akun ini.");
  F.face={ cocok:true, jarak:+jarak.toFixed(3), frame:1 };
  const img=await loadImg(src), c=document.createElement("canvas"); c.width=img.width; c.height=img.height; c.getContext("2d").drawImage(img,0,0);
  sukses($("#scan"), c, jarak);
}

function stepKonfirmasi(){
  const now=new Date(), jam=timeStr(now), isIn=F.jenis==="masuk", sec=isSecurity(S.me.fungsi);
  const tr=F.target.rec;
  // Jadwal: pulang memakai jadwal saat masuk; selain itu Petugas Keamanan memilih shift, staf lain mengikuti premis
  const fixed = !isIn && tr?.masuk && tr.jadwal;
  const pick = !fixed && sec && F.pos.premisId!=="sikl";
  if (pick && !F.shift) F.shift = suggestShift(F.jenis);
  F.jadwal = fixed ? tr.jadwal : jadwalFor(S.me.fungsi, F.pos.premisId, F.shift);
  const st = isIn ? sMasuk(jam, F.jadwal, dateKey(now)) : sPulang(now, F.jadwal, tr?.masuk ? F.target.key : null, dateKey(now));
  const warn = st==="Terlambat"||st==="Pulang cepat";
  const picker = pick ? `<div class="stack" style="gap:6px;margin-top:14px"><span class="eyebrow">Pilih shift</span>
      <div class="pchoice">${SHIFT_IDS.map(id=>{const j=jadwalById(id);return `<button type="button" class="btn ${F.shift===id?'primary':'ghost'} block" data-shift="${id}" aria-pressed="${F.shift===id}">${esc(j.nama)} <span class="mono" style="opacity:.8">${j.mulai}–${j.selesai}</span></button>`;}).join("")}</div></div>` : '';
  $("#sheetBody").innerHTML = flowHead(3,"Konfirmasi absen "+F.jenis,"Periksa datanya, lalu kirim.") + picker +
   `<div class="card flat stack" style="margin-top:16px">
      <div class="row between"><span class="muted">Waktu</span><b class="mono" style="font-size:22px">${jam}</b></div>
      <div class="row between"><span class="muted">Tanggal</span><b style="text-align:right">${longDate(now)}</b></div>
      <div class="row between"><span class="muted">Jadwal</span><b style="text-align:right">${esc(F.jadwal.nama)}<br><span class="mono small muted">${F.jadwal.mulai}–${F.jadwal.selesai}${F.jadwal.lintas?' (+1 hari)':''}</span></b></div>
      <div class="row between"><span class="muted">Status</span>${pillStatus(st)}</div>
      <div class="row between"><span class="muted">Premis</span><span class="premis" style="${F.pos.dalamRadius?'':'background:var(--bad-soft);color:var(--bad)'}">${I.bldg}${esc(F.pos.premisNama)}</span></div>
      ${!isIn && tr?.masuk ? `<div class="row between"><span class="muted">Jam kerja</span><b class="mono">${fmtDur(durMin(tr.masuk.ts,now.toISOString()))}</b></div>` : ''}
      ${!isIn && !tr?.masuk ? `<div class="row between"><span class="muted">Catatan</span><span class="pill p-bad">Tanpa absen masuk</span></div>` : ''}
      <div class="row between"><span class="muted">Wajah</span><span class="pill p-ok">Cocok · ${F.face?.liveness?'wajah hidup ✓':'skor '+(F.face?.jarak ?? "-")}</span></div>
      ${F.ket?`<div class="row between"><span class="muted">Keterangan</span><b style="text-align:right">${esc(F.ket)}</b></div>`:''}
    </div>
    <div class="stack" style="margin-top:16px"><button class="cta ${isIn?'':'out'}" id="kSend">${isIn?I.in:I.out} Kirim absen ${F.jenis}</button><button class="btn block" id="kCancel">Batal</button></div>`;
  document.querySelectorAll("[data-shift]").forEach(b=>b.onclick=()=>{ F.shift=b.dataset.shift; stepKonfirmasi(); });
  $("#kCancel").onclick=closeSheet;
  $("#kSend").onclick=submitAbsen;
}

/* Bunyi bel "klunting" disintesis dengan Web Audio: dua nada lonceng dengan dengung harmonik */
let AC=null;
function unlockAudio(){ try{ AC = AC || new (window.AudioContext||window.webkitAudioContext)(); if(AC.state==="suspended") AC.resume(); }catch(e){ AC=null; } }
function bell(){
  if(!AC) return;
  try{
    const t0=AC.currentTime+0.02, out=AC.createGain(); out.gain.value=0.5; out.connect(AC.destination);
    const strike=(freq,at,len)=>{ [[1,1],[2.76,.35],[5.4,.12]].forEach(([mul,amp])=>{
      const o=AC.createOscillator(), g=AC.createGain(); o.type="sine"; o.frequency.value=freq*mul;
      g.gain.setValueAtTime(0.0001,at); g.gain.exponentialRampToValueAtTime(amp,at+0.008); g.gain.exponentialRampToValueAtTime(0.0001,at+len/mul**0.5);
      o.connect(g); g.connect(out); o.start(at); o.stop(at+len+0.05); }); };
    strike(1318.5,t0,1.4);       // "klun"
    strike(1760,t0+0.16,1.8);    // "ting"
  }catch(e){}
  try{ navigator.vibrate?.([40,60,40]); }catch(e){}
}

/* Sesi baru di hari yang sama: TANGGAL_UID, lalu TANGGAL_UID_2, _3, … */
async function nextSession(tgl){
  const baseId=tgl+"_"+S.me.uid;
  for(let n=1;n<=30;n++){
    const ref=S.db.doc("absensi/"+(n===1?baseId:baseId+"_"+n)), ex=await ref.get();
    if(!ex.exists) return { ref, sesi:n };
  }
  throw new Error("Terlalu banyak sesi hari ini.");
}
/* Ucapan setelah bel absen pulang (suara bahasa Indonesia bawaan ponsel) */
function primeSpeech(){ try{ if(!window.speechSynthesis) return; const u=new SpeechSynthesisUtterance(" "); u.volume=0; speechSynthesis.speak(u); }catch(e){} }
function ucapkan(teks){
  try{
    if(!window.speechSynthesis) return;
    const voices=speechSynthesis.getVoices(), v=voices.find(x=>/^id(-|_|$)/i.test(x.lang)) || voices.find(x=>/indones/i.test(x.name));
    const u=new SpeechSynthesisUtterance(teks); u.lang="id-ID"; if(v) u.voice=v; u.rate=0.95; u.pitch=1.05; u.volume=1;
    speechSynthesis.cancel(); speechSynthesis.speak(u);
  }catch(e){}
}
/* Besok libur bila Sabtu/Minggu, tanggal merah, atau staf sedang cuti */
function besokLibur(now){
  const besok=new Date(new Date(now).getTime()+86400000), k=dateKey(besok);
  const hari=besok.toLocaleDateString("en-US",{timeZone:TZ,weekday:"short"});
  if (hari==="Sat"||hari==="Sun") return true;
  if ((S.cfg.libur||{})[k]) return true;
  return izinOn(k, S.me?.uid)?.jenis==="cuti";
}
function pesanPulang(now){
  return besokLibur(now) ? "Selamat beristirahat, dan jangan lupa liburan." : "Selamat beristirahat, dan jangan lupa besok kerja lagi.";
}
async function submitAbsen(){
  unlockAudio(); if(F.jenis==="pulang") primeSpeech();
  const btn=$("#kSend"); btn.disabled=true; btn.textContent="Mengirim…";
  const now=new Date(), jam=timeStr(now), tgl=dateKey(now), j=F.jadwal;
  const rec={jam, ts:now.toISOString(), ...F.pos, wajah:F.face||null, keterangan:F.ket||""};
  try{
    const base={uid:S.me.uid, username:S.me.username, nama:S.me.nama, fungsi:S.me.fungsi, jadwal:j};
    if(F.jenis==="masuk"){
      const {ref,sesi}=await nextSession(tgl);
      await ref.set({...base, tanggal:tgl, sesi, masuk:rec, status:sMasuk(jam,j,tgl)});
    } else if(F.target.id){
      const ref=S.db.doc("absensi/"+F.target.id), ex=await ref.get(), d=ex.exists?ex.data():null;
      if(d?.pulang){ closeSheet(); return toast("Sesi ini sudah absen pulang."); }
      const sp=sPulang(now, j, F.target.key, tgl);
      await ref.update({pulang:rec, statusPulang:sp, ...(d?.jadwal?{}:{jadwal:j})});
    } else {
      const {ref,sesi}=await nextSession(tgl);
      await ref.set({...base, tanggal:tgl, sesi, pulang:rec, statusPulang:sPulang(now, j, null, tgl), status:""});
    }
    $("#sheetBody").innerHTML=`<div class="stack" style="align-items:center;text-align:center;padding:26px 0"><span style="color:var(--ok)">${I.check.replace('width="40" height="40"','width="72" height="72"')}</span>
      <h2 style="font-size:22px">Absen ${F.jenis} tercatat</h2><p class="mono" style="font-size:30px;font-weight:700">${jam.slice(0,5)}</p><span class="premis" style="${rec.dalamRadius?'':'background:var(--bad-soft);color:var(--bad)'}">${I.bldg}${esc(rec.premisNama)}</span><p class="small muted">${esc(jadwalText(j))}</p><p class="muted">${longDate(now)}</p>
      <button class="cta" id="kDone" style="margin-top:8px">Selesai</button></div>`;
    $("#kDone").onclick=closeSheet;
    bell();
    if(F.jenis==="pulang") setTimeout(()=>ucapkan(pesanPulang(now)), 1500);
  }catch(ex){ btn.disabled=false; btn.textContent="Coba kirim lagi"; toast(sebabGagal(ex)); }
}

/* ===================== Ekspor ===================== */
async function doExport(kind){
  let from=$("#exFrom").value, to=$("#exTo").value;
  if(!from||!to) return toast("Pilih rentang tanggal.");
  if(from>to) [from,to]=[to,from];
  let rows;
  try{ const q=await S.db.collection("absensi").where("tanggal",">=",from).where("tanggal","<=",to).get(); rows=q.docs.map(d=>d.data()); }
  catch(e){ return toast("Gagal mengambil data."); }
  const izinRows=[];
  for(const z of (S.izin||[])) for(const d of eachDay(z.mulai,z.selesai)) if(d>=from && d<=to) izinRows.push(z.jenis==="cuti"
    ? [d,"-",z.nama,z.fungsi,z.username||"","","Cuti tahunan","","","","","","","","","","","",z.alasan||""]
    : [d,"-",z.nama,z.fungsi,z.username||"","","Sakit / MC","","","","","","","","","","","",(z.alasan||"")+(z.berkas?` (surat: ${z.berkas.nama})`:"")]);
  if(!rows.length && !izinRows.length) return toast("Tidak ada data pada rentang ini.");
  rows.sort((a,b)=>a.tanggal.localeCompare(b.tanggal)||((a.masuk||a.pulang)?.jam||"").localeCompare((b.masuk||b.pulang)?.jam||""));
  const head=["Tanggal","Sesi","Nama","Fungsi/Bagian","Username","Jadwal","Kelengkapan","Jam Masuk","Status Masuk","Premis Masuk","Koordinat Masuk","Jam Pulang","Status Pulang","Premis Pulang","Koordinat Pulang","Jam Kerja","Jam Kerja (desimal)","Mode Lokasi","Keterangan"];
  const data=rows.map(r=>{ const m=lengkap(r)?durMin(r.masuk.ts,r.pulang.ts):null; return [r.tanggal,r.sesi||1,r.nama,r.fungsi,r.username,r.jadwal?jadwalText(r.jadwal):"",lengkap(r)?"Lengkap":(r.masuk?"Tidak lengkap (tanpa pulang)":"Tidak lengkap (tanpa masuk)"),r.masuk?.jam||"",r.status||"",r.masuk?premisName(r.masuk):"",r.masuk?`${r.masuk.lat}, ${r.masuk.lng}`:"",r.pulang?.jam||"",r.statusPulang||"",r.pulang?premisName(r.pulang):"",r.pulang?`${r.pulang.lat}, ${r.pulang.lng}`:"",m==null?"":fmtDur(m),m==null?"":(m/60).toFixed(2),[r.masuk,r.pulang].some(x=>x?.mode==="demo")?"Demo":"GPS",[r.masuk?.keterangan,r.pulang?.keterangan].filter(Boolean).join(" / ")]; });
  data.push(...izinRows); data.sort((a,b)=>String(a[0]).localeCompare(String(b[0])));
  if(kind==="copy"){
    const tsv=[head,...data].map(r=>r.map(v=>String(v).replace(/[\t\n]/g," ")).join("\t")).join("\n");
    try{ await navigator.clipboard.writeText(tsv); toast(`${rows.length} baris disalin. Tempel di Google Sheets.`); }
    catch(e){ openSheet(`<h2 style="font-size:20px">Salin manual</h2><p class="small muted" style="margin:6px 0 10px">Tekan lama di kotak, pilih Semua, lalu Salin.</p><textarea class="input mono" id="tsvBox" rows="10" style="font-size:12px" readonly>${esc(tsv)}</textarea><button class="btn block" style="margin-top:12px" id="tsvClose">Tutup</button>`); $("#tsvBox").select(); $("#tsvClose").onclick=closeSheet; }
  } else {
    const q=v=>{const s=String(v);return /[",\n]/.test(s)?'"'+s.replace(/"/g,'""')+'"':s;};
    const csv="﻿"+[head,...data].map(r=>r.map(q).join(",")).join("\n");
    const name=`absensi-kbri-kl_${from}_${to}.csv`, blob=new Blob([csv],{type:"text/csv"});
    try{
      const file=new File([blob],name,{type:"text/csv"});
      if(navigator.canShare && navigator.canShare({files:[file]})){ await navigator.share({files:[file], title:name}); return; }
    }catch(e){ if(e?.name==="AbortError") return; }
    const a=document.createElement("a"); a.href=URL.createObjectURL(blob); a.download=name; document.body.appendChild(a); a.click(); a.remove();
    setTimeout(()=>URL.revokeObjectURL(a.href),4000); toast("File CSV diunduh.");
  }
}


/* ===================== Data wajah ===================== */
const FACE_THRESHOLD = 0.42;       // jarak Euclid: makin kecil makin mirip; 0.5 = ketat namun wajar
const FACE_LIB = "https://cdn.jsdelivr.net/npm/@vladmandic/face-api@1.7.15/dist/face-api.js";
const FACE_MODELS = "https://cdn.jsdelivr.net/npm/@vladmandic/face-api@1.7.15/model/";
let facePromise = null;
function loadFace(){
  if (facePromise) return facePromise;
  facePromise = (async () => {
    if (!window.faceapi) await new Promise((ok,no)=>{ const s=document.createElement("script"); s.src=FACE_LIB; s.onload=ok; s.onerror=()=>no(new Error("Gagal memuat pengenal wajah. Periksa koneksi.")); document.head.appendChild(s); });
    await faceapi.nets.tinyFaceDetector.loadFromUri(FACE_MODELS);
    await faceapi.nets.faceLandmark68Net.loadFromUri(FACE_MODELS);
    await faceapi.nets.faceRecognitionNet.loadFromUri(FACE_MODELS);
  })();
  facePromise.catch(()=>{ facePromise=null; });
  return facePromise;
}
function loadImg(src){ return new Promise((ok,no)=>{ const i=new Image(); i.onload=()=>ok(i); i.onerror=()=>no(new Error("Foto tidak bisa dibaca.")); i.src=src; }); }
async function faceDescriptor(src, live=false){
  await loadFace();
  const img = typeof src==="string" ? await loadImg(src) : src;
  const opts = new faceapi.TinyFaceDetectorOptions({ inputSize:416, scoreThreshold:0.5 });
  const all = await faceapi.detectAllFaces(img, opts);
  if (!all.length) return { err:"Wajah belum terlihat. Hadapkan wajah ke kamera dengan cahaya cukup." };
  if (all.length > 1) return { err:"Terlihat lebih dari satu wajah. Pastikan hanya kamu di depan kamera." };
  const r = await faceapi.detectSingleFace(img, opts).withFaceLandmarks().withFaceDescriptor();
  if (!r) return { err:"Wajah kurang jelas. Dekatkan sedikit dan pastikan cahaya cukup." };
  const W = img.width || img.naturalWidth, box = r.detection.box;
  if (box.width < W*0.28) return { err:"Dekatkan wajah ke kamera." };
  if (r.detection.score < 0.6) return { err:"Wajah kurang jelas. Hadap lurus ke kamera." };
  return { d: Array.from(r.descriptor), skor:r.detection.score };
}
/* Ketajaman gambar (variansi Laplacian): menolak bingkai yang buram/goyang */
function ketajaman(c){
  const n=128, t=document.createElement("canvas"); t.width=t.height=n; const x=t.getContext("2d"); x.drawImage(c,0,0,n,n);
  const d=x.getImageData(0,0,n,n).data, g=new Float32Array(n*n);
  for(let i=0;i<n*n;i++) g[i]=.299*d[i*4]+.587*d[i*4+1]+.114*d[i*4+2];
  let sum=0,sum2=0,k=0;
  for(let y=1;y<n-1;y++) for(let xx=1;xx<n-1;xx++){ const i=y*n+xx, l=4*g[i]-g[i-1]-g[i+1]-g[i-n]-g[i+n]; sum+=l; sum2+=l*l; k++; }
  const m=sum/k; return sum2/k-m*m;
}
const TAJAM_MIN = 60;
/* Jarak ke data terdaftar: dibandingkan dengan rata-rata DAN setiap sampel, ambil yang paling ketat */
function jarakKe(d, w){
  const rata = faceDist(d, w.descriptor);
  const sampel = Array.isArray(w.sampel) && w.sampel.length ? w.sampel.map(x=>faceDist(d, x.v||x)) : [rata];
  const urut = [...sampel].sort((a,b)=>a-b), median = urut[Math.floor(urut.length/2)];
  return Math.max(rata, median);
}
function faceDist(a,b){ let s=0; for(let i=0;i<a.length;i++){ const d=a[i]-b[i]; s+=d*d; } return Math.sqrt(s); }

/* Pendaftaran: 3 foto, rata-rata sidik wajah disimpan ke wajah/{uid} (bukan fotonya) */
function openEnroll(after){
  openSheet(`<span class="eyebrow">Pendaftaran wajah</span><h2 style="font-size:22px;margin-top:4px">Daftarkan wajahmu</h2>
    <p class="small muted" style="margin-top:4px">Lihat lurus ke kamera dan tahan beberapa detik. Wajah direkam otomatis 5 kali, lalu dikirim ke admin untuk disetujui.</p>
    <div class="scanner" id="scan" style="margin-top:16px"><div class="ring spin"></div><span class="muted small">Membuka kamera…</span></div>
    <div class="steps" id="enSteps" style="margin-top:12px"><i></i><i></i><i></i><i></i><i></i></div>
    <p class="small muted" id="scanMsg" style="text-align:center;min-height:2.6em"></p>
    <div class="stack" id="faceAct"><button class="btn block" id="enCancel">Batal</button></div>`);
  solidSheet();
  const cancel=()=>{ S.scanToken=(S.scanToken||0)+1; closeSheet(); };
  $("#enCancel").onclick=cancel;
  const box=$("#scan"), msg=t=>{ const m=$("#scanMsg"); if(m) m.textContent=t; };
  const N=5, shots=[]; let foto=null;
  const mark=()=>document.querySelectorAll("#enSteps i").forEach((el,i)=>el.classList.toggle("on", i<shots.length));
  async function save(){
    const avg = shots[0].map((_,i)=>shots.reduce((t,d)=>t+d[i],0)/shots.length);
    msg("Mengirim ke admin…");
    try{
      const data={ descriptor:avg, sampel:shots.map(v=>({v})), foto, disetujui:false, dibuat:new Date().toISOString(), model:"face-api 1.7.15 (68 titik)" };
      await S.db.doc("wajah/"+S.me.uid).set(data);
      S.wajah = data;
      stopCam(); bell(); toast("Data wajah terkirim. Tunggu persetujuan admin."); closeSheet(); render(); if(after) after();
    }catch(e){ msg(sebabGagal(e)); }
  }
  (async()=>{
    unlockAudio();
    let v=null; try{ v=await openCamera(box); }catch(e){ v=null; }
    if(!$("#scan")) return;
    if(!v){ msg("Kamera tidak bisa dibuka. Izinkan akses kamera untuk aplikasi ini di pengaturan browser, lalu coba lagi."); return; }
    msg("Menyiapkan pengenal wajah… (pertama kali butuh beberapa detik)");
    try{ await loadFace(); }catch(e){ msg(e.message); return; }
    const token = (S.scanToken = (S.scanToken||0)+1);
    while($("#vid") && S.scanToken===token && shots.length<N){
      const frame=grabFrame(v,480);
      if(ketajaman(frame) < TAJAM_MIN){ msg("Gambar buram. Tahan HP agar tidak goyang."); await sleep(250); continue; }
      let r; try{ r=await faceDescriptor(frame, true); }catch(e){ r={err:e.message}; }
      if(!$("#vid") || S.scanToken!==token) return;
      if(r.err){ msg(r.err); await sleep(300); continue; }
      if(shots.length && faceDist(r.d, shots[0]) > 0.38){ shots.length=0; foto=null; mark(); msg("Wajah berubah. Mengulang dari awal, tetap lihat ke kamera."); await sleep(400); continue; }
      if(!foto){ const t=document.createElement("canvas"); t.width=t.height=200; t.getContext("2d").drawImage(frame,0,0,200,200); foto=t.toDataURL("image/jpeg",.75); }
      shots.push(r.d); mark(); msg(shots.length<N ? `Bagus! Rekaman ${shots.length} dari ${N}. Tetap lihat ke kamera…` : "Selesai merekam.");
      await sleep(350);
    }
    if(shots.length>=N){
      const live = await cekHidup(v, msg, token, 1);
      if(!$("#vid") || S.scanToken!==token) return;
      if(!live.ok){ stopCam(); msg(""); $("#faceAct").innerHTML=`<div class="card flat" style="text-align:center;color:var(--bad)"><b>${esc(live.alasan)}</b></div><button class="cta" id="enRetry">Ulangi pendaftaran</button><button class="btn block" id="enCancel2">Batal</button>`; $("#enRetry").onclick=()=>openEnroll(after); $("#enCancel2").onclick=closeSheet; return; }
      save();
    }
  })();
}

/* ===================== PWA: service worker & tombol pasang ===================== */
if ("serviceWorker" in navigator) window.addEventListener("load", () => navigator.serviceWorker.register("sw.js").catch(()=>{}));

let installEvt=null;
window.addEventListener("beforeinstallprompt", e => { e.preventDefault(); installEvt=e; render(); });
window.addEventListener("appinstalled", () => { installEvt=null; toast("Aplikasi terpasang di layar utama."); render(); });
const isStandalone = () => window.matchMedia?.("(display-mode: standalone)").matches || navigator.standalone === true;
const isIOS = () => /iphone|ipad|ipod/i.test(navigator.userAgent);
function installHint(){
  if (isStandalone()) return "";
  if (installEvt) return `<button class="btn ghost block" id="installBtn">${I.dl} Pasang aplikasi di layar utama</button>`;
  if (isIOS()) return `<p class="small muted" style="text-align:center">Pasang di iPhone: buka di Safari, ketuk tombol Bagikan, lalu pilih <b>Tambah ke Layar Utama</b>.</p>`;
  return "";
}
document.addEventListener("click", async e => {
  if (e.target.closest?.("#installBtn") && installEvt) { installEvt.prompt(); try{ await installEvt.userChoice; }catch(_){} installEvt=null; render(); }
});


/* ===================== Cuti, izin sakit/MC & kalender ===================== */
const JENIS_IZIN = { cuti:"Cuti tahunan", sakit:"Sakit / MC" };
const MAX_BERKAS = 25*1024*1024, POTONGAN = 900*1000;
function eachDay(a,b){ const out=[]; let d=new Date(a+"T12:00:00+08:00"); const end=new Date(b+"T12:00:00+08:00"); while(d<=end && out.length<400){ out.push(dateKey(d)); d=new Date(d.getTime()+86400000); } return out; }
function izinOn(day, uid){ return (S.izin||[]).find(z=>z.uid===uid && z.mulai<=day && z.selesai>=day) || null; }
const fmtTgl = k => new Date(k+"T12:00:00+08:00").toLocaleDateString("id-ID",{timeZone:TZ,day:"numeric",month:"short",year:"numeric"});
const rentang = z => z.mulai===z.selesai ? fmtTgl(z.mulai) : `${fmtTgl(z.mulai)} – ${fmtTgl(z.selesai)}`;
function izinBanner(z){
  const cuti=z.jenis==="cuti";
  return `<div class="card stack izin-banner ${cuti?'cuti':'sakit'}"><div class="row" style="gap:10px">${I.cal.replace('<svg ','<svg width="26" height="26" ')}<div><b>${cuti?'Kamu sedang cuti tahunan':'Hari ini tercatat izin sakit / MC'}</b><p class="small">${esc(rentang(z))}${z.alasan?` · ${esc(z.alasan)}`:''}</p></div></div>
    <p class="small">${cuti?'Absen masuk dan pulang dinonaktifkan selama cuti. Selamat beristirahat.':'Kalau sudah kembali bekerja, kamu tetap bisa absen.'}</p></div>`;
}
function izinRow(z, admin){
  return `<div class="item"><span class="chk" style="background:${z.jenis==='cuti'?'var(--bad)':'var(--warn)'};color:#fff">${I.cal.replace('<svg ','<svg width="15" height="15" ')}</span>
    <div class="grow"><div class="name">${admin?esc(z.nama):esc(JENIS_IZIN[z.jenis])}</div><div class="sub">${admin?esc(JENIS_IZIN[z.jenis])+' · ':''}${esc(rentang(z))}</div>${z.alasan?`<div class="sub">${esc(z.alasan)}</div>`:''}
    <div class="row wrap" style="gap:6px;margin-top:6px">${z.berkas?`<button class="btn ghost" style="padding:6px 12px;font-size:12.5px" data-berkas="${esc(z.berkas.id)}" data-nama="${esc(z.berkas.nama)}">${I.clip} Lihat surat</button>`:''}
    ${(admin || z.mulai>S.dayKey) ? `<button class="btn danger" style="padding:6px 12px;font-size:12.5px" data-hapusizin="${esc(z._id)}">${admin?'Hapus':'Batalkan'}</button>`:''}</div></div></div>`;
}
function izinListCard(list, admin){
  const l=[...list].sort((a,b)=>b.mulai.localeCompare(a.mulai)).slice(0,12);
  return `<div class="card stack"><div class="row between"><h3 style="font-size:16px">Cuti & izin</h3>${admin?'':`<button class="btn ghost" id="izinBtn" style="padding:8px 14px">+ Ajukan</button>`}</div>
    ${l.length?`<div class="list">${l.map(z=>izinRow(z,admin)).join("")}</div>`:`<p class="small muted">Belum ada cuti atau izin.</p>`}</div>`;
}

/* Kalender bulanan: blok merah = cuti, blok kuning = sakit/MC, titik hijau = hadir lengkap, titik merah = tidak lengkap */
function shiftMonth(ym, d){ const [y,m]=ym.split("-").map(Number); const t=new Date(Date.UTC(y,m-1+d,1)); return t.toISOString().slice(0,7); }
function calendarCard(recs, izin, title, extra=""){
  const ym=S.calMonth||dateKey().slice(0,7), [y,m]=ym.split("-").map(Number);
  const first=new Date(Date.UTC(y,m-1,1)), days=new Date(Date.UTC(y,m,0)).getUTCDate(), lead=(first.getUTCDay()+6)%7;
  const byDay={};
  for(const r of recs){ const k=r.tanggal; if(!k.startsWith(ym)) continue; byDay[k]=byDay[k]||{ok:0,no:0}; lengkap(r)?byDay[k].ok++:byDay[k].no++; }
  const izinDay={};
  for(const z of izin) for(const d of eachDay(z.mulai,z.selesai)) if(d.startsWith(ym)) (izinDay[d]=izinDay[d]||[]).push(z);
  const cells=[]; for(let i=0;i<lead;i++) cells.push('<div class="cal-d empty"></div>');
  for(let d=1; d<=days; d++){
    const k=`${ym}-${String(d).padStart(2,"0")}`, z=izinDay[k], r=byDay[k];
    const lib = (S.cfg.libur||{})[k];
    const cls = z ? (z.some(x=>x.jenis==="cuti")?"cuti":"sakit") : lib ? "libur" : "";
    const tip = z ? z.map(x=>`${x.nama?x.nama+": ":""}${JENIS_IZIN[x.jenis]}`).join(", ") : lib ? lib : r ? (r.no?"Ada absen tidak lengkap":"Hadir") : "";
    cells.push(`<div class="cal-d ${cls} ${k===S.dayKey?'today':''}" title="${esc(tip)}"><span>${d}</span>${z&&z.length>1?`<small>${z.length}</small>`:''}${!z&&r?`<i class="dot ${r.no?'no':'ok'}"></i>`:''}</div>`);
  }
  const bulan=new Date(Date.UTC(y,m-1,15)).toLocaleDateString("id-ID",{month:"long",year:"numeric",timeZone:"UTC"});
  return `<div class="card stack"><div class="row between"><h3 style="font-size:16px">${esc(title)}</h3>
      <div class="row" style="gap:6px"><button class="btn ghost cal-nav" data-cal="-1" aria-label="Bulan sebelumnya">‹</button><b style="min-width:118px;text-align:center;font-size:14px">${esc(bulan)}</b><button class="btn ghost cal-nav" data-cal="1" aria-label="Bulan berikutnya">›</button></div></div>
    ${extra}
    <div class="cal"><div class="cal-h">Sen</div><div class="cal-h">Sel</div><div class="cal-h">Rab</div><div class="cal-h">Kam</div><div class="cal-h">Jum</div><div class="cal-h">Sab</div><div class="cal-h">Min</div>${cells.join("")}</div>
    <div class="row wrap small muted" style="gap:12px"><span><i class="lg cuti"></i>Cuti</span><span><i class="lg sakit"></i>Sakit/MC</span><span><i class="lg libur"></i>Tanggal merah</span><span><i class="dot ok"></i> Hadir</span><span><i class="dot no"></i> Tidak lengkap</span></div></div>`;
}
async function loadKalAdmin(){
  const ym=S.calMonth||dateKey().slice(0,7); S.kalRecs=null;
  try{ const q=await S.db.collection("absensi").where("tanggal",">=",ym+"-01").where("tanggal","<=",ym+"-31").get(); S.kalRecs=q.docs.map(x=>x.data()); }catch(e){ S.kalRecs=[]; }
  refresh("kal");
}
function viewKalenderAdmin(){
  const staf=S.staff.filter(s=>s.role!=="admin"), sel=S.calStaff||"";
  const recs=(S.kalRecs||[]).filter(r=>!sel||r.uid===sel), izin=(S.izin||[]).filter(z=>!sel||z.uid===sel);
  const ym=S.calMonth||dateKey().slice(0,7);
  const izinBulan=izin.filter(z=>z.mulai.slice(0,7)<=ym && z.selesai.slice(0,7)>=ym);
  const pilih=`<label class="f">Tampilkan<select class="input" id="calStaff"><option value="">Semua staf</option>${staf.map(s=>`<option value="${esc(s.uid)}" ${s.uid===sel?'selected':''}>${esc(s.nama)}</option>`).join("")}</select></label>`;
  return `<div><span class="eyebrow">Kalender</span><h2 style="font-size:24px">Kehadiran & cuti</h2></div>
    ${S.kalRecs===null?'<p class="small muted">Memuat data bulan ini…</p>':''}
    ${calendarCard(sel?recs:[], izin, sel?"Kalender staf":"Cuti & izin semua staf", pilih)}
    <div class="card stack"><h3 style="font-size:16px">Cuti & izin bulan ini</h3>${izinBulan.length?`<div class="list">${izinBulan.sort((a,b)=>a.mulai.localeCompare(b.mulai)).map(z=>izinRow(z,true)).join("")}</div>`:'<p class="small muted">Tidak ada cuti atau izin di bulan ini.</p>'}</div>`;
}

/* Form pengajuan: cuti tahunan atau sakit/MC dengan alasan dan surat (maks. 25 MB) */
function openIzinForm(){
  const today=dateKey();
  openSheet(`<span class="eyebrow">Tidak masuk kerja</span><h2 style="font-size:22px;margin-top:4px">Ajukan cuti / izin sakit</h2>
    <form class="stack" id="izf" style="margin-top:14px">
      <div class="seg" role="radiogroup"><button type="button" class="on" data-jenis="cuti" aria-pressed="true">Cuti tahunan</button><button type="button" data-jenis="sakit" aria-pressed="false">Sakit / MC</button></div>
      <div class="grid2"><label class="f">Mulai<input type="date" class="input" id="izMulai" value="${today}"></label><label class="f">Sampai<input type="date" class="input" id="izSelesai" value="${today}"></label></div>
      <label class="f"><span id="izAlasanLbl">Keterangan (opsional)</span><textarea class="input" id="izAlasan" rows="3" placeholder="contoh: Pulang kampung ke Jakarta"></textarea></label>
      <label class="f"><span id="izFileLbl">Lampiran (opsional)</span>
        <input type="file" class="input" id="izFile" accept="image/*,application/pdf,.pdf,.doc,.docx,.heic,.heif">
        <span class="small muted" style="font-weight:500">JPG, PNG, PDF, atau dokumen lain. Maksimal 25 MB.</span></label>
      <div id="izProg" hidden><div class="prog"><i id="izBar"></i></div><p class="small muted" id="izProgTxt"></p></div>
      <p id="izErr" class="small" style="color:var(--bad);font-weight:600" hidden></p>
      <button class="cta" type="submit" id="izBtn">Kirim pengajuan</button>
      <button type="button" class="btn block" id="izCancel">Batal</button>
    </form>`);
  let jenis="cuti";
  const setJenis=j=>{ jenis=j; document.querySelectorAll("[data-jenis]").forEach(b=>{ const on=b.dataset.jenis===j; b.classList.toggle("on",on); b.setAttribute("aria-pressed",on); });
    $("#izAlasanLbl").textContent = j==="sakit" ? "Alasan tidak masuk kerja (wajib)" : "Keterangan (opsional)";
    $("#izAlasan").placeholder = j==="sakit" ? "contoh: Demam, istirahat sesuai surat dokter" : "contoh: Pulang kampung ke Jakarta";
    $("#izFileLbl").textContent = j==="sakit" ? "Surat keterangan sakit / MC (wajib)" : "Lampiran (opsional)"; };
  document.querySelectorAll("[data-jenis]").forEach(b=>b.onclick=()=>setJenis(b.dataset.jenis));
  $("#izCancel").onclick=closeSheet;
  $("#izf").onsubmit=async e=>{
    e.preventDefault();
    const err=$("#izErr"), btn=$("#izBtn"), fail=m=>{ err.textContent=m; err.hidden=false; btn.disabled=false; btn.textContent="Kirim pengajuan"; };
    err.hidden=true;
    const mulai=$("#izMulai").value, selesai=$("#izSelesai").value, alasan=$("#izAlasan").value.trim(), file=$("#izFile").files?.[0];
    if(!mulai||!selesai) return fail("Isi tanggal mulai dan selesai.");
    if(selesai<mulai) return fail("Tanggal selesai tidak boleh sebelum tanggal mulai.");
    if(eachDay(mulai,selesai).length>60) return fail("Rentang maksimal 60 hari.");
    if(jenis==="sakit" && alasan.length<3) return fail("Tulis alasan tidak masuk kerja.");
    if(jenis==="sakit" && !file) return fail("Lampirkan surat keterangan sakit / MC.");
    if(file && file.size>MAX_BERKAS) return fail("Ukuran file melebihi 25 MB.");
    const bentrok=(S.izin||[]).find(z=>z.uid===S.me.uid && z.mulai<=selesai && z.selesai>=mulai);
    if(bentrok) return fail(`Tanggal itu sudah tercatat ${JENIS_IZIN[bentrok.jenis].toLowerCase()} (${rentang(bentrok)}).`);
    btn.disabled=true; btn.textContent="Mengirim…";
    try{
      let berkas=null;
      if(file) berkas = await uploadBerkas(file, (done,total)=>{ $("#izProg").hidden=false; $("#izBar").style.width=Math.round(done/total*100)+"%"; $("#izProgTxt").textContent=`Mengunggah surat… ${Math.round(done/total*100)}%`; });
      await S.db.collection("izin").add({ uid:S.me.uid, nama:S.me.nama, fungsi:S.me.fungsi, username:S.me.username, jenis, mulai, selesai, alasan, berkas, dibuat:new Date().toISOString() });
      closeSheet(); toast(jenis==="cuti"?"Cuti tercatat.":"Izin sakit tercatat."); bell();
    }catch(ex){ fail(ex?.message && !/permission/i.test(ex.message) ? ex.message : "Gagal mengirim. Periksa koneksi lalu coba lagi."); }
  };
}

/* Surat disimpan di Firestore dalam potongan ±900 KB (Firebase Storage butuh akun penagihan) */
async function kecilkanFoto(file){
  if(!/^image\/(jpeg|png|webp)$/.test(file.type) || file.size<1.5*1024*1024) return file;
  try{
    const url=URL.createObjectURL(file), img=await loadImg(url); URL.revokeObjectURL(url);
    const sc=Math.min(1, 2000/Math.max(img.width,img.height)), c=document.createElement("canvas");
    c.width=Math.round(img.width*sc); c.height=Math.round(img.height*sc); c.getContext("2d").drawImage(img,0,0,c.width,c.height);
    const blob=await new Promise(r=>c.toBlob(r,"image/jpeg",.85));
    return blob && blob.size<file.size ? new File([blob], file.name.replace(/\.\w+$/,"")+".jpg", {type:"image/jpeg"}) : file;
  }catch(e){ return file; }
}
async function uploadBerkas(file, onProgress){
  const f=await kecilkanFoto(file), buf=new Uint8Array(await f.arrayBuffer());
  const n=Math.max(1, Math.ceil(buf.length/POTONGAN)), ref=S.db.collection("berkas").doc();
  await ref.set({ uid:S.me.uid, nama:f.name, tipe:f.type||"application/octet-stream", ukuran:buf.length, potongan:n, dibuat:new Date().toISOString() });
  for(let i=0;i<n;i++){
    await ref.collection("potongan").doc(String(i).padStart(3,"0")).set({ i, data: firebase.firestore.Blob.fromUint8Array(buf.subarray(i*POTONGAN,(i+1)*POTONGAN)) });
    onProgress && onProgress(i+1, n);
  }
  return { id:ref.id, nama:f.name, tipe:f.type||"", ukuran:buf.length };
}
async function ambilBerkas(id){
  const meta=(await S.db.doc("berkas/"+id).get()).data();
  const q=await S.db.collection("berkas/"+id+"/potongan").get();
  const parts=q.docs.map(d=>d.data()).sort((a,b)=>a.i-b.i).map(p=>p.data.toUint8Array());
  return { blob:new Blob(parts,{type:meta.tipe}), meta };
}
async function openBerkas(id, nama){
  openSheet(`<span class="eyebrow">Lampiran</span><h2 style="font-size:20px;margin-top:4px;word-break:break-word">${esc(nama||"Surat")}</h2><div id="bkBody" style="margin-top:14px"><p class="muted">Memuat file…</p></div><button class="btn block" id="bkClose" style="margin-top:12px">Tutup</button>`);
  $("#bkClose").onclick=closeSheet;
  try{
    const {blob,meta}=await ambilBerkas(id), url=URL.createObjectURL(blob);
    if(!$("#bkBody")) return;
    const besar=(meta.ukuran/1024/1024).toFixed(1);
    $("#bkBody").innerHTML = (meta.tipe.startsWith("image/") ? `<img src="${url}" alt="${esc(meta.nama)}" style="width:100%;border-radius:16px;display:block">` : `<div class="card flat"><p><b>${esc(meta.nama)}</b></p><p class="small muted">${esc(meta.tipe||"file")} · ${besar} MB</p></div>`)
      + `<div class="stack" style="margin-top:12px"><a class="btn primary block" href="${url}" target="_blank" rel="noopener" download="${esc(meta.nama)}">${I.dl} Buka / unduh file</a></div>`;
  }catch(e){ if($("#bkBody")) $("#bkBody").innerHTML=`<p class="small" style="color:var(--bad)">File tidak bisa dimuat. Periksa koneksi atau hak akses.</p>`; }
}
async function hapusIzin(id){
  const z=(S.izin||[]).find(x=>x._id===id); if(!z) return;
  openSheet(`<h2 style="font-size:20px">${S.me.role==="admin"?'Hapus':'Batalkan'} ${esc(JENIS_IZIN[z.jenis].toLowerCase())}?</h2><p class="small muted" style="margin:6px 0 14px">${esc(z.nama)} · ${esc(rentang(z))}</p>
    <div class="grid2"><button class="btn" id="hzNo">Tidak</button><button class="btn danger" id="hzYes">Ya, hapus</button></div>`);
  $("#hzNo").onclick=closeSheet;
  $("#hzYes").onclick=async()=>{
    try{
      if(z.berkas?.id){ const q=await S.db.collection("berkas/"+z.berkas.id+"/potongan").get(); for(const d of q.docs) await d.ref.delete(); await S.db.doc("berkas/"+z.berkas.id).delete(); }
      await S.db.doc("izin/"+id).delete(); closeSheet(); toast("Dihapus.");
    }catch(e){ toast("Gagal menghapus."); }
  };
}


/* Admin: periksa data wajah (foto saat pendaftaran) dan cek kemiripan dengan wajah staf lain */
function faceAdminBox(st){
  const w=(S.wajahAll||{})[st.uid];
  if(!w) return `<div class="card flat small muted">Staf ini belum mendaftarkan wajah.</div>`;
  const mirip = Object.entries(S.wajahAll||{}).filter(([uid,o])=>uid!==st.uid && o.descriptor).map(([uid,o])=>({uid, j:faceDist(w.descriptor,o.descriptor)})).filter(x=>x.j<0.5).sort((a,b)=>a.j-b.j);
  const nama = uid => (S.staff.find(x=>x.uid===uid)||{}).nama || "staf lain";
  return `<div class="card flat stack" style="gap:10px"><div class="row" style="gap:12px">
      ${w.foto?`<img src="${w.foto}" alt="Foto pendaftaran wajah" style="width:84px;height:84px;border-radius:20px;object-fit:cover;flex:none">`:''}
      <div style="min-width:0"><b>Data wajah</b><p class="small muted">Didaftarkan ${esc(new Date(w.dibuat).toLocaleString("id-ID",{timeZone:TZ,day:"numeric",month:"short",hour:"2-digit",minute:"2-digit"}))}</p>
      ${w.disetujui===true?'<span class="pill p-ok">Disetujui</span>':'<span class="pill p-warn">Menunggu persetujuan</span>'}</div></div>
    ${mirip.length?`<div class="banner" style="color:var(--bad);background:var(--bad-soft)"><b>Peringatan:</b> wajah ini sangat mirip dengan ${mirip.map(x=>esc(nama(x.uid))).join(", ")}. Kemungkinan didaftarkan oleh orang lain. Hapus dan minta staf mendaftar ulang di depanmu.</div>`:''}
    ${w.disetujui===true?'':`<p class="small muted">Pastikan foto ini benar wajah ${esc(st.nama)} sebelum menyetujui.</p><button type="button" class="btn primary block" id="sApprove">Setujui data wajah</button>`}
  </div>`;
}


/* ===================== Liveness (cek wajah hidup) =====================
   Tantangan acak dibaca dari 68 titik wajah:
   - kedip: rasio bukaan mata (EAR) turun tajam lalu naik lagi
   - toleh kiri/kanan: posisi ujung hidung bergeser dari tengah kedua mata
   Foto atau layar diam tidak bisa memenuhi tantangan ini. */
const TANTANGAN = {
  kedip: { teks:"Kedipkan mata", ikon:"😉" },
  kiri:  { teks:"Toleh pelan ke kiri", ikon:"⬅️" },
  kanan: { teks:"Toleh pelan ke kanan", ikon:"➡️" }
};
function titikWajah(lm){
  const p=lm.positions||lm._positions||lm, d=(a,b)=>Math.hypot(a.x-b.x,a.y-b.y);
  const ear=(i)=> (d(p[i+1],p[i+5])+d(p[i+2],p[i+4]))/(2*d(p[i],p[i+3]));
  const iod=d(p[36],p[45]), midX=(p[36].x+p[45].x)/2;
  return { ear:(ear(36)+ear(42))/2, yaw:(p[30].x-midX)/iod };
}
async function bacaPose(v){
  const f=grabFrame(v, 320);
  const r=await faceapi.detectSingleFace(f, new faceapi.TinyFaceDetectorOptions({inputSize:320, scoreThreshold:0.45})).withFaceLandmarks();
  return r ? titikWajah(r.landmarks) : null;
}
function acak(n){ const k=Object.keys(TANTANGAN).sort(()=>Math.random()-.5); if(n>1 && k[0]!=="kedip" && k[1]!=="kedip") k[1]="kedip"; return k.slice(0,n); }
async function cekHidup(v, msg, token, n){
  const daftar=acak(n), selesai=[];
  const banner = t => { const sc=$("#scan"); if(!sc) return; let b=sc.querySelector(".live-tip"); if(!b){ b=document.createElement("div"); b.className="live-tip"; sc.appendChild(b); } b.innerHTML=`<span>${TANTANGAN[t].ikon}</span>${esc(TANTANGAN[t].teks)}`; };
  // garis dasar: wajah lurus dengan mata terbuka
  let dasar=null;
  for(let i=0;i<12 && !dasar;i++){ const q=await bacaPose(v).catch(()=>null); if(!$("#vid")||S.scanToken!==token) return {ok:false}; if(q && Math.abs(q.yaw)<0.12 && q.ear>0.2) dasar=q; else { msg("Hadap lurus ke kamera."); await sleep(150); } }
  if(!dasar) return { ok:false, alasan:"Wajah tidak terbaca dengan jelas. Hadap lurus ke kamera dengan cahaya cukup." };
  for(const t of daftar){
    banner(t); msg(`Cek wajah hidup ${selesai.length+1} dari ${daftar.length}: ${TANTANGAN[t].teks.toLowerCase()}.`);
    const mulai=Date.now(); let tutup=false, berhasil=false;
    while(Date.now()-mulai < 8000){
      const q=await bacaPose(v).catch(()=>null);
      if(!$("#vid")||S.scanToken!==token) return {ok:false};
      if(q){
        if(t==="kedip"){ if(q.ear < dasar.ear*0.62) tutup=true; else if(tutup && q.ear > dasar.ear*0.85){ berhasil=true; break; } }
        if(t==="kiri" && q.yaw - dasar.yaw < -0.16){ berhasil=true; break; }
        if(t==="kanan" && q.yaw - dasar.yaw > 0.16){ berhasil=true; break; }
      }
      await sleep(60);
    }
    if(!berhasil){ $("#scan")?.querySelector(".live-tip")?.remove(); return { ok:false, alasan:`Gerakan "${TANTANGAN[t].teks.toLowerCase()}" tidak terdeteksi. Ulangi dan lakukan dengan jelas.` }; }
    selesai.push(t); msg("Bagus!"); await sleep(350);
    if(t!=="kedip"){ // kembali menghadap depan sebelum tantangan berikutnya
      const m2=Date.now(); while(Date.now()-m2<4000){ const q=await bacaPose(v).catch(()=>null); if(q && Math.abs(q.yaw-dasar.yaw)<0.08) break; msg("Kembali hadap lurus ke kamera."); await sleep(80); }
    }
  }
  $("#scan")?.querySelector(".live-tip")?.remove();
  return { ok:true, tantangan:selesai };
}
function gagalHidup(box, alasan){
  box.innerHTML=`<div class="ring" style="border-color:var(--bad)"></div><span style="color:var(--bad)">${I.face.replace('width="22" height="22"','width="64" height="64"')}</span>`;
  const m=$("#scanMsg"); if(m) m.textContent="";
  $("#faceAct").innerHTML=`<div class="card flat" style="text-align:center;color:var(--bad)"><b>Cek wajah hidup gagal.</b><p class="small">${esc(alasan||"Ulangi dan ikuti instruksi di layar.")}</p></div>
    <button class="cta" id="fRetake">Coba lagi</button><button class="btn block" id="fBack2">Batal</button>`;
  $("#fRetake").onclick=stepWajah; $("#fBack2").onclick=closeSheet;
}
