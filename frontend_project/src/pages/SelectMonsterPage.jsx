import CircularProgress from "@mui/material/CircularProgress";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import HandleGetData from "../components/GetAllMonsterData";
import SettingButton from "../components/SettingButton";
import green_img from "../assets/green.png";

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
          image_url: getData[selectedId].image_url,
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
    <div className="flash_back">
      <SettingButton />
      <h2 className="text-center w-screen h-screen">
      <div className="flex flex-col items-center w-screen h-screen justify-center"
        style={{ backgroundImage: `url(${green_img})`, backgroundSize: "cover" , backgroundPosition: "center"}}>
            <h2 className="text-4xl mb-8 pt-8 pb-8 text-white">モンスターを選んでください</h2>
            <div className="border-2 border-gray-500 overflow-auto w-5/6 h-2/3">
              <div className="flex flex-row justify-center pt-5 pb-5 flex-wrap gap-5">
              {Object.keys(getData).map((key) => (
                <div key={key} className="flex w-1/6 bg-white flex-col items-center justify-center">
                  <div className="flex flex-grow flex-col items-center justify-center">
                    <img
                      src={getData[key].image_url}
                      className="max-h-36 px-2 py-2"
                      style={{ width: "100%",height: "auto" }}
                    />
                  </div>
                  <div className="pb-2 px-2">
                    <button onClick={() => handleModalOpen(key)}>
                      {getData[key].name}
                    </button>
                  </div>
                </div>
              ))}
              </div>
            </div>
            {showModal && (
              <div className="bg-gray-600 bg-opacity-50 fixed top-0 left-0 w-full h-screen flex justify-center items-center">
                <div className="bg-black p-4 rounded border-2 border-yellow-400">
                  <h3 className="text-xl text-white mb-2">Confirmation Dialog</h3>
                  <p>このモンスターで遊ぶ？</p>
                  <div className="mt-4 flex justify-end">
                    <button
                      onClick={handleModalClose}
                      className="mr-2 bg-black text-white px-4 py-2 rounded"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleRegister}
                      className="bg-black text-white px-4 py-2 rounded"
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
      </h2>
    </div>
  );
};

export default SelectMonsterPage;
