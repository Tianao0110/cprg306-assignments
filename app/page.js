"use client";
import Link from "next/link";

export default function Home() {
  const assignments = [
    { id: 2, title: "Week 2 Assignment" },
    { id: 3, title: "Week 3 Assignment" },
    { id: 4, title: "Week 4 Assignment" },
    { id: 5, title: "Week 5 Assignment" },
    { id: 6, title: "Week 6 Assignment" },
    { id: 7, title: "Week 7 Assignment" },
  ];

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-slate-100 p-6">
      <style jsx global>{`
        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>

      <div className="max-w-4xl w-full">
        {/* title */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-slate-900">
            CPRG 306: Web Development 2
          </h1>
          <p className="text-slate-500 mt-2 font-medium">
            Assignments by <span className="text-indigo-600">Edan</span>
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {assignments.map((assignment, index) => (
            <Link
              key={assignment.id}
              href={`/week-${assignment.id}`}
              style={{
                animation: "slideIn 0.5s ease-out forwards",
                animationDelay: `${index * 100}ms`,
              }}
              className="opacity-0 group block p-4 bg-white rounded-lg shadow-sm border border-slate-200 hover:shadow-md hover:border-indigo-300 transition-all duration-200 hover:-translate-y-1 text-center"
            >
              <span className="text-lg font-semibold text-slate-700 group-hover:text-indigo-600 transition-colors">
                {assignment.title}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
