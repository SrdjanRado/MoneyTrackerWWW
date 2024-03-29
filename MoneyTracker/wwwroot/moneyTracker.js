﻿const uri = "v1";
const uriuser = "v1/user";
const uricat = "v1/Category";
const uritxn = "v1/StatementEntry";
const uridash = "v1/UserDashboard";
//const uritxnsql = "v1/StatementEntrySQL";

let users = null;
let trans = null;
let sbscats = null;
let newtxns = null;
let dashbs = null;

function getCount(data,elname,eltext) {
    const el = $("#" + elname + "");
    //let name = "user";
    //if (data) {
    //    if (data > 1) {
    //        name = "users";
    //    }
    //    el.text(data + " " + name);
    //} else {
    //    el.text("No " + name);
    //}
    if (data) {
        el.text(eltext + " (" + data + ")");
    } 

}

$(document).ready(function () {
    getUsers();
});

function getUsers() {
    $.ajax({
        type: "GET",
        url: uriuser,
        cache: false,
        success: function (data) {
            const tBody = $("#users");

            $(tBody).empty();

            getCount(data.length,"counter","Users");

            $.each(data, function (key, item) {
                const tr = $("<tr></tr>")
                    .append($("<td></td>").text(item.userDetailId))
                    .append($("<td></td>").text(item.userName))
                    .append($("<td></td>").text(item.cisNumber))
                    .append($("<td></td>").text(item.isSetupFinished))
                    .append($("<td></td>").append($("<input/>", { type: "checkbox", disabled: true, checked: item.isNeverRemindAboutSetup })))
                    .append($("<td></td>").append($("<input/>", { type: "checkbox", disabled: true, checked: item.isNewToOnlineBanking })))
                    .append($("<td></td>").append($("<input/>", { type: "checkbox", disabled: true, checked: item.isHavingTransAccounts })))
                    .append($("<td></td>").append($("<input/>", { type: "checkbox", disabled: true, checked: item.isHavingTransactions })))
                    .append(
                        $("<td></td>").append(
                            $("<button>Select</button>").on("click", function () {
                                selectUser(item);
                            })
                        )
                    )
                    ;

                tr.appendTo(tBody);
            });

            users = data;
        }
    });

}

function selectUser(userDetail) {

    var btnin = document.getElementById("internetbanking");
    var btnmt = document.getElementById("moneytrackersetup");
    var divall = document.getElementById("welcomepage");
    var divsta = document.getElementById("statictext");
    var divdyn = document.getElementById("dynamictext");

    var divtxn = document.getElementById("transactions");
    divtxn.style.display = "none";
    var tbltxn = document.getElementById("tbltxn");
    tbltxn.style.display = "none";

    var divcat = document.getElementById("categories");
    divcat.style.display = "none";
    var tblcat = document.getElementById("tblcat");
    tblcat.style.display = "none";

    var divdash = document.getElementById("dashboards");
    divdash.style.display = "none";
    var tbldash = document.getElementById("tbldash");
    tbldash.style.display = "none";

    var divrec = document.getElementById("recommend");
    divrec.style.display = "none";

    // Show Welocome Page with Dynamic text saying let;s start
    if (userDetail.isSetupFinished == "NotCompleted" && userDetail.isNeverRemindAboutSetup == false && userDetail.isNewToOnlineBanking == false) {
        divall.style.display = "block";
        divall.innerHTML = "<h1>" + "Welcome user " + userDetail.userName + "</h1>";

        divsta.style.display = "block";
        divsta.innerHTML = "This is some static text for welcome page";

        btnin.style.display = "block";
        btnmt.style.display = "block";

        divdyn.style.display = "block";
        divdyn.innerHTML = "Start using Money Maker :)";

    }
    // Show Online Banking
    else if (userDetail.isNewToOnlineBanking == true || userDetail.isNeverRemindAboutSetup == true) {
        divall.style.display = "block";
        divall.innerHTML = "<h2>" + "Ned Bank Online Banking" + "</h2>";

        divsta.style.display = "none";

        btnin.style.display = "none";
        btnmt.style.display = "none";

        divdyn.style.display = "none";

    }
    // Show Dashboard
    else if (userDetail.isSetupFinished == "Completed") {
        //divall.style.display = "block";
        //divall.innerHTML = "<h1>" + "Money Tracker - User " + userDetail.userName + "</h1>";

        //divsta.style.display = "block";
        //divsta.innerHTML = "<h2>" + "Dashboard 1st" + "</h2>";

        //btnin.style.display = "none";
        //btnmt.style.display = "none";

        //divdyn.style.display = "none";

        // Show Transaction div and table
        divtxn.style.display = "block";
        divtxn.innerHTML = "List of Transactions";
        tbltxn.style.display = "block";

        // Show Categories div and table
        divcat.style.display = "block";
        divcat.innerHTML = "SBS Categories";
        tblcat.style.display = "block";

        // Show Dashboards div and table
        divdash.style.display = "block";
        divdash.innerHTML = "User Dashboards";
        tbldash.style.display = "block";

        getTrasanctions();
        getCategories();
        getAllDashboards();
    }
}

