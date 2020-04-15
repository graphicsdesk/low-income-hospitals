import enterView from 'enter-view';
import textBalancer from 'text-balancer';
import { USE_COVER_HED, USE_EYE_NAV } from '../config.json';
import './scripts/page';
import './scripts/scrollify';
import { select } from 'd3-selection';
import { selectAll } from 'd3-selection';
var $ = require('jquery');


$( document ).ready(function() {
    selectAll('.point')  //here's how you get all the nodes
    .style("opacity", "0")

    selectAll('.grey_point')  //here's how you get all the nodes
    .attr("fill", "#D13938")
});


// Fade in navbar at scroll trigger

const navbar = document.getElementById('navbar');

if (USE_COVER_HED || USE_EYE_NAV) {
  enterView({
    selector: USE_COVER_HED ? '.headline' : '.step-deck',
    offset: USE_COVER_HED ? 1 : 0.957,
    enter: () => {
      navbar.classList.remove('only-logo');
    },
    exit: () => {
      navbar.classList.remove('show-nav-links');
      navbar.classList.add('only-logo');
    },
  });
}

// Mobile navbar hamburger trigger

export function hamburgerTrigger() {
  navbar.classList.toggle('show-nav-links');
}

// Text balance headline, deck, and image captions

if (window.innerWidth <= 460) {
  textBalancer.balanceText('.headline, .deck, .image-overlay .image-caption-text');
}
