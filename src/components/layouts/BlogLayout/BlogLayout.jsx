import React from "react";
import BlogNavbar from "./BlogNavbar";
import BlogFooter from "./BlogFooter";

const BlogLayout = ({ children, activeMenu }) => {
  return (
    <div className="bg-primary">
      <BlogNavbar activeMenu={activeMenu} />
      <div className="container mx-auto px-5 md:px-8 mt-10">{children}</div>
      <div className="pt-30">
        <BlogFooter />
      </div>
    </div>
  );
};

export default BlogLayout;
