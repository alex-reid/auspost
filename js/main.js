// init vars

var width = 1024;
var height = 704;

var menu = new Vue({
  el: '#navigation',
  data: {
    title: 'Navigation',
    isOpen: false
  },
  methods: {
  	toggleMenu: function(){
  		this.isOpen = !this.isOpen;
  	},
  	load_ff: function(){
  		this.isOpen = false;
  		this.title = "Fast Facts"
  	},
  	load_pp: function(){
  		this.isOpen = false;
  		this.title = "Pain Points"
  	},
  	load_cs: function(){
  		this.isOpen = false;
  		this.title = "Case Studies"
  	}
  }
})


var ss_slide;
var screensaver = new Vue({
	el: '#screensaver',
	data: {
		open: true,
		text: [
			{id: 1, text:"Our solutions"},
			{id: 2, text:"solve"},
			{id: 3, text:"your biggest"},
			{id: 4, text:"pain points"},
			{id: 5, text:"in disbursement"},
			{id: 6, text:"and collection"}
		],
		arrows: [
			{x:0,y:0,d:0,s:1},
			{x:0,y:0,d:0,s:1},
			{x:0,y:0,d:0,s:1},
			{x:0,y:0,d:0,s:1},
			{x:0,y:0,d:0,s:1},
			{x:0,y:0,d:0,s:1},
			{x:0,y:0,d:0,s:1},
			{x:0,y:0,d:0,s:1},
			{x:0,y:0,d:0,s:1},
			{x:0,y:0,d:0,s:1},
			{x:0,y:0,d:0,s:1},
			{x:0,y:0,d:0,s:1},
			{x:0,y:0,d:0,s:1},
			{x:0,y:0,d:0,s:1},
			{x:0,y:0,d:0,s:1},
			{x:0,y:0,d:0,s:1},
			{x:0,y:0,d:0,s:1},
			{x:0,y:0,d:0,s:1},
			{x:0,y:0,d:0,s:1}
		],
		current: 0
	},
	methods: {
		init: function(){
			this.destroy;
			this.open = true;
			for(var i = 0; i < this.arrows.length; i++){
				this.arrows[i].x = Math.random() * width;
				this.arrows[i].y = Math.random() * height;
				this.arrows[i].d = Math.round(Math.random() * 4000);
				this.arrows[i].s = Math.random() * .7 + .3;
			}
			ss_slide = setInterval(this.textFade, 2000);
			menu.title = "";
		},
		textFade: function(){
			var items = this.text.length;
			if(this.current++ >= items) this.current = 1;
		},
		arrows_start : function() {
			
		},
		destroy : function(){
			clearInterval(ss_slide);
			this.current = 1;
			this.open = false;
		}
	}
})

var fast_facts = new Vue({
	el: '#fast_facts',
	data: {
		open: false,
	}
})


// jquery

var ss_timeout;
var time = 5000;

function timeout(){
	ss_timeout = setTimeout(function(){
		if(!screensaver.open) screensaver.init();
	},time)
}

$(document).ready(function() {

	// init timeout
	timeout();
	$(window).click(function(event) {
		screensaver.destroy();
		clearTimeout(ss_timeout);
		timeout();
	});
	screensaver.init();
});