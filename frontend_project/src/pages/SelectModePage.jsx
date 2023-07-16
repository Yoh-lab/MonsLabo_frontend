import CircularProgress from "@mui/material/CircularProgress";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import GetMonsterCount from "../components/GetMonsterCount";
import SettingButton from "../components/SettingButton";
import plant_img from "../assets/plant.png";

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
          backgroundImage: `url(${plant_img})`,
          backgroundSize: "cover",
          backgroundPosition: "center"
        }}
      >
        <div className="text-white flex flex-col w-3/5 justify-center items-center gap-5">
          <h2 className="text-7xl mb-2">モード選択</h2>
          <h2 className="text-3xl mb-20">遊び方を選択してください</h2>
          <button
            className="w-3/5 m-6 border-2 border-Fuchsia-500 bg-black text-white py-2 hover:bg-gray-700 transition duration-300 focus:border-transparent"
            onClick={handleCreateMonster}
          >
            <h2 className="text-4xl m-2">モンスターを作成</h2>
          </button>
          {getData > 0 ? (
            <button
              className="w-3/5 m-6 border-2 border-Fuchsia-500 bg-black text-white py-2 hover:bg-gray-700 transition duration-300 focus:border-transparent"
              onClick={handleTalkToMonster}
            >
              <h2 className="text-4xl m-2">作ったモンスターと会話</h2>
            </button>
          ) : (
            // １体もモンスターがいない場合はモンスターと会話ボタンを薄くして、クリックできないようにする
            <button
              className="w-3/5 m-6 border-0 border-Fuchsia-500 bg-gray-400 bg-opacity-40 text-gray-400 text-opacity-50 py-2  transition duration-300"
              onClick={null}
            >
              <h2 className="text-4xl m-2">作ったモンスターと会話</h2>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default SelectModePage;
