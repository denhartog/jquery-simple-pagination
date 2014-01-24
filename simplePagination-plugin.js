(function(){

$.fn.simplePagination = function(options){
	var settings = $.extend({}, $.fn.simplePagination.defaults, options);

	return this.each(function(){
		var container_id = $(this).attr('id'),
			items = $(this).find(settings.pagination_container).children(),
			item_count = items.length,
			items_per_page = +settings.items_per_page,//force to Number type with + or parseInt()
			page_count = Math.ceil(item_count / items_per_page);

		function refresh_page_navigation(page_number){
			var page_numbers_html = '',
				first_html = '',
				previous_html = '',
				next_html = '',
				last_html = '';

			//if there is more than ONE page of results then show the page-to-page navigation
			if(page_count > 1){
				//if we are on a page that is NOT the first, show first/previous navigation
				if(page_number > 1){
					//do we want to see the 'first' navigation?
					if(settings.show_first){
						first_html += '<a href="#" class="simplePagination-navigation-first" data-simplePagination-page-number="' + 1 + '">First</a>';
					}
					//do we want to see the 'previous' navigation?
					if(settings.show_previous){
						previous_html += '<a href="#" class="simplePagination-navigation-previous" data-simplePagination-page-number="' + (page_number - 1) + '">Previous</a>';
					}
				}
				//if we are on a page that is NOT the last, show next/last navigation
				if(page_number < page_count){
					//do we want to see the 'next' navigation?
					if(settings.show_next){
						next_html += '<a href="#" class="simplePagination-navigation-next" data-simplePagination-page-number="' + (page_number + 1) + '">Next</a>';
					}
					//do we want to see the 'last' navigation?
					if(settings.show_last){
						last_html += '<a href="#" class="simplePagination-navigation-last" data-simplePagination-page-number="' + page_count + '">Last</a>';
					}
				}

				//create a navigational link for every page
				var current_page = 0;
				while(page_count > current_page){
					current_page++;
					page_numbers_html += '<a href="#" class="simplePagination-navigation-page';
					if(page_number === current_page){
						page_numbers_html += ' simplePagination-navigation-page-active';
					}
					page_numbers_html += '" data-simplePagination-page-number="' + current_page + '">' + current_page + '</a>';
				}
			}

			$('#' + container_id + ' .simplePagination-navigation').html(first_html + previous_html + page_numbers_html + next_html + last_html);
		}

		function refresh_current_page(page_number){
			$('#' + container_id + ' .simplePagination-current-page-text').text('Page ' + page_number + ' of ' + page_count);
		}

		function refresh_current_items(page_number, page_range_min, page_range_max){
			$('#' + container_id + ' .simplePagination-current-items-text').text('Showing ' + page_range_min + '-' + page_range_max + ' of ' + item_count);
		}

		function show_page(page_number, page_range_min, page_range_max){
			items.hide();
			items.slice(page_range_min, page_range_max).show();
		}

		function refresh_page_information(page_number){
			var page_range_min = page_number * items_per_page - items_per_page,
				page_range_max = page_range_min + items_per_page;

			page_range_max = page_range_max > item_count ? item_count : page_range_max;

			show_page(page_number, page_range_min, page_range_max);
			refresh_page_navigation(page_number);
			refresh_current_page(page_number);
			refresh_current_items(page_number, page_range_min + 1, page_range_max);
		}
		refresh_page_information(1);

		$('#' + container_id + ' .simplePagination-navigation').on('click', 'a', function(e){
			var page_number = $(this).attr('data-simplePagination-page-number');
			refresh_page_information(+page_number);//force Number type with + OR parseInt()

			e.preventDefault();
		});

		$('#' + container_id + ' .simplePagination-update-items-per-page').change(function(){
			items_per_page = +$(this).val();//force Number type with + OR parseInt()
			page_count = Math.ceil(item_count / items_per_page);
			refresh_page_information(1);
		});
	});
};

$.fn.simplePagination.defaults = {
	pagination_container: 'tbody',
	items_per_page: 25,
	show_first: true,
	show_previous: true,
	show_next: true,
	show_last: true
};

})(jQuery);