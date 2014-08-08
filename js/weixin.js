/**
 * @author YANXUEFENG
 */

require.config({
    shim:{
        'zepto': {
            exports: 'Zepto'
        }
    }
});
require(['zepto', 'screen', 'score'], function ($, Screen, Score) {
	var
		screen = new Screen,
		score = new Score,
        $pops = $('.js-pop'),
        click = 'tap';

    function updateShare(level, click) {
        var title = '变色方块 史上最难智力游戏，' + '我逆天用了' + click + '次点击，通过了第' + (level - 1) + '关，你，你，你快快来挑战我吧';
        document.title = title;
    }
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
    	score.addClick();
    }).on('score/hightLevel', function (e, level, click) {
        $('#success-pop').hide();
        $('#hightLevel-pop').show();
        updateShare(level, click);
    });

    $pops.on(click, function (e) {
        $(this).hide();
        e.preventDefault();
    });
    $('#restart-game').on(click, function (e) {
        score.reset();
        screen.create(1);
        e.preventDefault();
    });
    $('#pop-restart-game').on(click, function (e) {
        $('#restart-game-pop').show();
        e.preventDefault();
    });

    $('#restart-level').on(click, function (e) {
        screen.create(score.resetLevel());
        e.preventDefault();
    });
    $('#pop-restart-level').on(click, function (e) {
        $('#restart-level-pop').show();
        e.preventDefault();
    });

    $('#pop-intro').on(click, function (e) {
        $('#intro-pop').show();
        e.preventDefault();
    });
    $('#share').on(click, function (e) {
        $('#weixin-shade').show();
        e.preventDefault();
    });
    $('#hight-share').on(click, function (e) {
        $('#weixin-shade').show();
        e.preventDefault();
        e.stopPropagation();
    });
    $('#weixin-shade').on(click, function (e) {
        $('#weixin-shade').hide();
        e.preventDefault();
    });
});
