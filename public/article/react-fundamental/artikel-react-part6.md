# Memahami React Lebih Dalam — Part 7: Forms dan Controlled Inputs

Forms adalah salah satu hal yang paling sering membuat developer baru di React garuk-garuk kepala. Bukan karena React membuat forms jadi lebih sulit — justru sebaliknya — tapi karena ada beberapa konsep yang perlu dipahami dulu supaya semuanya masuk akal.

Di part ini kita akan bahas cara kerja forms di React dari bawah, termasuk konsep _controlled inputs_ yang menjadi fondasi dari hampir semua form di React.

---

## Masalah dengan Pendekatan "Klik Tombol Saja"

Bayangkan kita membangun form pencarian. Naluri pertama banyak developer adalah: "pasang onClick di tombol Search, lalu baca nilai input-nya."

```jsx
// ❌ Pendekatan yang bermasalah
function FormCari() {
  return (
    <div>
      <input type="text" id="kata-kunci" />
      <button
        onClick={() => {
          // Bagaimana cara baca nilai input-nya?
          // Kita harus sentuh DOM langsung — ini bukan cara React
          const nilai = document.querySelector("#kata-kunci").value;
          console.log(nilai);
        }}
      >
        Cari
      </button>
    </div>
  );
}
```

Ada beberapa masalah di sini. Pertama, kita menyentuh DOM secara langsung dengan `querySelector` — sesuatu yang sebaiknya dihindari di React. Kedua, pendekatan ini hanya menangani kasus klik tombol. Apa yang terjadi kalau pengguna menekan Enter setelah mengetik? Kita harus tambahkan listener baru. Lalu apa kalau ada validasi real-time yang perlu ditampilkan?

Solusi yang lebih baik melibatkan dua hal: `<form>` dan state.

---

## Controlled Inputs: React yang Pegang Kemudi

Konsep _controlled input_ adalah inti dari cara kerja forms di React.

Pada input HTML biasa, browser yang menyimpan nilai input. Pengguna mengetik, browser memperbarui tampilan, dan kita baru bisa tahu nilainya kalau ditanya.

Dengan controlled input, kita membalik kendali itu. **React yang menyimpan nilai input**, dan browser hanya menampilkan apa yang React katakan untuk ditampilkan.

Ini terlihat seperti ini:

```jsx
function FormCari() {
  const [katakunci, setKatakunci] = React.useState("");

  return (
    <div>
      <input type="text" value={katakunci} onChange={(e) => setKatakunci(e.target.value)} />
      <p>Kamu mengetik: {katakunci}</p>
    </div>
  );
}
```

Ada dua bagian yang bekerja bersama:

**`value={katakunci}`** — Ini mengunci tampilan input ke nilai yang ada di state React. Input tidak bisa menampilkan sesuatu yang berbeda dari nilai ini.

**`onChange={(e) => setKatakunci(e.target.value)}`** — Ini memperbarui state setiap kali pengguna mengetik sesuatu. Tanpa ini, input akan terasa "beku" karena pengguna mengetik tapi `value` tidak pernah berubah.

Kedua bagian ini harus ada bersama-sama. Satu saja tidak cukup.

### Alur Lengkapnya

Mari kita telusuri apa yang terjadi ketika pengguna mengetik huruf "R":

1. Pengguna menekan tombol "R"
2. Browser menangkap event ini dan melepaskan event `change`
3. Handler `onChange` kita dipanggil
4. Kita memanggil `setKatakunci('R')` (atau apapun nilai sebelumnya + 'R')
5. React menjadwalkan re-render
6. Component di-render ulang dengan nilai state yang baru
7. Input menampilkan nilai terbaru

Pada poin 7, React sebenarnya hampir tidak melakukan apa-apa — karena browser sudah menampilkan 'R' secara sementara. Yang React lakukan adalah memastikan bahwa nilai yang ditampilkan konsisten dengan apa yang ada di state.

---

## Menggunakan Form dengan onSubmit

Daripada mendengarkan klik tombol satu per satu, pendekatan yang jauh lebih baik adalah membungkus semua kontrol di dalam `<form>` dan mendengarkan event `submit`.

```jsx
function FormCari({ onCari }) {
  const [katakunci, setKatakunci] = React.useState("");

  function handleSubmit(e) {
    e.preventDefault(); // Cegah reload halaman
    onCari(katakunci);
  }

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="input-cari">Cari produk:</label>
      <input
        id="input-cari"
        type="text"
        value={katakunci}
        onChange={(e) => setKatakunci(e.target.value)}
        placeholder="Masukkan nama produk..."
      />
      <button type="submit">Cari</button>
    </form>
  );
}
```

Dengan `<form>` dan `onSubmit`, kita mendapatkan beberapa hal sekaligus:

- Klik tombol Submit akan memicu event submit
- Menekan Enter ketika input sedang fokus juga akan memicu event submit
- Browser bisa melakukan validasi bawaan (`required`, `minLength`, dll.)

