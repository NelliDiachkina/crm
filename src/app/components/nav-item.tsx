import Link from 'next/link';
import Image from 'next/image';

interface NavItemProps {
  href: string;
  iconSrc: string;
  label: string;
}

export default function NavItem({ href, iconSrc, label }: NavItemProps) {
  return (
    <li>
      <Link
        href={href}
        className="flex items-center h-9 mx-1 gap-3.5 text-zinc-50 hover:text-purple-200"
      >
        <Image
          className="ml-5"
          width={18}
          height={18}
          src={iconSrc}
          alt={`${label} icon`}
        />
        <span className="font-medium text-inherit">{label}</span>
      </Link>
    </li>
  );
}
