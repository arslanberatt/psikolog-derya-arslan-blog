import React, { useEffect, useState } from "react";
import ContactForm from "../../../pages/Client/components/ContactForm";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../../utils/axiosInstance";
import { API_PATHS } from "../../../utils/apiPaths";

// Simple brand mark (triangle) to echo the screenshot vibe
function BrandMark() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" aria-hidden>
      <path
        d="M12 3L22 20H2L12 3Z"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      />
      <path d="M12 7l6.5 11h-13L12 7z" fill="currentColor" />
    </svg>
  );
}
const social = [
  {
    label: "Doktor Sitesi",
    href: "https://www.doktorsitesi.com/klinik-psikolog-derya-arslan/psikoloji/istanbul",
    svg: (
      <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden>
        <path fill="currentColor" d="M18 4h-2l-12 4H4l11 7h2l5" />
      </svg>
    ),
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/arslanderyaa/",
    svg: (
      <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden>
        <path
          fill="currentColor"
          d="M4.98 3.5a2.5 2.5 0 102.5 2.5 2.5 2.5 0 00-2.5-2.5zM3 8h4v13H3zm7 0h4v2h.06A4.39 4.39 0 0120 8.18C22.67 8.18 23 9.88 23 13.08V21h-4v-7c0-1.67 0-3.82-2.33-3.82S14 12.67 14 14.83V21h-4z"
        />
      </svg>
    ),
  },
  {
    label: "Instagram",
    href: "https://www.instagram.com/psikologderyaarslan?igsh=MTFtMzhsdXlwbnYzcw==",
    svg: (
      <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden>
        <path
          fill="currentColor"
          d="M7 2h10a5 5 0 015 5v10a5 5 0 01-5 5H7a5 5 0 01-5-5V7a5 5 0 015-5zm0 2a3 3 0 00-3 3v10a3 3 0 003 3h10a3 3 0 003-3V7a3 3 0 00-3-3zm11 2a1 1 0 110 2 1 1 0 010-2zM12 7a5 5 0 105 5 5 5 0 00-5-5zm0 2a3 3 0 11-3 3 3 3 0 013-3z"
        />
      </svg>
    ),
  },
];

const siteMap = [
  { label: "Anasayfa", href: "/" },
  { label: "Hakkımda", href: "/hakkimda" },
  { label: "Bloglar", href: "/bloglar" },
];

function BackToTopButton() {
  const handleClick = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  return (
    <button
      onClick={handleClick}
      className="inline-flex items-center gap-2 rounded-md border cursor-pointer border-grey-300/40 px-3 py-2 text-xs font-medium text-grey-50 hover:bg-grey-50/5 focus:outline-none focus:ring-2 focus:ring-grey-200/50"
    >
      <svg width="16" height="16" viewBox="0 0 24 24" aria-hidden>
        <path
          fill="currentColor"
          d="M12 5l7 7-1.4 1.4L13 9.8V20h-2V9.8L6.4 13.4 5 12z"
        />
      </svg>
      YUKARI ÇIK
    </button>
  );
}

export default function BlogFooter() {
  const navigate = useNavigate();

  const [blogPostList, setBlogPostList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const getTrendingPosts = async () => {
    try {
      setIsLoading(true);
      const response = await axiosInstance.get(
        API_PATHS.POSTS.GET_TRENDING_POSTS
      );
      setBlogPostList(response.data?.length > 0 ? response.data : []);
      setIsLoading(false);
    } catch (error) {
      console.error(`Verileri çekerken hata oluştu: ${error}`);
    } finally {
      setIsLoading(false);
    }
  };

  const handleClick = (post) => {
    navigate(`/blog/${post.slug}`);
  };

  useEffect(() => {
    getTrendingPosts();
  }, []);

  return (
    <footer className="relative w-full bg-black text-white">
      <svg
        className="pointer-events-none absolute inset-0 h-full w-full opacity-40"
        aria-hidden
      >
        <defs>
          <pattern
            id="grid-lines"
            width="240"
            height="240"
            patternUnits="userSpaceOnUse"
          >
            <path
              d="M0 240L240 0"
              stroke="white"
              strokeWidth="0.7"
              opacity="0.15"
            />
            <path
              d="M120 240L360 0"
              stroke="white"
              strokeWidth="0.7"
              opacity="0.15"
            />
            <path
              d="M-120 240L120 0"
              stroke="white"
              strokeWidth="0.7"
              opacity="0.15"
            />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid-lines)" />
      </svg>

      <div className="relative mx-auto max-w-7xl px-6 py-12 md:py-14">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-12">
          <div className="md:col-span-5 lg:col-span-4">
            <div className="flex items-center gap-3 font-semibold tracking-wide">
              <span className="text-grey-200">
                <BrandMark />
              </span>
              <span className="text-base md:text-lg">
                Klinik Psikolog Derya Arslan
              </span>
            </div>
            <ContactForm />

            <div className="mt-8 flex items-center gap-4">
              {social.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  aria-label={s.label}
                  className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-grey-300/30 bg-white/5 transition hover:bg-white/10"
                >
                  <span className="text-grey-50">{s.svg}</span>
                </a>
              ))}
            </div>
          </div>

          <div className="md:col-span-7 lg:col-span-8 md:pl-8">
            <div className="grid grid-cols-2 gap-10 md:gap-14 lg:gap-24">
              <nav>
                <h3 className="text-sm font-semibold text-grey-100">
                  Site Haritası
                </h3>
                <ul className="mt-3 space-y-2.5">
                  {siteMap.map((l) => (
                    <li key={l.label}>
                      <a
                        href={l.href}
                        className="text-sm text-grey-50/85 underline-offset-4 hover:underline"
                      >
                        {l.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </nav>
              <nav>
                <h3 className="text-sm font-semibold text-grey-100">
                  Popüler Yazılar
                </h3>
                <ul className="mt-3 space-y-2.5">
                  {blogPostList.slice(0, 4).map((post) => (
                    <li key={post._id}>
                      <button
                        onClick={() => handleClick(post)}
                        className="text-sm text-grey-50/85 hover:underline underline-offset-4 text-left"
                      >
                        {post.title}
                      </button>
                    </li>
                  ))}
                </ul>
              </nav>
            </div>
          </div>
        </div>
        <div className="m-8 text-end">
          <BackToTopButton />
        </div>
        <div className="mt-12 border-t border-grey-300/20 pt-6 text-xs text-grey-100/80">
          © {new Date().getFullYear()} Artyom, Tüm Haklar Saklıdır.
        </div>
      </div>
    </footer>
  );
}
