const wikiScreen = document.getElementById('wikiScreen');
const randButton = document.getElementById('randButton');
const prevButton = document.getElementById('prevButton');
const viewWiki = document.getElementById('viewWikiLink');

// buttons for mobile
const randButtonm = document.getElementById('randButtonm');
const prevButtonm = document.getElementById('prevButtonm');
isMobile = false;
prevButton.disabled = true;
prevButtonm.disabled = true;

function checkWidth() {
  if (screen.width <= 700) {
     isMobile = true;
  } else {
    isMobile = false;
  }
}

const pages = [];
let index = 0;
let pageURL = '';

randButton.addEventListener('click', goToPage);
prevButton.addEventListener('click', goToPage);

randButtonm.addEventListener('click', goToPage);
prevButtonm.addEventListener('click', goToPage);

viewWiki.addEventListener('click', () => {
  viewWiki.href = pageURL;
})

async function fetchPages() {
  const URL = "https://en.m.wikipedia.org/w/api.php?action=query&list=random&rnnamespace=0&rnlimit=10&format=json&origin=*";
  const response = await fetch(URL, {mode: 'cors'});
  const pagesData = await response.json();

  pagesData.query.random.forEach(item => {
    pages.push(item.title.replace(/ /g,"_"));
  })
  displayPage(index);
}

function validatePrev() {
  if (index === 0) {
    prevButton.disabled = true;
    prevButtonm.disabled = true;
  }
  else {
    prevButton.disabled = false;
    prevButtonm.disabled = false;
  }
}

function validateRand() {
  if (index === pages.length - 2) {
    fetchPages();
  }
}

function goToPage(e)
{
  currButton = e.target.id;
  validateRand();
  if (currButton === 'prevButton' || currButton === 'prevButtonm') {
    index--;
  }
  if (currButton === 'randButton' || currButton === 'randButtonm') {
    index++;
  }
  validatePrev();
  displayPage(index);
}

function displayPage(pageIndex) {
  if (isMobile) {
    pageURL = `https://en.m.wikipedia.org/wiki/${pages[pageIndex]}`
  } else {
    pageURL = `https://en.wikipedia.org/wiki/${pages[pageIndex]}`
  }
  wikiScreen.src = pageURL;
}

function init() {
  fetchPages();
}

init();

