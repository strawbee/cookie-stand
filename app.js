'use strict';

var arrayOfHoursOpen = [
  '6AM', '7AM', '8AM', '9AM', '10AM', '11AM', '12AM', '1PM', '2PM', '3PM', '4PM', '5PM', '6PM', '7PM', '8PM'
];

// Constructor Function for Pat's Salmon Cookies stores
function PatsSalmonCookiesStore(name, id, minCustPerHr, maxCustPerHr, avgCookiesPerSale) {
  this.name = name;
  this.id = id;
  this.minCustPerHr = minCustPerHr;
  this.maxCustPerHr = maxCustPerHr;
  this.avgCookiesPerSale = avgCookiesPerSale;
  this.cookiesSoldPerHr = [];
}

var locFirstAndPike = new PatsSalmonCookiesStore('First and Pike', 'locFirstAndPike', 23, 65, 6.3);
var locSeaTacAirport = new PatsSalmonCookiesStore('SeaTac Airport', 'locSeaTacAirport', 3, 24, 1.2);
var locSeattleCenter = new PatsSalmonCookiesStore('Seattle Center', 'locSeattleCenter', 11, 38, 3.7);
var locCapitolHill = new PatsSalmonCookiesStore('Capitol Hill', 'locCapitolHill', 20, 38, 2.3);
var locAlki = new PatsSalmonCookiesStore('Alki', 'locAlki', 2, 16, 4.6);

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
locFirstAndPike.renderCookiesSold();
locSeaTacAirport.renderCookiesSold();
locSeattleCenter.renderCookiesSold();
locCapitolHill.renderCookiesSold();
locAlki.renderCookiesSold();

// Generate Table Footer
(function () {
  var thEl, thTextNode, thTdPos, tdEl, tdTextNode, i;
  var hourTotal = 0;
  var total = 0;

  thEl = document.createElement('th');
  thTextNode = document.createTextNode('Totals');
  thEl.appendChild(thTextNode);
  thTdPos = document.querySelector('tfoot').firstChild;
  thTdPos.appendChild(thEl);

  for (i in arrayOfHoursOpen) {
    hourTotal = locFirstAndPike.cookiesSoldPerHr[i] + locSeaTacAirport.cookiesSoldPerHr[i] + locSeattleCenter.cookiesSoldPerHr[i] + locCapitolHill.cookiesSoldPerHr[i] + locAlki.cookiesSoldPerHr[i];

    tdEl = document.createElement('td');
    tdTextNode = document.createTextNode(hourTotal);
    tdEl.appendChild(tdTextNode);
    thTdPos.appendChild(tdEl);

    total += hourTotal;
  }

  tdEl = document.createElement('td');
  tdTextNode = document.createTextNode(total);
  tdEl.appendChild(tdTextNode);
  thTdPos.appendChild(tdEl);
})();
