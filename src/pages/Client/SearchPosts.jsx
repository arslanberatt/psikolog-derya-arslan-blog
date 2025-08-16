import React, { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPaths";
import BlogLayout from "../../components/layouts/BlogLayout/BlogLayout";
import BlogPostSummaryCard from "./components/BlogPostSummaryCard";
import moment from "moment";

const SearchPosts = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const query = searchParams.get("query");

  const [searchResults, setSearchResults] = useState([]);

  const handleSearch = async () => {
    try {
      const response = await axiosInstance.get(API_PATHS.POSTS.SEARCH, {
        params: { q: query },
      });
      if (response.data) {
        setSearchResults(response.data || []);
      }
    } catch (error) {
      console.error("Arama yapılırken bir hata meydana geldi!", error);
    }
  };

  const handleClick = (post) => {
    navigate(`/${post.slug}`);
  };

  useEffect(() => {
    handleSearch();
    return () => {};
  }, [query]);

  return (
    <BlogLayout>
      <div>
        <h3 className="text-lg font-medium">
          "<span className="font-semibold">{query}" </span>
          aramasına özel sonuçlar
        </h3>
        <div className="">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
            {searchResults.length > 0 &&
              searchResults.map((item) => (
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

export default SearchPosts;
