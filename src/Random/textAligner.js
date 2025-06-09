/**
 * Question: given an array of paragraphs. task is to align text with line breaks for a given length
 *
 * ex: length 16
 * para = [
 *  ['the' 'quick' 'brown'],
 *  ['fox', 'jumped']
 * ]
 *
 * each row is a paragraph
 * if the character limit exceeds the length, it should break the line from the word
 * the line needs to be centered.
 * if the remaining space is even, properly centered
 * if not one extra space to the right
 * stars do not count for the length
 * paragraphs should start in a new line as well
 *
 *  ***************
 *  * The result  *
 *  *  should be  *
 *  *  like this  *
 *  ***************
 */

const commitLine = (sentence, length) => {
  const numberOfSpaces = (length - sentence.length) / 2;

  return `*${new Array(Math.floor(numberOfSpaces))
    .fill(" ")
    .join("")}${sentence}${new Array(Math.ceil(numberOfSpaces))
      .fill(" ")
      .join("")}*`;
};

const textAligner = (paragraphs, length) => {
  const START_END = new Array(length + 2).fill("*").join("");
  let tempLine = "";
  let lineArr = [];
  let remaining = length;

  lineArr.push(START_END);

  for (let i = 0; i < paragraphs.length; i++) {
    for (let j = 0; j < paragraphs[i].length; j++) {
      const word = paragraphs[i][j];
      const wordLen = word.length;
      if (j === 0) {
        if (tempLine) {
          lineArr.push(commitLine(tempLine, length));
        }
        tempLine = word;
        remaining = length - wordLen;
        continue;
      }

      if (wordLen + 1 <= remaining) {
        remaining -= wordLen + 1;
        tempLine += " " + word;
      } else {
        lineArr.push(commitLine(tempLine, length));
        tempLine = word;
        remaining = length - wordLen;
      }
    }
  }

  lineArr.push(commitLine(tempLine, length));

  lineArr.push(START_END);

  console.log(lineArr);
};

textAligner(
  [
    ["the", "quick", "brown"],
    ["fox", "jumped"],
  ],
  10
);
