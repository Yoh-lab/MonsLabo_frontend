import { database } from "../firebase/firebase";
import { collection } from "firebase/firestore";
import { getDocs } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const HandleGetData = async () => {
  const auth = getAuth();
  const user = auth.currentUser;
  if (user) {
    console.log(user.uid);
    try {
      // Firestoreからデータを取得
    //   const docRef = collection(database, String(user.uid));
      const docSnap = await getDocs(collection(database, user.uid));
      console.log("モンスターの数を確かめたい。");
      console.log(docSnap.length);
      docSnap.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        console.log(doc.id, " => ", doc.data().name);
      });

      // navigate("/talk", { state: { selectedFile } });
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
export default HandleGetData;
