//= require_tree .

/**
 * Currency switcher for pricing table
 */
$('.js-currencyswitcher').on('change', function(e) {
	var index = $(e.target).parent().index();
	$('.pricing__price__container').css({transform: 'translateY('+ index * -1 +'em)'});
	if (typeof Storage !== "undefined") {
		localStorage.setItem("currency", ($(e.target).val() == 'euro') ? 'EUR' : 'USD');
	}
});
/**
 * Slider for pricing table premium plans
 */
$('.js-userrange').each(function(i, elem) {
	$(this).userrange({
		outputElement: $(this).parents('.pricing__product').find('output.js-userrange__users span'),
		featuresElements: $(this).parents('.pricing__product').find('.pricing__features'),
		priceElements: $(this).parents('.pricing__product').find('.pricing__price__container'),
		titleElements: $(this).parents('.pricing__product').find('.pricing__header'),
		selectorsElements: $(this).parents('.pricing__product').find('.pricing__selectors')
	});
});
/**
 * Keep track of currency in cookie
 */
$('.pricing-form').each(function(i, elem) {
	if (localStorage.getItem("currency") == 'USD') {
		$(elem).find("input[name=currency]:last").attr('checked', 'checked');
		$('.pricing__price__container').css({transform: 'translateY(-1em)'});
	}
});
/**
 * Navigation
 */
$('.nav-main').responsiveMenu();

$('.js-menu').on('click', function(e) {
	$(this).parent().toggleClass('is-active');
});
$('.js-accordion').on('click', function(e) {
	$(e.target).toggleClass('is-active');
});
$('body').formatElements();


/**
 * Social share buttons
 */
$('.js-social-popup').on('click', function(e) {
	e.preventDefault();
	sTop = window.screen.height/2-(218);
	sLeft = window.screen.width/2-(313);
	win = window.open(this.href,'sharer','toolbar=0,status=0,resizable=0,location=0,width=626,height=256,top='+sTop+',left='+sLeft);
});

/**
 * Sliders
 */
$('.js-slider').each(function(i, elem) {
	var sliderImage = $('.slider__images', this),
		sliderText = $('.slider__text', this);


	$('.slider__images', this).slick({
		asNavFor: sliderText,
		dots: false,
		arrows: false,
		prevArrow: '<a href="#" class="slick-prev">',
		nextArrow: '<a href="#" class="slick-next">',
		speed: 600,
		appendArrows: sliderImage[0],
		appendDots: sliderImage[0]
	});
	$('.slider__text', this).slick({
		asNavFor: sliderImage,
		dots: true,
		appendDots: sliderText[0],
		arrows: false,
		speed: 800,
		// cssEase: 'cubic-bezier(0.680, -0.550, 0.305, 1.275)'
	});
});

/**
 * Sliders
 */
$('.js-slider-testimonials').each(function(i, elem) {
	var sliderImage = $('.slider__images', this),
		sliderText = $('.slider__text', this),
		sliderClient = $('.slider__client', this);


	$('.slider__images', this).slick({
		asNavFor:  [sliderText,sliderClient],
		dots: false,
		arrows: false,
		prevArrow: '<a href="#" class="slick-prev">',
		nextArrow: '<a href="#" class="slick-next">',
		speed: 600,
		appendArrows: sliderImage[0],
		appendDots: sliderImage[0]
	});
	$('.slider__text', this).slick({
		asNavFor:  [sliderClient,sliderImage],
		dots: false,
		appendDots: sliderText[0],
		arrows: false,
		speed: 800,
		// cssEase: 'cubic-bezier(0.680, -0.550, 0.305, 1.275)'
	});
	$('.slider__client', this).slick({
		asNavFor: [sliderText,sliderImage],
		dots: true,
		appendDots: sliderClient[0],
		arrows: false,
		speed: 800,
		// cssEase: 'cubic-bezier(0.680, -0.550, 0.305, 1.275)'
	});
});

