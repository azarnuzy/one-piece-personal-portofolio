# Memahami React Lebih Dalam — Part 6: State dan Interaktivitas

Sampai di sini, semua yang kita bahas masih bersifat statis — component yang selalu menampilkan hal yang sama setiap kali di-render. Di part ini, kita akhirnya masuk ke bagian yang membuat React benar-benar hidup: **state** dan **interaktivitas**.

Ini adalah salah satu bagian terpenting dari keseluruhan seri, jadi saya akan coba bahas dengan cukup mendalam.

---

## Merespons Aksi Pengguna: Event Handlers

Sebelum bicara tentang state, kita perlu bicara dulu tentang events — karena hampir semua interaksi dimulai dari sini.

Browser adalah pengamat yang sangat teliti. Setiap kali pengguna melakukan sesuatu — mengklik tombol, mengetik di input, menggulir halaman — browser melepaskan event. Tugas kita sebagai developer adalah mendengarkan event-event itu dan merespons dengan sesuatu yang bermakna.

Di JavaScript vanilla, kita biasanya melakukannya dengan `addEventListener`:

```javascript
const tombol = document.querySelector(".btn-kirim");

tombol.addEventListener("click", function () {
  console.log("Tombol diklik!");
});
```

Di React, caranya berbeda. Kita tidak berinteraksi langsung dengan DOM — kita menyerahkan kontrol itu ke React. Sebagai gantinya, kita memasang event handler langsung di JSX:

```jsx
function FormKirim() {
  function handleKlik() {
    console.log("Formulir dikirim!");
  }

  return <button onClick={handleKlik}>Kirim Sekarang</button>;
}
```

Ada beberapa alasan mengapa pendekatan ini lebih baik:

Pertama, React secara otomatis membersihkan event listener ketika component di-unmount. Kalau kita pakai `addEventListener` manual, kita harus ingat untuk memanggil `removeEventListener` — kalau lupa, ada potensi memory leak.

Kedua, kita tidak perlu menyentuh DOM sama sekali. React justru tidak suka kita berinteraksi langsung dengan DOM. Biarkan React yang mengurus manipulasi DOM — itu memang tugasnya.

### Perbedaan Penting: Reference vs Pemanggilan

Satu hal yang sering jadi sumber kebingungan bagi yang baru belajar React:

```jsx
// ✅ Benar — menyerahkan reference ke function
<button onClick={handleKlik}>Klik</button>

// ❌ Salah — function langsung dipanggil saat render
<button onClick={handleKlik()}>Klik</button>
```

Ketika kita menulis `handleKlik()` dengan tanda kurung, function itu langsung dieksekusi saat component di-render — bukan saat tombol diklik. Yang kita mau adalah memberikan React sebuah "alamat" function, supaya React bisa memanggilnya nanti ketika event terjadi.

### Mengirimkan Argumen ke Handler

Lalu bagaimana kalau kita perlu mengirimkan argumen ke dalam function handler? Misalnya, kita punya beberapa tombol dan masing-masing perlu memanggil function yang sama dengan nilai yang berbeda:

```jsx
function PilihUkuran() {
  function handlePilih(ukuran) {
    console.log(`Ukuran dipilih: ${ukuran}`);
  }

  return (
    <div>
      <button onClick={() => handlePilih("S")}>Small</button>
      <button onClick={() => handlePilih("M")}>Medium</button>
      <button onClick={() => handlePilih("L")}>Large</button>
    </div>
  );
}
```

Solusinya adalah membungkusnya dalam anonymous arrow function. Kita membuat function baru yang, ketika dipanggil React, akan menjalankan `handlePilih` dengan argumen yang kita tentukan.

---

## useState: Menyimpan Nilai yang Berubah

Sekarang kita masuk ke inti dari topik ini.

Bayangkan kita membangun sebuah keranjang belanja. Jumlah item di dalamnya bisa berubah — bertambah ketika pengguna menambahkan produk, berkurang ketika mereka menghapusnya. Nilai yang terus berubah seperti ini perlu disimpan di suatu tempat — dan itulah yang disebut **state**.

Berikut contoh sederhana: sebuah penghitung yang bisa ditambah dan dikurangi.

```jsx
import React from "react";

function Penghitung() {
  const [jumlah, setJumlah] = React.useState(0);

  return (
    <div>
      <button onClick={() => setJumlah(jumlah - 1)}>−</button>
      <span>{jumlah}</span>
      <button onClick={() => setJumlah(jumlah + 1)}>+</button>
    </div>
  );
}
```

Mari kita bedah satu per satu.

