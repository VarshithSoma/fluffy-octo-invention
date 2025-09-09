import { useState } from "react";
import { Appbar } from "../components/Appbar";
import axios from "axios";
import { BACKEND_URL } from "../config";
import { useNavigate } from "react-router-dom";

export const Publish = () => {
  return (
    <div>
      <Appbar />
      <CustomForm />
    </div>
  );
};
const CustomForm = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const navigator = useNavigate();
  return (
    <div className="max-w-6xl w-full mx-auto m-10">
      <input
        onChange={(e) => {
          setTitle(e.target.value);
        }}
        className="block w-full p-4 text-gray-900 border-none focus:outline-none font-extrabold text-lg"
        required
        placeholder="Title"
      />
      <div className="w-full mb-4 border border-gray-200 rounded-lg bg-gray-50 my-10">
        <div className="px-4 py-2 bg-white rounded-b-lg">
          <textarea
            onChange={(e) => {
              setContent(e.target.value);
            }}
            rows={9}
            className="block w-full px-0 text-xl text-gray-800 border-none focus:outline-none focus:ring-0"
            placeholder="Write an article..."
            required
          ></textarea>
        </div>
      </div>
      <button
        type="button"
        onClick={async () => {
          const response = await axios.post(
            `${BACKEND_URL}/api/v1/blog`,
            {
              title,
              content,
            },
            {
              headers: {
                Authorization: `Bearer ${localStorage.getItem("jwt")}`,
              },
            }
          );
          console.log(response);
          navigator(`/blog/${response.data.id}`);
        }}
        className="focus:outline-none text-white bg-green-700 focus:ring-4  font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2"
      >
        Publish Post
      </button>
    </div>
  );
};
