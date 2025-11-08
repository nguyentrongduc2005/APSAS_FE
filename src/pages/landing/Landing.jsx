import { Link } from "react-router-dom";
function NeonBlob({ className }) {
  return (
    <div
      className={`pointer-events-none absolute rounded-full blur-3xl opacity-40 ${className}`}
      style={{
        background:
          "radial-gradient(closest-side, rgba(34,197,94,0.5), rgba(34,197,94,0.15), transparent)",
      }}
    />
  );
}
function CourseCard({ title, mentor, students }) {
  return (
    <div className="rounded-2xl bg-zinc-900/60 p-4 ring-1 ring-emerald-400/20 transition hover:ring-emerald-400/40">
      <div className="overflow-hidden rounded-xl">
        <img
          src="/images/course-java.png"
          alt="Java course"
          className="w-full h-40 md:h-48 object-cover"
        />
      </div>
      <div className="mt-3 flex items-center justify-between text-xs">
        <span className="text-emerald-400">Free Course</span>
        <span className="text-neutral-400">{students}</span>
      </div>
      <div className="mt-1 text-white font-medium">{title}</div>
      <div className="mt-1 text-sm text-neutral-400">{mentor}</div>
    </div>
  );
}
export default function LandingPage() {
  console.log("🏠 Landing Page RENDER");

  return (
    <div className="relative min-h-screen overflow-hidden bg-black text-white">
      {/* Border đỏ để debug - nếu thấy 2 border đỏ = bị duplicate */}
      <NeonBlob className="left-[-10%] top-[10%] h-72 w-72" />
      <NeonBlob className="right-[-10%] top-[-5%] h-80 w-80" />
      <NeonBlob className="right-[10%] bottom-[-10%] h-96 w-96" />
      <main className="pt-20 md:pt-24 mx-auto max-w-7xl px-6">
        {/* Hero */}
        <section className="grid grid-cols-1 items-center gap-10 py-10 md:grid-cols-2 md:py-16">
          <div className="md:order-1">
            <h1 className="text-4xl font-semibold leading-tight md:text-5xl">
              <span className="text-neutral-200">More than a </span>
              <span className="text-white">grader</span>
              <br />
              <span className="text-neutral-200">Your AI coding </span>
              <span className="text-emerald-400">mentor</span>
            </h1>
            <p className="mt-4 max-w-xl text-neutral-400">
              Learn by doing with in-depth AI feedback. Get instant analysis on
              your code's correctness, quality, and vulnerabilities.
            </p>
            <div className="mt-6 flex gap-4">
              <a
                href="#contact"
                className="rounded-lg border border-emerald-400/40 bg-transparent px-5 py-2.5 text-sm text-white shadow-[0_0_30px_-10px_rgba(34,197,94,0.5)] hover:bg-emerald-500/10"
              >
                Contact Us
              </a>
              <Link
                to="#create"
                className="rounded-lg bg-emerald-500 px-5 py-2.5 text-sm font-medium text-black hover:bg-emerald-400"
              >
                Create account
              </Link>
            </div>
          </div>
          <div className="relative ml-auto max-w-[520px] w-full md:order-2">
            <img
              src="/images/learning-path.png"
              alt="Learning Path"
              className="w-full rounded-3xl object-contain ring-1 ring-emerald-400/20 shadow-[0_0_60px_rgba(16,185,129,0.25)]"
            />
          </div>
        </section>
        {/* Learning Path */}
        <section className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          <div className="mx-auto md:mx-0 max-w-[420px] w-full md:order-1">
            <img
              src="/images/hero-illustration.jpg"
              alt="Coding illustration"
              className="w-full object-contain rounded-2xl ring-1 ring-emerald-400/20 shadow-[0_0_40px_rgba(16,185,129,0.15)]"
            />
          </div>
          <div className="md:order-2">
            <h2 className="text-2xl font-semibold">
              Your Personalized Learning Path
            </h2>
            <p className="mt-2 max-w-2xl text-sm text-neutral-400">
              We build personalized learning paths, offering free courses and
              quality materials, to help you start your learning journey in a
              structured and effective way.
            </p>
            <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3].map((n) => (
                <div
                  key={n}
                  className="rounded-xl border border-white/10 bg-neutral-900/60 p-5 shadow-[0_0_40px_-12px_rgba(34,197,94,0.25)]"
                >
                  <div className="text-emerald-400">{n}.</div>
                  <div className="mt-2 h-28 rounded-lg bg-neutral-800/60" />
                </div>
              ))}
            </div>
          </div>
        </section>
        {/* POPULAR COURSES */}
        <section id="courses" className="w-full bg-black">
          <div className="mx-auto max-w-7xl px-6 mt-16 md:mt-24 pb-24">
            <h2 className="text-3xl md:text-4xl font-semibold text-center">
              Popular <span className="text-emerald-400">Courses</span>
            </h2>
            <p className="text-center text-white/70 max-w-2xl mx-auto mt-3">
              Top-quality courses, highly-rated by our learners.
            </p>
            <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-6">
              {[1, 2, 3].map((i) => (
                <article
                  key={i}
                  className="group rounded-2xl bg-zinc-900/60 ring-1 ring-emerald-400/20 p-4
                            hover:ring-emerald-400/40 transition shadow-[0_0_40px_rgba(16,185,129,0.15)]"
                >
                  <div className="rounded-xl overflow-hidden ring-1 ring-white/10">
                    <img
                      src="/images/course-java.png" /* đặt ảnh tại public/images/course-java.png */
                      alt="Java course"
                      className="w-full h-40 md:h-48 object-cover"
                    />
                  </div>
                  <div className="mt-4 flex items-center justify-between text-xs">
                    <span className="px-2 py-1 rounded bg-emerald-500/20 text-emerald-300 ring-1 ring-emerald-400/30">
                      Free Course
                    </span>
                    <span className="text-white/60">40👥</span>
                  </div>
                  <h3 className="mt-2 font-semibold">Java for beginner</h3>
                  <div className="text-white/60 text-sm mt-1">Mentor name</div>
                </article>
              ))}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
