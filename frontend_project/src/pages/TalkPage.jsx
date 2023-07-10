import { useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import character_img from "../assets/ドラゴン.png";
import lab_img from "../assets/lab.jpg";

const TalkPage = () => {
  const [formInput, setFormInput] = useState("");
  const [responseData, setResponseData] = useState("");
  const location = useLocation();
  const selectedFile = location.state?.selectedFile || null;

  const handleInputChange = (e) => {
    setFormInput(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      console.log(formInput);
      const response = await axios.post("http://127.0.0.1:5000", {
        data: formInput,
      });

      setResponseData(response.data);
    } catch (error) {
      console.error(error);
      setResponseData("Error: Failed to fetch data from API");
    }
  };

  return (
    <div
      className="flex flex-col items-center w-screen h-screen justify-end"
      style={{ backgroundImage: `url(${lab_img})`, backgroundSize: "cover" }}
    >

      <div className="border-4 bg-white">
        <img src={selectedFile} width="520" height="390" alt="My Drawing" />
      </div>

      <div className="mt-4 w-screen">
        <textarea
          className="w-3/5 h-40 px-4 py-2 border border-gray-300 rounded-lg bg-gradient-to-t from-gray-400 to-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          value={responseData || "No response data available"}
          readOnly // 入力禁止にする
        ></textarea>
      </div>

      <div className="my-12"></div> {/* 余白を追加 */}

      <form className="my-4 flex items-center w-3/5" onSubmit={handleSubmit}>
        <textarea
          className="flex-grow h-10 px-4 py-2 border border-gray-300 rounded mr-4"
          placeholder="Enter your text"
          value={formInput}
          onChange={handleInputChange}
        ></textarea>

        <button
            type="submit"
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 flex items-center"
          >
            <span className="mr-2">送信</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
              />
            </svg>
          </button>
      </form>
    </div>
  );
};

export default TalkPage;
