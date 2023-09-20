import { useEffect, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { auth } from "../firebase/firebase";
import {createUserWithEmailAndPassword, onAuthStateChanged} from "firebase/auth";
// import { TextField, Button, Box, Typography, Snackbar } from "@mui/material";
import { TextField, Box, Snackbar } from "@mui/material";
import MuiAlert from "@mui/material/Alert";

const SignUp = () => {
    // ステートの定義
    const [signUpEmail, setSignUpEmail] = useState(""); // ユーザーの登録メールアドレスを管理するステート
    const [signUpPassword, setSignUpPassword] = useState(""); // ユーザーの登録パスワードを管理するステート
    const [user, setUser] = useState(null); // 現在のユーザーを管理するステート
    const [hasError, setHasError] = useState(false); // エラーの有無を管理するステート
    const [errorMessage, setErrorMessage] = useState(""); // エラーメッセージを管理するステート

    // ユーザー登録処理
    const handleSignUp = async (event) => {
        event.preventDefault();
        try {
            // createUserWithEmailAndPassword関数を使用してユーザーを登録
            await createUserWithEmailAndPassword(
                auth,
                signUpEmail,
                signUpPassword
            );
            console.log("[Succeeded] Sign up");
        } catch (error) {
            console.error(error);
            setErrorMessage(error.message); // エラーメッセージを設定
            setHasError(true); // エラーフラグを設定
        }
    };

    // スナックバーを閉じる処理
    const handleSnackbarClose = () => {
        setHasError(false); // エラーフラグをリセット
    };

    // コンポーネントのマウント時に実行される処理
    useEffect(() => {
        // onAuthStateChanged関数を使用して認証の状態が変化したときにイベントを購読
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            // 認証の状態が変化したときにユーザーステートを更新
            setUser(currentUser);
        });

        // クリーンアップ関数としてunsubscribeを返すことでイベントリスナーの解除を行う
        return () => {
            unsubscribe();
        };
    }, []);

    return (
        <>
            {user ? (
                // ユーザーがログインしている場合、Navigateコンポーネントを使用して指定のURLにリダイレクト
                <Navigate to={`/selectMode`} />
            ) : (
                <h2>
                    {/* <Typography component="h1" variant="h3">
                        Sign Up
                    </Typography> */}
                    <h2 className="text-6xl mb-6 text-gray-800"> Sign Up</h2>
                    <Box
                        component="form"
                        onSubmit={handleSignUp}
                        noValidate
                        sx={{ mt: 1, mx: "auto", maxWidth: 600 }}
                    >
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="Email Address"
                            name="email"
                            autoComplete="email"
                            autoFocus
                            onChange={(event) =>
                                setSignUpEmail(event.target.value)
                            }
                        />

                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Password"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                            onChange={(event) =>
                                setSignUpPassword(event.target.value)
                            }
                        />
                        <button
                  type="submit"
                  className="mt-4 mb-8 w-full border-2 border-Fuchsia-500 bg-black text-white py-2 hover:bg-gray-700 transition duration-300 focus:border-transparent"
                >
                  Log Up
                </button>
                    </Box>
                    {/* <Typography variant="body2" sx={{ mt: 2 }}>
                        ログインは<Link to={"/"}>こちら</Link>
                    </Typography> */}
                    <h2 className="text-1xl mb-2 text-gray-800"> ログインは<Link to={"/"}>こちら</Link></h2>
                    <Snackbar
                        open={hasError}
                        autoHideDuration={6000}
                        onClose={handleSnackbarClose}
                    >
                        <MuiAlert
                            onClose={handleSnackbarClose}
                            severity="error"
                            elevation={6}
                            variant="filled"
                        >
                            {errorMessage}
                        </MuiAlert>
                    </Snackbar>
                </h2>
            )}
        </>
    );
};
// SignUpコンポーネントをエクスポート
export default SignUp;
