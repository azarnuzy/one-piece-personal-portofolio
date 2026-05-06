# Memahami React Lebih Dalam — Part 8: Complex State dan Lifting State Up

Di dua part sebelumnya kita sudah membahas state untuk nilai-nilai sederhana seperti string dan angka. Tapi di dunia nyata, data yang perlu kita kelola jarang sesederhana itu — biasanya berupa array atau objek, dan kadang keduanya sekaligus.

Di part ini kita akan bahas cara kerja state dengan data kompleks, kenapa **immutability** itu penting, dan bagaimana cara berbagi state antar component dengan teknik yang disebut **lifting state up**.

---

## State Tidak Harus Selalu Primitif

React tidak peduli apa tipe data yang kamu simpan di state. Angka, string, boolean, objek, array — semuanya bisa.

```jsx
// Semua ini valid
const [nama, setNama] = React.useState("Reza");
const [usia, setUsia] = React.useState(28);
const [aktif, setAktif] = React.useState(true);
const [profil, setProfil] = React.useState({ nama: "Reza", kota: "Bandung" });
const [tags, setTags] = React.useState(["React", "JavaScript", "CSS"]);
```

Tapi begitu kita mulai menyimpan objek atau array, ada satu aturan kritis yang harus selalu diingat.

---

## Immutability: Jangan Pernah Mutasi State Langsung

Ini adalah salah satu source of bug yang paling umum di React, terutama untuk yang baru mulai.

**Immutability** berarti: ketika kamu mengubah state, kamu harus memberikan nilai _baru_ ke setter function — bukan mengubah nilai yang sudah ada.

Mari kita lihat contoh yang salah dulu:

```jsx
function DaftarBelanja() {
  const [items, setItems] = React.useState(["Beras", "Telur", "Minyak goreng"]);

  function tambahItem(itemBaru) {
    // ❌ SALAH: Ini memodifikasi array yang sudah ada
    items.push(itemBaru);
    setItems(items); // Masih array yang sama!
  }

  // ...
}
```

Kelihatannya masuk akal — kita tambahkan item ke array, lalu kasih ke setter. Tapi ini tidak akan bekerja seperti yang diharapkan.

Masalahnya: React menentukan apakah perlu re-render dengan membandingkan nilai state lama dengan yang baru. Kalau kita memodifikasi array yang sudah ada, alamat di memorinya tetap sama. Bagi React, tidak ada yang berubah — jadi tidak ada re-render.

Yang benar adalah selalu membuat array atau objek **baru**:

```jsx
function DaftarBelanja() {
  const [items, setItems] = React.useState(["Beras", "Telur", "Minyak goreng"]);

  function tambahItem(itemBaru) {
    // ✅ BENAR: Buat array baru dengan spread operator
    const itemsBaru = [...items, itemBaru];
    setItems(itemsBaru);
  }

  function hapusItem(index) {
    // ✅ BENAR: Buat array baru tanpa item yang dihapus
    const itemsBaru = items.filter((_, i) => i !== index);
    setItems(itemsBaru);
  }

  function ubahItem(index, nilaiBaruq) {
    // ✅ BENAR: Buat array baru dengan satu item yang diubah
    const itemsBaru = items.map((item, i) => (i === index ? nilaiBaruq : item));
    setItems(itemsBaru);
  }

  return (
    <div>
      <ul>
        {items.map((item, index) => (
          <li key={index}>
            {item}
            <button onClick={() => hapusItem(index)}>Hapus</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
```

Pola umumnya:

- **Menambahkan item**: `[...array, itemBaru]`
- **Menghapus item**: `array.filter(...)`
- **Mengubah item**: `array.map(...)`

---

## Immutability untuk Objek

Prinsip yang sama berlaku untuk objek:

