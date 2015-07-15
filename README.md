Table Insert Demo
=======

### The Exercise:

> Given the following HTML provide a JavaScript function that takes first name, last name
> and status as arguments, inserts a new table row into the markup below sorted by name
> and saves the information to the database. You can modify the HTML as needed. You can
> assume that sending data to the URL, “/member/save”, will save the name and status.
> Please list any open source JavaScript libraries used in this solution.

```html
<table>
	<thead>
		<tr>
			<th>Name</th>
			<th>Status</th>
		</tr>
	</thead>
	<tbody>
		<tr>
			<td>Doe, John</td>
			<td>Approved</td>
		</tr>
	</tbody>
</table>
```

### My Implementation:

Initially I planned on not using any libraries, but later brought in jQuery to make the AJAX and table manipulation code more readable.  There are two main javascript functions, postToDatabase and insertIntoTable, the latter to be called on the success of the former.  For the demo however, postToDatabase will always fail due to /member/save not existing.  I've added a call to insertIntoTable upon failure to allow for manipulating the table.

Some assumptions I made:
* the table begins with at least one value (since one was given)
* the table begins alphabetized (since sorting is more efficent in the DB anyway)

Some TODOs if the code was to be made more complete:
* input format enforcement (field length, status options, whitespace/number requirements, etc.)
* input sanitation to prevent SQL injection, XSS (needed server side too)
* handling of duplicate input
* prompting the user when insertion to the DB has failed

I didn't make up validation/sanitization/UX/etc. requirements because I've found that making it up without consulting the customer/product owner is a Bad Idea and usually leads to rework.