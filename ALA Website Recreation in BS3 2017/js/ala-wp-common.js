// wait for all elements to render (including images)
$(window).load(function() {
    resizePanels();

    $( window ).resize(function() {
        resizePanels();
    });
});

$(document).ready(function() {
      // Change banner images based on month - format jtron-bg-month-01-770px.jpg
    var month = ("0" + new Date().getDate()).slice(-2);
    var filename = "img/jtron-bg-month-" + month + "-770px.jpg"
    document.getElementById("ala-jumbotron").style.backgroundImage = "url('" + filename + "')";

    // update ALA stats
    var statsUrl = "http://dashboard.ala.org.au/dashboard/homePageStats";
    $.getJSON(statsUrl, function(data) {
     updateStats("#allRecords", data.recordCounts.count.toLocaleString());
     updateStats("#allSpecies", data.speciesCounts.count.toLocaleString());
     updateStats("#allDownloads", data.downloadCounts.events.toLocaleString());
     updateStats("#allUsers", data.userCounts.count.toLocaleString());
    });
});

function updateStats(divId, statValue) {
    $(divId).fadeOut("fast").html(statValue).fadeIn("fast");
}

function resizePanels() {
    var panels = $('.panel.panel-default'); // might want to use a more specific selector (e.g. add an extra class to those panel divs)
    var max = 0;
    $.each(panels, function(i,el) {
        var thisMax = $(el).find('img').outerHeight() + $(el).find('.panel-body').outerHeight();
        var icon = $(el).find('a');
        if (max < thisMax) {
            max = thisMax;
        }
    });
    panels.innerHeight(max); // set height to all divs
}