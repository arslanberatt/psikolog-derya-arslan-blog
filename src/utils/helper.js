export const getInitials = (title) => {
  if (!title) return "";
  const words = title.trim().split(" ");
  let initials = "";

  for (let i = 0; i < Math.min(words.length, 2); i++) {
    initials += words[i][0];
  }

  return initials.toUpperCase();
};

export const validateEmail = (email) => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
};

export const getGreetingMessage = () => {
  const hour = new Date().getHours();
  if (hour < 5) return "İyi Geceler";
  if (hour < 12) return "Günaydın";
  if (hour < 17) return "İyi Günler";
  if (hour < 21) return "İyi Akşamlar";
  return "İyi Geceler";
};

export const getToastMessagesByType = (type) => {
  switch (type) {
    case "edit":
      return "Blog gönderisi başarıyla güncellendi!";
    case "draft":
      return "Blog taslak olarak başarıyla kaydedildi!";
    case "published":
      return "Blog başarıyla yayınlandı!";
    default:
      return "Blog başarıyla yayınlandı!";
  }
};

export const sanitizeMarkdown = (content) => {
  const markdownBlockRegex = /^```(?:markdown)?\n([\s\S]*?)\n```$/;
  const match = content.match(markdownBlockRegex);
  return match ? match[1] : content;
};
