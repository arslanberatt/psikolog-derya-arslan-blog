import React, { useState, useEffect } from "react";
import DashboardLayout from "../../components/layouts/DashboardLayout";
import { LuPlus, LuTrash2 } from "react-icons/lu";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPaths";
import DeleteAlertContent from "../../components/DeleteAlertContent";
import Modal from "../../components/Modal";
import { toast } from "react-toastify";
import Input from "../../components/Inputs/Input";

const ServiceList = () => {
  const [serviceList, setServiceList] = useState([]);
  const [blogPostList, setBlogPostList] = useState([]);

  const [serviceData, setServiceData] = useState({
    id: "",
    title: "",
    description: "",
    related: "", // slug saklanacak
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [openDeleteAlert, setOpenDeleteAlert] = useState({
    open: false,
    data: null,
  });

  const [openUpdateAlert, setOpenUpdateAlert] = useState({
    open: false,
    data: null,
  });

  // ✅ Tüm servisleri getir
  const getAllServices = async () => {
    try {
      const response = await axiosInstance.get(API_PATHS.SERVICE.GET_ALL);
      setServiceList(response.data);
    } catch (error) {
      console.error("Servisler alınırken hata:", error);
    }
  };

  // ✅ Tüm blog postları getir
  const getAllPosts = async () => {
    try {
      const response = await axiosInstance.get(API_PATHS.POSTS.GET_ALL, {
        params: { status: "published" },
      });
      setBlogPostList(response.data.posts || []);
    } catch (error) {
      console.error("Blog postlar alınırken hata:", error);
    }
  };

  // ✅ Formu doldur / resetle
  const editable = () => {
    if (openUpdateAlert.open) {
      if (openUpdateAlert.data) {
        setServiceData({
          id: openUpdateAlert.data._id,
          title: openUpdateAlert.data.title,
          description: openUpdateAlert.data.description,
          related: openUpdateAlert.data.related || "", // slug string
        });
      } else {
        setServiceData({ id: "", title: "", description: "", related: "" });
      }
      setError("");
    }
  };

  // ✅ Kaydet / Güncelle
  const handlePublish = async () => {
    if (!serviceData.title.trim()) {
      setError("Lütfen bir başlık giriniz.");
      return;
    }
    if (!serviceData.related) {
      setError("Lütfen bir blog yazısı seçiniz.");
      return;
    }

    setLoading(true);
    setError("");
    try {
      const reqPayload = {
        title: serviceData.title,
        description: serviceData.description,
        related: serviceData.related, // slug
      };

      if (serviceData.id) {
        await axiosInstance.put(
          API_PATHS.SERVICE.UPDATE(serviceData.id),
          reqPayload
        );
        toast.success("Hizmet başarıyla güncellendi.");
      } else {
        await axiosInstance.post(API_PATHS.SERVICE.CREATE, reqPayload);
        toast.success("Hizmet başarıyla oluşturuldu.");
      }

      setOpenUpdateAlert({ open: false, data: null });
      getAllServices();
    } catch (error) {
      setError("Hizmet kaydedilirken hata oluştu.");
      console.error("Hata detayı:", error);
    } finally {
      setLoading(false);
    }
  };

  // ✅ Silme işlemi
  const deleteService = async (serviceId) => {
    try {
      await axiosInstance.delete(API_PATHS.SERVICE.DELETE(serviceId));
      toast.success("Hizmet başarıyla silindi.");
      setOpenDeleteAlert({ open: false, data: null });
      getAllServices();
    } catch (error) {
      console.error("Silme hatası:", error);
    }
  };

  useEffect(() => {
    getAllServices();
    getAllPosts();
    editable();
  }, [openUpdateAlert]);

  return (
    <DashboardLayout activeMenu="Hizmetler">
      <div className="w-auto sm:max-w-[900px] mx-auto">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-semibold mt-5 mb-5">Hizmetler</h2>
          <button
            className="btn-small"
            onClick={() => setOpenUpdateAlert({ open: true, data: null })}
          >
            <LuPlus className="text-[18px]" /> Hizmet Oluştur
          </button>
        </div>

        {/* ✅ Servis Listesi */}
        <div className="mt-5">
          {serviceList.map((service) => (
            <div
              key={service._id}
              className="flex items-center gap-4 bg-white p-3 mb-5 rounded-lg cursor-pointer group"
              onClick={() => setOpenUpdateAlert({ open: true, data: service })}
            >
              <div className="flex-1">
                <h3 className="text-[13px] md:text-[15px] text-black font-medium">
                  {service.title}
                </h3>
                <p className="text-[12px] text-gray-600 mt-1">
                  {service.description}
                </p>
                <p className="text-[11px] text-gray-500 mt-1">
                  Bağlı Blog:{" "}
                  <span className="font-medium">
                    {typeof service.related === "object"
                      ? service.related.title
                      : service.related}
                  </span>
                </p>
              </div>

              <button
                className="hidden md:flex items-center gap-2 text-xs text-rose-500 font-medium bg-rose-50 px-3 py-1 rounded border border-rose-100 hover:border-rose-200 cursor-pointer"
                onClick={(e) => {
                  e.stopPropagation();
                  setOpenDeleteAlert({ open: true, data: service._id });
                }}
              >
                <LuTrash2 /> <span className="hidden md:block">Sil</span>
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* ✅ Silme Modal */}
      <Modal
        isOpen={openDeleteAlert.open}
        onClose={() => setOpenDeleteAlert({ open: false, data: null })}
        title="Silme İşlemi"
      >
        <div className="w-[60vw] md:w-[40vw]">
          <DeleteAlertContent
            content="Bu hizmeti silmek istediğinize emin misiniz?"
            onDelete={() => deleteService(openDeleteAlert.data)}
          />
        </div>
      </Modal>

      {/* ✅ Oluştur / Güncelle Modal */}
      <Modal
        isOpen={openUpdateAlert.open}
        onClose={() => setOpenUpdateAlert({ open: false, data: null })}
        title={serviceData.id ? "Hizmeti Güncelle" : "Hizmet Ekle"}
      >
        <div className="w-[60vw] md:w-[40vw]">
          <div className="p-5">
            <Input
              label="Hizmet Başlığı"
              value={serviceData.title}
              onChange={(e) =>
                setServiceData((prev) => ({ ...prev, title: e.target.value }))
              }
              placeholder="Başlık"
            />
            <label className="text-[13px] text-slate-800">
              Hizmet Açıklaması
            </label>
            <textarea
              placeholder="Açıklama"
              className="form-input h-22 my-3"
              value={serviceData.description}
              onChange={(e) =>
                setServiceData((prev) => ({
                  ...prev,
                  description: e.target.value,
                }))
              }
            />

            {/* ✅ Blog Dropdown */}
            <label className="text-[13px] text-slate-800">
              Bağlı Blog Yazısı
            </label>
            <select
              className="form-input my-3"
              value={serviceData.related}
              onChange={(e) =>
                setServiceData((prev) => ({ ...prev, related: e.target.value }))
              }
            >
              <option value="">Seçiniz</option>
              {blogPostList.map((post) => (
                <option key={post._id} value={post.slug}>
                  {post.title}
                </option>
              ))}
            </select>

            {error && <p className="text-red-500 text-sm mt-2">{error}</p>}

            <div className="flex justify-end mt-6">
              <button
                className="btn-small"
                disabled={loading}
                onClick={handlePublish}
              >
                {loading
                  ? "Kaydediliyor..."
                  : serviceData.id
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

export default ServiceList;
