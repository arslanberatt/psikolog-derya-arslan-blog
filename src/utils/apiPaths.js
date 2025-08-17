export const BASE_URL = import.meta.env.VITE_BASE_URL;

export const API_PATHS = {
  AUTH: {
    REGISTER: "/api/auth/register", // Kayıt ol
    LOGIN: "/api/auth/login", // Kullanıcıyı doğrula ve JWT token döndür
    GET_PROFILE: "/api/auth/profile", // Giriş yapan kullanıcının bilgilerini getir
  },

  IMAGE: {
    UPLOAD_IMAGE: "/api/auth/upload-image", // auth değil image altında
  },

  DASHBOARD: {
    GET_DASHBOARD_DATA: "/api/dashboard-summary", // Dashboard verilerini getir
  },

  POSTS: {
    CREATE: "/api/posts", // Yeni bir blog yazısı oluştur (sadece admin)
    GET_ALL: "/api/posts", // Yayınlanmış tüm blog yazılarını getir
    GET_TRENDING_POSTS: "/api/posts/trending", // Popüler blog yazılarını getir
    LAST: "/api/posts/last", // Son blog yazıları
    GET_BY_SLUG: (slug) => `/api/posts/slug/${slug}`, // Slug'a göre tek bir blog yazısı getir
    UPDATE: (id) => `/api/posts/${id}`, // Bir blog yazısını güncelle
    DELETE: (id) => `/api/posts/${id}`, // Bir blog yazısını sil
    GET_BY_TAG: (tag) => `/api/posts/tag/${tag}`, // Belirli bir etikete göre yazıları getir
    SEARCH: "/api/posts/search", // Başlığa veya içeriğe göre blog yazısı ara
    INCREMENT_VIEW: (id) => `/api/posts/${id}/view`, // Görüntülenme sayısını artır
    LIKE: (id) => `/api/posts/${id}/like`, // Blog yazısını beğen
  },

  ABOUT: {
    GET: "/api/about",
    UPDATE: "/api/about",
  },

  SERVICE: {
    CREATE: "/api/service",
    GET_ALL: "/api/service",
    UPDATE: (id) => `/api/service/${id}`,
    DELETE: (id) => `/api/service/${id}`,
  },

  COMMENTS: {
    ADD: (postId) => `/api/comments/${postId}`, // Bir gönderiye yorum ekle
    GET_ALL: "/api/comments", // Tüm yorumları getir
    GET_ALL_BY_POST: (postId) => `/api/comments/${postId}`, // Belirli bir gönderinin tüm yorumlarını getir
    DELETE: (commentId) => `/api/comments/${commentId}`, // Yorumu sil
  },
};
