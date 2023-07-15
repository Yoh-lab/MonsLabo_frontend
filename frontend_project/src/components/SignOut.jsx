import { useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../firebase/firebase";
// import Button from "@mui/material/Button";
import Image from "../assets/LogOutIcon.png";

const SignOut = () => {
    const navigate = useNavigate(); // useNavigateフックを使用してnavigate関数を取得
    const handleClickSignOut = async () => {
        // ログアウトボタンのクリックハンドラ
        try {
            await signOut(auth); // authオブジェクトを使用してログアウトを試行
            console.log("[Succeeded] Sign out"); // ログアウト成功時にメッセージをコンソールに出力
            navigate("/"); // ログアウト後にルートページに遷移
        } catch (error) {
            console.error(error); // エラーが発生した場合にエラーメッセージをコンソールに出力
        }
    };

    return (
        // <Button
        //     type="submit"
        //     fullWidth
        //     variant="contained"
        //     sx={{ mt: 3, mb: 3 }}
        //     onClick={handleClickSignOut} // ログアウトボタンがクリックされたときにhandleClickSignOut関数を実行
        // >
        //     Sign Out
        // </Button>
      <img
        src={Image}
        alt="Click to Sign Out"
        className="w-16 h-16 cursor-pointer"
        onClick={handleClickSignOut}
      />
    );
};

export default SignOut;