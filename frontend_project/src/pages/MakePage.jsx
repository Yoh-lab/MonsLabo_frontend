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
import axios from "axios";

const MakePage = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [race, setRace] = useState("");
  const [hobby, setHobby] = useState("");
  const [showRegisterModal, setShowRegisterModal] = useState(false);
  const [showGenerateModal, setShowGenerateModal] = useState(false);
  const navigate = useNavigate();
  const [sendfile, setsendFile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedButton, setSelectedButton] = useState("");

  const handleFileSelect = (event) => {
    const file = event.target.files[0];
    if (file && file.type === "image/png") {
      const reader = new FileReader();
      reader.onload = (e) => {
        setSelectedFile(e.target.result);
      };
      reader.readAsDataURL(file);
    }
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

  const handleSubmitButtonAction = (event) => {
    if (selectedButton === "register") {
      handleRegisterModalOpen(event);
    } else if (selectedButton === "generate") {
      handleGenerateModalOpen(event);
    }
  };

  const handleRegisterModalOpen = (event) => {
    event.preventDefault();
    setShowRegisterModal(true);
  };

  const handleRegisterModalClose = () => {
    setShowRegisterModal(false);
  };

  const handleGenerateModalOpen = (event) => {
    event.preventDefault();
    setShowGenerateModal(true);
  };

  const handleGenerateModalClose = () => {
    setShowGenerateModal(false);
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
      console.log("画像のアップロード時にエラーが発生しました。", error);
      setIsLoading(false);
    }
  };

  const handleGenerateImage = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    try {
      console.log(selectedFile);
      const response = await axios.post(
        "https://monslabobackend-production.up.railway.ap~~~~",
        {
          image: selectedFile,
          name: String(name),
          age: Number(age),
          sex: String(gender),
          hobby: String(hobby),
          race: String(race),
        }
      );
      const NewData = {
        num_response: Number(Number(num_response) + 1),
      };
      setResponseImage(response.data);
    } catch (error) {
      console.error(error);
      setResponseData("Error: Failed to fetch data from API");
    }
    setIsLoading(false);
  };

  return (
    <div>
      <SettingButton />
      <div
        className="flex flex-col items-center w-screen h-screen justify-end"
        style={{
          backgroundImage: `url(${plant_img})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <h2 className="text-center">
          <div className="flex items-center justify-center h-screen w-screen">
            <form onSubmit={handleSubmitButtonAction}>
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
                      <label
                        htmlFor="file"
                        className="block text-white bg-black border-2 border-gray-200"
                      >
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
                          <span className="text-gray-400">
                            No image selected
                          </span>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
                <div className="">
                  <div className="mb-4 flex">
                    <label
                      htmlFor="name"
                      className="block text-white font-bold pl-4 py-1 pr-5 pl-5 text-lg"
                    >
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
                    <label
                      htmlFor="age"
                      className="block text-white font-bold pl-4 py-1 pr-5 pl-5 text-lg"
                    >
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
                    <label
                      htmlFor="gender"
                      className="block text-white font-bold pl-4 py-1 pr-5 pl-5 text-lg"
                    >
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
                        placeholder="例）性別"
                        required
                      />
                    </div>
                  </div>
                  <div className="mb-4 flex">
                    <label
                      htmlFor="race"
                      className="block text-white font-bold pl-4 py-1 pr-5 pl-5 text-lg"
                    >
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
                    <label
                      htmlFor="hobby"
                      className="block text-white font-bold pl-4 py-1 pr-5 pl-5 text-lg"
                    >
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
              <div className="pt-20 flex justify-center space-x-4">
                <button
                  type="submit"
                  onClick={() => setSelectedButton("register")}
                  className="w-1/2 border-2 border-Fuchsia-500 bg-black text-white py-2 hover:bg-gray-700 transition duration-300 focus:border-transparent"
                >
                  そのまま登録
                </button>
                <button
                  type="submit"
                  onClick={() => setSelectedButton("generate")}
                  className="w-1/2 border-2 border-Fuchsia-500 bg-black text-white py-2 hover:bg-gray-700 transition duration-300 focus:border-transparent"
                >
                  AIで画像生成
                </button>
              </div>
            </form>
            {showRegisterModal && (
              <div className="bg-white bg-opacity-50 fixed top-0 left-0 w-full h-screen flex justify-center items-center">
                <div className="bg-black text-white p-4 rounded border-2 border-yellow-400">
                  <h3 className="text-xl mb-2">Confirmation Dialog</h3>
                  <p>このキャラクターを登録しますか？</p>
                  <div className="mt-4 flex justify-end">
                    <button
                      onClick={handleRegisterModalClose}
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
                  onClick={handleRegisterModalClose}
                /> */}
              </div>
            )}
            {showGenerateModal && (
              <div className="bg-white bg-opacity-50 fixed w-screen h-screen flex justify-center items-center">
                <div className="bg-black w-3/4 h-3/4  text-white p-4 rounded border-2 border-yellow-400">
                  {selectedFile ? ( //ここはAPIからの返答を受け取って画像を表示する。
                    <div className="h-full flex-col">
                      <div className="h-1/4">
                        <h3 className="text-3xl m-2">Confirmation Dialog</h3>
                        <p className="text-4xl p-6">この画像で登録しますか？</p>
                      </div>
                      <div className="h-2/4">
                        <img src={selectedFile} alt="Selected" className="max-w-1/2" />
                      </div>
                      <div className=" h-1/4">
                        <button
                          onClick={null} //ここで画像生成ようのAPIを叩く
                          className="mt-4 bg-black text-white px-4 py-2 rounded"
                        >
                          もう一度生成する
                        </button>
                        <div className="mt-4 flex justify-around">
                          <button
                            onClick={handleGenerateModalClose}
                            className="mr-2 bg-black text-white px-4 py-2 rounded"
                          >
                            Cancel
                          </button>
                          <button
                            onClick={null} //ここで画像生成ようのAPIを叩く
                            className="bg-black text-white px-4 py-2 rounded"
                          >
                            OK!
                          </button>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="h-full  flex-col">
                      <div className="bg-green-500 h-4/5 flex items-center justify-center">
                        <div className="">
                          <CircularProgress />
                        </div>
                      </div>
                      <div className="bg-blue-500 h-1/5">
                        <button
                          onClick={handleGenerateModalClose}
                          className="bg-black text-white px-4 py-2 rounded"
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </h2>
      </div>
    </div>
  );
};

export default MakePage;
