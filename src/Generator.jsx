import { useRef, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import "./styles/Generator.css";

export default function Generator() {
  const [textArr, setTextArr] = useState([]);
  const [text, setText] = useState("");
  const [image, setImage] = useState("");
  const [offsets, setOffsets] = useState({
    selectedText: -1,
    offsetX: 0,
    offsetY: 0,
  });
  const { state } = useLocation();
  const { item } = state;
  const canvasRef = useRef(null);
  let contextRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    setOffsets({
      ...offsets,

      offsetX: canvasRef.current.offsetLeft,
      offsetY: canvasRef.current.offsetTop,
    });
    const context = canvas.getContext("2d");
    contextRef.current = context;
    //Our first draw
    let asp = item.width / item.height;
    canvas.width = 400;
    canvas.height = 400 / asp;
    const meme = new Image();
    meme.setAttribute("crossOrigin", "anonymous");
    meme.src = item.url;
    meme.onload = () => {
      context.drawImage(meme, 0, 0, canvas.width, canvas.height);
      setImage(meme);
    };
  }, []);

  useEffect(() => {
    draw();
  }, [textArr]);

  const addText = () => {
    if (text.length < 1) return;
    var y = textArr.length * 20 + 20;
    // get the text from the input element

    var t = {
      text: text,
      x: 50,
      y: y + 70,
      startX: 0,
      startY: 0,
    };

    // calc the size of this text for hit-testing purposes
    contextRef.current.font = "20px arial";
    t.width = contextRef.current.measureText(t.text).width;
    t.height = 20;

    setTextArr([...textArr, t]);
    draw();
    setText("");
  };

  const handleMouseDown = (e) => {
    e.preventDefault();
    let startX = parseInt(e.clientX - offsets.offsetX);
    let startY = parseInt(e.clientY - offsets.offsetY);
    textArr.map((i, index) => {
      if (textHittest(startX, startY, index)) {
        var text = textArr[index];
        text.startX = startX;
        text.startY = startY;
        return setOffsets({ ...offsets, selectedText: index });
      }
    });
  };
  const handleMouseMove = (e) => {
    if (offsets.selectedText < 0) {
      return;
    }
    e.preventDefault();
    let mouseX = parseInt(e.clientX - offsets.offsetX);
    let mouseY = parseInt(e.clientY - offsets.offsetY);
    var text = textArr[offsets.selectedText];
    var dx = mouseX - text.startX;
    var dy = mouseY - text.startY;
    text.startX = mouseX;
    text.startY = mouseY;
    text.x += dx;
    text.y += dy;

    draw();
  };
  const handleMouseUp = (e) => {
    e.preventDefault();
    setOffsets({ ...offsets, selectedText: -1 });
  };
  function textHittest(x, y, textIndex) {
    var text = textArr[textIndex];
    const isTrue =
      x >= text.x &&
      x <= text.x + text.width &&
      y >= text.y - text.height &&
      y <= text.y;
    return isTrue;
  }

  function handleMouseOut(e) {
    e.preventDefault();
    setOffsets({ ...offsets, selectedText: -1 });
  }
  const draw = () => {
    image &&
      contextRef.current.drawImage(
        image,
        0,
        0,
        canvasRef.current.width,
        canvasRef.current.height
      );

    textArr.length > 0 &&
      textArr.map((i) => {
        contextRef.current.fillText(i.text, i.x, i.y);
        return;
      });
  };
  const download = () => {
    let img = canvasRef.current
      .toDataURL("image/png", 1.0)
      .replace("image/png", "image/octet-stream");
    var link = document.createElement("a");
    link.download = "my-image.png";
    link.href = img;
    link.click();
  };

  const reset = () => {
    setTextArr([]);
  };
  return (
    <div className="generator">
      <div className="generator__container">
        <div className="generator__header">
          <h1 className="home__title">Meme-Generator</h1>
          <a href="/" className="home__link-top">
            back
          </a>
        </div>
        <div className="generator__content">
          <div className="generator__left">
            <canvas
              onMouseDown={handleMouseDown}
              onMouseMove={handleMouseMove}
              onMouseUp={handleMouseUp}
              onMouseOut={handleMouseOut}
              ref={canvasRef}
              className="canvas"
            />
            <div className="generator__btn-container">
              <button onClick={download} className="generator__btn">
                Download
              </button>
            </div>
          </div>
          <div className="generator__right">
            <h3 className="generator__sub-title">Add Text to Meme</h3>
            <label className="generator__label" htmlFor="text1">
              Enter Text
            </label>
            <input
              value={text}
              className="generator__input"
              type="text"
              placeholder="Enter text.."
              onChange={(e) => setText(e.target.value)}
            />
            <button
              onClick={addText}
              className="generator__btn generator__btn--text"
            >
              Add Text
            </button>
            <button
              onClick={reset}
              className="generator__btn generator__btn--text generator__btn--border"
            >
              clear
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
