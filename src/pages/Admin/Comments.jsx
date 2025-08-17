import React, { useEffect, useState } from "react";
import DashboardLayout from "../../components/layouts/DashboardLayout";
import { useNavigate } from "react-router-dom";
import moment from "moment";
import CommentInfoCard from "../../components/Cards/CommentInfoCard";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPaths";
import DeleteAlertContent from "../../components/DeleteAlertContent";
import Modal from "../../components/Modal";
import { toast } from "react-toastify";

const Comments = () => {
  const navigate = useNavigate();
  const [comments, setComments] = useState([]);

  const [openDeleteAlert, setOpenDeleteAlert] = useState({
    open: false,
    data: null,
  });

  const getallComments = async () => {
    try {
      const response = await axiosInstance.get(API_PATHS.COMMENTS.GET_ALL);
      setComments(response.data?.length > 0 ? response.data : []);
    } catch (error) {
      console.error(`Yorumlar çekilirken bir hata meydana geldi: ${error}`);
    }
  };

  const deleteComment = async (commentId) => {
    try {
      await axiosInstance.delete(API_PATHS.COMMENTS.DELETE(commentId));
      toast.success("Yorum başarıyla silindi!");
      setOpenDeleteAlert({
        open: false,
        data: null,
      });
      getallComments();
    } catch (error) {
      console.error("Yorum silinirken bir hata meydana geldi!", error);
    }
  };

  useEffect(() => {
    getallComments();
    return () => {};
  }, []);

  return (
    <DashboardLayout activeMenu="Yorumlar">
      <div className="w-auto sm:max-w-[900px] mx-auto">
        <h2 className="text-2xl font-medium mt-5 mb-5">Yorumlar</h2>
        {comments.map((comment) => (
          <CommentInfoCard
            key={comment._id}
            commentId={comment._id || null}
            authorName={comment.author.name}
            authorPhoto={comment.author.profileImageUrl}
            content={comment.content}
            updatedOn={
              comment.updatedAt
                ? moment(comment.updatedAt).format("Do MMM YYYY")
                : "_"
            }
            post={comment.post}
            replies={comment.replies || []}
            getallComments={getallComments}
            onDelete={(commentId) =>
              setOpenDeleteAlert({ open: true, data: commentId || comment._id })
            }
          />
        ))}
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
            content="Bu yorumu silmek istediğinize emin misiniz?"
            onDelete={() => deleteComment(openDeleteAlert.data)}
          />
        </div>
      </Modal>
    </DashboardLayout>
  );
};

export default Comments;
