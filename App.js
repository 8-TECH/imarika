import { useState, useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { Helmet } from 'react-helmet';
import { FaFacebookF, FaInstagram, FaLinkedin, FaYoutube } from 'react-icons/fa';
import './App.css';
import { FaPhoneAlt, FaEnvelope } from "react-icons/fa";
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/autoplay';
import { FaXTwitter } from "react-icons/fa6";
import ArticlesSection from './components/ArticlesSection'; 
import UpcomingEvents from './components/UpcomingEvents';
import PastEventsSection from './components/PastEventsSection';



import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Admin from './components/Admin';

function ImarikaFoundation() {


  const Home = () => {
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <div className="font-sans text-gray-800">
      <Helmet>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta
          name="description"
          content="Imarika Foundation - Empowering communities through education, health, environmental conservation, agribusiness, and disaster response."
        />
        <meta name="author" content="Imarika Foundation" />
        <meta name="keywords" content="Imarika Foundation, Imarika, Foundation, Scholarships" />
        <title>Imarika Foundation</title>
        <link
  rel="stylesheet"
  href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css"
/>


      </Helmet>

      {/* Header */}
      <header className="bg-white shadow sticky top-0 z-50">
        <div className="flex justify-between items-center px-6 py-4">
          <div className="flex items-center space-x-2">
            <img
              src="/images/imarikalogo.jpeg"
              alt="Imarika Logo"
              className="h-10"
            />
            <span className="text-xl font-bold text-gray-800">Imarika Foundation</span>
          </div>

          {/* Desktop Navigation */}
          <ul className="hidden md:flex space-x-6 text-gray-700 font-medium">
            <li>
              <a href="#about" className="hover:text-orange-600">
                About
              </a>
            </li>
            <li>
              <a href="#programs" className="hover:text-orange-600">
                Programs
              </a>
            </li>
            <li>
              <a href="#articles" className="hover:text-orange-600">
                Articles
              </a>
            </li>
            <li>
              <a href="#events" className="hover:text-orange-600">
                Events
              </a>
            </li>
            <li>
              <a href="#get-involved" className="hover:text-orange-600">
                Get Involved
              </a>
            </li>
            <li>
              <a href="#contact" className="hover:text-orange-600">
                Contact
              </a>
            </li>
          </ul>

          {/* Mobile Hamburger */}
          <button className="md:hidden text-gray-700 focus:outline-none" onClick={toggleMobileMenu}>
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              {isMobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Nav */}
        {isMobileMenuOpen && (
          <ul className="md:hidden flex flex-col space-y-4 px-6 pb-4 text-gray-700 font-medium bg-white border-t border-gray-200">
            <li>
              <a href="#about" onClick={toggleMobileMenu}>
                About
              </a>
            </li>
            <li>
              <a href="#programs" onClick={toggleMobileMenu}>
                Programs
              </a>
            </li>
            <li>
              <a href="#articles" onClick={toggleMobileMenu}>
                Articles
              </a>
            </li>
            <li>
              <a href="#events" onClick={toggleMobileMenu}>
                Events
              </a>
            </li>
            <li>
              <a href="#get-involved" onClick={toggleMobileMenu}>
                Get Involved
              </a>
            </li>
            <li>
              <a href="#contact" onClick={toggleMobileMenu}>
                Contact
              </a>
            </li>
          </ul>
        )}
      </header>

      {/* Hero Section */}
      <section className="bg-blue-50 text-center py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold text-blue-800 mb-4">Empowering Communities</h1>
          <p className="text-lg md:text-xl text-gray-700 mb-6">
            Together we can build a better future through education, health, and sustainability.
          </p>
          <div className="flex justify-center space-x-4">
            <a
              href="#get-involved"
              className="px-6 py-3 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition"
            >
              Get Involved
            </a>
            <a
              href="#programs"
              className="px-6 py-3 border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-100 transition"
            >
              Our Programs
            </a>
          </div>
        </div>
      </section>

      {/* About Us */}
      <section id="about" className="py-16 px-6 bg-white" data-aos="fade-up">
  <h2 className="text-3xl font-semibold text-center mb-10 text-gray-800">About Us</h2>
  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 max-w-6xl mx-auto">
    {[
      { img: "Education-1.jpg", text: "Education" },
      { img: "Health-1.jpg", text: "Health" },
      { img: "environment.jpg", text: "Environment" },
      { img: "agrbsn.jpg", text: "Agribusiness" },
      { img: "Disaster-1.jpg", text: "Disaster" },
    ].map((item, index) => (
      <div key={index} className="text-center">
        <div className="group relative w-20 h-20 mx-auto rounded-full overflow-hidden border-4 border-white glowing-ring animate-spin-slow hover:animate-none transition-transform duration-500">
          <img
            src={`images/${item.img}`}
            alt={item.text}
            className="rounded-full w-full h-full object-cover transform group-hover:scale-125 transition-transform duration-500"
          />
        </div>
        <p className="text-gray-800 font-medium mt-2">{item.text}</p>
      </div>
    ))}
  </div>
</section>

      

      {/* Programs */}
      <section id="programs" className="py-16 px-6 bg-gray-50" data-aos="fade-up">
        <h2 className="text-3xl font-semibold text-center mb-10 text-gray-800">Our Programs</h2>
        <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {[
            { title: "Scholarship Program", desc: "We support underprivileged students with education scholarships." },
            { title: "Community Health", desc: "Promoting better health through outreach programs and clinics." },
            { title: "Environmental Conservation", desc: "Initiatives to protect and sustain the environment." },
          ].map((prog, i) => (
            <div key={i} className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition">
              <h3 className="text-xl font-bold mb-2 text-blue-700">{prog.title}</h3>
              <p className="text-gray-600">{prog.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Articles */}
      <ArticlesSection />

      {/* Events */}
      <UpcomingEvents />
      <PastEventsSection />


       {/* Get Involved */}
      <section id="get-involved" className="py-16 px-6 bg-gray-50" data-aos="fade-up">
        <h2 className="text-3xl font-semibold text-center mb-10 text-gray-800">Get Involved</h2>
        <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {[
            { title: "Volunteer", desc: "Be part of our mission by giving your time and skills." },
            { title: "Donate", desc: "Support our cause financially to reach more communities." },
            { title: "Partner", desc: "Collaborate with us in implementing sustainable programs." },
          ].map((opt, idx) => (
            <div key={idx} className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition">
              <h3 className="text-xl font-bold text-blue-700 mb-2">{opt.title}</h3>
              <p className="text-gray-600">{opt.desc}</p>
            </div>
          ))}
        </div>
      </section>


      

      {/* Contact */}
      <section id="contact" className="py-16 px-6 bg-white" data-aos="fade-up">
        <h2 className="text-3xl font-semibold text-center mb-6 text-gray-800">Contact Us</h2>

        
        <div className="max-w-4xl mx-auto text-center text-gray-600 space-y-6">


          {/* Google Map Embed */}
          <div className="w-full h-64 rounded overflow-hidden shadow-lg">
            <iframe
              title="Imarika Foundation Location"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3988.312996912001!2d39.8518343152642!3d-3.631753299999999!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x183fdd7a32997dad%3A0xc18694330c9212fa!2sImarika%20Sacco!5e0!3m2!1sen!2ske!4v1685205123456!5m2!1sen!2ske"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>


          
           {/* Contact details */}
<p>Get in touch with us to learn more about our initiatives and how you can help.
</p>

          <p>
            <strong>Imarika DT Sacco Plaza, Kilifi</strong> 
          </p>


<div className="mt-10 text-center space-y-4">
  <p className="text-lg text-gray-700 flex items-center justify-center gap-2">
    <FaPhoneAlt className="text-blue-600" />
    <span>
      Phone: <a href="tel:+254790289989" className="text-blue-600 hover:underline">0790 289 989</a>
    </span>
  </p>

  <p className="text-lg text-gray-700 flex items-center justify-center gap-2">
    <FaEnvelope className="text-orange-500" />
    <span>
      Email: <a href="mailto:info@imarika-foundation.org" className="text-blue-600 hover:underline">info@imarika-foundation.org</a>
    </span>
  </p>
</div>


        </div>
      </section>
      

     {/* Footer */}
<footer className="bg-gray-800 text-white text-center py-6 px-4">
  <div className="container mx-auto">

    <div className="container mx-auto text-center">
        <h3 className="text-lg font-semibold mb-4">Follow Us</h3>
        <div className="flex justify-center space-x-6 text-2xl">
          <a
            href="https://www.facebook.com/profile.php?id=100081154223367"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-blue-500"
          >
            <FaFacebookF />
          </a>

          <a
            href="https://x.com/ImarikaF2023"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-blue-400"
          >
            <FaXTwitter />
          </a>

          <a
            href="https://www.instagram.com/foundation_imarika_?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw=="
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-pink-500"
          >
            <FaInstagram />
          </a>
          <a
            href="https://www.linkedin.com/in/imarika-foundation-88a645253/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-blue-300"
          >
            <FaLinkedin />
          </a>
          <a
            href="https://www.youtube.com/@imarikafoundation"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-red-500"
          >
            <FaYoutube />
          </a>
        </div>
      </div>


    {/* Horizontal Line with margin top & bottom */}
    <hr className="border-gray-600 my-4" />

    <p className="text-sm">&copy; {new Date().getFullYear()} Imarika Foundation. All rights reserved.</p>
  </div>
</footer>


    </div>
  );
};


 return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/admin" element={<Admin />} />
      </Routes>
    </Router>
  );
}



export default ImarikaFoundation;
