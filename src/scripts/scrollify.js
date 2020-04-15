
import scrollify from "jquery-scrollify";
import { select } from "d3-selection";
import { selectAll } from "d3-selection";
import "d3-transition";

var curr = 0;
var onPart = 0;

var $ = require('jquery');
var lastScrollTop = window.pageYOffset;
$(function () {
    $.scrollify({
        section: ".snap",
        interstitialSection: "",
        easing: "easeOutExpo",
        scrollSpeed: 1200,
        offset: 0,
        scrollbars: false,
        standardScrollElements: "",
        setHeights: true,
        overflowScroll: true,
        updateHash: true,
        touchScroll: true,
        before: function (index, sections) { before(index, sections) },
        after: function (index, sections) { checkInstant(index, sections); curr = index },
        afterResize: function () { },
        afterRender: function () { }
    });
});

$('html').bind('mousewheel', function (e) {

    if (e.originalEvent.wheelDelta < 0) {
        //scroll down
        if ((curr == 1 && onPart != 3) || (curr == 2 && onPart != 5)) {
            $.scrollify.disable();
        } else {
            $.scrollify.enable()
        }

        if (onPart == 0) {
            if (selectAll(".textFade1").style("opacity") == 1) {
                setTimeout(() => { onPart = 1 }, 1000)
            }
        }

        if (curr == 1 && onPart == 1) {

            fadeText(onPart);
            if (selectAll(".textFade2").style("opacity") == 1) {
                setTimeout(() => { onPart = 2; }, 500)
            }

        } else if (curr == 1 && onPart == 2) {

            fadeText(onPart);
            if (selectAll(".textFade3").style("opacity") == 1) {
                setTimeout(() => { onPart = 3; }, 500)
            }

        } else if (curr == 2 && onPart == 3) {

            if (selectAll(".textFade4").style("opacity") == 1) {
                setTimeout(() => { onPart = 4 }, 500)
            }

        } else if (curr == 2 && onPart == 4) {

            fadeText(onPart);

            selectAll('.grey_point')
                .each(function (d) {
                    console.log("hi");
                    var vary = (Math.random() * 8000) + 2000;

                    select(this)
                        .transition()
                        .delay(vary)
                        .attr("fill", "#4D4D4D")

                })
            if (selectAll(".textFade5").style("opacity") == 1) {
                setTimeout(() => { onPart = 5; }, 500)
            }

        } else {
            //scroll up
            console.log('Up');
        }
    }

});

function fadeText(onPart) {
    var newPart = onPart + 1;
    selectAll(".textFade" + onPart)
        .classed("m-fadeIn", false);
    selectAll(".textFade" + onPart)
        .classed("m-fadeOut", true);
    selectAll(".textFade" + newPart)
        .style("transition-delay", "1.5s")
        .classed("m-fadeIn", true);
    selectAll(".textFade" + newPart)
        .classed("m-fadeOut", false);
}


function before(index, sections) {
    for (var i = 1; i < 10; i++) {
        selectAll(".textFade" + i)
            .classed("m-fadeIn", false);
        selectAll(".textFade" + i)
            .classed("m-fadeOut", true);
    }

}

function checkInstant(index, sections) {
    if (index == 1) {
        selectAll(".textFade1")
            .classed("m-fadeIn", true);
        selectAll(".textFade1")
            .classed("m-fadeOut", false);
        selectAll('.point')  //here's how you get all the nodes
            .each(function (d) {
                var vary = (Math.random() * (1.5) + 2) + "s";
                select(this)
                    .style("transition", "visibility 0s linear 0s, opacity 400ms")
                    .style("transition-delay", vary)
                    .style("opacity", "1");
            });
        onPart = 0;
    }
    if (index == 2) {
        selectAll(".textFade4")
            .classed("m-fadeIn", true);
        selectAll(".textFade4")
            .classed("m-fadeOut", false);

        onPart = 3;
    }
}