```jsx
function FormProfil() {
  const [profil, setProfil] = React.useState({
    nama: "Dina",
    kota: "Surabaya",
    pekerjaan: "Designer",
  });

  function updateKota(kotaBaru) {
    // ❌ SALAH: Memodifikasi objek yang sudah ada
    profil.kota = kotaBaru;
    setProfil(profil);

    // ✅ BENAR: Buat objek baru dengan spread operator
    setProfil({ ...profil, kota: kotaBaru });
  }

  return (
    <div>
      <input value={profil.nama} onChange={(e) => setProfil({ ...profil, nama: e.target.value })} />
      <input value={profil.kota} onChange={(e) => setProfil({ ...profil, kota: e.target.value })} />
      <input
        value={profil.pekerjaan}
        onChange={(e) => setProfil({ ...profil, pekerjaan: e.target.value })}
      />
    </div>
  );
}
```

`{ ...profil, kota: kotaBaru }` membuat objek baru yang menyalin semua properti dari `profil`, lalu menimpa properti `kota` dengan nilai baru. Objek aslinya tidak disentuh.

---

## Contoh Nyata: Manajemen Daftar dengan ID Unik

Sekarang mari kita bangun sesuatu yang lebih realistis: daftar tugas (_todo list_) dengan kemampuan tambah, hapus, dan tandai selesai.

```jsx
function DaftarTugas() {
  const [tugas, setTugas] = React.useState([
    { id: crypto.randomUUID(), teks: "Belajar React", selesai: false },
    { id: crypto.randomUUID(), teks: "Buat project portfolio", selesai: false },
  ]);
  const [inputBaru, setInputBaru] = React.useState("");

  function tambahTugas(e) {
    e.preventDefault();
    if (!inputBaru.trim()) return;

    const tugasBaru = {
      id: crypto.randomUUID(), // ID unik yang stabil
      teks: inputBaru,
      selesai: false,
    };

    setTugas([...tugas, tugasBaru]);
    setInputBaru(""); // Reset input setelah submit
  }

  function toggleSelesai(id) {
    setTugas(tugas.map((t) => (t.id === id ? { ...t, selesai: !t.selesai } : t)));
  }

  function hapusTugas(id) {
    setTugas(tugas.filter((t) => t.id !== id));
  }

  const tugasBelumSelesai = tugas.filter((t) => !t.selesai).length;

  return (
    <div>
      <h2>Daftar Tugas ({tugasBelumSelesai} belum selesai)</h2>

      <form onSubmit={tambahTugas}>
        <input
          type="text"
          value={inputBaru}
          onChange={(e) => setInputBaru(e.target.value)}
          placeholder="Tambah tugas baru..."
        />
        <button type="submit">Tambah</button>
      </form>

      <ul>
        {tugas.map((t) => (
          <li key={t.id} style={{ textDecoration: t.selesai ? "line-through" : "none" }}>
            <input type="checkbox" checked={t.selesai} onChange={() => toggleSelesai(t.id)} />
            {t.teks}
            <button onClick={() => hapusTugas(t.id)}>Hapus</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
```

Perhatikan penggunaan `crypto.randomUUID()` untuk membuat ID yang benar-benar unik dan stabil. Kita buat ID-nya saat item pertama kali dibuat — bukan di dalam `.map()` saat render, karena kalau dibuat saat render, ID akan terus berubah setiap re-render.

---

## Key yang Baik vs Key yang Bermasalah

Bicara soal ID, ini adalah momen yang tepat untuk membahas lebih dalam tentang `key` di konteks state yang berubah.

Ketika kita punya array di state yang bisa ditambah, dihapus, atau diurutkan ulang, pilihan `key` menjadi sangat penting.

**Menggunakan index array sebagai key** adalah jebakan yang umum:

```jsx
// ❌ Bermasalah kalau array bisa berubah urutan atau ada yang dihapus
{
  tugas.map((t, index) => <li key={index}>...</li>);
}
```

