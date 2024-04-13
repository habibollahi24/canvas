"use client";

import React, { useState } from "react";
import { fabric } from "fabric";

export default function Canvas() {
  const [canvas, setCanvas] = useState<fabric.Canvas>();
  const [text, setText] = useState<string>("");
  const [colorBox, setColor] = useState<string>("#e66465");

  const addBoxCanvas = () => {
    const c = new fabric.Canvas("canvas", {
      height: 400,
      width: 800,
      backgroundColor: "#e66465",
    });

    setCanvas(c);
  };

  const createObject = () => {
    const rect = new fabric.Rect({
      height: 100,
      width: 100,
      fill: "#f2f2f2",
      stroke: "#000",
      selectable: true,
    });
    canvas?.add(rect);
    canvas?.requestRenderAll();
  };

  const createText = () => {
    const textObject = new fabric.Text(text, { selectable: true });
    canvas?.add(textObject);
    canvas?.requestRenderAll();
    setText("");
  };

  const groupFn = () => {
    var sel = new fabric.ActiveSelection(canvas?.getActiveObjects(), {
      canvas: canvas,
    });

    canvas?.getActiveObject()?.toGroup();
  };

  const unGroupFn = () => {
    canvas?.getActiveObject()?.toActiveSelection();
  };

  return (
    <div className="flex flex-col justify-center items-center  gap-4">
      <div className="flex items-center justify-start gap-x-2 ">
        <button
          onClick={addBoxCanvas}
          className="bg-blue-500 cursor-pointer text-white rounded-xl px-4 py-2 active:opacity-50 transition-all disabled:bg-gray-300 disabled:cursor-not-allowed"
          disabled={!!canvas}
        >
          Create Canvas Box
        </button>
        <button
          onClick={createObject}
          className="bg-blue-500 cursor-pointer text-white rounded-xl px-4 py-2 active:opacity-50 transition-all disabled:bg-gray-300 disabled:cursor-not-allowed"
          //   disabled={!!canvas}
        >
          Create Object
        </button>
        <div className="flex border-2 border-blue-500 rounded-2xl p-1">
          <input
            type="text"
            className="border-none focus:outline-none bg-transparent px-4"
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
          <button
            onClick={createText}
            className="bg-blue-500 cursor-pointer text-white rounded-xl px-3 py-1 active:opacity-50 transition-all disabled:bg-gray-300 disabled:cursor-not-allowed"
            disabled={!text.trim()}
          >
            Create Text
          </button>
        </div>
      </div>
      <div className="flex ">
        <div className="rounded-2xl overflow-hidden">
          <canvas id="canvas" />
        </div>
        {canvas && (
          <div className="flex flex-col justify-start items-center gap-y-1  p-1 ">
            <input
              id="colorBox"
              type="color"
              value={colorBox}
              onChange={(e) => {
                setColor(e.target.value);
                canvas.backgroundColor = colorBox;
                canvas.renderAll();
              }}
            />
            <button
              className="bg-blue-500 w-full text-sm cursor-pointer text-white rounded-xl px-2 py-2 active:opacity-50 transition-all disabled:bg-gray-300 disabled:cursor-not-allowed"
              onClick={groupFn}
            >
              group
            </button>
            <button
              className="bg-blue-500 w-full text-sm cursor-pointer text-white rounded-xl px-2 py-2 active:opacity-50 transition-all disabled:bg-gray-300 disabled:cursor-not-allowed"
              onClick={unGroupFn}
            >
              unGroup
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
