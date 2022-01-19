import React, { useRef, useEffect, useState, useCallback } from "react";
import { useResizeDetector } from "react-resize-detector";

import classes from "./LessonDisplay.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import Definition from "./Definition";

const LessonDisplay = (props) => {
  const [lessonPages, setLessonPages] = useState(null);
  const [currentPage, setCurrentPage] = useState(0);
  const [modalSwitch, setModalSwitch] = useState(false);
  const [translation, setTranslation] = useState({
    phrase: "",
    translation: "",
  });
  const [defIsLoading, setDefIsLoading] = useState(false);

  const canvasRef = useRef();

  const pagePaddingLeft = 60;
  const pagePaddingRight = 60;
  const pagePaddingTop = 48;
  const pagePaddingBottom = 48;
  const approxWordsPerPage = 200;
  const lineHeight = 33;

  const wordHandler = useCallback((event) => {
    setDefIsLoading(true);
    setModalSwitch(true);
    const phrase = event.target.textContent
      .trim()
      .replace(/[,./?;':~&%$#@*^|]/g, "");
    (async function () {
      const response = await fetch("https://definiens-api.herokuapp.com/word", {
        method: "POST",
        body: JSON.stringify({
          text: phrase,
          language: "la",
        }),
        headers: { "Content-Type": "application/json" },
      });
      const data = await response.json();
      setTranslation({ phrase: phrase, translation: data.translation });
    })();
    setDefIsLoading(false);
  }, []);

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

  const onResize = useCallback(
    (width, height) => {
      if (props.isLoading === false && props.status === "") {
        const pages = [];
        const columnWidth = width;
        const columnHeight = height - pagePaddingTop - pagePaddingBottom;
        const maxLinesPerPage = parseInt(columnHeight / lineHeight);
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
        // Pushing zeroes allows the textToLines function to detect page breaks
        props.text.split("\n").forEach((para) => {
          if (para) {
            textPara.push(para);
            textPara.push(0);
          } else textPara.push(0);
        });
        const textWords = textPara
          .map((para) => {
            if (para === 0) return 0;
            else return para.split(" ");
          })
          .flat();

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
              return { index: i, text: line + "\u00A0" };
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

        const linesToLinks = (lines) => {
          const linesOfLinks = [];
          let linkedLine = [];
          lines.forEach((line) => {
            line.text.split(" ").forEach((linkedWord) => {
              linkedLine.push(
                <tspan
                  className={classes["linked-word"]}
                  onClick={wordHandler}
                >{`${linkedWord} `}</tspan>
              );
            });
            linesOfLinks.push(linkedLine);
            linkedLine = [];
          });
          return linesOfLinks;
        };

        const drawSvg = (linesOfLinks, x, i) => {
          const tspans = [];
          linesOfLinks.forEach((line, index) => {
            const tspan = (
              <tspan
                key={`page${index}-line${line}`}
                x={x}
                dy={`${lineHeight}px`}
              >
                {line.map((linkedWord) => linkedWord)}
              </tspan>
            );
            tspans.push(tspan);
          });

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
          let linesOfLinks = linesToLinks(lines);
          pages.push(drawSvg(linesOfLinks, x, i));
        }

        setLessonPages(pages);
      }
    },
    [props.text, props.isLoading, props.status, wordHandler]
  );

  const { ref } = useResizeDetector({ onResize });

  const pageBackHandler = (event) => {
    if (currentPage > 0) setCurrentPage(currentPage - 1);
  };

  const pageForwardHandler = (event) => {
    if (currentPage < lessonPages.length - 1) setCurrentPage(currentPage + 1);
  };

  const onHideHandler = () => {
    setTranslation({ phrase: "", translation: "" });
    setModalSwitch(false);
  };

  return (
    <div className={classes.lesson}>
      <canvas ref={canvasRef} className={classes.canvas} />
      {modalSwitch && (
        <Definition
          isLoading={defIsLoading}
          phrase={translation.phrase}
          translation={translation.translation}
          onHide={onHideHandler}
        />
      )}
      <button className={classes.button} onClick={pageBackHandler}>
        <FontAwesomeIcon icon={faChevronLeft} />
      </button>
      <div className={classes.page} ref={ref}>
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
