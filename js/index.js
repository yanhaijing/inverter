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
        click = document.hasOwnProperty("ontouchstart") ? 'tap' : 'click';

    function updateShare(level, click) {
        var
            url = encodeURIComponent('http://yanhaijing.com/inverter'),
            weiboTitle = encodeURIComponent('我在变色方块小游戏中，逆天用了' + click + '次点击，通过了第' + (level - 1) + '关，你，你，你快快来挑战我吧@颜海镜 '),
            pic = encodeURIComponent('media/5.png'),
            desc = encodeURIComponent('我在变色方块小游戏中，逆天用了' + click + '次点击，通过了第' + (level - 1) + '关，你，你，你快快来挑战我吧'),
            summary = encodeURIComponent('变色方块小游戏'),
            qqTitle = encodeURIComponent('变色方块'),
            weibo = 'http://service.weibo.com/share/share.php?url=' + url + '&title=' + weiboTitle + '&pic=' + pic,
            qq = 'http://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey?url=' + url + '&desc=' + desc + '&title=' + qqTitle + '&summary=' + summary + '&pic=' + pic,
            duoshuo = 'http://yanhaijing.com/inverter ' + '我在变色方块小游戏中，逆天用了' + click + '次点击，通过了第' + (level - 1) + '关，你，你，你快快来挑战我吧@颜海镜 ';

        $('#share-weibo').attr('href', weibo);
        $('#share-qq').attr('href', qq);
        $('.ds-thread textarea').val(duoshuo);
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
    $('.js-share-btn').on(click, function (e) {
        e.stopPropagation();
    });
    $('#share').on(click, function (e) {
        $('#share-pop').show();
        e.preventDefault();        
    });
    $('#hight-share').on(click, function (e) {
        $('#share-pop').show();
        e.preventDefault(); 
        e.stopPropagation();      
    });
    $('#share-weixin').on(click, function (e) {
        $('#share-pop').hide();
        $('#hightLevel-pop').hide();
        $('#weixin-shade').show();
        e.preventDefault(); 
        e.stopPropagation();      
    });
    $('#weixin-shade').on(click, function (e) {
        $('#weixin-shade').hide();
        e.preventDefault();       
    });
});
