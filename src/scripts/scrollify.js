
import scrollify from "jquery-scrollify";
import { select } from "d3-selection";
import { selectAll } from "d3-selection";

var $ = require('jquery');

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
        after: function (index, sections) { checkInstant(index, sections) },
        afterResize: function () { },
        afterRender: function () { }
    });
});

function before(index, sections) {
    console.log(index);
    selectAll(".textFade")
    .classed("m-fadeIn", false);
selectAll(".textFade")
    .classed("m-fadeOut", true);
}

function checkInstant(index, sections) {
    console.log(index);
    if (index > 0) {
        //$.scrollify.instantNext();
    }
    if (index != 0) {
        selectAll(".textFade")
            .classed("m-fadeIn", true);
        selectAll(".textFade")
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
