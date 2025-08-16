const DetailSectionSkeleton = () => (
  <div>
    <div className="container">
      <div className="relative my-12">
        <div className="absolute inset-0 h-[1px] bg-gradient-to-r from-transparent via-zinc-300 to-transparent blur-[1px] dark:via-zinc-700" />
        <div className="relative h-px bg-gradient-to-r from-transparent via-zinc-400 to-transparent dark:via-zinc-600" />
      </div>
    </div>
    <div>
      <div className="h-6 w-32 bg-neutral-200 rounded animate-pulse" />
      <div className="mt-5 space-y-3">
        <div className="h-4 w-full bg-neutral-200 rounded animate-pulse" />
        <div className="h-4 w-11/12 bg-neutral-200 rounded animate-pulse" />
        <div className="h-4 w-10/12 bg-neutral-200 rounded animate-pulse" />
        <div className="h-4 w-full bg-neutral-200 rounded animate-pulse" />
        <div className="h-4 w-11/12 bg-neutral-200 rounded animate-pulse" />
        <div className="h-4 w-10/12 bg-neutral-200 rounded animate-pulse" />
        <div className="h-4 w-full bg-neutral-200 rounded animate-pulse" />
        <div className="h-4 w-11/12 bg-neutral-200 rounded animate-pulse" />
        <div className="h-4 w-10/12 bg-neutral-200 rounded animate-pulse" />
        <div className="h-4 w-full bg-neutral-200 rounded animate-pulse" />
        <div className="h-4 w-11/12 bg-neutral-200 rounded animate-pulse" />
        <div className="h-4 w-10/12 bg-neutral-200 rounded animate-pulse" />
      </div>
      <div className="mt-8 h-5 w-24 bg-neutral-200 rounded animate-pulse" />
      <div className="mt-3 space-y-2">
        {Array.from({ length: 3 }).map((_, i) => (
          <div
            key={i}
            className="h-4 w-2/3 bg-neutral-200 rounded animate-pulse"
          />
        ))}
      </div>
      <div className="mt-8 h-5 w-28 bg-neutral-200 rounded animate-pulse" />
      <div className="mt-3 flex flex-wrap gap-2">
        {Array.from({ length: 6 }).map((_, i) => (
          <div
            key={i}
            className="h-8 w-24 bg-neutral-200 rounded-full animate-pulse"
          />
        ))}
      </div>
    </div>
  </div>
);

export default DetailSectionSkeleton;
