export function highlightTerm(text, term){
  const result = {};
  const regex = new RegExp(removeAccents(term), 'gi');
  removeAccents(text).replace(regex, (match, offset) => {
    result.preHighlightedText = text.slice(0, offset);
    result.originalTextMatched = text.slice(offset, offset + match.length);
    result.postHighlightedText = text.slice(offset + match.length);
  });
  return [
    result.preHighlightedText,
    `<mark>${result.originalTextMatched}</mark>`,
    result.postHighlightedText
  ].join('');
}

export function removeAccents(text){
  return text?.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
}
