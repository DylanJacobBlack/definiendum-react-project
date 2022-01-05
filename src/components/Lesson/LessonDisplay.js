import React, { useRef, useEffect, useState } from "react";

import classes from "./LessonDisplay.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";

const LessonDisplay = (props) => {
  const [lessonPages, setLessonPages] = useState(null);
  const [currentPage, setCurrentPage] = useState(0);
  const canvasRef = useRef();

  const columnWidth = 400;
  const columnHeight = 150;
  const pagePaddingLeft = 10;
  const pagePaddingRight = 10;
  const approxWordsPerPage = 500;
  const lineHeight = 18;

  useEffect(() => {
    if (props.isLoading === false && props.status === "") {
    const pages = [];
    const maxLinesPerPage = parseInt(columnHeight / lineHeight) - 1;
    const x = pagePaddingLeft;
    const y = lineHeight;
    const maxWidth = columnWidth - pagePaddingLeft - pagePaddingRight;

    // # words that have been displayed
    //(used when ordering a new page of words)
    let wordCount = 0;

    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    context.font = "14px verdana";

    const getNextWords = (nextWordIndex) => {
      const textWords = props.text.split(" ");
      const words = textWords.splice(nextWordIndex, approxWordsPerPage);

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
          className={classes.column}
          style={{ height: columnHeight, width: columnWidth }}
          key={`page${i}`}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height={columnHeight}
            width={columnWidth}
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

    setLessonPages(pages);
    }
  }, [props.text, props.isLoading, props.status]);

  const pageBackHandler = (event) => {
    console.log("hello")
    if (currentPage > 0) setCurrentPage(currentPage - 1);
  };

  const pageForwardHandler = (event) => {
    console.log("hello");
    if (currentPage < lessonPages.length -1 ) setCurrentPage(currentPage + 1);
  };

  return (
    <div className={classes.lesson}>
      <canvas ref={canvasRef} className={classes.canvas} />
      <button className={classes.button} onClick={pageBackHandler}>
        <FontAwesomeIcon icon={faChevronLeft} />
      </button>
      <div className={classes.page}>
        {!props.isLoading &&
          props.status === "" &&
          lessonPages !== null &&
          lessonPages[currentPage]}
      </div>
      <button className={classes.button} onClick={pageForwardHandler}>
        <FontAwesomeIcon icon={faChevronRight} />
      </button>
    </div>
  );
};

export default React.memo(LessonDisplay);
