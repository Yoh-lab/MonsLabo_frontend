import { useState } from "react";
import { getAuth } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { storage } from "../firebase/firebase";
import { ref, uploadBytes } from "firebase/storage";
import { getDownloadURL } from "firebase/storage";
// import { database } from "../firebase/firebase";
import CircularProgress from "@mui/material/CircularProgress";
import HandleSendData from "../components/sendNewMonster";
import GetMonsterId from "../components/GetMonsterId";

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
    const monsterId = await GetMonsterId();
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
              selectedFile,
              monsterId: String(0),
              name,
              age: String(age),
              gender: gender,
              hobby,
              race,
              _logInput: [],
              _logOutput: [],
              num_response: "0",
              image_url,
            },
          });
        } catch (error) {
          console.log("画像のURL取得時にエラーが発生しました。", error);
        }
      });
    } catch (error) {
      console
        .log("画像のアップロード時にエラーが発生しました。", error)
    }
    setIsLoading(false);

    //await database.collection("RdeJHrhbb8WrVeQjUserGFT4aA13").doc("monster1").add(characterData);

    // navigate("/talk", { state: { selectedFile, monsterId, name, age, gender, hobby, race, num_response, image_url} });
  };

  // const [isLoading, setIsLoading] = useState(false);
  // const handleSubmit = async (e) => {
  //   e.preventDefault();

  //   setIsLoading(true);

  //   try {
  //     // Firestoreにデータを格納
  //     await database.collection("users").doc("RdeJHrhbb8WrVeQjUserGFT4aA13").collection("users").add({
  //       name,
  //       gender,
  //       hobby,
  //     });
  //     // 格納が完了したら以下のコードを実行する
  //     {/*グルグルマーク*/}
  //     <CircularProgress />
  //     // navigate("/talk", { state: { selectedFile } });
  //   } catch (error) {
  //     console.error("Firestoreへの格納中にエラーが発生しました。", error);
  //   }

  //   setIsLoading(false);
  // };

  return (
    <>
      <div className="flex items-center justify-center h-screen w-screen">
        <form onSubmit={handleModalOpen}>
          <h1 className="text-center text-2xl mb-4">
            キャラの情報を登録してください。
          </h1>
          <div className="flex items-center">
            <div className="">
              <div className="flex justify-center">
                <div className="mb-4 bg-slate-400">
                  <label htmlFor="file" className="block">
                    Select Image (PNG only):
                  </label>
                  <input
                    type="file"
                    id="file"
                    accept="image/png"
                    onChange={handleFileSelect}
                    className="w-full"
                  />
                </div>
              </div>
              {selectedFile && (
                <div className="border-4">
                  <img
                    src={selectedFile}
                    alt="Selected"
                    className="max-w-full"
                  />
                </div>
              )}
            </div>
            <div className="">
              <div className="mb-4">
                <label htmlFor="name" className="block">
                  名前
                </label>
                <input
                  type="text"
                  id="name"
                  value={name}
                  onChange={handleNameChange}
                  className="w-full border border-gray-300 rounded px-2 py-1"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="name" className="block">
                  年齢
                </label>
                <input
                  type="text"
                  id="name"
                  value={age}
                  onChange={handleAgeChange}
                  className="w-full border border-gray-300 rounded px-2 py-1"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="gender" className="block">
                  性別
                </label>
                <input
                  type="text"
                  id="gender"
                  value={gender}
                  onChange={handleGenderChange}
                  className="w-full border border-gray-300 rounded px-2 py-1"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="race" className="block">
                  種族
                </label>
                <input
                  type="text"
                  id="race"
                  value={race}
                  onChange={handleRaceChange}
                  className="w-full border border-gray-300 rounded px-2 py-1"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="hobby" className="block">
                  趣味
                </label>
                <input
                  type="text"
                  id="hobby"
                  value={hobby}
                  onChange={handleHobbyChange}
                  className="w-full border border-gray-300 rounded px-2 py-1"
                />
              </div>
            </div>
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white rounded py-2"
          >
            登録
          </button>
        </form>
        {showModal && (
          <div className="bg-gray-600 bg-opacity-50 fixed top-0 left-0 w-full h-screen flex justify-center items-center">
            <div className="bg-white p-4 rounded">
              <h3 className="text-xl mb-2">Confirmation Dialog</h3>
              <p>このキャラクターを登録しますか？</p>
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
    </>
  );
};

export default MakePage;
