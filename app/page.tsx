import Image from "next/image";
import {Header} from "@/app/Header";
import {Hero} from "@/app/Hero";
import {Founders} from "@/app/Founders";

export default function Home() {
  return (
      <div>
          <Header/>
          <Hero/>
          <Founders/>
      </div>
  );
}
