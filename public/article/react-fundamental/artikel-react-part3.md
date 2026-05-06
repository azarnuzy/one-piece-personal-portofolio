# Memahami React Lebih Dalam — Part 4: Iteration, Keys, dan Conditional Rendering

Dua hal yang hampir pasti selalu ada di setiap aplikasi React: **data yang perlu di-render secara dinamis** dan **UI yang berubah tergantung kondisi tertentu**. Di part ini, saya mau bahas keduanya secara mendalam.

---

## Iteration: Render Data Dinamis

Bayangkan kita punya halaman notifikasi. Datanya datang dari server, jumlahnya tidak tentu, dan terus berubah. Kita tidak mungkin menulis setiap item notifikasi secara manual.

Di React, tidak ada sintaks khusus untuk iterasi seperti di Vue (`v-for`) atau Angular (`*ngFor`). React menggunakan JavaScript murni — dan tools utamanya adalah method `.map()` pada array.

```jsx
const notifications = [
  { id: "notif-1", message: "Pesanan kamu sudah dikirim", time: "5 menit lalu" },
  { id: "notif-2", message: "Ada komentar baru di postinganmu", time: "1 jam lalu" },
  { id: "notif-3", message: "Promo akhir bulan sudah dimulai", time: "3 jam lalu" },
];

function NotificationList() {
  return (
    <ul>
      {notifications.map((notif) => (
        <NotificationItem key={notif.id} message={notif.message} time={notif.time} />
      ))}
    </ul>
  );
}
```

`.map()` mengiterasi setiap item dalam array dan mengembalikan sebuah React element untuk masing-masing item. Hasilnya adalah array of elements, yang kemudian di-render oleh React.

**Satu gotcha yang sering bikin bingung:** perbedaan antara tanda kurung biasa `()` dan kurung kurawal `{}` di dalam arrow function:

```jsx
// ✅ Ini benar — kurung biasa, nilai di-return otomatis
notifications.map((notif) => <NotificationItem message={notif.message} />);

// ❌ Ini tidak akan render apa-apa — tidak ada return
notifications.map((notif) => {
  <NotificationItem message={notif.message} />;
});

// ✅ Ini juga benar — kurung kurawal tapi pakai return eksplisit
notifications.map((notif) => {
  return <NotificationItem message={notif.message} />;
});
```

---

## Keys: Kenapa Penting dan Bagaimana Cara Kerjanya

Setiap kali kita me-render array of elements, React akan mengeluh kalau tidak ada `key` prop. Ini bukan sekadar formalitas.

React bekerja dengan cara membandingkan "snapshot sebelum" dan "snapshot sesudah" perubahan data. Ketika data berubah, React harus mencari tahu apa yang perlu diubah di DOM. Kalau kita punya list tanpa identifier yang unik, React tidak bisa dengan pasti menentukan apakah sebuah item sudah ada sebelumnya, baru ditambahkan, atau dipindah posisinya.

`key` memberikan React informasi itu — ia membantu React melacak identitas setiap element antar render.

```jsx
notifications.map((notif) => (
  <NotificationItem
    key={notif.id} // identifier yang unik dan stabil
    message={notif.message}
    time={notif.time}
  />
));
```

**Beberapa hal penting tentang key:**

Pertama, key harus diletakkan di elemen paling atas di dalam `.map()` — bukan di child element di dalamnya:

```jsx
// ❌ Key di tempat yang salah
menuItems.map((item) => (
  <li>
    <a key={item.id} href={item.href}>
      {item.label}
    </a>
  </li>
));

// ✅ Key di tempat yang benar
menuItems.map((item) => (
  <li key={item.id}>
    <a href={item.href}>{item.label}</a>
  </li>
));
```

Kedua, key tidak perlu unik secara global — cukup unik di dalam array yang sama.

Ketiga, key _tidak_ bisa diakses sebagai prop di dalam component. Kalau kamu butuh nilai yang sama di dalam component, oper lagi sebagai prop terpisah:

```jsx
// key tidak bisa diakses lewat props.key di dalam NotificationItem
<NotificationItem key={notif.id} id={notif.id} message={notif.message} />
```

**Hindari menggunakan index array sebagai key** kecuali benar-benar tidak ada pilihan lain. Index tidak stabil — ketika item ditambahkan, dihapus, atau diurutkan ulang, index berubah, dan React bisa salah mengidentifikasi element yang mana.

---

## Iterasi Tanpa Array: Range Utility

Kadang kita perlu me-render elemen dalam jumlah tertentu tanpa punya array data yang nyata. Contoh: indikator langkah di sebuah form wizard, atau grid kalender.

Satu pendekatan adalah menggunakan for loop sebelum JSX:

```jsx
function StepIndicator({ totalSteps }) {
  let steps = [];

  for (let i = 1; i <= totalSteps; i++) {
    steps.push(
      <div key={i} className="step-dot">
        {i}
      </div>,
    );
  }

  return <div className="step-wrapper">{steps}</div>;
}
```

Tapi ada cara yang lebih elegan menggunakan utility function `range`:

```javascript
const range = (start, end, step = 1) => {
  let output = [];

  if (typeof end === "undefined") {
    end = start;
    start = 0;
  }

  for (let i = start; i < end; i += step) {
    output.push(i);
  }

  return output;
};
```

Dengan `range`, iterasi bisa dilakukan langsung di dalam JSX:

```jsx
function StepIndicator({ totalSteps }) {
  return (
    <div className="step-wrapper">
      {range(1, totalSteps + 1).map((step) => (
        <div key={step} className="step-dot">
          {step}
        </div>
      ))}
    </div>
  );
}
```

