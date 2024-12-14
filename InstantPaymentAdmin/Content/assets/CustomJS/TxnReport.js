$(document).ready(function () {

    BindDropdownlist('GetUsers', 'ddlUsers', '')

    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); // January is 0!
    var yyyy = today.getFullYear();

    today = yyyy + '-' + mm + '-' + dd;

    $('#txtfromDate').val(today);
    $('#txtToDate').val(today);


    $(document).on('click', '.api-res-icon', function () {
        var statusString = $(this).data('status');
        var status = JSON.parse(statusString);
        $('#Res1').text(status);

    });

    loadTransactions();
    

    $("#btnSearch").click(function () {

        loadTransactions();

    })

    $(".gridjs-input").on("keyup", function () {
        var value = $(this).val().toLowerCase();  // Get the search value and convert it to lowercase

        // Filter rows based on the input value
        $("#tblTxnReport tbody tr").filter(function () {
            // Check if any cell in the row contains the search value
            $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1);
        });
    });

   
   

    
})


var pageIndex = 1;
const pageSize = 10;
var totalPages = 0;

function loadTransactions() {
    $.ajax({
        url: 'GetTransactionsReport',
        type: 'GET',
        data: {
            pageIndex: pageIndex,
            pageSize: pageSize,
            serviceType: $('#ddlServices').val(),
            dateFrom: $('#txtfromDate').val(),
            dateTo: $('#txtToDate').val(),
            status: $('#ddlStatus').val(),
            userId: $('#ddlUsers').val()
        },
        success: function (response) {
            if (response.success) {
                $(".gridjs-input").val("");
                renderTable(response.data);
                if (response.data[0] != undefined && response.data[0] != null) {
                    $("#TotalTran").text(response.data[0].TotalTransactions);
                    $("#TotalTranAmt").text(response.data[0].TotalAmount);
                    totalPages = Math.ceil(response.totalRecords / pageSize);
                }

                renderPagination();
            } else {
                alert(response.message);
            }
        },
        error: function () {
            alert('Error fetching data.');
        }
    });
}

function renderTable(data) {
    let tableBody = $('#TxnReportData');
    tableBody.empty();

    data.forEach(transaction => {
        let successIcon = 'fa-check-circle';
        let failedIcon = 'fa-times-circle';
        let apiResIcon = transaction.APIRes ? 'fa-info-circle' : '';
        var timeStampDate = convertJsonDate(transaction.TimeStamp);
        var updatedTimeDate = convertJsonDate(transaction.UpdatedTime);
        let sucessAction = `<td class="gridjs-td">
    <i class="fa ${successIcon}" onclick="SucessOperation(${transaction.TXN_ID})" 
       style="color:green;font-size:18px;" 
       data-toggle="modal" data-target="#statusModal" 
       data-status="${transaction.Success}" 
       data-message="Transaction Successful!"></i>
</td>`;
        let Rejectaction = `<td class="gridjs-td">
    <i class="fa ${failedIcon}" data-toggle="modal" 
       onclick="RefundOrFailed(${transaction.TXN_ID})" 
       style="color:red;font-size:18px;" 
       data-target="#statusModal" 
       data-status="${transaction.Failed}" 
       data-message="Transaction Failed!"></i>
</td>`;

        let sucessdata = parseInt(transaction.flagforTrans) > 0 && transaction.Status.trim().toUpperCase() != "SUCCESS" ? sucessAction : '<td><span class="badge bg-primary-gradient">Success</span></td>';
        let Rejectdata = parseInt(transaction.flagforTrans) > 0 ? Rejectaction : '<td></td>';
        let row = `<tr>
                <td class="gridjs-td">${transaction.TXN_ID}</td>
                <td class="gridjs-td">${transaction.BankRefNo}</td>
                <td class="gridjs-td">${transaction.UserName}</td>
                <td class="gridjs-td">${transaction.OperatorName}</td>
                <td class="gridjs-td">${transaction.AccountNo}</td>
                <td class="gridjs-td">${transaction.OpeningBal}</td>
                <td class="gridjs-td">${transaction.Amount}</td>
                <td class="gridjs-td">${transaction.Closing}</td>
                <td class="gridjs-td">${transaction.Status}</td>
                <td class="gridjs-td">${transaction.APIName}</td>
                <td class="gridjs-td">${transaction.ComingFrom}</td>
                <td class="gridjs-td">${transaction.MasterDistributor}</td>
                <td class="gridjs-td">${transaction.Distributor}</td>
                <td class="gridjs-td">${timeStampDate ? timeStampDate.toLocaleString() : ''}</td>
                <td class="gridjs-td">${updatedTimeDate ? updatedTimeDate.toLocaleString() : ''}</td>
                 ${sucessdata}
                 ${Rejectdata}
            <td class="gridjs-td">
                <i class="fa ${apiResIcon} api-res-icon" data-bs-toggle="modal" style="color:blue;font-size: 18px;" id="ApiRes" data-bs-target="#exampleModal" 
                   data-status='${JSON.stringify(transaction.APIRes)}'  
                   data-message="API Response Details"></i>
            </td>
            </tr>`;
        tableBody.append(row);
    });
}

function renderPagination() {
    let paginationContainer = $('#paginationContainer');
    paginationContainer.empty();
    paginationContainer.append(`<button ${pageIndex === 1 ? 'disabled' : ''} onclick="changePage(${pageIndex - 1})">Previous</button>`);
    for (let i = 1; i <= totalPages; i++) {
        paginationContainer.append(`<button class="${i === pageIndex ? 'gridjs-currentPage' : ''}" onclick="changePage(${i})">${i}</button>`);
    }
    paginationContainer.append(`<button ${pageIndex === totalPages ? 'disabled' : ''} onclick="changePage(${pageIndex + 1})">Next</button>`);
}

