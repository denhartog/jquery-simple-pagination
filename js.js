(function($){

var items = $('tbody').children(),
	item_count = items.length,
	items_per_page = 5,
	page_count = Math.ceil(item_count / items_per_page),
	show_first = true,
	show_previous = true,
	show_next = true,
	show_last = true;

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
			if(show_first){
				first_html += '<a href="#" class="simplePagination-navigation-first" data-simplePagination-page-number="' + 1 + '">First</a>';
			}
			//do we want to see the 'previous' navigation?
			if(show_previous){
				previous_html += '<a href="#" class="simplePagination-navigation-previous" data-simplePagination-page-number="' + (page_number - 1) + '">Previous</a>';
			}
		}
		//if we are on a page that is NOT the last, show next/last navigation
		if(page_number < page_count){
			//do we want to see the 'next' navigation?
			if(show_next){
				next_html += '<a href="#" class="simplePagination-navigation-next" data-simplePagination-page-number="' + (page_number + 1) + '">Next</a>';
			}
			//do we want to see the 'last' navigation?
			if(show_last){
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

	$('.simplePagination-navigation').html(first_html + previous_html + page_numbers_html + next_html + last_html);
}

function refresh_current_page(page_number){
	$('.simplePagination-current-page-text').text('Page ' + page_number + ' of ' + page_count);
}

function refresh_current_items(page_number, page_range_min, page_range_max){
	$('.simplePagination-current-items-text').text('Showing ' + page_range_min + '-' + page_range_max + ' of ' + item_count);
}

function show_page(page_number, page_range_min, page_range_max){
	items.hide();
	items.slice(page_range_min, page_range_max).show();
}

function refresh_page_information(page_number){
	var page_range_min = page_number * items_per_page - items_per_page,
		page_range_max = page_range_min + items_per_page;

	show_page(page_number, page_range_min, page_range_max);
	refresh_page_navigation(page_number);
	refresh_current_page(page_number);
	refresh_current_items(page_number, page_range_min + 1, page_range_max);
}
refresh_page_information(1);

$('.simplePagination-navigation').on('click', 'a', function(){
	var page_number = $(this).attr('data-simplePagination-page-number');
	refresh_page_information(+page_number);////force Number type with + OR parseInt()
	return false;//==function(e){e.preventDefault();}
});

$('.simplePagination-update-items-per-page').change(function(){
	items_per_page = +$(this).val();//force Number type with + OR parseInt()
	page_count = Math.ceil(item_count / items_per_page);
	refresh_page_information(1);
});

})(jQuery);