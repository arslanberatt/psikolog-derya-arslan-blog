import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPaths";
import BlogPostSummaryCard from "./components/BlogPostSummaryCard";
import moment from "moment";
import BlogLayout from "../../components/layouts/BlogLayout/BlogLayout";
import TrendingPostsList from "./components/TrendingPostsList";
import { Helmet } from "react-helmet-async";

const PostByTags = () => {
  const { tagName } = useParams();
  const navigate = useNavigate();
  const [blogPostList, setBlogPostList] = useState([]);

  const getPostsByTag = async () => {
    try {
      const response = await axiosInstance.get(
        API_PATHS.POSTS.GET_BY_TAG(tagName)
      );
      setBlogPostList(response.data?.length > 0 ? response.data : []);
    } catch (error) {
      console.error(
        "Etikete göre blog verileri çekilirken bir hata meydana geldi!",
        error
      );
    }
  };

  const handleClick = (post) => {
    navigate(`/${post.slug}`);
  };

  useEffect(() => {
    getPostsByTag();
    return () => {};
  }, [tagName]);

  return (
    <BlogLayout>
      <Helmet>
        <title>{tagName} | Psikolog Derya Arslan</title>
        <meta
          name="description"
          content={`${tagName} ile ilgili tüm yazılar ve içerikler Psikolog Derya Arslan blogunda.`}
        />
      </Helmet>
      <div className="grid grid-cols-12 gap-5">
        <div className="col-span-12 md:col-span-9">
          <div className="flex items-center justify-center bg-linear-to-r from-sky-50 via-teal-50 to-cyan-100 h-32 p-6 rounded-lg">
            <div className="text-center">
              <h3 className="text-xl font-semibold text-sky-700">
                # {tagName}
              </h3>
              <p className="text-sm font-medium text-gray-700 mt-1">
                # {tagName} etiketli {blogPostList.length} adet yazı
              </p>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
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
        <div className="col-span-12 md:col-span-3">
          <TrendingPostsList />
        </div>
      </div>
    </BlogLayout>
  );
};

export default PostByTags;
