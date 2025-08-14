import React from "react";
import CharAvatar from "../../../components/Cards/CharAvatar";
import MarkdownContent from "./MarkdownContent";
import { sanitizeMarkdown } from "../../../utils/helper";

const BlogPostSummaryCard = ({
  title,
  coverImageUrl,
  content,
  tags = [],
  updatedOn,
  authorName,
  onClick,
}) => {
  return (
    <div
      className="bg-white shadow-gray-100 rounded-md overflow-hidden cursor-pointer"
      onClick={onClick}
    >
      <img
        src={coverImageUrl}
        alt={title}
        className="w-full lg:h-64 h-72 object-cover border border-gray-100 rounded-lg"
      />
      <div className="py-2 md:py-3 px-2">
        <h2 className="text-lg md:text-xl font-bold mb-2 line-clamp-3">
          {title}
        </h2>
        <p className="text-gray-700 text-[13px] mb-4 line-clamp-3">
          <MarkdownContent content={sanitizeMarkdown(content || "")} />
        </p>
        <div className="flex items-center flex-wrap gap-2 mb-4">
          {tags.slice(0, 3).map((tag, index) => (
            <span
              key={index}
              className="bg-sky-200/50 text-sky-800/80 text-xs font-medium px-3 py-0.5 rounded-full text-nowrap"
            >
              # {tag}
            </span>
          ))}
        </div>
        <div className="flex items-center">
          <CharAvatar
            fullName={authorName || ""}
            width="w-10"
            height="h-10"
            style="rounded-full object-cover mr-2"
          />
          <div>
            <div className="text-gray-600 text-sm">{authorName}</div>
            <div className="text-gray-500 text-xs">{updatedOn}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogPostSummaryCard;
