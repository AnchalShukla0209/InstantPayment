using InstantPayBusiness.Interface;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using InstantPayDataAccess.ViewModel;
using System.Configuration;

namespace InstantPayBusiness.Implementation
{
    
    public class BllTxnreport:IBllTxnreport
    {
        private readonly string _connectionString;
        public BllTxnreport()
        {
            
            _connectionString = ConfigurationManager.ConnectionStrings["InstConn"].ConnectionString;
        }
       
        public List<TxnReportViewModel> GetTransactions(int pageIndex, int pageSize, string serviceType = "", string dateFrom = "", string dateTo = "", string status = "", int userId = 0)
        {
            try
            {
                using (SqlConnection conn = new SqlConnection(_connectionString))
                {
                    using (SqlCommand cmd = new SqlCommand("USP_TxnReport", conn))
                    {
                        cmd.CommandType = CommandType.StoredProcedure;
                        cmd.Parameters.AddWithValue("@PageIndex", pageIndex);
                        cmd.Parameters.AddWithValue("@PageSize", pageSize);
                        cmd.Parameters.AddWithValue("@ServiceType", serviceType);
                        cmd.Parameters.AddWithValue("@DateFrom",  dateFrom);
                        cmd.Parameters.AddWithValue("@DateTo",  dateTo);
                        cmd.Parameters.AddWithValue("@Status", status );
                        cmd.Parameters.AddWithValue("@UserId", userId);

                        conn.Open();
                        SqlDataAdapter adapter = new SqlDataAdapter(cmd);
                        DataTable dt = new DataTable();
                        adapter.Fill(dt);

                        

                        // Convert DataTable to List
                        var transactions = new List<TxnReportViewModel>();
                        foreach (DataRow row in dt.Rows)
                        {
                            transactions.Add(new TxnReportViewModel
                            {
                                Id = Convert.ToInt32(row["Id"].ToString()),
                                TXN_ID = row["TXN_ID"].ToString(),
                                BankRefNo = row["BankRefNo"].ToString(),
                                UserName = row["UserName"].ToString(),
                                OperatorName = row["OperatorName"].ToString(),
                                AccountNo = row["AccountNo"].ToString(),
                                OpeningBal = Convert.ToDecimal(row["OpeningBal"]),
                                Amount = Convert.ToDecimal(row["Amount"]),
                                Closing = Convert.ToDecimal(row["Closing"]),
                                Status = row["Status"].ToString(),
                                APIName = row["APIName"].ToString(),
                                ComingFrom = row["ComingFrom"].ToString(),
                                MasterDistributor = row["MasterDistributor"].ToString(),
                                Distributor = row["Distributor"].ToString(),
                                TimeStamp = row["TimeStamp"].ToString(),
                                UpdatedTime = row["UpdatedTime"] != DBNull.Value ? Convert.ToDateTime(row["UpdatedTime"]) : (DateTime?)null,
                                Success = row["Success"].ToString(),
                                Failed = row["Failed"].ToString(),
                                APIRes = row["APIRes"].ToString(),
                                TotalTransactions = Convert.ToInt32(row["TotalTransactions"].ToString()),
                                TotalAmount = Convert.ToDecimal(row["TotalAmount"].ToString()),
                            });
                        }

                        return transactions;
                    }
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

    }
}
