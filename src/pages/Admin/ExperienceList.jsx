import React, { useState, useEffect } from "react";
import DashboardLayout from "../../components/layouts/DashboardLayout";
import { useNavigate } from "react-router-dom";
import { LuPlus, LuTrash2 } from "react-icons/lu";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPaths";
import DeleteAlertContent from "../../components/DeleteAlertContent";
import Modal from "../../components/Modal";
import { toast } from "react-toastify";
import Input from "../../components/Inputs/Input";

const ExperienceList = () => {
  const [experienceList, setExperienceList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const [experienceData, setExperienceData] = useState({
    id: "",
    year: "",
    title: "",
    institution: "",
    description: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const [openDeleteAlert, setOpenDeleteAlert] = useState({
    open: false,
    data: null,
  });

  const [openUpdateAlert, setOpenUpdateAlert] = useState({
    open: false,
    data: null,
  });

  const getAllExperiences = async (pageNumber = 1) => {
    try {
      setIsLoading(true);
      const response = await axiosInstance.get(API_PATHS.EXPERIENCE.GET_ALL);
      const data = response.data;
      setExperienceList(data);
    } catch (error) {
      console.error(`Verileri çekerken hata oluştu: ${error}`);
    } finally {
      setIsLoading(false);
    }
  };

  const editable = async () => {
    if (openUpdateAlert.open) {
      if (openUpdateAlert.data) {
        setExperienceData({
          id: openUpdateAlert.data._id,
          year: openUpdateAlert.data.year,
          title: openUpdateAlert.data.title,
          institution: openUpdateAlert.data.institution,
          description: openUpdateAlert.data.description,
        });
      } else {
        setExperienceData({
          id: "",
          year: "",
          title: "",
          institution: "",
          description: "",
        });
      }
      setError("");
    }
  };

  const handlePublish = async () => {
    if (!experienceData.year.trim()) {
      setError("Lütfen bir yıl giriniz giriniz.");
      return;
    }
    if (!experienceData.title.trim()) {
      setError("Lütfen bir başlık giriniz.");
      return;
    }
    if (!experienceData.institution.trim()) {
      setError("Lütfen bir kurum ismi giriniz.");
      return;
    }
    if (!experienceData.description.trim()) {
      setError("Lütfen bir açıklama giriniz.");
      return;
    }
    setLoading(true);
    setError("");
    try {
      const reqPayload = {
        year: experienceData.year,
        title: experienceData.title,
        institution: experienceData.institution,
        description: experienceData.description,
      };

      if (experienceData.id) {
        await axiosInstance.put(
          API_PATHS.SERVICE.UPDATE(experienceData.id),
          reqPayload
        );
        toast.success("Deneyim başarıyla güncellendi.");
      } else {
        await axiosInstance.post(API_PATHS.SERVICE.CREATE, reqPayload);
        toast.success("Deneyim başarıyla oluşturuldu.");
      }

      setOpenUpdateAlert({ open: false, data: null });
      getAllExperiences();
    } catch (error) {
      setError("Deneyim kaydedilirken bir hata oluştu.");
      console.error("Hata detayı:", error);
    } finally {
      setLoading(false);
    }
  };

  const deleteExperience = async (experienceId) => {
    try {
      await axiosInstance.delete(API_PATHS.SERVICE.DELETE(experienceId));
      setOpenDeleteAlert({
        open: false,
        data: null,
      });
      toast.success("Deneyim başarıyla silindi");
      getAllExperiences();
    } catch (error) {
      console.error(`Deneyimi silerken bir hata oluştu: ${error}`);
    }
  };

  useEffect(() => {
    getAllExperiences();
    editable();
    return () => {};
  }, [openUpdateAlert]);

  return (
    <DashboardLayout activeMenu="Deneyimler">
      <div className="w-auto sm:max-w-[900px] mx-auto">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-semibold mt-5 mb-5">Deneyimler</h2>
          <button
            className="btn-small"
            onClick={() => setOpenUpdateAlert({ open: true, data: null })}
          >
            <LuPlus className="text-[18px]" /> Deneyim Oluştur
          </button>
        </div>
        <div className="mt-5">
          {experienceList.map((experience) => (
            <div
              key={experience._id}
              className="flex items-center gap-4 bg-white p-3 mb-5 rounded-lg cursor-pointer group"
              onClick={() =>
                setOpenUpdateAlert({ open: true, data: experience })
              }
            >
              <div className="flex-1">
                <h3 className="text-[13px] md:text-[15px] text-black font-medium">
                  {experience.title}{" "}
                  <span className="text-[11px] text-gray-700 font-medium bg-gray-100 px-2.5 py-1 rounded">
                    {experience.year}
                  </span>
                </h3>
                <div className="flex items-center gap-2.5 mt-2 flex-wrap">
                  <div className="text-[11px] text-gray-700 font-medium bg-gray-100 px-2.5 py-1 rounded">
                    Kurum:
                  </div>
                  <div className="flex text-[11px] items-center gap-2.5">
                    {experience.institution}
                  </div>
                </div>
                <div className="flex items-center gap-2.5 mt-2 flex-wrap">
                  <div className="text-[11px] text-gray-700 font-medium bg-gray-100 px-2.5 py-1 rounded">
                    Açıklama:
                  </div>
                  <div className="flex text-[11px] items-center gap-2.5">
                    {experience.description}
                  </div>
                </div>
              </div>
              <button
                className="hidden md:flex items-center gap-2 text-xs text-rose-500 font-medium bg-rose-50 px-3 py-1 rounded text-nowrap border border-rose-100 hover:border-rose-200 cursor-pointer"
                onClick={(e) => {
                  e.stopPropagation(); // Üst div'e yayılmayı engelle
                  setOpenDeleteAlert({ open: true, data: experience._id });
                }}
              >
                <LuTrash2 /> <span className="hidden md:block">Sil</span>
              </button>
            </div>
          ))}
        </div>
      </div>
      <Modal
        isOpen={openDeleteAlert?.open}
        onClose={() => {
          setOpenDeleteAlert({ open: false, data: null });
        }}
        title="Silme İşlemi"
      >
        <div className="w-[60vw] md:w-[40vw]">
          <DeleteAlertContent
            content="Bu yazıyı silmek istediğinize emin misiniz?"
            onDelete={() => deleteExperience(openDeleteAlert.data)}
          />
        </div>
      </Modal>
      <Modal
        isOpen={openUpdateAlert?.open}
        onClose={() => {
          setOpenUpdateAlert({ open: false, data: null });
        }}
        title={experienceData.id ? "Deneyimi Güncelle" : "Deneyim Ekle"}
      >
        <div className="w-[60vw] md:w-[40vw]">
          <div className="p-5">
            <p className="text-[14px]">
              <Input
                label="Deneyim Yılı"
                value={experienceData.year}
                onChange={(e) =>
                  setExperienceData((prev) => ({
                    ...prev,
                    year: e.target.value,
                  }))
                }
                placeholder="2022 - 2025"
              />
              <Input
                label="Deneyim Başlığı"
                value={experienceData.title}
                onChange={(e) =>
                  setExperienceData((prev) => ({
                    ...prev,
                    title: e.target.value,
                  }))
                }
                placeholder="Başlık"
              />
              <Input
                label="Kurum İsmi"
                value={experienceData.institution}
                onChange={(e) =>
                  setExperienceData((prev) => ({
                    ...prev,
                    institution: e.target.value,
                  }))
                }
                placeholder="Kurum"
              />
              <label className="text-[13px] text-slate-800">
                Deneyim Açıklaması
              </label>
              <textarea
                placeholder="Açıklama"
                className="form-input h-22 my-3"
                value={experienceData.description}
                onChange={(e) =>
                  setExperienceData((prev) => ({
                    ...prev,
                    description: e.target.value,
                  }))
                }
              />
            </p>
            <div className="flex justify-end mt-6">
              <button
                className="btn-small"
                disabled={loading}
                onClick={handlePublish}
              >
                {loading
                  ? "Kaydediliyor..."
                  : experienceData.id
                  ? "Güncelle"
                  : "Oluştur"}
              </button>
            </div>
          </div>
        </div>
      </Modal>
    </DashboardLayout>
  );
};

export default ExperienceList;
