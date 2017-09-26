'use strict';

var locFirstAndPike = {
  name: 'First and Pike',
  id: 'locFirstAndPike',
  minCustPerHr: 23,
  maxCustPerHr: 65,
  avgCookiesPerSale: 6.3,
  cookiesSoldPerHr: [],
  randomNumCustPerHr: function() {
    return Math.floor(Math.random() * (this.maxCustPerHr - this.minCustPerHr + 1) + this.minCustPerHr);
  }
};

var locSeaTacAirport = {
  name: 'SeaTac Airport',
  id: 'locSeaTacAirport',
  minCustPerHr: 3,
  maxCustPerHr: 24,
  avgCookiesPerSale: 1.2,
  cookiesSoldPerHr: [],
  randomNumCustPerHr: function() {
    return Math.floor(Math.random() * (this.maxCustPerHr - this.minCustPerHr + 1) + this.minCustPerHr);
  }
};

var locSeattleCenter = {
  name: 'Seattle Center',
  id: 'locSeattleCenter',
  minCustPerHr: 11,
  maxCustPerHr: 38,
  avgCookiesPerSale: 3.7,
  cookiesSoldPerHr: [],
  randomNumCustPerHr: function() {
    return Math.floor(Math.random() * (this.maxCustPerHr - this.minCustPerHr + 1) + this.minCustPerHr);
  }
};

var locCapitolHill = {
  name: 'Capitol Hill',
  id: 'locCapitolHill',
  minCustPerHr: 20,
  maxCustPerHr: 38,
  avgCookiesPerSale: 2.3,
  cookiesSoldPerHr: [],
  randomNumCustPerHr: function() {
    return Math.floor(Math.random() * (this.maxCustPerHr - this.minCustPerHr + 1) + this.minCustPerHr);
  }
};

var locAlki = {
  name: 'Alki',
  id: 'locAlki',
  minCustPerHr: 2,
  maxCustPerHr: 16,
  avgCookiesPerSale: 4.6,
  cookiesSoldPerHr: [],
  randomNumCustPerHr: function() {
    return Math.floor(Math.random() * (this.maxCustPerHr - this.minCustPerHr + 1) + this.minCustPerHr);
  }
};

var arrayOfHoursOpen = [
  '6AM', // 0
  '7AM', // 1
  '8AM', // 2
  '9AM', // 3
  '10AM', // 4
  '11AM', // 5
  '12AM', // 6
  '1PM', // 7
  '2PM', // 8
  '3PM', // 9
  '4PM', // 10
  '5PM', // 11
  '6PM', // 12
  '7PM', // 13
  '8PM' // 14
];

function calcCookiesSoldPerHr(objectName) {
  var ulEl, liEl, ulTextNode, liTextNode, ulPos, liPos, i, ulChild;
  var total = 0;
  var cookiesSoldPerHr = objectName.cookiesSoldPerHr;
  ulEl = document.createElement('ul');
  ulTextNode = document.createTextNode(objectName.name);
  ulEl.appendChild(ulTextNode);
  ulPos = document.getElementById(objectName.id);
  ulPos.appendChild(ulEl);
  ulChild = ulPos.lastChild;
  for (i in arrayOfHoursOpen) {
    cookiesSoldPerHr[i] = Math.round(objectName.avgCookiesPerSale * objectName.randomNumCustPerHr());
    liEl = document.createElement('li');
    liTextNode = document.createTextNode(arrayOfHoursOpen[i] + ': ' + cookiesSoldPerHr[i] + ' cookies');
    liEl.appendChild(liTextNode);
    liPos = ulChild;
    liPos.appendChild(liEl);
    total += cookiesSoldPerHr[i];
  }
  liEl = document.createElement('li');
  liTextNode = document.createTextNode('Total: ' + total);
  liEl.appendChild(liTextNode);
  liPos = ulChild;
  liPos.appendChild(liEl);
};

calcCookiesSoldPerHr(locFirstAndPike);
calcCookiesSoldPerHr(locSeaTacAirport);
calcCookiesSoldPerHr(locSeattleCenter);
calcCookiesSoldPerHr(locCapitolHill);
calcCookiesSoldPerHr(locAlki);
