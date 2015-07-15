$(function() {
    $("#memberForm").on("submit", function(e) {
        e.preventDefault(); //don't navigate anywhere
        var firstName = $("#firstName").val();
        var lastName = $("#lastName").val();
        var status = $("#status").val();
        //TODO: sanitize input to prevent SQL injection, XSS, etc.
        //TODO: get requirements for input format and add validation (all text/whitespace is fair game currently)
        postToDatabase(firstName, lastName, status);
    });
});

function postToDatabase(firstName, lastName, status) {
    $.ajax({
        url: "/member/save",
        method: "POST",
        data: { firstName : firstName, lastName : lastName, status : status },
        beforeSend: function() { //disable the submit button and inform the user we're inserting
            $("#insertButton").attr("value", "Inserting...");
            $("#insertButton").prop("disabled", true);
        },
        success: function() { //in this demo, we'll never have success due to /member/save not existing
            console.log("Successfully saved lastName: " + lastName + ", firstName: " + firstName + ", status: " + status);
            insertIntoTable(firstName, lastName, status);
        },
        error: function() {
            console.log("Failed to save lastName: " + lastName + ", firstName: " + firstName + ", status: " + status);
            //we would inform the user of a problem here
            insertIntoTable(firstName, lastName, status); //for the demo, we'll pretend it worked and insert
        },
        complete: function() { //restore the submit button to original state
            $("#insertButton").attr("value", "Insert");
            $("#insertButton").prop("disabled", false);
        }
    });
}

function insertIntoTable(firstName, lastName, status) {
    //assume table already has at least one value
    //assume table is already alphabetized by lastName, firstName
    var fullName = lastName + ", " + firstName;
    var newRow = "<tr><td>" + fullName + "</td><td>" + status + "</td></tr>"
    var inserted = false;

    $("#memberTable > tbody > tr").each(function() { //for each row in the member table
        if ($(this).children(":first").text().localeCompare(fullName) === 1) { //if the member to be inserted belongs before the current row's member
            $(this).before(newRow); //insert the new row before the current row
            inserted = true;
            return false; //break out of loop
        }
    });

    if (!inserted) { //all existing members belong before the member to be inserted
        $("#memberTable > tbody > tr:last").after(newRow); //new row inserted at the end of the table
    }

    $("#memberForm").get(0).reset(); //empty form fields
    $("#memberForm > input:first").focus(); //focus on first form field to enable fast data entry
}