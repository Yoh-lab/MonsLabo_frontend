import { database } from "../firebase/firebase";
import { doc, setDoc } from "firebase/firestore";
import { getAuth } from "firebase/auth";



const HandleSendData = async (data) => {
    
    const auth = getAuth();
    const user = auth.currentUser;
    if (user) {
      console.log(user.uid);
      try {
        // Firestoreにデータを格納
        await setDoc(doc(database, user.uid, (data.monsterId.toString().padStart(3, "0"))), {
          name: data.name,
          gender: data.gender,
          hobby: data.hobby,
          race: data.race,
          age: data.age,
          _logInput: data._logInput,
          _logOutput: data._logOutput,
          num_response: data.num_response,
          image_url: data.image_url
        });
      } catch (error) {
        console.error(
          "Firestoreからのデータ取得時にエラーが発生しました。",
          error
        );
        console.log(error.message);
      }
    } else {
        console.log("サインインしていません。");
    }
  };
  export default HandleSendData;