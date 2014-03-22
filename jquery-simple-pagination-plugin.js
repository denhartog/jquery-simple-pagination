(function($){

$.fn.simplePagination = function(options)
{
	var settings = $.extend({}, $.fn.simplePagination.defaults, options);

	/*
	NUMBER FORMATTING
	*/
	function simple_number_formatter(number, digits_after_decimal, thousands_separator, decimal_separator)
	{
		//OTHERWISE 0==false==undefined
		digits_after_decimal = isNaN(digits_after_decimal) ? 2 : parseInt(digits_after_decimal);
		//was a thousands place separator provided?
		thousands_separator = (typeof thousands_separator === 'undefined') ? ',' : thousands_separator;
		//was a decimal place separator provided?
		decimal_separator = (typeof decimal_separator === 'undefined') ? '.' : decimal_separator;

			//123.45 => 123==integer; 45==fraction
		var parts = ((+number).toFixed(digits_after_decimal) + '').split(decimal_separator),  // Force Number typeof with +: +number
			//obtain the integer part
			integer = parts[0] + '',
			//obtain the fraction part IF one exists
			fraction = (typeof parts[1] === 'undefined') ? '' : parts[1],
			//create the decimal(fraction) part of the answer
			decimal = digits_after_decimal > 0 ? decimal_separator + fraction : '',
			//find 1 or more digits, EXACTLY PRECEDING, exactly 3 digits
			pattern = /(\d+)(\d{3})/;
			//pattern = /(\d)(?=(\d{3})+$)/; .replace(..., '$1' + thousands_separator

		//while the pattern can be matched
		while(pattern.test(integer))
		{
			//insert the specified thousands place separator
			integer = integer.replace(pattern, '$1' + thousands_separator + '$2');
		}

		//return the formated number!
		return integer + decimal;
	}

	return this.each(function()
	{
		var container_id = '#' + $(this).attr('id'),
			items = $(this).find(settings.pagination_container).children(),
			item_count = items.length,
			items_per_page = parseInt(settings.items_per_page),
			page_count = Math.ceil(item_count / items_per_page),
			number_of_visible_page_numbers = parseInt(settings.number_of_visible_page_numbers);

		// Show the appropriate items given the specific page_number
		function refresh_page(page_number, item_range_min, item_range_max)
		{
			items.hide();
			items.slice(item_range_min, item_range_max).show();
		}

		function refresh_first(page_number)
		{
			// e.g.
			// <a href="#" class="simple-pagination-navigation-first [simple-pagination-nagivation-disabled]"
			// data-simple-pagination-page-number="1">First</a>
			/*
			var element = document.createElement(settings.navigation_element);
			element.id = 'rawr';
			element.href = '#';
			element.className = settings.html_prefix + '-navigation-first';
			element.className += page_count === 1 || page_number === 1 ? ' ' + settings.html_prefix + '-navigation-disabled' : '';
			element.setAttribute('data-' + settings.html_prefix + '-page-number', 1);
			element.appendChild(document.createTextNode(settings.first_content));
			*/
			var first_html = '<' + settings.navigation_element + ' href="#" class="' + settings.html_prefix + '-navigation-first';
			first_html += page_count === 1 || page_number === 1 ? ' ' + settings.html_prefix + '-navigation-disabled' : '';
			first_html += '" data-' + settings.html_prefix + '-page-number="' + 1 + '">' + settings.first_content + '</' + settings.navigation_element + '>';
			return first_html;  // return element.outerHTML;
		}

		function refresh_previous(page_number)
		{
			var previous_page = page_number > 1 ? page_number - 1 : 1,
				previous_html = '<' + settings.navigation_element + ' href="#" class="' + settings.html_prefix + '-navigation-previous';
			previous_html += page_count === 1 || page_number === 1 ? ' ' + settings.html_prefix + '-navigation-disabled' : '';
			previous_html += '" data-' + settings.html_prefix + '-page-number="' + previous_page + '">' + settings.previous_content + '</' + settings.navigation_element + '>';
			return previous_html;
		}

		function refresh_next(page_number)
		{
			var next_page = page_number + 1 > page_count ? page_count : page_number + 1,
				next_html = '<' + settings.navigation_element + ' href="#" class="' + settings.html_prefix + '-navigation-next';
			next_html += page_count === 1 || page_number === page_count ? ' ' + settings.html_prefix + '-navigation-disabled' : '';
			next_html += '" data-' + settings.html_prefix + '-page-number="' + next_page + '">' + settings.next_content + '</' + settings.navigation_element + '>';
			return next_html;
		}

		function refresh_last(page_number)
		{
			var last_html = '<' + settings.navigation_element + ' href="#" class="' + settings.html_prefix + '-navigation-last';
			last_html += page_count === 1 || page_number === page_count ? ' ' + settings.html_prefix + '-navigation-disabled' : '';
			last_html += '" data-' + settings.html_prefix + '-page-number="' + page_count + '">' + settings.last_content + '</' + settings.navigation_element + '>';
			return last_html;
		}

		function refresh_page_numbers(page_number)
		{
			// half_of_number_of_page_numbers_visable causes even numbers to be treated the same as the next LOWEST odd number (e.g. 6 === 5)
			// Used to center the current page number in 'else' below
			var half_of_number_of_page_numbers_visable = Math.ceil(number_of_visible_page_numbers / 2) - 1,
				current_while_page = 0,
				page_numbers_html = [],
				create_page_navigation = function()
				{
					page_number_html = '<' + settings.navigation_element + ' href="#" class="' + settings.html_prefix + '-navigation-page';
					page_number_html += page_count === 1 || page_number === current_while_page ? ' ' + settings.html_prefix + '-navigation-disabled' : '';
					page_number_html += '" data-' + settings.html_prefix + '-page-number="' + current_while_page + '">' + simple_number_formatter(current_while_page, 0, settings.thousands_separator) + '</' + settings.navigation_element + '>';
					page_numbers_html.push(page_number_html);
				};

			//are we on the left half of the desired truncation length?
			if(page_number <= half_of_number_of_page_numbers_visable)
			{
				var max = half_of_number_of_page_numbers_visable * 2 + 1;
				max = max > page_count ? page_count : max;
				while(current_while_page < max)
				{
					++current_while_page;
					create_page_navigation();
				}
			}
			//are we on the right side of the desired truncation length?
			else if(page_number > page_count - half_of_number_of_page_numbers_visable)
			{
				var min = page_count - half_of_number_of_page_numbers_visable * 2 - 1;
				current_while_page = min < 0 ? 0 : min;
				while(current_while_page < page_count)
				{
					++current_while_page;
					create_page_navigation();
				}
			}
			//have lots of pages
			//half_of_num... + number_of_visible_page_numbers + half_of_num...
			//center the current page between: number_of_visible_page_numbers
			else
			{
				var min = page_number - half_of_number_of_page_numbers_visable - 1,
					max = page_number + half_of_number_of_page_numbers_visable;
				current_while_page = min < 0 ? 0 : min;
				max = max > page_count ? page_count : max;//shouldn't need this but just being cautious
				while(current_while_page < max)
				{
					++current_while_page;
					create_page_navigation();
				}
			}

			return page_numbers_html.join('');
		}

		function refresh_items_per_page_list()
		{
			var items_per_page_html = '';
			$.each(settings.items_per_page_content, function(k, v){
				k = (typeof k === 'Number') ? simple_number_formatter(k, 0, settings.thousands_separator) : k;
				v = parseInt(v);
				items_per_page_html += '<option value="' + v + '"';
				items_per_page_html += v === items_per_page ? ' selected' : '';
				items_per_page_html += '>' + k + '</option>\n';
			});
			return items_per_page_html;
		}

		function refresh_specific_page_list(page_number)
		{
			var select_html = '';
			for(var i=1; i<=page_count; i++)
			{
				select_html += '<option value="' + i + '"';
				select_html += i === page_number ? ' selected' : '';
				select_html += '>' + simple_number_formatter(i, 0, settings.thousands_separator) + '</option>\n';
			}
			return select_html;
		}

		function refresh_simple_pagination(page_number)
		{
			var item_range_min = page_number * items_per_page - items_per_page,
				item_range_max = item_range_min + items_per_page;

			item_range_max = item_range_max > item_count ? item_count : item_range_max;

			refresh_page(page_number, item_range_min, item_range_max);

			if(settings.use_first)
			{
				$(container_id + ' .' + settings.html_prefix + '-first').html(refresh_first(page_number));
			}
			if(settings.use_previous)
			{
				$(container_id + ' .' + settings.html_prefix + '-previous').html(refresh_previous(page_number));
			}
			if(settings.use_next)
			{
				$(container_id + ' .' + settings.html_prefix + '-next').html(refresh_next(page_number));
			}
			if(settings.use_last)
			{
				$(container_id + ' .' + settings.html_prefix + '-last').html(refresh_last(page_number));
			}
			if(settings.use_page_numbers && number_of_visible_page_numbers !== 0)
			{
				$(container_id + ' .' + settings.html_prefix + '-page-numbers').html(refresh_page_numbers(page_number));
			}
			if(settings.use_page_x_of_x)
			{
				var page_x_of_x_html = '' + settings.page_x_of_x_content + ' ' + simple_number_formatter(page_number, 0, settings.thousands_separator) + ' of ' + simple_number_formatter(page_count, 0, settings.thousands_separator);
				$(container_id + ' .' + settings.html_prefix + '-page-x-of-x').html(page_x_of_x_html);
			}
			if(settings.use_page_count)
			{
				$(container_id + ' .' + settings.html_prefix + '-page-count').html(page_count);
			}
			if(settings.use_showing_x_of_x)
			{
				var showing_x_of_x_html = settings.showing_x_of_x_content + ' ' + simple_number_formatter(item_range_min + 1, 0, settings.thousands_separator) + '-' + simple_number_formatter(item_range_max, 0, settings.thousands_separator) + ' of ' + simple_number_formatter(item_count, 0, settings.thousands_separator);
				$(container_id + ' .' + settings.html_prefix + '-showing-x-of-x').html(showing_x_of_x_html);
			}
			if(settings.use_item_count)
			{
				$(container_id + ' .' + settings.html_prefix + '-item-count').html(item_count);
			}
			if(settings.use_items_per_page)
			{
				$(container_id + ' .' + settings.html_prefix + '-items-per-page').html(refresh_items_per_page_list);
			}
			if(settings.use_specific_page_list)
			{
				$(container_id + ' .' + settings.html_prefix + '-select-specific-page').html(refresh_specific_page_list(page_number));
			}
		}
		refresh_simple_pagination(1);

		$(container_id).on('click', settings.navigation_element + '[data-' + settings.html_prefix + '-page-number]', function(e)
		{
			e.preventDefault();

			var page_number = +$(this).attr('data-' + settings.html_prefix + '-page-number');
			refresh_simple_pagination(page_number);
		});

		$(container_id + ' .' + settings.html_prefix + '-items-per-page').change(function()
		{
			items_per_page = +$(this).val();
			page_count = Math.ceil(item_count / items_per_page);
			refresh_simple_pagination(1);
		});

		$(container_id + ' .' + settings.html_prefix + '-select-specific-page').change(function()
		{
			specific_page = +$(this).val();
			refresh_simple_pagination(specific_page);
		});
	});
};

$.fn.simplePagination.defaults = {
	pagination_container: 'tbody',
	html_prefix: 'simple-pagination',
	navigation_element: 'a',//button, span, div, et cetera
	items_per_page: 25,
	number_of_visible_page_numbers: 5,
	//
	use_page_numbers: true,
	use_first: true,
	use_previous: true,
	use_next: true,
	use_last: true,
	//
	use_page_x_of_x: true,
	use_page_count: false,// Can be used to combine page_x_of_x and specific_page_list
	use_showing_x_of_x: true,
	use_item_count: false,
	use_items_per_page: true,
	use_specific_page_list: true,
	//
	first_content: 'First',  //e.g. '<<'
	previous_content: 'Previous',  //e.g. '<'
	next_content: 'Next',  //e.g. '>'
	last_content: 'Last', //e.g. '>>'
	page_x_of_x_content: 'Page',
	showing_x_of_x_content: 'Showing',
	//
	items_per_page_content: {
		'Five': 5,
		'Ten': 10,
		'Twenty-five': 25,
		'Fifty': 50,
		'One hundred': 100
	},
	thousands_separator: ','
};

})(jQuery);