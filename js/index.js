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
		score = new Score;
    $(function () {
    	var level = score.getLevel();
    	screen.create(level);
    });
    $(document).on('screen/success', function () {
    	var level = score.addLevel();

    	screen.create(level);
    }).on('screen/click', function () {
    	score.addClick();
    });
});
