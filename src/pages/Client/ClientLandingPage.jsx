import React, { useEffect, useState } from "react";
import BlogLayout from "../../components/layouts/BlogLayout/BlogLayout";
import HeaderSection from "./components/HeaderSection";
import BlogPostSummaryCard from "./components/BlogPostSummaryCard";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPaths";
import moment from "moment";
import StoriesGrid from "./components/StoriesGrid";

const ClientLandingPage = () => {
  const navigate = useNavigate();

  const [blogPostList, setBlogPostList] = useState([]);
  const [isLoading, setIsLoading] = useState(null);

  const getAllPosts = async () => {
    try {
      setIsLoading(true);
      const response = await axiosInstance.get(API_PATHS.POSTS.LAST, {
        params: {
          status: "published",
        },
      });

      const posts = response.data;

      setBlogPostList(posts);
    } catch (error) {
      console.error(`Verileri çekerken hata oluştu: ${error}`);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getAllPosts();
  }, []);

  const handleClick = (post) => {
    navigate(`/${post.slug}`);
  };

  return (
    <BlogLayout activeMenu="Anasayfa">
      <div className="grid grid-cols-12 gap-5 md:px-4">
        <div className="col-span-12  ">
          <HeaderSection />
          <StoriesGrid />
          <div className="container">
            <div className="relative my-12">
              <div className="absolute inset-0 h-[1px] bg-gradient-to-r from-transparent via-zinc-300 to-transparent blur-[1px] dark:via-zinc-700" />
              <div className="relative h-px bg-gradient-to-r from-transparent via-zinc-400 to-transparent dark:via-zinc-600" />
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 ">
            {blogPostList.length > 0 &&
              blogPostList.map((item) => (
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
        </div>
      </div>
    </BlogLayout>
  );
};

export default ClientLandingPage;
