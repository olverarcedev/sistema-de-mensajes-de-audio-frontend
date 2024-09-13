import Link from "next/link";
export default function HeaderComponent() {
  return (
    <header className="bg-slate-700 text-white p-3">
      <nav>
        <ul className="flex justify-between">
          <li>
            <Link href="/">Inicio</Link>
          </li>
          <li>
            <Link href="/admin">Admin</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}
