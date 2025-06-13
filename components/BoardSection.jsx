import React, { useState } from "react";

const boardMembers = [
  {
    name: "Jackline Jumbe",
    role: "Board Chairperson",
    photo: "lady2.png",
    bio: "Leads board meetings and provides strategic oversight. Re-elected to represent special interest groups.",
  },
  {
    name: "Sharrifu Shehe",
    role: "Vice Chairperson",
    photo: "man.png",
    bio: "Supports the Chairperson, ensures effective communication within the board.",
  },
  {
    name: "Sylvester Charo",
    role: "Treasurer",
    photo: "man.png",
    bio: "Oversees finances, ensures accountability in fund management.",
  },
  {
    name: "Dorcas Amakobe",
    role: "Board Member",
    photo: "lady2.png",
    bio: "Active contributor to program design and implementation.",
  },
  {
    name: "George Yongo",
    role: "Board Member",
    photo: "man.png",
    bio: "Plays a role in governance, monitoring and evaluation of projects.",
  },
  {
    name: "Peter K. Angore",
    role: "Executive Director/Secretary To The Board",
    photo: "man.png",
    bio: "Oversees the overall management of the Foundation, coordinates implementation of programs, advises the board, and ensures alignment with strategic goals.",
  },
  {
    name: "Elmina M. Magesho",
    role: "Program Officer Health & Agribusiness",
    photo: "lady2.png",
    bio: "Leads the planning and execution of health and agribusiness projects. She coordinates medical outreach, reproductive health initiatives, farmer training, and market linkage programs.",
  },
  {
    name: "Jane M. Voyah",
    role: "Program Officer Education & Environment",
    photo: "lady2.png",
    bio: "Manages education programs including scholarships and mentorship, as well as environmental projects like tree planting and awareness campaigns.",
  },
  {
    name: "Saumu Sidi Julius",
    role: "Accounts &amp; Admin Officer",
    photo: "lady2.png",
    bio: "Handles the Foundation’s finances, budgeting, reporting, and administrative operations to ensure compliance and smooth internal coordination.",
  },
];

const BoardSection = () => {
  const [selected, setSelected] = useState(null);

  return (
    <section id="board" className="py-16 px-6 bg-gray-100" data-aos="fade-up">
      <h2 className="text-3xl font-semibold text-center mb-10 text-gray-800">Board Members</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 max-w-6xl mx-auto">
        {boardMembers.map((member, index) => (
          <div
            key={index}
            className="bg-white rounded-xl shadow-md p-4 text-center cursor-pointer hover:shadow-lg transition"
            onClick={() => setSelected(member)}
          >
            <img
              src={`/images/${member.photo}`}
              alt={member.name}
              className="w-24 h-24 mx-auto rounded-full object-cover mb-3"
            />
            <h4 className="text-lg font-semibold text-gray-800">{member.name}</h4>
            <p className="text-sm text-gray-500">{member.role}</p>
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