function RefundOrFailed(TXN_ID) {
    $.ajax({
        url: 'GetTransactionsReportDetails',
        type: 'GET',
        data: {
            TransId: TXN_ID
        },
        success: function (response) {
            if (response.success) {

                $("#txtTxnDet").text(response.data[0].ServiceName + "/" + response.data[0].AccountNo);
                $("#txtRefundAmount").val(response.data[0].Cost);
                $("#txtCurrentStatus").val(response.data[0].Status);
                $("#TxnId").val(response.data[0].TransId);
                $("#AccountNo").val(response.data[0].AccountNo);
                $("#ServiceName").val(response.data[0].ServiceName);
                $("#UserId").val(response.data[0].UserId);
                $("#UserName").val(response.data[0].UserName);
                $("#txtRefundPin").val("");
                $("#txtRemarks").val("");
                
                $("#TxnrefundModal").modal('show');
               
            }
            else
            {
                alert('Invalid Page!');
            }
        },
        error: function () {
            alert('Error fetching data.');
        }
    });

}

window.changePage = function (newPageIndex) {
    pageIndex = newPageIndex;
    loadTransactions();
};

function convertJsonDate(jsonDate) {
    if (jsonDate != null) {
        var timestamp = jsonDate.match(/\/Date\((\d+)\)\//); // Match the number inside /Date(...)
        return timestamp ? new Date(parseInt(timestamp[1])) : null; // Convert to Date object
    }
    else {
        return "";
    }
}

function SucessOperation(TXN_ID) {
    $.ajax({
        url: 'GetTransactionsReportDetails',
        type: 'GET',
        data: {
            TransId: TXN_ID
        },
        success: function (response) {
            if (response.success) {

                $("#txtTxnSuccessDet").text(response.data[0].ServiceName + "/" + response.data[0].AccountNo);
                $("#SucessTxnId").val(response.data[0].TransId);
                $("#SucessAccountNo").val(response.data[0].AccountNo);
                $("#SucessServiceName").val(response.data[0].ServiceName);
                $("#SucessUserId").val(response.data[0].UserId);
                $("#SucessUserName").val(response.data[0].UserName);
                $("#txtSuccessCurrentStatus").val(response.data[0].Status);
                $("#SucesstxtRemarks").val("");
                $("#TxnSuceessModel").modal('show');

            }
            else {
                alert('Invalid Page!');
            }
        },
        error: function () {
            alert('Error fetching data.');
        }
    });

}


function FailedOrRefundAction() {

    if (confirm('Are you sure, You want to Take Action?')) {

        if ($("#txtRefundPin").val().trim() == "") {
            alert('Please Enter Refund Pin!');
            return;
        }
        else {
            var ActionStatus = $("#txnFailed").is(":checked")
                ? $("#txnFailed").val()
                : $("#txnRefund").val();
            $.ajax({
                url: 'FailedOrRefundAction',
                type: 'POST',
                data: {
                    Status: ActionStatus,
                    Remarks: $("#txtRemarks").val(),
                    TransId: parseInt($('#TxnId').val()),
                    UserId: parseInt($('#UserId').val()),
                    ServiceName: $('#ServiceName').val(),
                    Amount: parseFloat($('#txtRefundAmount').val()),
                    AccountNo: $('#AccountNo').val(),
                    UserName: $('#UserName').val(),
                    TxnAmount: parseFloat($('#txtRefundAmount').val()),
                    TxnPin: $('#txtRefundPin').val()
                },
                success: function (response) {
                    if (response.success && response.data[0].flag) {
                        $("#txtTxnDet").text("");
                        $("#txtRefundAmount").val("");
                        $("#txtCurrentStatus").val("");
                        $("#TxnId").val("");
                        $("#AccountNo").val("");
                        $("#ServiceName").val("");
                        $("#UserId").val("");
                        $("#UserName").val("");
                        
                        $("#TxnrefundModal").modal('hide');
                        loadTransactions();
                        alert(response.data[0].ErrorMsg);
                       
                    } else {
                        
                        alert(response.data[0].ErrorMsg)
                        loadTransactions();
                    }
                },
                error: function () {
                    alert('Error fetching data.');
                }
            });
        }
    }
    else {
        return;
    }
}


function SuccessAction() {

    if (confirm('Are you sure, You want to Take Action?')) {
            $.ajax({
                url: 'FailedOrRefundAction',
                type: 'POST',
                data: {
                    Status: "SUCCESS",
                    Remarks: $("#txtRemarks").val(),
                    TransId: parseInt($('#SucessTxnId').val()),
                    UserId: parseInt($('#SucessUserId').val()),
                    ServiceName: $('#SucessServiceName').val(),
                    Amount: parseFloat(0),
                    AccountNo: $('#SucessAccountNo').val(),
                    UserName: $('#SucessUserName').val(),
                    TxnAmount: parseFloat(0),
                    TxnPin: ""
                },
                success: function (response) {
                    if (response.success && response.data[0].flag) {
                        $("#txtTxnSuccessDet").text("");
                        $("#SucessTxnId").val("");
                        $("#SucessAccountNo").val("");
                        $("#SucessServiceName").val("");
                        $("#SucessUserId").val("");
                        $("#SucessUserName").val("");
                        $("#TxnSuceessModel").modal('hide');
                        loadTransactions();
                        alert(response.data[0].ErrorMsg);


                    } else {
                        alert(response.data[0].ErrorMsg)
                        loadTransactions();
                    }
                },
                error: function () {
                    alert('Error fetching data.');
                }
            });
        }
 
}

