$(document).ready(function () {

   

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
        url: 'GetWalletTopupReport',
        type: 'GET',
        data: {
            pageIndex: pageIndex,
            pageSize: pageSize,
            dateFrom: $('#txtfromDate').val(),
            dateTo: $('#txtToDate').val()
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
       
        let apiResIcon = transaction.Remarks ? 'fa-info-circle' : '';
        var timeStampDate = convertJsonDate(transaction.txndate);
        let row = `<tr>
                <td class="gridjs-td">${transaction.Id}</td>
                <td class="gridjs-td">${transaction.UserName}</td>
                <td class="gridjs-td">${transaction.OpeningBal}</td>
                <td class="gridjs-td">${transaction.Amount}</td>
                <td class="gridjs-td">${transaction.Closing}</td>
                <td class="gridjs-td">${transaction.txnType}</td>
                <td class="gridjs-td">${transaction.CrdrType}</td>
                
                
                <td class="gridjs-td">${timeStampDate ? timeStampDate.toLocaleString() : 'Invalid date'}</td>
                
            <td class="gridjs-td">
                <i class="fa ${apiResIcon} api-res-icon" data-bs-toggle="modal" style="color:blue;font-size: 18px;" id="ApiRes" data-bs-target="#exampleModal" 
                   data-status='${JSON.stringify(transaction.Remarks)}'  
                   data-message="Remarks"></i>
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



window.changePage = function (newPageIndex) {
    pageIndex = newPageIndex;
    loadTransactions();
};

function convertJsonDate(jsonDate) {
    var timestamp = jsonDate.match(/\/Date\((\d+)\)\//); // Match the number inside /Date(...)
    return timestamp ? new Date(parseInt(timestamp[1])) : null; // Convert to Date object
}
