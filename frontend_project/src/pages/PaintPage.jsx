import { useRef, useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import SettingButton from "../components/SettingButton";
import plant_img from "../assets/plant.png";
import Eraser from "../assets/Eraser.png";
import Pencil from "../assets/Pencil.png";
import ArrowBack from "../assets/ArrowBack.png";
import ArrowGo from "../assets/ArrowGo.png";

const PaintPage = () => {
  const canvasRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [context, setContext] = useState(null);
  const [penColor, setPenColor] = useState("#000000");
  const [penSize, setPenSize] = useState(1);
  const [previousDrawings, setPreviousDrawings] = useState([]);
  const [redoDrawings, setRedoDrawings] = useState([]);
  const canvasSize = { width: 640, height: 480 };
  const [shouldNavigate, setShouldNavigate] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    canvas.width = canvasSize.width;
    canvas.height = canvasSize.height;
    const ctx = canvas.getContext("2d");
    setContext(ctx);
  }, []);

  const startDrawing = (event) => {
    const { offsetX, offsetY } = event.nativeEvent;
    context.beginPath();
    context.moveTo(offsetX, offsetY);
    setIsDrawing(true);
  };

  const draw = (event) => {
    if (!isDrawing) return;
    const { offsetX, offsetY } = event.nativeEvent;
    context.strokeStyle = penColor;
    context.lineWidth = penSize;
    context.lineTo(offsetX, offsetY);
    context.stroke();
  };

  const stopDrawing = () => {
    context.closePath();
    setIsDrawing(false);
    setPreviousDrawings((drawings) => [
      ...drawings,
      context.getImageData(0, 0, canvasSize.width, canvasSize.height),
    ]);
  };

  const clearCanvas = () => {
    context.clearRect(0, 0, context.canvas.width, context.canvas.height);
    setPreviousDrawings([]);
  };

  const handleColorChange = (event) => {
    setPenColor(event.target.value);
  };

  const handleSizeChange = (event) => {
    setPenSize(Number(event.target.value));
  };

  const undoDrawing = () => {
    if (previousDrawings.length > 0) {
      setRedoDrawings((redo) => [
        ...redo,
        previousDrawings[previousDrawings.length - 1],
      ]);
      setPreviousDrawings((drawings) => drawings.slice(0, -1));
    }
  };

  const redoDrawing = () => {
    if (redoDrawings.length > 0) {
      setPreviousDrawings((drawings) => [
        ...drawings,
        redoDrawings[redoDrawings.length - 1],
      ]);
      setRedoDrawings((redo) => redo.slice(0, -1));
    }
  };

  useEffect(() => {
    if (!context) return;
    context.clearRect(0, 0, context.canvas.width, context.canvas.height);
    previousDrawings.forEach((drawing) => {
      context.putImageData(drawing, 0, 0);
    });
  }, [context, previousDrawings]);

  const eraseDrawing = () => {
    if (context.globalCompositeOperation === "destination-out") {
      // 消しゴムモードからペンモードに戻す
      context.globalCompositeOperation = "source-over";
    } else {
      // ペンモードから消しゴムモードに切り替える
      context.globalCompositeOperation = "destination-out";
    }
  };

  const saveImage = () => {
    const canvas = canvasRef.current;
    const image = canvas.toDataURL("image/png");
    const link = document.createElement("a");
    link.href = image;
    link.download = "my_drawing.png";
    link.click();
    setShouldNavigate(true);
  };

  return (
    <div className="flash_back">
      <SettingButton />
      <div
        className="flex flex-col items-center justify-center w-screen h-screen"
        style={{
          backgroundImage: `url(${plant_img})`,
          backgroundSize: "cover",
          backgroundPosition: "center"
        }}
      >
        {shouldNavigate && <Navigate to="/make" replace />}
        <div className="w-screen h-screen flex justify-center items-center flex-col">
          <div className="back_sheet z-10 relative"></div>
          <div className="flex-col z-20 absolute top-50% left-50%">
            <div className="text-white">
              <h2 className="text-4xl mb-10 ">
                会話するモンスターを描いてください
              </h2>
            </div>
            <div className="gap-32 flex justify-center">
              <div className=" border-2 bg-white">
                <canvas
                  ref={canvasRef}
                  onMouseDown={startDrawing}
                  onMouseMove={draw}
                  onMouseUp={stopDrawing}
                  onMouseLeave={stopDrawing}
                />
              </div>

              <div className="flex flex-col justify-center items-center">
                <h2 className="border-2 border-yellow-400  bg-slate-200 dark:bg-gray-500 w-80 mb-12 flex justify-center gap-8">
                  <div className="flex items-center">
                    <label htmlFor="color" className="mr-2">ペンの色: </label>
                    <input
                      type="color"
                      id="color"
                      value={penColor}
                      onChange={handleColorChange}
                    />
                  </div>

                  <div className=" flex items-center">
                    <label htmlFor="size" className="mr-2">ペンの太さ: </label>
                    <input
                    className="bg-white text-right text-black"
                      type="number"
                      id="size"
                      min="1"
                      max="10"
                      value={penSize}
                      onChange={handleSizeChange}
                    />
                  </div>
                </h2>
                <div className="flex flex-col items-center">
                  <div className="w-44 flex justify-center  ">
                    <button
                      className="flex items-center w-5/5 m-6 border-2 border-yellow-400 bg-black text-white py-2 hover:bg-gray-700 transition duration-300 focus:border-transparent"
                      onClick={eraseDrawing}
                    >
                      <img
                        src={Eraser}
                        alt="Click to Sign Out"
                        className="w-1/5 mr-2"
                      />
                      <h2 className="text-2xl w-36 m-0">消しゴム</h2>
                    </button>
                    <button
                      className="flex items-center w-5/5 m-6 border-2 border-yellow-400 bg-black text-white py-2 hover:bg-gray-700 transition duration-300 focus:border-transparent"
                      onClick={clearCanvas}
                    >
                      <img
                        src={Pencil}
                        alt="Click to Sign Out"
                        className="w-1/5 mr-2"
                      />
                      <h2 className="text-2xl w-36 m-0">クリア</h2>
                    </button>
                  </div>
                  <div className="w-32 flex justify-center">
                    <button
                      className="flex items-center w-5/5 m-6 border-2 border-yellow-400 bg-black text-white py-2 hover:bg-gray-700 transition duration-300 focus:border-transparent"
                      onClick={undoDrawing}
                    >
                      <img
                        src={ArrowBack}
                        alt="Click to Sign Out"
                        className="w-1/5 mr-2"
                      />
                      <h2 className="text-2xl w-36 m-0">1つ戻る</h2>
                    </button>
                    <button
                      className="flex items-center w-5/5 m-6 border-2 border-yellow-400 bg-black text-white py-2 hover:bg-gray-700 transition duration-300 focus:border-transparent"
                      onClick={redoDrawing}
                    >
                      <img
                        src={ArrowGo}
                        alt="Click to Sign Out"
                        className="w-1/5 mr-2"
                      />
                      <h2 className="text-2xl w-36 m-0">1つ進める</h2>
                    </button>
                  </div>

                  {/* <button onClick={() => setShouldNavigate(true)}>作成</button> */}
                </div>
                <div>
                  <button
                    className="mt-24 border-2 border-Fuchsia-500 bg-black text-white py-2 hover:bg-gray-700 transition duration-300 focus:border-transparent"
                    onClick={saveImage}
                  >
                    <h2 className="text-3xl w-64 m-0">保存 ＆ キャラ作成</h2>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaintPage;
