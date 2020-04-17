
import scrollify from "jquery-scrollify";
import { select } from "d3-selection";
import { selectAll } from "d3-selection";
import "d3-transition";

var curr = 0;
var onPart = 0;

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
        setHeights: false,
        overflowScroll: true,
        updateHash: true,
        touchScroll: true,
        before: function (index, sections) { before(index, sections) },
        after: function (index, sections) { checkInstant(index, sections); curr = index },
        afterResize: function () { },
        afterRender: function () { }
    });
});

window.addEventListener('wheel', function (e) { animationInstruct(e) });

function animationInstruct(e) {
    if (e.deltaY > 0) {
        //scroll down

        if (onPart == 0) {
            if (selectAll(".textFade1").style("opacity") == 1) {
                setTimeout(() => { onPart = 1; }, 1500)
            }
        }
        if (curr == 1 && onPart == 1) {
            fadeText(onPart);
            if (selectAll(".textFade2").style("opacity") == 1) {
                setTimeout(() => { onPart = 2; }, 500)
            }

        } else if (curr == 1 && onPart == 2) {
            fadeText(onPart);
            if (selectAll(".textFade3").style("opacity") > 0.5) {
                setTimeout(() => {
                    something();
                }, 500)
            }

        } else if (onPart == 3) {
            if (selectAll(".textFade4").style("opacity") == 1) {
                setTimeout(() => {
                    onPart = 4;
                }, 500)
            }

        } else if (curr == 2 && onPart == 4) {
            fadeText(onPart);
            selectAll(".g-cstyle0")
                .transition()
                .delay(1000)
                .style("transition", "2s")
                .style("color", "#4D4D4D");
            selectAll(".article")
                .classed("fadeblack", true)

            selectAll('.grey_point')
                .each(function (d) {
                    var vary = (Math.random() * 7000) + 3000;
                    select(this)
                        .transition()
                        .delay(vary)
                        .duration(500)
                        .attr("fill", "#4D4D4D")
                })
            if (selectAll(".dis").style("color") == "rgb(77, 77, 77)") {
                setTimeout(() => { onPart = 5; }, 500)
            }

        } else if (curr == 2 && onPart == 5) {
            fadeText(onPart);

            selectAll('.grey_point_2')
                .each(function (d) {
                    var vary = (Math.random() * 7000) + 3000;
                    select(this)
                        .transition()
                        .delay(vary)
                        .duration(500)
                        .style("transition", "visibility 0s linear 0s, opacity 400ms")
                        .style("fill", "#4D4D4D")
                })
            if (selectAll(".textFade6").style("opacity") == 1) {
                setTimeout(() => { finish() }, 1000);
            }

        }

    }


}



function fadeText(onPart) {
    var newPart = onPart + 1;
    selectAll(".textFade" + onPart)
        .classed("m-fadeIn", false)
        .classed("m-fadeOut", true);
    selectAll(".textFade" + newPart)
        .style("transition-delay", "1s")
        .classed("m-fadeIn", true)
        .classed("m-fadeOut", false);
}


function before(index, sections) {
    for (var i = 1; i < 10; i++) {
        selectAll(".textFade" + i)
            .classed("m-fadeIn", false)
            .classed("m-fadeOut", true);
    }
    if (index == 0) {
        $.scrollify.enable();
    }
}

var something = (function () {
    var executed = false;
    return function () {
        if (!executed) {
            executed = true;
            onPart = 3;
            $.scrollify.enable();

        }
    };
})();


var finish = (function () {
    var executed = false;
    return function () {
        if (!executed) {
            selectAll(".article")
                .classed("fadeblack", false)
            executed = true;
            $.scrollify.enable();
            $.scrollify.move(3);
        }
    };
})();



function checkInstant(index, sections) {
    if (index == 1) {
        selectAll(".textFade1")
            .classed("m-fadeIn", true)
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
        $.scrollify.disable();
    }
    if (index == 2) {
        selectAll(".textFade4")
            .classed("m-fadeIn", true)
            .classed("m-fadeOut", false);
        onPart = 3;
        console.log("got here");
        $.scrollify.disable();
    }
    if (index == 3) {
        $.scrollify.disable();
        cleanup();
    }

}

function cleanup() {
    window.removeEventListener("window", animationInstruct);
    document.getElementsByTagName("body")[0].style = "overflow: visible !important";
    selectAll(".makeInv")
        .style("display", "none")
    selectAll('.grey_point')  //here's how you get all the nodes
        .attr("fill", "#4D4D4D")
    selectAll('.grey_point_2')
        .attr("fill", "#4D4D4D")
    selectAll(".textFade6")
        .classed("m-fadeIn", true)
        .classed("m-fadeOut", false);
    selectAll(".textFade7")
        .classed("m-fadeIn", true)
        .classed("m-fadeOut", false);
    if ((selectAll(".snap").style("height")) == "1500px") {
        selectAll(".snap").style("height", "1100px");
    }

}