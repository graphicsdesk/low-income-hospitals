
import scrollify from "jquery-scrollify";
import { select } from "d3-selection";
import { selectAll } from "d3-selection";
import "d3-transition";

var curr = 0;
var onPart = 0;
var canGo = true;
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
var delay = 500;
var delay2 = 1500;
if (window.screen.width < 750) {
    delay = 1500;
    delay2 = 5000;
}

let touchstartX = 0;
let touchstartY = 0;
let touchendX = 0;
let touchendY = 0;


window.addEventListener('touchstart', function (event) {
    touchstartX = event.changedTouches[0].screenX;
    touchstartY = event.changedTouches[0].screenY;
}, false);

window.addEventListener('touchend', function (event) {
    touchendX = event.changedTouches[0].screenX;
    touchendY = event.changedTouches[0].screenY;
    handleGesture();
}, false);


    function handleGesture() {
        if (touchendY >= touchstartY) {
            goBack();
        }

        if (touchendY <= touchstartY) {
            if (onPart == 0) {
                if (selectAll(".textFade1").style("opacity") == 1) {
                    onPart = 1;
                }
            }
            if (curr == 1 && onPart == 1) {
                fadeText(onPart);
                if (selectAll(".textFade2").style("opacity") == 1) {
                    onPart = 2;
                }

            } else if (curr == 1 && onPart == 2) {
                fadeText(onPart);
                if (selectAll(".textFade3").style("opacity") > 0.5) {
                    onPart = 3;
                    something();
                }

            } else if (onPart == 3) {
                if (selectAll(".textFade4").style("opacity") == 1) {
                    onPart = 4;
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
                    setTimeout(() => { onPart = 5; }, delay)
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
                    setTimeout(() => { finish() }, delay2);
                }

            }
        }
    }
var loading = false;

window.addEventListener('wheel', handle);

var handle = function (e) { if (!loading) { loading = true; animationInstruct(e); loading = false } }
function animationInstruct(e) {
    if (e.deltaY > 0) {
        //scroll down

        if (onPart == 0) {
            if (selectAll(".textFade1").style("opacity") == 1) {
                onPart = 1;
            }
        }
        if (curr == 1 && onPart == 1) {
            fadeText(onPart);
            if (selectAll(".textFade2").style("opacity") == 1) {
                setTimeout(() => { onPart = 2 }, delay);
            }

        } else if (curr == 1 && onPart == 2) {
            fadeText(onPart);
            if (selectAll(".textFade3").style("opacity") > 0.5) {
                onPart = 3;
                something();
            }

        } else if (onPart == 3) {
            if (selectAll(".textFade4").style("opacity") == 1) {
                onPart = 4;
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
                setTimeout(() => { onPart = 5; }, delay)
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
                setTimeout(() => { finish() }, delay2);
            }

        }

    } else if (e.deltaY < 0) {
        console.log("boi");
        goBack();
    }


}


function enable(_callback) {
    // do some asynchronous work
    // and when the asynchronous stuff is complete
    canGo = false;
    $.scrollify.enable();
    _callback();
}

var goBack = function () {
    if (canGo) {
        enable(function () {
            $.scrollify.previous();
            console.log(curr);
        });
        setTimeout(function () {
            canGo = true;
        }, 1000)
    } else {
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
}

var something = (function () {
    if (canGo) {
        canGo = false;
        $.scrollify.enable();
        setTimeout(function () {
            canGo = true;
        }, 1000)
    } else {
    }
})


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
    if (index == 0) {
        $.scrollify.enable();
    }
    if (index == 1) {
        selectAll(".textFade1")
            .classed("m-fadeIn", true)
            .classed("m-fadeOut", false);
        selectAll('.point')  //here's how you get all the nodes
            .each(function (d) {
                var vary = (Math.random() * (1.5) + 1) + "s";
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
        onPart = 4;
        $.scrollify.destroy();
        cleanup();
    }

}

function cleanup() {
    canGo = false;
    window.removeEventListener("window", handle);
    document.getElementsByTagName("body")[0].style = "overflow: visible !important;";
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