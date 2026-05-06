# Ketika Branch yang Salah Sudah Terlanjur Jauh — dan Cara Menyelamatkannya

Ada momen dalam bekerja di tim yang rasanya cukup awkward untuk diakui: kamu sudah kerja keras selama berminggu-minggu di sebuah branch, lalu tiba-tiba sadar bahwa branch yang kamu kerjakan itu _bukan yang seharusnya_.

Teman satu tim sudah mengerjakan hal yang sama dari awal, dengan pendekatan yang lebih tepat, di branch yang berbeda. Dan dua branch itu sudah terlalu jauh berbeda untuk bisa di-merge begitu saja — conflict-nya ratusan baris, di puluhan file.

Situasi ini terasa seperti jalan buntu. Tapi ternyata ada solusi yang cukup elegan, dan prosesnya mengajarkan saya beberapa hal menarik tentang bagaimana Git bekerja.

---

## Anatomi Masalahnya

Bayangkan kondisi seperti ini:

```
v1.0 (titik awal bersama)
  │
  ├── branch: development  →  v1.1 → v1.2 → v1.3 → v1.4 → v1.5 → v1.6 (CI/CD)
  │
  └── branch: samudra      →  v1.1 → v1.2 → v1.3 → v1.4 → v1.5
```

> 💡 **[Ilustrasi: Diagram percabangan dua branch dari titik awal yang sama, dengan development yang lebih panjang karena ada tambahan commit CI/CD di ujungnya]**

Branch `development` dan `samudra` sama-sama dimulai dari titik yang sama (v1.0), lalu berkembang secara paralel. Keduanya menuju v1.5 — tapi lewat jalan yang berbeda, karena pendekatan implementasinya berbeda.

Di sinilah inti masalahnya: `development` adalah yang _salah_, `samudra` adalah yang _benar_. Tapi setelah v1.5, ada tambahan commit di `development` yang justru _benar_ dan penting — commit CI/CD yang dibuat oleh teman DevOps.

Jadi kalau hanya force-push `samudra` sebagai `development`, commit CI/CD itu hilang. Tapi kalau merge `samudra` ke `development`, conflict-nya terlalu banyak untuk diselesaikan secara waras.

---

## Kenapa Merge Biasa Tidak Bisa Diandalkan Di Sini

Merge bekerja dengan cara mengambil dua ujung branch, mencari _common ancestor_-nya, lalu menggabungkan perubahan dari keduanya.

```
       common ancestor
            │
  development ──────────────── HEAD (v1.5 + CI/CD)
            │
  samudra   ──────────────── HEAD (v1.5 benar)
```

> 💡 **[Ilustrasi: Diagram three-way merge — common ancestor di tengah, dua branch di kiri dan kanan, panah merge ke bawah menunjukkan hasil]**

Masalahnya: karena dua branch ini mengubah _file yang sama_ dengan cara yang berbeda (pendekatan implementasi berbeda), Git tidak bisa otomatis memilih mana yang benar. Hasilnya: conflict di mana-mana.

Semakin jauh dua branch menyimpang dari common ancestor, semakin banyak conflict yang muncul. Dalam kasus ini, divergensinya cukup dalam sehingga merge secara manual akan memakan waktu yang tidak sebanding.

---

## Solusinya: Pisahkan Apa yang Ingin Dipertahankan

Kunci dari solusi ini adalah menyadari bahwa tidak semua commit di `development` itu salah. Ada bagian yang salah (logika fitur), dan ada bagian yang benar (CI/CD). Yang perlu dilakukan adalah:

1. Jadikan `samudra` sebagai basis yang baru
2. Ambil _hanya_ commit CI/CD dari `development`, tempel ke atas `samudra`
3. Jadikan hasil akhir ini sebagai `development` yang baru

Inilah yang disebut **cherry-pick** — mengambil commit tertentu dari satu branch dan menerapkannya ke branch lain, tanpa harus membawa serta seluruh sejarah branch asalnya.

> 💡 **[Ilustrasi: Diagram sebelum dan sesudah — sebelum: development panjang + samudra lebih pendek. Sesudah: samudra yang sudah ditambah commit CI/CD, dengan panah "cherry-pick" dari development ke samudra]**

---

## Langkah-Langkahnya

### 1. Identifikasi commit yang ingin diambil

Pertama, cari tahu commit mana di `development` yang murni CI/CD dan tidak bercampur dengan logika fitur yang salah.

```bash
git log origin/development --oneline
```

Tandai hash commit-commit yang relevan. Dalam kasus ini, commit-nya mudah diidentifikasi karena memang dibuat oleh orang berbeda (DevOps) dan pesannya jelas.

