using InstantPayDataAccess.ViewModel;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace InstantPayBusiness.Interface
{
    public interface IBllTxnreport
    {
        List<TxnReportViewModel> GetTransactions(int pageIndex, int pageSize, string serviceType = "", string dateFrom = "", string dateTo = "", string status = "", int userId = 0);
        List<TxnDetails> GetTransactionsDetails(int? TxnId);

        List<TxnRes> TransRefundOrFailed(string Status, string Remarks, int TransId, int UserId, string ServiceName, decimal Amount, string AccountNo, string UserName, decimal TxnAmount, string TxnPin, int ActionById);
    }
}
