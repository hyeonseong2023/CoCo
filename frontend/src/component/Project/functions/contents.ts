import { ContentInterface, initialContent } from '../context/PageContext';
import { getTagContent } from './tagList';

export function addContents(
  contents: ContentInterface[],
  index: number,
  content: ContentInterface
): ContentInterface[] {
  if (index === -1) {
    return [content].concat(contents.slice(index + 1));
  }
  return contents
    .slice(0, index + 1)
    .concat(content)
    .concat(contents.slice(index + 1));
}

export function removeContents(
  contents: ContentInterface[],
  index: number
): ContentInterface[] | number[] {
  return contents.slice(0, index).concat(contents.slice(index + 1));
}
