define(function(){
	var
		Sound = function(src){
			this.init(src);
		};
		
	Sound.prototype = {
		init:function(src){			
			//看是否存在sound元素	

			this.sound = document.createElement('audio');
			this.sound.setAttribute('src', src);
			//this.sound.setAttribute('autoplay', false);
			this.sound.setAttribute('preload', true);
			this.sound.setAttribute('id', 'yanSound');
		},
		src:function(src){
			if (typeof src !== 'undefined') {
				this.sound.src = src;
			}
			
			return this.sound.src;
		},
		play:function(src){
			this.src(src);
			this.sound.play();
		}
	};
	
	return Sound;
});
