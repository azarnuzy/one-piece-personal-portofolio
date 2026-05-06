# Memahami React Lebih Dalam — Part 5: Styling di React

Styling adalah salah satu area di React yang punya banyak pilihan dan tidak ada jawaban yang benar-benar tunggal. Selama beberapa tahun terakhir, ekosistem JavaScript menghasilkan belasan cara berbeda untuk mengurus CSS — CSS Modules, styled-components, Tailwind, emotion, vanilla-extract, dan masih banyak lagi.

Di part ini saya mau fokus pada satu pendekatan yang menurut saya penting untuk dipahami karena ia langsung menjawab masalah paling mendasar dari CSS di proyek besar: **CSS Modules**.

---

## Masalah CSS di Proyek Besar

Kalau kamu pernah bekerja di proyek yang cukup besar, kamu mungkin pernah mengalami situasi ini: kamu menambahkan style baru, dan tiba-tiba ada tampilan yang rusak di halaman lain. Atau kamu ragu untuk mengubah sebuah class karena tidak yakin apakah class itu digunakan di tempat lain.

Masalah ini muncul karena sifat CSS yang **global**. Semua selector CSS berlaku di seluruh dokumen. Kalau kamu punya class `.title`, ia akan mempengaruhi semua elemen dengan class itu, di mana pun mereka berada — termasuk yang tidak kamu maksud.

Komunitas menciptakan berbagai solusi untuk ini. Salah satu yang cukup populer adalah **BEM** (Block Element Modifier) — sebuah naming convention yang menciptakan nama class yang panjang dan spesifik. Masalahnya, BEM butuh disiplin yang sangat tinggi, dan satu orang saja yang tidak konsisten bisa merusak segalanya.

**CSS Modules** menyelesaikan masalah ini dengan cara yang lebih otomatis — tanpa butuh disiplin ekstra dari seluruh tim.

---

## Bagaimana CSS Modules Bekerja

CSS Modules memanfaatkan proses kompilasi yang sudah ada di sebagian besar proyek React modern. Ketika kamu mengakhiri nama file CSS dengan `.module.css` dan meng-import-nya seperti JavaScript module, tiga hal terjadi:

1. Setiap class name dalam file tersebut diganti dengan nama yang lebih panjang dan dijamin unik — biasanya memasukkan path file sebagai bagian dari nama class
2. CSS dengan nama class yang sudah diganti ditambahkan ke dokumen HTML
3. Sebuah objek JavaScript dikembalikan yang memetakan nama class asli ke nama class hasil generate

Hasilnya terlihat seperti ini:

```javascript
// Objek styles yang kamu dapat setelah import:
{
  container: "_components_ProfileCard_module__container",
  name: "_components_ProfileCard_module__name",
  subtitle: "_components_ProfileCard_module__subtitle",
}
```

Dan cara penggunaannya di JSX:

```jsx
// ProfileCard.module.css
// .container { ... }
// .name { font-weight: 700; }
// .subtitle { color: #666; }

import styles from "./ProfileCard.module.css";

function ProfileCard({ name, role, avatarSrc }) {
  return (
    <div className={styles.container}>
      <img src={avatarSrc} alt={name} />
      <h3 className={styles.name}>{name}</h3>
      <p className={styles.subtitle}>{role}</p>
    </div>
  );
}
```

Yang tertulis di JSX adalah `styles.name`, tapi yang benar-benar dirender ke browser adalah nama class yang panjang dan unik itu. Tidak ada kemungkinan collision dengan component lain, meski kamu menggunakan nama class yang sama persis.

---

## Dynamic Classes dengan CSS Modules

Salah satu use case yang paling sering muncul adalah menerapkan class yang berbeda tergantung pada state atau props.

Misalnya, kita punya komponen `Tag` yang bisa punya beberapa warna berbeda:

