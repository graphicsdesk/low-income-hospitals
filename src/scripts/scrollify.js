
import scrollify from "jquery-scrollify";
import {select} from "d3-selection";
import {selectAll} from "d3-selection";

var $ = require('jquery');

$(function() {
    $.scrollify({
    section : ".snap",
    interstitialSection : "",
    easing: "easeOutExpo",
    scrollSpeed: 1100,
    offset : 0,
    scrollbars: false,
    standardScrollElements: "",
    setHeights: true,
    overflowScroll: true,
    updateHash: true,
    touchScroll:true,
    before:function() {},
    after:function(index, sections){ checkInstant(index,sections) },
    afterResize:function() {},
    afterRender:function() {}
    });
  });
  
  function checkInstant(index, sections) {
    if (index > 0) {
        //$.scrollify.instantNext();
    }
    if (index == 1) {
      selectAll(".textFade")
      .classed("m-fadeIn", true);
      selectAll(".textFade")
      .classed("m-fadeOut", false);
    }
  }