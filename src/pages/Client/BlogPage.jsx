import React, { useState } from "react";
import BlogLayout from "../../components/layouts/BlogLayout/BlogLayout";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { API_PATHS } from "../../utils/apiPaths";
import axiosInstance from "../../utils/axiosInstance";
import { LuGalleryVerticalEnd, LuLoaderCircle } from "react-icons/lu";
import FeaturedBlogPost from "./components/FeaturedBlogPost";
import moment from "moment";
import BlogPostSummaryCard from "./components/BlogPostSummaryCard";
import TrendingPostsList from "./components/TrendingPostsList";

const BlogPage = () => {
  const navigate = useNavigate();

  const [blogPostList, setBlogPostList] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(null);
  const [isLoading, setIsLoading] = useState(null);

  const getAllPosts = async (pageNumber = 1) => {
    try {
      setIsLoading(true);
      const response = await axiosInstance.get(API_PATHS.POSTS.GET_ALL, {
        params: {
          status: "published",
          page: pageNumber,
        },
      });
      const { posts, totalPages } = response.data;
      setBlogPostList((prevPosts) =>
        pageNumber === 1 ? posts : [...prevPosts, ...posts]
      );
      setTotalPages(totalPages);
      setPage(pageNumber);
    } catch (error) {
      console.error(`Verileri çekerken hata oluştu: ${error}`);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLoadMore = () => {
    if (page < totalPages) {
      getAllPosts(page + 1);
    }
  };

  useEffect(() => {
    getAllPosts(1);
  }, []);

  const handleClick = (post) => {
    navigate(`/${post.slug}`);
  };

  return (
    <BlogLayout activeMenu="Bloglar">
      <div className="grid grid-cols-12 gap-5 md:px-4">
        <div className="col-span-12 md:col-span-9">
          {blogPostList.length > 0 && (
            <FeaturedBlogPost
              title={blogPostList[0].title}
              coverImageUrl={blogPostList[0].coverImageUrl}
              content={blogPostList[0].content}
              tags={blogPostList[0].tags}
              updatedOn={
                blogPostList[0].createdAt
                  ? moment(blogPostList[0].createdAt).format("Do MMM YYYY")
                  : "-"
              }
              authorName={blogPostList[0].author.name}
              onClick={() => handleClick(blogPostList[0])}
            />
          )}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
            {blogPostList.length > 0 &&
              blogPostList
                .slice(1)
                .map((item) => (
                  <BlogPostSummaryCard
                    key={item._id}
                    title={item.title}
                    coverImageUrl={item.coverImageUrl}
                    content={item.content}
                    tags={item.tags}
                    updatedOn={
                      item.createdAt
                        ? moment(item.createdAt).format("Do MMM YYYY")
                        : "-"
                    }
                    authorName={item.author.name}
                    onClick={() => handleClick(item)}
                  />
                ))}
          </div>
          {page < totalPages && (
            <div className="flex items-center justify-center mb-8">
              <button
                className="flex items-center gap-3 text-sm text-white font-medium bg-black px-7 py-2.5 rounded-full text-nowrap hover:scale-105 transition-all cursor-pointer"
                disabled={isLoading}
                onClick={handleLoadMore}
              >
                {isLoading ? (
                  <LuLoaderCircle className="animate-spin text-[15px]" />
                ) : (
                  <LuGalleryVerticalEnd className="text-lg" />
                )}
                {isLoading ? "Yükleniyor..." : "Daha fazla yükle"}
              </button>
            </div>
          )}
        </div>
        <div className="col-span-12 md:col-span-3">
          <TrendingPostsList />
        </div>
      </div>
    </BlogLayout>
  );
};

export default BlogPage;
