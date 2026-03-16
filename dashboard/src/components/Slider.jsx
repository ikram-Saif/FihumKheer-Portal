import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import { useProjectStore } from "../store/projectsStor";

export default function Slider() {
  const { selectedProject } = useProjectStore();

  if (!selectedProject?.media || selectedProject.media.length === 0) {
    return (
      <div className="flex items-center justify-center h-64 bg-gray-100 rounded-lg">
        <p className="text-gray-500">No images available</p>
      </div>
    );
  }

  return (
    <div className="">
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        navigation
        pagination={{ clickable: true }}
        autoplay={{ delay: 4000, disableOnInteraction: false }}
        loop={true}
        className="rounded-2xl shadow-lg"
      >
        {selectedProject.media.map((img, index) => {
          const url = img?.url
            ? `http://localhost:1337${img.url}`
            : "/placeholder.png";

          return (
            <SwiperSlide key={index}>
              <div className="flex items-center justify-center w-full h-full bg-gray-50">
                <img
                  src={url}
                  alt={`slide-${index}`}
                  className="object-contain w-full h-full rounded-2xl"
                />
              </div>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  );
}
