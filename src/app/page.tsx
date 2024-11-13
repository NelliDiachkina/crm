import Image from 'next/image';
import NavItem from './components/nav-item';

export default function Home() {
  return (
    <main className="h-lvh flex flex-col overflow-y-auto bg-gray-900">
      <Image
        className="py-8 mb-11 mx-auto"
        width={122}
        height={25}
        src="/icons/logo.svg"
        alt="logo"
      />
      <nav>
        <ul className="space-y-7">
          <NavItem
            href="/companies"
            iconSrc="/icons/briefcase.svg"
            label="Companies"
          />
          <NavItem
            href="/dashboard"
            iconSrc="/icons/squares.svg"
            label="Dashboard"
          />
        </ul>
      </nav>
    </main>
  );
}
