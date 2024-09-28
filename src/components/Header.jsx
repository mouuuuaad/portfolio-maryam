import { DarkThemeToggle, Flowbite } from "flowbite-react";

const Header = () => {
  return (
    <Flowbite>
      <div className="fixed flex z-50 justify-between bg-transparent backdrop-blur-sm w-[100%] px-8 py-3 top-0">
        <div class="flex items-start gap-x-4">
          <a href="mailto:azddoumaryam@gmail.com">
            <button class="inline-flex items-center justify-center whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 dark:bg-[#D0FC35]-brand dark:text-black hover:dark:bg-[#D0FC35]-brand/80 bg-[#D0FC35] text-[#D0FC35]-brand hover:bg-[#D0FC35]/80 h-9 rounded-md px-4 py-5">
              Let's get in touch{" "}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                class="lucide lucide-mouse-pointer ml-2 h-5 w-5"
              >
                <path d="m3 3 7.07 16.97 2.51-7.39 7.39-2.51L3 3z"></path>
                <path d="m13 13 6 6"></path>
              </svg>
            </button>
          </a>
        </div>
        <DarkThemeToggle className=" w-[50px] dark:text-[#D0FC35] dark:outline-none justify-center flex hover:bg-none dark:border-[#333333] border-[#99999] " />
      </div>
    </Flowbite>
  );
};

export default Header;
