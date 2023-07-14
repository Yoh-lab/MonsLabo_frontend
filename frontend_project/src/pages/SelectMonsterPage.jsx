import CircularProgress from "@mui/material/CircularProgress";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import HandleGetData from "../components/GetAllMonsterData";

const SelectMonsterPage = () => {
  const [getData, setGetData] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchDataAndSetData = async () => {
      const data = await HandleGetData();
      setGetData(data);
      console.log(data);
    };
    fetchDataAndSetData();
  }, []);

  const navigate = useNavigate();
  const handleToTalk = () => {
    // モンスターを作成ボタンがクリックされた時の処理
    navigate("/talk");
  };

  const handleToSelectMode = () => {
    // モンスターと会話ボタンがクリックされた時の処理
    navigate("/selectMode");
  };

  
  const [selectedId, setSelectedId] = useState(null);
    const handleModalOpen = (id) => {
    setSelectedId(id);
    console.log(id);
    setShowModal(true);
  };

  const handleModalClose = () => {
    setShowModal(false);
  };
  const handleRegister = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    try {
      navigate("/talk", {
        state: {
          // selectedFile: getData[selectedId].image_url,
          monsterId: selectedId.toString().padStart(3, "0"),
          name: getData[selectedId].name,
          age: String(getData[selectedId].age),
          gender: getData[selectedId].gender,
          hobby: getData[selectedId].hobby,
          race: getData[selectedId].race,
          _logInput: getData[selectedId]._logInput,
          _logOutput: getData[selectedId]._logOutput,
          num_response: String(getData[selectedId].num_response),
          image_url: getData[selectedId].image_url
        },
      });
    } catch (error) {
      console.log("画像のURL取得時にエラーが発生しました。", error);
    }
    setIsLoading(false);
  };

  if (!getData) {
    return (
      <div>
        <div>Loading...</div>
        <CircularProgress />
      </div>
    );
  }
  return (
    <div className="flex flex-col items-center justify-center w-screen h-screen">
      <h1 className="text-4xl mb-8">モンスターを選んでください</h1>
      <div className="flex justify-center">
        {Object.keys(getData).map((key) => (
          <div key={key} className="">
            <img
              src={getData[key].image_url}
              alt=""
              style={{ width: "200px", height: "auto" }}
            />
            <button onClick={() => handleModalOpen(key)}>{getData[key].name}</button>
          </div>
        ))}
      </div>
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-4"
        onClick={handleToTalk}
      >
        このモンスターで遊ぶ
      </button>
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        onClick={handleToSelectMode}
      >
        戻る
      </button>

      {showModal && (
        <div className="bg-gray-600 bg-opacity-50 fixed top-0 left-0 w-full h-screen flex justify-center items-center">
          <div className="bg-white p-4 rounded">
            <h3 className="text-xl mb-2">Confirmation Dialog</h3>
            <p>このモンスターで遊ぶ？</p>
            <div className="mt-4 flex justify-end">
              <button
                onClick={handleModalClose}
                className="mr-2 bg-gray-500 text-white px-4 py-2 rounded"
              >
                Cancel
              </button>
              <button
                onClick={handleRegister}
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

export default SelectMonsterPage;
