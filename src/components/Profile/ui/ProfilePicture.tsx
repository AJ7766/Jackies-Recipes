import Image from "next/image";

interface ProfilePictureProps {
  src?: string;  // src is now optional
  alt: string;
  size: string;
}

const defaultProfilePicture = "https://res.cloudinary.com/denumkkcx/image/upload/v1734030055/profile-picture_szc0kx.webp";

export const ProfilePicture = ({ src, alt, size }: ProfilePictureProps) => {
  const imageSrc = src || defaultProfilePicture;
  return (
    <Image
      className={`rounded-full object-cover object-center ${size}`}
      src={imageSrc}
      alt={alt}
      height={160}
      width={160}
      sizes="(max-width: 1024px) 300px, 500px"
      loading="lazy"
    />
  );
}