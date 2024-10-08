import Image from "next/image";
import searchGlass from "@/app/images/search-glass.svg";
import { useState } from "react";

export default function Categories() {
  const [search, setSearch] = useState("");
  const [hide, setHide] = useState(false);
  return (
    <>
      <div className="searchRecipesContainer">
        <Image src={searchGlass} alt="search-glass" />
        <input
          type="search"
          name="query"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search recipes..."
        />
      </div>
      {hide && (
        <div className="categories">
          <span>PASTA</span>
          <span>PIZZA</span>
          <span>NOODLES</span>
          <span>ITALIAN</span>
          <span>SWEDISH</span>
          <span>MEXICO</span>
          <span>PASTA</span>
          <span>PIZZA</span>
          <span>NOODLES</span>
          <span>ITALIAN</span>
          <span>SWEDISH</span>
          <span>MEXICO</span>
        </div>
      )}
    </>
  );
}
