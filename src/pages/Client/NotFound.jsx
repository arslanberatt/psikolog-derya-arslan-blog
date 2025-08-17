import React from "react";
import { Link } from "react-router-dom";
import BlogLayout from "../../components/layouts/BlogLayout/BlogLayout";

const NotFound = () => {
  return (
    <BlogLayout>
      <div className="flex flex-col items-center justify-center min-h-96 text-center">
        <h1 className="text-6xl font-bold text-black mb-4">404</h1>
        <p className="text-lg text-gray-700 mb-6">
          Aradığınız sayfa bulunamadı.
        </p>
        <Link
          to="/"
          className="px-6 py-3 bg-black text-white rounded-lg shadow hover:bg-sky-700 transition"
        >
          Ana Sayfaya Dön
        </Link>
      </div>
    </BlogLayout>
  );
};

export default NotFound;
