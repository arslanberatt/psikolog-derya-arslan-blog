import React, { useEffect, useState } from "react";
import DashboardLayout from "../../components/layouts/DashboardLayout";
import { LuLoaderCircle, LuSend } from "react-icons/lu";
import CoverImageSelector from "../../components/Inputs/CoverImageSelector";
import MDEditor, { commands } from "@uiw/react-md-editor";
import TagInput from "../../components/Inputs/TagInput";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPaths";
import uploadImage from "../../utils/uploadImage";
import { toast } from "react-toastify";

const AboutEditor = () => {
  const [aboutData, setAboutData] = useState({
    title: "",
    shortBio: "",
    fullBio: "",
    profileImageUrl: "",
    profilePreview: "",
    education: "",
    certificates: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleValueChange = (key, value) => {
    setAboutData((prevData) => ({ ...prevData, [key]: value }));
  };

  const handlePublish = async () => {
    let profileImageUrl = "";
    if (!aboutData.title.trim()) {
      setError("Lütfen bir başlık giriniz.");
      return;
    }
    if (!aboutData.shortBio.trim()) {
      setError("Lütfen bir kısa bir açıklama giriniz.");
      return;
    }
    if (!aboutData.fullBio.trim()) {
      setError("Lütfen bir uzun bir açıklama giriniz.");
      return;
    }
    if (!aboutData.profileImageUrl && !aboutData.profilePreview) {
      setError("Lütfen bir hakkımda fotoğrafı seçiniz.");
      return;
    }

    if (!aboutData.education.length) {
      setError("Lütfen bir kaç eğitim ekleyiniz.");
      return;
    }
    if (!aboutData.certificates.length) {
      setError("Lütfen bir kaç sertifika ekleyiniz.");
      return;
    }
    setLoading(true);
    setError("");
    try {
      if (aboutData.profileImageUrl instanceof File) {
        const imgUploadRes = await uploadImage(aboutData.profileImageUrl);
        profileImageUrl = imgUploadRes.imageUrl || "";
      } else {
        profileImageUrl = aboutData.profilePreview;
      }

      const reqPayload = {
        title: aboutData.title,
        shortBio: aboutData.shortBio,
        fullBio: aboutData.fullBio,
        profileImageUrl,
        education: aboutData.education,
        certificates: aboutData.certificates,
      };
      const response = await axiosInstance.put(
        API_PATHS.ABOUT.UPDATE,
        reqPayload
      );

      if (response.data) {
        toast.success("Hakkımda yazısı başarıyla güncellendi!");
      }
    } catch (error) {
      setError(
        "Hakkımda kaydedilirken bir hata meydana geldi. Lütfen tekrar deneyin."
      );
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const getAboutData = async () => {
    try {
      const response = await axiosInstance.get(API_PATHS.ABOUT.GET);
      if (response.data) {
        const data = response.data;
        console.log(data);
        setAboutData((prevState) => ({
          ...prevState,
          id: data._id,
          title: data.title,
          shortBio: data.shortBio,
          fullBio: data.fullBio,
          profilePreview: data.profileImageUrl,
          education: data.education,
          certificates: data.certificates,
        }));
      }
    } catch (error) {
      console.error(`Hakkımda verileri çekerken hata oluştu ${error}`);
    }
  };

  useEffect(() => {
    getAboutData();
    return () => {};
  }, []);

  return (
    <DashboardLayout activeMenu="Hakkımda">
      <div className="my-5">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-5 my-4">
          <div className="form-card p-6 col-span-12 xs:col-span-8">
            <div className="flex items-center justify-between">
              <h2 className="text-base md:text-lg font-medium">
                Hakkımdayı düzenle
              </h2>
              <div className="flex items-center gap-3">
                <button
                  className="flex items-center gap-2.5 text-[13px] font-medium text-sky-600 hover:text-white hover:bg-linear-to-r hover:from-sky-500 hover:to-indigo-500 rounded px-3 py-[3px] border border-sky-500 hover:border-sky-50 cursor-pointer transition-all"
                  disabled={loading}
                  onClick={handlePublish}
                >
                  {loading ? (
                    <LuLoaderCircle className="animate-spin text-[15px]" />
                  ) : (
                    <LuSend className="text-sm" />
                  )}{" "}
                  Kaydet
                </button>
              </div>
            </div>
            {error && <p className="text-red-500 text-xs pb-2.5">{error}</p>}
            <div className="mt-4">
              <label className="text-xs font-medium text-slate-600">
                Hakkımda
              </label>
              <input
                placeholder="Başlık"
                className="form-input"
                value={aboutData.title}
                onChange={({ target }) =>
                  handleValueChange("title", target.value)
                }
              />
            </div>
            <div className="mt-4">
              <CoverImageSelector
                image={aboutData.profileImageUrl}
                setImage={(value) =>
                  handleValueChange("profileImageUrl", value)
                }
                preview={aboutData.profilePreview}
                setPreview={(value) =>
                  handleValueChange("profilePreview", value)
                }
              />
            </div>
            <div className="mt-3">
              <label className="text-xs font-medium to-slate-600">
                Kısa Açıklama
              </label>
              <div data-color-mode="light">
                <textarea
                  placeholder="Kısa Açıklama"
                  className="form-input h-32"
                  value={aboutData.shortBio}
                  onChange={({ target }) =>
                    handleValueChange("shortBio", target.value)
                  }
                />
              </div>
            </div>
            <div className="mt-3">
              <label className="text-xs font-medium to-slate-600">
                Uzun Açıklama
              </label>
              <div data-color-mode="light">
                <MDEditor
                  value={aboutData.fullBio}
                  onChange={(data) => {
                    handleValueChange("fullBio", data);
                  }}
                  commands={[
                    commands.bold,
                    commands.italic,
                    commands.strikethrough,
                    commands.hr,
                    commands.title,
                    commands.divider,
                    commands.link,
                    commands.code,
                    commands.image,
                    commands.unorderedListCommand,
                    commands.orderedListCommand,
                    commands.checkedListCommand,
                  ]}
                />
              </div>
            </div>

            <div className="mt-3">
              <label className="text-xs font-medium text-slate-600">
                Eğitim
              </label>
              <TagInput
                tags={aboutData?.education || []}
                setTags={(data) => {
                  handleValueChange("education", data);
                }}
              />
            </div>
            <div className="mt-3">
              <label className="text-xs font-medium text-slate-600">
                Sertifika
              </label>
              <TagInput
                tags={aboutData?.certificates || []}
                setTags={(data) => {
                  handleValueChange("certificates", data);
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default AboutEditor;
