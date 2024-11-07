var currentPage = 1;
var resultsPerPage = 10; // Adjust as needed
var totalPages = 0;

//for displayResult page
function defaultResult() {
	var query = document.getElementById("query").value;
	console.log("Search query:", query); // Log the query value
	defaultResultSolr(query); // Call function for search
}

function defaultResultSolr(query, page = 1) {
    var solrURL = "http://localhost:8983/solr/demo3";
    var encodedQuery = encodeURIComponent(query);
    var start = (page - 1) * resultsPerPage;
    var solrQueryURL = `${solrURL}/select?q=${encodedQuery}&start=${start}&rows=${resultsPerPage}&hl=true&hl.fl=content&hl.simple.pre=%3Cmark%3E&hl.simple.post=%3C%2Fmark%3E&hl.fragsize=-1`;
    
    // Set the query text in the results page
    document.getElementById("queryText").textContent = query;

    // Use XMLHttpRequest to send an AJAX request
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function() {
        if (xhr.readyState === XMLHttpRequest.DONE) {
            if (xhr.status === 200) {
                var response = JSON.parse(xhr.responseText);
                displayResults(response.response.docs, response.highlighting);
                var numFound = response.response.numFound;
                totalPages = Math.ceil(numFound / resultsPerPage);
                document.getElementById("totalResults").textContent = `Jumlah Carian: ${numFound}`;
                updatePagination();
            } else {
                console.error('Error searching Solr:', xhr.statusText);
            }
        }
    };
    xhr.open("GET", solrQueryURL);
    xhr.send();
}

//for displayLemma page
function lemmaResult() {
	var query = document.getElementById("query").value;
	console.log("Search query:", query); // Log the query value
	lemmaResultSolr(query); // Call function for search
}

function lemmaResultSolr(query) {
    var solrURL = "http://localhost:8983/solr/demo3";
    var encodedQuery = encodeURIComponent(query);
    var solrQueryURL = solrURL + "/select?q=" + encodedQuery + "&df=lemma&hl=true&hl.fl=content&hl.simple.pre=%3Cmark%3E&hl.simple.post=%3C%2Fmark%3E&hl.fragsize=-1";
    
    // Set the query text in the results page
    document.getElementById("queryText").textContent = query;

    // Use XMLHttpRequest to send an AJAX request
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function() {
        if (xhr.readyState === XMLHttpRequest.DONE) {
            if (xhr.status === 200) {
                var response = JSON.parse(xhr.responseText);
                displayResults(response.response.docs, response.highlighting);
                var numFound = response.response.numFound;
                totalPages = Math.ceil(numFound / resultsPerPage);
                document.getElementById("totalResults").textContent = `Jumlah Carian: ${numFound}`;
                updatePagination();
            } else {
                console.error('Error searching Solr:', xhr.statusText);
            }
        }
    };
    xhr.open("GET", solrQueryURL);
    xhr.send();
}

//for displayNoFilter page
function nofilterResult() {
	var query = document.getElementById("query").value;
	console.log("Search query:", query); // Log the query value
	nofilterResultSolr(query); // Call function for search
}

function nofilterResultSolr(query) {
    var solrURL = "http://localhost:8983/solr/demo3";
    var encodedQuery = encodeURIComponent(query);
    var solrQueryURL = solrURL + "/select?q=" + encodedQuery + "&df=nofilter&hl=true&hl.fl=content&hl.simple.pre=%3Cmark%3E&hl.simple.post=%3C%2Fmark%3E&hl.fragsize=-1";
    
    // Set the query text in the results page
    document.getElementById("queryText").textContent = query;

    // Use XMLHttpRequest to send an AJAX request
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function() {
        if (xhr.readyState === XMLHttpRequest.DONE) {
            if (xhr.status === 200) {
                var response = JSON.parse(xhr.responseText);
                displayResults(response.response.docs, response.highlighting);
                var numFound = response.response.numFound;
                totalPages = Math.ceil(numFound / resultsPerPage);
                document.getElementById("totalResults").textContent = `Jumlah Carian: ${numFound}`;
                updatePagination();
            } else {
                console.error('Error searching Solr:', xhr.statusText);
            }
        }
    };
    xhr.open("GET", solrQueryURL);
    xhr.send();
}