### 2. Pastikan common ancestor

```bash
git merge-base origin/samudra origin/development
```

Ini memberikan hash dari commit terakhir yang sama-sama dimiliki kedua branch. Commit-commit CI/CD yang ingin diambil harus berada _setelah_ titik ini di `development`.

### 3. Checkout ke branch yang benar

```bash
git checkout samudra
```

### 4. Cherry-pick commit CI/CD satu per satu (dari terlama ke terbaru)

```bash
git cherry-pick <hash-commit-cicd-1>
git cherry-pick <hash-commit-cicd-2>
# ... dst
```

Urutan penting: cherry-pick dari commit yang paling lama dulu, supaya setiap commit berikutnya punya konteks yang benar.

### 5. Tangani conflict jika ada

Cherry-pick masih bisa conflict, terutama kalau commit yang diambil menyentuh file yang juga diubah di `samudra`. Tapi conflict-nya jauh lebih terbatas — hanya pada file yang benar-benar bersinggungan dengan CI/CD, bukan seluruh codebase.

Prinsip resolusinya sederhana: untuk file CI/CD (workflow, docker config), pakai versi dari `development`. Untuk file logika aplikasi yang kebetulan ikut tersentuh, pakai versi dari `samudra` (HEAD).

```bash
# Untuk file yang ingin pakai versi samudra:
git checkout HEAD -- <nama-file>
git add <nama-file>

# Untuk file yang ingin pakai versi development:
git checkout CHERRY_PICK_HEAD -- <nama-file>
git add <nama-file>

# Setelah semua conflict diselesaikan:
git cherry-pick --continue --no-edit
```

### 6. Verifikasi hasilnya

```bash
git log --oneline -10
```

Pastikan commit CI/CD sudah ada di atas commit-commit `samudra`.

### 7. Force-push sebagai branch development yang baru

```bash
git push origin samudra:development --force
```

> ⚠️ **Catatan penting:** `--force` akan menimpa sejarah `development` di remote. Pastikan tidak ada orang lain yang sedang aktif bekerja di branch `development` tersebut sebelum melakukan ini, atau komunikasikan dulu ke tim.

---

## Apa yang Sebenarnya Terjadi

Setelah proses ini selesai, kondisinya menjadi seperti ini:

```
v1.0 (titik awal bersama)
  │
  └── samudra  →  v1.1 → v1.2 → v1.3 → v1.4 → v1.5 → [CI/CD commits]
                                                               │
                                                    ← ini yang jadi development baru
```

> 💡 **[Ilustrasi: Diagram akhir — hanya ada satu jalur yang bersih dari v1.0 ke v1.5 samudra, lalu cherry-picked CI/CD commits di ujungnya, dengan label "development (baru)" di ujung]**

Branch `development` di remote sekarang memiliki sejarah yang bersih dari `samudra`, dengan tambahan commit CI/CD yang sudah tepat di posisinya. Branch `samudra` sendiri masih ada dan tidak berubah — bisa dijadikan referensi atau dihapus setelah konfirmasi semua berjalan baik.

---

## Yang Saya Pelajari dari Kasus Ini

Ada beberapa hal yang saya anggap penting dari pengalaman ini.

**Cherry-pick bukan pelarian, tapi alat bedah.** Kalau merge adalah menggabungkan dua aliran sungai, cherry-pick adalah mengambil beberapa batu tertentu dari satu sungai dan meletakkannya di sungai lain. Ia berguna persis di situasi ini — ketika kamu tidak mau seluruh sejarahnya, tapi hanya bagian tertentu saja.

**Sejarah commit yang rapi sangat membantu.** Kasus ini bisa diselesaikan dengan relatif mudah karena commit CI/CD memiliki pesan yang jelas dan tidak bercampur dengan commit fitur. Kalau commit-nya dicampur aduk dalam satu commit besar, cherry-pick akan jauh lebih sulit karena tidak bisa dipisahkan.

**Force-push itu bukan musuh, tapi harus dihormati.** Ada situasi di mana menulis ulang sejarah branch di remote memang jalan yang paling masuk akal. Yang penting adalah komunikasi tim dan memastikan tidak ada pekerjaan yang terbuang sia-sia.

---

Di situasi seperti ini, Git bukan hanya version control — ia menjadi alat untuk memperbaiki keputusan yang sudah terlanjur dibuat. Dan memahami cara kerjanya di level yang cukup dalam adalah yang membuat perbedaan antara panik dan tenang ketika masalah seperti ini muncul.

---

_Artikel ini ditulis berdasarkan kasus nyata yang terjadi dalam pengerjaan sebuah proyek. Nama branch disesuaikan untuk keperluan ilustrasi._
