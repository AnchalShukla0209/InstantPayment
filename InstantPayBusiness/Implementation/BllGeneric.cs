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
using InstantPayDataAccess.Model;

namespace InstantPayBusiness.Implementation
{
    public class BllGeneric : IBllGeneric
    {
        private readonly string _connectionString;
        public BllGeneric()
        {

            _connectionString = ConfigurationManager.ConnectionStrings["InstConn"].ConnectionString;
        }

        public List<UserData> GetUsers()
        {
            try
            {
                using (SqlConnection conn = new SqlConnection(_connectionString))
                {
                    using (SqlCommand cmd = new SqlCommand("USP_Users", conn))
                    {
                        cmd.CommandType = CommandType.StoredProcedure;
                        conn.Open();
                        SqlDataAdapter adapter = new SqlDataAdapter(cmd);
                        DataTable dt = new DataTable();
                        adapter.Fill(dt);
                        // Convert DataTable to List
                        var UserDataRec = new List<UserData>();
                        foreach (DataRow row in dt.Rows)
                        {
                            UserDataRec.Add(new UserData
                            {
                                id = Convert.ToInt32(row["Id"].ToString()),
                                Value = row["UserName"].ToString(),
                                
                            });
                        }

                        return UserDataRec;
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
