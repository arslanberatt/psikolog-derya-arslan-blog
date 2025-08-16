const TrendingPostSkeleton = () => {
  return (
    <div className="animate-pulse mt-3 bg-white rounded-md overflow-hidden">
      <div className="h-3 w-14 mb-2 bg-gray-200 rounded" />
      <div className="flex space-x-2">
        <div className="w-14 h-14 bg-gray-200 rounded" />
        <div className="w-3/5">
          <div className="h-3 mb-2 bg-gray-200 rounded" />
          <div className="h-3 mb-2 bg-gray-200 rounded" />
        </div>
      </div>
    </div>
  );
};

export default TrendingPostSkeleton;
