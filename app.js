'use strict';

var i;
var arrayOfHoursOpen = [
  '6AM', '7AM', '8AM', '9AM', '10AM', '11AM', '12AM', '1PM', '2PM', '3PM', '4PM', '5PM', '6PM', '7PM'
];

// Constructor Function for Pat's Salmon Cookies stores
function PatsSalmonCookiesStore(id, name, minCustPerHr, maxCustPerHr, avgCookiesPerSale) {
  this.name = name;
  this.minCustPerHr = minCustPerHr;
  this.maxCustPerHr = maxCustPerHr;
  this.avgCookiesPerSale = avgCookiesPerSale;
  this.cookiesSoldPerHr = [];
}

var locFirstAndPike = new PatsSalmonCookiesStore('locFirstAndPike', 'First and Pike', 23, 65, 6.3);
var locSeaTacAirport = new PatsSalmonCookiesStore('locSeaTacAirport', 'SeaTac Airport', 3, 24, 1.2);
var locSeattleCenter = new PatsSalmonCookiesStore('locSeattleCenter', 'Seattle Center', 11, 38, 3.7);
var locCapitolHill = new PatsSalmonCookiesStore('locCapitolHill', 'Capitol Hill', 20, 38, 2.3);
var locAlki = new PatsSalmonCookiesStore('locAlki', 'Alki', 2, 16, 4.6);

var arrayOfStoreLocations = [
  locFirstAndPike,
  locSeaTacAirport,
  locSeattleCenter,
  locCapitolHill,
  locAlki
];

PatsSalmonCookiesStore.prototype.randomNumCustPerHr = function() {
  return Math.floor(Math.random() * (this.maxCustPerHr - this.minCustPerHr + 1) + this.minCustPerHr);
};

// Method to Generate Table Body
PatsSalmonCookiesStore.prototype.renderCookiesSold = function() {
  var trEl, trPos, thEl, thTextNode, tdEl, thTdPos, tdTextNode, i;
  var total = 0;
  var cookiesSoldPerHr = this.cookiesSoldPerHr;

  trEl = document.createElement('tr');
  trPos = document.querySelector('tbody');
  trPos.appendChild(trEl);

  thEl = document.createElement('th');
  thTextNode = document.createTextNode(this.name);
  thEl.appendChild(thTextNode);
  thTdPos = trPos.lastChild;
  thTdPos.appendChild(thEl);

  for (i in arrayOfHoursOpen) {
    cookiesSoldPerHr[i] = Math.round(this.avgCookiesPerSale * this.randomNumCustPerHr());
    tdEl = document.createElement('td');
    tdTextNode = document.createTextNode(cookiesSoldPerHr[i]);
    tdEl.appendChild(tdTextNode);
    thTdPos.appendChild(tdEl);
    total += cookiesSoldPerHr[i];
  }

  tdEl = document.createElement('td');
  tdTextNode = document.createTextNode(total);
  tdEl.appendChild(tdTextNode);
  thTdPos.appendChild(tdEl);
};

// Function to Render Table Footer
function renderTableFooter() {
  var thEl, thTextNode, thTdPos, tdEl, tdTextNode, i, j;
  var hourTotal = 0;
  var total = 0;

  thEl = document.createElement('th');
  thTextNode = document.createTextNode('Totals');
  thEl.appendChild(thTextNode);
  thTdPos = document.querySelector('tfoot').firstChild;
  thTdPos.appendChild(thEl);

  for (i in arrayOfHoursOpen) {
    for (j in arrayOfStoreLocations) {
      hourTotal += arrayOfStoreLocations[j].cookiesSoldPerHr[i];
    }
    tdEl = document.createElement('td');
    tdTextNode = document.createTextNode(hourTotal);
    tdEl.appendChild(tdTextNode);
    thTdPos.appendChild(tdEl);
    total += hourTotal;
    hourTotal = 0;
  }

  tdEl = document.createElement('td');
  tdTextNode = document.createTextNode(total);
  tdEl.appendChild(tdTextNode);
  thTdPos.appendChild(tdEl);
}

// Function to Remove Table Footer
function removeTableFooter() {
  var tableFooter, firstTr;
  tableFooter = document.querySelector('tfoot');
  firstTr = tableFooter.firstChild;
  while (firstTr.firstChild) {
    firstTr.removeChild(firstTr.firstChild);
  }
}

// Generate Table Head
(function () {
  var thEl, thTextNode, thPos, i;
  for (i in arrayOfHoursOpen) {
    thEl = document.createElement('th');
    thTextNode = document.createTextNode(arrayOfHoursOpen[i]);
    thEl.appendChild(thTextNode);
    thPos = document.querySelector('thead').lastChild;
    thPos.appendChild(thEl);
  }

  thEl = document.createElement('th');
  thTextNode = document.createTextNode('Total');
  thEl.appendChild(thTextNode);
  thPos.appendChild(thEl);
})();

// Generate Table Body - always call table body before the table footer

for (i in arrayOfStoreLocations) {
  arrayOfStoreLocations[i].renderCookiesSold();
}
renderTableFooter();


// Function to Add New Store
function addLocation(event) {
  event.preventDefault();
  var locId = event.target.locId.value;
  var locName = event.target.locName.value;
  var minCustRaw = event.target.minCust.value;
  var minCust = Math.round(minCustRaw);
  var maxCustRaw = event.target.maxCust.value;
  var maxCust = Math.round(maxCustRaw);
  var avgCookiesRaw = event.target.avgCookies.value;
  var avgCookies = Math.round(avgCookiesRaw);
  var formValidation = document.getElementById('formValidation');

  // Form Validation
  if (!locId || !locName || !minCustRaw || !maxCustRaw || !avgCookiesRaw) {
    formValidation.textContent = 'Please fill in all fields.';
  }
  else if (isNaN(minCustRaw) || isNaN(maxCustRaw) || isNaN(avgCookiesRaw)) {
    formValidation.textContent = 'Minimum customers, maximum custoners, and average number of cookies should be numbers.';
  }


  else {
    // Add New Location to Table
    var newLocation = new PatsSalmonCookiesStore(locId, locName, minCust, maxCust, avgCookies);
    arrayOfStoreLocations.push(newLocation);
    newLocation.renderCookiesSold();

    removeTableFooter();
    renderTableFooter();
  }
}

var addLoc = document.getElementById('addLocation');
addLoc.addEventListener('submit', addLocation);
