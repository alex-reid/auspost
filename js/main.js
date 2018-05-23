var menu = new Vue({
  el: '#navigation',
  data: {
    title: 'Navigation',
    isOpen: false
  },
  methods: {
  	toggleMenu: function(){
  		this.isOpen = !this.isOpen;
  	}
  }
})