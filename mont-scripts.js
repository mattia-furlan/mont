
const NAV_SEC_SYMBOL_OPEN ='☰';
const NAV_SEC_SYMBOL_CLOSED ='✕';
window.addEventListener('beforeunload', () => {
  var scrollPositionNav = document.querySelector('#sidenav').scrollTop;
  localStorage.setItem('scrollPositionNav', scrollPositionNav);

  var sections = document.getElementsByClassName('nav-section');
  for (var i = 0; i < sections.length; i++) {
   const section = sections[i];
   const sectionTitle = section.querySelector('.nav-section-title .text').innerText;
   const isSectionOpened = isSectionOpen(section);
   localStorage.setItem('section-' + sectionTitle, isSectionOpened);
   console.log("Setting " + 'section-' + sectionTitle + ' to ' + isSectionOpened);
  }
  
  var searchFilter = document.getElementById('inputSearchBar').value;
  localStorage.setItem('searchFilter', searchFilter);
});
document.addEventListener('DOMContentLoaded', () => {
 $('#sidenav').load('../../nav.html', function() {

  var searchFilter = localStorage.getItem('searchFilter');
  if (searchFilter != null && searchFilter.length > 0) {
   var input = document.getElementById('inputSearchBar');
   input.value = searchFilter;
   input.dispatchEvent(new Event('focus'));
   input.dispatchEvent(new KeyboardEvent('keyup',{'key':'a'}));
  } else {
   var sections = document.getElementsByClassName('nav-section');
   for (var i = 0; i < sections.length; i++) {
    const section = sections[i];
    const sectionTitle = section.querySelector('.nav-section-title .text').innerText;
    var haveToOpen = localStorage.getItem('section-' + sectionTitle); // "true" or "false"
    if (haveToOpen == null)
     haveToOpen = false;
    else
     haveToOpen = JSON.parse(haveToOpen);
    setSectionOpenOrClosed(section, haveToOpen);
   }

   
   const resetFilterButton = document.querySelector('.reset-button');
   resetFilterButton.style.display = 'none';
  }
  
  var scrollPositionNav = localStorage.getItem('scrollPositionNav');
  document.querySelector('#sidenav').scrollTop = scrollPositionNav;
 });
});

function doSearchBySection(argument) {
 var input = document.getElementById('inputSearchBar');
 var filter = input.value.toUpperCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
 var sections = document.getElementsByClassName('nav-section');
 for (var i = 0; i < sections.length; i++) {
  var section = sections[i];
  var sectionHasMatch = false;
  var sectionItems = section.getElementsByClassName('nav-section-item');
  for (var j=0; j < sectionItems.length; j++) {
   var item = sectionItems[j];
   var escLink = item.getElementsByTagName('a')[0];
   var escText = escLink.innerText.toUpperCase();
   var escHref = escLink.getAttribute('href');
   var escFolder='';
   if (escHref)
    escFolder = escHref.substring(3, escHref.length-1);

   var toSearch = [];
   if (escFolder !== '') {
    var keywords = keywords_map[escFolder];
    if (keywords)
     toSearch = keywords;
   }
   toSearch.push(escText.normalize('NFD').replace(/[\u0300-\u036f]/g, ''));
   
   var found = false;
   for (var k = 0; k < toSearch.length && !found; k++) {
    if (toSearch[k].includes(filter))
     found = true;
   }
   if (found) {
    item.style.display = '';
    sectionHasMatch = true;
   }
   else
    item.style.display = 'none';
  }
  if (sectionHasMatch)
   section.style.display = '';
  else
   section.style.display = 'none';
 }
 const closeButtons = document.querySelectorAll('.close-section-button');
 const closeButtonsDisplay = filter == '' ? '' : 'none';
 for (var i = 0; i < closeButtons.length; i++)
  closeButtons[i].style.display = closeButtonsDisplay;
 if (filter == '') {
  for (var i = 0; i < closeButtons.length; i++)
   closeButtons[i].textContent = NAV_SEC_SYMBOL_CLOSED;
 }
 
 const resetFilterButton = document.querySelector('.reset-button');
 resetFilterButton.style.display = filter == '' ? 'none' : '';

 const lastMarks = document.querySelectorAll('.nav-section-title .last');
 for (var i = 0; i < lastMarks.length; i++)
  lastMarks[i].style.display = 'none';
}
function toggleChildren(titleElement) {
 const contentElement = titleElement.nextElementSibling
 const children = contentElement.querySelectorAll('.nav-section-item');
 const titleSymbol = titleElement.querySelector('.close-section-button');
 const haveToOpen = titleSymbol.textContent === NAV_SEC_SYMBOL_OPEN ;
 const displayClass = haveToOpen ? 'block' : 'none';
 titleSymbol.textContent = haveToOpen ? NAV_SEC_SYMBOL_CLOSED : NAV_SEC_SYMBOL_OPEN;
 children.forEach(child => {
  child.style.display = displayClass;
 });
 const lastMark = titleElement.querySelector('.last');
 if (lastMark != null)
  lastMark.style.display = haveToOpen ? 'none' : 'block';
}
function toggleSectionOpenOrClosed(sectionElement) {
 const titleElement = sectionElement.querySelector('.nav-section-title');
 toggleChildren(titleElement);
}
function setSectionOpenOrClosed(sectionElement, haveToOpen) {
 const titleSymbol = sectionElement.querySelector('.close-section-button');
 if ((titleSymbol.textContent === NAV_SEC_SYMBOL_OPEN && haveToOpen) || (titleSymbol.textContent === NAV_SEC_SYMBOL_CLOSED && !haveToOpen))
  toggleChildren(sectionElement.querySelector('.nav-section-title'));
}
function isSectionOpen(sectionElement) {
 const titleSymbol = sectionElement.querySelector('.close-section-button');
 return titleSymbol.textContent === '✕';
}
