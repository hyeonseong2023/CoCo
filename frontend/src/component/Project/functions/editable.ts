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
  let newEditable;
  if (index === -1) {
    newEditable = [true].concat(editable.slice(index + 1));
  } else {
    newEditable = editable
      .slice(0, index + 1)
      .concat(false)
      .concat(editable.slice(index + 1));
    newEditable[index] = false;
    newEditable[index + 1] = true;
  }
  return newEditable;
}

export function removeEditable(editable: boolean[], index: number): boolean[] {
  let newEditable = editable.filter((bool) => !bool);
  newEditable[index - 1] = true;
  return newEditable;
}

export function upwardEditable(editable: boolean[], index: number): boolean[] {
  if (index === 0) return Array(editable.length).fill(false);
  let newEditable = [...editable];
  newEditable[index] = false;
  newEditable[index - 1] = true;
  return newEditable;
}

export function downwardEditable(
  editable: boolean[],
  index: number
): boolean[] {
  let newEditable;
  if (index === -1) {
    newEditable = [...editable];
    newEditable[0] = true;
    return newEditable;
  }
  if (index === editable.length - 1) return editable;
  newEditable = [...editable];
  newEditable[index] = false;
  newEditable[index + 1] = true;
  return newEditable;
}
