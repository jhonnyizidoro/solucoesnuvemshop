const lazyLoad = () => {
	const images = document.querySelectorAll('[data-src]')
	images.forEach(image => new IntersectionObserver(observables => {
		observables.forEach(observable => {
			observable.isIntersecting && (observable.target.src = observable.target.dataset.src)
		})
	}).observe(image))
}

const maskInputs = () => {
	const inputs = document.querySelectorAll('[data-mask]')
	inputs.forEach(input => {
		if (input.dataset.mask === 'phone') {
			input.addEventListener('input', () => {
				const number = input.value.replace(/\D/g, '')
				const telephonePattern = '(99) 9999-9999'
				const cellphonePattern = '(99) 9 9999-9999'
				if (number.length > 10) {
					VMasker(input).unMask()
					VMasker(input).maskPattern(cellphonePattern)
					input.value = VMasker.toPattern(number, cellphonePattern)
				} else {
					VMasker(input).unMask()
					VMasker(input).maskPattern(telephonePattern)
					input.value = VMasker.toPattern(number, telephonePattern)
				}
			})
		}
	})
}

const scrollOnClick = () => {
	const triggers = document.querySelectorAll('[data-target]')
	triggers.forEach(trigger => {
		trigger.addEventListener('click', () => {
			document.getElementById(trigger.dataset.target).scrollIntoView()
		})
	})
}

const whatsappContact = () => {
	const triggers = document.querySelectorAll('[data-whatsapp]')
	const endpoint = window.innerWidth < 1200 ? 'https://api.whatsapp.com' : 'https://web.whatsapp.com'
	triggers.forEach(trigger => {
		const phone = trigger.dataset.whatsapp
		trigger.addEventListener('click', () => {
			window.open(`${endpoint}/send?phone=55${phone}&text=Olá, estou no seu site e gostaria de mais informações`)
		})
	})
}

const hamburgerMenu = () => {
	const hamburger = document.querySelector('.hamburger')
	const navLinks = document.querySelector('.nav__links')
	Array.from([hamburger, navLinks]).forEach(trigger => {
		trigger.addEventListener('click', () => {
			hamburger.classList.toggle('hamburger--active')
			navLinks.classList.toggle('nav__links--active')
		})
	})
}

document.addEventListener('DOMContentLoaded', () => {
	lazyLoad()
	maskInputs()
	scrollOnClick()
	whatsappContact()
	hamburgerMenu()
})