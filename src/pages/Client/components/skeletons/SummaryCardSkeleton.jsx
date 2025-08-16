const SummaryCardSkeleton = () => (
  <div className="animate-pulse bg-white rounded-md overflow-hidden">
    <div className="w-full h-64 bg-gray-200" />
    <div className="p-3">
      <div className="h-5 w-3/4 bg-gray-200 rounded" />
      <div className="mt-3 space-y-2">
        <div className="h-3 w-full bg-gray-200 rounded" />
        <div className="h-3 w-10/12 bg-gray-200 rounded" />
        <div className="h-3 w-9/12 bg-gray-200 rounded" />
      </div>
      <div className="mt-4 flex gap-2">
        <div className="h-6 w-16 bg-gray-200 rounded-full" />
        <div className="h-6 w-20 bg-gray-200 rounded-full" />
        <div className="h-6 w-12 bg-gray-200 rounded-full" />
      </div>
    </div>
  </div>
);

export default SummaryCardSkeleton;
