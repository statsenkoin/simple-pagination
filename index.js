// ===== external vars =======================================================
const totalPages = 456; // uncomment to test
const currentPage = 236; // uncomment to test
const pagination = document.querySelector('.pagination'); // uncomment to test
// ===========================================================================

const maxPages = 9; //maximum number of page navigation links to display

showPagination(currentPage, totalPages, pagination); // uncomment to test

/**
 * to export - marking up pagination line
 * @param {Number} currentPage - the current active page
 * @param {Number} totalPages - the total number of pages
 * @param {DOM element} pagination - where to put pagination line
 */
export function showPagination(currentPage, totalPages, pagination) {
  markupPagination(paginate(currentPage, totalPages), pagination);
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
  const offsetPages = Math.floor(maxPages / 2);

  if (currentPage < 1) {
    currentPage = 1;
  } else if (currentPage > totalPages) {
    currentPage = totalPages;
  }

  if (totalPages <= maxPages) {
    startPage = 1;
    endPage = totalPages;
  } else {
    if (currentPage <= offsetPages) {
      startPage = 1;
      endPage = maxPages;
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
  output.splice(0, 1, 1);
  output.splice(output.length - 1, 1, totalPages);

  if (currentPage - 1 > offsetPages && totalPages > maxPages) {
    output.splice(1, 1, '...');
  }
  if (currentPage + 1 + offsetPages < totalPages && totalPages > maxPages)
    output.splice(output.length - 2, 1, '...');

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
  if (totalPages > maxPages) {
    markup =
      `<button type="button" class="pagination-button">&lt;</button>` + markup;
    markup += `<button type="button" class="pagination-button">&gt;</button>`;
  }

  paginationElem.insertAdjacentHTML('beforeend', markup);
}
