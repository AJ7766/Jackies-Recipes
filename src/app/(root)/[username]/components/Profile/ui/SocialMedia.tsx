import Image from "next/image";
import Link from "next/link";

interface SocialMediaLinkProps {
  url: string;
  icon: "instagram" | "x" | "tiktok" | "youtube" | "facebook";
}

const socialMediaIcons = {
  instagram: "/images/social-media/instagram.svg",
  x: "/images/social-media/x.svg",
  tiktok: "/images/social-media/tiktok.svg",
  youtube: "/images/social-media/youtube.svg",
  facebook: "/images/social-media/facebook.svg",
}

export const SocialMedia = ({ url, icon }: SocialMediaLinkProps) => (
  <Link target="_blank" href={url.startsWith("http") ? url : `https://${url}`}>
    <Image src={socialMediaIcons[icon]} alt={icon} width={22} height={22} loading="lazy" />
  </Link>
)