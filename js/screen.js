define(['zepto'], function ($) {
    'use strict';
    var
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
        reset: function() {
            this.$screen.empty();
            this.$squares = $();
        },

        create:  function (n) {
            var
                i,
                $screen = this.$screen,
                sWidth = (this.width - 10 * n) / n,
                $row = $('<div class="row"></div>'),
                $square = $('<div class="square js-square"></div>');

            if (this.n && this.n === n) {
                this.squares.removeClass('square-active');
                return 0;
            }

            this.reset();
            this.n = n;
            $square.width(sWidth).height(sWidth);
            for(i = 0; i < n; i++) {
                $row.append($square.clone());
            }

            for(i = 0; i < n; i++) {
                $screen.append($row.clone());
            }

            this.$squares = $screen.find('.js-square');
        },
        bindEvent: function () {
            var
                $screen = this.$screen,
                self = this;

            function check($squares) {
                return $squares.not('.square-active').length > 0 ? false : true;
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
            function clickCallback($square, $squares, n) {
                var
                    index = $squares.index($square),
                    res = find(index, n);
                res.forEach(function (val) {
                    $squares.eq(val).toggleClass('square-active');
                });
                $(document).trigger('screen/click');//派发点击事件

                //判断是否胜利
                if (check($squares)) {
                    $(document).trigger('screen/success');//派发胜利事件事件
                }
            }

            $screen.on('click', '.js-square', function (e) {
                var $this = $(this);
                clickCallback($this, self.$squares, self.n);
            });
        }
    });

    return Screen;
});
