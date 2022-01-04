import { useRef, useEffect } from "react";
import classes from "./Canvas.module.css";

const Canvas = (props) => {
  const canvasRef = useRef();
  const page1 = useRef();
  const page2 = useRef();
  const page3 = useRef();
  console.log(canvasRef);
  console.log(page1);

  useEffect(() => {
    const pageWidth = 250;
    const pageHeight = 150;
    const pagePaddingLeft = 10;
    const pagePaddingRight = 10;
    const approxWordsPerPage = 500;
    const lineHeight = 18;
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
      // Eg: select top 500 word from romeoAndJuliet
      //     where wordIndex>=nextwordIndex
      //     order by wordIndex
      //
      // But here for testing, we just hardcode the entire text
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
      for (var i = 0; i < words.length; i++) {
        let testWidth = context.measureText(line + " " + words[i]).width;
        if (testWidth > maxWidth) {
          return { index: i - 1, text: line };
        }
        line += space + words[i];
        space = " ";
      }
      return { index: words.length - 1, text: line };
    };

    const drawSvg = (lines, x) => {
      const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
      const sText = document.createElementNS(
        "http://www.w3.org/2000/svg",
        "text"
      );
      sText.setAttributeNS(null, "font-family", "verdana");
      sText.setAttributeNS(null, "font-size", "14px");
      sText.setAttributeNS(null, "fill", "#000000");
      for (let i = 0; i < lines.length; i++) {
        const sTSpan = document.createElementNS(
          "http://www.w3.org/2000/svg",
          "tspan"
        );
        sTSpan.setAttributeNS(null, "x", x);
        sTSpan.setAttributeNS(null, "dy", lineHeight + "px");
        sTSpan.appendChild(document.createTextNode(lines[i].text));
        sText.appendChild(sTSpan);
      }
      svg.appendChild(sText);
      console.log(page);
      page.current.append(svg);
    };

    // Test: Page#1

    // get a reference to the page div
    let page = page1;
    // use html canvas to word-wrap this page
    let lines = textToLines(
      getNextWords(wordCount),
      maxWidth,
      maxLinesPerPage,
      x,
      y
    );
    // create svg elements for each line of text on the page
    drawSvg(lines, x);

    // Test: Page#2 (just testing...normally there's only 1 full-screen page)
    page = page2;
    lines = textToLines(
      getNextWords(wordCount),
      maxWidth,
      maxLinesPerPage,
      x,
      y
    );
    drawSvg(lines, x);

    // Test: Page#3 (just testing...normally there's only 1 full-screen page)
    page = page3;
    lines = textToLines(
      getNextWords(wordCount),
      maxWidth,
      maxLinesPerPage,
      x,
      y
    );
    drawSvg(lines, x);
  }, []);

  return (
    <div>
      <canvas ref={canvasRef} />
      <h4>Page 1</h4>
      <div ref={page1} class={classes.page}></div>
      <h4>Page 2</h4>
      <div ref={page2} class={classes.page}></div>
      <h4>Page 3</h4>
      <div ref={page3} class={classes.page}></div>
    </div>
  );
};

export default Canvas;
