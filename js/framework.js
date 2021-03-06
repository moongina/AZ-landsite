// Overview

var initNavBtnLeft = function() {
	$(".img-swap-btn").click(function() {
		// Switch page
		idx = $(this).attr("id");
		$(".the-core").hide();
		$(".the-core#page"+idx).show();
		// Deal with color
		$(".nav-btn-right-upper circle").attr("fill","grey");
		$("circle").filter("#"+idx).attr("fill","orange");
	});
}

var initNavBtnRight = function() {
	$(".nav-btn-right-upper circle").click(function() {
		if ( $(this).attr("fill")=="grey" ) {
			// Switch page
			idx = $(this).attr("id");
			$(".the-core").hide();
			$(".the-core#page"+idx).show();
			// Deal with color
			$(".nav-btn-right-upper circle").attr("fill","grey");
			$(this).attr("fill","orange");
		}
	});
}

var initNavBtn = function() {
	initNavBtnLeft();
	initNavBtnRight();
}



// Page01

var movingBall = function(ball, speed) {
	var ball_field = ball.parent();
	var width = parseFloat( ball_field.css('width').split("px")[0] );
	var height = parseFloat( ball_field.css('height').split("px")[0] );

	var x = parseFloat( ball.css('left').split("px")[0] );
	var y = parseFloat( ball.css('top').split("px")[0] );

	// 限制最大变动
	if ( Math.abs(x)>width ) { x=0.42*width; }
	if ( Math.abs(y)>height ) { y=0.12*height; }

	var x_diff = x-0.42*width;
	var y_diff = y-0.12*height;

	var tempFunc = function( rnd ) {
		if (rnd<0.5) {
			return -2.0*rnd;
		} else {
			return 2.0*rnd;
		}
	}

	var step = 0.03;
	var x_delta = step * tempFunc( Math.random() ) * width;
	var y_delta = step * tempFunc( Math.random() ) * height;

	var x = x_delta+x_diff;
	var y = y_delta+y_diff;

	ball.animate(
		{
			left: "-=" + x + "px",
			top: "-=" + y + "px"
		},
		{
			duration: speed,
			complete: function() {
				movingBall($(this), speed);
			}
		}
	);
}

var initNavBtnBall = function() {
	$(".ball").click(function() {
		// Switch page
		idx = $(this).attr("id");
		$(".the-core").hide();
		$(".the-core#page"+idx).show();
		// Deal with color
		$(".nav-btn-right-upper circle").attr("fill","grey");
		$("circle").filter("#"+idx).attr("fill","orange");
	});
}

var initBall = function() {
	initNavBtnBall();
	movingBall($(".ball"), 10000);
}



// Page03

var people = [
	["01", "刘成", "Designer", "刘成", "小刘成.jpg", "大刘成.jpg"],
	["02", "黄子心", "General Manager", "黄子心", "小大爷.jpg", "大大爷.jpg"],
	["03", "戴玉婷", "Designer", "戴玉婷", "小婷婷.jpg", "大婷婷.jpg"],
	["04", "席欣", "Planning Director", "席欣", "小细心.jpg", "大细心.jpg"],
	["05", "袁月", "Operating Director", "袁月", "小袁月姐.jpg", "大袁月姐.jpg"],
	["06", "邱丹", "Administrator", "邱丹", "小邱丹.jpg", "大邱丹.jpg"],
	["07", "丁予", "Chief Designer", "丁予", "小钉子.jpg", "大钉子.jpg"]
];

