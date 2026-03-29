# İstanbul Emlak Platformu

İstanbul'un en prestijli semtlerinde kullanıcı dostu ve etkileşimli bir emlak platformu **demo uygulaması**.

> **Not:** Bu bir MVP / demo uygulamasıdır. Gerçek bir backend, veritabanı veya kimlik doğrulama sistemi bulunmamaktadır. Tüm veriler tarayıcı belleğinde (Zustand store) tutulur ve sayfa yenilendiğinde kaybolur.

## Özellikler

- **Mülk Listeleme**: Satılık/kiralık mülk ekleme ve detaylı bilgi girişi (demo — veriler bellekte tutulur)
- **Akıllı Filtreleme**: Fiyat, konum, oda sayısı, alan gibi kriterlere göre anlık filtreleme
- **Favori Listesi**: Beğenilen mülkleri favorilere ekleme ve organize görüntüleme
- **Fotoğraf Galerisi**: Çoklu fotoğraf galerisi ve tam ekran görünüm
- **Kişiselleştirilmiş Öneriler**: Kullanıcı tercihlerine dayalı skor bazlı mülk önerileri
- **Otomatik Destek Asistanı**: Hazır yanıtlarla platform içi mesajlaşma (canlı değil)

## Demo Sınırlamaları

- Kimlik doğrulama yoktur — e-posta ile geçici oturum oluşturulur
- Veriler tarayıcı belleğinde tutulur, sayfa yenilenince kaybolur
- Mülk fotoğrafları sabit Unsplash URL'leridir, kullanıcı yüklemesi desteklenmez
- Destek mesajlaşması otomatik hazır yanıtlar döner, gerçek bir destek ekibi yoktur
- Örnek ilan verileri statiktir (8 örnek mülk)

## Teknolojiler

- **Next.js 14** (App Router)
- **TypeScript**
- **Tailwind CSS**
- **Zustand** (client-side state management)
- **Lucide React** (icons)

## Kurulum

```bash
npm install
npm run dev
```

`http://localhost:3000` adresinden uygulamaya erişebilirsiniz.

Harici bir veritabanı veya API anahtarı gerekmez. Tüm veriler client-side olarak çalışır.

## Mimari

Bu uygulama tek bir Next.js uygulamasıdır (monolitik, client-side):

- `src/app/` — Next.js App Router sayfaları
- `src/components/` — Yeniden kullanılabilir UI bileşenleri
- `src/lib/` — Veri katmanı (statik örnek veriler) ve Zustand state yönetimi
- `src/types/` — TypeScript tip tanımları

Backend, API katmanı veya veritabanı bağlantısı bulunmamaktadır. Tüm iş mantığı client-side'da çalışır.
