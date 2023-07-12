import CircularProgress from "@mui/material/CircularProgress";
import { useNavigate } from "react-router-dom";
import { database } from "../firebase/firebase";
import { getAuth } from "firebase/auth";
import { useState } from "react";
import { doc, getDoc } from "firebase/firestore";

const SelectMonsterPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  // const [isCompleted, setIsCompleted] = useState(false);
  const [userId, setUserId] = useState("");
  const [responseMessages, setResponseMessages] = useState("");
  const [errorMessages, setErrorMessages] = useState("");

  const HandleGetData = async (e) => {
    e.preventDefault();
    const auth = getAuth();
    const user = auth.currentUser;

    if (user) {
      console.log(user.uid);
      setResponseMessages(user.uid);
      setUserId(user.uid);


      try {
        // Firestoreにデータを格納
        const docRef = doc(database, user.uid, "Monster1");
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          // setResponseMessages(docSnap.data());
          // console.log("Document data:", docSnap.data());
          console.log(docSnap.data());
          // setErrorMessages(docSnap.data());
        } else {
          // docSnap.data() will be undefined in this case
          setErrorMessages("No such document!");
        }
        // navigate("/talk", { state: { selectedFile } });
      } catch (error) {
        console.error(
          "Firestoreからのデータ取得時にエラーが発生しました。",
          error
        );
        setErrorMessages(error.message);
      }
    } else {
      setErrorMessages("サインインしていません。");
    }
    setIsLoading(false);
  };

  // const getFirestore = async () => {
  //   console.log("test Log");
  //   setIsLoading(true);

  //   try {
  //     // Firestoreにデータを格納
  //     const docRef = doc(database, userId);
  //     const docSnap = await getDoc(docRef);
  //     console.log("Document data:");
  //     if (docSnap.exists()) {
  //       console.log("Document data:");
  //       console.log(docSnap.data());
  //       // setErrorMessages(docSnap.data());
  //     } else {
  //       // docSnap.data() will be undefined in this case
  //       setErrorMessages("No such document!");
  //     }
  //     // navigate("/talk", { state: { selectedFile } });
  //   } catch (error) {
  //     console.error(
  //       "Firestoreからのデータ取得時にエラーが発生しました。",
  //       error
  //     );
  //     setErrorMessages(error.message);
  //   }
  //   setIsLoading(false);
  // };



  const navigate = useNavigate();
  const handleToTalk = () => {
    // モンスターを作成ボタンがクリックされた時の処理
    navigate("/talk");
  };

  const handleToSelectMode = () => {
    // モンスターと会話ボタンがクリックされた時の処理
    navigate("/selectMode");
  };

  return (
    <div className="flex flex-col items-center justify-center w-screen h-screen">
      <h1 className="text-4xl mb-8">モンスターを選んでください</h1>
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
      <button onClick={HandleGetData}>Firestoreからデータを受け取る</button>
      <h1>{userId}</h1>
      <h1>{errorMessages}</h1>
      <h1>{responseMessages}</h1>
      {isLoading && <CircularProgress />}
    </div>
  );
};

export default SelectMonsterPage;
