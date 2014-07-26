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
require(['zepto', 'screen', 'score', 'sound'], function ($, Screen, Score, Sound) {
	var
		screen = new Screen,
		score = new Score,
        $pops = $('.js-pop'),
        $popWrap = $('#pop-wrap'),
        sound = new Sound;
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
        sound.play('media/click.wav');
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
});
