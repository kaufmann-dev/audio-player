$(document).ready(function() {

	// IMG-CLICK
	$('.cover').click(function() {
		var clicks = $(this).data('clicks');
		if (clicks) {
			$('.fullsize-wrapper').css("background-color", "inherit");
			$('.fullsize-wrapper').css("pointer-events", "none");
			$(this).css("box-shadow", "none");
			$(this).css("position", "inherit");
			$(this).css("height", "70px");
			$(this).css("width", "70px");
		} else {
			$('.fullsize-wrapper').css("background-color", "#222");
			$('.fullsize-wrapper').css("pointer-events", "auto");
			$(this).css("box-shadow", "0px 0px 5px 0px rgba(255,255,255,1)");
			$(this).css("position", "fixed");
			$(this).css("height", "300px");
			$(this).css("width", "300px");
		}
		$(this).data("clicks", !clicks);
	});

	// INDEPENDENT
	$('input[type=range].volume').on('input', function () {
		let howl_name = $(this).parent().parent().parent().attr('id');
		let volume_value = $(this).val();

		if(volume_value == 0) {
			$('#' + howl_name + " img[src$='img/volume.png']").attr('src', 'img/volume_crossed.png');
			eval(howl_name + '.mute(true)');
		} else {
			$('#' + howl_name + " img[src$='img/volume_crossed.png']").attr('src', 'img/volume.png');
			eval(howl_name + '.mute(false)');

			eval(howl_name + '.volume(' + volume_value + ')');
			console.log(howl_name + '.volume(' + volume_value + ')');
		}
	});
	$('input[type=range].duration').on('input', function () {
		let howl_name = $(this).parent().parent().parent().attr('id');
		let duration_value = $(this).val();
		eval(howl_name + '.seek(' + duration_value + ')');
		console.log(howl_name + '.seek(' + duration_value + ')');

		$('#' + howl_name + ' .t1').html(UpdateT1(eval(howl_name + '.seek()')));
	});
	$("img[src$='img/download.png']").click(function() {
		let howl_name = $(this).parent().parent().parent().attr('id');
		window.open('mp3/' + howl_name + '.mp3', '_blank');
	});
	$("img[src$='img/stop.png']").click(function() {
		let howl_name = $(this).parent().parent().parent().attr('id');
		eval(howl_name + '.stop()');
		console.log(howl_name + '.stop()');

		$('#' + howl_name + " img[src$='img/pause.png']").attr('src', 'img/play.png');
	});
	$("img[src$='img/volume.png'], img[src$='img/volume_crossed.png']").click(function() {
		let howl_name = $(this).parent().parent().parent().attr('id');

		if($(this).attr('src') == 'img/volume.png') {
			$(this).attr('src', 'img/volume_crossed.png');
			eval(howl_name + '.mute(true)');
			console.log(howl_name + '.mute(true)');
		} else {
			$(this).attr('src', 'img/volume.png');
			eval(howl_name + '.mute(false)');
			console.log(howl_name + '.mute(false)');

			if($('#' + howl_name + ' input[type=range].volume').val() == 0) {
				$()
				eval(howl_name + '.volume(0.1)');
				$('#' + howl_name + ' input[type=range].volume').val(0.1);
			} else {
				eval(howl_name + '.volume(' + $('#' + howl_name + ' input[type=range].volume').val() + ')');
			}
		}
	});
	$("img[src$='img/play.png'], img[src$='img/pause.png']").click(function() {
		let howl_name = $(this).parent().parent().parent().attr('id');

		if($(this).attr('src') == 'img/play.png') {
			$(this).attr('src', 'img/pause.png');
			eval(howl_name + '.play()');
			console.log(howl_name + '.play()');
		} else {
			$(this).attr('src', 'img/play.png');
			eval(howl_name + '.pause()');
			console.log(howl_name + '.pause()');
		}
	});
	function UpdateT1(a) {
		a = Math.round(a);
		let a2 = JSON.stringify(Math.floor(a / 60));
		let a1 = JSON.stringify(a - a2 * 60);
		if (parseInt(a1) < 10) {a1 = "0" + a1}
		if (parseInt(a2) < 10) {a2 = "0" + a2}

		return a2 + ":" + a1;
	}
	function UpdateT2(b) {
		b = Math.round(b);
		let b2 = JSON.stringify(Math.floor(b / 60));
		let b1 = JSON.stringify(b - b2 * 60);
		if (parseInt(b1) < 10) {b1 = "0" + b1}
		if (parseInt(b2) < 10) {b2 = "0" + b2}

		return b2 + ":" + b1;
	}

	// SONG 1
	var everytime_we_touch_DU;
	var everytime_we_touch = new Howl({
		src: ['mp3/everytime_we_touch.mp3'],
		preload: true,
		autoplay: false,
		volume: 1,
		onload: function() {
			console.log($(this).parent().parent().parent());
			$('#everytime_we_touch .duration').attr('max', everytime_we_touch.duration());
			$('#everytime_we_touch .t2').html(UpdateT2(everytime_we_touch.duration()));
		},
		onplay: function() {
			everytime_we_touch_DU = setInterval(function(){
				$('#everytime_we_touch .duration').val(everytime_we_touch.seek());
				$('#everytime_we_touch .t1').html(UpdateT1(everytime_we_touch.seek()));
				console.log("Song-progress updated");
			},500);
		},
		onpause: function() {
			clearInterval(everytime_we_touch_DU);
		},
		onend: function() {
			$("#everytime_we_touch img[src$='img/pause.png']").attr('src', 'img/play.png');
			clearInterval(everytime_we_touch_DU);
			$('#everytime_we_touch .duration').val(everytime_we_touch.seek());
			$('#everytime_we_touch .t1').html(UpdateT1(everytime_we_touch.seek()));
		},
		onstop: function() {
			clearInterval(everytime_we_touch_DU);
			$('#everytime_we_touch .duration').val(everytime_we_touch.seek());
			$('#everytime_we_touch .t1').html(UpdateT1(everytime_we_touch.seek()));
		}
	});

	// SONG 2
	var rockefeller_street_DU;
	var rockefeller_street = new Howl({
		src: ['mp3/rockefeller_street.mp3'],
		preload: true,
		autoplay: false,
		volume: 1,
		onload: function() {
			console.log($(this).parent().parent().parent());
			$('#rockefeller_street .duration').attr('max', rockefeller_street.duration());
			$('#rockefeller_street .t2').html(UpdateT2(rockefeller_street.duration()));
		},
		onplay: function() {
			rockefeller_street_DU = setInterval(function(){
				$('#rockefeller_street .duration').val(rockefeller_street.seek());
				$('#rockefeller_street .t1').html(UpdateT1(rockefeller_street.seek()));
				console.log("Song-progress updated");
			},500);
		},
		onend: function() {
			$("#rockefeller_street img[src$='img/pause.png']").attr('src', 'img/play.png');
			clearInterval(rockefeller_street_DU);
			$('#rockefeller_street .duration').val(rockefeller_street.seek());
			$('#rockefeller_street .t1').html(UpdateT1(rockefeller_street.seek()));
		},
		onstop: function() {
			clearInterval(rockefeller_street_DU);
			$('#rockefeller_street .duration').val(rockefeller_street.seek());
			$('#rockefeller_street .t1').html(UpdateT1(rockefeller_street.seek()));
		}
	});

	// SONG 3
	var caramelldansen_DU;
	var caramelldansen = new Howl({
		src: ['mp3/caramelldansen.mp3'],
		preload: true,
		autoplay: false,
		volume: 1,
		onload: function() {
			console.log($(this).parent().parent().parent());
			$('#caramelldansen .duration').attr('max', caramelldansen.duration());
			$('#caramelldansen .t2').html(UpdateT2(caramelldansen.duration()));
		},
		onplay: function() {
			caramelldansen_DU = setInterval(function(){
				$('#caramelldansen .duration').val(caramelldansen.seek());
				$('#caramelldansen .t1').html(UpdateT1(caramelldansen.seek()));
				console.log("Song-progress updated");
			},500);
		},
		onend: function() {
			$("#caramelldansen img[src$='img/pause.png']").attr('src', 'img/play.png');
			clearInterval(caramelldansen_DU);
			$('#caramelldansen .duration').val(caramelldansen.seek());
			$('#caramelldansen .t1').html(UpdateT1(caramelldansen.seek()));
		},
		onstop: function() {
			clearInterval(caramelldansen_DU);
			$('#caramelldansen .duration').val(caramelldansen.seek());
			$('#caramelldansen .t1').html(UpdateT1(caramelldansen.seek()));
		}
	});
});