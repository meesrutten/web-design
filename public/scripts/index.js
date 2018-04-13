(function(){function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s}return e})()({1:[function(require,module,exports){
'use strict';

var _initialAnimation = require('./initialAnimation');

var _backgroundAnimation = require('./backgroundAnimation');

var _backgroundAnimation2 = _interopRequireDefault(_backgroundAnimation);

var _cardAnimation = require('./cardAnimation');

var _cardAnimation2 = _interopRequireDefault(_cardAnimation);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// import servicehandler from './sw-handler';

// import hoverPerspectiveAnimation from './hoverPerspectiveAnimation';
(0, _backgroundAnimation2.default)();

// if (!localStorage.getItem('visited')) {
(0, _initialAnimation.initialAnimation)();

(0, _cardAnimation2.default)();

var links = document.querySelectorAll('a');
links.forEach(function (link) {
	if (link.textContent === '') {
		link.style = "display: none;";
	}
});
// 	localStorage.setItem('visited', true);
// }

// if (document.querySelectorAll('#black_stripe')[0]) {
// 	detailPageAnimation();
// }

// hoverPerspectiveAnimation();

},{"./backgroundAnimation":2,"./cardAnimation":3,"./initialAnimation":6}],2:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
var backgroundAnimation = function backgroundAnimation() {
	/*
 * Creates a background with 5 rectangles that rotate, 
 * scale and change in color intensity
 */
	var polygonBackground = document.querySelector('.background');

	polygonBackground.insertAdjacentHTML('beforeend', generatePolygonBackground());

	function generatePolygonBackground() {
		var WIDTH = polygonBackground.getBoundingClientRect().width;
		var HEIGHT = polygonBackground.getBoundingClientRect().height;
		var halfWidth = WIDTH / 2;
		var halfHeight = HEIGHT / 2;
		var rectWidth = WIDTH * .5;
		var rectHeight = HEIGHT * .5;
		return '\n\t\t\t\t<svg id="polygonHolder" viewBox="0 0 ' + WIDTH + ' ' + HEIGHT + '" preserveAspectRatio="xMinYMin meet" xmlns="http://www.w3.org/2000/svg">\n\t\t\t\t\t<rect x="' + -halfWidth / 2 + '" y="0" width="' + rectWidth + '" height="' + rectHeight + '"/>\n\t\t\t\t\t<rect x="' + halfWidth + '" y="0" width="' + rectWidth + '" height="' + rectHeight + '"/>\n\t\t\t\t\t<rect x="' + -halfHeight / 2 + '" y="' + -halfWidth / 2 + '" width="' + rectWidth + '" height="' + rectHeight + '"/>\n\t\t\t\t\t<rect x="' + halfHeight * 2 + '" y="' + -halfHeight / 2 + '" width="' + rectWidth + '" height="' + rectHeight + '"/>\n\t\t\t\t\t<rect x="' + halfHeight * 2 + '" y="' + halfHeight * 2 + '" width="' + rectWidth + '" height="' + rectHeight + '"/>\n\t\t\t\t</svg>\n\t\t';
	}

	var allPolygons = document.querySelectorAll('.background #polygonHolder rect');

	/**
  * Returns a random number between min and max
  * 
  * @param {Number} min 
  * @param {Number} max 
  * @returns {Number}
  */
	function getRandomArbitrary(min, max) {
		return Math.random() * (max - min) + min;
	}

	/**
  * Animate DOM elements to a new rotation and scale.
  * 
  * @param {Number} timestamp 
  */
	var start = null;
	var step = 0;
	var animationTime = 50; //24

	for (var i = 0; i < allPolygons.length; i++) {
		allPolygons[i].style = '\n\t\t\topacity: ' + getRandomArbitrary(0.05, 0.08).toFixed(2) + ';\n\t\t\ttransform: rotate(' + Math.round(getRandomArbitrary(15, 80)) + 'deg) scale(' + getRandomArbitrary(.75, 1.2).toFixed(2) + ');\n\t\t\t';
	}

	for (var _i = 0; _i < allPolygons.length; _i++) {
		TweenMax.to(allPolygons[_i], animationTime, {
			rotation: 45 + Math.round(getRandomArbitrary(-80, 80)) + 'deg',
			scale: getRandomArbitrary(.75, 1.2).toFixed(2),
			transformOrigin: 'center',
			repeat: -1,
			yoyo: true
		});
	}
	// function animatePolygonBackground(timestamp) {
	// 	if (!start) start = timestamp;
	// 	var progress = timestamp - start;
	// 	if (progress > step * animationTime) {
	// 		for (let i = 0; i < allPolygons.length; i++) {
	// 			allPolygons[i].style = `
	// 				transition-duration: ${animationTime}ms;
	// 				opacity: ${getRandomArbitrary(0.05, 0.08).toFixed(2)};
	// 				transform: rotate(${Math.round(getRandomArbitrary(15, 80))}deg) scale(${getRandomArbitrary(.75, 1.2).toFixed(2)});
	// 				`
	// 		}
	// 		step++
	// 	}

	// 	window.requestAnimationFrame(animatePolygonBackground)
	// }

	// window.requestAnimationFrame(animatePolygonBackground)
	/**
  * Remove the background and re-add
  * 
  * @param {element} polygonBackground
  */

	window.addEventListener('resize', function () {
		polygonBackground.querySelector('#polygonHolder').remove();
		polygonBackground.insertAdjacentHTML('beforeend', generatePolygonBackground());
	});
};

exports.default = backgroundAnimation;

},{}],3:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
// const textAnimation = function() {
// 	TweenMax.set(['.card h1', '.card p', ])
// }

