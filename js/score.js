/**
 * @author YANXUEFENG
 */
define(['zepto', 'storage'], function ($, Storage) {
    var
        Score = function () {
    		this.init();
        };

    $.extend(Score.prototype, {
    	init: function () {
    		var
    			storage = new Storage(),
    			curLevel = storage.load('curLevel') || 1,
    			supLevel = storage.load('supLevel') || 1,
    			supClick = storage.load('supClick') || 0,
    			curClick = storage.load('curClick') || 0,
    			totalClick = storage.load('totalClick') || 0,
    			$curLevel = $('#cur-level'),
    			$supLevel = $('#sup-level'),
    			$curClick = $('#cur-click'),
    			$totalClick = $('#total-click');

    		

    		this.storage = storage;



			this.$curLevel = $curLevel;
    		this.$supLevel = $supLevel;
    		this.$curClick = $curClick;
    		this.$totalClick = $totalClick;

    		this.curLevel = curLevel;
    		this.supLevel = supLevel;
    		this.supClick = supClick;
    		this.curClick = curClick;
    		this.totalClick = totalClick;

    		this.updateView();
    	},
    	getLevel: function () {
    		return this.curLevel;
    	},
    	addClick: function () {
			this.curClick += 1;
			this.totalClick += 1;

			this.updateView();
    	},
    	addLevel: function () {
    		this.curLevel += 1;

			//判断是否破纪录
    		if (this.curLevel > this.supLevel || (this.curLevel === this.supLevel && this.supClick > this.totalClick)) {
    			this.supLevel = this.curLevel;
    			this.supClick = this.totalClick;
			  	$(document).trigger('score/hightLevel');		
    		}

    		this.save();

    		return this.curLevel;
    	},
    	resetLevel: function () {
    		this.curLevel = 1;
			this.curClick = 0;
			this.totalClick = storage.load('totalClick') || 0;

			this.updateView();
    	},

    	reset: function () {
    		this.curLevel = 1;
			this.curClick = 0;
			this.totalClick = 0;

			this.updateView();
    	},
		save: function() {
			var
				storage = this.storage;
			storage.save('curLevel', this.curLevel);
			storage.save('supLevel', this.supLevel);
			storage.save('supClick', this.supClick);
			storage.save('curClick', this.curClick);
			storage.save('totalClick', this.totalClick);
		},
    	updateView: function () {
    		this.$curLevel.html(this.curLevel);
    		this.$supLevel.html(this.supLevel + '(' + this.supClick + '次点击)');
    		this.$curClick.html(this.curClick);
    		this.$totalClick.html(this.totalClick);
    	}
    });

    return Score;
});
