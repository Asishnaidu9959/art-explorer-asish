import Link from "next/link";
export default function MainNav(){return <nav className="nav"><span className="brand">Art Explorer</span><Link href="/">Home</Link><Link href="/artwork">Artworks</Link><Link href="/search">Advanced Search</Link><Link href="/about">About</Link></nav>}
