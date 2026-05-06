# Memahami React Lebih Dalam — Part 2: JSX Bukan Sihir

Setelah di part sebelumnya saya coba untuk membangun versi sederhana dari `render` function milik React secara manual, sekarang saya mau masuk ke hal yang selama ini saya pakai tiap hari tapi sebetulnya tidak benar-benar saya pahami: **JSX**.

Kalau kamu sudah cukup lama pakai React, pasti sudah sangat familiar dengan sintaks seperti ini:

```jsx
const element = <section>Selamat datang</section>;
```

Terlihat seperti HTML. Tapi bukan HTML. Dan saya rasa banyak dari kita — termasuk saya sendiri waktu awal-awal — terlalu cepat menerima JSX sebagai "ya sudah, begini caranya nulis React" tanpa benar-benar mengerti apa yang sedang terjadi di baliknya.

---

## JSX Itu Cuma Shortcut

Hal pertama yang perlu dipahami: JSX dikompilasi menjadi JavaScript biasa. Setiap kali kamu menulis JSX, sebenarnya itu akan diubah menjadi pemanggilan `React.createElement()`. Contohnya:

```jsx
// Yang kamu tulis:
const element = <h2>Profil Pengguna</h2>;

// Yang sebenarnya dijalankan:
const element = React.createElement("h2", {}, "Profil Pengguna");
```

Artinya, JSX itu murni _syntactic sugar_. Dia bukan bahasa baru, bukan extension dari HTML. Dia hanya cara yang lebih manusiawi untuk menulis `React.createElement()` yang notabene cukup verbose kalau ditulis terus-menerus.

Ini sebenarnya menjelaskan banyak hal yang mungkin pernah bikin bingung.

---

## Expression Slots: Kenapa Pakai Kurung Kurawal

Di JSX, konten yang kamu tulis di antara tag dianggap sebagai string statis. Kalau kamu menulis nama variabel begitu saja, yang akan muncul adalah teks nama variabelnya, bukan nilainya.

Untuk memasukkan nilai JavaScript ke dalam JSX, kamu perlu _expression slot_ — area yang dibuka dengan kurung kurawal `{}`. Apapun yang ada di dalamnya diperlakukan sebagai JavaScript murni.

```jsx
const username = "budi_dev";
const totalPost = 42;

const element = (
  <div>
    <p>Username: {username}</p>
    <p>Total tulisan: {totalPost}</p>
  </div>
);
```

Yang perlu diperhatikan: yang boleh masuk ke dalam `{}` adalah **expression**, bukan **statement**. Ini karena JSX dikompilasi menjadi function call, dan kamu tidak bisa menaruh statement (seperti `if`, `for`, `while`) di dalam argumen sebuah function.

Jadi ini tidak valid:

```jsx
// ❌ Tidak bisa — if adalah statement
<p>{if (isLoggedIn) { 'Halo!' }}</p>
```

Tapi ini valid:

```jsx
// ✅ Bisa — ternary adalah expression
<p>{isLoggedIn ? "Halo!" : "Silakan login"}</p>
```

Expression slot juga bisa dipakai untuk nilai atribut yang dinamis:

```jsx
const avatarUrl = "/img/users/budi.png";
const userId = "usr-091";

const element = <img src={avatarUrl} data-user-id={userId} alt="Foto profil" />;
```

---

## Perbedaan JSX dengan HTML

JSX terlihat seperti HTML, tapi ada beberapa perbedaan yang perlu diingat. Bukan untuk dihafal sekarang, tapi setidaknya tahu bahwa ini ada, karena React akan kasih peringatan kalau kamu melakukan kesalahan.

**Reserved words JavaScript**

Beberapa atribut HTML bentrok dengan reserved words di JavaScript. Dua yang paling sering ditemui:

- `class` → `className`
- `for` → `htmlFor`

```jsx
// ❌ Ini akan dapat warning
<input class="form-input" />
<label for="email">Email</label>

// ✅ Yang benar di JSX
<input className="form-input" />
<label htmlFor="email">Email</label>
```

