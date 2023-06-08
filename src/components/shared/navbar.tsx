import Link from "next/link";
import { useState } from "react";

function NavBar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState("");

  const handleItemClick = (item: any) => {
    setSelectedItem(item);
  };

  const isActive = (item: any) => {
    return selectedItem === item
      ? "text-white md:text-blue-700 bg-blue-700 md:bg-transparent"
      : "text-gray-900 hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700";
  };

  const toggleNavbar = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="bg-white border-gray-200">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <Link href="/" className="flex items-center">
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQISo3mE5Rd6kDPOQoYo0bNHfO-bVJDIfF8uTb8IppqxnYELlBB9cCLVT2y6-Zrcgm7wg&usqp=CAU"
            className="h-8 mr-3"
            alt="Flowbite Logo"
          />
          <span className="self-center text-2xl font-semibold whitespace-nowrap">
            Taller 3BS
          </span>
        </Link>
        <button
          data-collapse-toggle="navbar-default"
          type="button"
          className="inline-flex items-center p-2 ml-3 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200"
          aria-controls="navbar-default"
          aria-expanded="false"
          onClick={toggleNavbar}
        >
          <span className="sr-only">Abrir menú</span>
          <svg
            className="w-6 h-6"
            aria-hidden="true"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
              clipRule="evenodd"
            ></path>
          </svg>
        </button>
        <div
          id="navbar-default"
          className={`${
            isMenuOpen ? "block" : "hidden"
          } w-full md:block md:w-auto`}
        >
          <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:border-0 md:bg-white">
            <li>
              <Link
                href="/vehicles"
                className={`block py-2 pl-3 pr-4 rounded ${isActive(
                  "Vehicles"
                )} md:p-0`}
                onClick={() => handleItemClick("Vehicles")}
              >
                Vehículos
              </Link>
            </li>

            <li>
              <Link
                href="/customers"
                className={`block py-2 pl-3 pr-4 rounded ${isActive(
                  "Customers"
                )} md:p-0`}
                onClick={() => handleItemClick("Customers")}
              >
                Clientes
              </Link>
            </li>

            <li>
              <Link
                href="/orders"
                className={`block py-2 pl-3 pr-4 rounded ${isActive(
                  "Orders"
                )} md:p-0`}
                onClick={() => handleItemClick("Orders")}
              >
                Órdenes
              </Link>
            </li>
            <li>
              <Link
                href="/personnel"
                className={`block py-2 pl-3 pr-4 rounded ${isActive(
                  "Personnel"
                )} md:p-0`}
                onClick={() => handleItemClick("Personnel")}
              >
                Personal
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default NavBar;
