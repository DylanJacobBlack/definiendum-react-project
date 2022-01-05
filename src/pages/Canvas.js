import React, { useRef, useEffect, useState } from "react";
import classes from "./Canvas.module.css";

const Canvas = (props) => {
  const canvasRef = useRef();
  const [preparedPages, setPreparedPages] = useState();

  const pageWidth = 400;
  const pageHeight = 150;
  const pagePaddingLeft = 10;
  const pagePaddingRight = 10;
  const approxWordsPerPage = 500;
  const lineHeight = 18;

  useEffect(() => {
    const pages = [];
    const maxLinesPerPage = parseInt(pageHeight / lineHeight) - 1;
    const x = pagePaddingLeft;
    const y = lineHeight;
    const maxWidth = pageWidth - pagePaddingLeft - pagePaddingRight;

    // # words that have been displayed
    //(used when ordering a new page of words)
    let wordCount = 0;

    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    context.font = "14px verdana";

    const getNextWords = (nextWordIndex) => {
      // Testing only
      const testingText =
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.";
      const testingWords = testingText.split(" ");
      const words = testingWords.splice(nextWordIndex, approxWordsPerPage);

      //
      return words;
    };

    const textToLines = (words, maxWidth, maxLines, x, y) => {
      const lines = [];

      while (words.length > 0 && lines.length <= maxLines) {
        let line = getLineOfText(words, maxWidth);
        words = words.splice(line.index + 1);
        lines.push(line);
        wordCount += line.index + 1;
      }

      return lines;
    };

    const getLineOfText = (words, maxWidth) => {
      let line = "";
      let space = "";
      for (let i = 0; i < words.length; i++) {
        let testWidth = context.measureText(line + " " + words[i]).width;
        // When tested width is greater than the maxwidth, return an index of one less
        if (testWidth > maxWidth) {
          return { index: i - 1, text: line };
        }
        line += space + words[i];
        space = " ";
      }
      return { index: words.length - 1, text: line };
    };

    const drawSvg = (lines, x, i) => {
      const tspans = [];
      for (let l = 0; l < lines.length; l++) {
        const tspan = (
          <tspan key={`page${i}-line${l}`} x={x} dy={`${lineHeight}px`}>
            {lines[l].text}
          </tspan>
        );
        tspans.push(tspan);
      }
      const sText = (
        <text fontFamily="verdana" fontSize="14px" fill="#000000">
          {tspans}
        </text>
      );

      return (
        <div
          className={classes.page}
          style={{ height: pageHeight, width: pageWidth }}
          key={`page${i}`}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height={pageHeight}
            width={pageWidth}
          >
            {sText}
          </svg>
        </div>
      );
    };

    for (let i = 0; i < 5; i++) {
      console.log(`round ${i}`);
      let lines = textToLines(
        getNextWords(wordCount),
        maxWidth,
        maxLinesPerPage,
        x,
        y
      );
      pages.push(drawSvg(lines, x, i));
    }

    setPreparedPages(pages);
  }, []);

  return (
    <div>
      <canvas ref={canvasRef} className={classes.canvas} />
      {preparedPages}
    </div>
  );
};

export default React.memo(Canvas);
