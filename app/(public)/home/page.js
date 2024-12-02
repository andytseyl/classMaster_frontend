"use client";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";

export default function Home() {
  const router = useRouter();

  const handleOnClick = () => {
    router.push("/register");
  };

  return (
    <div className="bg-[E3E5E6] h-fit relative lg:max-h-lvh ">
      <div className="left-container flex flex-col gap-3 lg:mt-20 absolute xl:w-[35%] xl:ml-28 lg:ml-16 lg:mr-10 md:ml-16 md:mr-16 md:mt-20 mt-10 ml-10 mr-10">
        {/* Title */}
        <h1 className="text-[#4c71ef] text-4xl font-bold font-[Montserrat] max-md:text-2xl">
          Simplify Management, <br />
          Elevate Experiences
        </h1>
        <div className="divider w-48 h-0"></div>
        <p className=" text-xl mb-3 max-md:text-base">
          The ultimate solution for{" "}
          <span className="text-[#4c71ef] font-bold">SMEs</span> (Small and
          Medium-sized Enterprises). Our user-friendly management system
          streamlines your operations, empower your business to grow
          effortlessly.
        </p>

        <ul className=" text-md flex flex-col italic mb-3 max-md:text-sm">
          <li>
            <span className="badge badge-neutral mb-2 mr-2">1</span>
            Personalized booking experience with unique URLs.
          </li>
          <li>
            <span className="badge badge-neutral mb-2 mr-2">2</span>Valuable
            insights with course performance statistics.
          </li>
          <li>
            <span className="badge badge-neutral mb-2 mr-2">3</span>Simplify the
            booking and checkout process.
          </li>
        </ul>

        <div className="flex flex-row items-center">
          <button
            className="btn btn-wide btn-primary max-md:w-52"
            type="submit"
            onClick={handleOnClick}
          >
            TRY NOW
          </button>
          <div className="ml-5 max-md:text-sm text-nowrap">
            or
            <Link href="/" className="link ml-3 max-md:text-base">
              Log In
            </Link>
          </div>
        </div>
      </div>

      {/* Image */}
      <div className="relative w-full h-full">
        <div className="absolute xl:w-[50%] xl:right-24 xl:top-20 lg:top-[500px] lg:right-52 lg:w-[75%] md:top-[520px] md:w-[75%] md:right-44 w-[100%] top-[540px]">
          <Image
            src="https://i.ibb.co/Jx3S0h4/classmaster-computer.png"
            alt="ClassMaster Computer"
            layout="responsive"
            width={500}
            height={500}
          />
        </div>
        <div className="absolute xl:w-[20%] xl:right-12 xl:top-36 lg:top-[550px] lg:w-[30%] lg:right-24 md:top-[580px] md:w-[30%] md:right-16 w-[30%] top-[620px] right-8">
          <Image
            src="https://i.ibb.co/s526Rz5/classmaster-iphone.png"
            alt="ClassMaster iPhone"
            layout="responsive"
            width={300}
            height={500}
          />
        </div>
      </div>
    </div>
  );
}