var initPWP = function() {
	
	// Hard coding
	var size_small_image = 149;
	var placePWP = function() {
		var offset_y = $(window).height() * (0.1 + 0.8*0.1 + 0.8*0.8/2) - size_small_image/2;
		$('#page03-about-us').css("top", offset_y);
		var offset_x = ( $(window).width() * 8/12 - (4*149+189-2*15) )/2;
		$('#page03-about-us').css("left", offset_x);
	}
	placePWP();
	$(window).resize(function() {
		placePWP();
	});

	// PWP
	var nPeople = people.length;

	for ( i=0; i<nPeople*3; i++ ) {
		$(".page03-figure#ff").clone().appendTo(".page03-picture-frame");
		$($(".page03-figure")[i+1]).attr("id", people[i%nPeople][0]);
		$($(".page03-picture-small")[i+1]).css("background-image", 'url("images/people/' + people[i%nPeople][4] + '")');
		$($(".page03-the-large-picture img")[i+1]).attr("src", "images/people/" + people[i%nPeople][5]);
		$($($(".page03-the-title > div")[i+1]).children()[0]).html(people[i%nPeople][2]);
		$($($(".page03-the-title > div")[i+1]).children()[1]).html(people[i%nPeople][3]);
	}

	var refleshPF = function() {
		$('.page03-picture-small').css("display", "block");
		$('.page03-picture-large').css("display", "none");
		$(".page03-figure").css("display", "none");
		j = 0;
		for ( i=idx; i<nPeople*3; i++ ) {
			if (i<idx+nFigures) {
				$($(".page03-figure")[i+1]).css("display", "block");
				j = j + 1;
				if (j==3) {
					$($(".page03-figure")[i+1]).find('.page03-picture-small').css("display", "none");
					$($(".page03-figure")[i+1]).find('.page03-picture-large').css("display", "block");
				}
			}
		}
	};

	var nFigures = 5;
	var idx = nPeople;
	refleshPF();

	$("div#page03-about-us > div#prev").click(function() {
		idx -= 1;
		if (idx==1) {
			idx = nPeople;
		}
		refleshPF();
	});
	$("div#page03-about-us > div#next").click(function() {
		idx += 1;
		if (idx==15) {
			idx = nPeople + 1;
		}
		refleshPF();
	});
};



// page04

var cases = [
	["01", "成都城市品牌", "plan", 1],
	["02", "创意游成都", "plan", 1],
	["03", "成都72小时", "plan", 1],
	["04", "熊猫故乡网", "plan", 1],
	["05", "成都到此一游", "plan", 1],
	["06", "欢乐谷", "plan", 1],
	["07", "OCT运动嘉年华", "plan", 1],
	["08", "OCT帐篷音乐节", "plan", 1],
	["09", "峨眉山", "plan", 1],
	["10", "天府财富APP", "design", 2],
	["11", "天府财富鹰眼", "design", 1],
	["12", "汉堡王", "plan", 1],
	["13", "燕子沟景区", "plan", 1],
	["14", "燕子沟气泡酒店", "plan", 1],
	["15", "竹叶青茶", "plan", 1],
	["16", "美好食品", "plan", 1],
	["17", "月安", "design", 6],
	["18", "饭点", "design", 4],
	["19", "云归谷", "design", 6],
	["20", "卤味", "design", 5],
	["21", "煌上煌", "design", 7],
	["22", "白鹿原", "design", 1],
	["23", "酒店", "design", 5]
];

var initCoverPictures = function(nToShow) {
	
	var nCases = cases.length;

	for (i=0; i<nCases; i++) {

		txt = '<div class="col-md-4 page04-picture-frame" id="'+cases[i][0]+'" data-toggle="modal" data-target="#modal" style="display:none;"><img src="images/cases/'+cases[i][1]+'/page04-'+cases[i][1]+'-c.png" class="img-responsive"><img src="images/cases/'+cases[i][1]+'/page04-'+cases[i][1]+'-bw.png" class="img-responsive"></div>';
		$("#page04-cases").append(txt);

		$($(".page04-picture-frame")[i]).toggleClass(cases[i][2]);

		$($(".page04-picture-frame")[i]).addClass("toShow");
		if ( i<nToShow ) {
			$($(".page04-picture-frame")[i]).show();
		}
	}
}

var initTagControl = function(nToShow) {

	$(".page04-picture-tag").click(function() {

		console.log($(this).css("color"));
		if ( $(this).css("color")=="rgb(128, 128, 128)" ) {
			
			$(".page04-picture-tag").css("color", "rgb(128, 128, 128)");
			$(this).css("color", "rgb(255, 165, 0)");

			$(".page04-picture-frame").hide();

			$(".page04-picture-frame").removeClass("toShow");
			if ( $(this).attr("id")=="all" ) {

				$(".design").addClass("toShow");
				$(".plan").addClass("toShow");

				var nElements = $(".toShow").length;
				for (i=0; i<nElements; i++) {
					if (i<nToShow) {
						$($(".toShow")[i]).show();
					}
				}
			}
			if ( $(this).attr("id")=="plan" ) {
				$(".plan").addClass("toShow");

				var nElements = $(".toShow").length;
				for (i=0; i<nElements; i++) {
					if (i<nToShow) {
						$($(".toShow")[i]).show();
					}
				}
			}
			if ( $(this).attr("id")=="design" ) {
				$(".design").addClass("toShow");

				var nElements = $(".toShow").length;
				for (i=0; i<nElements; i++) {
					if (i<nToShow) {
						$($(".toShow")[i]).show();
					}
				}
			}
		}
	});
}

