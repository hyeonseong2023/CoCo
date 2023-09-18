export function setTrueEditable(editable: boolean[], index: number): boolean[] {
  let newEditable = [...editable];
  newEditable[index] = true;
  return newEditable;
}

export function setFalseEditable(
  editable: boolean[],
  index: number
): boolean[] {
  let newEditable = [...editable];
  newEditable[index] = false;
  return newEditable;
}

export function addEditable(editable: boolean[], index: number): boolean[] {
  let newEditable = editable
    .slice(0, index + 1)
    .concat(false)
    .concat(editable.slice(index + 1));
  newEditable[index] = false;
  newEditable[index + 1] = true;
  return newEditable;
}

export function removeEditable(editable: boolean[], index: number): boolean[] {
  let newEditable = editable.filter((bool) => !bool);
  newEditable[index - 1] = true;
  return newEditable;
}

export function upwardEditable(editable: boolean[], index: number): boolean[] {
  if (index === 0) return editable;
  let newEditable = [...editable];
  newEditable[index] = false;
  newEditable[index - 1] = true;
  return newEditable;
}

export function downwardEditable(
  editable: boolean[],
  index: number
): boolean[] {
  console.log("index", index);
  console.log("length -1", editable.length - 1);

  if (index === editable.length - 1) return editable;
  let newEditable = [...editable];
  newEditable[index] = false;
  newEditable[index + 1] = true;
  return newEditable;
}