Saya pakai fungsi ini hampir di setiap proyek — sangat berguna untuk grid, pagination, tabel dengan jumlah kolom dinamis, dan lainnya. Bisa juga pakai versi dari lodash kalau tidak mau repot buat sendiri.

---

## Conditional Rendering

Sekarang masuk ke bagian yang sering membuat developer baru bingung: bagaimana cara menampilkan atau menyembunyikan sesuatu berdasarkan kondisi.

### Dengan if Statement

Cara paling straightforward adalah menggunakan `if` biasa — tapi perlu diingat, `if` tidak bisa digunakan di dalam JSX secara langsung karena ia adalah statement, bukan expression.

Solusinya: pindahkan logika `if` ke atas, sebelum return statement:

```jsx
function ProductCard({ product }) {
  let stockLabel;

  if (product.stock === 0) {
    stockLabel = <span className="out-of-stock">Habis</span>;
  }

  return (
    <div className="product-card">
      <h3>{product.name}</h3>
      <p>Rp {product.price}</p>
      {stockLabel}
    </div>
  );
}
```

Ketika `product.stock` bukan 0, `stockLabel` tidak ter-assign dan nilainya `undefined` — dan React akan mengabaikan nilai `undefined`, jadi tidak ada yang ter-render.

### Dengan && Operator

Cara yang lebih ringkas adalah menggunakan operator `&&` langsung di dalam JSX:

```jsx
function ProductCard({ product }) {
  return (
    <div className="product-card">
      <h3>{product.name}</h3>
      <p>Rp {product.price}</p>
      {product.isNew && <span className="badge-new">Baru</span>}
    </div>
  );
}
```

Cara kerjanya: kalau nilai di sebelah kiri falsy, ekspresi short-circuit. Kalau truthy, nilai di sebelah kanan yang dikembalikan.

**Satu gotcha penting:** jangan gunakan angka sebagai kondisi kiri operator `&&`:

```jsx
// ❌ Ini akan render angka 0 ke layar kalau cart kosong
{
  cartItems.length && <CartSummary items={cartItems} />;
}

// ✅ Ini aman
{
  cartItems.length > 0 && <CartSummary items={cartItems} />;
}
```

Kenapa? Karena `0` adalah satu-satunya angka yang falsy di JavaScript, tapi React akan tetap me-render angka `0` ke layar — berbeda dengan `false`, `null`, atau `undefined` yang diabaikan.

Aturan yang saya pegang: **pastikan sisi kiri dari `&&` selalu menghasilkan boolean**.

### Dengan Ternary Operator

Kalau butuh menampilkan satu hal ketika kondisi true, dan hal lain ketika false, gunakan ternary:

```jsx
function AuthButton({ isLoggedIn }) {
  return (
    <div>
      {isLoggedIn ? (
        <button onClick={handleLogout}>Keluar</button>
      ) : (
        <button onClick={handleLogin}>Masuk</button>
      )}
    </div>
  );
}
```

Ternary bekerja seperti if/else tapi dalam bentuk expression, sehingga bisa digunakan langsung di dalam JSX.

### Show/Hide dengan CSS

Ada pendekatan lain yang mungkin lebih familiar bagi yang dari background non-React: alih-alih menambah/menghapus elemen dari DOM, kita toggle visibilitasnya dengan CSS.

```jsx
function Tooltip({ text, isVisible }) {
  return (
    <div className="tooltip" style={isVisible ? undefined : { display: "none" }}>
      {text}
    </div>
  );
}
```

Dari sisi aksesibilitas, elemen yang di-hide dengan `display: none` tidak berbeda dengan yang dihapus dari DOM — keduanya tidak akan dibaca screen reader dan tidak bisa di-focus.

Perbedaannya ada di performa. Menambahkan DOM node baru lebih lambat dibanding mengubah CSS property. Jadi untuk konten yang sering ditoggle seperti dropdown atau accordion, pendekatan CSS kadang lebih smooth.

Tapi secara default, saya lebih memilih conditional rendering — lebih eksplisit, lebih mudah dibaca, dan mengurangi jumlah DOM node yang tidak perlu.

---

## Jangan Lupa Aksesibilitas

Satu hal yang sering terlewat: pastikan informasi yang relevan juga tersedia untuk pengguna screen reader.

Misalnya, kalau kita hanya menampilkan ikon untuk menandakan status tertentu, pengguna screen reader tidak akan tahu artinya. Solusinya adalah menambahkan teks yang secara visual disembunyikan tapi tetap bisa dibaca — biasanya menggunakan komponen `VisuallyHidden`:

```jsx
function OrderStatus({ isPaid }) {
  return (
    <div className="status">
      {isPaid ? (
        <>
          <span className="icon-check" aria-hidden="true" />
          <VisuallyHidden>Sudah dibayar</VisuallyHidden>
        </>
      ) : (
        <>
          <span className="icon-pending" aria-hidden="true" />
          <VisuallyHidden>Menunggu pembayaran</VisuallyHidden>
        </>
      )}
    </div>
  );
}
```

Ini hal kecil tapi sangat berarti bagi pengguna yang mengandalkan screen reader.

---

Di part berikutnya, saya akan masuk ke topik yang mungkin salah satu yang paling berpengaruh terhadap bagaimana kita menulis kode React: **CSS dalam React** — dari CSS Modules sampai cara berpikir tentang styling di aplikasi modern.

---

_Tulisan ini adalah catatan belajar saya dari kursus [Joy of React](https://www.joyofreact.com/) milik Josh Comeau. Kalau kamu tertarik belajar React lebih dalam, langsung cek kursusnya — worth it._
