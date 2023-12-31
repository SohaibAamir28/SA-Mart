import { Image as IImage } from "sanity";
import { client } from "../../../sanity/lib/client";
import { urlForImage } from "../../../sanity/lib/image";
import Image from "next/image";
import Link from "next/link";
import VanillaTilt from "vanilla-tilt";
import { useEffect, useRef } from "react";

export type IProducts = {
  _id: string;
  title: string;
  description: string;
  price: number;
  image: IImage;
  category: {
    name: string;
  };
};
const fetchProducts = async () => {
  const data: IProducts[] =
    await client.fetch(`*[_type=='product' && category -> name == 'Male']{
      _id,
      title,
      description,
      price,
        image,
        category -> {
          name
        }
    }`);
  return data;
};




export default async function page() {
  const maleProducts: IProducts[] = await fetchProducts();

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 mx-5 md:mx-20 gap-y-10 md:gap-x-20 text-center bg-gradient-to-l from-indigo-300 via-sky-300 to-indigo-300 h-screen hover:from-pink-200 hover:to-green-200">
      {maleProducts.map((item) => (
        <div key={item._id} className="rounded-3xl border-4 border-secondary">
          <Link href={`/${item.title}`}>
            <Image
              src={urlForImage(item.image).url()}
              alt="person"
              width={400}
              height={400}
            />
            <h4 className="scroll-m-20 text-xl font-semibold tracking-tight">
              {item.title}
            </h4>
            <p className="scroll-m-20 text-lg font-semibold tracking-tight text-gray-400">
              {item.description}
            </p>
            <h4 className="scroll-m-20 text-xl font-semibold tracking-tight">
              {item.price}$
            </h4>
          </Link>
        </div>
      ))}
    </div>
  );
}
