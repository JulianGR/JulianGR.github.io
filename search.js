jQuery(function() {
  // Initialize lunr with the fields to be searched, plus the boost.
  window.idx = lunr(function() {
    this.field("id");
    this.field("title", {
      boost: 5
    });
    this.field("content", {
      boost: 10
    });
  });

  // Get the generated search_data.json file so lunr.js can search it locally.
  window.data = $.getJSON("../search_data.json");

  // Wait for the data to load and add it to lunr
  window.data.then(function(loaded_data) {
    $.each(loaded_data, function(index, value) {
      window.idx.add(
        $.extend({
          "id": index
        }, value)
      );
    });
  });


  // Event when the form is submitted
  $("#site_search").submit(function(event) {
    event.preventDefault(); // RTH: per Google, preventDefault() might be the culprit in Firefox
    var query = $("#search_box").val(); // Get the value for the text field
    var results = window.idx.search(query); // Get lunr to perform a search
    display_search_results(results); // Hand the results off to be displayed
  });


  /*

   function wrapper(element, matches) {

    var nodeFilter = {
      acceptNode: function (node) {
        if (/^[\t\n\r ]*$/.test(node.nodeValue)) {
          return NodeFilter.FILTER_SKIP
        }
        return NodeFilter.FILTER_ACCEPT
      }
    }

    var index = 0,
        matches = matches.sort(function (a, b) { return a[0] - b[0] }).slice(),
        previousMatch = [-1, -1]
        match = matches.shift(),
        walker = document.createTreeWalker(
          element,
          NodeFilter.SHOW_TEXT,
          nodeFilter,
          false
        )

    while (node = walker.nextNode()) {
      if (match == undefined) break
      if (match[0] == previousMatch[0]) continue

      var text = node.textContent,
          nodeEndIndex = index + node.length;

      if (match[0] < nodeEndIndex) {
        var range = document.createRange(),
            tag = document.createElement("mark"),
            rangeStart = match[0] - index,
            rangeEnd = rangeStart + match[1];

        tag.dataset.rangeStart = rangeStart
        tag.dataset.rangeEnd = rangeEnd

        range.setStart(node, rangeStart)
        range.setEnd(node, rangeEnd)
        range.surroundContents(tag)

        index = match[0] + match[1]

        // the next node will now actually be the text we just wrapped, so
        // we need to skip it
        walker.nextNode()
        previousMatch = match
        match = matches.shift()
      } else {
        index = nodeEndIndex
      }
    }
  }



  $("#site_search").submit(function(event) {
    event.preventDefault(); // RTH: per Google, preventDefault() might be the culprit in Firefox
    var query = $("#search_box").val(); // Get the value for the text field


    ol = document.querySelector("ul");


    var results = window.idx.search(query); // Get lunr to perform a search



      while (ol.firstChild) {
        ol.removeChild(ol.firstChild)
      }

      results.forEach(function(result) {
        var doc = documents[result.ref],
          li = buildSearchResult(doc)

        Object.keys(result.matchData.metadata).forEach(function(term) {
          Object.keys(result.matchData.metadata[term]).forEach(function(fieldName) {
            var field = li.querySelector("[data-field=" + fieldName + "]"),
              positions = result.matchData.metadata[term][fieldName].position

            wrapper(field, positions)
          })
        })

        ol.appendChild(li)
      })


    display_search_results(results); // Hand the results off to be displayed
  });

  */

  function display_search_results(results) {
    var $search_results = $("#search_results");

    // Wait for data to load
    window.data.then(function(loaded_data) {

      // Are there any results?
      if (results.length) {
        $search_results.empty(); // Clear any old results

        // Iterate over the results
        results.forEach(function(result) {
          var item = loaded_data[result.ref];

          // Build a snippet of HTML for this result

          var appendString = "<li><a href=\" + item.url + \">\" + item.title + \"</a></li>";

          // Add the snippet to the collection of results.
          $search_results.append(appendString);
        });
      } else {
        // If there are no results, let the user know.
        $search_results.html("<li>No results found.<br>Please check spelling, spacing, yada...</li>");
      }
    });
  }
});