`React.useState(0)` adalah sebuah **hook** — function khusus yang memungkinkan kita "terhubung" ke mekanisme internal React. Angka `0` adalah nilai awal dari state kita.

Hook ini mengembalikan sebuah array dengan dua item:

- Item pertama (`jumlah`): nilai state saat ini
- Item kedua (`setJumlah`): function untuk mengubah nilai state tersebut

Kita menggunakan _destructuring assignment_ untuk mengambil keduanya sekaligus.

Konvensi penamaan yang umum di komunitas React adalah `[sesuatu, setSesuatu]` — nama state dan nama setter-nya dengan prefix `set`.

### Apa yang Terjadi Ketika State Berubah?

Ini adalah bagian yang paling penting untuk dipahami.

Ketika kita memanggil `setJumlah(jumlah + 1)`, React tidak langsung mengubah variabel `jumlah` di tempat. Yang terjadi adalah:

1. React mencatat bahwa ada perubahan state yang diminta
2. React menjadwalkan sebuah **re-render** — pemanggilan ulang terhadap function component kita
3. Ketika re-render terjadi, `React.useState` mengembalikan nilai baru yang sudah diperbarui
4. Component merender ulang UI berdasarkan nilai terbaru

Proses ini adalah inti dari cara kerja React. Setiap render adalah seperti mengambil foto — sebuah snapshot dari tampilan UI pada satu momen tertentu, berdasarkan state yang ada saat itu.

### Kenapa Tidak Bisa Pakai Variabel Biasa?

Pertanyaan yang sangat wajar untuk ditanyakan: kenapa kita tidak bisa cukup menulis `let jumlah = 0` dan mengubahnya secara langsung?

```jsx
// ❌ Ini tidak akan bekerja
function Penghitung() {
  let jumlah = 0;

  return (
    <button
      onClick={() => {
        jumlah = jumlah + 1; // Ini tidak memicu re-render
        console.log(jumlah); // Nilainya berubah, tapi UI tidak update
      }}
    >
      Nilai: {jumlah}
    </button>
  );
}
```

Ada dua masalah di sini:

**Pertama**, mengubah variabel biasa tidak memberi tahu React bahwa sesuatu perlu di-render ulang. React tidak punya cara untuk "mengamati" perubahan variabel di JavaScript.

**Kedua**, bahkan kalau React entah bagaimana tahu harus re-render, variable `jumlah` akan di-inisialisasi ulang ke `0` setiap kali function component dipanggil. Variabel lokal tidak bertahan antar render.

Itulah mengapa `useState` ada. React menyimpan nilai state di luar function component — di dalam memori internal React yang terhubung ke _component instance_. Setiap kali state berubah, React memanggil ulang function component, tapi nilai state diambil dari tempat penyimpanan itu, bukan dari inisialisasi ulang.

---

## Bagaimana React Memperbarui UI

Mari kita telusuri proses lengkapnya dengan contoh konkret.

Kita punya component `Penghitung` dengan nilai awal `0`. Ketika pertama kali di-render, React membuat semua DOM node yang diperlukan dan menampilkannya ke layar. Ini disebut **mounting**.

Ketika pengguna mengklik tombol `+`:

1. `setJumlah(1)` dipanggil
2. React menjadwalkan re-render
3. Function `Penghitung` dipanggil lagi
4. Kali ini, `React.useState` mengembalikan `1` (bukan `0`)
5. JSX yang dikembalikan menggambarkan tampilan baru
6. React membandingkan tampilan baru dengan tampilan lama (**reconciliation**)
7. React menemukan bahwa teks "0" perlu diganti "1"
8. React melakukan perubahan minimal itu di DOM
9. Browser menggambar ulang piksel yang berubah

Yang perlu digarisbawahi: React tidak menghancurkan dan membangun ulang seluruh DOM. Ia mencari perbedaan (seperti mencari kesalahan di dua gambar yang hampir identik) dan hanya mengubah yang perlu diubah. Ini jauh lebih efisien.

---

## Beberapa State Variable

Satu component bisa punya lebih dari satu state. Masing-masing independen dan dikelola sendiri-sendiri.

Misalnya, kita membangun form profil pengguna sederhana:

