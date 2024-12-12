import { RefObject } from "react";

export default function Search({ searchMobileRef }: { searchMobileRef: RefObject<HTMLDivElement> }) {

    return (
        <div className="mobile-search hidden" ref={searchMobileRef}>test</div>
    )
}