**Semua tag harus ditutup**

HTML cukup toleran — tag seperti `<img>` atau `<input>` tidak harus ditutup. JSX tidak. Setiap tag harus ditutup, entah dengan closing tag atau self-closing:

```jsx
// ❌
<input type="text">
<br>

// ✅
<input type="text" />
<br />
```

**Atribut pakai camelCase**

Atribut HTML yang terdiri dari beberapa kata ditulis dengan tanda hubung. Di JSX, kamu pakai camelCase:

- `onclick` → `onClick`
- `onchange` → `onChange`
- `tabindex` → `tabIndex`
- `autofocus` → `autoFocus`

Ada dua pengecualian: `data-*` dan `aria-*` tetap pakai tanda hubung.

**Inline style pakai objek, bukan string**

Di HTML biasa, style ditulis sebagai string:

```html
<p style="color: navy; font-size: 1rem;">Teks ini</p>
```

Di JSX, style menerima objek JavaScript:

```jsx
<p style={{ color: "navy", fontSize: "1rem" }}>Teks ini</p>
```

Kenapa ada dua kurung kurawal? Yang luar adalah _expression slot_ JSX. Yang dalam adalah objek JavaScript. Semua properti CSS ditulis camelCase — `font-size` jadi `fontSize`, `border-radius` jadi `borderRadius`.

---

## The Whitespace Gotcha

Ini yang cukup sering bikin bingung. Perhatikan kode ini:

```jsx
const totalItem = 5;

const element = (
  <p>
    <strong>Produk dalam keranjang:</strong>
    {totalItem}
  </p>
);
```

Hasilnya: **Produk dalam keranjang:5** — tanpa spasi di antara teks dan angka.

Kenapa? Karena JSX dikompilasi ke JavaScript. `<strong>` dan `{totalItem}` adalah dua children terpisah, dan tidak ada spasi di antaranya. Berbeda dengan HTML yang otomatis menambahkan spasi antar elemen di baris yang berbeda.

Solusinya adalah menambahkan spasi secara eksplisit:

```jsx
const element = (
  <p>
    <strong>Produk dalam keranjang:</strong> {totalItem}
  </p>
);
```

Pertama kali saya lihat ini, rasanya hacky sekali. Tapi setelah dipikir-pikir, ini sebenarnya masuk akal — ini cara kita memberi tahu compiler bahwa spasi ini memang disengaja sebagai spasi gramatikal, bukan sekadar indentasi kode.

---

## Compile-time vs Run-time

Satu hal lagi yang menarik: ketika JSX dikompilasi, logika yang ada di dalam expression slot tidak dijalankan saat itu juga. Yang terjadi hanya _penyalinan_ kontennya ke output JavaScript.

```jsx
const email = "user@domain.com";

const element = <div id={email.replace("@", "_")}>Konten</div>;
```

Saat dikompilasi, `.replace('@', '_')` belum dijalankan. Fungsi itu baru akan dieksekusi nanti ketika JavaScript-nya berjalan di browser.

Ini adalah perbedaan antara **compile-time** (proses transformasi kode sebelum dijalankan) dan **run-time** (eksekusi kode di browser). Penting untuk dipahami karena berpengaruh ke bagaimana kita berpikir tentang kapan sebuah nilai tersedia.

---

Memahami bahwa JSX hanyalah shortcut untuk `React.createElement()` adalah salah satu fondasi terpenting dalam bekerja dengan React. Banyak hal yang tadinya terasa magic — kenapa ini harus begini, kenapa itu tidak boleh begitu — tiba-tiba menjadi masuk akal ketika kamu sadar apa yang sebenarnya terjadi di balik layar.

Di part berikutnya, saya akan masuk ke topik yang menurut saya paling fundamental di React: **Components dan Props**.

---

_Tulisan ini adalah catatan belajar saya dari kursus [Joy of React](https://www.joyofreact.com/) milik Josh Comeau. Kalau kamu tertarik belajar React lebih dalam, langsung cek kursusnya — worth it._