var initFlipControl = function(nToShow) {

	// 按钮功能

	var currentFrame = 1;

	$(".page04-middle-column#next").click(function() {

		var nElements = $(".toShow").length;
		var nPicFrames = Math.ceil(nElements/nToShow);

		if ( (currentFrame+1)<=nPicFrames ) {
			currentFrame += 1;
		} else {
			currentFrame = 1;
		}

		$(".page04-picture-frame").hide();
		for (i=(currentFrame-1)*nToShow; i<nElements; i++) {
			if (i<currentFrame*nToShow) {
				$($(".toShow")[i]).show();
			}
		}
	});

	$(".page04-middle-column#prev").click(function() {

		var nElements = $(".toShow").length;
		var nPicFrames = Math.ceil(nElements/nToShow);

		if ( (currentFrame-1)>=1 ) {
			currentFrame -= 1;
		} else {
			currentFrame = nPicFrames;
		}

		$(".page04-picture-frame").hide();
		for (i=(currentFrame-1)*nToShow; i<nElements; i++) {
			if (i<currentFrame*nToShow) {
				$($(".toShow")[i]).show();
			}
		}
	});
}

var initModal = function() {

	$("#page04-cases").append('<div id="modal" class="modal fade" role="dialog"></div>');

	// Using click

	$(".page04-picture-frame").click(function() {
		
		var id = $(this).attr("id");
		var idx = parseInt(id)-1;
		var nPictures = cases[idx][3];
		
		var txt_I = '<ol class="carousel-indicators">';
		var txt_S = '<div class="carousel-inner">';
		for (i=0; i<nPictures; i++) {
			
			if (i==0) {
				txt_I = txt_I + '<li data-target="#carousel" data-slide-to="0" class="active"></li>';
				picture_name = cases[idx][1]+'/page04-'+cases[idx][1]+'-1.png';
				txt_S = txt_S + '<div class="item active"><img src="images/cases/'+picture_name+'"></div>';
			} else {
				txt_I = txt_I + '<li data-target="#carousel" data-slide-to="'+i+'"></li>';
				picture_name = cases[idx][1]+'/page04-'+cases[idx][1]+'-'+(i+1).toString()+'.png';
				txt_S = txt_S + '<div class="item"><img src="images/cases/'+picture_name+'"></div>';
			}
		}
		txt_I = txt_I + '</ol>';
		txt_S = txt_S + '</div>';

		txt = '<div class="modal-dialog modal-lg"><div class="modal-content"><div class="modal-body"><div id="carousel" class="carousel slide">'+txt_I+txt_S+'<a class="left carousel-control" href="#carousel" data-slide="prev"><span class="icon-prev"></span></a><a class="right carousel-control" href="#carousel" data-slide="next"><span class="icon-next"></span></a></div></div></div></div>';
		$("#modal").html(txt);
	});
}

var initCases = function(nToShow=6) {
	initCoverPictures(nToShow);
	initTagControl(nToShow);
	initFlipControl(nToShow);
	initModal();
}



// Page05

var demands = [
	["01", "客户经理", "Manager", "项目策划方案撰写<br>团队协调与执行把控<br>客户维护<br>3年+经验"],
	["02", "客户主任", "AE", "协助客户经理完成项目<br>可出执行案<br>能吃苦能禁得住压力能BB<br>1年+经验"],
	["03", "文案策划", "SWR", "熟悉Social最新玩法及运营方式<br>有独立策划和文字能力<br>思维敏捷<br>2年+经验"],
	["04", "设计师", "Designer", "抗得起压力<br>耐得住性子<br>有态度有想法<br>1年+经验"]
];

var initDL = function() {

	nDemands = demands.length;

	for ( i=0; i<nDemands; i++ ) {
		$(".page05-demand#ff").clone().appendTo("#page05-join-us");
		$($(".page05-demand")[i+1]).attr("id", demands[i][0]);
		$($(".page05-demand")[i+1]).show();
		$($($(".page05-frame-01")[i+1]).children()[0]).html( demands[i][1] + "<br>" +  demands[i][2]);
		$($($(".page05-frame-02")[i+1]).children()[1]).html( demands[i][3] );
	}

	$(".page05-btn").click(function() {
		$(this).parent().parent().hide();
		$(this).parent().parent().siblings().show();
	});
};



// Run

$(document).ready(function() {
	// Overview
	initNavBtn();
	// Page One
	initBall();
	// Page Three
	initPWP();
	// Page Four
	initCases();
	// Page Five
	initDL();
});