var flipCard = function flipCard() {
	var buttons = document.querySelectorAll('.card-button');
	buttons.forEach(function (button) {
		button.addEventListener('click', transitionCard);
	});
	function transitionCard() {
		console.log('click');
		var target = event.target;
		var flipperCard = findAncestor(target, 'flipper');
		console.log(flipperCard);
		TweenMax.to(flipperCard, .3, { rotationY: '180deg' });
	}
	function findAncestor(el, cls) {
		while ((el = el.parentElement) && !el.classList.contains(cls)) {}
		return el;
	}
};

exports.default = flipCard;

},{}],4:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
function hoverPerspectiveAnimation() {
	var cards = document.querySelectorAll('.card');

	var mouseOutTween = void 0; // set on mouse-out

	TweenMax.set(cards, { transformPerspective: 800, transformStyle: "preserve-3d" });

	cards.forEach(function (el) {
		el.addEventListener('click', function (e) {
			var rect = el.getBoundingClientRect(),
			    x = e.clientX - rect.left,
			    y = e.clientY - rect.top,
			    hit = { x: x, y: y, radius: 1, autoAlpha: 1 };

			TweenMax.to(hit, 0.5, { radius: 200, autoAlpha: 0, ease: Power1.easeOut });
		});

		el.addEventListener('mousemove', function (e) {
			var rect = el.getBoundingClientRect(),
			    x = e.clientX - rect.left,
			    y = e.clientY - rect.top,
			    rx = -(y / rect.height) + 0.5,
			    ry = x / rect.width - 0.5,
			    rMax = 2;

			TweenMax.to(el, 0.1, { rotationX: rx * rMax, rotationY: ry * rMax });
		});

		el.addEventListener('mouseout', function () {
			if (mouseOutTween) mouseOutTween.kill();
			mouseOutTween = TweenMax.to(el, 0.25, { delay: 0.25, rotationX: 0, rotationY: 0 });
		});
	});

	// window.addEventListener("deviceorientation", handleOrientation, true);

	/**
  *  x: Represents the axis from West to East
  *	y: Represents the axis from South to North
  *	z: Represents the axis perpendicular to the ground
  * @param {*} e 
  */
	// function handleOrientation(e) {
	// 	let absolute = e.absolute;
	// 	let alpha = e.alpha;
	// 	let beta = e.beta; // X, In degree in the range [-180,180]
	// 	let gamma = e.gamma;// Y, In degree in the range [-90,90]

	// 	cards.forEach( (el) => {
	// 		let rect = el.getBoundingClientRect(),
	// 			x = e.beta - rect.left,
	// 			y = e.gamma - rect.top,
	// 			rx = -(y / rect.height) + 0.5,
	// 			ry = (x / rect.width) - 0.5,
	// 			rMax = 3;

	// 		TweenMax.to(el, 0.1, { rotationX: rx * rMax, rotationY: ry * rMax });
	// 	})
	// }


	// TweenLite.set(".card", { perspective: 800, transformStyle: "preserve-3d" });

	var observerOptions = {
		root: null,
		rootMargin: "0px",
		threshold: [0.0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1.0]
	};

	var observer = new IntersectionObserver(intersectionCallback, observerOptions);

	cards.forEach(function (card) {
		observer.observe(card);
		// TweenMax.set(card, { delay: .6, rotationY: 15, rotationX: 15 })
	});

	var prevRatio = 0.0;

	function intersectionCallback(entries) {
		// entries.forEach(function (entry) {
		// 	console.log(box, entry.intersectionRatio);
		// 	if (entry.intersectionRatio > 0) {
		// 		TweenLite.to(".card", { rotationY: 10, rotationX: 10 });
		// 	}
		// });
		entries.forEach(function (entry) {
			var box = entry.target;
			// console.log(box);
			if (entry.intersectionRatio > 0) {
				TweenMax.to(box, .6, { autoAlpha: 1 });
			} else {
				TweenMax.set(box, { autoAlpha: 0 });
			}
			if (entry.intersectionRatio > prevRatio && entry.intersectionRatio < .9) {
				// console.log('in view', entry.intersectionRatio);
				TweenMax.to(box, 1, { rotationX: entry.intersectionRatio * 10 + 'deg' /*, rotationX: `${-entry.intersectionRatio * 10}deg` */, ease: Power1.easeIn });
				// box.style = `transform: rotateX(${ (-entry.intersectionRatio * 15).toFixed(2) }deg) rotateY(${ (entry.intersectionRatio * 15).toFixed(2) }deg)`
			} else {
				// console.log('out of view', entry.intersectionRatio);
				TweenMax.to(box, 1, { rotationX: -entry.intersectionRatio * 10 + 'deg' /*, rotationX: `${entry.intersectionRatio * 10}deg`} */, ease: Power1.easeIn });
				// box.style = `transform: rotateY(${(-entry.intersectionRatio * 15).toFixed(2)}deg) rotateX(${(entry.intersectionRatio * 15).toFixed(2)}deg)`
			}
			if (entry.intersectionRatio >= .9) {
				TweenMax.to(box, 1, { rotationY: 0, rotationX: 0 });
				// box.style = `transform: rotateX(0deg) rotateY(0deg)`
			}
			prevRatio = entry.intersectionRatio;
		});
	}
	// function handleIntersect(entries, observer) {
	// 	entries.forEach(function (entry) {
	// 		if (entry.intersectionRatio > prevRatio) {
	// 			entry.target.style.backgroundColor = increasingColor.replace("ratio", entry.intersectionRatio);
	// 		} else {
	// 			entry.target.style.backgroundColor = decreasingColor.replace("ratio", entry.intersectionRatio);
	// 		}

	// 		prevRatio = entry.intersectionRatio;
	// 	});
	// }
}

