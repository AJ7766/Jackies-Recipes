import { CldImage } from "next-cloudinary";

interface ProfilePictureProps {
  src?: string;  // src is now optional
  alt: string;
  size: string;
}

const defaultProfilePicture = "https://res.cloudinary.com/denumkkcx/image/upload/v1734030055/profile-picture_szc0kx.webp";

export const ProfilePicture = ({ src, alt, size }: ProfilePictureProps) => {
  const imageSrc = src || defaultProfilePicture;  // Use the provided src or default to the fallback
  return (
    <CldImage
      className={`rounded-full object-cover object-center ${size}`}
      src={imageSrc}
      alt={alt}
      height={160}
      width={160}
      fetchPriority="high"
      priority
      sizes="(max-width: 1024px) 100px, 500px"
      format="webp"
    />
  );
}