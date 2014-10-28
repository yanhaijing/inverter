/**
 * @author YANXUEFENG
 */

require.config({
    shim:{
        'zepto': {
            exports: 'Zepto'
        },
        'baiduTemplate': {
            exports: 'baidu.template'
        }
    }
});
require(['zepto', 'screen', 'score', 'i18n!nls/data', 'baiduTemplate'], function ($, Screen, Score, data, bt) {	
    function initData() {
        var html;
        
        document.title = data.title;
        
        html = bt('t:header', {data: data.header});
        $('#header').html(html);
        
        html = bt('t:score', {data: data.score});
        $('#score').html(html);
        
        html = bt('t:menu', {data: data.menu});
        $('#menu').html(html);
        
        html = bt('t:restart-game-pop', {data: data.restartGamePop});
        $('#restart-game-pop').html(html);
        
        html = bt('t:restart-level-pop', {data: data.restartLevelPop});
        $('#restart-level-pop').html(html);
        
        html = bt('t:success-pop', {data: data.successPop});
        $('#success-pop').html(html);
        
        html = bt('t:hightLevel-pop', {data: data.hightLevelPop});
        $('#hightLevel-pop').html(html);
        
        html = bt('t:intro-pop', {data: data.introPop});
        $('#intro-pop').html(html);
    }
    initData();
    
    var
        screen = new Screen,
        score = new Score,
        $pops = $('.js-pop'),
        click = 'tap';
        
    function updateShare(level, click) {
        var title = '史上最难智力游戏，我逆天用了' + click + '次点击，通过了第' + (level - 1) + '关，你，你，你快快来挑战我吧';
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
        $('#success-pop-level').html(level);
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
