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
  		screensaver.destroy();
  		fast_facts.destroy();
  		case_studies.destroy(); 
  	},
  	load_ff: function(){
  		this.isOpen = false;
  		this.title = "Fast Facts"
  		screensaver.destroy();
  		fast_facts.init();
  	},
  	load_pp: function(){
  		this.isOpen = false;
  		this.title = "Pain Points"
  	},
  	load_cs: function(){
  		this.isOpen = false;
  		this.title = "Case Studies"
  		screensaver.destroy();
  		case_studies.init();  	
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
  			fast_facts.destroy();
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

var ff_slide;
var ff_int = 5000;
var fast_facts = new Vue({
	el: '#fast_facts',
	data: {
		open: false,
		cards: [
			{ img: "img/ff_img.svg", depth: 1, text: "<strong>$35b</strong> In over the counter financial services transactions annually" },
			{ img: "img/ff_img.svg", depth: 2, text: "Helping over <strong>750</strong> businesses and government agencies" },
			{ img: "img/ff_img.svg", depth: 3, text: "<strong>30</strong> years of payment management experience" },
			{ img: "img/ff_img.svg", depth: 4, text: "<strong>60%</strong> of Australian online transactions are powered through SecurePay" },
			{ img: "img/ff_img.svg", depth: 5, text: "<strong>181M</strong> digital visits annually" },
			{ img: "img/ff_img.svg", depth: 6, text: "More than <strong>3,500</strong> payment collection points across our network" }
		],
		current: 1
	},
	methods:{
		init: function(){
			this.destroy();
			this.open = true;
			this.setTimer();
		},
		destroy: function(){
			this.open = false;
			this.current = 1;
			for (var i = this.cards.length -1; i >= 0; i--) {
				this.cards[i].depth = i+1;
			}
			clearTimeout(ff_slide);
		},
		slideOut: function(){
			this.setTimer();
			for (var i = this.cards.length - 1; i >= 0; i--) {
				this.cards[i].depth++;
				if (this.cards[i].depth > 6) this.cards[i].depth = 1;
			}
			
		},
		slideIn: function(){
			this.setTimer();
			for (var i = this.cards.length - 1; i >= 0; i--) {
				this.cards[i].depth--;
				if (this.cards[i].depth < 1) this.cards[i].depth = 6;
			}
		},
		setTimer: function(){
			clearTimeout(ff_slide);
			ff_slide = setTimeout(this.slideOut, ff_int);
		}
	}
})

var case_studies = new Vue({
	el: '#case_studies',
	data: {
		open: false,
	},
	methods:{
		init: function(){
			this.destroy();
			this.open = true;
		},
		destroy: function(){
			this.open = false;
		}
	}
})

// touch gestures

var myElement = document.getElementById('fast_facts');
var mc = new Hammer(myElement);
mc.on("swipe", function(ev){
	//console.log(ev);
	switch(ev.offsetDirection){
		case 2:
			//console.log('left');
			fast_facts.slideOut();
		break;
		case 4:
			//console.log('right')
			fast_facts.slideIn();
		break;
	}
})

// jquery

var ss_timeout;
var time = 30000;

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
