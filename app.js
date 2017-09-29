'use strict';

PatsSalmonCookiesStore.locations = [];

// Constructor Function for Pat's Salmon Cookies stores
function PatsSalmonCookiesStore(name, minCustPerHr, maxCustPerHr, avgCookiesPerSale) {
  this.name = name;
  this.minCustPerHr = minCustPerHr;
  this.maxCustPerHr = maxCustPerHr;
  this.avgCookiesPerSale = avgCookiesPerSale;
  this.cookiesSoldPerHr = [];
  this.id = this.name.replace(/\s/g, '');
  PatsSalmonCookiesStore.locations.push(this);
}

PatsSalmonCookiesStore.hours = ['6AM', '7AM', '8AM', '9AM', '10AM', '11AM', '12AM', '1PM', '2PM', '3PM', '4PM', '5PM', '6PM', '7PM'];

new PatsSalmonCookiesStore('First and Pike', 23, 65, 6.3);
new PatsSalmonCookiesStore('SeaTac Airport', 3, 24, 1.2);
new PatsSalmonCookiesStore('Seattle Center', 11, 38, 3.7);
new PatsSalmonCookiesStore('Capitol Hill', 20, 38, 2.3);
new PatsSalmonCookiesStore('Alki', 2, 16, 4.6);

PatsSalmonCookiesStore.prototype.randomNumCustPerHr = function() {
  return Math.floor(Math.random() * (this.maxCustPerHr - this.minCustPerHr + 1) + this.minCustPerHr);
};

// Method to Render Table Body
PatsSalmonCookiesStore.prototype.renderCookiesSold = function() {
  var trEl, trPos, thEl, thTextNode, tdEl, thTdPos, tdTextNode, i;
  var total = 0;
  var cookiesSoldPerHr = this.cookiesSoldPerHr;

  trEl = document.createElement('tr');
  trEl.setAttribute('id', this.id);
  trPos = document.querySelector('tbody');
  trPos.appendChild(trEl);

  thEl = document.createElement('th');
  thTextNode = document.createTextNode(this.name);
  thEl.appendChild(thTextNode);
  thTdPos = trPos.lastChild;
  thTdPos.appendChild(thEl);

  for (i in PatsSalmonCookiesStore.hours) {
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

  for (i in PatsSalmonCookiesStore.hours) {
    for (j in PatsSalmonCookiesStore.locations) {
      hourTotal += PatsSalmonCookiesStore.locations[j].cookiesSoldPerHr[i];
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

// Function to Add New Store
function addLocation(event) {
  event.preventDefault();
  var locName = event.target.locName.value;
  var minCustRaw = event.target.minCust.value;
  var minCust = Math.round(minCustRaw);
  var maxCustRaw = event.target.maxCust.value;
  var maxCust = Math.round(maxCustRaw);
  var avgCookiesRaw = event.target.avgCookies.value;
  var avgCookies = Math.round(avgCookiesRaw);
  var addLocValidation = document.getElementById('addLocValidation');
  var total = 0;
  var i, newLocation, thisStore, trEl, cookiesSold, thEl, thTextNode;

  // Form Validation
  if (!locName || !minCustRaw || !maxCustRaw || !avgCookiesRaw) {
    addLocValidation.textContent = 'Please fill in all fields.';
  }
  else if (isNaN(minCustRaw) || isNaN(maxCustRaw) || isNaN(avgCookiesRaw) || minCust < 0 || maxCust < 0 || avgCookies < 1) {
    addLocValidation.textContent = 'Minimum customers, maximum customers, and average number of cookies should be positive numbers.';
  }
  else if (minCust > maxCust) {
    addLocValidation.textContent = 'Minimum number must be smaller than maximum number of customers.';
  }

  else {
    // Check if Location Already Exists. If so, modifies the store data.
    for (i = 0; i < PatsSalmonCookiesStore.locations.length; i++) {
      thisStore = PatsSalmonCookiesStore.locations[i];
      if (locName.toUpperCase() === thisStore.name.toUpperCase()) {
        thisStore.minCustPerHr = minCust;
        thisStore.maxCustPerHr = maxCust;
        thisStore.avgCookiesPerSale = avgCookies;

        // Remove Store to Modify
        trEl = document.getElementById(thisStore.id);
        while (trEl.firstChild) {
          trEl.removeChild(trEl.firstChild);
        }

        // Add Modified Store
        thEl = document.createElement('th');
        thTextNode = document.createTextNode(thisStore.name);
        thEl.appendChild(thTextNode);
        trEl.appendChild(thEl);

        for (i in PatsSalmonCookiesStore.hours) {
          cookiesSold = thisStore.cookiesSoldPerHr;
          cookiesSold[i] = Math.round(avgCookies * thisStore.randomNumCustPerHr());
          var tdEl = document.createElement('td');
          var tdTextNode = document.createTextNode(cookiesSold[i]);
          tdEl.appendChild(tdTextNode);
          trEl.appendChild(tdEl);
          total += cookiesSold[i];
        }

        tdEl = document.createElement('td');
        tdTextNode = document.createTextNode(total);
        tdEl.appendChild(tdTextNode);
        trEl.appendChild(tdEl);

        removeTableFooter();
        renderTableFooter();

        return;
      }
    }
    // If location doesn't exist, adds the store data.
    newLocation = new PatsSalmonCookiesStore(locName, minCust, maxCust, avgCookies);
    newLocation.renderCookiesSold();
    removeTableFooter();
    renderTableFooter();
  }
}

// Generate Table Head
(function () {
  var thEl, thTextNode, thPos, i;
  for (i in PatsSalmonCookiesStore.hours) {
    thEl = document.createElement('th');
    thTextNode = document.createTextNode(PatsSalmonCookiesStore.hours[i]);
    thEl.appendChild(thTextNode);
    thPos = document.querySelector('thead').lastChild;
    thPos.appendChild(thEl);
  }

  thEl = document.createElement('th');
  thTextNode = document.createTextNode('Total');
  thEl.appendChild(thTextNode);
  thPos.appendChild(thEl);
})();

// Generate Table Body and Footer
for (var x in PatsSalmonCookiesStore.locations) {
  PatsSalmonCookiesStore.locations[x].renderCookiesSold();
}
renderTableFooter();

// Etc.
var addLoc = document.getElementById('addLocation');
addLoc.addEventListener('submit', addLocation);
