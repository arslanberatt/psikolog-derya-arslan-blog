import React, { useContext, useState } from "react";
import { LuChevronDown, LuDot, LuReply, LuTrash2 } from "react-icons/lu";
import { toast } from "react-toastify";
import { UserContext } from "../../context/userContext";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPaths";
import moment from "moment";
import CharAvatar from "./CharAvatar";
import CommentReplyInput from "../Inputs/CommentReplyInput";

const CommentInfoCard = ({
  commentId,
  authorName,
  authorPhoto,
  content,
  updatedOn,
  post,
  replies,
  getallComments,
  onDelete,
  isSubReply,
}) => {
  const { user } = useContext(UserContext);
  const [replytext, setReplyText] = useState("");
  const [showReplyForm, setShowReplyForm] = useState(false);
  const [showSubReplies, setShowSubReplies] = useState(false);

  const handleCancelReply = () => {
    setReplyText("");
    setShowReplyForm(false);
  };

  const handleAddReply = async () => {
    try {
      const response = await axiosInstance.post(
        API_PATHS.COMMENTS.ADD(post._id),
        {
          content: replytext,
          parentComment: commentId,
        }
      );
      toast.success("Yanıt başarıyla eklendi!");
      setReplyText("");
      setShowReplyForm(false);
      getallComments();
    } catch (error) {
      console.error("Yanıt eklenirken bi hata meydana geldi!", error);
    }
  };

  
  return (
    <div
      className={`bg-white p-3 rounded-lg cursor-pointer group ${
        isSubReply ? "mb-1" : "mb-4"
      }`}
    >
      <div className="grid grid-cols-12 gap-3">
        <div className="col-span-12 md:col-span-8 order-2 md:order-1">
          <div className="">
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
              <div className="flex items-center gap-3 mt-1.5">
                {!isSubReply && (
                  <>
                    <button
                      className="flex items-center gap-2 text-[13px] font-medium text-sky-950 bg-sky-50 px-4 py-0.5 rounded-full hover:bg-sky-500 hover:text-white cursor-pointer"
                      onClick={() =>
                        setShowReplyForm((prevState) => !prevState)
                      }
                    >
                      <LuReply /> Yanıtla
                    </button>
                    <button
                      className="flex items-center gap-1.5 text-[13px] font-medium text-sky-950 bg-sky-50 px-4 py-0.5 rounded-full hover:bg-sky-500 hover:text-white cursor-pointer"
                      onClick={() =>
                        setShowSubReplies((prevState) => !prevState)
                      }
                    >
                      {replies?.length || 0}{" "}
                      {replies?.length == 1 ? "yanıtla" : "yanıtlar"}{" "}
                      <LuChevronDown
                        className={`${showSubReplies ? "rotate-180" : ""}`}
                      />{" "}
                    </button>{" "}
                  </>
                )}
                <button
                  className="flex items-center gap-1.5 text-[13px] font-medium text-sky-950 bg-sky-50 px-4 py-0.5 rounded-full hover:bg-rose-500 hover:text-white cursor-pointer"
                  onClick={() => onDelete()}
                >
                  <LuTrash2 /> Sil
                </button>
              </div>
            </div>
          </div>
        </div>
        {!isSubReply && (
          <div className="col-span-12 md:col-span-4 order-1 md:order-2 flex items-center gap-4">
            <img
              src={post?.coverImageUrl}
              alt="blog photo"
              className="w-16 h-10 rounded-lg object-cover"
            />
            <div className="flex-1">
              <div className="flex items-center gap-1">
                <h4 className="text-xs text-gray-800 font-medium">
                  {post?.title}
                </h4>
              </div>
            </div>
          </div>
        )}
      </div>
      {!isSubReply && showReplyForm && (
        <CommentReplyInput
          user={user}
          authorName={authorName}
          content={content}
          replytext={replytext}
          setReplyText={setReplyText}
          handleAddReply={handleAddReply}
          handleCancelReply={handleCancelReply}
        />
      )}
      {showSubReplies &&
        replies?.length > 0 &&
        replies.map((comment, index) => (
          <div className={`ml-5 ${index == 0 ? "mt-5" : ""}`} key={comment._id}>
            <CommentInfoCard
              authorName={comment.author.name}
              authorPhoto={comment.author.profileImageUrl}
              content={comment.content}
              post={comment.post}
              replies={comment.replies || []}
              isSubReply
              updatedOn={
                comment.updatedAt
                  ? moment(comment.updatedAt).format("Do MMM YYYY")
                  : "_"
              }
              onDelete={() => onDelete(comment._id)}
            />
          </div>
        ))}
    </div>
  );
};

export default CommentInfoCard;
