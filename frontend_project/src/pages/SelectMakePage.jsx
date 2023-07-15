import { useNavigate } from "react-router-dom";
import SettingButton from "../components/SettingButton";

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
      <div className="flex flex-col items-center justify-center w-screen h-screen">
        <h1 className="text-4xl mb-8">キャラ作成の方法を選択してください</h1>
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-4"
          onClick={handletoPaintPage}
        >
          自分でイラストを描く
        </button>
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={handleToCheckPage}
        >
          既存の画像を使う
        </button>
      </div>
    </div>
  );
};

export default SelectMakePage;
