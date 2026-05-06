# Memahami React Lebih Dalam — Part 1

Dua tahun bukan waktu yang sebentar. Dalam dua tahun itu saya sudah cukup nyaman menulis component, mengurus state, dan membangun fitur-fitur yang diminta. Tapi suatu titik, saya mulai merasa ada yang mengganjal — saya bisa menggunakan React, tapi saya tidak yakin saya benar-benar _memahami_ React.

Perbedaan antara dua hal itu terasa kecil sampai kamu ketemu masalah yang tidak bisa diselesaikan dengan googling cepat. Atau sampai seseorang di code review bertanya "kenapa kamu melakukan ini dengan cara ini?" dan kamu tidak punya jawaban yang lebih baik selain "karena biasanya begini caranya."

Jadi saya memutuskan untuk mundur sebentar dan belajar dari bawah lagi. Bukan dari dokumentasi resmi yang langsung masuk ke hooks dan state management, tapi dari pertanyaan paling dasar: _React itu sebenarnya ngapain?_

---

## Mulai dari Yang Paling Sederhana

Hal pertama yang saya coba lakukan adalah membangun versi sederhana dari apa yang React lakukan — sebuah `render` function yang mengambil deskripsi sebuah elemen dan menghasilkan DOM node yang nyata.

Saya mulai dengan function signature seperti ini:

```javascript
function render(reactElement, containerDOMElement) {
  /* implementasi di sini */
}
```

Dan sebuah objek yang merepresentasikan element yang ingin dibuat. Dalam kasus ini, saya pakai contoh sebuah `<button>`:

```javascript
const reactElement = {
  type: "button",
  props: {
    id: "submit-btn",
  },
  children: "Kirim Formulir",
};

const containerDOMElement = document.querySelector("#root");

render(reactElement, containerDOMElement);
```

Tugasnya sederhana: ambil objek tersebut, buat elemen DOM yang sesuai, dan masukkan ke dalam container.

---

## Implementasinya

Setelah dipikir-pikir, ada tiga langkah yang perlu dilakukan:

```javascript
function render(reactElement, containerDOMElement) {
  // 1. Buat DOM element berdasarkan type-nya
  const domElement = document.createElement(reactElement.type);

  // 2. Set konten teks dan semua atributnya
  domElement.innerText = reactElement.children;
  for (const key in reactElement.props) {
    const value = reactElement.props[key];
    domElement.setAttribute(key, value);
  }

  // 3. Masukkan ke dalam container
  containerDOMElement.appendChild(domElement);
}
```

Sesederhana itu. Tiga langkah, masing-masing cukup straightforward kalau dilihat satu per satu.

Yang menarik dari exercise ini bukan kodenya — tapi _apa yang kamu sadari_ setelah menulisnya. React pada dasarnya melakukan hal yang sama: ia mengambil deskripsi tentang apa yang ingin ditampilkan, lalu menerjemahkannya menjadi operasi DOM yang nyata. Semua hal lain yang kita kenal dari React — JSX, components, hooks — semuanya duduk di atas fondasi yang sesederhana ini.

Tentu saja implementasi React yang sebenarnya jauh lebih kompleks. Ia menangani nested elements, event handling, reconciliation, dan puluhan hal lain. Tapi model mentalnya dimulai dari sini.

---

## React Element Itu Hanya Objek JavaScript

Satu hal yang langsung saya perhatikan: `reactElement` yang kita buat hanyalah sebuah objek JavaScript biasa. Tidak ada yang magic. Hanya objek dengan beberapa properti yang sudah disepakati maknanya.

Dan ketika kita menggunakan React yang sesungguhnya, hal yang sama terjadi di balik layar. React menyediakan cara yang jauh lebih nyaman untuk mendeskripsikan elemen yang ingin kita buat — itulah yang nantinya kita kenal sebagai **JSX**.

Kalau kamu ingin membuktikannya sendiri, coba `console.log` sebuah JSX element di proyek React apapun:

```javascript
const element = <p>Halo dari React</p>;
console.log(element);
```

Yang muncul di console bukan elemen DOM. Melainkan objek JavaScript seperti ini:

```javascript
{
  type: 'p',
  key: null,
  props: {
    children: 'Halo dari React'
  },
  _owner: null,
  _store: {}
}
```

Itu dia. Tidak lebih, tidak kurang.

---

## Kenapa Ini Penting

Saya sadar mungkin terlihat agak aneh memulai belajar React dengan membangun versi primitifnya sendiri. Kenapa tidak langsung masuk ke components dan useState?

Jawabannya: karena model mental yang kamu bangun di awal sangat mempengaruhi bagaimana kamu nanti memahami hal-hal yang lebih kompleks.

Kalau kamu langsung masuk ke JSX dan components tanpa memahami apa yang ada di bawahnya, kamu akan bisa _menggunakan_ React tapi banyak hal akan terasa magic. Dan magic yang tidak kamu mengerti adalah sumber kebingungan yang paling sulit diatasi — karena kamu tidak tahu dari mana harus mulai mencari masalahnya.

Dengan mengetahui bahwa React element hanyalah objek JavaScript, dan bahwa proses render pada akhirnya hanyalah mengubah objek-objek itu menjadi DOM node, banyak hal yang tadinya membingungkan jadi punya penjelasan yang masuk akal.

Itulah yang sedang coba saya lakukan di seri tulisan ini — bukan menghafal API atau syntax, tapi membangun pemahaman dari bawah yang membuat saya bisa berpikir tentang React, bukan hanya menulis React.

---

Di part selanjutnya, saya akan mulai membahas **JSX** — cara yang React sediakan untuk mendeskripsikan elemen tanpa harus menulis objek JavaScript secara manual. Dan saya akan coba jelaskan bukan hanya _cara pakainya_, tapi _kenapa ia bekerja seperti itu_.

---

_Tulisan ini adalah catatan belajar saya dari kursus [Joy of React](https://www.joyofreact.com/) milik Josh Comeau. Kalau kamu tertarik belajar React lebih dalam, langsung cek kursusnya — worth it._
