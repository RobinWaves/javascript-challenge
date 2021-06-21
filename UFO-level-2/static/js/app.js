// from data.js
var tableData = data;

// Get a reference to the table body
var tbody = d3.select("tbody");

// Select the button
var button = d3.select("#button");

// Create an array of each sighting's value to load dropdown menus
var allOptions = [];
datetimes = tableData.map(date => date.datetime);
allOptions.push(datetimes);
cities = tableData.map(city => city.city);
allOptions.push(cities);
states = tableData.map(state => state.state);
allOptions.push(states);
countries = tableData.map(country => country.country);
allOptions.push(countries);
shapes = tableData.map(shape => shape.shape);
allOptions.push(shapes);

// Load inital sightings table
init();
// Load dropdown menu options
for (var i = 0; i < 5; i++) {
    var newStr = "selectOption" + i;
    getOptions(allOptions[i], newStr);
}
//Create event handlers 
button.on("click", updateTable);
//-----------------------------------------------------------------//
// Function to load initial table
function init() {
    // Get a reference to the table body
    var tbody = d3.select("tbody");

    // Append a table to index.html add all rows of data for each ufo sighting
    tableData.forEach(sighting => {
        var row = tbody.append("tr");
        Object.entries(sighting).forEach(([key, value]) => row.append("td").text(value));
    });
}
//-----------------------------------------------------------------//
// Function to load all dropdown menu options
function getOptions(criteria, newString) {
    // Delete duplicates
    let uniqueCriteria = [...new Set(criteria)];

    for (var i = 0; i < uniqueCriteria.length; i++) {
        var select = document.getElementById(newString); 
        var opt = uniqueCriteria[i];
        var elem = document.createElement("option");
        elem.textContent = opt;
        elem.value = opt;
        select.appendChild(elem);
    } 
}
//-----------------------------------------------------------------//
// Clears table body to append new rows
function deleteTableBody() {
    tbody.selectAll("tr")
        .remove()
}
//-----------------------------------------------------------------//
// This function is called when a dropdown menu item is selected
function updateTable() {
    // Prevent the page from refreshing
    d3.event.preventDefault();

    // Get five input filter values
    var filterDate = d3.select("#selectOption0").property("value");
    var filterCity = d3.select("#selectOption1").property("value");
    var filterState = d3.select("#selectOption2").property("value");
    var filterCountry = d3.select("#selectOption3").property("value");
    var filterShape = d3.select("#selectOption4").property("value");
    console.log(filterDate, filterCity, filterState, filterCountry, filterShape);
    
    var filteredData = tableData.filter(obj => obj.datetime == filterDate || obj.city == filterCity 
                                || obj.state == filterState || obj.country == filterCountry || obj.shape == filterShape);
    console.log(filteredData);

    deleteTableBody();

    // Append a new filtered table
    filteredData.forEach(sighting => {
        var row = tbody.append("tr");
        Object.entries(sighting).forEach(([key, value]) => row.append("td").text(value));
    });
}
//-----------------------------------------------------------------//