$('.signup-form').each(function() {
	new SignupForm(this, {
		buttonText: $(this).data('buttonText'),
		redirect: $(this).data('redirect'),
		trackUrl: '/forms/signup-for-trial',
		trackTitle: 'Sign-up for Trial'
	});
});

$('.mailing-form').each(function() {
	new MailingForm(this, {
		buttonText: $(this).data('buttonText'),
		redirect: $(this).data('redirect'),
		trackUrl: '/forms/mailing',
		trackTitle: 'Mailing Form'
	});
});

$('.uniqleads-form').each(function() {
	new NotificareForm(this, {
		type: $(this).data('type'),
		redirect: $(this).data('redirect'),
		trackUrl: '/forms/' + $(this).data('type'),
		trackTitle: 'Notificare Form for ' + $(this).data('type'),
		values: $(this).data('values')
	});
});


$('.signup-for-plan-form-button').click(function(e) {
	e.preventDefault();

	function validateEmail(email) {
		var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
		return re.test(email);
	}

	// Get some values from elements on the page:
	var $form = $('.signup-forplan-form'),
		firstName = $form.find("input[name='firstname']").val(),
		lastName = $form.find("input[name='lastname']").val(),
		country = $form.find("select[name='country']").val(),
		company = $form.find("input[name='company']").val(),
		telephone = $form.find("input[name='telephone']").val(),
		pass1 = $form.find("input[name='pass']").val(),
		pass2 = $form.find("input[name='pass2']").val(),
		email = $form.find("input[name='email']").val(),
		plan = $form.find("input[name='plan']").val(),
		planMapping = {rich:'Rich', geo:'Geo', start:'Awesome', more:'Brutal', force:'Cool'};

	$(e.target).attr('disabled', true);
	$(e.target).text('Creating account... please wait');
	$(".msg").hide();
	$(".msg").removeClass("error");

	if(email && firstName && lastName && country && company && pass1 && pass2){

		if (pass1 != pass2) {
			$(".msg").addClass("error");
			$(".msg").html('Passwords don\'t match');
			$(".msg").show();
			setTimeout(function(){
				$(".msg").fadeOut();
			}, 5000);
			$(e.target).attr('disabled', false);
			$(e.target).text('Create your account');
		} else if (pass1.length < 8) {
			$(".msg").addClass("error");
			$(".msg").html('Password is too small. Insert at least 8 chars.');
			$(".msg").show();
			setTimeout(function(){
				$(".msg").fadeOut();
			}, 5000);
			$(e.target).attr('disabled', false);
			$(e.target).text('Create your account');
		} else if (pass1.match(':')) {
			$(".msg").addClass("error");
			$(".msg").html('Use of illegal character colon. Please remove any ":" from your password.');
			$(".msg").show();
			setTimeout(function(){
				$(".msg").fadeOut();
			}, 5000);
			$(e.target).attr('disabled', false);
			$(e.target).text('Create your account');
		} else if (!validateEmail(email)) {
			$(".msg").addClass("error");
			$(".msg").html( 'Not a valid email address' );
			$(".msg").show();
			$(e.target).attr('disabled', false);
			$(e.target).text('Create your account');
			setTimeout(function(){
				$(".msg").fadeOut();
			}, 5000);
		} else {
			var request = $.ajax({
				url: Config.dashboardAPI + "/accounts",
				type: "POST",
				data: JSON.stringify({account: {
					name: firstName + ' ' + lastName,
					email: email,
					password: pass1,
					plan: planMapping[plan],
					billing_info: {
						company: company,
						first_name: firstName,
						last_name: lastName,
						country: country,
						phone: telephone
					},
					preferences:{
						currency: localStorage.getItem('currency') || 'EUR'
					}
				}}),
				contentType: "application/json; charset=utf-8",
				dataType: "json"
			});

			request.done(function( msg ) {
				if (typeof ga == 'function') {
					ga('send', 'pageview', {page: '/forms/signup-for-plan', title: 'Sign-up for Plan'});
				}
				if (typeof goog_report_conversion == 'function') {
					goog_report_conversion();
				}
				$(".msg").removeClass("error");
				$(".msg" ).html('Account created successfully. Please check your mail box. We have sent you an activation link to confirm your interest in this account and start your free 30 day trial.');
				$(".msg").show();
				setTimeout(function() {
					$(".msg").fadeOut();
				}, 8000);
				$(e.target).attr('disabled', false);
				$(e.target).text('Create your account');
				$form.find("input[name='firstname'], input[name='lastname'], input[name='telephone'], input[name='pass1'], input[name='pass2'], input[name='email'], input[name='company']").val('');
			});

			request.fail(function( jqXHR, textStatus ) {
				$( ".msg").addClass("error");
				$( ".msg" ).html( jqXHR.responseJSON.errors);
				$( ".msg").show();
				setTimeout(function() {
					$(".msg").fadeOut();
				}, 5000);
				$(e.target).attr('disabled', false);
				$(e.target).text('Create your account');
			});
		}

	} else {
		$( ".msg").addClass("error");
		$( ".msg" ).html( 'Please insert all mandatory fields' );
		$( ".msg").show();
		setTimeout(function(){
			$(".msg").fadeOut();
		}, 5000);
		$(e.target).attr('disabled', false);
		$(e.target).text('Create your account');
	}

});

