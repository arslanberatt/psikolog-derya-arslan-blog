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

const ServiceList = () => {
  const navigate = useNavigate();

  const [serviceList, setServiceList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const [serviceData, setServiceData] = useState({
    id: "",
    title: "",
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

  const getAllServices = async (pageNumber = 1) => {
    try {
      setIsLoading(true);
      const response = await axiosInstance.get(API_PATHS.SERVICE.GET_ALL);
      const data = response.data;
      setServiceList(data);
    } catch (error) {
      console.error(`Verileri çekerken hata oluştu: ${error}`);
    } finally {
      setIsLoading(false);
    }
  };

  const editable = async () => {
    if (openUpdateAlert.open) {
      if (openUpdateAlert.data) {
        setServiceData({
          id: openUpdateAlert.data._id,
          title: openUpdateAlert.data.title,
          description: openUpdateAlert.data.description,
        });
      } else {
        setServiceData({ id: "", title: "", description: "" });
      }
      setError("");
    }
  };

  const handlePublish = async () => {
    if (!serviceData.title.trim()) {
      setError("Lütfen bir başlık giriniz.");
      return;
    }
    if (!serviceData.description.trim()) {
      setError("Lütfen bir açıklama giriniz.");
      return;
    }
    setLoading(true);
    setError("");
    try {
      const reqPayload = {
        title: serviceData.title,
        description: serviceData.description,
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
      setError("Hizmet kaydedilirken bir hata oluştu.");
      console.error("Hata detayı:", error);
    } finally {
      setLoading(false);
    }
  };

  const deleteService = async (serviceId) => {
    try {
      await axiosInstance.delete(API_PATHS.SERVICE.DELETE(serviceId));
      setOpenDeleteAlert({
        open: false,
        data: null,
      });
      toast.success("Hizmet başarıyla silindi");
      getAllServices();
    } catch (error) {
      console.error(`Hizmeti silerken bir hata oluştu: ${error}`);
    }
  };

  useEffect(() => {
    getAllServices();
    editable();
    return () => {};
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
                <div className="flex items-center gap-2.5 mt-2 flex-wrap">
                  <div className="text-[11px] text-gray-700 font-medium bg-gray-100 px-2.5 py-1 rounded">
                    Açıklama:
                  </div>
                  <div className="flex text-[11px] items-center gap-2.5">
                    {service.description}
                  </div>
                </div>
              </div>
              <button
                className="hidden md:flex items-center gap-2 text-xs text-rose-500 font-medium bg-rose-50 px-3 py-1 rounded text-nowrap border border-rose-100 hover:border-rose-200 cursor-pointer"
                onClick={(e) => {
                  e.stopPropagation(); // Üst div'e yayılmayı engelle
                  setOpenDeleteAlert({ open: true, data: service._id });
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
            onDelete={() => deleteService(openDeleteAlert.data)}
          />
        </div>
      </Modal>
      <Modal
        isOpen={openUpdateAlert?.open}
        onClose={() => {
          setOpenUpdateAlert({ open: false, data: null });
        }}
        title={serviceData.id ? "Hizmeti Güncelle" : "Hizmet Ekle"}
      >
        <div className="w-[60vw] md:w-[40vw]">
          <div className="p-5">
            <p className="text-[14px]">
              <Input
                label="Hizmet Başlığı"
                value={serviceData.title}
                onChange={(e) =>
                  setServiceData((prev) => ({
                    ...prev,
                    title: e.target.value,
                  }))
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
            </p>
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