`e.preventDefault()` sangat penting di sini. Secara default, form HTML akan mengirim pengguna ke URL yang ditentukan di atribut `action` — atau me-reload halaman kalau `action` tidak ada. Kita hampir selalu tidak mau itu terjadi di aplikasi React.

---

## Jebakan: Controlled vs Uncontrolled

Ada satu kesalahan umum yang perlu diwaspadai. Perhatikan kode ini:

```jsx
// ❌ Ini akan memunculkan warning di console
function FormPendaftaran() {
  const [email, setEmail] = React.useState(); // Tidak ada nilai awal!

  return <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />;
}
```

Masalahnya: ketika `email` adalah `undefined`, React memperlakukan input sebagai _uncontrolled_. Ketika pengguna mulai mengetik dan kita memanggil `setEmail`, nilainya berubah dari `undefined` ke string — React mendeteksi perpindahan dari uncontrolled ke controlled, dan memunculkan warning.

Aturan sederhananya: **selalu berikan nilai awal yang defined**.

```jsx
// ✅ Benar — selalu ada nilai awal
const [email, setEmail] = React.useState(""); // string kosong
const [usia, setUsia] = React.useState(0); // angka
const [setuju, setSetuju] = React.useState(false); // boolean
```

String kosong `''` tidak sama dengan `undefined`. React akan memperlakukan `value=""` sebagai controlled input dengan nilai kosong — persis yang kita inginkan.

---

## Berbagai Jenis Input

Yang membuat React lebih menyenangkan dibanding HTML vanilla adalah konsistensi cara kerja berbagai jenis input.

### Select (Dropdown)

Di HTML vanilla, kita menandai pilihan yang terpilih dengan atribut `selected` di `<option>`. Di React, kita cukup set `value` di `<select>`:

```jsx
function PilihProvinsi() {
  const [provinsi, setProvinsi] = React.useState("");

  const daftarProvinsi = [
    { kode: "DKI", nama: "DKI Jakarta" },
    { kode: "JBR", nama: "Jawa Barat" },
    { kode: "JTG", nama: "Jawa Tengah" },
    { kode: "JTM", nama: "Jawa Timur" },
    { kode: "BLI", nama: "Bali" },
  ];

  return (
    <div>
      <label htmlFor="pilih-provinsi">Provinsi:</label>
      <select id="pilih-provinsi" value={provinsi} onChange={(e) => setProvinsi(e.target.value)}>
        <option value="">— Pilih Provinsi —</option>
        {daftarProvinsi.map((prov) => (
          <option key={prov.kode} value={prov.kode}>
            {prov.nama}
          </option>
        ))}
      </select>
      {provinsi && <p>Kamu memilih: {provinsi}</p>}
    </div>
  );
}
```

Pola yang sama persis dengan text input: `value` + `onChange`.

### Radio Buttons

Radio buttons sedikit lebih rumit karena satu state dibagi ke beberapa elemen input yang berbeda. Tapi polanya masih sama.

Alih-alih `value`, kita menggunakan `checked` — sebuah boolean yang menentukan apakah radio button ini yang sedang dipilih:

```jsx
function PilihPengiriman() {
  const [metodePengiriman, setMetodePengiriman] = React.useState("reguler");

  const pilihanPengiriman = [
    { id: "reguler", label: "Reguler (3-5 hari)", harga: 15000 },
    { id: "express", label: "Express (1-2 hari)", harga: 35000 },
    { id: "same-day", label: "Same Day (hari ini)", harga: 65000 },
  ];

  return (
    <fieldset>
      <legend>Pilih Metode Pengiriman:</legend>
      {pilihanPengiriman.map((pilihan) => (
        <div key={pilihan.id}>
          <input
            type="radio"
            id={`pengiriman-${pilihan.id}`}
            name="metode-pengiriman"
            value={pilihan.id}
            checked={metodePengiriman === pilihan.id}
            onChange={(e) => setMetodePengiriman(e.target.value)}
          />
          <label htmlFor={`pengiriman-${pilihan.id}`}>
            {pilihan.label} — Rp {pilihan.harga.toLocaleString("id-ID")}
          </label>
        </div>
      ))}
    </fieldset>
  );
}
```

Beberapa hal yang perlu diperhatikan:

- `name` harus sama untuk semua radio button dalam satu grup — ini memberitahu browser bahwa mereka adalah satu kesatuan
- `value` adalah nilai yang akan masuk ke state ketika radio button ini dipilih
- `checked` dihitung dengan membandingkan `value` radio button dengan nilai state saat ini

### Checkbox

Checkbox sedikit berbeda dari input lainnya karena ia mewakili boolean — terpilih atau tidak. Kita menggunakan `checked` bukan `value`:

