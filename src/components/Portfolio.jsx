import { useState, useEffect, useRef } from "react";
import { FiChevronDown, FiX } from "react-icons/fi";
import gsap from "gsap";
import facebook from "../icons/facebookIcons.svg";
import instagram from "../icons/instagramIcons.svg";
import linkedin from "../icons/linkedinIcons.svg";
import Xicno from "../icons/Xicons.svg";
import dribbble from "../icons/dribbbleIcons.svg";
import github from "../icons/githubIcons.svg";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { Link } from "react-router-dom";
// eslint-disable-next-line
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

  const sliderSettings = {
    dots: true, // Enable dots for navigation
    infinite: true, // Infinite scrolling
    speed: 500, // Transition speed
    slidesToShow: 1, // Show one image at a time
    slidesToScroll: 1, // Scroll one image at a time
    arrows: true, // Show navigation arrows
  };
  // Generate a simple equation and set authAnswer
  useEffect(() => {
    const n1 = Math.floor(Math.random() * 20) + 2;
    const n2 = Math.floor(Math.random() * 10) + 1;
    setNum1(n1);
    setNum2(n2);
    setAuthAnswer(n1 + n2);
  }, []);
  const inputRef = useRef(null);
  // eslint-disable-next-line no-unused-vars
  const [userInput2, setUserInput2] = useState("");

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  const equation = num1 !== null && num2 !== null ? `${num1} + ${num2}` : "";

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
      boxShadow: "0px 3px 5px #D0FC35",
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
      backgroundColor: "#d1fc3556",
      duration: 0.3,
    });
  };

  const handleCursorOut = () => {
    gsap.to(cursorRef.current, {
      scale: 1,
      backgroundColor: "#D0FC35",
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
    } else if (document.getElementById("inputAuth").value === "") {
      document.getElementById("alertTrue").classList.add("hidden"); // Hide after showing
    } else {
      // Show error alert
      document.getElementById("alertFalse").classList.remove("hidden");
      setTimeout(() => {
        document.getElementById("alertFalse").classList.add("hidden"); // Hide after showing
        document.getElementById("inputAuth").value = ""; // Clear input
      }, 2000); // Display for 2 seconds
    }
  };
  const FullName = "Maryam Azddou";
  return (
    <main className="flex flex-col my-11 gap-y-3 w-full">
      {/* Custom Cursor */}
      <div
        ref={cursorRef}
        className="fixed top-0 left-0 w-8 h-8 dark:bg-[#d1fc35] bg-[#d1fc35] rounded-full pointer-events-none z-50"
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
            id="VerfyQueInputVal"
            className="p-4 w-[60%] lg:w-[25%] mb-3 hidden border-2 border-red-500 mx-auto bg-red-500/5 text-sm text-red-500 rounded-lg"
            role="alert"
          >
            <span className="font-medium">Authentication Error!</span> Please
            fill in the input field.
          </div>
          <div
            id="alertTrue"
            className="p-4 w-[60%] lg:w-[25%] mb-3 hidden border-2 border-green-500 mx-auto bg-green-500/5 text-sm text-green-500 rounded-lg"
            role="alert"
          >
            <span className="font-medium">Authentication Successful!</span> You
            have successfully accessed the portfolio.
          </div>

          <p className="mb-4 dark:text-[#F3F3F3] text-black text-lg">
            Solve the equation to access to{" "}
            <span className="dark:text-[#D0FC35] underline">Portfolio</span> :
          </p>
          <form
            onSubmit={handleSubmit}
            className="flex flex-col w-[60%] lg:w-[25%] mx-auto items-center"
          >
            <p className="dark:text-white gap-1 flex items-center text-xl mb-3 font-bold">
              {equation}{" "}
              <span className="flex items-center gap-1">
                =
                <p className="bg-[#D0FC35] text-[#000] px-4 text-xl py-1 rounded">
                  {userInput}
                </p>
              </span>
            </p>

            <label htmlFor="inputAuth" className="sr-only text-[#333333]">
              Answer
            </label>
            <input
              type="number"
              value={userInput}
              id="inputAuth"
              onChange={(e) => {
                const inputValue = e.target.value;
                if (inputValue.length <= 3) {
                  setUserInput(inputValue); // Allow only two digits
                }
              }}
              ref={inputRef}
              className="w-full px-4 dark:text-white text-black py-4 focus:outline-none focus:ring-1 focus:ring-[#333] dark:bg-[#1F1F1F] bg-white focus:border-none border-2 dark:border-[#333333] border-[#999999] mb-4 rounded"
              aria-required="true"
              placeholder="Your answer"
            />

            <button
              type="submit"
              id="sub"
              onClick={() => {
                if (document.getElementById("inputAuth").value === "") {
                  document
                    .getElementById("VerfyQueInputVal")
                    .classList.remove("hidden");
                  setTimeout(() => {
                    document
                      .getElementById("VerfyQueInputVal")
                      .classList.add("hidden");
                    document.getElementById("inputAuth").placeholder =
                      "Please fill in the input field!";
                  }, 3000);
                }
              }}
              onMouseEnter={handleCursorHover}
              onMouseLeave={handleCursorOut}
              className="bg-[#1F1F1F] text-[#d1fc35] border-2 dark:border-[#333333] focus:border-[#333] border-[#999999] py-4 w-full font-medium px-6 rounded transition-colors duration-300 ease-in-out hover:bg-[#333333] hover:text-[#d1fc35]/80"
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
            className="text-[#f1f1f1db] gap-6 border-2 dark:border-[#333333] border-[#99999] px-6 rounded-md py-6 mx-auto mt-11 w-[85%] md:w-[70%] lg:w-[60%] hover:scale-105 transition-transform duration-300 ease-in-out"
          >
            <div className="font-bold dark:text-white text-[#333333]  dark:textShadow flex justify-between items-center text-xl">
              <span className="flex gap-1">
                {FullName}'s <p className="text-[#D0FC35]">Portfolio</p>
              </span>{" "}
              <span>
                <FiChevronDown className="text-[#D0FC35]" />
              </span>
            </div>
          </button>

          {/* Dropdown Items */}
          <div
            ref={dropdownRef}
            className="overflow-hidden max-h-0 opacity-0 transform transition-all duration-500 ease-in-out"
          >
            <div className="text-[#f1f1f1db] py-6 flex flex-col gap-4 border-2 dark:border-[#333333] border-[#99999]  px-6 rounded-md mx-auto w-[85%] md:w-[70%] lg:w-[60%]">
              <div className="">
                <ul className="flex justify-around">
                  <li>
                    <a
                      target="/"
                      href="https://www.facebook.com/share/j23P1J8evMQS3o1K/?mibextid=LQQJ4d"
                    >
                      <img
                        className="border-2 hover:shadow-[3px_3px_#D0FC35] transition-all duration-300 py-3 px-4 rounded-md dark:border-[#333333] border-[#99999] "
                        src={facebook}
                        alt=""
                      />
                      <span>Follow us on Facebook</span>
                    </a>
                  </li>
                  <li>
                    <a
                      target="/"
                      href="https://www.instagram.com/maryam_azddou?igsh=MW9qZmdhNmZ2a3pjbg%3D%3D&utm_source=qr"
                    >
                      <img
                        className="border-2 py-3 hover:shadow-[3px_3px_#D0FC35] transition-all duration-300 px-4 rounded-md dark:border-[#333333] border-[#99999] "
                        src={instagram}
                        alt=""
                      />
                      <span>Follow us on Instagram</span>
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      <img
                        className="border-2 hover:shadow-[3px_3px_#D0FC35] transition-all duration-300 py-3 px-4 rounded-md dark:border-[#333333] border-[#99999] "
                        src={Xicno}
                        alt=""
                      />
                      <span>Follow us on X</span>
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      <img
                        className="border-2 hover:shadow-[3px_3px_#D0FC35] transition-all duration-300 py-3 px-4 rounded-md dark:border-[#333333] border-[#99999] "
                        src={dribbble}
                        alt=""
                      />
                      <span>Follow us on Dribbble</span>
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      <img
                        className="border-2 hover:shadow-[3px_3px_#D0FC35] transition-all duration-300 py-3 px-4 rounded-md dark:border-[#333333] border-[#99999] "
                        src={linkedin}
                        alt=""
                      />
                      <span>Connect on LinkedIn</span>
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      <img
                        className="border-2 hover:shadow-[3px_3px_#D0FC35] transition-all duration-300 py-3 px-4 rounded-md dark:border-[#333333] border-[#99999] "
                        src={github}
                        alt=""
                      />
                      <span>Check out our GitHub</span>
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
                  className="flex flex-col w-full dark:bg-[#1F1F1F] border-2 border-[#99999900] dark:hover:border-[#d1fc353f] px-4 rounded-md py-6 cursor-pointer transform transition-transform duration-300"
                  style={{ perspective: 1000 }}
                >
                  <span className="text-lg dark:text-[#ffffffe0] text-[#333333] font-bold">
                    {info.title}
                  </span>
                  <span className="dark:text-[#ffffff6e] text-[#333333] ">
                    {info.description}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Modal for More Details */}
          {selectedCard && (
            <div
              ref={modalRef}
              className="fixed inset-0 flex items-center justify-center bg-transparent backdrop-blur-sm  z-50 opacity-0 scale-0"
            >
              <div className="dark:bg-[#141414] bg-white border-2 dark:border-[#333333] p-6 rounded-lg w-[80%] max-w-lg relative">
                <button
                  onClick={handleCloseModal}
                  className="absolute top-4 right-4 text-2xl text-gray-500"
                >
                  <FiX />
                </button>
                <h2 className="text-2xl dark:text-[#F2F2F2] font-bold mb-4">
                  {selectedCard.title}
                </h2>

                {/* Image Slider */}
                <Slider className="mb-3" {...sliderSettings}>
                  {selectedCard.images.map((image, index) => (
                    <div key={index}>
                      <img
                        src={image}
                        alt={selectedCard.title}
                        className="w-full h-56 cursor-grab object-cover rounded-lg "
                      />
                    </div>
                  ))}
                </Slider>

                <p className="mb-4 dark:text-[#F2F2F2] mt-6">
                  {selectedCard.moreDetails}
                </p>
                <div className="flex flex-col">
                  <h3 className="text-xl dark:text-[#F2F2F2] font-semibold mb-2">
                    Features:
                  </h3>
                  <ul className="list-disc flex flex-col pl-5">
                    {selectedCard.features.map((feature, index) => (
                      <li key={index} className="list-disc dark:text-[#F2F2F2]">
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* More Info Link */}
                <div className="mt-4">
                  <Link
                    to={selectedCard.link}
                    className="text-blue-500 hover:underline"
                  >
                    More Info
                  </Link>
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
    link: "/frontend",
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
    images: [
      "https://learntocodewith.me/wp-content/uploads/2021/10/front-end-developer-1024x683.jpg",
      "https://t3.ftcdn.net/jpg/02/54/33/36/360_F_254333618_CGCoQkXnCv37gi6vfw8i1zD6PV1IS0pV.jpg",
      "https://img.freepik.com/premium-photo/fullstack-development_1327465-13610.jpg?size=626&ext=jpg",
      "https://cdn.pixabay.com/photo/2016/11/19/14/00/code-1839406_1280.jpg", // Added another image
    ],
  },
  {
    id: 2,
    title: "UI/UX Designer",
    link: "/uiuxdesign",
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
    images: [
      "https://img.freepik.com/premium-photo/ui-ux-design_1197721-98477.jpg?size=626&ext=jpg",
      "https://media.istockphoto.com/id/1268172253/photo/website-designer-creative-planning-phone-app-development-template-layout-framework-wireframe.webp?a=1&b=1&s=612x612&w=0&k=20&c=2riNNs_qnfRcC_uxiTOKjS2wbAdZoe4i6Q50xH8Cd08=",
      "https://cdn.sanity.io/images/599r6htc/regionalized/80890916035c843b5e8882682b7e2baef4bdd8b2-720x361.png?w=720&h=361&q=75&fit=max&auto=format",
      "https://cdn.prod.website-files.com/64f9d86c3da1bd10b13c772c/66d0f33279376bee3c9c1e02_Top-Designers_Data2_opt.webp",
    ],
  },
  {
    id: 3,
    title: "Web Designer",
    link: "/webdesign",
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
    images: [
      "https://img.freepik.com/premium-photo/black-white-image-desk-with-computer-screen-displaying-website_14117-833173.jpg?size=626&ext=jpg",
      "https://t4.ftcdn.net/jpg/03/54/17/85/360_F_354178547_hy7OujN7u4m2SqkZy1T3t41I6oXvnkxL.jpg",
      "https://media.istockphoto.com/id/1061328844/photo/woman-designing-gui.jpg?s=612x612&w=0&k=20&c=fnOyIgja_FuLWSddG8noNkQIyI__jU80q_XEkLNHxOQ=",
      "https://img.freepik.com/free-photo/web-design-technology-browsing-programming-concept_53876-163260.jpg?size=626&ext=jpg",
    ],
  },
  {
    id: 4,
    title: "Graphic Designer",
    link: "/graphicdesign",
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
    images: [
      "https://img.freepik.com/premium-photo/graphic-design-software-interface-with-39design39-typography-creative-workspace-setting_633842-14390.jpg?size=626&ext=jpg",
      "https://img.freepik.com/premium-photo/ideal-graphic-designers-seeking-unique_1254992-114797.jpg?size=626&ext=jpg",
      "https://img.freepik.com/premium-photo/poster-with-graphic-design-it-that-says-graph-it_1308157-329828.jpg?size=626&ext=jpg",
      "https://img.freepik.com/premium-photo/professional-designer-creating-branding-materials-marketing_1096183-3787.jpg?size=626&ext=jpg",
    ],
  },
  {
    id: 5,
    title: "Full-Stack Developer",
    link: "/fullstack",
    description:
      "Building complete web applications from front-end to back-end.",
    moreDetails:
      "Proficient in both client-side and server-side technologies, including PHP and Laravel.",
    features: [
      "Server-Side Development",
      "Database Management",
      "API Integration",
      "Client-Side Interactivity",
      "Scalable Architecture",
    ],
    images: [
      "https://wallpapercave.com/wp/wp10167050.jpg",
      "https://cdn.pixabay.com/photo/2021/08/04/13/06/software-developer-6521720_640.jpg",
      "https://wallpapercave.com/wp/wp8903914.jpg",
      "https://wallpapercave.com/wp/wp10167068.jpg",
    ],
  },
];
