const { REACT_APP_TITLE: documentTitle } = process.env;

export function setDocumentTitle(newTitle) {
  document.title = `${newTitle} - ${documentTitle}`;
}
