import { useRef, useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import paint_img from "../assets/paintpic.png";
import Button from '@mui/material/Button';
import SettingButton from "../components/SettingButton";

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
      setRedoDrawings((redo) => [...redo, previousDrawings[previousDrawings.length - 1]]);
      setPreviousDrawings((drawings) => drawings.slice(0, -1));
    }
  };

  const redoDrawing = () => {
    if (redoDrawings.length > 0) {
      setPreviousDrawings((drawings) => [...drawings, redoDrawings[redoDrawings.length - 1]]);
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
    <div>
      <SettingButton />
      <div>
        {shouldNavigate && <Navigate to="/make" replace />}
        <div
          className="bg-blue-400 w-screen h-screen flex flex-col items-center justify-center space-y-5"
          style={{
            backgroundImage: `url(${paint_img})`,
            backgroundSize: "cover",
          }}
        >
          <div className="flex justify-center space-x-10">
            <div className="bg-slate-200 flex items-center">
              <label htmlFor="color">ペンの色:</label>
              <input
                type="color"
                id="color"
                value={penColor}
                onChange={handleColorChange}
              />
            </div>
            <div className="bg-slate-200 flex items-center">
              <label htmlFor="size">ペンの太さ:</label>
              <input
                type="number"
                id="size"
                min="1"
                max="10"
                value={penSize}
                onChange={handleSizeChange}
              />
            </div>
          </div>
          <div className="border-2 bg-white">
            <canvas
              ref={canvasRef}
              onMouseDown={startDrawing}
              onMouseMove={draw}
              onMouseUp={stopDrawing}
              onMouseLeave={stopDrawing}
            />
          </div>
          <div className="flex justify-center space-x-5">
            <button onClick={clearCanvas}>クリア</button>
            <button onClick={undoDrawing}>一つ戻す</button>
            <button onClick={redoDrawing}>一つ進める</button>
            <button onClick={eraseDrawing}>消しゴム</button>
            <button onClick={saveImage}>保存 & キャラ作成</button>
            <Button variant="contained">Outlined</Button>
            {/* <button onClick={() => setShouldNavigate(true)}>作成</button> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaintPage;