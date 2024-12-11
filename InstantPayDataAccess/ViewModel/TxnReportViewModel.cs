using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace InstantPayDataAccess.ViewModel
{
    public class TxnReportViewModel
    {
        [Key]
        public int Id { get; set; }
        public string TXN_ID { get; set; }
        public string BankRefNo { get; set; }
        public string UserName { get; set; }
        public string OperatorName { get; set; }
        public string AccountNo { get; set; }
        public decimal? OpeningBal { get; set; }
        public decimal? Amount { get; set; }
        public decimal? Closing { get; set; }
        public string Status { get; set; }
        public string APIName { get; set; }
        public string ComingFrom { get; set; }
        public string MasterDistributor { get; set; }
        public string Distributor { get; set; }
        public DateTime? TimeStamp { get; set; }
        public DateTime? UpdatedTime { get; set; }
        public string Success { get; set; }
        public string Failed { get; set; }
        public string APIRes { get; set; }
        public int? TotalTransactions { get; set; }
        public decimal? TotalAmount { get; set; }
        public int? flagforTrans { get; set; }
    }

    public class TxnDetails
    {
        [Key]
        public int TransId { get; set; }
        public string Status { get; set; }
        public string AccountNo { get; set; }
        
        public decimal? Cost { get; set; }
        public string ServiceName { get; set; }
        public string UserName { get; set; }
        public int? UserId { get; set; }

    }

    public class TxnRes
    {
        public string ErrorMsg { get; set; }
        public bool? flag { get; set; }

    }

}