Bayangkan kita punya tiga tugas dengan index 0, 1, 2. Ketika kita hapus tugas index 0, yang tadinya index 1 sekarang jadi index 0, yang tadinya index 2 sekarang jadi index 1. React melihat dua element dengan key yang sama (0 dan 1) — tapi dengan konten yang berbeda. Ia akan mengira item di posisi itu "diupdate", bukan bahwa satu item dihapus dari awal.

Ini bisa menyebabkan bug yang halus dan sulit didiagnosis, terutama ketika ada input di dalam list.

**Menggunakan ID yang stabil dan unik** adalah solusi yang benar:

```jsx
// ✅ Stabil dan benar
{
  tugas.map((t) => <li key={t.id}>...</li>);
}
```

Dengan ID yang tidak berubah, React bisa dengan tepat melacak element mana yang dihapus, ditambah, atau dipindah.

---

## Lifting State Up: Berbagi State Antar Component

Sejauh ini kita selalu menaruh state di dalam component yang membutuhkannya. Tapi bagaimana kalau dua atau lebih component sibling perlu mengakses state yang sama?

Jawabannya adalah **lifting state up** — memindahkan state ke component parent yang menjadi "nenek moyang" bersama dari semua component yang membutuhkannya.

Mari kita lihat masalahnya dulu. Misalnya kita punya halaman dengan search form dan hasil pencarian:

```jsx
// ❌ State terisolasi — SearchForm tidak bisa berkomunikasi dengan SearchResults
function Halaman() {
  return (
    <>
      <SearchForm /> {/* State pencarian ada di sini... */}
      <SearchResults /> {/* ...tapi dibutuhkan di sini juga */}
    </>
  );
}

function SearchForm() {
  const [query, setQuery] = React.useState(""); // Terisolasi di sini
  // ...
}

function SearchResults() {
  // Tidak bisa akses `query` dari SearchForm!
  // ...
}
```

Solusinya: angkat state `query` ke `Halaman`, lalu turunkan ke kedua children lewat props.

```jsx
// ✅ State di-lift ke parent
function Halaman() {
  const [query, setQuery] = React.useState("");

  return (
    <>
      <SearchForm query={query} setQuery={setQuery} />
      <SearchResults query={query} />
    </>
  );
}

function SearchForm({ query, setQuery }) {
  function handleSubmit(e) {
    e.preventDefault();
    // query sudah ada, bisa langsung dipakai
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Cari sesuatu..."
      />
      <button type="submit">Cari</button>
    </form>
  );
}

function SearchResults({ query }) {
  if (!query) {
    return <p>Masukkan kata kunci untuk mulai mencari.</p>;
  }

  // Tampilkan hasil pencarian berdasarkan query
  return (
    <div>
      <p>
        Menampilkan hasil untuk: <strong>{query}</strong>
      </p>
      {/* ... */}
    </div>
  );
}
```

Alur datanya sekarang jelas:

1. State `query` ada di `Halaman`
2. `Halaman` memberikan `query` dan `setQuery` ke `SearchForm` lewat props
3. `SearchForm` menggunakan `setQuery` untuk mengubah state di parent
4. `Halaman` juga memberikan `query` ke `SearchResults` lewat props
5. Perubahan `query` otomatis ter-reflect di kedua component

### Kapan Harus Lift State?

Aturan praktisnya: **simpan state serendah mungkin**, tapi angkat ke atas ketika lebih dari satu component membutuhkannya.

Jangan langsung angkat semua state ke root component — itu akan membuat aplikasi lambat karena setiap perubahan state sekecil apapun akan memicu re-render seluruh pohon component.

---

## Contoh Nyata: Keranjang Belanja Sederhana

Mari kita satukan semuanya dalam contoh yang lebih mendekati dunia nyata — halaman produk dengan keranjang belanja:

