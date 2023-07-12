import { storage } from "../firebase/firebase";
import { ref, uploadBytes } from "firebase/storage";

const Uploadimage = async () => {
  try {
    const storageRef = ref(storage, "/assets/my_drawing.png");
    const metadata = {
      contentType: "image/jpeg",
    };
    uploadBytes(storageRef, "./testUpload", metadata);

    // navigate("/talk", { state: { selectedFile } });
  } catch (error) {
    console.error("Firestoreからのデータ取得時にエラーが発生しました。", error);
    console.log(error.message);
  }
};
export default Uploadimage
