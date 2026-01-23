import Link from "next/link";
export default function StudentInfo() {
  return (
    <div>
      <p>Name: Huajie (Edan) Zeng</p>
      <p>
        GitHub:
        <Link
          href="https://github.com/Tianao0110/cprg306-assignments"
          target="_blank"
          rel="noopener noreferrer"
          className="underline"
        >
          <span>Tianao0110/cprg306-assignments</span>
        </Link>
      </p>
    </div>
  );
}
