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
	var
		screen = new Screen,
		score = new Score,
        $pops = $('.js-pop'),
        $popWrap = $('#pop-wrap');
    $(function () {
    	var level = score.getLevel();
    	screen.create(level);
    });

    $(document).on('screen/success', function () {
    	var level = score.addLevel();    
    	screen.create(level);
        $popWrap.show();
        $('#success-pop').find('.js-pop-body').html('即将进入第' + level + '关')
        $('#success-pop').show();
        window.setTimeout(function () {
            $('#success-pop').hide();
            $popWrap.hide();
        }, 2000);
    }).on('screen/click', function () {
    	score.addClick();
    }).on('score/hightLevel', function () {
        $popWrap.show();
        $('#hightLevel-pop').show();
    });

    $pops.on('tap', function (e) {
        $pops.hide();
        $popWrap.hide();
        e.preventDefault();
    });
    $('#restart-game').on('tap', function (e) {
        score.reset();
        screen.create(1);
        e.preventDefault();
    });
    $('#pop-restart-game').on('tap', function (e) {
        $popWrap.show();
        $('#restart-game-pop').show();
        e.preventDefault();
    });

    $('#restart-level').on('tap', function (e) {
        screen.create(score.resetLevel());
        e.preventDefault();
    });
    $('#pop-restart-level').on('tap', function (e) {
        $popWrap.show();
        $('#restart-level-pop').show();
        e.preventDefault();
    });

    $('#pop-intro').on('tap', function (e) {
        $popWrap.show();
        $('#intro-pop').show();
        e.preventDefault();
    });
    $('#share').on('tap', function (e) {
        e.preventDefault();
        window.plugins.socialsharing.share('我正在玩变色方块小游戏，非常有趣，难度很大，快来试试吧 http://yanhaijing.com @颜海镜')
    });
    $('#hight-share').on('tap', function (e) {
        e.preventDefault();
        window.plugins.socialsharing.share('我在变色方块游戏中创造了新纪录，逆天用了' + score.supClick +'次点击，完成了第' + score.supLevel + '关' + '快来挑战我吧，http://yanhaijing.com @颜海镜')
    });
});
