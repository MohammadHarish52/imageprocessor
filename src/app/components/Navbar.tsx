import Link from "next/link";

export function Navbar() {
  return (
    <nav className="bg-gray-800 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="text-xl font-bold">
          Image Processor
        </Link>
        <div>
          <Link href="/" className="mr-4">
            Home
          </Link>
          <Link href="/about">About</Link>
        </div>
      </div>
    </nav>
  );
}
