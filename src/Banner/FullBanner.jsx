// Import Swiper React components
import { Swiper, SwiperSlide} from "swiper/react";


// Import Swiper styles
import "swiper/css";


import { FaAngular } from "react-icons/fa";
import { IoLogoCss3 } from "react-icons/io5";
import { BsApple } from "react-icons/bs";
import { Autoplay } from "swiper/modules";
import { useState } from "react";

// Map logo names to actual components
const logoComponents = {
  IoLogoCss3: <IoLogoCss3 />,
  BsApple: <BsApple />,
  FaAngular: <FaAngular />,
  // Add other mappings if needed
};

const FullBanner = () => {
  const [active,setActive] = useState(null);  
  const langs = [
    { name: "CSS3", logo: "IoLogoCss3", skill: "90%", color:'hue-rotate-[240deg]' },
    { name: "HTML5", logo: "BsApple", skill: "70%", color:'hue-rotate-[20deg]' },
    { name: "SASS", logo: "IoLogoCss3", skill: "50%", color:'hue-rotate-[340deg]' },
    { name: "Javascript", logo: "BsApple", skill: "82%", color:'hue-rotate-[58deg]' },
    { name: "React Js", logo: "BsApple", skill: "73%", color:'hue-rotate-[225deg]' },
    { name: "Vue Js", logo: "BsApple", skill: "60%", color:'hue-rotate-[168deg]' },
    { name: "Angular Js", logo: "FaAngular", skill: "30%", color:'hue-rotate-[0deg]' },
  ];

  return (
    // bg-[#00052a]
    <div className="h-screen text-white flex items-center justify-center">
      <div className="max-w-3xl">
        <Swiper
          spaceBetween={50}
          slidesPerView={3}
          onSlideChange={(cur) => setActive(cur.realIndex)}
          loop={true}
          centeredSlides={true}
          speed={800}
          autoplay={{
            delay:1000,
          }}
          modules={[Autoplay]}
        >
          {langs.map((lang, i) => (
            <SwiperSlide key={i}>
              <div className="h-96 flex">
                <div className={`card ${active === i && 'card-active'} bg-red-600 bg-opacity-30 ${lang.color} border-red-600`}>
                  <div className="flex items-center justify-center logo">
                    {logoComponents[lang.logo] || <div>No Logo</div>}
                  </div>
                  <h2 className="text-3xl font-semibold">{lang.name}</h2>
                  <p className="para">
                    Lorem, ipsum dolor sit amet consectetur adipisicing elit. consectetur adipisicing elit.
                  </p>
                  <div className="bg-red-600 skill-level">
                    {lang.skill}
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default FullBanner;
