import { scrollify } from "jquery-scrollify";
import { select } from "d3-selection";
import { selectAll } from "d3-selection";
import "d3-transition";
var $ = require("jquery");

var curr = 0;
var onPart = 0;
var canGo = true;
var delay = 500;
var delay2 = 2000;
var loading = false;
let touchstartX = 0;
let touchstartY = 0;
let touchendX = 0;
let touchendY = 0;

if (window.screen.width < 750) {
  delay = 1500;
  delay2 = 5000;
}

$(window).on("load", function () {
  setTimeout(function () {
    $(window).scrollTop(0);
    onPart = 0;
  });
});

function scrollify_init() {
  $.scrollify({
    section: ".snap",
    interstitialSection: "",
    easing: "easeOutExpo",
    scrollSpeed: 1200,
    offset: 0,
    scrollbars: false,
    standardScrollElements: "",
    setHeights: false,
    overflowScroll: false,
    updateHash: false,
    touchScroll: true,
    before: function (index, sections) {
      before(index, sections);
    },
    after: function (index, sections) {
      after(index, sections);
      curr = index;
    },
    afterResize: function () {},
    afterRender: function () {
      $.scrollify.move(0);
      onPart = 0;
    },
  });
}

export default scrollify_init;

var fadegrey = (function () {
  var executed = false;
  return function () {
    if (!executed) {
      selectAll(".dis")
        .transition()
        .delay(1000)
        .style("transition", "2s")
        .style("color", "#FFFFFF")
        .style("background-color", "#D13938");
    }
  };
})();

var fadePoints = (function () {
  var executed = false;
  return function () {
    if (!executed) {
      executed = true;
      selectAll(".grey_point").each(function (d) {
        var vary = Math.random() * 3000 + 1000;
        select(this)
          .transition()
          .delay(vary)
          .duration(500)
          .attr("fill", "#ff073a")
          .transition()
          .duration(500)
          .attr("fill", "#FFFFFF");
      });
    }
  };
})();

var fadePoints2 = (function () {
  var executed = false;
  return function () {
    if (!executed) {
      executed = true;
      selectAll(".grey_point_2").each(function (d) {
        var vary = Math.random() * 3000 + 1000;
        select(this)
          .transition()
          .delay(vary)
          .duration(500)
          .attr("fill", "#FFFFFF");
      });
    }
  };
})();

var handle = function (e) {
  if (!loading) {
    loading = true;
    animationInstruct(e);
    loading = false;
  }
};

function enable(_callback) {
  // do some asynchronous work
  // and when the asynchronous stuff is complete
  if (curr == 3) {
    return 0;
  }
  canGo = false;
  $.scrollify.enable();
  _callback();
}

function jump(_callback) {
  // do some asynchronous work
  // and when the asynchronous stuff is complete
  selectAll(".makeInv").style("display", "none");
  _callback();
}
var goBack = function () {
  if (canGo) {
    enable(function () {
      $.scrollify.previous();
    });
    setTimeout(function () {
      canGo = true;
    }, 1000);
  } else {
  }
};

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

var nextSlide = function () {
  if (canGo) {
    canGo = false;
    $.scrollify.enable();
    setTimeout(function () {
      canGo = true;
    }, 1000);
  } else {
  }
};

var finish = (function () {
  var executed = false;
  return function () {
    if (!executed) {
      selectAll(".article").classed("fadeblack", false);
      executed = true;
      canGo = false;
      jump(function () {
        setTimeout(() => {
          enable(function () {
            onPart = 6;
            if (selectAll(".makeInv").style("display") == "none") {
              $.scrollify.instantMove(3);
              document.getElementsByClassName("article")[0].scrollIntoView();
              $.scrollify.disable();
            }
          });
        }, 100);
      });
    }
  };
})();

var touch = function (event) {
  touchstartX = event.changedTouches[0].screenX;
  touchstartY = event.changedTouches[0].screenY;
};

window.addEventListener("touchstart", touch, false);

var end = function (event) {
  touchendX = event.changedTouches[0].screenX;
  touchendY = event.changedTouches[0].screenY;
  handleGesture();
};

window.addEventListener("touchend", end, false);

