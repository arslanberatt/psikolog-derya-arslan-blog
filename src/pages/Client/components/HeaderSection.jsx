import { useEffect, useState } from "react";
import axiosInstance from "../../../utils/axiosInstance";
import { API_PATHS } from "../../../utils/apiPaths";

const HeaderSection = ({ link, text }) => {
  const [about, setAbout] = useState(null); // <-- tek obje
  const [isLoading, setIsLoading] = useState(true); // <-- ilk anda true

  const getAbout = async () => {
    try {
      setIsLoading(true);
      const response = await axiosInstance.get(API_PATHS.ABOUT.GET);
      const data = response.data;
      const item = Array.isArray(data) ? data[0] : data;
      setAbout(item ?? null);
    } catch (err) {
      console.error(`Verileri çekerken hata oluştu: ${err}`);
      setAbout(null);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getAbout();
  }, []);

  if (isLoading) {
    return (
      <>
        <div className="mt-4 h-8 w-2/3 bg-neutral-200 rounded animate-pulse" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
          <div>
            <div className="mt-2 space-y-3">
              <div className="h-4 w-full bg-neutral-200 rounded animate-pulse" />
              <div className="h-4 w-11/12 bg-neutral-200 rounded animate-pulse" />
              <div className="h-4 w-10/12 bg-neutral-200 rounded animate-pulse" />
              <div className="h-4 w-9/12 bg-neutral-200 rounded animate-pulse" />
            </div>
            <div className="mt-8 h-10 w-56 bg-neutral-300 rounded-lg animate-pulse" />
          </div>
          <div className="overflow-hidden rounded-2xl border border-neutral-200 shadow-sm">
            <div className="aspect-[3/2] bg-neutral-200 animate-pulse" />
          </div>
        </div>
      </>
    );
  }
  return (
    <>
      <div className="mt-4 font-semibold tracking-tight text-neutral-900 text-2xl sm:text-3xl lg:text-4xl">
        {about?.title}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
        <div>
          <p className="mt-4 text-base leading-relaxed text-neutral-600">
            {about?.shortBio ||
              "Kısa bir biyografi yakında eklenecektir. Güncel bilgileri burada bulacaksınız."}
          </p>

          <div className="mt-8">
            <a
              href={link}
              className="inline-flex items-center gap-2 rounded-lg border border-neutral-900 bg-neutral-900 px-4 py-2.5 text-sm font-medium text-white shadow-sm transition hover:bg-neutral-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-900/20"
            >
              {text}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1.8"
                  d="M13 7l5 5m0 0l-5 5m5-5H6"
                />
              </svg>
            </a>
          </div>
        </div>

        <div className="overflow-hidden rounded-2xl border border-neutral-200 shadow-sm">
          <div className="relative">
            <img
              src={about?.profileImageUrl}
              alt={about?.title || "Profil fotoğrafı"}
              className="aspect-[3/2] md:aspect-[4/3] w-full object-cover"
              loading="lazy"
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default HeaderSection;
