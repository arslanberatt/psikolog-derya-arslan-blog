import ME from "../../../assets/psikologderyaarslan.jpeg";

const HeaderSection = () => {
  return (
    <>
      <div className="inline-flex items-center gap-2 rounded-full border border-neutral-200 bg-white px-3 py-1 text-xs font-medium text-neutral-600 shadow-sm">
        <span className="inline-block h-1.5 w-1.5 rounded-full bg-neutral-900" />
        Hakkımda
      </div>
      <h1 className="mt-4 font-semibold tracking-tight text-neutral-900 text-2xl sm:text-3xl lg:text-4xl">
        Lorem ipsum dolor sit amet, consectetur adipisicing.
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
        <div className="">
          <p className="mt-4 text-base leading-relaxed text-neutral-600">
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Nemo
            dignissimos aut fugiat facere veritatis provident tenetur esse odit,
            a saepe excepturi ut optio eaque consectetur laudantium asperiores
            blanditiis accusamus natus. Perferendis distinctio architecto
            pariatur mollitia, eius aut! Aspernatur, nam id aliquam inventore
            facere recusandae ullam, iste, sapiente itaque cum atque hic
            deleniti adipisci rerum pariatur temporibus dignissimos! Dolores,
            ullam deserunt!
          </p>
          <div className="mt-8">
            <a
              href="/"
              className="inline-flex items-center gap-2 rounded-lg border border-neutral-900 bg-neutral-900 px-4 py-2.5 text-sm font-medium text-white shadow-sm transition hover:bg-neutral-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-900/20"
            >
              Hakkımda daha fazlası için
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1.8"
                  d="M13 7l5 5m0 0l-5 5m5-5H6"
                />
              </svg>
            </a>
          </div>
        </div>
        <div className="overflow-hidden rounded-2xl border border-neutral-200 shadow-sm">
          <div className="relative">
            <img
              src={ME}
              alt="Psikolog Derya Arslan"
              className="lg:aspect-3/2 aspect-3/3 object-cover"
              loading="lazy"
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default HeaderSection;
