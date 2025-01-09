"use client"
import { activeLink } from "@/app/_services/navBarServices"
import Image from "next/image"
import Link from "next/link"

interface NavButtonProps {
    name: string;
    className?: string;
    href: string;
    image: string;
}

export const NavButton = ({ name, href, className, image }: NavButtonProps) => {
    return (
        <Link
            className="navBarComponent"
            href={href}
            prefetch={false}
        >
            <Image
                {...(className && { className })}
                height={30}
                width={30}
                src={image}
                alt={name}
            />
            <h2 className={`${activeLink(href)} hidden md:block`}>{name}</h2>
        </Link>
    )
}
