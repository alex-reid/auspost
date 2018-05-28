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
		open: false,
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
				this.arrows[i].y = Math.random() * height - 80;
				if(this.arrows[i].y > 260) this.arrows[i].y = this.arrows[i].y+80;
				this.arrows[i].d = Math.round(Math.random() * 4000);
				this.arrows[i].s = Math.random() * .7 + .3;
			}
			ss_slide = setInterval(this.textFade, 3000);
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
		open: true,
		cards: [
			{ img: "img/ff_img.svg", depth: 1, text: "<h2>$35b</h2>In over the counter financial services transactions annually" },
			{ img: "img/ff_img.svg", depth: 2, text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit." },
			{ img: "img/ff_img.svg", depth: 3, text: "Integer vitae mauris enim. Nunc lobortis lacinia erat in egestas." },
			{ img: "img/ff_img.svg", depth: 4, text: "Pellentesque quis dui turpis." },
			{ img: "img/ff_img.svg", depth: 5, text: "Some test text." },
			{ img: "img/ff_img.svg", depth: 6, text: "Praesent vestibulum ligula quis nunc vulputate, non hendrerit magna posuere." }
		],
		current: 1
	},
	methods:{
		slideOut: function(){
			for (var i = this.cards.length - 1; i >= 0; i--) {
				this.cards[i].depth++;
				if (this.cards[i].depth > 6) this.cards[i].depth = 1;
			}
		},
		slideIn: function(){
			for (var i = this.cards.length - 1; i >= 0; i--) {
				this.cards[i].depth--;
				if (this.cards[i].depth < 1) this.cards[i].depth = 6;
			}
		},
		textUpdate: function(index){

		}
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
	//timeout();
	$(window).click(function(event) {
		screensaver.destroy();
		clearTimeout(ss_timeout);
		timeout();
	});
	//screensaver.init();
});