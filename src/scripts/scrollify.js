
import scrollify from "jquery-scrollify";
import { select } from "d3-selection";
import { selectAll } from "d3-selection";
var curr = 0;
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
var onPart = 1;
$('html').bind('mousewheel', function (e) {
    if (e.originalEvent.wheelDelta < 0) {
        //scroll down
        if (curr == 1 && onPart == 1) {
            selectAll(".textFade1")
                .classed("m-fadeIn", false);
            selectAll(".textFade1")
                .classed("m-fadeOut", true);
            selectAll(".textFade2")
                .style("transition-delay", "1.5s")
                .classed("m-fadeIn", true);
            selectAll(".textFade2")
                .classed("m-fadeOut", false);
            if (selectAll(".textFade2").style("opacity") == 1) {
                setTimeout(() => { onPart = 2}, 500)
            }
        } else if (curr == 1 && onPart == 2) {
            selectAll(".textFade2")
                .classed("m-fadeIn", false)
            selectAll(".textFade2")
                .classed("m-fadeOut", true)
            selectAll(".textFade3")
                .style("transition-delay", "2.5s")
                .classed("m-fadeIn", true);
            selectAll(".textFade3")
                .classed("m-fadeOut", false);
        }
    } else {
        //scroll up
        console.log('Up');
    }

});


function before(index, sections) {
    for (var i = 1; i < 10; i++) {
        selectAll(".textFade" + i)
            .classed("m-fadeIn", false);
        selectAll(".textFade" + i)
            .classed("m-fadeOut", true);
    }

}

function checkInstant(index, sections) {
    if (index != 0) {
        selectAll(".textFade1")
            .classed("m-fadeIn", true);
        selectAll(".textFade1")
            .classed("m-fadeOut", false);

    }
    if (index == 1) {
        selectAll('.point')  //here's how you get all the nodes
            .each(function (d) {
                var vary = (Math.random() * (1.5) + 1.5) + "s";
                select(this)
                    .style("transition", "visibility 0s linear 0s, opacity 400ms")
                    .style("transition-delay", vary)
                    .style("opacity", "1");
            });
    }
}