/**
 * Tour scroller
 */
$('.js-hijacker').each(function(index, element) {
	new Tour(element, {
		initialScrollDuration: 200,
		scrollDuration: 1000,
		nextButtonClass: 'next-step-tour',
		stepElementIdPrefix: 'step',
		animationEffect: 'swing'
	});
});

/**
 * Notificare HTML5 SDK
 */
$('body').each(function(i, elem) {

	var options = {
		appVersion: '1.1.0',
		appKey: 'b3076f1c7ebd24ff283888ffe317e72a92a8e85516bed29f4f8d3e6eb8a65f83',
		appSecret: 'cb3e338f219b251afeb10e80588a9095247e7b008cdd765e8dcdd17de4aabc9a',
		allowSilent: true,
		//soundsDir: '/resources/sounds/',
		geolocationOptions: {
			timeout: 60000,
			enableHighAccuracy: true,
			maximumAge: Infinity
		}
	};

	var instance = $('body').uniqleads(options);

	$('body').bind("uniqleads:onReady", function(event, data) {
		instance.uniqleads("registerForNotifications");
	});

	$('body').bind("uniqleads:didReceiveDeviceToken", function(event, data) {
		instance.uniqleads("registerDevice",data);
	});

	$('body').bind("uniqleads:didRegisterDevice", function(event, data) {
		//Here it's safe to register tags
		instance.uniqleads("addTags", ["tag_blog"], function(tags){
			//console.log(tags);
		}, function(error){
			console.log(error);
		});
		instance.uniqleads("startLocationUpdates", function(data){
			if(data && data.country && $('select[name=country]')){
				$('select[name=country]').val(data.country);
				$('select[name=country]').next().html($('select[name=country] :selected').text());
			}
		}, function(error){
			console.log(error);
		});

		$('.signup-for-plan-form-button').on('click', function(e) {
			instance.uniqleads("addTags", ["tag_signup"], function(tags){
				//console.log(tags);
			}, function(error){
				console.log(error);
			});
		});

	});

	$('body').bind("uniqleads:didFailToRegisterDevice", function(event, data) {
		instance.uniqleads("registerDevice", data);
	});

	$('body').bind("uniqleads:didReceiveNotification", function(event, data) {

		//instance.uniqleads("log", data.alert);
	});

	$('body').bind("uniqleads:didOpenNotification", function(event, data) {
		//instance.uniqleads("log", data.message);
	});

});