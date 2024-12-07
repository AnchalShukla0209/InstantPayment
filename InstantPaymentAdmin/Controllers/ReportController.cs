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



    }
}