//for displayTopic page
function searchTopic(topic) {
    // Set the topic in the URL
    window.location.href = "displayTopic.html?topic=" + encodeURIComponent(topic);
}

function topicSolr(topic) {
    var solrURL = "http://localhost:8983/solr/demo3";
    var encodedTopic = encodeURIComponent(topic);
    var solrQueryURL = solrURL + "/select?q=" + encodedTopic + "&hl=true&hl.fl=content&hl.simple.pre=%3Cmark%3E&hl.simple.post=%3C%2Fmark%3E&hl.fragsize=-1";
    
    // Set the topic text in the results page
    document.getElementById("queryText").textContent = topic;

    // Use XMLHttpRequest to send an AJAX request
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function() {
        if (xhr.readyState === XMLHttpRequest.DONE) {
            if (xhr.status === 200) {
                var response = JSON.parse(xhr.responseText);
                displayResults(response.response.docs, response.highlighting);
                var numFound = response.response.numFound;
                totalPages = Math.ceil(numFound / resultsPerPage);
                document.getElementById("totalResults").textContent = `Jumlah Carian: ${numFound}`;
                updatePagination();
            } else {
                console.error('Error searching Solr:', xhr.statusText);
            }
        }
    };
    xhr.open("GET", solrQueryURL);
    xhr.send();
}
//highlighting for both displayResult and displayTopic pages
function displayResults(docs, highlighting) {
    var resultsDiv = document.getElementById("searchResults");
    resultsDiv.innerHTML = "";

    docs.forEach(doc => {
        var hadithItem = document.createElement("div");
        hadithItem.classList.add("hadith-item");

        var result = document.createElement("p");
        var content = doc.content;

        if (highlighting.hasOwnProperty(doc.id) && highlighting[doc.id].hasOwnProperty("content")) {
            var highlightedContent = highlighting[doc.id].content[0];
            result.innerHTML = highlightedContent;
        } else {
            result.innerHTML = content;
        }

        hadithItem.appendChild(result);
        resultsDiv.appendChild(hadithItem);
    });
}

function updatePagination() {
    document.getElementById("pageInfo").textContent = `Page ${currentPage} of ${totalPages}`;

    document.getElementById("prevButton").disabled = currentPage === 1;
    document.getElementById("nextButton").disabled = currentPage === totalPages;
}

document.getElementById("prevButton").addEventListener("click", function() {
    if (currentPage > 1) {
        currentPage--;
        var query = document.getElementById("queryText").textContent;
        defaultResultSolr(query, currentPage);
    }
});

document.getElementById("nextButton").addEventListener("click", function() {
    if (currentPage < totalPages) {
        currentPage++;
        var query = document.getElementById("queryText").textContent;
        defaultResultSolr(query, currentPage);
    }
});

function fetchRandomHadiths() {
    var solrURL = "http://localhost:8983/solr/demo3";
    var solrQueryURL = solrURL + "/select?q=*:*&rows=5&sort=random_1234%20asc"; // Change 'random_1234' to an actual random field if available

    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function() {
        if (xhr.readyState === XMLHttpRequest.DONE) {
            if (xhr.status === 200) {
                var response = JSON.parse(xhr.responseText);
                displayRandomHadiths(response.response.docs);
            } else {
                console.error('Error fetching random hadiths from Solr:', xhr.statusText);
            }
        }
    };
    xhr.open("GET", solrQueryURL);
    xhr.send();
}

function displayRandomHadiths(docs) {
    var hadithContainer = document.getElementById('randomHadiths');
    hadithContainer.innerHTML = ""; // Clear previous content

    docs.forEach(doc => {
        var hadithItem = document.createElement("p");
        hadithItem.textContent = doc.content;
        hadithContainer.appendChild(hadithItem);
    });

    // Initialize infinite loop display
    var hadiths = hadithContainer.children;
    var currentIndex = 0;

    function showNextHadith() {
        hadiths[currentIndex].style.display = 'none';
        currentIndex = (currentIndex + 1) % hadiths.length;
        hadiths[currentIndex].style.display = 'block';
    }

    for (var i = 1; i < hadiths.length; i++) {
        hadiths[i].style.display = 'none';
    }

    setInterval(showNextHadith, 5000); // Change hadith every 5 seconds
}
