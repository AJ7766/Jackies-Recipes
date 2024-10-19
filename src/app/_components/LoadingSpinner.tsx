import Image from "next/image";

const logo = "/images/logo-text-free.png";

export function LoadingSpinner() {
  return (
    <Image
      className="loading-spinner"
      src={logo}
      height={100}
      width={100}
      alt="logo"
      priority
    />
  );
}