function handleGesture() {
  if (touchendY >= touchstartY && onPart != 6) {
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
        nextSlide();
      }
    } else if (onPart == 3) {
      selectAll(".article").classed("fadeblack", true);

      if (selectAll(".textFade4").style("opacity") == 1) {
        onPart = 4;
      }
    } else if (curr == 2 && onPart == 4) {
      fadeText(onPart);

      fadegrey();

      fadePoints();

      if (selectAll(".dis").style("color") == "rgb(255, 255, 255)") {
        setTimeout(() => {
          onPart = 5;
        }, delay);
      }
    } else if (curr == 2 && onPart == 5) {
      fadeText(onPart);

      fadePoints2();

      if (selectAll(".textFade6").style("opacity") == 1)
        setTimeout(() => {
          onPart = 6;
          finish();
        }, delay2);
    } else {
      onPart = 6;
    }
  }
}

function animationInstruct(e) {
  if (e.deltaY > 0) {
    //scroll down

    if (onPart == 0) {
      if (selectAll(".textFade1").style("opacity") == 1) {
        onPart = 1;
      }
    } else if (curr == 1 && onPart == 1) {
      fadeText(onPart);

      if (selectAll(".textFade2").style("opacity") == 1) {
        setTimeout(() => {
          onPart = 2;
        }, delay);
      }
    } else if (curr == 1 && onPart == 2) {
      fadeText(onPart);

      if (selectAll(".textFade3").style("opacity") > 0.5) {
        onPart = 3;
        nextSlide();
      }
    } else if (onPart == 3) {
      if (selectAll(".textFade4").style("opacity") == 1) {
        onPart = 4;
      }
    } else if (curr == 2 && onPart == 4) {
      fadeText(onPart);

      fadegrey();

      selectAll(".article").classed("fadeblack", true);

      fadePoints();

      if (selectAll(".dis").style("color") == "rgb(255, 255, 255)") {
        setTimeout(() => {
          onPart = 5;
        }, delay);
      }
    } else if (curr == 2 && onPart == 5) {
      fadeText(onPart);

      fadePoints2();

      if (selectAll(".textFade6").style("opacity") == 1) {
        setTimeout(() => {
          onPart = 6;
          finish();
        }, delay2);
      }
    } else {
      onPart = 6;
    }
  } else if (e.deltaY < 0 && onPart != 6) {
    goBack();
  }
}

for (var i = 1; i < 8; i++) {
  selectAll(".textFade" + i)
    .classed("m-fadeIn", false)
    .classed("m-fadeOut", true);
}

window.addEventListener("wheel", handle);

function before(index, sections) {
  for (var i = 1; i < 8; i++) {
    selectAll(".textFade" + i)
      .classed("m-fadeIn", false)
      .classed("m-fadeOut", true);
  }
}

function after(index, sections) {
  if (index == 0) {
    $.scrollify.enable();
  }

  if (index == 1) {
    selectAll(".textFade1")
      .classed("m-fadeIn", true)
      .classed("m-fadeOut", false);
    selectAll(".point") //here's how you get all the nodes
      .each(function (d) {
        var vary = Math.random() * 1.5 + 1 + "s";
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
    $.scrollify.disable();
  }

  if (index == 3) {
    $.scrollify.disable();
    $.scrollify.destroy();
    selectAll(".remove").classed("snap", false);

    window.removeEventListener("wheel", handle);
    window.removeEventListener("wheel", animationInstruct);
    window.removeEventListener("touchstart", touch);
    window.removeEventListener("touchend", end);
    cleanup();
  }
}

function cleanup() {
  document.getElementsByTagName("body")[0].style =
    "overflow: visible !important;";
  document.getElementsByTagName("body")[0].style = "background-color:white;";
  selectAll(".grey_point") //here's how you get all the nodes
    .attr("fill", "#FFFFFF");
  selectAll(".grey_point_2").attr("fill", "#FFFFFF");
  selectAll(".textFade6").classed("m-fadeIn", true).classed("m-fadeOut", false);
  selectAll(".textFade7").classed("m-fadeIn", true).classed("m-fadeOut", false);
  if (selectAll(".snap").style("height") == "1500px") {
    selectAll(".snap").style("remove", "1100px");
  }
}
