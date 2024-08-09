"use client"
import ArchivedComp from "@/components/ArchivedComp";
import FormsList from "@/components/FormsList";
import MainContainer from "@/components/MainContainer";
import Text from "@/components/Text";
import { Archive } from "lucide-react";

export default function Home(context: any) {
  console.log(context)

// console.log(window.Telegram.WebApp.initDataUnsafe.user)
  return (
    <MainContainer>
      <div>
        {/* <h1 className="text-3xl font-bold text-center">Telegram Forms</h1> */}
       <Text tw="px-3" content="Welcome to telegram forms a place where we"/>
        <FormsList/>
      </div>
    <ArchivedComp/>
    </MainContainer>
  );
}
