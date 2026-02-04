import Link from "next/link";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gray-100 p-6">
      <div className="max-w-lg w-full">
        <h1 className="text-3xl font-bold text-slate-900 mb-8 text-center">
          CPRG 306: Web Development 2
          <span className="block text-xl text-slate-500 font-normal mt-2">
            Assignments
          </span>
          <span className="block text-sm text-slate-500 font-small mt-1">
            By Edan
          </span>
        </h1>

        <ul className="space-y-4">
          {/* Week 2 */}
          <li>
            <Link
              href="/week-2"
              className="block p-3 bg-white rounded-lg shadow hover:bg-slate-50 hover:shadow-md transition-all text-slate-800 font-medium border border-gray-200"
            >
              Week 2 Assignment
            </Link>
          </li>

          {/* Week 3 */}
          <li>
            <Link
              href="/week-3"
              className="block p-3 bg-white rounded-lg shadow hover:bg-slate-50 hover:shadow-md transition-all text-slate-800 font-medium border border-gray-200"
            >
              Week 3 Assignment
            </Link>
          </li>

          {/* Week 4 */}
          <li>
            <Link
              href="/week-4"
              className="block p-3 bg-white rounded-lg shadow hover:bg-slate-50 hover:shadow-md transition-all text-slate-800 font-medium border border-gray-200"
            >
              Week 4 Assignment
            </Link>
          </li>
        </ul>
      </div>
    </main>
  );
}
