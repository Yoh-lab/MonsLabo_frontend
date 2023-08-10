import { useState } from "react";
import { getAuth } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { storage } from "../firebase/firebase";
import { ref, uploadBytes } from "firebase/storage";
import { getDownloadURL } from "firebase/storage";
// import { database } from "../firebase/firebase";
import CircularProgress from "@mui/material/CircularProgress";
import HandleSendData from "../components/sendNewMonster";
import GetMonsterCount from "../components/GetMonsterCount";
import SettingButton from "../components/SettingButton";
import plant_img from "../assets/plant.png";

const MakePage = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [race, setRace] = useState("");
  const [hobby, setHobby] = useState("");
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();
  const [sendfile, setsendFile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleFileSelect = (event) => {
    const file = event.target.files[0];
    if (file && file.type === "image/png") {
      const reader = new FileReader();
      reader.onload = (e) => {
        setSelectedFile(e.target.result);
      };
      reader.readAsDataURL(file);
    }
    console.log(selectedFile);
    setsendFile(file);
  };

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleAgeChange = (event) => {
    setAge(event.target.value);
  };

  const handleGenderChange = (event) => {
    setGender(event.target.value);
  };

  const handleRaceChange = (event) => {
    setRace(event.target.value);
  };

  const handleHobbyChange = (event) => {
    setHobby(event.target.value);
  };

  const handleModalOpen = (event) => {
    event.preventDefault();
    setShowModal(true);
  };

  const handleModalClose = () => {
    setShowModal(false);
  };

  const handleRegister = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    // モンスターIDを取得する
    const monsterId = await GetMonsterCount();
    const auth = getAuth();
    const user = auth.currentUser;
    // 画像をFirebase Storageにアップロードする
    const storageRef = ref(
      storage,
      user.uid + "/" + monsterId.toString().padStart(3, "0") + ".png"
    );
    try {
      uploadBytes(storageRef, sendfile).then(async () => {
        // 画像のURLを取得する
        const image_url = await getDownloadURL(
          ref(
            storage,
            user.uid + "/" + monsterId.toString().padStart(3, "0") + ".png"
          )
        );
        // Firestoreにデータを格納
        console.log(image_url);
        const inputData = {
          monsterId: monsterId.toString().padStart(3, "0"),
          name: name,
          age: age,
          gender: gender,
          hobby: hobby,
          race: race,
          _logInput: [],
          _logOutput: [],
          num_response: 0,
          image_url: image_url,
        };
        await HandleSendData(inputData);
        try {
          navigate("/talk", {
            state: {
              // selectedFile: selectedFile,
              monsterId: monsterId.toString().padStart(3, "0"),
              name: name,
              age: String(age),
              gender: gender,
              hobby: hobby,
              race: race,
              _logInput: [],
              _logOutput: [],
              num_response: "0",
              image_url: image_url,
            },
          });
        } catch (error) {
          console.log("画像のURL取得時にエラーが発生しました。", error);
          setIsLoading(false);
        }
      });
    } catch (error) {
      console
        .log("画像のアップロード時にエラーが発生しました。", error)
        setIsLoading(false);
    }

  };


  return (

    <div className="flash_back">
      <SettingButton />
        <div
        className="flex flex-col items-center w-screen h-screen justify-end"
        style={{ backgroundImage: `url(${plant_img})`, backgroundSize: "cover" , backgroundPosition: "center"}}
      >
        <div className="back_sheet z-10 relative"></div>
        <h2 className="flex flex-col items-center justify-center z-20 absolute top-50% left-50% ">
          <div className="flex items-center justify-center h-screen w-screen">
            <form onSubmit={handleModalOpen}>
              <h2 className="text-center text-6xl text-white mb-4 pb-2">
              モンスター登録
              </h2>
              <h2 className="text-center text-2xl text-white mb-4 pb-12">
                詳細情報を設定してください。
              </h2>
              <div className="flex items-center gap-16">
                <div className="">
                  <div className="flex justify-center">
                    <div className="mb-4 bg-slate-400">
                      <label htmlFor="file" className="block text-white bg-black border-2 border-gray-200">
                        Select Image (PNG only):
                      </label>
                      <input
                        type="file"
                        id="file"
                        accept="image/png"
                        onChange={handleFileSelect}
                        className="w-full bg-black border-2 border-gray-200"
                        required
                      />
                    </div>
                  </div>
                  <div className="">
                    {selectedFile ? (
                      <div className="flex items-center justify-center bg-white">
                        <img
                          src={selectedFile}
                          alt="Selected"
                          className="max-w-xs h-40 rounded-lg"
                        />
                      </div>
                    ) : (
                      <div className="">
                        <div className="w-full h-40 border-dashed border-2 border-gray-400 flex items-center justify-center">
                          <span className="text-gray-400">No image selected</span>
                        </div>
                      </div>
                    )}
                  </div> 
                </div>
                <div className="">
                  <div className="mb-4 flex">
                    <label htmlFor="name" className="block text-white font-bold pl-4 py-1 pr-5 pl-5 text-lg">
                      名前
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        autoComplete="off"
                        maxLength={8}
                        id="name"
                        value={name}
                        onChange={handleNameChange}
                        className="w-full border-2 border-yellow-300 bg-black text-white pl-4 py-1 pr-12 text-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="例）竜王 (8文字以内)"
                        required
                      />
                    </div>
                  </div>
                  <div className="mb-4 flex">
                    <label htmlFor="age" className="block text-white font-bold pl-4 py-1 pr-5 pl-5 text-lg">
                      年齢
                    </label>
                    <div className="relative">
                      <input
                        type="number"
                        autoComplete="off"
                        maxLength={8}
                        id="age"
                        value={age}
                        onChange={handleAgeChange}
                        className="w-full border-2 border-yellow-300 bg-black text-white pl-4 py-1 pr-12 text-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="例）10"
                        required
                      />
                    </div>
                  </div>
                  <div className="mb-4 flex">
                    <label htmlFor="gender" className="block text-white font-bold pl-4 py-1 pr-5 pl-5 text-lg">
                      性別
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        autoComplete="off"
                        id="gender"
                        value={gender}
                        onChange={handleGenderChange}
                        className="w-full border-2 border-yellow-300 bg-black text-white pl-4 py-1 pr-12 text-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="例）男性"
                        required
                      />
                    </div>
                  </div>
                  <div className="mb-4 flex">
                    <label htmlFor="race" className="block text-white font-bold pl-4 py-1 pr-5 pl-5 text-lg">
                      種族
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        autoComplete="off"
                        id="race"
                        value={race}
                        onChange={handleRaceChange}
                        className="w-full border-2 border-yellow-300 bg-black text-white pl-4 py-1 pr-12 text-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="例）ドラゴン"
                        required
                      />
                    </div>
                  </div>
                  <div className="mb-4 flex">
                    <label htmlFor="hobby" className="block text-white font-bold pl-4 py-1 pr-5 pl-5 text-lg">
                      趣味
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        autoComplete="off"
                        id="hobby"
                        value={hobby}
                        onChange={handleHobbyChange}
                        className="w-full border-2 border-yellow-300 bg-black text-white pl-4 py-1 pr-12 text-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="例）筋トレ"
                        required
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="pt-20">
                <button
                  type="submit"
                  className="w-1/2 border-2 border-Fuchsia-500 bg-black text-white py-2 hover:bg-gray-700 transition duration-300 focus:border-transparent"
                >
                  登録
                </button>
              </div>
            </form>
            {showModal && (
              <div className="bg-white bg-opacity-50 fixed top-0 left-0 w-full h-screen flex justify-center items-center">
                <div className="bg-black text-white p-4 rounded border-2 border-yellow-400">
                  <h3 className="text-xl mb-2">Confirmation Dialog</h3>
                  <p>このモンスターを登録しますか？</p>
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
    </div>
  );
};

export default MakePage;