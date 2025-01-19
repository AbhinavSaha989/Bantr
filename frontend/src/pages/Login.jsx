import React, { useState } from "react";
import { Link } from "react-router-dom";
import { axiosInstance } from "../lib/axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { LoaderIcon } from "react-hot-toast";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const queryClient = useQueryClient();

  const { mutate: loginUser, isLoading } = useMutation({
    mutationFn: async (data) => {
      const response = await axiosInstance.post("/users/login", data);
      return response.data;
    },
    onSuccess: (data) => {
      toast.success(data.message);
      queryClient.invalidateQueries({ queryKey: ["authUser"] });
    },
    onError: (error) => {
      toast.error(error.response.data.message);
    },
  });

  const handleSignup = async (event) => {
    event.preventDefault();
    loginUser({ username, password });
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-full max-w-md p-8 rounded-lg shadow-md md:bg-[#fdf0d5] md:backdrop-blur-sm md:bg-opacity-30 md:border border-gray-300">
        <h1
          className="text-3xl font-bold text-center mb-6"
          style={{ color: "#fff" }}
        >
          Login
        </h1>
        <form onSubmit={handleSignup} className="space-y-6">
          <div>
            <label
              htmlFor="username"
              className="block text-sm font-medium"
              style={{ color: "#fff" }}
            >
              Username
            </label>
            <input
              id="username"
              type="text"
              placeholder="Username"
              value={username}
              onChange={(event) => setUsername(event.target.value)}
              className="mt-1 w-full px-4 py-2 border rounded-lg shadow-sm focus:ring focus:border bg-[#fff] text-black"
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium"
              style={{ color: "#fff" }}
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              placeholder="Password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              className="mt-1 w-full px-4 py-2 border rounded-lg shadow-sm focus:ring focus:border bg-[#fff] text-black"
            />
          </div>
          <button
            type="submit"
            className={`w-full py-2 px-4 rounded-lg shadow-md flex items-center justify-center bg-[#E50815] ${
              isLoading ? "opacity-70" : ""
            }`}
            disabled={isLoading}
            style={{
              color: "#FEFAE0",
              height: "45px",
            }}
          >
            {isLoading ? (
              <LoaderIcon className="size-5 animate-spin" />
            ) : (
              "Login"
            )}
          </button>
        </form>
        <p className="mt-4 text-center text-sm text-white">
          Don't have an account?{" "}
          <Link to="/signup" className="hover:underline text-[#f6838b]">
            Signup
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
