import React, { useEffect, useState } from "react";
import DashboardLayout from "../../components/layouts/DashboardLayout";
import MDEditor, { commands } from "@uiw/react-md-editor";
import { LuLoaderCircle, LuSave, LuSend, LuTrash2 } from "react-icons/lu";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPaths";
import uploadImage from "../../utils/uploadImage";
import { useNavigate, useParams } from "react-router-dom";
import CoverImageSelector from "../../components/Inputs/CoverImageSelector";
import TagInput from "../../components/Inputs/TagInput";
import { toast } from "react-toastify";
import { getToastMessagesByType } from "../../utils/helper";
import DeleteAlertContent from "../../components/DeleteAlertContent";
import Modal from "../../components/Modal";

const BlogPostEditor = ({ isEdit }) => {
  const navigate = useNavigate();
  const { postSlug = "" } = useParams();

  const [postData, setPostData] = useState({
    id: "",
    content: "",
    coverImageUrl: "",
    coverPreview: "",
    tags: "",
    isDraft: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const [openDeleteAlert, setOpenDeleteAlert] = useState(false);

  const handleValueChange = (key, value) => {
    setPostData((prevData) => ({ ...prevData, [key]: value }));
  };

  const handlePublish = async (isDraft) => {
    let coverImageUrl = "";

    if (!postData.title.trim()) {
      setError("Lütfen bir başlık giriniz.");
      return;
    }
    if (!postData.content.trim()) {
      setError("Lütfen bir içerik giriniz.");
      return;
    }
    if (!isDraft) {
      if (!isEdit && !postData.coverImageUrl) {
        setError("Lütfen bir blog fotoğrafı seçiniz.");
        return;
      }

      if (!isEdit && !postData.coverImageUrl && !postData.coverPreview) {
        setError("Lütfen bir blog fotoğrafı seçiniz.");
        return;
      }

      if (!postData.tags.length) {
        setError("Lütfen bir kaç etiket ekleyiniz.");
        return;
      }
    }
    setLoading(true);
    setError("");
    try {
      if (postData.coverImageUrl instanceof File) {
        const imgUploadRes = await uploadImage(postData.coverImageUrl);
        coverImageUrl = imgUploadRes.imageUrl || "";
      } else {
        coverImageUrl = postData.coverPreview;
      }

      const reqPayload = {
        title: postData.title,
        content: postData.content,
        coverImageUrl,
        tags: postData.tags,
        isDraft: isDraft ? true : false,
      };
      const response = isEdit
        ? await axiosInstance.put(
            API_PATHS.POSTS.UPDATE(postData.id),
            reqPayload
          )
        : await axiosInstance.post(API_PATHS.POSTS.CREATE, reqPayload);

      if (response.data) {
        toast.success(
          getToastMessagesByType(
            isDraft ? "draft" : isEdit ? "edit" : "published"
          ),
          {
            onClose: () => navigate("/admin/posts"),
          }
        );
      }
    } catch (error) {
      setError(
        "Blog yayınlanırken bir hata meydana geldi. Lütfen tekrar deneyin."
      );
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const fetchPostDetailsBySlug = async () => {
    try {
      const response = await axiosInstance.get(
        API_PATHS.POSTS.GET_BY_SLUG(postSlug)
      );

      if (response.data) {
        const data = response.data;

        setPostData((prevState) => ({
          ...prevState,
          id: data._id,
          title: data.title,
          content: data.content,
          coverPreview: data.coverImageUrl,
          tags: data.tags,
          isDraft: data.isDraft,
        }));
      }
    } catch (error) {
      console.error("Blog bilgilerini çekerken bir hata meydana geldi:", error);
    }
  };

  const deletePost = async () => {
    try {
      await axiosInstance.delete(API_PATHS.POSTS.DELETE(postData.id));
      setOpenDeleteAlert(false);
      toast.success("Blog başarıyla silindi", {
        onClose: () => navigate("/admin/posts"),
      });
    } catch (error) {
      console.error("Blog silinirken bir hata meydana geldi:", error);
    }
  };

  useEffect(() => {
    if (isEdit) {
      fetchPostDetailsBySlug();
    }
    return () => {};
  }, []);

  return (
    <DashboardLayout activeMenu="Bloglar">
      <div className="my-5">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-5 my-4">
          <div className="form-card p-6 col-span-12 xs:col-span-8">
            <div className="flex items-center justify-between">
              <h2 className="text-base md:text-lg font-medium">
                {!isEdit ? "Yeni blog ekle" : "Blogu düzenle"}
              </h2>
              <div className="flex items-center gap-3">
                {isEdit && (
                  <button
                    className="flex items-center gap-2.5 text-[13px] font-medium text-rose-500 bg-rose-50/60 rounded px-1.5 md:px-3 py-1 md:py-[3px] border border-rose-50 hover:border-rose-300 cursor-pointer hover:scale-[1.02] transition-all"
                    disabled={loading}
                    onClick={() => setOpenDeleteAlert(true)}
                  >
                    <LuTrash2 className="text-sm" />{" "}
                    <span className="hidden md:block">Sil</span>
                  </button>
                )}
                <button
                  className="flex items-center gap-2 text-[13px] font-semibold text-sky-500 bg-sky-50/60 rounded-md px-1.5 md:px-3 py-1 md:py-[3px] border border-sky-100 hover:border-sky-400 cursor-pointer hover:scale-[1.02] transition-all"
                  disabled={loading}
                  onClick={() => handlePublish(true)}
                >
                  <LuSave className="text-sm" />{" "}
                  <span className="hidden md:block">Taslak olarak kaydet</span>
                </button>
                <button
                  className="flex items-center gap-2.5 text-[13px] font-medium text-sky-600 hover:text-white hover:bg-linear-to-r hover:from-sky-500 hover:to-indigo-500 rounded px-3 py-[3px] border border-sky-500 hover:border-sky-50 cursor-pointer transition-all"
                  disabled={loading}
                  onClick={() => handlePublish(false)}
                >
                  {loading ? (
                    <LuLoaderCircle className="animate-spin text-[15px]" />
                  ) : (
                    <LuSend className="text-sm" />
                  )}{" "}
                  Yayınla
                </button>
              </div>
            </div>
            {error && <p className="text-red-500 text-xs pb-2.5">{error}</p>}
            <div className="mt-4">
              <label className="text-xs font-medium text-slate-600">
                Blog Başlığı
              </label>
              <input
                placeholder="Başlık"
                className="form-input"
                value={postData.title}
                onChange={({ target }) =>
                  handleValueChange("title", target.value)
                }
              />
            </div>
            <div className="mt-4">
              <CoverImageSelector
                image={postData.coverImageUrl}
                setImage={(value) => handleValueChange("coverImageUrl", value)}
                preview={postData.coverPreview}
                setPreview={(value) => handleValueChange("coverPreview", value)}
              />
            </div>
            <div className="mt-3">
              <label className="text-xs font-medium to-slate-600">İçerik</label>
              <div data-color-mode="light">
                <MDEditor
                  value={postData.content}
                  onChange={(data) => {
                    handleValueChange("content", data);
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
                Etiketler
              </label>
              <TagInput
                tags={postData?.tags || []}
                setTags={(data) => {
                  handleValueChange("tags", data);
                }}
              />
            </div>
          </div>
        </div>
      </div>
      <Modal
        isOpen={openDeleteAlert}
        onClose={() => {
          setOpenDeleteAlert(false);
        }}
        title="Silme İşlemi"
      >
        <div className="w-[60vw] md:w-[40vw]">
          <DeleteAlertContent
            content="Bu yazıyı silmek istediğinize emin misiniz?"
            onDelete={() => deletePost()}
          />
        </div>
      </Modal>
    </DashboardLayout>
  );
};

export default BlogPostEditor;
