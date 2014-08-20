define(['zepto', 'sound'], function ($, Sound) {
    'use strict';
    var
    	sound = new Sound('media/click.wav'),
        Screen = function () {
            this.init();
        };

    $.extend(Screen.prototype, {
        init: function () {
            var
                $screen = $('#screen'),
                width = parseInt($screen.css('width'), 10);
            this.$screen = $screen;
            this.width = width;

            $screen.height(width);
            this.bindEvent();
        },
        resetScreen: function () {
            var screen = this.screen;
            var i = screen.length;
            while(i--) {
                screen[i] = 0;
            }
        },
        reset: function() {
            this.$screen.empty();
            this.$squares = $();
            this.screen = [];
        },

        create:  function (n) {
            var
                i,
                $screen = this.$screen,
                sWidth = (this.width - 6 * n) / n,
                $row = $('<div class="row"></div>'),
                $square = $('<div class="square js-square"></div>'),
                arr = [];

            if (this.n && this.n === n) {
                this.$squares.removeClass('square-active');
                this.resetScreen();
                return 0;
            }

            this.reset();
            this.n = n;
            $square.width(sWidth).height(sWidth);
            for(i = 0; i < n; i++) {
                $row.append($square.clone());
                arr[i] = 0;
            }

            for(i = 0; i < n; i++) {
                $screen.append($row.clone(true, true));
                this.screen = this.screen.concat(arr);
            }

            this.$squares = $screen.find('.js-square');
        },
        bindEvent: function () {
            var
                $screen = this.$screen,
                self = this,
                click = document.hasOwnProperty("ontouchstart") ? 'tap' : 'click';

            function check(arr) {
                var i = 0;
                var len = arr.length;
                for(i = 0; i < len; i++){
                    if (arr[i] === 0) {
                        return false;
                    }
                }

                return true;
            }
            function find(i, n) {
                var
                    y = Math.floor(i / n),
                    x = i % n,
                    res = [];

                res.push(i);
                if (y + 1 < n) {
                    res.push((y + 1) * n + x);
                }

                if (y - 1 > -1) {
                    res.push((y - 1) * n + x);
                }

                if (x - 1 > -1) {
                    res.push(y * n + x - 1);
                }

                if (x + 1 < n) {
                    res.push(y * n + x + 1);
                }

                return res;
            }
            function updateView(arr, $squares){
                $squares.each(function (i){
                    if (arr[i] === 0) {
                        $(this).removeClass('square-active');
                    } else {
                        $(this).addClass('square-active');
                    }
                });
            }
            function clickCallback($square, $squares, n) {
                var
                    index = $squares.index($square),
                    res = find(index, n);
                res.forEach(function (val) {
                    self.screen[val] = Number(!self.screen[val]);
                });

                updateView(self.screen, $squares);
                $(document).trigger('screen/click');//派发点击事件

                //判断是否胜利
                if (check(self.screen)) {
                    $(document).trigger('screen/success');//派发胜利事件事件
                }
            }
            $screen.on(click, '.js-square', function (e) {
                var $this = $(this);
                sound.play();
                clickCallback($this, self.$squares, self.n);
                e.preventDefault();
            });
        }
    });

    return Screen;
});
