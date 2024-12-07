using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Ninject;

namespace InstantPayBusiness.IOC
{
    
    public static class BODependencyFactory
    {
        private static StandardKernel _kernel;
        public static void Initialize(string ConnectionString = "InstConn")
        {
            var module = new BODependencyModule
            {
                //ConnectionString = ConnectionString
            };
            _kernel = new StandardKernel(module);
        }

        public static T GetInstance<T>()
        {
            return _kernel.Get<T>();
        }
    }
}
