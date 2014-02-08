$(document).ready(function(){
	var canvas = $('#gameCanvas');
	var context = canvas.get(0).getContext('2d');

	var canvasWidth = canvas.width();
	var canvasHeight = canvas.height();

	//游戏设置
	var playGame;

	var platformX;
	var platformY;  // 平台圆心坐标
	var platformOuterRadius;  //整个半径
	var platformInnerRadius;  //实际放置半径

	var asteroids;

	var player;
	var playerOriginalx;
	var playerOriginalY;

	var ui = $('#gameUI');
	var uiIntro = $('#gameIntro');
	var uiStats = $('#gameStats');
	var uiComplete = $('#gameComplete');
	var uiPlay = $('#gamePlay');
	var uiReset = $('#gameReset');
	var uiRemaining = $('#gameRemaining');
	var uiScore = $('.gameScore');

	var Asteroids = function (x,y,radius,mass,friction){
		this.x = x;
		this.y = y;
		this.radius = radius;
		this.mass =mass;
		this.friction = friction;
		this.vX = 0;
		this.vY = 0;
		this.player = false;

	}
	//重置和启动游戏
	function startGame() {
		uiScore.html('0');
		uiStats.show();


		//初始游戏设置
		playGame = false;

		platformX = canvasWidth/2;
		platformY = 150;
		platformOuterRadius = 100;
		platformInnerRadius = 75;
        //每次刷新小星星
		asteroids = new Array();

		var pRadius = 15;
		var pMass = 10;
		var pFriction = 0.97;
		playerOriginalX = canvasWidth/2;
		playerOriginalY = canvasHeight-150;
		player = new Asteroids(playerOriginalX,playerOriginalY,pRadius,pMass,pFriction);
		player.player = true;
		asteroids.push(player);

		var outerRing = 8;   //外圈上的小行星数目
		var ringCount = 3;   //圈数

		var ringSpacing = (platformInnerRadius/(ringCount-1))  //每个圈之间的距离

		for (var r = 0; r < ringCount; r++) {
			var currentRing = 0;  //当前圈上的小行星数目
			var angle = 0;    //每个星星之间的角度
			var ringRadius = 0;

			//判断是不是最里面的圈
			if (r == ringCount-1) {
				currentRing = 1;
			}else{
				currentRing = outerRing-(r*3);
				angle = 360/currentRing;
				ringRadius = platformInnerRadius - (ringSpacing*r)
			}

			for (var a = 0; a < currentRing; a++) {
				var x = 0;
				var y = 0;

				//判断是否是最里边的圈
				if(r == ringCount-1){
					x = platformX;
					y = platformY;

				}else{
					x = platformX + (ringRadius*Math.cos((angle*a)*(Math.PI/180)));
					y = platformY + (ringRadius*Math.sin((angle*a)*(Math.PI/180)));
				}
				var radius = 10;
				mass = 5;
				var friction = 0.95;
				asteroids.push(new Asteroids(x,y,radius,mass,friction))
			};

		};
		uiRemaining.html(asteroids.length-1);


		//开始动画循环
		animate();
	}

	//初始化游戏环境
	function init(){
		uiStats.hide();
		uiComplete.hide();

		uiPlay.click(function(e){
			e.preventDefault();

			uiIntro.hide();
			startGame();
		});

		uiReset.click(function(e){
			e.preventDefault();
			uiComplete.hide();
			startGame();
		})


	}

	//动画循环
	function animate(){

		context.clearRect(0,0,canvasWidth,canvasHeight);

		context.fillStyle = 'rgb(100,100,100)';
		context.beginPath();
		context.arc(platformX,platformY,platformOuterRadius,0,Math.PI*2,true);
		context.closePath();
		context.fill();

		context.fillStyle = 'rgb(255,255,255)';
		var asteroidsLength = asteroids.length;
		for (var i = 0; i < asteroidsLength; i++) {
			var tmpAsteroid = asteroids[i];
			for (var j = i+1; j < asteroidsLength; j++) {
				var tmpAsteroidsB = asteroids[j];

			};
			context.beginPath();
			context.arc(tmpAsteroid.x,tmpAsteroid.y,tmpAsteroid.radius,0,Math.PI*2,true);
			context.closePath();
			context.fill();
		};

		if(playGame) {
			setTimeout(animate,33)
		}
	}

	init();
})