```jsx
function FormPersetujuan() {
  const [setujuSyarat, setSetujuSyarat] = React.useState(false);
  const [daftarNewsletter, setDaftarNewsletter] = React.useState(false);

  return (
    <form>
      <div>
        <input
          type="checkbox"
          id="setuju-syarat"
          checked={setujuSyarat}
          onChange={(e) => setSetujuSyarat(e.target.checked)}
          // Perhatikan: e.target.checked, bukan e.target.value
        />
        <label htmlFor="setuju-syarat">Saya setuju dengan syarat dan ketentuan</label>
      </div>

      <div>
        <input
          type="checkbox"
          id="daftar-newsletter"
          checked={daftarNewsletter}
          onChange={(e) => setDaftarNewsletter(e.target.checked)}
        />
        <label htmlFor="daftar-newsletter">Daftarkan saya ke newsletter</label>
      </div>

      <button type="submit" disabled={!setujuSyarat}>
        Daftar Sekarang
      </button>
    </form>
  );
}
```

Perhatikan perbedaan kecil tapi penting: untuk checkbox, kita baca `e.target.checked` (boolean), bukan `e.target.value` (string).

---

## Contoh: Form yang Lebih Lengkap

Mari kita satukan semua yang kita pelajari dalam satu form yang lebih realistis — form checkout sederhana:

```jsx
function FormCheckout({ onSelesai }) {
  const [namaLengkap, setNamaLengkap] = React.useState("");
  const [alamat, setAlamat] = React.useState("");
  const [kodePos, setKodePos] = React.useState("");
  const [metodeBayar, setMetodeBayar] = React.useState("transfer");
  const [simpanAlamat, setSimpanAlamat] = React.useState(false);

  function handleSubmit(e) {
    e.preventDefault();

    const dataOrder = {
      namaLengkap,
      alamat,
      kodePos,
      metodeBayar,
      simpanAlamat,
    };

    onSelesai(dataOrder);
  }

  return (
    <form onSubmit={handleSubmit}>
      <h2>Detail Pengiriman</h2>

      <div>
        <label htmlFor="nama-lengkap">Nama Lengkap:</label>
        <input
          id="nama-lengkap"
          type="text"
          required
          value={namaLengkap}
          onChange={(e) => setNamaLengkap(e.target.value)}
        />
      </div>

      <div>
        <label htmlFor="alamat">Alamat Lengkap:</label>
        <textarea
          id="alamat"
          required
          value={alamat}
          onChange={(e) => setAlamat(e.target.value)}
          rows={4}
        />
      </div>

      <div>
        <label htmlFor="kode-pos">Kode Pos:</label>
        <input
          id="kode-pos"
          type="text"
          required
          maxLength={5}
          pattern="[0-9]{5}"
          value={kodePos}
          onChange={(e) => setKodePos(e.target.value)}
        />
      </div>

      <fieldset>
        <legend>Metode Pembayaran:</legend>
        {["transfer", "kartu-kredit", "dompet-digital"].map((metode) => (
          <div key={metode}>
            <input
              type="radio"
              id={`bayar-${metode}`}
              name="metode-bayar"
              value={metode}
              checked={metodeBayar === metode}
              onChange={(e) => setMetodeBayar(e.target.value)}
            />
            <label htmlFor={`bayar-${metode}`}>
              {metode === "transfer" && "Transfer Bank"}
              {metode === "kartu-kredit" && "Kartu Kredit/Debit"}
              {metode === "dompet-digital" && "Dompet Digital"}
            </label>
          </div>
        ))}
      </fieldset>

      <div>
        <input
          type="checkbox"
          id="simpan-alamat"
          checked={simpanAlamat}
          onChange={(e) => setSimpanAlamat(e.target.checked)}
        />
        <label htmlFor="simpan-alamat">Simpan alamat ini untuk pembelian berikutnya</label>
      </div>

      <button type="submit">Lanjut ke Pembayaran</button>
    </form>
  );
}
```

Perhatikan betapa konsistennya pola yang digunakan — `value` (atau `checked`) untuk binding ke state, `onChange` untuk memperbarui state. Begitu paham konsepnya, menambahkan input baru ke form menjadi sangat mekanis.

---

## Textarea: Tidak Seperti HTML Biasa

Satu hal yang mungkin tidak terduga: di HTML, nilai textarea ditentukan sebagai konten di dalamnya:

```html
<!-- HTML biasa -->
<textarea>Ini nilai awalnya</textarea>
```

Di React, textarea diperlakukan sama seperti input biasa — menggunakan prop `value`:

```jsx
// React
<textarea value={isiPesan} onChange={(e) => setIsiPesan(e.target.value)} />
```

Ini adalah salah satu cara React menyederhanakan berbagai jenis form control — semuanya menggunakan pola yang sama, jadi tidak perlu mengingat cara yang berbeda-beda.

---

Di part berikutnya, kita akan membahas topik yang menurut saya sangat menarik: **Complex State** — bagaimana menyimpan array dan objek di dalam state React, dan mengapa konsep **immutability** menjadi sangat penting ketika kita bekerja dengan data yang lebih kompleks dari sekadar angka atau string.

---

_Tulisan ini adalah catatan belajar saya dari kursus [Joy of React](https://www.joyofreact.com/) milik Josh Comeau. Kalau kamu tertarik belajar React lebih dalam, langsung cek kursusnya — worth it._
