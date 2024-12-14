using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Data;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using InstantPayBusiness.Interface;

namespace InstantPaymentAdmin.Controllers
{
    public class ReportController : Controller
    {

        // GET: Report
        public ActionResult Index()
        {
            return View();
        }

        [HttpGet]
        public ActionResult TxnReport()
        {
            return View();
        }

        [HttpGet]
        public ActionResult WalletTopUpReport()
        {
            return View();
        }

        public JsonResult GetUsers()
        {
            try
            {

                var bllGen = InstantPayBusiness.IOC.BODependencyFactory.GetInstance<IBllGeneric>();
                var transactions = bllGen.GetUsers();
                return Json(new
                {
                    success = true,
                    data = transactions
                }, JsonRequestBehavior.AllowGet);


            }
            catch (Exception ex)
            {
                return Json(new { success = false, message = ex.Message }, JsonRequestBehavior.AllowGet);
            }
        }

        public JsonResult GetTransactionsReport(int pageIndex, int pageSize, string serviceType = "", string dateFrom = "", string dateTo = "", string status = "", int userId = 0)
        {
            try
            {
                var bllTxn = InstantPayBusiness.IOC.BODependencyFactory.GetInstance<IBllTxnreport>();
                var TxnRepdata = bllTxn.GetTransactions(pageIndex, pageSize, serviceType, dateFrom, dateTo, status, userId);
                return Json(new
                {
                    success = true,
                    data = TxnRepdata
                }, JsonRequestBehavior.AllowGet);


            }
            catch (Exception ex)
            {
                return Json(new
                {
                    success = false,
                    message = ex.Message
                }, JsonRequestBehavior.AllowGet);
            }
        }


        public JsonResult GetTransactionsReportDetails(int? TransId)
        {
            try
            {
                var bllTxn = InstantPayBusiness.IOC.BODependencyFactory.GetInstance<IBllTxnreport>();
                var TxnRepdata = bllTxn.GetTransactionsDetails(TransId);
                return Json(new
                {
                    success = true,
                    data = TxnRepdata
                }, JsonRequestBehavior.AllowGet);


            }
            catch (Exception ex)
            {
                return Json(new
                {
                    success = false,
                    message = ex.Message
                }, JsonRequestBehavior.AllowGet);
            }
        }

        [HttpPost]
        public JsonResult FailedOrRefundAction(string Status, string Remarks, int TransId, int UserId, string ServiceName, decimal Amount, string AccountNo, string UserName, decimal TxnAmount, string TxnPin)
        {
            try
            {
                int ActionById = 2;//Session["SuperAdminLoginId"]
                var bllTxn = InstantPayBusiness.IOC.BODependencyFactory.GetInstance<IBllTxnreport>();
                var TxnRepdata = bllTxn.TransRefundOrFailed(Status,Remarks,TransId,UserId,ServiceName,Amount,AccountNo,UserName,TxnAmount,TxnPin,ActionById);
                return Json(new
                {
                    success = true,
                    data = TxnRepdata
                }, JsonRequestBehavior.AllowGet);


            }
            catch (Exception ex)
            {
                return Json(new
                {
                    success = false,
                    message = ex.Message
                }, JsonRequestBehavior.AllowGet);
            }
        }

        public JsonResult GetWalletTopupReport(int pageIndex, int pageSize, string dateFrom = "", string dateTo = "")
        {
            try
            {
                var bllTxn = InstantPayBusiness.IOC.BODependencyFactory.GetInstance<IBllTxnreport>();
                var TxnRepdata = bllTxn.GetWalletTopupReport(pageIndex, pageSize, dateFrom, dateTo);
                return Json(new
                {
                    success = true,
                    data = TxnRepdata
                }, JsonRequestBehavior.AllowGet);


            }
            catch (Exception ex)
            {
                return Json(new

                {
                    success = false,
                    message = ex.Message
                }, JsonRequestBehavior.AllowGet);
            }
        }


    }
}