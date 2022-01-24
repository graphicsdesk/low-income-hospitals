import enterView from 'enter-view';
import textBalancer from 'text-balancer';
import { USE_COVER_HED, USE_EYE_NAV } from '../config.json';
import './scripts/page';
import './scripts/scrollify';
import { selectAll } from 'd3-selection';
import initiatePage from './scripts/page';
import { intersectTop } from './scripts/utils';
import { spectate as spectateConfig } from '../package.json';

var $ = require('jquery');

$(document).ready(function () {
  console.log("hi")
  selectAll('.point') 
    .style("opacity", "0")

  selectAll('.grey_point')  
    .attr("fill", "#D13938")
});



// Main page initiation

initiatePage();

// Fade in navbar at scroll trigger

const navbar = document.getElementById('navbar');

if (USE_EYE_NAV || USE_COVER_HED) {
  intersectTop({
    node: document.getElementById('headline'),
    onEnter: () => {
      navbar.classList.remove('only-eye-logo');
      navbar.classList.remove('hide-news-navbar');
    },
    onExit: () => {
      navbar.classList.remove('show-nav-links');
      navbar.classList.add('only-eye-logo');
      navbar.classList.add('hide-news-navbar');
    },
  });
}

// Mobile navbar hamburger trigger

export function hamburgerTrigger() {
  navbar.classList.toggle('show-nav-links');
}

// Text balance headline, deck, and image captions

if (window.innerWidth <= 460) {
  textBalancer.balanceText('#headline, .deck, .image-caption-text');
}
