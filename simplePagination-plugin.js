(function(){

$.fn.simplePagination = function(options){
	var settings = $.extend({}, $.fn.simplePagination.defaults, options);

	return this.each(function(){
		var container_id = $(this).attr('id'),
			items = $(this).find(settings.pagination_container).children(),
			item_count = items.length,
			items_per_page = +settings.items_per_page,//force to Number type with + or parseInt()
			page_count = Math.ceil(item_count / items_per_page),
			truncate_page_navigation = +settings.truncate_page_navigation;//force to Number type with + or parseInt()

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
					if(settings.use_first){
						first_html += '<a href="#" class="simplePagination-navigation-first" data-simplePagination-page-number="' + 1 + '">' + settings.first_html + '</a>';
					}
					//do we want to see the 'previous' navigation?
					if(settings.use_previous){
						//display if NOT on second page
						if(page_number > 2){
							previous_html += '<a href="#" class="simplePagination-navigation-previous" data-simplePagination-page-number="' + (page_number - 1) + '">' + settings.previous_html + '</a>';
						}
					}
				}
				//if we are on a page that is NOT the last, show next/last navigation
				if(page_number < page_count){
					//do we want to see the 'next' navigation?
					if(settings.use_next){
						//display if NOT on second-to-last page
						if(page_number < page_count - 1){
							next_html += '<a href="#" class="simplePagination-navigation-next" data-simplePagination-page-number="' + (page_number + 1) + '">' + settings.next_html + '</a>';
						}
					}
					//do we want to see the 'last' navigation?
					if(settings.use_last){
						last_html += '<a href="#" class="simplePagination-navigation-last" data-simplePagination-page-number="' + page_count + '">' + settings.last_html + '</a>';
					}
				}

				//create a navigational link for every page
				var current_while_page = 0,
					create_page_navigation = function(){
						page_numbers_html += '<a href="#" class="simplePagination-navigation-page';
						if(page_number === current_while_page){
							page_numbers_html += ' simplePagination-navigation-page-active';
						}
						page_numbers_html += '" data-simplePagination-page-number="' + current_while_page + '">' + current_while_page + '</a>';
					};

				if(truncate_page_navigation === 0){
					while(page_count > current_while_page){
						current_while_page++;
						create_page_navigation();
					}
				}
				//truncate the number of navigational links
				else
				{
					var page_range_min = page_number - truncate_page_navigation - 1,
						page_range_max = page_number + truncate_page_navigation;

					page_range_max = page_range_max > page_count ? page_count : page_range_max;
					current_while_page = page_range_min < 0 ? 0 : page_range_min;

					while(current_while_page < page_range_max){
						current_while_page++;
						create_page_navigation();
					}
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
	items_per_page: 5,
	truncate_page_navigation: 0,
	//first link options
	use_first: true,
	first_html: 'First',  //e.g. '<<'
	//previous link options
	use_previous: true,
	previous_html: 'Previous',  //e.g. '<'
	//next link options
	use_next: true,
	next_html: 'Next',  //e.g. '>'
	//last link options
	use_last: true,
	last_html: 'Last', //e.g. '>>'
};

})(jQuery);