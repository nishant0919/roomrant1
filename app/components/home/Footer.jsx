import React from "react";
import { SiRoadmapdotsh } from "react-icons/si";

function Footer() {
  return (
    <footer className="px-4 py-8 bg-purple-200">
      <div className="container flex flex-wrap items-center justify-center mx-auto space-y-4 sm:justify-between sm:space-y-0">
        <div className="flex flex-row pr-3 space-x-4 sm:space-x-8">
          <SiRoadmapdotsh size={40} />
          <ul className="flex flex-wrap items-center space-x-4 sm:space-x-8">
            <li>
              <a rel="noopener noreferrer" href="#">
                Terms of Use
              </a>
            </li>
            <li>
              <a rel="noopener noreferrer" href="#">
                Privacy
              </a>
            </li>
          </ul>
        </div>
        <ul className="flex flex-wrap pl-3 space-x-4 sm:space-x-8">
          <li>
            <a rel="noopener noreferrer" href="#">
              Join
            </a>
            </li>
          <li>
            <a rel="noopener noreferrer" href="#">
              Post a Room
            </a>
          </li>
          <li>
            <a rel="noopener noreferrer" href="#">
              Find Rooms
            </a>
          </li>
        </ul>
      </div>
    </footer>
  );
}

export default Footer;