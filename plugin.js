(function(){

$.fn.simplePagination = function(options){
	var settings = $.extend({}, $.fn.simplePagination.defaults, options);

	var items = this.children(),
		item_count = items.length,
		page_count = Math.ceil(item_count / settings.items_per_page);

	return this.each(function(){
		alert('page_count = ' + page_count);
	});
};

$.fn.simplePagination.defaults = {
	items_per_page: 5,
	show_first: true,
	show_previous: true,
	show_next: true,
	show_last: true
};

})(jQuery);