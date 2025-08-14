// StoriesGrid.jsx

import { useEffect, useState } from "react";
import axiosInstance from "../../../utils/axiosInstance";
import { API_PATHS } from "../../../utils/apiPaths";

export default function StoriesGrid() {
  const [serviceList, setServiceList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const getServiceList = async () => {
    try {
      setIsLoading(true);
      const response = await axiosInstance.get(API_PATHS.SERVICE.GET_ALL);
      setServiceList(response.data?.length > 0 ? response.data : []);
      setIsLoading(false);
    } catch (error) {
      console.error(`Verileri çekerken hata oluştu: ${error}`);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getServiceList();
  }, []);

  return (
    <section className="container py-12 ">
      <div className="container">
        <div className="relative my-12">
          <div className="absolute inset-0 h-[1px] bg-gradient-to-r from-transparent via-zinc-300 to-transparent blur-[1px] dark:via-zinc-700" />
          <div className="relative h-px bg-gradient-to-r from-transparent via-zinc-400 to-transparent dark:via-zinc-600" />
        </div>
      </div>

      {/* 3 kolon grid; ortada büyük "featured" kart */}
      <div className="grid grid-cols-1 gap-2 md:grid-cols-2 lg:grid-cols-3">
        {serviceList.map((service) => (
          <Card item={service} />
        ))}
      </div>
    </section>
  );
}

const Card = ({ item }) => {
  return (
    <article className="rounded-md bg-gray-50 p-5 transition duration-300 hover:bg-black/10 ">
      <div className="mb-4 inline-flex h-8 w-8 items-center justify-center rounded-md border border-black/10">
        <span className="text-sm">✳︎</span>
      </div>
      <h3 className="text-base font-semibold tracking-tight text-black">
        {item.title}
      </h3>
      <p className="mt-2 text-sm leading-6 text-black/60">{item.description}</p>
    </article>
  );
};
