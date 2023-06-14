import { useRef, useEffect } from "react";

export function TextAnimation() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current as any;
    const ctx = canvas.getContext("2d");
    ctx.font = "20px Arial";
    ctx.fillStyle = "#ffffff";

    const xPos = 0;
    let letterIndex = 0;
    const text = "NFT add state!";
    let letterTimer = 0;

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.fillText(text.substring(0, letterIndex), xPos, 100);
      letterTimer += 1;
      if (letterTimer > 5 && letterIndex < text.length) {
        letterTimer = 0;
        letterIndex += 1;
      }
      window.requestAnimationFrame(render);
    };

    render();
  }, []);

  return <canvas ref={canvasRef} height={150} />;
}
