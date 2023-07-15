import CircularProgress from "@mui/material/CircularProgress";
import { useNavigate } from "react-router-dom";
import paint_img from "../assets/lab_sample.jpeg";
import { useState, useEffect } from "react";
import GetMonsterCount from "../components/GetMonsterCount";
import SettingButton from "../components/SettingButton";

const SelectModePage = () => {
  const navigate = useNavigate();
  const [getData, setGetData] = useState(null);

  useEffect(() => {
    const fetchDataAndSetData = async () => {
      const data = await GetMonsterCount();
      setGetData(data);
      console.log(data);
    };
    fetchDataAndSetData();
  }, []);

  const handleCreateMonster = () => {
    // モンスターを作成ボタンがクリックされた時の処理
    navigate("/selectMake");
  };

  const handleTalkToMonster = () => {
    // モンスターと会話ボタンがクリックされた時の処理
    navigate("/selectMonster");
  };

  if (getData == null) {
    return (
      <div>
        <div>Loading...</div>
        <CircularProgress />
      </div>
    );
  }
  return (
    
    <div>
      <SettingButton />
      <div
        className="flex flex-col items-center justify-center w-screen h-screen"
        style={{
          backgroundImage: `url(${paint_img})`,
          backgroundSize: "cover",
        }}
      >
        <div className="w-700 h-375 text-white flex flex-col w-3/5 justify-center items-center gap-20 rounded-lg backdrop-filter backdrop-blur-sm bg-opacity-10 bg-green-400 shadow-md border-2 border-white-40 border-b-2 border-r-2">
          <h1 className="text-4xl mb-8">モンスターゲーム</h1>
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-4"
            onClick={handleCreateMonster}
          >
            モンスターを作成
          </button>
          {getData >0 ? (
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              onClick={handleTalkToMonster}
            >
              モンスターと会話
            </button>
          ) : (// １体もモンスターがいない場合はモンスターと会話ボタンを薄くして、クリックできないようにする
            <button
              className="bg-red-200 hover:bg-red-300 text-white font-bold py-2 px-4 rounded"
            >
              モンスターと会話
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default SelectModePage;
