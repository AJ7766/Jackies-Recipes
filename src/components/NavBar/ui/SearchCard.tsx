import Image from "next/image"
import Link from "next/link"

interface SearchCardProps {
    type: "user" | "recipe";
    image: string;
    title: string;
    subtitle: string;
    href: string;
    onClick: () => void;
}

export const SearchCard = ({ type, image, title, subtitle, href, onClick }: SearchCardProps) => {
    return (
        <Link href={href} onClick={onClick} prefetch={false}>
            <div className={`search-card`}>
                <Image
                    height={42}
                    width={42}
                    src={image}
                    className="w-full h-auto"
                    alt={`${type}-image`}
                />
                <div>
                    <h2>{title}</h2>
                    <p>{subtitle}</p>
                </div>
            </div>
        </Link>
    )
}