import React, { useEffect, useState } from "react";
import axios from "axios";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/autoplay";
import { Navigation, Autoplay } from 'swiper/modules';

const PastEventsSection = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    axios.get("http://127.0.0.1:8000/events/past/")
      .then(res => setEvents(res.data))
      .catch(err => console.error("Failed to fetch past events:", err));
  }, []);

  return (
    <section id="past-events" className="w-full px-4 py-12 md:px-20 bg-white">
      <div className="mb-12 text-center">
        <h2 className="text-3xl font-semibold text-gray-800 mb-2">Past Events</h2>
        <p className="text-gray-600">See what we’ve been up to recently.</p>
      </div>

      <Swiper
        modules={[Navigation, Autoplay]}
        navigation
        autoplay={{ delay: 5000, disableOnInteraction: false }}
        loop
        spaceBetween={20}
        slidesPerView={1}
        breakpoints={{ 768: { slidesPerView: 2 }, 1024: { slidesPerView: 3 } }}
      >
        {events.map((event, index) => (
          <SwiperSlide key={event.id || index}>
            <div className="bg-gray-100 rounded-2xl shadow-md overflow-hidden">
              <div className="w-full h-48 relative">
                <Swiper
                  modules={[Autoplay]}
                  autoplay={{ delay: 3000 }}
                  loop
                  allowTouchMove={false}
                  className="w-full h-48"
                >
                  {(event.images && event.images.length > 0
                    ? event.images
                    : ["/images/environment.jpg", "/images/Health-1.jpg", "/images/imarikalogo.jpeg"]
                  ).map((imgObj, i) => (
                    <SwiperSlide key={i}>
                      <img
                        src={typeof imgObj === "string" ? imgObj : imgObj.image}
                        alt={`Event ${event.title} Image ${i + 1}`}
                        className="w-full h-48 object-cover"
                      />
                    </SwiperSlide>
                  ))}
                </Swiper>
              </div>
              <div className="p-4 h-48">
                <h3 className="text-xl font-semibold text-gray-800">{event.title}</h3>
                <p className="text-sm text-gray-600 mt-1">
                  {new Date(event.event_date).toDateString()} • {event.location}
                </p>
                <p className="mt-2 text-gray-700 text-sm">{event.description}</p>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

export default PastEventsSection;
