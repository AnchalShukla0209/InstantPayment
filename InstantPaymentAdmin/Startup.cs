using Microsoft.Owin;
using Owin;

[assembly: OwinStartupAttribute(typeof(SimphonySSO.Startup))]
namespace SimphonySSO
{
    public partial class Startup
    {
        public void Configuration(IAppBuilder app)
        {

            InstantPayBusiness.IOC.BODependencyFactory.Initialize();
        }
    }
}
