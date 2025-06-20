import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

const boardMembers = [
  {
    name: "Jackline Jumbe",
    role: "Board Chairperson",
    photo: "jacklin.jpg",
    bio: "Leads board meetings and provides strategic oversight. Re-elected to represent special interest groups.",
  },
  {
    name: "Sharrifu Shehe",
    role: "Vice Chairperson",
    photo: "sharif.jpg",
    bio: "Supports the Chairperson, ensures effective communication within the board.",
  },
  {
    name: "Sylvester Charo",
    role: "Treasurer",
    photo: "Sylvesterc.png",
    bio: "Oversees finances, ensures accountability in fund management.",
  },
  {
    name: "Dorcas Amakobe",
    role: "Board Member",
    photo: "dorcas.jpg",
    bio: "Active contributor to program design and implementation.",
  },
  {
    name: "Daniel Masha",
    role: "Board Member",
    photo: "man.png",
    bio: "Active contributor to program design and implementation.",
  },
  {
    name: "George Yongo",
    role: "Board Member",
    photo: "george.png",
    bio: "Plays a role in governance, monitoring and evaluation of projects.",
  },
];

const staffMembers = [
  {
    name: "Elmina M. Magesho",
    role: "Executive Director/Secretary To The Board",
    photo: "elmina.jpg",
    bio: "Oversees the overall management of the Foundation, coordinates implementation of programs, advises the board, and ensures alignment with strategic goals.",
  },
  {
    name: "Jane M. Voyah",
    role: "Program Officer Education & Health",
    photo: "janej.jpg",
    bio: "Manages education programs including scholarships and mentorship, as well as environmental projects like tree planting and awareness campaigns.",
  },
  {
    name: "Saumu Sidi Julius",
    role: "Accounts & Admin Officer",
    photo: "saumu.jpg",
    bio: "Handles the Foundation’s finances, budgeting, reporting, and administrative operations to ensure compliance and smooth internal coordination.",
  },
];

const BoardSection = () => {
  const [selected, setSelected] = useState(null);

  const renderSwiper = (members, sectionId) => (
    <div className="relative max-w-6xl mx-auto">
      <Swiper
        modules={[Autoplay, Navigation]}
        spaceBetween={20}
        slidesPerView={2}
        breakpoints={{
          640: { slidesPerView: 3 },
          768: { slidesPerView: 4 },
          1024: { slidesPerView: 5 },
        }}
        autoplay={{ delay: 3000, disableOnInteraction: false }}
        navigation={{
          nextEl: `.custom-next-${sectionId}`,
          prevEl: `.custom-prev-${sectionId}`,
        }}
        loop={true}
        className="pb-10"
      >
        {members.map((member, index) => (
          <SwiperSlide key={index}>
            <div
              className="bg-white rounded-xl shadow-md p-4 text-center cursor-pointer hover:shadow-lg transition h-[200px] flex flex-col items-center justify-between"
              onClick={() => setSelected(member)}
            >
              <img
                src={`/images/${member.photo}`}
                alt={member.name}
                className="w-24 h-24 mx-auto rounded-full object-cover mb-3"
              />
              <div>
                <h4 className="text-lg font-semibold text-gray-800">{member.name}</h4>
                <p className="text-sm text-gray-500">{member.role}</p>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Custom Navigation Arrows */}
      <div
        className={`custom-prev-${sectionId} hidden md:flex absolute -left-6 top-1/2 transform -translate-y-1/2 z-10 cursor-pointer 
        bg-orange-500 hover:bg-blue-600 text-white p-2 rounded-full shadow-lg transition duration-300`}
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </div>

      <div
        className={`custom-next-${sectionId} hidden md:flex absolute -right-6 top-1/2 transform -translate-y-1/2 z-10 cursor-pointer 
        bg-orange-500 hover:bg-blue-600 text-white p-2 rounded-full shadow-lg transition duration-300`}
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </div>
    </div>
  );

  return (
    <section id="board" className="py-16 px-6 bg-gray-100" data-aos="fade-up">
      <h2 className="text-3xl font-semibold text-center mb-10 text-gray-800">Board Members</h2>
      {renderSwiper(boardMembers, "board")}

      <h2 className="text-3xl font-semibold text-center mt-16 mb-10 text-gray-800">Staff Members</h2>
      {renderSwiper(staffMembers, "staff")}

      {/* Modal */}
      {selected && (
        <div
          className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50"
          onClick={() => setSelected(null)}
        >
          <div
            className="bg-white rounded-lg shadow-xl p-6 max-w-md w-full relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setSelected(null)}
              className="absolute top-2 right-2 text-gray-500 hover:text-red-600 text-xl font-bold"
            >
              &times;
            </button>
            <img
              src={`/images/${selected.photo}`}
              alt={selected.name}
              className="w-28 h-28 mx-auto rounded-full object-cover mb-4"
            />
            <h3 className="text-xl font-semibold text-gray-800 text-center">{selected.name}</h3>
            <p className="text-sm text-gray-600 text-center mb-2">{selected.role}</p>
            <p className="text-gray-600 text-sm text-justify">{selected.bio}</p>
          </div>
        </div>
      )}
    </section>
  );
};

export default BoardSection;
