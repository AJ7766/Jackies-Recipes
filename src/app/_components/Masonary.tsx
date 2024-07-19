import Image, { StaticImageData } from "next/image";
import img1 from "@/app/images/test/1.jpg";
import img2 from "@/app/images/test/2.jpg";
import img3 from "@/app/images/test/3.jpg";
import img4 from "@/app/images/test/4.jpg";
import img5 from "@/app/images/test/5.jpg";
import img6 from "@/app/images/test/6.jpg";
import img7 from "@/app/images/test/7.jpg";
import { useEffect, useMemo, useState } from "react";


export default function Masonary(){        
  const images = useMemo(() => [img1, img2, img3, img4, img5, img6, img7, img5, img3], []);
    const [totalColumns, setTotalColumns] = useState<number>(1);
    const [columns, setColumns] = useState<StaticImageData[][]>(() =>
      Array.from({ length: 1 }, () => [])
    );
    useEffect(() => {
    const updateColumns = () => {
    const width = window.innerWidth;
        if (width > 1024) {
          setTotalColumns(3);
        } else if (width > 768) {
          setTotalColumns(2);
        } else {
          setTotalColumns(1);
        }
    };    
    updateColumns(); // Initial check
    window.addEventListener('resize', updateColumns);

    return () => window.removeEventListener('resize', updateColumns);
  }, []);

  useEffect(()=>{
    const newColumns: StaticImageData[][] = Array.from({ length: totalColumns }, () => []);
    images.forEach((image, index) => {
        const columnIndex = index % totalColumns;
        newColumns[columnIndex].push(image);
    });
    setColumns(newColumns);
  },[totalColumns, images])

    return (<>
    <div className="masonryContainer">
    {columns.map((column, columnIndex) => (
        <div className="masonryColumn" key={columnIndex}>
          {column.map((image, imageIndex) => (
            <div className="masonryImg" key={imageIndex}>
              <Image src={image} alt={`Image ${imageIndex + 1}`}/>
              <h1>Pasta Carbonara, extra spicy!</h1>
            </div>
          ))}
        </div>
      ))}
    </div>

    </>)
}