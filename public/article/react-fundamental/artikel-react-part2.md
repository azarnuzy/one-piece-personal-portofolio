# Memahami React Lebih Dalam — Part 3: Components dan Props

Kalau kamu tanya ke orang-orang tentang apa itu React, jawaban yang paling sering muncul adalah: "React itu component-based framework." Dan itu benar. Tapi saya pikir banyak dari kita yang menggunakan React setiap hari tanpa benar-benar memahami _kenapa_ model component-based ini begitu powerful.

Di part ini saya mau coba bahas itu dari bawah.

---

## Apa Itu Component, Sebenarnya?

Cara saya mendefinisikan component: ia adalah **bundel dari markup, styles, dan logic** yang menangani satu bagian spesifik dari user interface.

Ini berbeda dari cara tradisional mengorganisasi kode web, di mana kita memisahkan segalanya berdasarkan tipe teknologinya — HTML di satu file, CSS di file lain, JavaScript di file lain lagi. Dengan component, kita mengorganisasi kode berdasarkan _fitur_ atau _bagian UI_, bukan berdasarkan jenis file.

Hasilnya? Setiap bagian UI menjadi sebuah unit yang berdiri sendiri. Mau pakai badge yang sama di tiga halaman berbeda? Tinggal pakai component yang sama. Mau ubah tampilannya? Ubah di satu tempat, langsung berlaku di mana-mana.

---

## Syntax Dasar

Di React, component didefinisikan sebagai fungsi JavaScript yang mengembalikan JSX:

```jsx
function StatusBadge() {
  return (
    <span
      style={{
        padding: "4px 10px",
        borderRadius: "99px",
        backgroundColor: "#e8f5e9",
        color: "#2e7d32",
        fontSize: "0.8rem",
      }}
    >
      Aktif
    </span>
  );
}
```

Untuk me-render component ini, kita gunakan sintaks yang mirip seperti HTML tag:

```jsx
root.render(<StatusBadge />);
```

Ada satu aturan penting yang tidak boleh dilanggar: **nama component harus dimulai dengan huruf kapital**.

Kenapa? Karena JSX compiler menggunakan casing untuk membedakan antara HTML tag bawaan dengan custom component. Ketika compiler melihat `<span>`, ia tahu ini adalah DOM element. Ketika melihat `<StatusBadge>`, ia tahu ini adalah component function yang perlu dipanggil.

Kalau kamu tulis `<statusbadge>`, compiler akan menganggapnya sebagai HTML tag yang tidak dikenal — bukan component.

---

## Props: Cara Mengoper Data ke Component

Component tanpa props seperti fungsi tanpa parameter — dia selalu menghasilkan output yang sama, tidak peduli konteksnya.

Props adalah cara kita mengoper data ke dalam component. Secara konsep, props bekerja persis seperti argumen fungsi. React mengumpulkan semua props yang kamu tulis pada sebuah element menjadi satu objek, lalu mengopernya sebagai argumen pertama ke fungsi component tersebut.

```jsx
function StatusBadge({ label, color }) {
  return (
    <span
      style={{
        padding: '4px 10px',
        borderRadius: '99px',
        backgroundColor: color,
        fontSize: '0.8rem',
      }}
    >
      {label}
    </span>
  );
}

// Penggunaannya:
<StatusBadge label="Aktif" color="#e8f5e9" />
<StatusBadge label="Nonaktif" color="#fce4ec" />
<StatusBadge label="Pending" color="#fff8e1" />
```

Di sini saya menggunakan _destructuring assignment_ langsung di parameter fungsi — ini cara yang paling umum digunakan di komunitas React. Alternatifnya adalah menerima seluruh objek props:

```jsx
function StatusBadge(props) {
  return <span style={{ backgroundColor: props.color }}>{props.label}</span>;
}
```

Kedua cara ini valid, tapi destructuring lebih banyak dipakai karena lebih bersih dibaca.

---

## Default Values

Sering kali kita perlu memberikan nilai fallback untuk sebuah prop — misalnya ketika kita tidak yakin apakah data tersebut akan selalu tersedia.

Yang paling clean adalah langsung menetapkan default value di dalam destructuring:

```jsx
function Avatar({ src, size = 40, alt = 'Foto profil' }) {
  return (
    <img
      src={src}
      alt={alt}
      width={size}
      height={size}
      style={{ borderRadius: '50%' }}
    />
  );
}

<Avatar src="/img/user.png" />           // size = 40, alt = 'Foto profil'
<Avatar src="/img/user.png" size={80} /> // size = 80, alt = 'Foto profil'
```

Ini lebih baik dibanding menggunakan operator `||`:

```jsx
// Hindari ini kalau bisa
function Avatar({ src, size, alt }) {
  const finalSize = size || 40; // Bermasalah kalau size = 0
  // ...
}
```

Kenapa? Karena `||` akan menggunakan fallback untuk _semua_ nilai falsy — termasuk angka `0` atau string kosong `''` — yang kadang bukan yang kita inginkan. Dengan default value di destructuring, fallback hanya aktif ketika nilai prop tersebut benar-benar `undefined`.

---

## The Children Prop

