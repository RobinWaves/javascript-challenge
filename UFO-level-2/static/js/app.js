// from data.js
var tableData = data;

// Get a reference to the table body
var tbody = d3.select("tbody");
// Select the button
var button = d3.select("#button");

//-----------------------------------------------------------------//
// Function to load initial table
function init() {
    // Append a table to index.html add all rows of data for each ufo sighting
    tableData.forEach(sighting => {
        var row = tbody.append("tr");
        Object.entries(sighting).forEach(([key, value]) => row.append("td").text(value));
    });

    // Create an array of each sighting's value to load dropdown menus
    var allOptions = [];
    allOptions.push(tableData.map(date => date.datetime));
    allOptions.push(tableData.map(city => city.city));
    allOptions.push(tableData.map(state => state.state));
    allOptions.push(tableData.map(country => country.country));
    allOptions.push(tableData.map(shape => shape.shape));

    // Load dropdown menu options
    for (var i = 0; i < allOptions.length; i++) {
        var newStr = "selectOption" + i;
        getOptions(allOptions[i], newStr);
    }
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
// This function is called when a dropdown menu item is selected
function updateTable() {
    // Prevent the page from refreshing
    d3.event.preventDefault();

    // Get five input filter values
    var date = (d3.select("#selectOption0").property("value"));
    var city = (d3.select("#selectOption1").property("value"));
    var state = (d3.select("#selectOption2").property("value"));
    var country = (d3.select("#selectOption3").property("value"));
    var shape = (d3.select("#selectOption4").property("value"));
    console.log(date, city, state, country, shape);

    var filteredData = tableData;
    if (date) { filteredData = filteredData.filter(d => d.datetime === date); }
    if (city) { filteredData = filteredData.filter(d => d.city === city); }
    if (state) { filteredData = filteredData.filter(d => d.state === state); }
    if (country) { filteredData = filteredData.filter(d => d.country === country); }
    if (shape) { filteredData = filteredData.filter(d => d.shape === shape); }
    console.log(filteredData);

    deleteTableBody();

    // No records found - print error
    if ((Object.keys(filteredData).length) == 0) {
        var column = d3.select(".col-md-10");
        column.append("h1").text("No matches found!  Please try your search again.");
    }   
    // Records found - append a new filtered table 
    if (filteredData) { 
        filteredData.forEach(sighting => {
            var row = tbody.append("tr");
            Object.entries(sighting).forEach(([key, value]) => row.append("td").text(value));
        })
    }
}
//-----------------------------------------------------------------//
// Clears table body to append new rows
function deleteTableBody() {
    tbody.selectAll("tr")
        .remove()
}
//-----------------------------------------------------------------//
// Load inital sightings table
init();

//Create event handlers 
button.on("click", updateTable);