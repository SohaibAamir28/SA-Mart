"use client";
import { useState, useEffect } from "react";

import Image from "next/image";
import { urlForImage } from "../../sanity/lib/image";
import { Plus, Minus } from "lucide-react";
import { Button } from "../ui/button";
import axios from "axios";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";
import { ShoppingCart } from "lucide-react";
import { Items } from "@/app/[title]/page";
import { useDispatch,useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { toast } from 'react-hot-toast';
import { CounterActions } from "@/store/slice/counterSlice";


export default function ProductHero({products}:{products:Items[]}) {
  
  const dispatch = useDispatch();
  const counterValue = useSelector((state:RootState)=>state.reducer.totalQuantity);
  const [hoveredIndex, setHoveredIndex] = useState<number>(0);
  const [quantity, setQuantity] = useState(0);
  const increaseQuantity = () => {
    setQuantity((prevQuantity) => Math.max(prevQuantity + 1, 0));
  };
  const decreaseQuantity = () => {
    setQuantity((prevQuantity) => Math.max(prevQuantity - 1, 0));
  };
  console.log(products)

const handlerAddtoCart = async (id:string,price:any,quantity:number) => {
  console.log('cock');
  const res = await axios.post('/api/cart',{
    product_id:id,
    quantity:quantity,
    price:price,
  })
  dispatch(CounterActions.AddtoCart(quantity));
  toast.success('Product Added');
}


  return (
    <div className="">
      <div className="grid mx-20 items-center justify-center">
        {products.map((item:any) => (
          <div
            key={item._id}
            className="flex flex-col md:flex-row justify-center items-center gap-5"
          >
            <div className="flex flex-grow flex-shrink basis-0 gap-8">
              <div className="flex flex-col gap-4">
                {item.images.map((image:any, index:any) => (
                  <div
                    key={index}
                    className="relative"
                    onMouseEnter={() => setHoveredIndex(index)}
                    onMouseLeave={() => setHoveredIndex(0)}
                  >
                    <Image
                      src={urlForImage(image).url()}
                      alt="person"
                      width={100}
                      height={100}
                      className="cursor-pointer"
                    />
                  </div>
                ))}
              </div>
              <div>
                <Image
                  src={urlForImage(item.images[hoveredIndex]).url()}
                  alt="person_2"
                  width={800}
                  height={800}
                />
              </div>
            </div>
            <div className="flex flex-col flex-grow flex-shrink gap-10 mt-16">
              <div>
                <div className="scroll-m-20 pb-2 text-2xl md:text-3xl font-semibold tracking-wide transition-colors first:mt-0">
                  {item.title}
                </div>
                <p className="font-semibold text-lg opacity-30">{item.type}</p>
              </div>
              <div>
                <p className="flex font-bold text-sm tracking-wider leading-4">
                  SELECT SIZE
                </p>
                <ul className="flex gap-4 mt-4">
                  <li className="w-10 h-10 flex justify-center items-center rounded-full cursor-pointer text-base text-[#666] font-bold tracking-wider leading-4 hover:bg-gray-100">
                    XS
                  </li>
                  <li className="w-10 h-10 flex justify-center items-center rounded-full cursor-pointer text-base text-[#666] font-bold tracking-wider leading-4 hover:bg-gray-100">
                    S
                  </li>
                  <li className="w-10 h-10 flex justify-center items-center rounded-full cursor-pointer text-base text-[#666] font-bold tracking-wider leading-4 hover:bg-gray-100">
                    M
                  </li>
                  <li className="w-10 h-10 flex justify-center items-center rounded-full cursor-pointer text-base text-[#666] font-bold tracking-wider leading-4 hover:bg-gray-100">
                    L
                  </li>
                  <li className="w-10 h-10 flex justify-center items-center rounded-full cursor-pointer text-base text-[#666] font-bold tracking-wider leading-4 hover:bg-gray-100">
                    XL
                  </li>
                </ul>
              </div>
              <div className="flex gap-8">
                <h4 className="leading-7 text-lg [&:not(:first-child)]:mt-6 text-black-100 font-bold">
                  Quantity:
                </h4>
                <div>
                  <span>
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button
                            onClick={increaseQuantity}
                            variant="outline"
                            className="w-10 rounded-full p-0"
                          >
                            <Plus className="h-4 w-4" />
                            <span className="sr-only">Add</span>
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Add to library</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </span>
                  <span className="mx-3">{quantity}</span>
                  <span>
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button
                            onClick={decreaseQuantity}
                            variant="outline"
                            className="w-10 rounded-full p-0"
                          >
                            <Minus className="h-4 w-4" />
                            <span className="sr-only">Add</span>
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Add to library</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <Button className="px-3 gap-x-2" onClick={()=>handlerAddtoCart(item._id,item.price*quantity,quantity)}>
                  <ShoppingCart />
                  Add to Cart
                </Button>
                <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-widest transition-colors leading-8 first:mt-0 text-[#212121]">
                  {item.price*quantity}$
                </h2>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
