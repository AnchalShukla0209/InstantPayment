//using Implementation;
//using Interfaces;
//using Morpho.DataAccess;
using InstantPayDataAccess;
using Ninject.Modules;

using InstantPayBusiness;
using InstantPayBusiness.Interface;
using InstantPayBusiness.Implementation;

namespace InstantPayBusiness.IOC
{

    internal class BODependencyModule : NinjectModule
    {

        public override void Load()
        {
            Bind<IBllTxnreport>().To<BllTxnreport>();
            Bind<IBllGeneric>().To<BllGeneric>();

        }
    }
}


