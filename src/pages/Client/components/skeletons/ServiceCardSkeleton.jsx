const ServiceCardSkeleton = () => {
  return (
    <div className="animate-pulse bg-white shadow rounded-md overflow-hidden">
      <div className="p-3 flex flex-col gap-3">
        <div className="w-10 h-10 m-2 bg-gray-200 rounded" />
        <div className="h-5 w-3/4 bg-gray-200 rounded" />
        <div className="mt-3 space-y-2">
          <div className="h-3 w-full bg-gray-200 rounded" />
          <div className="h-3 w-10/12 bg-gray-200 rounded" />
          <div className="h-3 w-9/12 bg-gray-200 rounded" />
          <div className="h-3 w-10/12 bg-gray-200 rounded" />
        </div>
      </div>
    </div>
  );
};

export default ServiceCardSkeleton;
