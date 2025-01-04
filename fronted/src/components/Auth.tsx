import { SignupInput } from "@deepansh/medium-common";
import { ChangeEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { BU } from "../config";
import axios  from "axios";

export const Auth = ({ type }: { type: "signup" | "signin" }) => {
  const [inputs, setInputs] = useState<SignupInput>({
    email: "",
    password: "",
    name: "",
  });
const navigate=useNavigate();
  const handleInputChange = (field: keyof SignupInput) => (e: ChangeEvent<HTMLInputElement>) => {
    setInputs({
      ...inputs,
      [field]: e.target.value,
    });
  };

  async function sendRequest(){
  try{  const response=await axios.post(`${BU}/api/v1/user/${type=="signup"?"signup":"signin"}`,inputs);
    const jwt=response.data.token;
    localStorage.setItem("Authorization", "Bearer "+jwt);
    navigate("/blogs");
}catch(e){
    alert("bad request");
}
  }

  return (
    <div className="h-screen flex flex-col justify-center items-center bg-gray-100">
      {/* Title */}
      <div className="text-2xl font-extrabold mt-4">
        {type === "signup" ? "Create an Account" : "Sign in to Your Account"}
      </div>

      {/* Subtext */}
      <div className="text-gray-500 mt-2">
        {type === "signup" ? (
          <>
            Already have an account?
            <Link className="px-1 underline" to="/signin">
              Login
            </Link>
          </>
        ) : (
          <>
            Don't have an account?
            <Link className="px-1 underline" to="/signup">
              Sign Up
            </Link>
          </>
        )}
      </div>

      {/* Form */}
      <div className="w-80 mt-6 space-y-4">
        {type === "signup" && (
          <LabelInput
            label="Name"
            placeholder="Enter your full name"
            onChange={handleInputChange("name")}
          />
        )}
        <LabelInput
          label="Email"
          type={"email"}
          placeholder="Enter your email"
          onChange={handleInputChange("email")}
        />
        <LabelInput
          label="Password"
          type={"password"}
          placeholder="Enter your password"
          onChange={handleInputChange("password")}
        />
        <button
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold  py-2 px-4 rounded w-full"
          onClick={sendRequest}
        >
          {type === "signup" ? "Sign Up" : "Sign In"}
        </button>
      </div>
    </div>
  );
};

interface LabelInputProps {
  label: string;
  placeholder: string;
  type?: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

const LabelInput = ({ label, placeholder, onChange ,type }: LabelInputProps) => {
  return (
    <div>
      <label className="block mb-2 text-sm font-medium text-gray-900">
        {label}
      </label>
      <input
        onChange={onChange}
        type={type}
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
        placeholder={placeholder}
        required
      />
    </div>
  );
};
