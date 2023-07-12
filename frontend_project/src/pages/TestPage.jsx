import CircularProgress from "@mui/material/CircularProgress";
import { database } from "../firebase/firebase";
// import {doc, setDoc } from "firebase/firestore";
import { doc, updateDoc } from "firebase/firestore";
import { useState } from "react";
import { Navigate } from "react-router-dom";
import { getAuth } from "firebase/auth";
import { getDoc } from "firebase/firestore";

import HandleGetData from "../components/GetAllMonsterData";
import HandleSendData from "../components/sendNewMonster";
import Uploadimage from "../components/UploadImage";
// import { getStorage, ref, uploadBytes } from "firebase/storage";

const TestPage = () => {
  // function sendData() {
  //     try {
  //         // Firestoreにデータを格納
  //         await database.collection("users").doc("RdeJHrhbb8WrVeQjUserGFT4aA13").collection("users").add({
  //           name :"Name",
  //           gender : "male",
  //           hobby :"hobby",
  //         });.then
  //         // 格納が完了したら以下のコードを実行する

  //         // navigate("/talk", { state: { selectedFile } });
  //       } catch (error) {
  //         console.error("Firestoreへの格納中にエラーが発生しました。", error);
  //       }
  // }

  const [isLoading, setIsLoading] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const [errorMessages, setErrorMessages] = useState("");
  const sendFirestore = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Firestoreにデータを格納
      await updateDoc(doc(database, "uid", "001"), {
        name: "Name",
        gender: "male",
        hobby: "hobby",
        _logInput: { 1: "1だよ", 2: "2だよ", 3: "3だぜ" },
        _logOutput: { 1: "1でkぢあ", 2: "2だあああ", 3: "3aaa" },
      }).then(setIsCompleted(false));
      // 格納が完了したら以下のコードを実行する

      // navigate("/talk", { state: { selectedFile } });
    } catch (error) {
      console.error("Firestoreへの格納中にエラーが発生しました。", error);
      setErrorMessages(error.message);
    }

    setIsLoading(false);
  };

  const getFirestore = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Firestoreにデータを格納
      const docRef = doc(database, "RdeJHrhbb8WrVeQjUserGFT4aA13", "Monster1");
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        console.log("Document data:", docSnap.data());
        // setErrorMessages(docSnap.data());
      } else {
        // docSnap.data() will be undefined in this case
        setErrorMessages("No such document!");
      }
      setIsCompleted(false);
      // 格納が完了したら以下のコードを実行する

      // navigate("/talk", { state: { selectedFile } });
    } catch (error) {
      console.error(
        "Firestoreからのデータ取得時にエラーが発生しました。",
        error
      );
      setErrorMessages(error.message);
    }
    setIsLoading(false);
  };

  //ユーザーIDを取得する関数
  const getUid = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const auth = getAuth();
    const user = auth.currentUser;

    if (user) {
      console.log(user.uid);
      setErrorMessages(user.uid);
      setIsCompleted(false);
    } else {
      setErrorMessages("サインインしていません。");
    }
    setIsLoading(false);
  };

  //   const [userId, setUserId] = useState("");
  const HandleSendtData = async (e) => {
    e.preventDefault();
    const auth = getAuth();
    const user = auth.currentUser;

    if (user) {
      console.log(user.uid);
      try {
        // Firestoreにデータを格納
        await updateDoc(doc(database, user.uid, "Monster1"), {
          name: "Name",
          gender: "male",
          hobby: "hobby",
          rate: "rubbit",
          _logInput: { 1: "1だよ", 2: "2だよ", 3: "3だぜ" },
          _logOutput: { 1: "1でkぢあ", 2: "2だあああ", 3: "3aaa" },
          num_response: 3,
        }).then(setIsCompleted(false));
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

  const inputData  ={
    monsterId: "0",
    name: "test",
    age: "13331",
    gender: "male",
    hobby: "volleyball",
    race: "rabit",
    _logInput: ["よろしくね", "おいのび太、お前はもう死んでいる"],
    _logOutput: ["こんにちは"],
    num_response: "1",
    image_url: "https://firebasestorage.googleapis.com/v0/b/monster-ai.appspot.com/o/monster%2Fmonster1.jpg?alt=media&token=3b7b5b1a-4b0a-4b0a-8b0a-4b0a4b0a4b0a"
  }

  const sendData = async () => {
    await HandleSendData(inputData);
  };

  const getMonsterData = async () => {
    try{
    const getData =   await HandleGetData();
    console.log(getData);
    }catch(error){
        console.log("TestPage.jsxでエラー発生");
      console.log(error);
    }
  };

  const handleUploadImage = async () => {
    await Uploadimage();
  };

  //   //画像をアップする関数
  //   function sendImage() {
  //     // nullチェック
  //     const title = titleTextField.value;
  //     const content = contentTextField.value;
  //     const selectImage = imageView.src;

  //     if (title && content && selectImage) {
  //       // 今日の日付を使用してユニークな名前を生成
  //       const imageName = `${Date.now()}.jpg`;
  //       // 今回は"posts"というフォルダーに画像を保存する
  //       const reference = firebase.storage().ref().child(`posts/${imageName}`);
  //       // 画像データのサイズを調整
  //       const canvas = document.createElement("canvas");
  //       const context = canvas.getContext("2d");
  //       const image = new Image();

  //       image.src = selectImage;
  //       image.onload = function () {
  //         canvas.width = image.width;
  //         canvas.height = image.height;
  //         context.drawImage(image, 0, 0, image.width, image.height);
  //         const imageData = canvas.toDataURL("image/jpeg", 0.8).split(",")[1];

  //         // メタデータを設定
  //         const metadata = { contentType: "image/jpeg" };

  //         // storageへの保存を行う
  //         reference
  //           .putString(imageData, "base64", metadata)
  //           .then(() => {
  //             // storageへの保存が成功した場合はdownloadURLの取得を行う
  //             reference
  //               .getDownloadURL()
  //               .then((url) => {
  //                 // downloadURLの取得が成功した場合
  //                 // 文字列に変換する
  //                 const downloadUrlStr = url;
  //                 // firestoreへの保存を行う
  //                 firebase
  //                   .firestore()
  //                   .collection("posts")
  //                   .add({
  //                     title: title,
  //                     content: content,
  //                     imageURL: downloadUrlStr,
  //                     createdAt: firebase.firestore.FieldValue.serverTimestamp(),
  //                   })
  //                   .then(() => {
  //                     // firestoreへの保存が成功した場合
  //                   })
  //                   .catch((error) => {
  //                     // firestoreへの保存が失敗した場合
  //                   });
  //               })
  //               .catch((error) => {
  //                 // downloadURLの取得が失敗した場合の処理
  //               });
  //           })
  //           .catch((error) => {
  //             // storageの保存が失敗した場合の処理
  //           });
  //       };
  //     }
  //   }

  return (
    <div>
      {isCompleted && <Navigate to="/talk" replace />}
      <button onClick={sendFirestore}>Firestoreに送る</button>
      <button onClick={getFirestore}>Firestoreからデータを受け取る</button>
      <button onClick={HandleSendtData}>データを送る</button>
      <button onClick={sendData}>フォーマット指定でデータを送る</button>
      <button onClick={getMonsterData}>モンスターデータの取得</button>
      {/* <button onClick={sendImage}>Storageに画像を送信</button> */}
      <button onClick={getUid}>ユーザーIDの取得</button>
      <button onClick={getMonsterData}>モンスターデータの取得</button>
      <button onClick={handleUploadImage}>画像のアップロード</button>
      {isLoading && <CircularProgress />}
      {/*グルグルマーク*/} <CircularProgress />
      <h3>{errorMessages}</h3>
    </div>
  );
};

export default TestPage;

// import { useRef, useEffect, useState } from "react";

// const TestPage = () => {
//   const canvasRef = useRef(null); // キャンバスの参照を作成
//   const [isDrawing, setIsDrawing] = useState(false); // 描画中かどうかを管理するステート
//   const [context, setContext] = useState(null); // キャンバスのコンテキストを管理するステート

//   useEffect(() => {
//     const canvas = canvasRef.current;
//     const ctx = canvas.getContext("2d");
//     setContext(ctx); // コンポーネントがマウントされたときにキャンバスのコンテキストを設定
//   }, []);

//   const startDrawing = (event) => {
//     const { offsetX, offsetY } = event.nativeEvent;
//     context.beginPath(); // 描画を開始
//     context.moveTo(offsetX, offsetY); // 描画の開始位置を設定
//     setIsDrawing(true); // 描画中に設定
//   };

//   const draw = (event) => {
//     if (!isDrawing) return;
//     const { offsetX, offsetY } = event.nativeEvent;
//     context.lineTo(offsetX, offsetY); // 現在の位置から指定した位置まで線を引く
//     context.stroke(); // 描画を行う
//   };

//   const stopDrawing = () => {
//     context.closePath(); // 描画を終了
//     setIsDrawing(false); // 描画中を解除
//   };

//   const clearCanvas = () => {
//     context.clearRect(0, 0, context.canvas.width, context.canvas.height); // キャンバスの内容をクリア
//   };

//   return (
//     <div>
//       <canvas
//         ref={canvasRef}
//         onMouseDown={startDrawing}
//         onMouseMove={draw}
//         onMouseUp={stopDrawing}
//         onMouseLeave={stopDrawing}
//       />
//       <button onClick={clearCanvas}>クリア</button>
//     </div>
//   );
// };

// export default TestPage;

// import React, { useState } from 'react';

// const TestPage = () => {
//   const [name, setName] = useState('');
//   const [email, setEmail] = useState('');

//   const handleNameChange = (event) => {
//     setName(event.target.value);
//   };

//   const handleEmailChange = (event) => {
//     setEmail(event.target.value);
//   };

//   const sendFirestore = (event) => {
//     event.preventDefault();
//     // フォームの送信処理などを実行する場合はここに追加します
//     console.log('名前:', name);
//     console.log('メールアドレス:', email);
//   };

//   return (
//     <form onSubmit={sendFirestore}>
//       <div>
//         <label htmlFor="name">名前:</label>
//         <input
//           type="text"
//           id="name"
//           value={name}
//           onChange={handleNameChange}
//         />
//       </div>
//       <div>
//         <label htmlFor="email">メールアドレス:</label>
//         <input
//           type="email"
//           id="email"
//           value={email}
//           onChange={handleEmailChange}
//         />
//       </div>
//       <button type="submit">送信</button>
//     </form>
//   );
// };

// export default TestPage;
