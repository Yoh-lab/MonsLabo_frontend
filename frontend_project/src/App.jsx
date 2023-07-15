import { useMemo } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import CssBaseline from "@mui/material/CssBaseline";
// import { ThemeProvider, createTheme } from "@mui/material/styles";
// import useMediaQuery from "@mui/material/useMediaQuery";
import "./App.css";
import PaintPage from "./pages/PaintPage";
import MakePage from "./pages/MakePage";
import TalkPage from "./pages/TalkPage";
import HomePage from "./pages/HomePage";
import SignUpPage from "./pages/SignUpPage";
import SelectModePage from "./pages/SelectModePage";
import SelectMonsterPage from "./pages/SelectMonsterPage";
import TestPage from "./pages/TestPage";
import SelectMakePage from "./pages/SelectMakePage";
import ScrollTop from "./components/ScrollTop";
// import TestPage from "./pages/TestPage";

function App() {
  // ユーザーの設定に応じたダークモードの優先設定を取得
  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");

  // useMemoフックを使用してテーマを作成
  const theme = useMemo(
    () =>
      createTheme({
        // パレットのモードをダークモードまたはライトモードに設定
        palette: {
          mode: prefersDarkMode ? "dark" : "light",
          primary: {
            main: "#ed63f2",
            extraDark: "#c06d76",
            dark: "#c76672",
            light: "#ec939d",
            extraLight: "#EBF4FB",
            alpha08: "#0077C714",
          },
          noticeRed: {
            main: "#c06d76",
            dark: "#c8a251",
            light: "#f7d282",
          },
        },
        typography: {
          fontFamily: "Inter, 'Noto Sans JP'",
        },
      }),
    [prefersDarkMode]
  );

  return (
    <div className="App">
      <div className="App flex min-h-screen text-center flex-col items-center justify-center">
        {/* アプリケーション全体のテーマを設定するためにThemeProviderを使用 */}
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <div className="">
            {/* ルーティングを設定するためにBrowserRouterを使用 */}
            <BrowserRouter>
            <ScrollTop />
              <Routes>
                {/* ルートパスに対するルート要素としてSignInPageコンポーネントを設定 */}
                <Route path={`/`} element={<HomePage />} />
                <Route path={`/signUp`} element={<SignUpPage />} />
                <Route path={`/selectMode`} element={<SelectModePage />} />
                <Route path={`/selectMonster`} element={<SelectMonsterPage />} />
                <Route path={`/selectMake`} element={<SelectMakePage />} />
                <Route path={`/paint`} element={<PaintPage />} />
                <Route path={`/make`} element={<MakePage />} />
                <Route path={`/talk`} element={<TalkPage/>} />
                <Route path={`/test`} element={<TestPage/>} />
                {/* <Route path={`/`} element={<TestPage />} /> */}
                {/* /homeパスに対するルート要素としてHomeコンポーネントを設定
                <Route path={`/home`} element={<Test />} /> */}
              </Routes>
            </BrowserRouter>
          </div>
        </ThemeProvider>
      </div>
    </div>
  );
}

export default App;