Ada satu prop yang spesial: `children`.

Ketika kamu menaruh konten di antara opening dan closing tag sebuah component, React secara otomatis menyimpannya sebagai prop `children`:

```jsx
function Card({ children }) {
  return (
    <div
      style={{
        padding: "16px",
        borderRadius: "8px",
        border: "1px solid #e0e0e0",
        boxShadow: "0 2px 4px rgba(0,0,0,0.05)",
      }}
    >
      {children}
    </div>
  );
}

// Penggunaannya:
<Card>
  <h3>Judul Konten</h3>
  <p>Ini bisa berisi apa saja — teks, gambar, component lain.</p>
</Card>;
```

Ini membuat penggunaan component terasa lebih natural — mirip seperti cara kita menulis HTML biasa. Dan `children` sebenarnya tidak berbeda dari prop lainnya. Kamu bahkan bisa mengopernya dengan cara "tradisional":

```jsx
// Ini ekuivalen tapi tidak ada yang nulis begini
<Card children={<p>Isi konten</p>} />
```

---

## Memecah Component: Kapan dan Bagaimana

Salah satu skill terpenting dalam bekerja dengan React adalah tahu kapan harus memecah UI menjadi component yang lebih kecil.

Misalnya, kita punya halaman yang menampilkan beberapa produk:

```jsx
// Sebelum: repetitif dan sulit di-maintain
<ul>
  <li className="product-item">
    <img src="/img/kaos.jpg" alt="Kaos polos" />
    <h3>Kaos Polos</h3>
    <p>Rp 85.000</p>
  </li>
  <li className="product-item">
    <img src="/img/celana.jpg" alt="Celana chino" />
    <h3>Celana Chino</h3>
    <p>Rp 210.000</p>
  </li>
  {/* terus berulang... */}
</ul>
```

Setelah di-extract menjadi component:

```jsx
function ProductItem({ name, price, imageSrc, imageAlt }) {
  return (
    <li className="product-item">
      <img src={imageSrc} alt={imageAlt} />
      <h3>{name}</h3>
      <p>{price}</p>
    </li>
  );
}

// Penggunaannya:
<ul>
  <ProductItem name="Kaos Polos" price="Rp 85.000" imageSrc="/img/kaos.jpg" imageAlt="Kaos polos" />
  <ProductItem
    name="Celana Chino"
    price="Rp 210.000"
    imageSrc="/img/celana.jpg"
    imageAlt="Celana chino"
  />
</ul>;
```

Jauh lebih bersih. Dan ketika ada perubahan desain, kita hanya perlu mengubah satu tempat.

---

## Struktur Aplikasi React

Hampir semua aplikasi React punya struktur yang serupa, dan saya rasa penting untuk memahaminya sejak awal.

**`index.js`** — Titik masuk aplikasi. Di sinilah `createRoot` dan `render` dipanggil. Biasanya hanya ada satu pemanggilan `createRoot` dalam seluruh codebase. File ini juga tempat yang tepat untuk setup global seperti import CSS atau konfigurasi error logging.

**`App.js`** — "Home base" dari aplikasi React. Semua component lain, kalau ditelusuri ke atas, akan bermuara ke component `App` ini. Di sini biasanya ada layout inti seperti navbar dan footer, dan kalau menggunakan routing, top-level routes juga biasanya ada di sini.

**Component files** — Setiap component biasanya punya file sendiri, di-export sebagai default, dan di-import oleh component lain yang membutuhkannya.

```javascript
// App.js
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

function App() {
  return (
    <div>
      <Navbar />
      <main>{/* konten halaman */}</main>
      <Footer />
    </div>
  );
}

export default App;
```

---

## Fragment: Solusi untuk Multiple Root Elements

Ada aturan di React: setiap component hanya bisa return satu root element. Kode ini akan error:

```jsx
function UserInfo() {
  return (
    <h2>Budi Santoso</h2>
    <p>Frontend Developer</p>
  );
}
```

Solusi naif adalah membungkusnya dengan `<div>`. Tapi ini akan menambahkan elemen yang tidak perlu ke DOM, yang terkadang bisa merusak layout — terutama kalau kamu pakai Flexbox atau Grid.

Solusi yang benar adalah menggunakan **Fragment**:

```jsx
function UserInfo() {
  return (
    <>
      <h2>Budi Santoso</h2>
      <p>Frontend Developer</p>
    </>
  );
}
```

Fragment adalah component React khusus yang tidak menghasilkan DOM node. Bisa juga ditulis sebagai `<React.Fragment>` — bentuk panjang ini dibutuhkan ketika kamu perlu menambahkan `key` prop, yang akan kita bahas di part berikutnya.

---

Di bagian berikutnya, saya akan membahas salah satu topik yang paling sering digunakan dalam React: **iteration** — bagaimana kita me-render data dinamis yang berbentuk array, dan kenapa `key` itu begitu penting.

---

_Tulisan ini adalah catatan belajar saya dari kursus [Joy of React](https://www.joyofreact.com/) milik Josh Comeau. Kalau kamu tertarik belajar React lebih dalam, langsung cek kursusnya — worth it._
