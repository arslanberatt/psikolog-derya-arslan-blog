import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { API_PATHS } from "../../../utils/apiPaths";
import axiosInstance from "../../../utils/axiosInstance";
import TrendingPostSkeleton from "./skeletons/TrendingPostSkeleton";

const TrendingPostsList = () => {
  const navigate = useNavigate();

  const [blogPostList, setBlogPostList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const getTrendingPosts = async () => {
    try {
      setIsLoading(true);
      const response = await axiosInstance.get(
        API_PATHS.POSTS.GET_TRENDING_POSTS
      );
      setBlogPostList(response.data?.length > 0 ? response.data : []);
      setIsLoading(false);
    } catch (error) {
      console.error(`Verileri çekerken hata oluştu: ${error}`);
    } finally {
      setIsLoading(false);
    }
  };

  const handleClick = (post) => {
    navigate(`/blog/${post.slug}`);
  };

  useEffect(() => {
    getTrendingPosts();
  }, []);

  return (
    <div>
      <h4 className="text-base text-black font-medium mb-3">Popüler Yazılar</h4>
      {isLoading ? (
        <>
          <TrendingPostSkeleton />
          <TrendingPostSkeleton />
          <TrendingPostSkeleton />
        </>
      ) : (
        blogPostList.length > 0 &&
        blogPostList
          .slice(0, 8)
          .map((item) => (
            <PostCard
              key={item._id}
              title={item.title}
              coverImageUrl={item.coverImageUrl}
              tags={item.tags}
              onClick={() => handleClick(item)}
            />
          ))
      )}
    </div>
  );
};

export default TrendingPostsList;

const PostCard = ({ title, coverImageUrl, tags, onClick }) => {
  return (
    <div className="cursor-pointer mb-3" onClick={onClick}>
      <h6 className="text-[10px] font-medium text-sky-500">
        {tags[0]?.toUpperCase() || "BLOG"}
      </h6>
      <div className="flex items-start gap-4 mt-2">
        <img
          src={coverImageUrl}
          alt={title}
          className="w-14 h-14 object-cover rounded"
        />
        <h2 className="text-sm md:text-base font-medium mb-2 line-clamp-3">
          {title}
        </h2>
      </div>
    </div>
  );
};
