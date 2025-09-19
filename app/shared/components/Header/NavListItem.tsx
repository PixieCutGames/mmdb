"use client";

import { MMDBProps } from "@/types/shared.types";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { MouseEventHandler, PropsWithChildren } from "react";

type NavListItemProps = MMDBProps<{
  href: string;
  onClick?: MouseEventHandler<HTMLAnchorElement>;
}>;

function NavListItem({
  href,
  onClick,
  children,
}: NavListItemProps & PropsWithChildren) {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <Link
      href={href}
      onClick={onClick}
      className={`nav-btn mr-3 hidden md:flex ${
        isActive ? "border-success" : ""
      }`}
    >
      {children}
    </Link>
  );
}

export default NavListItem;
