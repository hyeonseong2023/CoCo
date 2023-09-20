// click한 위치로 caret 이동
function setCaretClick(
  ref: React.RefObject<any>,
  clickPosition: { x: number; y: number }
) {
  // ref.current.focus();
  const editorDiv = ref.current;
  const range = document.createRange();
  const selection = window.getSelection();
  // 클릭한 node에 focus
  range.setStart(editorDiv, 0);
  selection!.removeAllRanges();
  selection!.addRange(range);
  const { node, offset } = getTextNodeAtPosition(
    clickPosition.x,
    clickPosition.y
  );
  selection!.collapse(node, offset);
}

// click한 node와 caret 위치 구하기
const getTextNodeAtPosition = (x: number, y: number) => {
  const range = document.caretRangeFromPoint(x, y);
  const node = range!.startContainer;
  const offset = range!.startOffset;

  return { node, offset };
};
//ref: React.RefObject<any>,
function setCaretPosition(caret: number) {
  const selection = window.getSelection();
  if (!selection) return;
  const r = selection.getRangeAt(0);
  const node = r.startContainer;
  const nodeLength = node.textContent!.length;
  nodeLength < caret
    ? selection.collapse(node, nodeLength)
    : selection.collapse(node, caret);
}

// caret이 속한 node로부터 offset 구하기
function getCaretPosition(): number {
  const selection = window.getSelection();
  return selection!.anchorOffset;
}

// caret의 x좌표, y좌표 구하기
function getCaretPoint() {
  const selection = getSelection();
  const r = selection!.getRangeAt(0);
  let rect;
  let r2;
  const node = r.startContainer;
  const offset = r.startOffset;
  if (offset > 0) {
    r2 = document.createRange();
    r2.setStart(node, offset - 1);
    r2.setEnd(node, offset);
    rect = r2.getBoundingClientRect();
  } else if (offset < node.textContent!.length) {
    r2 = document.createRange();
    r2.setStart(node, offset);
    r2.setEnd(node, offset + 1);
    rect = r2.getBoundingClientRect();
  } else {
    console.log("rect");
    rect = node.parentElement!.getBoundingClientRect();
  }
  return {
    left: rect.left,
    top: rect.top <= 254.8 ? rect.top + 254.8 : rect.top,
  };
}

export { setCaretClick, setCaretPosition, getCaretPosition, getCaretPoint };
