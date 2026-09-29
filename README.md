# landing-page
Personal Landing Page of Yanottama Oktabrian — Informatics Instructor.

Situs berbasis Vue 3 dengan Vite dan Tailwind CSS 4. Semua konten diambil dari **satu file**: `public/data/profile.json`, lalu dibundel ke aplikasi Vue.

## Struktur

```
public/
├── data/profile.json       # ← SEMUA KONTEN ADA DI SINI
├── assets/img/             # foto profil, gambar proyek, favicon
└── assets/doc/             # CV / PDF
index.html                  # kerangka halaman Vue
src/main.js                 # entry point Vue
src/App.vue                 # komposisi halaman
src/components/             # bagian-bagian halaman
src/composables/useProfile.js # state & bahasa profil
vite.config.js              # konfigurasi Vue + Tailwind
vercel.json                 # konfigurasi Vercel
```

Di luar folder publik:

```
src/input.css               # sumber Tailwind
package.json                # dependensi & skrip npm
```

## Peta konten & cara menambah informasi

Edit `public/data/profile.json` (bisa langsung dari web GitHub: buka file → ikon pensil → Commit). Vercel otomatis deploy ulang dalam ±30 detik.

| Ingin menambah... | Tambahkan objek ke | Contoh |
|---|---|---|
| Pengalaman kerja | `experience` | `{ "role": "...", "company": "...", "start": "2025-01", "end": "", "location": "...", "description": "...", "highlights": ["..."] }` — `end` kosong = "Sekarang" |
| Sertifikasi | `certifications` | `{ "name": "...", "issuer": "BNSP", "year": "2025", "url": "https://..." }` |
| Proyek/portofolio | `projects` | `{ "title": "...", "description": "...", "image": "/assets/img/proyek.jpg", "tags": ["PHP"], "url": "https://..." }` — bagian Proyek otomatis muncul jika tidak kosong |
| Bidang pelatihan | `training` | `{ "icon": "code", "title": "...", "items": ["..."] }` — ikon: `office`, `design`, `code`, `network` |
| Keahlian | `expertise` | `"Nama keahlian"` |
| Call to action | `contact.cta` | Ubah `heading`, `description`, `primary`, dan `secondary` |
| Link sosial | `contact.links` | `{ "label": "Instagram", "url": "https://..." }` |
| Bahasa Inggris | `translations.en` | Ubah `summary`, `status`, `cta`, `training`, `experience`, `education`, `languages`, `ui`, dan `meta.title` |
| Kategori profil | `expertise`, `training`, `experience`, `education`, `certifications`, `languages`, `projects` | Bagian `projects` otomatis disembunyikan jika masih kosong |

**Portofolio GitHub:** tambahkan blok berikut di `profile.json` untuk memuat repositori publik saat build:

```json
{
  "github": {
    "username": "yanottamao",
    "exclude": ["landing-page"],
    "maxItems": 9
  }
}
```

Build akan memperbarui `projects` dari repositori non-fork, memakai gambar OpenGraph GitHub, dan tetap mempertahankan proyek manual yang memiliki `id` berbeda.

**Foto profil:** simpan di `public/assets/img/foto.jpg`, lalu isi `"photo": "/assets/img/foto.jpg"`. Build otomatis membuat WebP responsif untuk foto profil utama.
**CV:** ganti `public/assets/doc/profile_linkedin.pdf` (atau ubah `profile.cv`).
**Warna & tema:** ubah variabel `@theme` di `src/input.css`, lalu jalankan `npm run build`.

Setelah mengganti foto profil, perbarui juga tautan `og:image`, `twitter:image`, `preload`, dan gambar pada JSON-LD di `index.html`.

> Tips: pastikan JSON valid (koma antar item, tanda kutip ganda). Cek cepat di https://jsonlint.com bila halaman kosong.

Toggle **ID/EN** tersedia di header. Pilihan bahasa disimpan di `localStorage`; untuk item baru yang ingin diterjemahkan, tambahkan `id` pada item utama dan gunakan `id` yang sama di `translations.en`.

## Anggota tim konten

Untuk kolaborasi yang aman di GitHub, gunakan pola berikut:

| Peran | Akses | Tugas |
|---|---|---|
| Owner / Maintainer | Full | Review konten dan deploy |
| Content Editor | `write` | Edit `public/data/profile.json` dan unggah gambar ke `public/assets/img/` |
| Designer | `write` | Ubah kelas Tailwind dan markup di `src/components/` |
| Viewer | `read` | Meninjau versi sebelum commit |

## Menjalankan lokal

```bash
npm install
npm run dev
```

Buka URL yang ditampilkan Vite (biasanya http://localhost:5173). Untuk memeriksa hasil produksi, jalankan:

```bash
npm run build
npm run preview
```

Untuk validasi cepat:

```bash
npm run validate
```

Proyek ini juga dilengkapi:

- `public/robots.txt` dan `public/sitemap.xml` untuk SEO teknis.
- Structured data `Person` di `index.html`.
- Halaman `public/404.html`.
- Security headers dan aturan rewrite di `vercel.json`.
- Vercel Analytics melalui `_vercel/insights/script.js`.
- GitHub Actions Quality untuk build dan validasi di `.github/workflows/quality.yml`.

## Upload ke GitHub

```bash
git add README.md .gitignore vite.config.js vercel.json public/
git add package.json package-lock.json src/
git commit -m "Add editable personal landing page"
git push origin main
```

## Deploy ke Vercel

1. Push repo ini ke GitHub (`git push origin main`).
2. Masuk https://vercel.com → **Add New… → Project** → import `yanottamao/landing-page`.
3. Framework Preset: **Vite**. Build Command dan Output Directory sudah diatur di `vercel.json`.
4. Klik **Deploy**. Setiap push/commit ke `main` akan otomatis ter-deploy.
5. Opsional: **Settings → Domains** untuk domain sendiri, lalu pasang URL-nya di bagian *Contact info → Website* LinkedIn.
