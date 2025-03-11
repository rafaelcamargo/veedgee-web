export function highlightTerm(text, term){
  return text.replace(new RegExp(term, 'gi'), match => `<mark>${match}</mark>`);
}
