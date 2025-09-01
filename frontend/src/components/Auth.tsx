import { Link } from "react-router-dom";
import { useState, type ChangeEvent } from "react";
import { type SignupType } from "@varshithsoma/common-app";
export const Auth = ({ type }: { type: "signin" | "signup" }) => {
  const [postInputs, setPostInputs] = useState<SignupType>({
    name: "",
    email: "",
    password: "",
  });
  return (
    <div className="h-screen flex justify-center items-center flex-col">
      <div className="text-4xl font-extrabold mb-2">Create an account</div>
      <div className="mb-10 text-gray-400">
        Already have an Account?{" "}
        <Link to="/signin" className="underline ">
          Login
        </Link>
      </div>

      <div className="w-full max-w-md">
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
      </div>
      <button
        type="button"
        class="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
      ></button>
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
