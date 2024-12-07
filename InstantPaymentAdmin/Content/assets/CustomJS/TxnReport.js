$(document).ready(function () {

    BindDropdownlist('GetUsers', 'ddlUsers', '')

    let pageIndex = 1;
    const pageSize = 10;
    let totalPages = 0;

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
                <td class="gridjs-td">${transaction.TimeStamp}</td>
                <td class="gridjs-td">${transaction.UpdatedTime ? new Date(transaction.UpdatedTime).toLocaleString() : ''}</td>
                 <td class="gridjs-td">
                <i class="fa ${successIcon}" style="color:green;font-size: 18px;" data-toggle="modal" data-target="#statusModal" 
                   data-status="${transaction.Success}" 
                   data-message="Transaction Successful!"></i>
            </td>
            <td class="gridjs-td">
                <i class="fa ${failedIcon}" data-toggle="modal" style="color:red;font-size: 18px;" data-target="#statusModal" 
                   data-status="${transaction.Failed}" 
                   data-message="Transaction Failed!"></i>
            </td>
            <td class="gridjs-td">
                <i class="fa ${apiResIcon} api-res-icon" data-bs-toggle="modal" style="color:blue;font-size: 18px;" id="ApiRes" data-bs-target="#exampleModal" 
                   data-status='${JSON.stringify(transaction.APIRes)}'  
                   data-message="API Response Details"></i>
            </td>
            </tr>`;
            tableBody.append(row);
        });
    }


    $(document).on('click', '.api-res-icon', function () {
        var statusString = $(this).data('status');
        var status = JSON.parse(statusString);
        $('#Res1').text(status);

    });


    function renderPagination() {
        let paginationContainer = $('#paginationContainer');
        paginationContainer.empty();
        paginationContainer.append(`<button ${pageIndex === 1 ? 'disabled' : ''} onclick="changePage(${pageIndex - 1})">Previous</button>`);
        for (let i = 1; i <= totalPages; i++) {
            paginationContainer.append(`<button class="${i === pageIndex ? 'gridjs-currentPage' : ''}" onclick="changePage(${i})">${i}</button>`);
        }
        paginationContainer.append(`<button ${pageIndex === totalPages ? 'disabled' : ''} onclick="changePage(${pageIndex + 1})">Next</button>`);
    }

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

    window.changePage = function (newPageIndex) {
        pageIndex = newPageIndex;
        loadTransactions();
    };
    loadTransactions();
})