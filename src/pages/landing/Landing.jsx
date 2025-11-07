import { Link } from "react-router-dom";

/** Neon blob nền */
function NeonBlob({ className }) {
  return (
    <div
      className={`pointer-events-none absolute rounded-full blur-3xl opacity-60 ${className}`}
      style={{
        background:
          "radial-gradient(closest-side, rgba(16,185,129,0.45), rgba(16,185,129,0.18), transparent)",
      }}
    />
  );
}

export default function LandingPage() {
  return (
    <div className="relative w-full min-h-screen overflow-x-clip bg-black text-white">
      {/* --- Blobs trang trí cho khớp mock --- */}
      <NeonBlob className="-left-24 -top-20 h-64 w-64 md:h-80 md:w-80" />
      <NeonBlob className="right-[-40px] -top-16 h-56 w-56 md:h-72 md:w-72" />
      <NeonBlob className="left-[-40px] bottom-36 h-56 w-56 md:h-72 md:w-72" />
      <NeonBlob className="right-[-40px] bottom-10 h-60 w-60 md:h-80 md:w-80" />

      <main className="relative">
        {/* ================= HERO / OVERVIEW ================= */}
        {/* ===================== HERO / OVERVIEW ===================== */}
        <section
          id="overview"
          className="
    relative w-[100vw] left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] pb-12"
        >
          <div className="mx-auto w-full max-w-[1200px] px-6">
            {/* Lưới */}
            <div className="grid grid-cols-12 gap-x-6">

              {/* Wrapper*/}
              <div className="col-span-12 md:col-start-5 md:col-span-4">

                {/* Chia 4 cột */}
                <div className="grid grid-cols-4 items-center gap-6">
                  {/* TEXT  */}
                  <div className="col-span-4 lg:col-span-2">
                    <h1 className="font-extrabold leading-tight tracking-tight">
                      <span className="block text-[clamp(28px,5.2vw,52px)]">
                        More than a <span className="font-extrabold">grader</span>
                      </span>
                      <span className="block text-[clamp(28px,5.2vw,52px)]">
                        Your AI coding <span className="text-emerald-400">mentor</span>
                      </span>
                    </h1>

                    <p className="mt-4 text-sm leading-6 text-zinc-300 md:text-base">
                      Learn by doing with in-depth AI feedback. Get instant analysis on
                      your code&apos;s correctness, quality, and vulnerabilities.
                    </p>

                    <div className="mt-6 flex flex-wrap gap-3">
                      <a
                        href="#contact"
                        className="inline-flex items-center justify-center rounded-lg border border-white/25 px-5 py-2.5 text-sm hover:border-white/40"
                      >
                        Contact Us
                      </a>
                      <Link
                        to="#create"
                        className="inline-flex items-center justify-center rounded-lg bg-emerald-500 px-5 py-2.5 text-sm font-semibold text-black hover:bg-emerald-400"
                      >
                        Create account
                      </Link>
                    </div>
                  </div>

                  {/*  */}
                  <div className="col-span-4 lg:col-span-2 flex justify-center lg:justify-end">
                    <img
                      src="/images/learning-path.png"
                      alt="Hero Illustration"
                      className="h-auto w-full max-w-[360px] rounded-2xl object-cover ring-1 ring-emerald-400/25 shadow-[0_0_50px_rgba(16,185,129,0.25)]"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>


        {/* ============== LEARNING PATH (4 cột giữa) ============== */}
        <section className="pt-10 pb-8">
          <div className="mx-auto w-full max-w-[1200px] px-6">
            {/* căn chỉnh  */}
            <div className="grid grid-cols-12 gap-x-6">
              <div className="col-span-12 md:col-start-5 md:col-span-4">
                
                <div className="grid grid-cols-4 items-start gap-6">
                  {/* ẢNH BÊN TRÁI */}
                  <div className="col-span-4 lg:col-span-2 flex justify-center lg:justify-start">
                    <img
                      src="/images/hero-illustration.jpg"
                      alt="Learning Path"
                      className="h-auto w-full max-w-[420px] rounded-2xl object-contain ring-1 ring-emerald-400/20 shadow-[0_0_40px_rgba(16,185,129,0.15)]"
                    />
                  </div>

                  {/* NỘI DUNG BÊN PHẢI */}
                  <div className="col-span-4 lg:col-span-2">
                    <h2 className="text-[26px] font-extrabold tracking-tight md:text-[28px]">
                      Your Personalized Learning Path
                    </h2>
                    <p className="mt-3 text-sm leading-6 text-zinc-300">
                      We build personalized learning paths, offering free courses and quality
                      materials, to help you easily start your learning journey in a structured
                      and effective way.
                    </p>

                    {/*  */}
                    <div className="mt-6 grid grid-cols-2 gap-4">
                      <div className="rounded-xl border border-emerald-400/30 bg-black/40 p-4 shadow-[0_0_30px_-10px_rgba(16,185,129,0.35)]">
                        <div className="text-emerald-400 font-semibold">1.</div>
                      </div>
                      <div className="rounded-xl border border-emerald-400/30 bg-black/40 p-4 shadow-[0_0_30px_-10px_rgba(16,185,129,0.35)]">
                        <div className="text-emerald-400 font-semibold">2.</div>
                      </div>
                      <div className="col-span-2 rounded-xl border border-emerald-400/30 bg-black/40 p-4 shadow-[0_0_30px_-10px_rgba(16,185,129,0.35)]">
                        <div className="text-emerald-400 font-semibold">3.</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>


        {/* ================= POPULAR COURSES (4 cột giữa) ================= */}
        <section className="pb-20">
          <div className="mx-auto w-full max-w-[1200px] px-6">
            <div className="grid grid-cols-12 gap-x-6">

              {/*  */}
              <header className="col-span-12 md:col-start-5 md:col-span-4">
                <h2 className="text-center text-[32px] font-extrabold tracking-tight md:text-[40px]">
                  <span>Popular </span>
                  <span className="text-emerald-400">Courses</span>
                </h2>
                <p className="mx-auto mt-3 max-w-2xl text-center text-sm text-white/70">
                  Top-quality courses, highly-rated by our learners. See what&apos;s trending in
                  the world of learning at APSAS.
                </p>
              </header>

              {/*  */}
              <div className="col-span-12">
                {/*  */}
                <div className="mt-10 mx-auto w-[1100px] max-w-full
                  grid grid-cols-3 gap-8 justify-items-center">
                  {[1, 2, 3].map((i) => (
                    <article
                      key={i}
                      className="w-[340px] group rounded-2xl bg-zinc-900/60 p-4
                  ring-1 ring-emerald-400/25 transition hover:ring-emerald-400/40
                  shadow-[0_0_40px_rgba(16,185,129,0.15)]"
                    >
                      <div className="overflow-hidden rounded-xl ring-1 ring-white/10">
                        <img
                          src="/images/course-java.png"
                          alt="Java course"
                          className="h-44 w-full object-cover"
                        />
                      </div>

                      <div className="mt-4 flex items-center justify-between text-xs">
                        <span className="rounded bg-emerald-500/20 px-2 py-1 text-emerald-300 ring-1 ring-emerald-400/30">
                          Free Course
                        </span>
                        <span className="text-white/70">40 👥</span>
                      </div>

                      <h3 className="mt-2 text-base font-semibold">Java for beginner</h3>

                      <div className="mt-1 flex items-center justify-between text-xs text-white/70">
                        <span>Mentor name</span>
                        <span>23 🧑‍🎓</span>
                      </div>
                    </article>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>


      </main>
    </div>
  );
}
