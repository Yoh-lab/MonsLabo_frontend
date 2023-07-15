import { useNavigate } from "react-router-dom";
import SettingButton from "../components/SettingButton";
import plant_img from "../assets/plant.png";

const SelectMakePage = () => {
  const navigate = useNavigate();
  const handletoPaintPage = () => {
    // モンスターを作成ボタンがクリックされた時の処理
    navigate("/paint");
  };

  const handleToCheckPage = () => {
    // モンスターと会話ボタンがクリックされた時の処理
    navigate("/make");
  };

  return (
    <div>
      <SettingButton />
      <div
        className="flex flex-col items-center justify-center w-screen h-screen"
        style={{
          backgroundImage: `url(${plant_img})`,
          backgroundSize: "cover",
        }}
      >
        <div className="text-white flex flex-col w-3/5 justify-center items-center gap-5">
          <h2 className="text-7xl mb-2">モンスター作成</h2>
          <h2 className="text-3xl mb-20">作成方法を選択してください</h2>
          <button
            className="w-3/5 m-6 border-2 border-Fuchsia-500 bg-black text-white py-2 hover:bg-gray-700 transition duration-300 focus:border-transparent"
            onClick={handletoPaintPage}
          >
            <h2 className="text-4xl m-2">自分でイラストを描く</h2>
          </button>
            <button
              className="w-3/5 m-6 border-2 border-Fuchsia-500 bg-black text-white py-2 hover:bg-gray-700 transition duration-300 focus:border-transparent"
              onClick={handleToCheckPage}
            >
              <h2 className="text-4xl m-2">既存の画像を使う</h2>
            </button>
        </div>
      </div>
    </div>
  );
};

export default SelectMakePage;
