function hoverPerspectiveAnimation() {
	const cards = document.querySelectorAll('.card');

	let mouseOutTween;// set on mouse-out

	TweenMax.set(cards, { transformPerspective: 800, transformStyle: "preserve-3d" });

	cards.forEach((el) => {
		el.addEventListener('click', function (e) {
			let rect = el.getBoundingClientRect(),
				x = e.clientX - rect.left,
				y = e.clientY - rect.top,
				hit = { x: x, y: y, radius: 1, autoAlpha: 1 };

			TweenMax.to(hit, 0.5, { radius: 200, autoAlpha: 0, ease: Power1.easeOut });

		});

		el.addEventListener('mousemove', function (e) {
			let rect = el.getBoundingClientRect(),
				x = e.clientX - rect.left,
				y = e.clientY - rect.top,
				rx = -(y / rect.height) + 0.5,
				ry = (x / rect.width) - 0.5,
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

	let observerOptions = {
		root: null,
		rootMargin: "0px",
		threshold: [0.0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1.0]
	};

	const observer = new IntersectionObserver(intersectionCallback, observerOptions);

	cards.forEach( (card) => {
		observer.observe(card)
		// TweenMax.set(card, { delay: .6, rotationY: 15, rotationX: 15 })
	})

	let prevRatio = 0.0;

	function intersectionCallback(entries) {
		// entries.forEach(function (entry) {
		// 	console.log(box, entry.intersectionRatio);
		// 	if (entry.intersectionRatio > 0) {
		// 		TweenLite.to(".card", { rotationY: 10, rotationX: 10 });
		// 	}
		// });
		entries.forEach(function (entry) {
			let box = entry.target;
			// console.log(box);
			if (entry.intersectionRatio > 0) {
				TweenMax.to(box, .6, { autoAlpha: 1 })
			}
			else {
				TweenMax.set(box, { autoAlpha: 0})
			}
			if (entry.intersectionRatio > prevRatio && entry.intersectionRatio < .9) {
				// console.log('in view', entry.intersectionRatio);
				TweenMax.to(box, 1, { rotationX: `${entry.intersectionRatio * 10}deg` /*, rotationX: `${-entry.intersectionRatio * 10}deg` */, ease: Power1.easeIn})
				// box.style = `transform: rotateX(${ (-entry.intersectionRatio * 15).toFixed(2) }deg) rotateY(${ (entry.intersectionRatio * 15).toFixed(2) }deg)`
			}
			else {
				// console.log('out of view', entry.intersectionRatio);
				TweenMax.to(box, 1, { rotationX: `${-entry.intersectionRatio * 10}deg` /*, rotationX: `${entry.intersectionRatio * 10}deg`} */, ease: Power1.easeIn})
				// box.style = `transform: rotateY(${(-entry.intersectionRatio * 15).toFixed(2)}deg) rotateX(${(entry.intersectionRatio * 15).toFixed(2)}deg)`

			}
			if (entry.intersectionRatio >= .9) {
				TweenMax.to(box, 1, { rotationY: 0, rotationX: 0 })
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

export default hoverPerspectiveAnimation;


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
