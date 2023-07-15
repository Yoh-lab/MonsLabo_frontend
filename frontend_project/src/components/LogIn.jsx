import { useEffect, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { auth } from "../firebase/firebase";
import { signInWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
// import { TextField, Button, Box, Typography, Alert } from "@mui/material";
import { TextField, Box, Alert } from "@mui/material";

// LogInコンポーネントの定義
const LogIn = () => {
    const [signInEmail, setSignInEmail] = useState(""); // signInEmailとsetSignInEmailをuseStateフックで定義
    const [signInPassword, setSignInPassword] = useState(""); // signInPasswordとsetSignInPasswordをuseStateフックで定義
    const [error, setError] = useState(null); // errorとsetErrorをuseStateフックで定義
    const [user, setUser] = useState(null); // userとsetUserをuseStateフックで定義

    const handleSubmit = async (event) => {
        // ログインフォームの送信処理
        event.preventDefault();
        try {
            await signInWithEmailAndPassword(auth, signInEmail, signInPassword); // signInWithEmailAndPassword関数を使用してユーザーをログイン
            console.log("[Succeeded] Sign in"); // ログイン成功時にメッセージをコンソールに出力
        } catch (error) {
            setError(
                "ログインに失敗しました。正しいメールアドレスとパスワードを入力してください。"
            ); // エラーメッセージを設定
            setError(null);
            console.error(error); // エラーが発生した場合にエラーメッセージをコンソールに出力
        }
    };

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            // コンポーネントのマウント時に実行される処理
            setUser(currentUser); // onAuthStateChanged関数を使用して認証の状態が変化したときにイベントを購読し、ユーザーステートを更新
        });

        return () => {
            unsubscribe(); // クリーンアップ関数としてunsubscribeを返すことでイベントリスナーの解除を行う
        };
    }, []);

    return (
        <>
            {user ? (
                <Navigate to="/selectMode" replace /> // ユーザーがログインしている場合、Navigateコンポーネントを使用して指定のURLにリダイレクト
            ) : (
                <h2>
                    {/* <Typography component="h1" variant="h3">
                        Sign In
                    </Typography> */}
                    <h2 className="text-6xl mb-6 text-gray-800"> Sign In</h2>
                    <Box
                        component="form"
                        onSubmit={handleSubmit}
                        noValidate
                        sx={{ mt: 1, mx: "auto", maxWidth: 600 }}
                    >
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="Email Address"
                            autoComplete="email"
                            autoFocus
                            value={signInEmail}
                            onChange={(event) =>
                                setSignInEmail(event.target.value)
                            }
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Password"
                            type="password"
                            autoComplete="current-password"
                            value={signInPassword}
                            onChange={(event) =>
                                setSignInPassword(event.target.value)
                            }
                        />
                        <button
                  type="submit"
                  className="mt-4 mb-8 w-full border-2 border-Fuchsia-500 bg-black text-white py-2 hover:bg-gray-700 transition duration-300 focus:border-transparent"
                >
                  Log In
                </button>
                    </Box>
                    {error && (
                        <Alert severity="error" sx={{ mt: 2 }}>
                            {error}
                        </Alert>
                    )}
                    {/* <Typography variant="body2" sx={{ mt: 2 }}>
                        新規ユーザ登録は<Link to="/signup">こちら</Link>
                    </Typography> */}
                    <h2 className="text-1xl mb-2 text-gray-800"> 新規ユーザ登録は<Link to="/signup">こちら</Link></h2>
                </h2>
            )}
        </>
    );
};

export default LogIn;