exports.default = hoverPerspectiveAnimation;

// TweenMax.set('h2', { autoAlpha: 0, y: '-50%', scale: .5 })

// const animateVisible = function (guideHeader, ratio) {
// 	if (ratio > 0) {
// 		console.log(guideHeader.tagName, ratio)
// 		if (guideHeader.tagName === 'H2') {
// 			console.log('tag name is H2')
// 			TweenMax.to(guideHeader, 1, { autoAlpha: 1, y: '0%', scale: 1 })
// 		} else {
// 			TweenMax.to(guideHeader, 1, { autoAlpha: 1, y: '0%', scale: 1 })
// 		}
// 	} else {
// 		// NOT IN VIEW
// 		TweenMax.set(guideHeader, { autoAlpha: 0, y: '-50%', scale: .5 })
// 	}
// };

// // Setup the Intersection observer to watch the boxes we care about
// // and when they're in view fire the animation function 
// const guideHeaders = document.querySelectorAll('main section h2');
// const guideHeadersObserver = new IntersectionObserver((entries) => {
// 	return entries.forEach((e) => {
// 		animateVisible(e.target, e.intersectionRatio);
// 	});
// }, { threshold: 0.1 });

// for (const guideHeader of guideHeaders) {
// 	guideHeadersObserver.observe(guideHeader);
// 	// guideHeadersObserver.observe(guideHeader.closest('section'));
// }

},{}],5:[function(require,module,exports){
'use strict';

var _app = require('./app');

var _app2 = _interopRequireDefault(_app);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

},{"./app":1}],6:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.initialAnimation = undefined;

var _hoverPerspectiveAnimation = require('./hoverPerspectiveAnimation');

var _hoverPerspectiveAnimation2 = _interopRequireDefault(_hoverPerspectiveAnimation);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function initialAnimation() {
	TweenMax.set('#firstCard .card-cta', { rotationX: '-170deg', autoAlpha: 0, transformOrigin: 'top' });
	TweenMax.set('#firstCard .card-leftHalf', { rotationY: '-170deg', autoAlpha: 0, transformOrigin: 'right' });
	TweenMax.set('#firstCard', { x: '-25%', y: '-50vh', autoAlpha: 0, transformOrigin: 'center' });

	TweenMax.to('#firstCard', .6, { delay: .3, x: '-25%', y: '0vh', autoAlpha: 1, onComplete: function onComplete() {
			TweenMax.to('#firstCard', .5, { x: '0%', y: '0vh', scaleX: 1, autoAlpha: 1, onComplete: flipCardVertical() });
		}
	});

	function flipCardVertical() {

		TweenMax.to('#firstCard .card-cta', .6, {
			rotationX: '0deg', autoAlpha: 1, delay: .2, onComplete: flipCardHorizontal()
		});
	}
	function flipCardHorizontal() {
		TweenMax.to('#firstCard .card-leftHalf', .6, {
			rotationY: '0deg', autoAlpha: 1, delay: .4, onComplete: setTimeout(_hoverPerspectiveAnimation2.default, 1100)
		});
	}
}

exports.initialAnimation = initialAnimation;

// const io = new IntersectionObserver(
// 	entries => {
// 		console.log(entries);
// 	},
// 	{
// 		/* Using default options. Details below */
// 	}
// );


// // Start observing an element
// io.observe(document.querySelector('[data-type="timeline"]'));

// 	// Stop observing an element
// 	// io.unobserve(element);

// 	// Disable entire IntersectionObserver
// 	// io.disconnect();

},{"./hoverPerspectiveAnimation":4}]},{},[5]);
