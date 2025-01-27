import { Outlet } from "react-router"
import { Menu } from "./Menu"
import { useLocation } from "react-router"
import {useEffect, useState} from "react";
import '../App.css';

export function RootLayout() {
  const location = useLocation()

  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);
  const routeTitles: any = {
    "/": "Home",
    "/customer": "Customer Management",
    "/item": "Item Management",
    "/place-order": "Order Management"
  }

  const title = routeTitles[location?.pathname] || "Shop"

  return (
    <div className="flex h-screen">
      <Menu />
      <div className="flex-1 flex flex-col transition-all duration-300">
        <header className="bg-gray-800 text-white p-4 flex ">
          <h1 className="text-xl font-semibold">{title}</h1>
          {/* Right Section */}
          <div className="flex items-center space-x-4 gap-10 text-black">
            <div className="text-white ml-30">
              {currentTime.toLocaleDateString()} {currentTime.toLocaleTimeString()}
            </div>
            <img src="src/assets/images-wp-profile.jpeg" alt="User Profile" className="w-10 h-10 rounded-full border border-white ml-96 "/>
            <button className="bg-gray-200 text-gray-700 px-3 py-1 rounded-full hover:bg-gray-500 ">Sign In</button>
          </div>
        </header>

        <main className="p-4 flex-1 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
