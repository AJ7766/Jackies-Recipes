"use client";
import { activeLink } from "@/app/services/navBarServices";
import Image from "next/image";
import Link from "next/link";

interface NavButtonProps {
  name: string;
  className?: string;
  href: string;
  alt: string;
  image: string;
}

export const NavButton = ({ name, href, alt, className, image }: NavButtonProps) => {
 
  return (
    <Link className="navBarComponent"
     href={href}
     prefetch={false}>
      <Image
        {...(className && { className })}
        height={30}
        width={30}
        src={image}
        alt={alt}
      />
      <h2 className={`${activeLink(href)} hidden md:block`}>{name}</h2>
    </Link>
  );
};
