import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { UserContext } from "../../context/userContext";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPaths";
import BlogLayout from "../../components/layouts/BlogLayout/BlogLayout";
import moment from "moment";
import { LuDot } from "react-icons/lu";
import TrendingPostsList from "./components/TrendingPostsList";
import MarkdownContent from "./components/MarkdownContent";
import SharePost from "./components/SharePost";
import { sanitizeMarkdown } from "../../utils/helper";
import CommentReplyInput from "../../components/Inputs/CommentReplyInput";
import CommentInfoCard from "./components/CommentInfoCard";
import LikeCommentButton from "./components/LikeCommentButton";

const BlogPostView = () => {
  const { slug } = useParams();
  const navigate = useNavigate();

  const [blogPostData, setBlogPostData] = useState(null);
  const [comments, setComments] = useState([]);
  const { user, setOpenAuthForm } = useContext(UserContext);

  const [replyText, setReplyText] = useState("");
  const [showReplyForm, setShowReplyForm] = useState(false);

  const fetchPostDetailBySlug = async () => {
    try {
      const { data } = await axiosInstance.get(
        API_PATHS.POSTS.GET_BY_SLUG(slug)
      );
      if (data) {
        setBlogPostData(data);
        fetchCommentByPostId(data._id);
        incrementViews(data._id);
      }
    } catch (error) {
      console.error("Error(fetchPostDetailBySlug): ", error);
    }
  };

  const fetchCommentByPostId = async (postId) => {
    try {
      const { data } = await axiosInstance.get(
        API_PATHS.COMMENTS.GET_ALL_BY_POST(postId)
      );
      if (data) setComments(data);
    } catch (error) {
      console.error("Error(fetchCommentByPostId): ", error);
    }
  };

  const incrementViews = async (postId) => {
    if (!postId) return;
    try {
      await axiosInstance.post(API_PATHS.POSTS.INCREMENT_VIEW(postId));
    } catch (error) {
      console.error("Error(incrementViews): ", error);
    }
  };

  const handleAddReply = async () => {
    if (!replyText.trim() || !blogPostData?._id) return;
    try {
      await axiosInstance.post(API_PATHS.COMMENTS.ADD(blogPostData._id), {
        content: replyText,
        parentComment: null,
      });
      setReplyText("");
      setShowReplyForm(false);
      fetchCommentByPostId(blogPostData._id);
    } catch (error) {
      console.error("Error(handleAddReply): ", error);
    }
  };

  const handleCancelReply = () => {
    setReplyText("");
    setShowReplyForm(false);
  };

  useEffect(() => {
    if (slug) {
      fetchPostDetailBySlug();
      document.title = `${
        blogPostData?.title || "Blog Yazısı"
      } | Klinik Psikolog Derya Arslan`;

      const metaDescription = document.querySelector(
        "meta[name='description']"
      );
      const desc =
        blogPostData?.content?.slice(0, 150) ||
        "Psikolog Derya Arslan’ın blog yazısını keşfedin.";

      if (metaDescription) {
        metaDescription.setAttribute("content", desc);
      } else {
        const newMeta = document.createElement("meta");
        newMeta.name = "description";
        newMeta.content = desc;
        document.head.appendChild(newMeta);
      }
    }
  }, [slug, blogPostData]);

  return (
    <BlogLayout>
      {blogPostData && (
        <>
          <div className="grid grid-cols-12 gap-8 relative">
            <div className="col-span-12 md:col-span-8 relative">
              <h1 className="text-lg md:text-2xl font-bold mb-2 line-clamp-3">
                {blogPostData.title}
              </h1>

              <div className="flex items-center gap-1 flex-wrap mt-3 mb-5">
                <span className="text-[13px] text-gray-500 font-medium">
                  {moment(blogPostData.createdAt || "").format("Do MMM YYYY")}
                </span>
                <LuDot className="text-xl text-gray-400" />
                <div className="flex items-center flex-wrap gap-2">
                  {blogPostData.tags?.slice(0, 3).map((tag, index) => (
                    <button
                      key={index}
                      className="bg-sky-200/50 text-sky-800/80 text-xs font-medium px-3 py-0.5 rounded-full text-nowrap cursor-pointer"
                      onClick={(e) => {
                        e.stopPropagation();
                        navigate(`/tag/${tag}`);
                      }}
                    >
                      # {tag}
                    </button>
                  ))}
                </div>
                <LuDot className="text-xl text-gray-400" />
              </div>

              <img
                src={blogPostData.coverImageUrl || ""}
                alt={blogPostData.title}
                className="w-full h-96 object-cover mb-6 rounded-lg"
              />

              <div>
                <MarkdownContent
                  content={sanitizeMarkdown(blogPostData?.content || "")}
                />
                <SharePost title={blogPostData.title} />

                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="text-lg font-medium">Yorumlar</h4>
                    <button
                      className="flex items-center justify-center gap-3 bg-linear-to-r from-sky-500 to-cyan-400 text-xs font-medium text-white px-5 py-2 rounded-full hover:bg-black hover:text-white"
                      onClick={() => {
                        if (!user) return setOpenAuthForm(true);
                        setShowReplyForm(true);
                      }}
                    >
                      Yorum Ekle
                    </button>
                  </div>
                </div>

                {showReplyForm && (
                  <div className="bg-white pt-1 pb-5 pr-8 rounded-lg mb-8">
                    <CommentReplyInput
                      user={user}
                      authorName={user?.name || ""}
                      content=""
                      replyText={replyText}
                      setReplyText={setReplyText}
                      handleAddReply={handleAddReply}
                      handleCancelReply={handleCancelReply}
                      disableAutoGen
                      type="yeni"
                    />
                  </div>
                )}

                {comments?.length > 0 &&
                  comments.map((comment) => (
                    <CommentInfoCard
                      key={comment._id}
                      commentId={comment._id}
                      authorName={comment.author.name}
                      content={comment.content}
                      updatedOn={
                        comment.updatedAt
                          ? moment(comment.updatedAt).format("Do MMM YYYY")
                          : "_"
                      }
                      post={comment.post}
                      replies={comment.replies || []}
                      getAllComments={() =>
                        fetchCommentByPostId(blogPostData._id)
                      }
                      onDelete={(commentId) =>
                        setOpenDeleteAlert({
                          open: true,
                          data: commentId || comment._id,
                        })
                      }
                    />
                  ))}
              </div>
            </div>
            <div className="col-span-12 md:col-span-4">
              <TrendingPostsList />
            </div>
            <LikeCommentButton
              postId={blogPostData._id || ""}
              likes={blogPostData.likes || 0}
              comments={blogPostData.length || 0}
            />
          </div>
        </>
      )}
    </BlogLayout>
  );
};

export default BlogPostView;
