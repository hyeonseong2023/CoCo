// 클릭시 마우스 위치로 caret 이동
const setCaretPosition = (
  ref: React.RefObject<any>,
  clickPosition: { x: number; y: number }
) => {
  ref.current.focus();
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
};

// node와 caret 위치 구하기
const getTextNodeAtPosition = (x: number, y: number) => {
  const range = document.caretRangeFromPoint(x, y);
  const node = range!.startContainer;
  const offset = range!.startOffset;

  return { node, offset };
};

export { setCaretPosition };
