import BelowHeader from "@/component/BelowHeader/BelowHeader";
import BookNow from "@/component/BookNowSec/BookNow";
import ComfortSection from "@/component/BottomCont/BottomCont";
import CarSliderSec from "@/component/CarSliderSec/CarSliderSec";
import ContactCTA from "@/component/ContactUs/ContactUs";
import DiscoverMore from "@/component/DiscoverMoreSec/DiscoverMore";
import HomeBgCont from "@/component/HomeBgContainer/HomeBgCont";
import Head from "next/head";

export default function Home() {
  return (
    <>
      <Head>
        <title>
          Luxury Chauffeur Services | Reliable & Professional Transportation
        </title>
        <meta
          name="description"
          content="Experience seamless and professional chauffeur services tailored to your needs. Our expert drivers ensure a luxurious, safe, and memorable journey every time. Book now!"
        />
        <meta
          name="keywords"
          content="luxury chauffeur service, professional transportation, reliable car service, private driver, executive travel, airport transfers, corporate transportation, VIP car service, premium chauffeur, luxury ride"
        />
        <meta name="author" content="Your Company Name" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
      <div>
        <HomeBgCont />
        <BelowHeader />
        <DiscoverMore />
        <BookNow />
        <CarSliderSec />
        <ComfortSection />
        <ContactCTA />
      </div>
    </>
  );
}