```jsx
function FormProfil() {
  const [nama, setNama] = React.useState("");
  const [kota, setKota] = React.useState("");
  const [pekerjaan, setPekerjaan] = React.useState("");

  function handleSubmit(e) {
    e.preventDefault();
    console.log({ nama, kota, pekerjaan });
  }

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Nama:</label>
        <input value={nama} onChange={(e) => setNama(e.target.value)} />
      </div>
      <div>
        <label>Kota:</label>
        <input value={kota} onChange={(e) => setKota(e.target.value)} />
      </div>
      <div>
        <label>Pekerjaan:</label>
        <input value={pekerjaan} onChange={(e) => setPekerjaan(e.target.value)} />
      </div>
      <button type="submit">Simpan</button>
    </form>
  );
}
```

Satu hal yang perlu diketahui tentang beberapa state setter yang dipanggil berurutan: React tidak langsung menjalankan re-render setelah setiap pemanggilan. Ia mengumpulkan semua perubahan terlebih dahulu, lalu melakukan satu re-render setelah semua setter selesai dipanggil. Ini disebut **batching**.

```jsx
function handleReset() {
  // Tiga setter ini dipanggil berurutan...
  setNama("");
  setKota("");
  setPekerjaan("");
  // ...tapi React hanya melakukan SATU re-render, bukan tiga
}
```

Ini penting untuk performa — tanpa batching, tiga perubahan kecil bisa memicu tiga re-render yang tidak perlu.

---

## State dan Nilai Awal

Ada satu kasus khusus yang menarik: ketika nilai awal state perlu dihitung dari sesuatu yang "mahal" — misalnya membaca dari `localStorage`.

```jsx
// ❌ Kurang optimal — localStorage dibaca pada SETIAP render
const [preferensi, setPreferensi] = React.useState(
  JSON.parse(localStorage.getItem("preferensi-pengguna")),
);

// ✅ Lebih baik — localStorage hanya dibaca SEKALI, saat pertama render
const [preferensi, setPreferensi] = React.useState(() => {
  return JSON.parse(localStorage.getItem("preferensi-pengguna"));
});
```

Dengan memberikan function sebagai argumen ke `useState` (bukan nilai langsung), React akan memanggil function itu hanya sekali — di render pertama — untuk mendapatkan nilai awal. Pada render-render selanjutnya, function itu diabaikan.

---

## Props vs State: Apa Bedanya?

Ini adalah pertanyaan yang hampir semua orang pernah tanyakan ketika baru belajar React.

**Props** adalah data yang datang dari luar component — diberikan oleh component parent. Props bersifat read-only dari sudut pandang component yang menerimanya. Kamu tidak bisa (dan tidak seharusnya) mengubah nilai props dari dalam component.

**State** adalah data yang dimiliki dan dikelola oleh component itu sendiri. State bisa berubah dari dalam component, dan setiap perubahan state memicu re-render.

Analogi sederhana: bayangkan sebuah mesin kopi. Props adalah bahan-bahan yang kamu masukkan — jenis biji kopi, jumlah air, tingkat kehalusan gilingan. State adalah kondisi internal mesin — suhu saat ini, apakah sedang menyeduh atau tidak, berapa lama lagi prosesnya selesai.

```jsx
// Props: data dari luar, tidak berubah dari dalam component
function KartuProduk({ nama, harga, stok }) {
  // State: data yang dikelola dari dalam component
  const [jumlahDipesan, setJumlahDipesan] = React.useState(1);

  return (
    <div>
      <h3>{nama}</h3>
      <p>Rp {harga.toLocaleString("id-ID")}</p>
      <p>Stok tersisa: {stok}</p>
      <div>
        <button
          onClick={() => setJumlahDipesan(Math.max(1, jumlahDipesan - 1))}
          disabled={jumlahDipesan <= 1}
        >
          −
        </button>
        <span>{jumlahDipesan}</span>
        <button
          onClick={() => setJumlahDipesan(Math.min(stok, jumlahDipesan + 1))}
          disabled={jumlahDipesan >= stok}
        >
          +
        </button>
      </div>
      <button>Tambah ke Keranjang</button>
    </div>
  );
}
```

`nama`, `harga`, dan `stok` adalah props — mereka datang dari luar dan component tidak mengubahnya. `jumlahDipesan` adalah state — ia berubah berdasarkan aksi pengguna, dan perubahannya memicu tampilan yang diperbarui.

---

Di part berikutnya, saya akan lanjutkan dengan topik yang lebih dalam: **forms** di React, termasuk konsep _controlled inputs_, bagaimana menangani berbagai jenis input, dan jebakan-jebakan umum yang perlu diwaspadai.

---

_Tulisan ini adalah catatan belajar saya dari kursus [Joy of React](https://www.joyofreact.com/) milik Josh Comeau. Kalau kamu tertarik belajar React lebih dalam, langsung cek kursusnya — worth it._
