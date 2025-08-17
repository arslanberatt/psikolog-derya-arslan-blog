import { useEffect, useState } from "react";
import BlogLayout from "../../components/layouts/BlogLayout/BlogLayout";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPaths";
import DetailSectionSkeleton from "./components/skeletons/DetailSectionSkeleton";
import { Helmet } from "react-helmet-async";

export const AboutPage = () => {
  const [about, setAbout] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const getAbout = async () => {
    try {
      setIsLoading(true);
      const res = await axiosInstance.get(API_PATHS.ABOUT.GET);
      const data = res.data;
      const item = Array.isArray(data) ? data[0] : data;
      setAbout(item ?? null);
    } catch (err) {
      console.error("About fetch error:", err);
      setAbout(null);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getAbout();
  }, []);

  const education = Array.isArray(about?.education) ? about.education : [];
  const certificates = Array.isArray(about?.certificates)
    ? about.certificates
    : [];

  return (
    <BlogLayout activeMenu="Hakkımda">
      <Helmet>
        <title>Hakkımda | Psikolog Derya Arslan</title>
        <meta
          name="description"
          content="Psikolog Derya Arslan Hakkında Her Şey"
        />
      </Helmet>
      <div className="grid grid-cols-12 gap-5 md:px-4">
        {/* SOL İÇERİK: Hakkımda metni */}
        <div className="col-span-12 md:col-span-9">
          {isLoading ? (
            <DetailSectionSkeleton />
          ) : (
            <section>
              <div className="gap-8">
                <article className="rounded-md">
                  <header>
                    <h3 className="text-2xl sm:text-3xl font-semibold tracking-tight">
                      {about.title}
                    </h3>
                  </header>

                  {/* Biyografi Metni */}
                  {about?.fullBio && (
                    <div className="mt-6 space-y-4 text-gray-700 leading-7">
                      <p>{about.fullBio}</p>
                    </div>
                  )}
                </article>
              </div>
            </section>
          )}
          {!isLoading && (
            <div className="col-span-12 mt-6">
              <div className="grid grid-cols-1 md:grid-cols-12">
                {certificates.length > 0 && (
                  <section className="md:col-span-8 mb-6">
                    <h4 className="text-base font-semibold tracking-tight">
                      Sertifikalar
                    </h4>
                    <div className="mt-3 flex flex-wrap gap-2">
                      {certificates.map((c, i) => (
                        <div className="inline-flex items-center rounded-full border border-gray-300 bg-white px-3 py-1 text-xs sm:text-sm text-gray-800">
                          {c}
                        </div>
                      ))}
                    </div>
                  </section>
                )}
                <div className="md:col-span-4 rounded-xl overflow-hidden border border-gray-200 bg-white">
                  <img
                    src={about?.profileImageUrl}
                    alt={about?.title}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </div>
              </div>
            </div>
          )}
        </div>
        <aside className="col-span-12 md:col-span-3">
          {education.length > 0 && (
            <section className="mt-8">
              <h4 className="text-base font-semibold tracking-tight">Eğitim</h4>
              <ul className="mt-3 space-y-2">
                {education.map((e, i) => (
                  <div className="flex items-start gap-2 text-sm text-gray-700">
                    <span className="mt-2 h-1.5 w-1.5 rounded-full bg-gray-700 shrink-0" />
                    <span>{e}</span>
                  </div>
                ))}
              </ul>
            </section>
          )}
        </aside>
      </div>
    </BlogLayout>
  );
};
