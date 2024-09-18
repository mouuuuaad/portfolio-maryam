import { useState, useEffect, useRef } from "react";
import { FiChevronDown, FiX } from "react-icons/fi";
import gsap from "gsap";
import facebook from "../icons/facebookIcons.svg";
import instagram from "../icons/instagramIcons.svg";
import linkedin from "../icons/linkedinIcons.svg";
import Xicno from "../icons/Xicons.svg";
import dribbble from "../icons/dribbbleIcons.svg";
import github from "../icons/githubIcons.svg";

const PortfolioDropdown = () => {
  const [isDropdown, setIsDropdown] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);
  const [authAnswer, setAuthAnswer] = useState(null);
  const [userInput, setUserInput] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [num1, setNum1] = useState(0);
  const [num2, setNum2] = useState(0);
  const dropdownRef = useRef(null);
  const itemRefs = useRef([]);
  const cursorRef = useRef(null);
  const modalRef = useRef(null);

  // Generate a simple equation and set authAnswer
  useEffect(() => {
    const n1 = Math.floor(Math.random() * 100) + 2;
    const n2 = Math.floor(Math.random() * 10) + 1;
    setNum1(n1);
    setNum2(n2);
    setAuthAnswer(n1 + n2);
  }, []);
  const inputRef = useRef(null);
  const [userInput2, setUserInput2] = useState("");

  useEffect(() => {
    // Focus the input when the component mounts
    inputRef.current.focus();
  }, []);

  // Create the equation string for display
  const equation =
    num1 !== null && num2 !== null ? `${num1} + ${num2} = ?` : "";

  // Dropdown animation
  useEffect(() => {
    if (isDropdown) {
      gsap.to(dropdownRef.current, {
        duration: 0.6,
        opacity: 1,
        maxHeight: 1000,
        y: 0,
        ease: "power3.out",
      });
      gsap.fromTo(
        itemRefs.current,
        { opacity: 0, y: -30, rotateY: 45, scale: 0.9 },
        {
          opacity: 1,
          y: 0,
          rotateY: 0,
          scale: 1,
          stagger: 0.1,
          duration: 0.6,
          ease: "power3.out",
        }
      );
    } else {
      gsap.to(dropdownRef.current, {
        duration: 0.6,
        opacity: 0,
        maxHeight: 0,
        y: -20,
        ease: "power3.in",
      });
    }
  }, [isDropdown]);

  // Handle hover for advanced 3D effect
  const handleHover = (index) => {
    gsap.to(itemRefs.current[index], {
      scale: 1.08,
      rotateY: 15,
      rotateX: 10,
      boxShadow: "0px 3px 5px #a855f7",
      zIndex: 10,
      duration: 0.2,
    });
  };

  const handleHoverOut = (index) => {
    gsap.to(itemRefs.current[index], {
      scale: 1,
      rotateY: 0,
      rotateX: 0,
      boxShadow: "none",
      zIndex: 1,
      duration: 0.3,
    });
  };

  // Handle card click to open modal
  const handleCardClick = (id) => {
    setSelectedCard(portfolioDetails.find((item) => item.id === id));
    gsap.to(modalRef.current, {
      duration: 0.6,
      opacity: 1,
      scale: 1,
      ease: "power3.out",
    });
  };

  // Handle closing the modal
  const handleCloseModal = () => {
    gsap.to(modalRef.current, {
      duration: 0.6,
      opacity: 0,
      scale: 0.8,
      ease: "power3.in",
      onComplete: () => setSelectedCard(null),
    });
  };

  // Cursor interaction effect
  useEffect(() => {
    const onMouseMove = (e) => {
      gsap.to(cursorRef.current, {
        x: e.clientX - cursorRef.current.offsetWidth / 2,
        y: e.clientY - cursorRef.current.offsetHeight / 2,
        duration: 0.3,
        ease: "power2.out",
      });
    };
    window.addEventListener("mousemove", onMouseMove);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
    };
  }, []);

  // Cursor hover effect
  const handleCursorHover = () => {
    gsap.to(cursorRef.current, {
      scale: 1.5,
      backgroundColor: "#ff007a",
      duration: 0.3,
    });
  };

  const handleCursorOut = () => {
    gsap.to(cursorRef.current, {
      scale: 1,
      backgroundColor: "#a855f7",
      duration: 0.3,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (parseInt(userInput) === authAnswer) {
      // Show success alert and authenticate the user
      document.getElementById("alertTrue").classList.remove("hidden");
      setTimeout(() => {
        setIsAuthenticated(true);
        document.getElementById("alertTrue").classList.add("hidden"); // Hide after showing
      }, 2000); // Display for 2 seconds
    } else {
      // Show error alert
      document.getElementById("alertFalse").classList.remove("hidden");
      setTimeout(() => {
        document.getElementById("alertFalse").classList.add("hidden"); // Hide after showing
        document.getElementById("inputAuth").value = ""; // Clear input
      }, 2000); // Display for 2 seconds
    }
  };
  const FullName = "Mariam Azddou";
  return (
    <main className="flex flex-col my-11 gap-y-3 w-full">
      {/* Custom Cursor */}
      <div
        ref={cursorRef}
        className="fixed top-0 left-0 w-8 h-8 bg-purple-500 rounded-full pointer-events-none z-50"
        style={{ mixBlendMode: "difference" }}
      ></div>

      {/* Authentication Section */}
      {!isAuthenticated ? (
        <div className="text-center mb-6">
          <div
            id="alertFalse"
            className="p-4 w-[60%] lg:w-[25%] mb-3 hidden border-2 border-red-500 mx-auto bg-red-500/5 text-sm text-red-500 rounded-lg"
            role="alert"
          >
            <span className="font-medium">Authentication Error!</span> The
            answer you provided is incorrect. Please try again.
          </div>
          <div
            id="alertTrue"
            className="p-4 w-[60%] lg:w-[25%] mb-3 hidden border-2 border-green-500 mx-auto bg-green-500/5 text-sm text-green-500 rounded-lg"
            role="alert"
          >
            <span className="font-medium">Authentication Successful!</span> You
            have successfully accessed the portfolio.
          </div>

          <p className="mb-4 text-[#F3F3F3] text-lg">
            Solve the equation to access to Portfolio :
          </p>
          <form
            onSubmit={handleSubmit}
            className="flex flex-col w-[60%] lg:w-[25%] mx-auto items-center"
          >
            <p className=" text-white text-xl mb-3 font-bold">{equation}</p>
            <input
              type="number"
              value={userInput}
              id="inputAuth"
              onChange={(e) => setUserInput(e.target.value)}
              ref={inputRef}
              className="w-full px-4 text-white py-4 outline-none bg-[#1F1F1F] border-2 border-[#333333] mb-4 rounded"
              required
            />
            <button
              type="submit"
              className="bg-[#1F1F1F] text-[#999999] border-2 border-[#333333] py-4 w-full font-medium px-6 rounded"
            >
              Submit
            </button>
          </form>
        </div>
      ) : (
        <>
          {/* Dropdown Button */}
          <button
            onClick={() => setIsDropdown(!isDropdown)}
            onMouseEnter={handleCursorHover}
            onMouseLeave={handleCursorOut}
            className="text-[#f1f1f1db] gap-6 border-2 border-[#333333] px-6 rounded-md py-6 mx-auto mt-11 w-[85%] md:w-[70%] lg:w-[60%] hover:scale-105 transition-transform duration-300 ease-in-out"
          >
            <div className="font-bold textShadow flex gap-2 justify-between items-center text-xl">
              {FullName}'s Portfolio <FiChevronDown />
            </div>
          </button>

          {/* Dropdown Items */}
          <div
            ref={dropdownRef}
            className="overflow-hidden max-h-0 opacity-0 transform transition-all duration-500 ease-in-out"
          >
            <div className="text-[#f1f1f1db] py-6 flex flex-col gap-4 border-2 border-[#333333] px-6 rounded-md mx-auto w-[85%] md:w-[70%] lg:w-[60%]">
              <div className="">
                <ul className="flex justify-around">
                  <li>
                    <a target="/" href="https://www.facebook.com/share/j23P1J8evMQS3o1K/?mibextid=LQQJ4d">
                      <img
                        className="border-2 hover:shadow-[3px_3px_#a855f7] transition-all duration-300 py-3 px-4 rounded-md border-[#333333]"
                        src={facebook}
                        alt=""
                      />
                    </a>
                  </li>
                  <li>
                    <a target="/" href="https://www.instagram.com/maryam_azddou?igsh=MW9qZmdhNmZ2a3pjbg%3D%3D&utm_source=qr">
                      <img
                        className="border-2 py-3 hover:shadow-[3px_3px_#a855f7] transition-all duration-300 px-4 rounded-md border-[#333333]"
                        src={instagram}
                        alt=""
                      />
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      <img
                        className="border-2 hover:shadow-[3px_3px_#a855f7] transition-all duration-300 py-3 px-4 rounded-md border-[#333333]"
                        src={Xicno}
                        alt=""
                      />
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      <img
                        className="border-2 hover:shadow-[3px_3px_#a855f7] transition-all duration-300 py-3 px-4 rounded-md border-[#333333]"
                        src={dribbble}
                        alt=""
                      />
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      <img
                        className="border-2 hover:shadow-[3px_3px_#a855f7] transition-all duration-300 py-3 px-4 rounded-md border-[#333333]"
                        src={linkedin}
                        alt=""
                      />
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      <img
                        className="border-2 hover:shadow-[3px_3px_#a855f7] transition-all duration-300 py-3 px-4 rounded-md border-[#333333]"
                        src={github}
                        alt=""
                      />
                    </a>
                  </li>
                </ul>
              </div>
              {portfolioDetails.map((info, index) => (
                <div
                  key={info.id}
                  ref={(el) => (itemRefs.current[index] = el)}
                  onMouseEnter={() => handleHover(index)}
                  onMouseLeave={() => handleHoverOut(index)}
                  onClick={() => handleCardClick(info.id)}
                  className="flex flex-col w-full bg-[#1F1F1F] px-4 rounded-md py-6 cursor-pointer transform transition-transform duration-300"
                  style={{ perspective: 1000 }}
                >
                  <span className="text-lg font-bold">{info.title}</span>
                  <span>{info.description}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Modal for More Details */}
          {selectedCard && (
            <div
              ref={modalRef}
              className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-75 z-50 opacity-0 scale-0"
            >
              <div className="bg-white p-6 rounded-lg w-[80%] max-w-lg relative">
                <button
                  onClick={handleCloseModal}
                  className="absolute top-4 right-4 text-2xl text-gray-500"
                >
                  <FiX />
                </button>
                <h2 className="text-2xl font-bold mb-4">
                  {selectedCard.title}
                </h2>
                <img
                  src={selectedCard.image}
                  alt={selectedCard.title}
                  className="w-full h-56 object-cover rounded-lg mb-4"
                />
                <p className="mb-4">{selectedCard.moreDetails}</p>
                <div className="flex flex-col">
                  <h3 className="text-xl font-semibold mb-2">Features:</h3>
                  <ul className="list-disc pl-5">
                    {selectedCard.features.map((feature, index) => (
                      <li key={index}>{feature}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          )}
        </>
      )}
    </main>
  );
};

export default PortfolioDropdown;
const portfolioDetails = [
  {
    id: 1,
    title: "Front-End Developer",
    description:
      "Specializing in React, JavaScript, and modern web technologies.",
    moreDetails:
      "Experienced in building responsive web apps using React, GSAP animations, and Tailwind CSS.",
    features: [
      "Responsive Design",
      "Performance Optimization",
      "Interactive Animations",
      "Modern UI Libraries",
      "Cross-Browser Compatibility",
    ],
    image:
      "https://learntocodewith.me/wp-content/uploads/2021/10/front-end-developer-1024x683.jpg", // Replace with actual image URL
  },
  {
    id: 2,
    title: "UI/UX Designer",
    description:
      "Crafting user-centric interfaces with a focus on accessibility and aesthetics.",
    moreDetails:
      "Expert in designing wireframes, prototypes, and high-fidelity designs using Figma and Adobe XD.",
    features: [
      "User-Centered Design",
      "Wireframing",
      "Prototyping",
      "Visual Design",
      "Usability Testing",
    ],
    image:
      "https://images.prismic.io/dribbble/d4055bbc-0764-4598-a835-ff4f0a738127_case_study_final.webp?auto=compress,format&rect=0,0,800,600&w=1200&h=900%201200w,%20https://images.prismic.io/dribbble/d4055bbc-0764-4598-a835-ff4f0a738127_case_study_final.webp?auto=compress,format&rect=0,0,800,599&w=375&h=281%20375w,%20https://images.prismic.io/dribbble/d4055bbc-0764-4598-a835-ff4f0a738127_case_study_final.webp?auto=compress,format&rect=0,0,800,600&w=744&h=558%20744w", // Replace with actual image URL
  },
  {
    id: 3,
    title: "Web Designer",
    description: "Creating visually appealing and user-friendly web designs.",
    moreDetails:
      "Skilled in HTML, CSS, and visual design principles to craft stunning web layouts.",
    features: [
      "Visual Aesthetics",
      "HTML/CSS Expertise",
      "Cross-Device Compatibility",
      "Interactive Elements",
      "Design System Integration",
    ],
    image:
      "https://media.gettyimages.com/id/1219854221/photo/web-design-development-and-coding-concept.jpg?s=612x612&w=0&k=20&c=FqSjdRh6subL_UMSpuXxeRpvkt1krxUiyCQZ1ws7rOk=", // Replace with actual image URL
  },
  {
    id: 4,
    title: "Graphic Designer",
    description: "Designing eye-catching graphics and branding materials.",
    moreDetails:
      "Experienced in Adobe Illustrator, Photoshop, and creating visual assets for various media.",
    features: [
      "Brand Identity Design",
      "Vector Graphics",
      "Marketing Materials",
      "Illustrations",
      "Photo Editing",
    ],
    image:
      "https://img.freepik.com/premium-photo/ideal-graphic-designers-seeking-unique_1254992-114797.jpg?size=626&ext=jpg", // Replace with actual image URL
  },
  {
    id: 5,
    title: "Full-Stack Developer",
    description:
      "Building complete web applications from front-end to back-end.",
    moreDetails:
      "Proficient in both client-side and server-side technologies, including php and Laravel.",
    features: [
      "Server-Side Development",
      "Database Management",
      "API Integration",
      "Client-Side Interactivity",
      "Scalable Architecture",
    ],
    image:
      "https://cdn.pixabay.com/photo/2021/08/04/13/06/software-developer-6521720_640.jpg", // Replace with actual image URL
  },
];
