const uri = "api/stringsimilar";

//$(document).ready(function () {
//    getData();
//});

//function getData() {
    
//}

function checkSimilar() {
    const compareStrings = {
        String1: $("#str1").val(),
        String2: $("#str2").val()
    };

    const cstr1 = $("#str1").val();
    const cstr2 = $("#str2").val();

    $.ajax({
        type: "POST",
        accepts: "application/json",
        url: uri,
        contentType: "application/json",
        data: JSON.stringify(compareStrings),
        error: function (jqXHR, textStatus, errorThrown) {
            alert("Something went wrong!");
        },
        success: function (result) {
            $("#result").val(result);
        }
    });
}