```jsx
// Tag.module.css
// .tag { padding: 4px 8px; border-radius: 4px; font-size: 0.8rem; }
// .green { background: #e8f5e9; color: #2e7d32; }
// .red { background: #fce4ec; color: #c62828; }
// .blue { background: #e3f2fd; color: #1565c0; }

import styles from './Tag.module.css';

function Tag({ label, variant }) {
  return (
    <span className={`${styles.tag} ${styles[variant]}`}>
      {label}
    </span>
  );
}

// Penggunaannya:
<Tag label="Selesai" variant="green" />
<Tag label="Dibatalkan" variant="red" />
<Tag label="Diproses" variant="blue" />
```

Perhatikan `styles[variant]` — kita menggunakan bracket notation untuk mengakses properti secara dinamis. Kalau `variant` adalah `"green"`, maka `styles[variant]` menghasilkan nama class untuk `green` yang sudah di-generate CSS Modules.

Untuk kasus yang lebih kompleks dengan banyak kondisi, string interpolation bisa mulai terasa ribet. Di sinilah utility library seperti `clsx` berguna:

```jsx
import clsx from "clsx";
import styles from "./Tag.module.css";

function Tag({ label, variant, isLarge, isDisabled }) {
  return (
    <span
      className={clsx(
        styles.tag,
        styles[variant],
        isLarge && styles.large,
        isDisabled && styles.disabled,
      )}
    >
      {label}
    </span>
  );
}
```

`clsx` mengambil semua argumen, membuang yang falsy, dan menggabungkan sisanya menjadi string class yang valid.

---

## Conditional Styling: Jangan Gunakan && untuk className

Ada satu hal spesifik yang perlu diperhatikan ketika menerapkan class secara kondisional:

```jsx
// ❌ Ini akan menghasilkan warning di console
// "Received false for a non-boolean attribute className"
<div className={isActive && styles.active}>
  Konten
</div>

// ✅ Gunakan ternary dengan undefined sebagai fallback
<div className={isActive ? styles.active : undefined}>
  Konten
</div>
```

Ketika `isActive` false, ekspresi `&&` menghasilkan nilai `false` — dan `false` bukan nilai yang valid untuk prop `className`. Sedangkan `undefined` akan membuat React tidak menambahkan atribut `class` sama sekali, yang memang perilaku yang kita inginkan.

---

## Kapan Pakai Inline Style vs CSS Modules

Sebelum menutup topik ini, saya mau sedikit menyentuh soal kapan menggunakan masing-masing pendekatan.

Inline style di React ditulis sebagai objek JavaScript:

```jsx
function ProgressBar({ percentage }) {
  return (
    <div className={styles.track}>
      <div
        className={styles.fill}
        style={{ width: `${percentage}%` }} // nilai dinamis dari props
      />
    </div>
  );
}
```

Inline style berguna untuk nilai yang **benar-benar dinamis dan dihitung saat runtime** — seperti lebar progress bar berdasarkan persentase, atau posisi elemen yang dihitung dari koordinat. Juga berguna untuk men-set CSS variables secara dinamis.

Tapi untuk styling yang bersifat lebih statis atau mengacu pada "tema", CSS Modules lebih baik karena:

- Performa lebih baik — class-based styling di-cache oleh browser
- Pseudo-class seperti `:hover` dan `:focus` tidak bisa dilakukan dengan inline style
- Media query tidak bisa dilakukan dengan inline style
- Lebih mudah di-override kalau diperlukan

Dalam praktiknya, kedua pendekatan ini sering dipakai bersamaan — CSS Modules untuk struktur styling, inline style untuk nilai yang dinamis.

---

Pemahaman tentang styling adalah salah satu hal yang cukup lama saya anggap remeh. Saya dulu cenderung pakai apa yang familiar tanpa benar-benar berpikir tentang trade-off masing-masing pendekatan. Setelah duduk dan memahami lebih dalam, saya mulai bisa membuat keputusan yang lebih sadar tentang kapan pakai yang mana.

Seri ini akan dilanjutkan dengan topik yang menurut saya jauh lebih menarik: **state management**, **event handling**, dan bagaimana React benar-benar me-render ulang UI ketika data berubah.

---

_Tulisan ini adalah catatan belajar saya dari kursus [Joy of React](https://www.joyofreact.com/) milik Josh Comeau. Kalau kamu tertarik belajar React lebih dalam, langsung cek kursusnya — worth it._
