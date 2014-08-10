/**
 * @author YANXUEFENG
 */

require.config({
    shim: {
        'zepto': {
            exports: 'Zepto'
        }
    }
});
require(['zepto', 'screen', 'score'], function ($, Screen, Score) {
	function ready() {
		var
			screen = new Screen,
			score = new Score,
	        $pops = $('.js-pop'),
	        media = new Media("/android_asset/www/media/click.wav", null, function mediaError() {});
	    $(function () {
	    	var level = score.getLevel();
	    	screen.create(level);
	    });
	
	    $(document).on('screen/success', function () {
	    	var level;
	        $('#success-pop').show();
	        level = score.addLevel();
	        $('#success-pop').find('.js-pop-body').html('即将进入第' + level + '关')
	        screen.create(level);
	        window.setTimeout(function () {
	            $('#success-pop').hide();
	        }, 2000);
	    }).on('screen/click', function () {
	    	media.play();
	    	score.addClick();
	    }).on('score/hightLevel', function () {
	        $('#success-pop').hide();
	        $('#hightLevel-pop').show();
	    });
	
	    $pops.on('tap', function (e) {
	        $(this).hide();
	    });
	    $('#restart-game').on('tap', function (e) {
	        score.reset();
	        screen.create(1);
	        e.preventDefault();
	    });
	    $('#pop-restart-game').on('tap', function (e) {
	        $('#restart-game-pop').show();
	        e.preventDefault();
	    });
	
	    $('#restart-level').on('tap', function (e) {
	        screen.create(score.resetLevel());
	        e.preventDefault();
	    });
	    $('#pop-restart-level').on('tap', function (e) {
	        $('#restart-level-pop').show();
	        e.preventDefault();
	    });
	
	    $('#pop-intro').on('tap', function (e) {
	        $('#intro-pop').show();
	        e.preventDefault();
	    });
	    $('#share').on('tap', function (e) {
	        e.preventDefault();
	        window.plugins.socialsharing.share('变色方块 史上最难智力游戏，非常有趣，快快来体验吧 http://yanhaijing.com/inverter @颜海镜')
	    });
	    $('#hight-share').on('tap', function (e) {
	        e.preventDefault();
	        e.stopPropagation();
	        window.plugins.socialsharing.share('变色方块 史上最难智力游戏，我逆天用了' + score.supClick +'次点击，通过了第' + (score.supLevel - 1) + '关，你，你，你快快来挑战我吧，http://yanhaijing.com/inverter @颜海镜')
	    });
	}
	$(document).on('deviceready', ready);
});
