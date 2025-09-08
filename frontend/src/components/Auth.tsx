import { Link, useNavigate } from "react-router-dom";
import { useState, type ChangeEvent } from "react";
import type { SignupType } from "@varshithsoma/common-app";
import axios from "axios";
import { BACKEND_URL } from "../config";
export const Auth = ({ type }: { type: "signin" | "signup" }) => {
  const [postInputs, setPostInputs] = useState<SignupType>({
    name: "",
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  async function sendRequest() {
    try {
      console.log("called");
      const response = await axios.post(`${BACKEND_URL}/api/v1/user/${type}`, {
        email: postInputs.email,
        password: postInputs.password,
      });
      console.log(response);
      localStorage.setItem("jwt", response.data);
      navigate("/blogs/");
    } catch {
      alert("failed");
    }
  }
  return (
    <div className="h-screen flex justify-center items-center flex-col">
      <div className="text-4xl font-extrabold mb-2">Create an account</div>
      <div className="mb-10 text-gray-400">
        {type === "signup"
          ? "Already have an Account? "
          : "Don't have an Account? "}
        <Link
          to={type === "signin" ? "/signup" : "/signin"}
          className="underline "
        >
          {type === "signin" ? "Login" : "Signup"}
        </Link>
      </div>
      <div className="w-full max-w-md">
        {type === "signup" ? (
          <LabelInput
            label="Username"
            placeholder="Enter Your Username"
            onChange={(e) => {
              setPostInputs({
                ...postInputs,
                name: e.target.value,
              });
            }}
            type="text"
          />
        ) : null}
        <LabelInput
          label="Email"
          placeholder="Enter Your Email"
          onChange={(e) => {
            setPostInputs({
              ...postInputs,
              email: e.target.value,
            });
          }}
          type="text"
        />
        <LabelInput
          label="Password"
          placeholder="Enter Your Password"
          onChange={(e) => {
            setPostInputs({
              ...postInputs,
              password: e.target.value,
            });
          }}
          type="password"
        />
        <button
          type="button"
          onClick={sendRequest}
          className="mt-7  w-full text-gray-900  font-medium rounded-lg text-sm px-5 py-4 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 "
        >
          {type === "signin" ? "Signin" : "Signup"}
        </button>
      </div>
    </div>
  );
};

interface InputSignup {
  label: string;
  placeholder: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  type: string;
}

const LabelInput = ({ label, placeholder, onChange, type }: InputSignup) => {
  return (
    <div className="mb-6">
      <label className="block mb-2 text-lg font-semibold text-gray-900">
        {label}
      </label>
      <input
        type={type}
        onChange={onChange}
        className="bg-gray-50 border border-gray-300 text-gray-900 text-lg rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-3"
        placeholder={placeholder}
        required
      />
    </div>
  );
};
