import { useState, } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import CircularProgress from "@mui/material/CircularProgress";
// import character_img from "../assets/ドラゴン.png";
import lab_img from "../assets/lab.jpg";
import SettingButton from "../components/SettingButton";
import HandleUpdateData from "../components/UpdateData";

const TalkPage = () => {
  const [formInput, setFormInput] = useState("");
  const [responseData, setResponseData] = useState("");
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  // const selectedFile = location.state?.selectedFile || null;

  const monsterId = location.state?.monsterId || null;
  const name = location.state?.name || null;
  const age = location.state?.age || null;
  const gender = location.state?.gender || null;
  const hobby = location.state?.hobby || null;
  const race = location.state?.race || null;
  const [_logInput, setLogInput] = useState(location.state?._logInput || null);
  const [_logOutput, setLogOutput] = useState(location.state?._logOutput || null);
  const [num_response, setNumResponse] = useState(location.state?.num_response || null);
  const image_url = location.state?.image_url || null;

  const handleInputChange = (e) => {
    console.log(showModal, monsterId, name, age, gender, hobby, race, _logInput, _logOutput, num_response, image_url);
    setFormInput(e.target.value);
  };

  const handleTrainingSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      console.log(formInput);
      const response = await axios.post(
        "https://monslabobackend-production.up.railway.app/response",
        {
          name: String(name),
          age: Number(age),
          sex: String(gender),
          hobby: String(hobby),
          race: String(race),
          input_log: _logInput.concat([formInput]),
          output_log: _logOutput,
          num_response: Number(num_response),
          // name: "",
          // age: 13331,
          // sex: "male",
          // hobby: "volleyball",
          // race: "rabit",
          // input_log: ["よろしくね", "おいのび太、お前はもう死んでいる"],
          // output_log: ["こんにちは"],
          // num_response: 1,
        }
      );
      const NewData = {
        monsterId: monsterId,
        _logInput: _logInput.concat([formInput]),
        _logOutput: _logOutput.concat([response.data]),
        num_response: Number(Number(num_response)+1),
      }
      HandleUpdateData(NewData)
      if (num_response == 4) {
        setShowModal(true)
        console.log("showModal", showModal);
      }else{
        console.log(num_response);
      }
      setNumResponse(Number(num_response) + 1);
      setLogInput(_logInput.concat([formInput]));
      setLogOutput(_logOutput.concat([response.data]));
      setResponseData(response.data);
      setFormInput("");
    } catch (error) {
      console.error(error);
      setResponseData("Error: Failed to fetch data from API");
    }
    setIsLoading(false);
  };


  const handleTalkSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      console.log(formInput);
      const response = await axios.post(
        "",
        {
          name: String(name),
          age: Number(age),
          sex: String(gender),
          hobby: String(hobby),
          race: String(race),
          input_log: _logInput.concat([formInput]),
          output_log: _logOutput,
          new_num_response: Number(num_response),
        }
      );
      const NewData = {
        monsterId: monsterId,
        _logInput: _logInput.concat([formInput]),
        _logOutput: _logOutput.concat([response.data]),
        num_response: Number(Number(num_response)+1),
      }
      HandleUpdateData(NewData)
      setNumResponse(Number(num_response) + 1);
      setLogInput(_logInput.concat([formInput]));
      setLogOutput(_logOutput.concat([response.data]));
      setResponseData(response.data);
      setFormInput("");
    } catch (error) {
      console.error(error);
      setResponseData("Error: Failed to fetch data from API");
    }
    setIsLoading(false);
  };


  const handleModalClose = () => {
    setShowModal(false);
  };


  return (
    <div>
      <SettingButton />
      <div
        className="flex flex-col items-center w-screen h-screen justify-end"
        style={{ backgroundImage: `url(${lab_img})`, backgroundSize: "cover" }}
      >
        <div className="border-4 bg-white">
          <img src={image_url} width="520" height="390" alt="My Drawing" />
        </div>
        <div className="mt-4 w-screen">
          <textarea
            className="w-3/5 h-40 px-4 py-2 border border-gray-300 rounded-lg bg-gradient-to-t from-gray-400 to-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            value={responseData || "No response data available"}
            readOnly // 入力禁止にする
          ></textarea>
        </div>
        <div className="my-12"></div> {/* 余白を追加 */}
        {/* 会話のログが５往復以内なら、育成中の文字を追加 */}
        {num_response<5 ? (
        <h2 className="bg-yellow-200">育成中（{num_response}/5回）</h2>
        ):(<h2 className="bg-purple-200">育成完了</h2>)}
        <form className="my-4 flex items-center w-3/5" onSubmit={isLoading==false ? (num_response<5 ?handleTrainingSubmit : handleTalkSubmit) : null}>
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
            {isLoading && <CircularProgress />}
        </form>
      </div>

      {showModal && (
          <div className="bg-gray-600 bg-opacity-50 fixed top-0 left-0 w-full h-screen flex justify-center items-center">
            <div className="bg-white p-4 rounded">
              <h3 className="text-xl mb-2">育成完了！！</h3>
              <p>モンスターとの会話を楽しんでください！</p>
              <div className="mt-4 flex justify-end">
                <button
                  onClick={handleModalClose}
                  className="bg-blue-500 text-white px-4 py-2 rounded"
                >
                  OK!
                </button>
              </div>
              {isLoading && <CircularProgress />}
            </div>
            {/* <div
              className=" absolute top-0 left-0 w-full h-screen"
              onClick={handleModalClose}
            /> */}
          </div>
        )}
    </div>
  );
};

export default TalkPage;
