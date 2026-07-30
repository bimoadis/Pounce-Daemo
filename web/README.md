# PumpForge

Generator konsep token pump.fun. Tulis satu ide dalam bahasa biasa, dapatkan
ticker, nama, tagline, deskripsi, lore, dan vibe score — lengkap dengan tombol
langsung ke `pump.fun/create`.

## Arsitektur

```
pumpforge/
├── index.html                # entry HTML, memuat font hero via <link>
├── vite.config.js            # Vite + plugin React + plugin API custom
├── vite-api-plugin.js        # middleware dev: mencegat POST /api/generate
├── api/
│   └── generate.js           # Vercel Serverless Function (production)
├── src/
│   ├── main.tsx               # bootstrap React
│   ├── App.tsx                 # menyusun Hero + TickerTape + Generator
│   ├── index.css               # tailwind + import font hero + a11y
│   ├── lib/
│   │   └── generate-token.js  # panggilan ke MegaLLM, dipakai dev & prod
│   └── components/
│       ├── FadeUp.tsx          # wrapper animasi Framer Motion
│       ├── Hero.tsx            # video background fixed + headline staggered
│       ├── TickerTape.tsx      # marquee contoh token (elemen signature)
│       └── TokenGenerator.tsx  # form ide + kartu hasil (ticket stub)
└── .env.example
```

**Kenapa dua backend?**
- Saat `npm run dev`, Vite tidak menjalankan server Node terpisah. Plugin di
  `vite-api-plugin.js` mencegat request ke `/api/generate` langsung di dalam
  proses dev server Vite.
- Saat dideploy ke Vercel, Vite tidak lagi menangani request API — Vercel
  otomatis mengubah setiap file di `api/` menjadi Serverless Function.
  `api/generate.js` mengambil alih peran itu.
- Keduanya memanggil fungsi `generateToken` yang sama dari
  `src/lib/generate-token.js`, jadi perilaku dev dan production identik.

## Alur generate

1. Frontend (`TokenGenerator.tsx`) mengirim `POST /api/generate` dengan body
   `{ "idea": "..." }`.
2. Backend memanggil `generateToken(idea)` yang mengirim prompt ke
   `https://ai.megallm.io/v1/chat/completions`, meminta balasan JSON murni.
3. Respons di-parse menjadi `{ ticker, name, tagline, description, lore, vibeScore }`.
4. Backend menambahkan `pumpUrl: "https://pump.fun/create"` lalu mengirim
   objek lengkap kembali ke frontend untuk ditampilkan di kartu hasil.

## Menjalankan secara lokal

```bash
npm install
cp .env.example .env   # isi MEGALLM_API_KEY
npm run dev
```

## Deploy ke Vercel

1. Push repo ke GitHub lalu import ke Vercel.
2. Set environment variable `MEGALLM_API_KEY` di Vercel project settings.
3. Vercel otomatis mendeteksi `api/generate.js` sebagai Serverless Function —
   tidak ada konfigurasi tambahan yang diperlukan.

## Catatan tanggung jawab

PumpForge hanya membuat *copy* kreatif untuk konsep token. Tidak ada dompet,
dana, atau transaksi yang ditangani di sisi aplikasi ini — keputusan untuk
benar-benar meluncurkan token di pump.fun sepenuhnya ada di tangan pengguna.
Memecoin bersifat sangat spekulatif.
