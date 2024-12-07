using InstantPayDataAccess.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace InstantPayBusiness.Interface
{
    public interface IBllGeneric
    {
        List<UserData> GetUsers();
    }
}
