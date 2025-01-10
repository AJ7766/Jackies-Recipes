"use client";
import { activeLink } from "@/app/services/navBarServices";
import Image from "next/image";
import Link from "next/link";
import { useEffect } from "react";

interface NavButtonProps {
  name: string;
  className?: string;
  href: string;
  alt: string;
  image: string;
}

export const NavButton = ({ name, href, alt, className, image }: NavButtonProps) => {
  useEffect(() => {
    // Retrieve or create the speculationrules script element
    let script = document.getElementById("speculation-rules") as HTMLScriptElement;

    // If the script doesn't exist, create it
    if (!script) {
      script = document.createElement("script");
      script.id = "speculation-rules";
      script.type = "speculationrules";
      document.head.appendChild(script);
    }

    // Parse the existing speculation rules or initialize with an empty array
    const existingRules = script.textContent ? JSON.parse(script.textContent) : { prerender: [] };

    // Ensure the first entry in the prerender array exists
    if (!existingRules.prerender[0]) {
      existingRules.prerender[0] = { urls: [] };
    }

    // Only push the URL if it's not already in the list
    if (!existingRules.prerender[0].urls.includes(href)) {
      existingRules.prerender[0].urls.push(href);
    }

    // Update the script content with the new set of URLs
    script.textContent = JSON.stringify(existingRules, null, 2);
    console.log(script);
  }, [href]);

  return (
    <Link className="navBarComponent" href={href}>
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
