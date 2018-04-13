import hoverPerspectiveAnimation from './hoverPerspectiveAnimation'

function initialAnimation() {
	TweenMax.set('#firstCard .card-cta', { rotationX: '-170deg', autoAlpha: 0, transformOrigin: 'top' })
	TweenMax.set('#firstCard .card-leftHalf', { rotationY: '-170deg', autoAlpha: 0, transformOrigin: 'right' })
	TweenMax.set('#firstCard', {x: '-25%', y: '-50vh', autoAlpha: 0, transformOrigin: 'center'}) 

	TweenMax.to('#firstCard', .6, { delay: .3, x: '-25%', y: '0vh', autoAlpha: 1, onComplete: function(){
			TweenMax.to('#firstCard', .5, { x: '0%', y: '0vh', scaleX: 1, autoAlpha: 1,  onComplete: flipCardVertical() })
		} 
	})

	function flipCardVertical() {
		
		TweenMax.to('#firstCard .card-cta', .6, {
			rotationX: '0deg', autoAlpha: 1, delay: .2, onComplete: flipCardHorizontal()
		})

	}
	function flipCardHorizontal() {
		TweenMax.to('#firstCard .card-leftHalf', .6, {
			rotationY: '0deg', autoAlpha: 1, delay: .4, onComplete: setTimeout(hoverPerspectiveAnimation, 1100)
		})
	}

}

export {
	initialAnimation
};

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