```jsx
// State keranjang ada di sini karena dibutuhkan oleh DaftarProduk DAN RingkasanKeranjang
function HalamanBelanja() {
  const [keranjang, setKeranjang] = React.useState([]);

  function tambahKeKeranjang(produk) {
    const sudahAda = keranjang.find((item) => item.id === produk.id);

    if (sudahAda) {
      // Kalau sudah ada, tambah kuantitasnya
      setKeranjang(
        keranjang.map((item) =>
          item.id === produk.id ? { ...item, kuantitas: item.kuantitas + 1 } : item,
        ),
      );
    } else {
      // Kalau belum ada, tambahkan sebagai item baru
      setKeranjang([...keranjang, { ...produk, kuantitas: 1 }]);
    }
  }

  function hapusDariKeranjang(produkId) {
    setKeranjang(keranjang.filter((item) => item.id !== produkId));
  }

  const totalItem = keranjang.reduce((total, item) => total + item.kuantitas, 0);
  const totalHarga = keranjang.reduce((total, item) => total + item.harga * item.kuantitas, 0);

  return (
    <div>
      <header>
        <h1>Toko Kami</h1>
        <span>Keranjang: {totalItem} item</span>
      </header>

      <main>
        <DaftarProduk onTambahProduk={tambahKeKeranjang} />
        <RingkasanKeranjang
          keranjang={keranjang}
          totalHarga={totalHarga}
          onHapusProduk={hapusDariKeranjang}
        />
      </main>
    </div>
  );
}

function DaftarProduk({ onTambahProduk }) {
  const produk = [
    { id: "p1", nama: "Kemeja Flanel", harga: 185000 },
    { id: "p2", nama: "Celana Jogger", harga: 220000 },
    { id: "p3", nama: "Topi Baseball", harga: 95000 },
  ];

  return (
    <div>
      <h2>Produk</h2>
      {produk.map((p) => (
        <div key={p.id}>
          <span>{p.nama}</span>
          <span>Rp {p.harga.toLocaleString("id-ID")}</span>
          <button onClick={() => onTambahProduk(p)}>+ Keranjang</button>
        </div>
      ))}
    </div>
  );
}

function RingkasanKeranjang({ keranjang, totalHarga, onHapusProduk }) {
  if (keranjang.length === 0) {
    return (
      <div>
        <h2>Keranjang</h2>
        <p>Keranjang masih kosong.</p>
      </div>
    );
  }

  return (
    <div>
      <h2>Keranjang</h2>
      <ul>
        {keranjang.map((item) => (
          <li key={item.id}>
            <span>{item.nama}</span>
            <span>x{item.kuantitas}</span>
            <span>Rp {(item.harga * item.kuantitas).toLocaleString("id-ID")}</span>
            <button onClick={() => onHapusProduk(item.id)}>Hapus</button>
          </li>
        ))}
      </ul>
      <strong>Total: Rp {totalHarga.toLocaleString("id-ID")}</strong>
    </div>
  );
}
```

Di sini, `keranjang` adalah state yang di-lift ke `HalamanBelanja` karena dibutuhkan oleh dua component sekaligus. `DaftarProduk` perlu mengubahnya (tambah item), dan `RingkasanKeranjang` perlu membacanya (tampilkan isi keranjang dan total).

---

## Ringkasan Pola yang Perlu Diingat

Setelah tiga part ini, ada beberapa pola yang perlu menjadi refleks:

1. **Selalu buat nilai baru** saat mengubah array atau objek di state — jangan pernah mutasi langsung.
2. **Gunakan ID yang stabil dan unik** sebagai `key` ketika array bisa berubah.
3. **Simpan state serendah mungkin** — angkat ke parent hanya ketika dibutuhkan oleh lebih dari satu component.
4. **Props adalah terowongan data** — cara satu-satunya state mengalir antar component adalah melalui props, dari parent ke child.

---

Seri ini akan berlanjut ke topik-topik yang lebih lanjut di React: hooks tambahan, side effects, dan bagaimana React benar-benar mengelola siklus hidup sebuah component.

---

_Tulisan ini adalah catatan belajar saya dari kursus [Joy of React](https://www.joyofreact.com/) milik Josh Comeau. Kalau kamu tertarik belajar React lebih dalam, langsung cek kursusnya — worth it._