function getTrasanctions() {
    $.ajax({
        type: "GET",
        url: uritxn,
        cache: false,
        success: function (data) {
            const tBody = $("#tbbtxn");
            getCount(data.length, "transactions", "List of Transactions");

            $(tBody).empty();

            $.each(data, function (key, item) {
                const tr = $("<tr></tr>")
                    .append($("<td></td>").text(item.statementEntryId))
                    .append($("<td></td>").text(item.account))
                    .append($("<td></td>").text(item.description))
                    .append($("<td></td>").append($("<input/>", { type: "checkbox", disabled: true, checked: item.debit})))
                    .append($("<td></td>").text(item.amount))
                    .append(
                        $("<td></td>").append(
                            $("<button>Select</button>").on("click", function () {
                                recommentCategory(item);
                            })
                        )
                        )
                    ;

                tr.appendTo(tBody);
            });

            users = data;
        }
    });

}

function getCategories() {
    $.ajax({
        type: "GET",
        url: uricat,
        cache: false,
        success: function (data) {
            const tBody = $("#tbbcat");

            $(tBody).empty();

            $.each(data, function (key, item) {
                const tr = $("<tr></tr>")
                    .append($("<td></td>").text(item.categoryId))
                    .append($("<td></td>").text(item.categoryName))
                    .append($("<td></td>").text(item.categoryDescription))
                    .append($("<td></td>").text(item.categoryType.categoryTypeName))
                    .append($("<td></td>").append($("<input/>", { type: "checkbox", disabled: true, checked: item.isDebit })))
                    
                    ;

                tr.appendTo(tBody);
            });

            sbscats = data;
        }
    });

}

function getAllDashboards() {
    $.ajax({
        type: "GET",
        url: uridash,
        cache: false,
        success: function (data) {
            const tBody = $("#tbbdash");

            $(tBody).empty();

            $.each(data, function (key, item) {
                const tr = $("<tr></tr>")
                    .append($("<td></td>").text(item.userDashboardId))
                    .append($("<td></td>").text(item.userDashboardName))
                    .append($("<td></td>").text(item.dashboardType.dashboardTypeName))
                    .append($("<td></td>").text(item.userDetail.userName))
                    ;

                tr.appendTo(tBody);
            });

            dashbs = data;
        }
    });

}

function recommentCategory(transaction) {
    $.ajax({
        type: "GET",
        url: uri + "/1/" + transaction.description,
        cache: false,
        success: function (data) {
            var recommend = data;
            var msg = "Statement entry (" + transaction.statementEntryId + ") " + transaction.description + ": Recommend = " + recommend;

            var divrec = document.getElementById("recommend");
            divrec.style.display = "block";
            divrec.innerHTML = "<h3>" + msg + "</h3>";
        }
    });


}

function getNewStatementsSave() {
    var comboInput = document.getElementById("statementinput");
    var inInput = comboInput.options[comboInput.selectedIndex].value;

    $.ajax({
        type: "GET",
        url: uritxn + "/statemententries/" + inInput,
        cache: false,
        success: function (data) {
            newtxns = data;
        }
    });
}

function testStuff() {
    $.ajax({
        type: "GET",
        //url: uri + "/teststuff",
        url: uri + "/welcome/191018431808",
        cache: false,
        success: function (data) {
            newtxns = data;
        }
    });
}