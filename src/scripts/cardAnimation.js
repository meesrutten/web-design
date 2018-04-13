// const textAnimation = function() {
// 	TweenMax.set(['.card h1', '.card p', ])
// }

const flipCard = function(){
	const buttons = document.querySelectorAll('.card-button');
	buttons.forEach( (button) => {
		button.addEventListener('click', transitionCard)
	})
	function transitionCard() {
		console.log('click');
		const target = event.target;
		const flipperCard = findAncestor(target, 'flipper');
		console.log(flipperCard);
		TweenMax.to(flipperCard, .3, {rotationY: '180deg'})
	}
	function findAncestor(el, cls) {
		while ((el = el.parentElement) && !el.classList.contains(cls));
		return el;
	}
}

export default flipCard;