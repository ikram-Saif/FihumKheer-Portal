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
    <div className="w-full h-full">
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        navigation={true}
        pagination={{ 
          clickable: true,
          dynamicBullets: true 
        }}
        autoplay={{ 
          delay: 5000, 
          disableOnInteraction: false 
        }}
        loop={selectedProject.media.length > 1}
        className="w-full h-full rounded-2xl overflow-hidden swiper-premium"
        style={{
          "--swiper-navigation-size": "20px",
          "--swiper-theme-color": "#2563eb",
          "--swiper-navigation-color": "#ffffff",
          "--swiper-pagination-bullet-inactive-color": "#cbd5e1",
          "--swiper-pagination-bullet-inactive-opacity": "0.5",
        }}
      >
        {selectedProject.media.map((img, index) => {
          const url = img?.url
            ? `http://localhost:1337${img.url}`
            : "/placeholder.png";

          return (
            <SwiperSlide key={index}>
              <div className="flex items-center justify-center w-full h-full bg-gray-100 dark:bg-gray-900">
                <img
                  src={url}
                  alt={selectedProject.name || `slide-${index}`}
                  className="object-cover w-full h-full"
                />
              </div>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  );
}
