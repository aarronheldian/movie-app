"use client";

import Footer from "@/components/shared/footer";
import WrapperSection from "./lib/wrapper-section";
import { useActiveSectionStore } from "@/hooks/stores/use-active-section";
import TopPicks from "./lib/top-picks";
import FormExample from "./lib/form-example";
import FormRegister from "./lib/form-register";

export default function HomeContainer() {
  const { setActiveSection } = useActiveSectionStore();

  const checkString = (word: string) => {
    const arrayString = word.split("");
    const reverseString: string[] = [];

    arrayString?.map((item) => reverseString?.unshift(item));

    return (
      arrayString.toString().toLocaleLowerCase() ===
      reverseString.toString().toLocaleLowerCase()
    );
  };

  console.log("checkString", checkString("Kodok"));

  return (
    <div className="p-2 bg-secondary/50 rounded-2xl flex flex-col border gap-2 shadow-lg">
      <WrapperSection
        setData={(data) => {
          setActiveSection({
            title: "Your Movie Hub 🎥",
            sectionId: data,
          });
        }}
        data="section_home"
      >
        <TopPicks />
      </WrapperSection>
      <WrapperSection
        setData={(data) => {
          setActiveSection({
            title: "Form Playground 📝",
            sectionId: data,
          });
        }}
        data="section_form"
      >
        <FormRegister />
      </WrapperSection>
      <WrapperSection
        setData={(data) => {
          setActiveSection({
            title: "Form Playground 📝",
            sectionId: data,
          });
        }}
        data="section_form"
      >
        <FormExample />
      </WrapperSection>
      <Footer />
    </div>
  );
}
