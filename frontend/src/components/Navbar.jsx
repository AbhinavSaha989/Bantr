import React, { useState } from "react";
import { Search, ChevronDown, Plus } from "lucide-react";
import { Link } from "react-router-dom";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const Navbar = ({onSearch}) => {
  const queryClient = useQueryClient();
  const [isFocused, setIsFocused] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const { data: authUser } = useQuery({
    queryKey: ["authUser"],
  });
  const navigate = useNavigate();

  const { data: user } = useQuery({
    queryKey: ["user"],
    queryFn: async () => {
      try {
        const response = await axiosInstance.get("/users/get-user");
        return response.data;
      } catch (error) {
        console.log(error);
      }
    },
  });

  const handleLogout = async () => {
    const response = await axiosInstance.get("/users/logout");
    if (response.status === 200) {
      toast.success(response.data.message);
      queryClient.invalidateQueries({ queryKey: ["authUser"] });
    }
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    onSearch(e.target.value.trim());
  };

  


  const randomAvatarUrl = `https://robohash.org/${
    authUser?.username || "default"
  }?set=set2&size=50x50`;

  return (
    <nav className="bg-black p-4 shadow-md sticky top-0 z-30">
      <div className="container mx-auto flex items-center justify-between">
        {/* Logo and Title */}
        <Link
          to={"/"}
          className="flex items-center space-x-2 text-white text-xl font-bold flex-shrink-0"
        >
          <img src="../public/nav.png" alt="Logo" className="h-10" />
          <span className="hidden sm:block">Bantr</span>
        </Link>

        {/* Search Bar and User Actions */}
        <div className="flex items-center space-x-4 w-full justify-end md:w-auto">
          {/* Search Bar */}
          <div className="relative w-full md:w-64">
            <input
              type="text"
              value={searchQuery}
              onChange={handleSearchChange}
              className={`w-full px-4 py-2 pl-4 pr-10 rounded-lg shadow-sm text-gray-700 transition-all duration-300 ${
                isFocused
                  ? "bg-white focus:ring-2 focus:ring-0077b6"
                  : "bg-black text-white focus:ring-0"
              }`}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              placeholder="Search"
            />
            <Search
              className={`absolute right-3 top-1/2 transform -translate-y-1/2 transition-all duration-300 ${
                isFocused ? "text-black" : "text-white"
              }`}
              size={20}
            />
          </div>

          {/* Login Button or Profile Dropdown */}
          <div className="relative">
            {authUser ? (
              <div>
                <button
                  onClick={() => setDropdownOpen((prev) => !prev)}
                  className="flex items-center bg-gray-800 text-white px-2 py-1 rounded-lg hover:bg-gray-700 focus:outline-none"
                >
                  <img
                    src={randomAvatarUrl}
                    alt="User Avatar"
                    className="w-8 h-8 rounded-full"
                  />
                  <ChevronDown size={16} className="ml-2" />
                </button>
                {dropdownOpen && (
                  <div className="absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-md z-40">
                    {/* Profile Option */}
                    <div
                      className="flex flex-col items-start px-4 py-2 bg-gray-700 text-white cursor-pointer"
                      onClick={() => navigate(`/user/${user?._id}`)}
                    >
                      <div className="flex items-center mb-1">
                        <img
                          src={randomAvatarUrl}
                          alt="User Avatar"
                          className="w-6 h-6 rounded-full mr-2"
                        />
                        <span>{user?.username}</span>
                      </div>
                      <span className="text-sm">View Profile</span>
                    </div>

                    {/* Create Option */}
                    <div className="block md:hidden">
                      <Link
                        to="/create"
                        className="flex items-center px-4 py-2 text-gray-800 hover:bg-gray-100"
                      >
                        <Plus size={16} className="mr-2" />
                        <span>Create</span>
                      </Link>
                    </div>

                    {/* Logout */}
                    <button
                      onClick={() => {
                        handleLogout();
                      }}
                      className="block w-full text-left px-4 py-2 text-gray-800 hover:bg-gray-100"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link
                to="/login"
                className="px-4 py-2 text-white font-semibold rounded-lg shadow-md bg-[#E50815] focus:outline-none focus:ring-2 focus:ring-90e0ef"
              >
                Login
              </Link>
            )}
          </div>

          {/* Create Button for Desktop */}
          {authUser && (
            <div className="hidden md:block">
              <Link
                to="/create"
                className="flex items-center px-4 py-2 hover:bg-white hover:text-black text-white rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-[#90e0ef] transition-all duration-300 border border-[#fff]"
              >
                <Plus size={16} className="mr-2" />
                Create
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
