// https://jasonwatmore.com/post/2018/08/07/javascript-pure-pagination-logic-in-vanilla-js-typescript

// ===== first part of internal code ========================================

// min-width: 600px - to meet old 8.34% tablets
let media = window.matchMedia('(min-width: 600px)');
media.addEventListener('change', (event) => {
  pagiLength = event.matches ? 9 : 5;
  updatePagination(currentPage, totalPages, paginationRef);
});

//pagiLength - maximum number of page navigation links to display
// (does NOT include arrows)
let pagiLength = media.matches ? 9 : 5;
// let pagiLength = 9;
let output;
let targetPage;
let currentPage = 1;
let totalPages;
let paginationElem;

// ===== end first part of internal code =====================================

// ===== external code =======================================================

// let totalPages = 100; // uncomment to test
// let currentPage = 1; // uncomment to test
// const paginationRef = document.querySelector('.pagination'); // uncomment to test
// paginationRef.addEventListener('click', onPaginationButtonClick);

// updatePagination(currentPage, totalPages, paginationRef);

// function onPaginationButtonClick(event) {
//   currentPage = getCurrentPage(event);
//   updatePagination(currentPage, totalPages, paginationRef);
//   // await fetch('https://...&page=currentPage')
// }
// ===== end of external code ================================================

// ===== second part of internal code ========================================

/**
 * to export - marking up pagination line
 * @param {Number} page - the current active page
 * @param {Number} pages - the total number of pages
 * @param {DOM element} paginationRef - where to put pagination line
 */
export function updatePagination(page, pages, paginationRef) {
  console.log('page :>> ', page);

  paginationElem = paginationRef;
  currentPage = page;
  totalPages = pages;
  output = paginate(currentPage, totalPages);
  markupPagination(output, paginationElem);
}

/**
 *
 * @param {event} event click on button element
 * @returns currentPage
 */
export function getCurrentPage(event) {
  if (event.target.nodeName !== 'BUTTON') return currentPage;
  const targetPageText = event.target.textContent;

  if (!isNaN(Number(targetPageText))) targetPage = Number(targetPageText);
  if (targetPageText === '>' && currentPage === totalPages) return totalPages;
  if (targetPageText === '>') targetPage = currentPage + 1;
  if (targetPageText === '<' && currentPage === 1) return 1;
  if (targetPageText === '<') targetPage = currentPage - 1;
  if (targetPageText === ' ...') targetPage = currentPage - (pagiLength - 4);
  if (targetPageText === '... ') targetPage = currentPage + (pagiLength - 4);
  if (targetPage === currentPage) return currentPage;
  currentPage = targetPage;
  return currentPage;
}

/**
 *
 * @param {Number} currentPage - the current active page
 * @param {Number} totalPages - the total number of pages
 * @returns {Array} of text content for buttons in pagination line
 */
function paginate(currentPage, totalPages) {
  const output = [];
  let startPage;
  let endPage;
  const offsetPages = Math.floor(pagiLength / 2);

  if (currentPage < 1) {
    currentPage = 1;
  } else if (currentPage > totalPages) {
    currentPage = totalPages;
  }

  if (totalPages <= pagiLength) {
    startPage = 1;
    endPage = totalPages;
  } else {
    if (currentPage <= offsetPages) {
      startPage = 1;
      endPage = pagiLength;
    } else if (currentPage + offsetPages >= totalPages) {
      startPage = totalPages - offsetPages * 2;
      endPage = totalPages;
    } else {
      startPage = currentPage - offsetPages;
      endPage = currentPage + offsetPages;
    }
  }
  for (let i = startPage; i <= endPage; i += 1) {
    output.push(i);
  }

  if (pagiLength === 9) {
    output.splice(0, 1, 1);
    output.splice(output.length - 1, 1, totalPages);

    if (currentPage - 1 > offsetPages && totalPages > pagiLength) {
      output.splice(1, 1, ' ...');
    }
    if (currentPage + 1 + offsetPages < totalPages && totalPages > pagiLength)
      output.splice(output.length - 2, 1, '... ');
  }
  return output;
}

/**
 * marking up pagination line
 * @param {Array} output - text content for buttons in pagination line output
 * @param {DOM element} paginationElem - where to put pagination line
 */
function markupPagination(output, paginationElem) {
  let markup = output.reduce((acc, item) => {
    const pagiClass =
      item === currentPage
        ? 'class="pagination-button pagination-button-current"'
        : 'class="pagination-button"';
    return (acc += `<button type="button" ${pagiClass}>${item}</button>`);
  }, ``);
  if (totalPages > pagiLength && currentPage !== 1) {
    markup =
      `<button type="button" class="pagination-button">&lt;</button>` + markup;
  }
  if (totalPages > pagiLength && currentPage !== totalPages) {
    markup += `<button type="button" class="pagination-button">&gt;</button>`;
  }

  paginationElem.innerHTML = '';
  paginationElem.insertAdjacentHTML('beforeend', markup);
}
