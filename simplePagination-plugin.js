(function(){

$.fn.simplePagination = function(options)
{
	var settings = $.extend({}, $.fn.simplePagination.defaults, options);

	return this.each(function()
	{
		var container_id = $(this).attr('id'),
			items = $(this).find(settings.pagination_container).children(),
			item_count = items.length,
			items_per_page = +settings.items_per_page,//force to Number type with + or parseInt()
			page_count = Math.ceil(item_count / items_per_page),
			truncate_page_navigation = +settings.truncate_page_navigation;//force to Number type with + or parseInt()

		function refresh_navigation(page_number)
		{
			var refresh_first = function()
				{
					var first_html = '<a href="#" class="simplePagination-navigation-first';
					first_html += page_count === 1 || page_number === 1 ? ' simplePagination-navigation-disabled' : '';
					first_html += '" data-simplePagination-page-number="' + 1 + '">' + settings.first_content + '</a>';
					return first_html;
				},
				refresh_previous = function()
				{
					var previous_page = page_number > 1 ? page_number - 1 : 1,
					previous_html = '<a href="#" class="simplePagination-navigation-previous';
					previous_html += page_count === 1 || page_number === 1 ? ' simplePagination-navigation-disabled' : '';
					previous_html += '" data-simplePagination-page-number="' + previous_page + '">' + settings.previous_content + '</a>';
					return previous_html;
				},
				refresh_next = function()
				{
					var next_page = page_number + 1 > page_count ? page_count : page_number + 1,
					next_html = '<a href="#" class="simplePagination-navigation-next';
					next_html += page_count === 1 || page_number === page_count ? ' simplePagination-navigation-disabled' : '';
					next_html += '" data-simplePagination-page-number="' + next_page + '">' + settings.next_content + '</a>';
					return next_html;
				},
				refresh_last = function()
				{
					var last_html = '<a href="#" class="simplePagination-navigation-last';
					last_html += page_count === 1 || page_number === page_count ? ' simplePagination-navigation-disabled' : '';
					last_html += '" data-simplePagination-page-number="' + page_count + '">' + settings.last_content + '</a>';
					return last_html;
				},
				refresh_page_numbers = function()
				{
					//utilities for generating page number html
					//half_of_truncate FORCES even numbers to be treated the same as the next LOWEST odd number (e.g. 6 === 5)
					var half_of_truncate = Math.ceil(truncate_page_navigation / 2) - 1,
						current_while_page = 0,
						page_numbers_html = [],
						create_page_navigation = function()
						{
							page_number_html = '<a href="#" class="simplePagination-navigation-page';
							page_number_html += page_count === 1 || page_number === current_while_page ? ' simplePagination-navigation-disabled' : '';
							page_number_html += '" data-simplePagination-page-number="' + current_while_page + '">' + current_while_page + '</a>';
							page_numbers_html.push(page_number_html);
						};

					while(current_while_page < page_count)
					{
						++current_while_page;
						create_page_navigation(current_while_page);
					}

					//are we on the left half of the desired truncation length?
					if(page_number <= half_of_truncate)
					{
						page_numbers_html = page_numbers_html.slice(0, half_of_truncate * 2 + half_of_truncate - 1);
					}
					//are we on the right side of the desired truncation length?
					else if(page_number > page_count - half_of_truncate)
					{
						var min = page_count - half_of_truncate * 2 - half_of_truncate + 1,
							slice_min = min < 0 ? 0 : min;
						page_numbers_html = page_numbers_html.slice(slice_min, page_count);
					}
					else
					{
						var min = page_number - half_of_truncate - 1,
							slice_min = min < 0 ? 0 : min;

						page_numbers_html = page_numbers_html.slice(slice_min, page_number + half_of_truncate);
					}

					return page_numbers_html.join('');
				};

			if(settings.use_first)
			{
				$('.simplePagination-first').html(refresh_first);
			}
			if(settings.use_previous)
			{
				$('.simplePagination-previous').html(refresh_previous);
			}
			if(settings.use_next)
			{
				$('.simplePagination-next').html(refresh_next);
			}
			if(settings.use_last)
			{
				$('.simplePagination-last').html(refresh_last);
			}
			if(settings.use_page_numbers && truncate_page_navigation !== 0)
			{
				$('.simplePagination-page-numbers').html(refresh_page_numbers);
			}
		}

		function refresh_page_x_of_x(page_number)
		{
			$('#' + container_id + ' .simplePagination-page-x-of-x').html('Page ' + page_number + ' of ' + page_count);
		}

		function refresh_showing_x_of_x(page_number, item_range_min, item_range_max)
		{
			$('#' + container_id + ' .simplePagination-showing-x-of-x').html('Showing ' + item_range_min + '-' + item_range_max + ' of ' + item_count);
		}

		function refresh_select_specific_page_list()
		{

		}

		function show_page(page_number, item_range_min, item_range_max)
		{
			items.hide();
			items.slice(item_range_min, item_range_max).show();
		}

		function refresh_page_information(page_number)
		{
			var item_range_min = page_number * items_per_page - items_per_page,
				item_range_max = item_range_min + items_per_page;

			item_range_max = item_range_max > item_count ? item_count : item_range_max;

			show_page(page_number, item_range_min, item_range_max);
			refresh_navigation(page_number);
			refresh_page_x_of_x(page_number);
			refresh_showing_x_of_x(page_number, item_range_min + 1, item_range_max);
			refresh_select_specific_page_list();
		}
		refresh_page_information(1);

		$('#' + container_id).on('click', 'a[class^="simplePagination-navigation-"]', function(e)
		{
			var page_number = $(this).attr('data-simplePagination-page-number');
			refresh_page_information(+page_number);//force Number type with + OR parseInt()

			e.preventDefault();
		});

		$('#' + container_id + ' .simplePagination-items-per-page').change(function()
		{
			items_per_page = +$(this).val();//force Number type with + OR parseInt()
			page_count = Math.ceil(item_count / items_per_page);
			refresh_page_information(1);
		});

		$('#' + container_id + ' .simplePagination-select-specific-page').change(function()
		{
			specific_page = +$(this).val();//force Number type with + OR parseInt()
			refresh_page_information(specific_page);
		});
	});
};

$.fn.simplePagination.defaults = {
	pagination_container: 'tbody',
	items_per_page: 5,
	use_page_numbers: true,
	truncate_page_navigation: 5,
	//first link options
	use_first: true,
	first_content: 'First',  //e.g. '<<'
	//previous link options
	use_previous: true,
	previous_content: 'Previous',  //e.g. '<'
	//next link options
	use_next: true,
	next_content: 'Next',  //e.g. '>'
	//last link options
	use_last: true,
	last_content: 'Last', //e.g. '>>'
};

})(jQuery);