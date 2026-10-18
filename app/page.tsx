import Image from "next/image";
import {Header} from "@/app/Header";
import {Hero} from "@/app/Hero";
import {Founders} from "@/app/Founders";
import {Products} from "@/app/Products";
import {Subscribe} from "@/app/Subscribe";
import {LeadForm} from "@/app/LeadForm";

export default function Home() {
  return (
      <div>
          <Header/>
          <Hero/>
          <Founders/>
          <Products/>
          <Subscribe/>
          <LeadForm/>
      </div>
  );
}
