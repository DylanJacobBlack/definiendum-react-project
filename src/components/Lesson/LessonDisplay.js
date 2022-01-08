import React, { useRef, useEffect, useState } from "react";

import classes from "./LessonDisplay.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";

function debounce(fn, ms) {
  let timer;
  return () => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      timer = null;
      fn.apply(this, arguments);
    }, ms);
  };
}

const LessonDisplay = (props) => {
  const [lessonPages, setLessonPages] = useState(null);
  const [currentPage, setCurrentPage] = useState(0);

  const canvasRef = useRef();
  const pageRef = useRef();

  const [dimensions, setDimensions] = useState({});

  const pagePaddingLeft = 60;
  const pagePaddingRight = 75;
  const approxWordsPerPage = 500;
  const lineHeight = 25;

  useEffect(() => {
    if (props.isLoading === false && props.status === "") {
      const pages = [];
      const columnWidth = pageRef.current.clientWidth;
      const columnHeight = pageRef.current.clientHeight;
      console.log(columnHeight);
      console.log(lineHeight);
      const maxLinesPerPage = parseInt((columnHeight + (1.01 ** columnHeight)) / (lineHeight));
      const x = pagePaddingLeft;
      const y = lineHeight;
      const maxWidth = columnWidth - pagePaddingLeft - pagePaddingRight;

      // # words that have been displayed
      //(used when ordering a new page of words)
      let wordCount = 0;

      const canvas = canvasRef.current;
      const context = canvas.getContext("2d");
      context.font = "20px verdana";
      const textPara = [];
      // Pushing zeros allows the textToLines function to detect page breaks
      props.text.split("\n").forEach((para) => {
        if (para) {
          textPara.push(para);
          textPara.push(0);
        } else textPara.push(0);
      });
      const textWords = textPara.map((para) => {
        if (para === 0) return 0
        else return para.split(" ")
      }).flat();

      const getNextWords = (nextWordIndex) => {
        const words = textWords.slice(
          nextWordIndex,
          nextWordIndex + approxWordsPerPage
        );

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
          // Check if "word" value is 0. If it is, line break.
          if (words[i] === 0) {
            return {index: i, text: line }
          }
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
          <text fontFamily="verdana" fontSize="20px" fill="#000000">
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

      for (let i = 0; wordCount !== textWords.length; i++) {
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
  }, [
    props.text,
    props.isLoading,
    props.status,
    dimensions.height,
    dimensions.width,
  ]);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.code === "ArrowLeft" && currentPage > 0) {
        setCurrentPage(currentPage - 1);
      }
      if (event.code === "ArrowRight" && currentPage < lessonPages.length - 1) {
        setCurrentPage(currentPage + 1);
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [currentPage, lessonPages]);

  useEffect(() => {
    const debouncedHandleResize = debounce(function handleResize() {
      setDimensions({
        height: pageRef.current.clientHeight,
        width: pageRef.current.clientWidth,
      });
    }, 100);

    window.addEventListener("resize", debouncedHandleResize);

    return () => {
      window.removeEventListener("resize", debouncedHandleResize);
    };
  });

  const pageBackHandler = (event) => {
    if (currentPage > 0) setCurrentPage(currentPage - 1);
  };

  const pageForwardHandler = (event) => {
    if (currentPage < lessonPages.length - 1) setCurrentPage(currentPage + 1);
  };

  return (
    <div className={classes.lesson}>
      <canvas ref={canvasRef} className={classes.canvas} />
      <button className={classes.button} onClick={pageBackHandler}>
        <FontAwesomeIcon icon={faChevronLeft} />
      </button>
      <div className={classes.page} ref={pageRef}>
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
