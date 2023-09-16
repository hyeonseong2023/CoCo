import { ContentInterface, initialContent } from "../context/PageContext";

export function addContents(
  contents: ContentInterface[],
  index: number
): ContentInterface[] {
  return contents
    .slice(0, index + 1)
    .concat(initialContent())
    .concat(contents.slice(index + 1));
}

export function removeContents(
  contents: ContentInterface[],
  index: number
): ContentInterface[] {
  return contents.slice(0, index).concat(contents.slice(index + 1));
}
