import {
  LuLayoutDashboard,
  LuGalleryVerticalEnd,
  LuMessageSquareQuote,
  LuLayoutTemplate,
  LuTag,
  LuContactRound,
  LuBook,
  LuPhone,
} from "react-icons/lu";

export const SIDE_MENU_DATA = [
  {
    id: "01",
    label: "Yönetim Paneli",
    icon: LuLayoutDashboard,
    path: "/admin/dashboard",
  },
  {
    id: "02",
    label: "Hakkımda",
    icon: LuContactRound,
    path: "/admin/about",
  },
  {
    id: "03",
    label: "Bloglar",
    icon: LuGalleryVerticalEnd,
    path: "/admin/posts",
  },
  {
    id: "04",
    label: "Hizmetler",
    icon: LuBook,
    path: "/admin/service",
  },
  {
    id: "06",
    label: "Yorumlar",
    icon: LuMessageSquareQuote,
    path: "/admin/comments",
  },
];
export const BLOG_NAVBAR_DATA = [
  {
    id: "01",
    label: "Anasayfa",
    icon: LuLayoutTemplate,
    path: "/",
  },
  {
    id: "02",
    label: "Hakkımda",
    icon: LuTag,
    path: "/hakkimda",
  },
  {
    id: "03",
    label: "Bloglar",
    icon: LuTag,
    path: "/bloglar",
  },
];
