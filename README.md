jquery-simple-pagination
========================
I built this over a single day so please help me work out the kinks and make suggestions!

Works great with TABLEs and DIVs and EVERYTHING, oh my!

Current extendable defaults:
====
```javascript
pagination_container: 'tbody'
```
Assign if not using .simplePagination(); on a TABLE

```javascript
items_per_page: 25
```
Assign to change the number of initial numbers of items to be displayed

```javascript
show_first: true
```
boolean; set to false to prevent the 'First' nav link from EVER appearing

```javascript
show_previous: true
```
boolean; set to false to prevent the 'Previous' nav link from EVER appearing

```javascript
show_next: true
```
boolean; set to false to prevent the 'Next' nav link from EVER appearing

```javascript
show_last: true
```
boolean; set to false to prevent the 'Last' nav link from EVER appearing

Usage:
=====
```javascript
$('#example').simplePaginaton();
```

Assuming #example is a TABLE:
1) The TRs in the TBODY will be paginated

2)Somewhere within the TABLE's tags (e.g. TFOOT) the following should exist:
```css
.simplePagination-navigation
.simplePagination-current-page-text
.simplePagination-current-items-text
.simplePagination-update-items-per-page
```

E.g.
```html
<table id="first-container">
	<tbody>
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
```

See paginate.html for usage/examples (e.g. using DIVs instead TABLEs)
=====

Future development:
=====
Expand defaults to include/exclude enabling:
Page x of x
Showing x-x of x
Update items per page
Navigation? (Perhaps only first X should be visable for some reason...)
Updates values of #simplePagination-update-items-per-page when using dual navigation
Make it so only one of First/Previous AND Next/Last appear on 2nd AND 2nd-to-last page