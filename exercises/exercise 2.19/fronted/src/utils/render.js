const clearPage = () => {
  const main = document.querySelector('main');
  main.innerHTML = '';
};

const renderPageTitle = (title) => {
  if (!title) return;
  const main = document.querySelector('main');
  const pageTitle = document.createElement('h4');
  pageTitle.innerText = title;
  pageTitle.style.textAlign = 'center';
  pageTitle.style.color = 'orange';
  pageTitle.style.paddingBottom = '30px';
  pageTitle.style.paddingTop = '30px';
  main.appendChild(pageTitle);
};

export { clearPage, renderPageTitle };
