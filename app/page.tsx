import Image from "next/image";
import {Header} from "@/app/Header";
import {Hero} from "@/app/Hero";
import {Founders} from "@/app/Founders";
import {Products} from "@/app/Products";

export default function Home() {
  return (
      <div>
          <Header/>
          <Hero/>
          <Founders/>
          <Products/>
      </div>
  );
}
