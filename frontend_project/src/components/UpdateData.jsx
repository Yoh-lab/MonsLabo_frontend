import { database } from "../firebase/firebase";
import { doc, updateDoc } from "firebase/firestore";
import { getAuth } from "firebase/auth";



const HandleUpdateData = async (data) => {
    
    const auth = getAuth();
    const user = auth.currentUser;
    if (user) {
      console.log(user.uid);
      try {
        // Firestoreにデータを格納
        await updateDoc(doc(database, user.uid, (data.monsterId)), {
          _logInput: data._logInput,
          _logOutput: data._logOutput,
          num_response: data.num_response,
        });
      } catch (error) {
        console.error(
          "Firestoreへのデータ送信時にエラーが発生しました。",
          error
        );
        console.log(error.message);
      }
    } else {
        console.log("サインインしていません。");
    }
  };
  export default HandleUpdateData;