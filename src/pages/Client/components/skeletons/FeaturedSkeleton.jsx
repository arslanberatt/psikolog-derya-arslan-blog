const FeaturedSkeleton = () => (
  <div className="animate-pulse flex gap-2">
    <div className="w-1/2 aspect-[16/16] lg:aspect-[16/9] rounded-lg bg-gray-200" />
    <div className="w-1/2">
      <div className="mt-4 h-6 bg-gray-200 rounded" />
      <div className="mt-4  space-y-2">
        <div className="h-3 w-full bg-gray-200 rounded" />
        <div className="h-3 w-11/12 bg-gray-200 rounded" />
        <div className="h-3 w-11/12 bg-gray-200 rounded" />
        <div className="h-3 w-11/12 bg-gray-200 rounded" />
        <div className="h-3 w-4/5 bg-gray-200 rounded" />
      </div>
      <div className="flex flex-wrap mt-3 gap-3">
        <div className="h-6 w-1/4 bg-gray-200 rounded-xl" />
        <div className="h-6 w-2/4 bg-gray-200 rounded-xl" />
        <div className="h-6 w-2/4 bg-gray-200 rounded-xl" />
        <div className="h-6 w-1/4 bg-gray-200 rounded-xl" />
        <div className="h-6 w-2/5 bg-gray-200 rounded-xl" />
      </div>
    </div>
  </div>
);

export default FeaturedSkeleton;
