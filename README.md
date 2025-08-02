# Frontend Teknolojileri ve Mimarisi

Kullanılan Teknolojiler
React.js: Bileşen tabanlı kullanıcı arayüzü geliştirme için modern JavaScript kütüphanesi

React Router DOM (v7): SPA (Single Page Application) için yönlendirme yönetimi

Axios: Backend API ile güvenli ve esnek veri alışverişi

TailwindCSS (v4): Utility-first yaklaşımla ölçeklenebilir, modern ve mobil uyumlu tasarım

React Hot Toast: Etkileşimli kullanıcı bildirimleri

React Icons: Uygulamada kullanılan ikon kütüphanesi

Moment.js: Tarih ve zaman verilerinin formatlanması ve gösterimi

clsx: Koşullu className yönetimi

React Markdown + Remark GFM: Markdown desteği ile zengin içerik gösterimi

React Syntax Highlighter: Kod bloklarının vurgulanarak gösterimi (örneğin teknik bloglarda)

React Share: Yazıların sosyal medya platformlarında paylaşılabilirliğini sağlar

Recharts: Gelecekteki istatistik sayfası için kullanılabilir interaktif grafik kütüphanesi

Temel Fonksiyonlar

# Authentication

- JWT tabanlı kullanıcı doğrulaması

- Kullanıcının oturumuna bağlı olarak içerik erişimi ve kontrol

# Blog Gösterimi

- /blog/:slug yapısı ile dinamik detay sayfaları

- Etiketlere, başlığa ve içeriğe göre filtreleme ve arama fonksiyonları (search bar)

- Markdown destekli içerik görüntüleme (react-markdown + syntax highlighter)

# Yorum ve Beğeni Modülleri

- Kullanıcılar login olduklarında yorum bırakabilir

- Her yorum yazara aitse silme hakkı tanınır, admin tüm yorumları silebilir

- Yazılara beğeni bırakma özelliği

# Arayüz Özellikleri

- Responsive tasarım (mobil, tablet, masaüstü uyumlu)

- Sidebar navigasyonu (admin panel için)

- Avatar bileşeni (CharAvatar) ile kullanıcı baş harfi gösterimi

- Anlık Toast bildirimler (başarılı/giriş/çıkış/yorum eklendi vb.)

# Genişletme Olanakları

- Admin paneli üzerinden içerik, kullanıcı ve istatistik yönetimi

- Yazı görüntülenme, yorum ve beğeni istatistikleri (Recharts ile)

# Projenin Frontend Amacı

Bu arayüz, psikologların yazılı içeriklerini sade ve okunabilir bir şekilde sunarken, kullanıcı etkileşimlerini güvenli ve şeffaf biçimde yönetmelerini sağlar. Aynı zamanda yazılımcı olarak:

React.js ile ölçeklenebilir ve sürdürülebilir component mimarisi kurma

RESTful API tüketimi ve context-based state yönetimi

UI/UX hassasiyeti ile mobil uyumlu kullanıcı deneyimi sunma

hedeflenmiştir.
