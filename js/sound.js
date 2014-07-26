define(function () {
	var
		Sound = function(){
			this.init();
		};
		
	Sound.prototype = {
		init:function(){			
			this.sound = document.createElement('audio');
			this.sound.setAttribute('src', '');
			this.sound.setAttribute('autoplay', true);
			this.sound.setAttribute('id', 'yanSound');	
			document.body.appendChild(this.sound);		
		},
		src:function(src){
			this.sound.src = src;
		},
		play:function(src){
			src = src || this.sound.src;
			
			this.src(src);
		}
	};

	return Sound;
});