jquery-simple-pagination
========================
I built this over a single day so please help me work out the kinks and make suggestions!

Works great with TABLEs and DIVs and EVERYTHING, oh my!

Current extendable defaults:
====
1) pagination_container: 'tbody'
    1.1) Assign if not using .simplePagination(); on a <table>
2) items_per_page: 25
    2.1) Assign to change the number of initial numbers of items to be displayed
3) show_first: true
    3.1) boolean; set to false to prevent the 'First' nav link from EVER appearing
4) show_previous: true
    4.1) boolean; set to false to prevent the 'Previous' nav link from EVER appearing
5) show_next: true
    5.1) boolean; set to false to prevent the 'Next' nav link from EVER appearing
6) show_last: true
    6.1) boolean; set to false to prevent the 'Last' nav link from EVER appearing

Usage:
=====
$('#example').simplePaginaton();

Assuming #example is a <table>:
    1) The <tr>'s in the <tbody> will be paginated
    2) Somewhere within the <table></table> (e.g. <tfoot>) the following must exist:
        2.1) .simplePagination-navigation
        2.2) .simplePagination-current-page-text
        2.3) .simplePagination-current-items-text
        2.4) .simplePagination-update-items-per-page

E.g.
<table id="first-container">
	<tbody>
		<!--http://www.marijn.org/everything-is-4/counting-0-to-100/english/-->
		<tr><td>One</td></tr>
		...
		<tr><td>One hundred</td></tr>
	</tbody>
	<tfoot>
		<tr><td class="simplePagination-navigation"></td></tr>
		<tr><td class="simplePagination-current-page-text"></td></tr>
		<tr><td class="simplePagination-current-items-text"></td></tr>
		<tr><td>
			<select class="simplePagination-update-items-per-page">
				<option value="5">Five</option>
				...
				<option value="25">Twenty-five</option>
			</select>
		</td></tr>
	</tfoot>
</table>

See examples for other usage (e.g. without <table>)
=====

Future development:
=====
Expand defaults to include/exclude enabling:
    1) Page x of x
    2) Showing x-x of x
    3) Update items per page
    4) Navigation? (Perhaps only first X should be visable for some reason...)
    5) Updates values of #simplePagination-update-items-per-page when using dual navigation
    6) Make it so only one of First/Previous AND Next/Last appear on 2nd AND 2nd-to-last page