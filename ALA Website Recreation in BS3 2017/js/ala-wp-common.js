var tocWidth = 0; // global

// wait for all elements to render (including images)
$(window).load(function() {
    resizePanels();

    $( window ).resize(function() {
        resizePanels();
        resizeToc();
    });
});

$(document).ready(function() {
    // Change banner images based on month - format jtron-bg-month-01-770px.jpg
    if ($('#ala-jumbotron').length) { //if (document.getElementById("ala-jumbotron")) {
        var month = ("0" + new Date().getDate()).slice(-2);
        var filename = "img/jtron-bg-month-" + month + "-770px.jpg"
        document.getElementById("ala-jumbotron").style.backgroundImage = "url('" + filename + "')";
    }
    
    if ($(".main-stats").length) {
        // update ALA stats
        var statsUrl = "https://dashboard.ala.org.au/dashboard/homePageStats";
        $.getJSON(statsUrl, function(data) {
            updateStats("#allRecords", data.recordCounts.count.toLocaleString());
            updateStats("#allSpecies", data.speciesCounts.count.toLocaleString());
            updateStats("#allDownloads", data.downloadCounts.events.toLocaleString());
            updateStats("#allUsers", data.userCounts.count.toLocaleString());
        });
    }
    
    if ($('.navbar-fixed-top').length && $('.toc-floating-menu').length) {
        var headerHeight = $('.navbar-fixed-top').outerHeight(true); //  + $('.info-hub-banner').outerHeight(true) + $('.breadcrumb').outerHeight(true);
        var footerHeight = $('footer').outerHeight(true) + $('.alert-creativecommons').outerHeight(true);
        // $('footer').each(function() {
        //      footerHeight += $(this).outerHeight(); // alert-creativecommons
        //  });
        // console.log("heights",headerHeight, footerHeight);
        $('.toc-floating-menu').affix({
            offset: {
                top:  $('.toc-floating-menu').offset().top - headerHeight, //headerHeight,
                bottom: footerHeight
            }
        });

        $(window).scroll(function () {
            //$('.sidebar-col').width($('.sidebarCol').width());
            resizeToc();
        });
    }
    
});

function updateStats(divId, statValue) {
    $(divId).fadeOut("fast").html(statValue).fadeIn("fast");
}

function resizeToc() {
    var toc = $('.toc-floating-menu');
    var sidebar = $('.sidebar-col');
    
    if (toc && sidebar) {
        toc.width(sidebar.width());
    }
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
    
    if (max > 0) {
        panels.innerHeight(max); // set height to all divs
    }
}