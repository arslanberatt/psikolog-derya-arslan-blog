import React, { useContext, useState } from "react";
import moment from "moment"; // EKLE: moment importu
import { UserContext } from "../../../context/userContext";
import axiosInstance from "../../../utils/axiosInstance";
import { API_PATHS } from "../../../utils/apiPaths";
import { toast } from "react-toastify";
import { LuChevronDown, LuDot, LuReply } from "react-icons/lu";
import CharAvatar from "../../../components/Cards/CharAvatar";
import CommentReplyInput from "../../../components/Inputs/CommentReplyInput";

const CommentInfoCard = ({
  commentId,
  authorName,
  content,
  updatedOn,
  post,
  replies = [],
  getAllComments,
  onDelete,
  isSubReply = false, // <- prop olarak al
}) => {
  const { user, setOpenAuthForm } = useContext(UserContext);
  const [replyText, setReplyText] = useState("");
  const [showReplyForm, setShowReplyForm] = useState(false);
  const [showSubReplies, setShowSubReplies] = useState(false); // <- bunu aç/kapat

  const handleCancelReply = () => {
    setReplyText("");
    setShowReplyForm(false);
  };

  const handleAddReply = async () => {
    try {
      await axiosInstance.post(API_PATHS.COMMENTS.ADD(post._id), {
        content: replyText,
        parentComment: commentId,
      });
      toast.success("Yanıt başarıyla eklendi!");
      setReplyText("");
      setShowReplyForm(false);
      getAllComments && getAllComments();
    } catch (error) {
      console.error("Yanıt eklenirken bir hata yaşandı!", error);
    }
  };

  return (
    <div
      className={`bg-white p-3 rounded-lg cursor-pointer group mb-5 ${
        isSubReply ? "ml-5" : ""
      }`}
    >
      <div className="grid grid-cols-12 gap-3">
        <div className="col-span-12 md:col-span-8 order-2 md:order-1">
          <div className="flex items-start gap-3">
            <CharAvatar
              fullName={authorName || ""}
              width="w-10"
              height="h-10"
              style="rounded-full object-cover"
            />
            <div className="flex-1">
              <div className="flex items-center gap-1">
                <h3 className="text-[12px] text-gray-500 font-medium">
                  @{authorName}
                </h3>
                <LuDot className="text-gray-500" />
                <span className="text-[12px] text-gray-500 font-medium">
                  {updatedOn}
                </span>
              </div>

              <p className="text-sm text-black font-medium">{content}</p>

              {!isSubReply && (
                <div className="flex items-center gap-3 mt-1.5">
                  <button
                    className="flex items-center gap-2 text-[13px] font-medium text-sky-600 bg-sky-50 px-4 py-0.5 rounded-full hover:bg-sky-500 hover:text-white"
                    onClick={() => {
                      if (!user) return setOpenAuthForm(true);
                      setShowReplyForm((p) => !p);
                    }}
                  >
                    <LuReply /> Yanıtla
                  </button>

                  <button
                    className="flex items-center gap-1.5 text-[13px] font-medium text-sky-600 bg-sky-50 px-4 py-0.5 rounded-full hover:bg-sky-500 hover:text-white"
                    onClick={() => setShowSubReplies((p) => !p)} // <-- DÜZELTME
                  >
                    {replies.length || 0}{" "}
                    {replies.length === 1 ? "reply" : "replies"}
                    <LuChevronDown
                      className={`${showSubReplies ? "rotate-180" : ""}`}
                    />
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {!isSubReply && showReplyForm && (
        <CommentReplyInput
          user={user}
          authorName={authorName}
          content={content}
          replyText={replyText}
          setReplyText={setReplyText}
          handleAddReply={handleAddReply}
          handleCancelReply={handleCancelReply}
          disableAutoGen
        />
      )}

      {showSubReplies &&
        replies.length > 0 &&
        replies.map((child, index) => (
          <div key={child._id} className={`${index === 0 ? "mt-5" : ""}`}>
            <CommentInfoCard
              commentId={child._id}
              authorName={child.author.name}
              content={child.content}
              updatedOn={
                child.updatedAt
                  ? moment(child.updatedAt).format("Do MMM YYYY")
                  : "_"
              }
              post={child.post}
              replies={child.replies || []}
              getAllComments={getAllComments}
              onDelete={() => onDelete(child._id)}
              isSubReply // <- çocuklar için true
            />
          </div>
        ))}
    </div>
  );
};

export default CommentInfoCard;
