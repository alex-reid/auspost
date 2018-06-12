// init vars

//var width = 1024;
var width = document.getElementById("mainstage").offsetWidth;
//var height = 704;
var height = document.getElementById("mainstage").offsetHeight;

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
  		//fast_facts.destroy();
  		//case_studies.destroy(); 
  	},
  	load_ff: function(){
  		this.isOpen = false;
  		this.title = "Fast Facts"
  		screensaver.destroy();
  		case_studies.destroy(); 
  		fast_facts.init();
   		pain_points.open = false;
   		pain_points.reset()
//  		fast_facts.open = true;
  	},
  	load_pp: function(){
  		this.isOpen = false;
  		this.title = "Pain Points"
  		case_studies.destroy();
  		fast_facts.destroy();
  		pain_points.open = true;
 	},
  	load_cs: function(){
  		this.isOpen = false;
  		this.title = "Case Studies"
  		screensaver.destroy();
  		fast_facts.destroy();
  		case_studies.init();  	
   		pain_points.open = false;
   		pain_points.reset();
 	}
  }
})


var ss_slide;
var screensaver = new Vue({
	el: '#screensaver',
	data: {
		open: true,
		text: [ // Disbursement and collections made easy.
			{id: 1, text:"Disbursements"},
			{id: 2, text:"and collections"},
			{id: 3, text:"made easy."},
			{id: 4, text:""}
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
		ss_current: 1
	},
	created: function(){
		this.init();
	},
	methods: {
		init: function(){
			this.destroy;
			//pain_points.reset();
  			//fast_facts.destroy();
			this.open = true;
			for(var i = 0; i < this.arrows.length; i++){
				this.arrows[i].x = Math.random() * width;
				this.arrows[i].y = Math.random() * height - 80;
				if(this.arrows[i].y > 260) this.arrows[i].y = this.arrows[i].y+80;
				this.arrows[i].d = Math.round(Math.random() * 4000);
				this.arrows[i].s = Math.random() * .7 + .3;
			}
			ss_slide = setInterval(this.textFade, 1500);
			menu.isOpen = false;
		},
		textFade: function(){
			var items = this.text.length;
			if(this.ss_current++ >= items) this.ss_current = 1;
		},
		arrows_start : function() {
			
		},
		destroy : function(){
			clearInterval(ss_slide);
			this.ss_current = 1;
			this.open = false;
		},
		nextbtn : function() { 
			menu.load_pp();
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
			{ img: "img/ff_img_3.svg", depth: 1, text: "<strong>$3b</strong> In over the counter financial services transactions annually" },
			{ img: "img/ff_img_4.svg", depth: 2, text: "Helping over <strong>750</strong> businesses and government agencies" },
			{ img: "img/ff_img_5.svg", depth: 3, text: "<strong>30</strong> years of payment management experience" },
			{ img: "img/ff_img_6.svg", depth: 4, text: "<strong>60%</strong> of Australian online transactions are powered through SecurePay" },
			{ img: "img/ff_img_1.svg", depth: 5, text: "<strong>181M</strong> digital visits annually" },
			{ img: "img/ff_img_2.svg", depth: 6, text: "More than <strong>3,500</strong> payment collection points across our network" }
		],
		current: 1
	},
	methods:{
		init: function(){
			this.destroy();
			this.open = true;
			this.setTimer();
			// run touch init after element is rendered
			this.$nextTick( this.touch )
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
		},
		touch: function(){
			// touch gestures
			var mc = new Hammer(this.$el);
			// console.log('te init');
			mc.on("swipe", function(ev){
				clearTimeout(ss_timeout);
				timeout();
				switch(ev.offsetDirection){
					case 2:
						// console.log('left');
						fast_facts.slideOut();
					break;
					case 4:
						// console.log('right')
						fast_facts.slideIn();
					break;
				}
			})
		},
		nextbtn : function() { 
			menu.load_cs();
		}
	}
})

// empty var to hold timer
var pp_tick;

var pain_points = new Vue({
	el: "#pain_points",
	data: {
		open: true,
		circles: [
			{x:0,y:0,z:0,t:0,type:'bg'},
			{x:0,y:0,z:0,t:0,type:'bg'},
			{x:0,y:0,z:0,t:0,type:'bg'},
			{x:0,y:0,z:0,t:0,type:'bg'},
			{x:0,y:0,z:0,t:0,type:'bg'},
			{x:0,y:0,z:0,t:0,type:'bg'},
			{x:0,y:0,z:0,t:0,type:'bg'},
			{x:0,y:0,z:0,t:0,type:'bg'},
			{x:0,y:0,z:0,t:0,type:'bg'},
			{x:0,y:0,z:0,t:0,type:'bg'},
			{x:0,y:0,z:0,t:0,type:'bg'},
			{x:0,y:0,z:0,t:0,type:'bg'},
			{x:0,y:0,z:0,t:0,type:'bg'},
			{x:0,y:0,z:0,t:0,type:'bg'},
			{x:0,y:0,z:0,t:0,type:'bg'},
			{x:0,y:0,z:0,t:0,type:'bg'},
			{x:0,y:0,z:0,t:0,type:'bg'},
			{x:0,y:0,z:0,t:0,type:'bg'},
			{x:0,y:0,z:0,t:0,type:'bg'}
		],
		timer: 0,
		stage: {
			w: 804,
			h: 618,
			px: 50,
			py: 50,
			dx: 50,
			dy: 50
		},
		pp_show: false,
		pp_shown: 0,
		pp_overview: false,
		pp_items: [
			{ 
				id : 0,
				show: false,
				title: "Reach limitations",
				text: "Difficulty in providing immediate financial relief in rural areas. Limited ability to identify consumer groups at speed and address rural unbanked collections.",
				x : 24,
				y : 36,
				z : 0
			},
			{
				id : 1,
				show: false,
				title: "Decentralised systems",
				text: "Complex and inconsistent systems and data formats. Lack of consolidated consumer information and quality data makes assessing net position, preventing fraud and correctly issuing fines difficult.",
				x : 210,
				y : 240,
				z : -40
			},
			{
				id : 2,
				show: false,
				title: "Lack of control",
				text: "Poor visibility and lack of control across all government account balances. Lack of cashless payment solutions that enable spending control. No easy method to reverse payments that are unapproved.",
				x : 456,
				y : 120,
				z : -80
			},
			{	
				id : 3,
				show: false,
				title: "Manual processing",
				text: "Settlement reconciliation is complex and manual processing results in errors. No method to confirm receipts of fees, fines and levies, and no way to update payment pricing to adhere to policies.",
				x : 684,
				y : 36,
				z : -20
			},
			{
				id : 4,
				show: false,
				title: "Cost inefficiencies",
				text: "Cost of OTC (and cash management) services and leakage due to payment errors increase overall costs. Lack of differentiated pricing for intergovernmental payments.",
				x : 72,
				y : 420,
				z : -50
			},
			{
				id : 5,
				show: false,
				title: "Opportunity costs - Partnerships",
				text: "Lack of access to value-adding third parties, and lack of integration and visibility of participants across the disbursement value chain.",
				x : 288,
				y : 492,
				z : -100
			},
			{
				id : 6,
				show: false,
				title: "Negative brand perception",
				text: "Public trust is earned and it’s important to ensure this trust is maintained and customers understand their taxes are being used effectively.",
				x : 540,
				y : 384,
				z : 0
			},
			{
				id : 7,
				show: false,
				title: "Poor customer experience",
				text: "Outdated technology, inconsistant dispute processes, and changing consumer needs all contribute to negative customer experiences.",
				x : 750,
				y : 520,
				z : -30
			}
		]
	},
	computed: {
		styles_load: function(index){
			//console.log(this);
			return { 'transform' : 'translate3d(' + this.pp_items[index].x + 'px,' + this.pp_items[index].y + 'px, ' + this.pp_items[index].z + 'px)' }
		}
	},
	created: function(){

			for (var i = this.circles.length -1; i >= 0; i--) {
				this.random(this.circles[i]);
			}
			this.init();

			// start timer 10ms run "tick" function
			pp_tick = setInterval(this.tick, 10);
			//this.$nextTick( this.touch )
	},
	methods: {
		init: function(){
			for (var i = this.pp_items.length -1; i >= 0; i--) {
				this.pp_items[i].cx = this.pp_items[i].x;
				this.pp_items[i].cy = this.pp_items[i].y;
				this.pp_items[i].cz = this.pp_items[i].z;
				this.pp_items[i].t = round_rand(200);
				this.pp_items[i].f = true;
				//this.pp_items[i].show = false;
			}
			//this.pp_show = false;
			//this.pp_shown = 0;
			//this.pp_overview = false;
		},
		reset: function(){
			for (var i = this.pp_items.length -1; i >= 0; i--) {
				this.pp_items[i].x = this.pp_items[i].cx;
				this.pp_items[i].y = this.pp_items[i].cy;
				this.pp_items[i].z = this.pp_items[i].cz;
				this.pp_items[i].t = round_rand(200);
				this.pp_items[i].f = true;
				this.pp_items[i].show = false;
			}
			this.pp_show = false;
			this.pp_shown = 0;
			this.pp_overview = false;
		},
		update: function(){
			for (var i = this.circles.length -1; i >= 0; i--) {
				this.move(this.circles[i]);
			}
		},
		random: function(el){
			el.x = round_rand(this.stage.w);
			el.y = round_rand(this.stage.h);
			el.z = -round_rand(300) - 10;
			el.t = round_rand(100) + 100;
			// el.mx = this.stage.w * ( -el.x / 300 + 1);
			// console.log(el.z+" "+el.mx);
			// el.my = this.stage.h * ( -el.y / 300 + 1);
		},
		move_fg: function(el){

			el.x = el.cx + (round_rand(40) - 20);
			el.y = el.cy + (round_rand(40) - 20);

			el.t = round_rand(200);
		},
		move: function(el){

			var x = round_rand(20) - 10;
			el.x += x
			if(el.x > this.stage.w || el.x < 0) el.x -= x * 2;

			var y = round_rand(20) - 10;
			el.y += y;
			if(el.y > this.stage.h || el.y < 0) el.y -= y * 2;

			el.t = round_rand(200);
		},
		touch: function(){
			// touch gestures
			var pp = new Hammer(this.$el);
			// console.log('te init');
			pp.on('pan', function(ev) {
				//console.log(ev.velocityX +" "+ ev.velocityY);
				pain_points.stage.dx -= ev.velocityX;
				pain_points.stage.dy -= ev.velocityY;
			});
			pp.on('panend', function(ev) {
				pain_points.stage.dx = 50;
				pain_points.stage.dy = 50;
			})
		},
		overview: function(){
			clearInterval(pp_tick);
			for (var i = this.pp_items.length -1; i >= 0; i--) {
				this.pp_items[i].x = (i < 4)? -30 : this.stage.w / 1.6;
				this.pp_items[i].y = (i < 4)? i * 200 -30 : (i-4) * 200 -30;
				this.pp_items[i].z = -30;
			}
			this.pp_overview = true;
			this.pp_items.filter(function(pp,i) {
				pp.f = false;
			}, this);
		},
		hide_overview: function(){

			for (var i = this.pp_items.length -1; i >= 0; i--) {
				this.pp_items[i].x = this.pp_items[i].cx;
				this.pp_items[i].y = this.pp_items[i].cy;
				this.pp_items[i].z = this.pp_items[i].cz;
			}
			this.pp_overview = false;
			pp_tick = setInterval(this.tick, 10);
		},
		// holding function for transition end feedback
		call: function (i) {
			//console.log(i);
			if( !this.pp_items[i].f && !this.pp_show) this.pp_items[i].f = true;
		},
		tick: function(){
			// smooth scroll to point

			// increment timer and wrap around at 200
			if(this.timer++ > 200) this.timer = 0;

			// loop over circles and work out if a move is needed

			// this.circles.filter(function(pp,i) {
			// 	if (pp.t == this.timer) this.move(this.circles[i]);
			// }, this);

			this.pp_items.filter(function(pp,i) {
				if (pp.t == this.timer && pp.f) this.move_fg(this.pp_items[i]);
			}, this);

		},
		load_pp: function (index) {

			this.pp_show = true;
			this.pp_shown = index;

			this.pp_items.filter(function(pp) {
				pp.show = false;
			});

			this.pp_items[index].show = true;
			this.pp_items[index].f = false;

			//clearInterval(pp_tick);

			// this.pp_items[index].old_x = this.pp_items[index].x;
			// this.pp_items[index].old_y = this.pp_items[index].y;
			// this.pp_items[index].old_z = this.pp_items[index].z;

			// this.pp_items[index].x = 270;
			// this.pp_items[index].y = 300;
			// this.pp_items[index].z = 100;
		},
		unload_pp: function(){
			this.pp_items.filter(function(pp) {
				pp.show = false;
			});
			this.pp_show = false;
			//pp_tick = setInterval(this.tick, 10);
		},
		nextbtn : function() { 
			menu.load_ff();
		}
	}
})

function round_rand(max){
	return Math.round(Math.random() * max);
}

var vid1, vid2;
var case_studies = new Vue({
	el: '#case_studies',
	data: {
		open: false,
		current: 'closed'
	},
	methods:{
		init: function(){
			this.destroy();
			this.open = true;
			this.current = 'closed';

			vid1 = document.getElementById("cs_vid_1"); 
			vid2 = document.getElementById("cs_vid_2"); 

			this.pause();
		},
		destroy: function(){

			if(vid1 || vid2){
				this.pause();
			};
			this.open = false;
			this.current = 'closed';
		},
		play: function(cs){

			this.pause();

			if(cs == "cs1") vid1.play();
			if(cs == "cs2") vid2.play();
		},
		pause: function(){
			vid1.pause()
			vid2.pause()
		}
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

jQuery(document).ready(function($) {

	// init timeout
	//timeout();
	$(window).click(function(event) {
		screensaver.destroy();
		clearTimeout(ss_timeout);
		timeout();
	});
	//screensaver.init();
});
