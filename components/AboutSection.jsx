import React, { useState } from "react";

const sectors = [
  {
    img: "scholarship.jpg",
    text: "Education",
    description:
      "We support education through scholarships, mentorship programs, and digital literacy labs. In 2024, 82 students benefited, including one top KCSE performer aspiring to study Medicine abroad.",
  },
  {
    img: "health.jpg",
    text: "Health",
    description:
      "We promote health via free medical eye camps, anti-jigger campaigns, dignity packs, and reproductive health education—reaching 4,500+ girls in 41 schools.",
  },
  {
    img: "enviro.jpg",
    text: "Environment",
    description:
      "Our environmental focus includes tree planting initiatives across schools and community areas to enhance sustainability.",
  },
  {
    img: "agrics.jpg",
    text: "Agribusiness",
    description:
      "We train farmers in cassava production and market linkage to boost food security and income, impacting 20+ local farmers.",
  },
  {
    img: "disaster.jpg",
    text: "Disaster",
    description:
      "We mobilize support for disaster-affected communities through emergency response programs, with a dedicated annual budget.",
  },
];

const AboutSection = () => {
  const [selected, setSelected] = useState(null);

  return (
    <section id="about" className="py-16 px-6 bg-white" data-aos="fade-up">
      <h2 className="text-3xl font-semibold text-center mb-10 text-gray-800">About Us</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6 max-w-6xl mx-auto">
        {sectors.map((item, index) => (
          <div key={index} className="text-center">
            <div
              onClick={() => setSelected(item)}
              className="group relative w-24 h-24 mx-auto rounded-full overflow-hidden border-4 border-white glowing-ring animate-spin-slow hover:animate-none transition-transform duration-500 cursor-pointer"
              title={item.text}
            >
              <img
                src={`/images/${item.img}`}
                alt={item.text}
                className="rounded-full w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
              />
            </div>
            <p className="text-gray-800 font-medium mt-2">{item.text}</p>
          </div>
        ))}
      </div>

      {/* Popup Modal */}
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
              src={`/images/${selected.img}`}
              alt={selected.text}
              className="w-full h-48 object-cover rounded-md mb-4"
            />
            <h3 className="text-xl font-semibold text-gray-800 mb-2">{selected.text}</h3>
            <p className="text-gray-600">{selected.description}</p>
          </div>
        </div>
      )}
    </section>
  );
};

export default AboutSection;
