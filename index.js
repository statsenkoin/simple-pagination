import { updatePagination, getCurrentPage } from './js/custom-pagination';

let totalPages = 100; // uncomment to test
let currentPage = 1; // uncomment to test
const paginationRef = document.querySelector('.pagination'); // uncomment to test
paginationRef.addEventListener('click', onPaginationButtonClick);

console.log('totalPages :>> ', totalPages);
updatePagination(currentPage, totalPages, paginationRef);

function onPaginationButtonClick(event) {
  currentPage = getCurrentPage(event);
  updatePagination(currentPage, totalPages, paginationRef);
  // await fetch('https://...&page=currentPage')
}
