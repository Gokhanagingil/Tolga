# İstanbul Emlak Platformu

İstanbul'un en prestijli semtlerinde kullanıcı dostu, akıllı ve etkileşimli bir emlak platformu.

## Özellikler

- **Kullanıcı Kaydı ve Profil**: E-posta ile hızlı kayıt, kişisel tercihler ve profil yönetimi
- **Mülk Listeleme**: Satılık/kiralık mülk ekleme, detaylı bilgi girişi ve anında yayın
- **Akıllı Filtreleme**: Fiyat, konum, oda sayısı, alan gibi kriterlere göre anlık filtreleme
- **Favori Listesi**: Beğenilen mülkleri favorilere ekleme ve organize görüntüleme
- **Yüksek Kaliteli Görseller**: Çoklu fotoğraf galerisi, tam ekran görünüm ve 360° sanal tur
- **AI Destekli Öneriler**: Kullanıcı tercihlerine ve davranışlarına dayalı kişiselleştirilmiş öneriler
- **Canlı Destek**: Anlık sohbet desteği ve hızlı yanıt sistemi

## Teknolojiler

- **Next.js 14** (App Router)
- **TypeScript**
- **Tailwind CSS**
- **Zustand** (state management)
- **Lucide React** (icons)

## Kurulum

```bash
npm install
npm run dev
```

`http://localhost:3000` adresinden uygulamaya erişebilirsiniz.

## Mimari

Uygulama, mikroservis mimarisine uygun şekilde modüler yapıda tasarlanmıştır:

- `src/app/` - Next.js App Router sayfaları
- `src/components/` - Yeniden kullanılabilir UI bileşenleri
- `src/lib/` - Veri katmanı ve state yönetimi
- `src/types/` - TypeScript tip tanımları
