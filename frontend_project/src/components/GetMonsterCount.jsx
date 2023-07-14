import { database } from "../firebase/firebase";
import { collection } from "firebase/firestore";
import { getDocs } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const GetMonsterCount = async() => {
    const auth = getAuth();
    const user = auth.currentUser;
    if (user) {
      console.log(user.uid);
      try {
        // Firestoreからデータを取得
      //   const docRef = collection(database, String(user.uid));
        const docSnap = await getDocs(collection(database, user.uid));
        let count = 0;
        console.log("モンスターの数を確かめたい。");
        console.log(docSnap.data);
        docSnap.forEach((doc) => {
          // doc.data() is never undefined for query doc snapshots
          console.log(doc.id, " => ", doc.data().name);
          count ++;
        });
        console.log(count);
        // return count;
        if (count == 0) {
          return false;
        }else{
          return true;
        }
  
        // navigate("/talk", { state: { selectedFile } });
      } catch (error) {
        console.error(
          "Firestoreからのデータ取得時にエラーが発生しました。",
          error
        );
        console.log(error.message);
        return false;
      }
    } else {
      console.log("サインインしていません。");
      return false;
    }
  };

export default GetMonsterCount