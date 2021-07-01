$(function () {

	window.onload = function () {
		document.body.classList.add('loaded_hiding');
		window.setTimeout(function () {
			document.body.classList.add('loaded');
			document.body.classList.remove('loaded_hiding');
		}, 500);
	}

	$('.header__btn').on('click', function () {
		$('.header__btn').toggleClass('header__btn--active');
		$('.header__link').toggleClass('header__link--active');
		$('.header__list').toggleClass('header__list--active');
	});

	$(".header__link").on("click", function (event) {
		event.preventDefault();
		var id = $(this).attr('href'),
			top = $(id).offset().top;
		$('body,html').animate({ scrollTop: top }, 1500);
	});

	window.addEventListener('scroll', function () {
		let header = document.querySelector('header');
		let windowPosition = window.scrollY > 0;
		header.classList.toggle('scrolling-active', windowPosition);
	})

	$(window).scroll(function () {
		$('.central__link-icon').toggleClass('central__link-icon--active', $(this).scrollTop() > 0);
	});

	$('.central__slider').slick({
		slidesToShow: 1,
		slidesToScroll: 1,
		fade: true,
		speed: 500,
		dots: true,
		infinite: true,
		autoplay: true,
		autoplaySpeed: 3000,
		responsive: [
			{
				breakpoint: 1201,
				settings: {
					arrows: false,
				}
			}
		]
	});

	var mixer = mixitup('.portfolio__items', {
		animation: {
			duration: 500,
			nudge: false,
			reverseOut: false,
			effects: "fade"
		}
	});

	var errorTxt = 'Ошибка отправки';
	jQuery("#sendform").validate({
		submitHandler: function (form) {
			var form = document.forms.sendform,
				formData = new FormData(form),
				xhr = new XMLHttpRequest();

			xhr.open("POST", "send.php");

			xhr.onreadystatechange = function () {
				if (xhr.readyState == 4) {
					if (xhr.status == 200) {
						document.getElementById('sendform').reset();
						var element = document.getElementById("contacts__file-return");
						element.classList.add("contacts__file-return--passive");
						$('.contacts__pop-up').addClass('contacts__pop-up--active');
					}
				}
			};
			xhr.send(formData);
		}
	});

	$('.contacts__file').on('click', function () {
		$('.contacts__file-return').removeClass('contacts__file-return--passive');
	});

	$('.contacts__close').on('click', function () {
		$('.contacts__pop-up').removeClass('contacts__pop-up--active');
	});

	var fileInput = document.querySelector(".contacts__file"),
		button = document.querySelector(".contacts__file-trigger"),
		the_return = document.querySelector(".contacts__file-return");

	button.addEventListener("keydown", function (event) {
		if (event.keyCode == 13 || event.keyCode == 32) {
			fileInput.focus();
		}
	});
	button.addEventListener("click", function (event) {
		fileInput.focus();
		return false;
	});
	fileInput.addEventListener("change", function (event) {
		the_return.innerHTML = this.value;
	});

});