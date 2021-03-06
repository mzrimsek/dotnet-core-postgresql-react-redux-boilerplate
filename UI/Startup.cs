using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Diagnostics;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Configuration;
using UI.Helpers;

namespace UI
{
    public class Startup
    {
        public IConfigurationRoot Configuration { get; }

        public Startup(IHostingEnvironment env)
        {
            var builder = StartupHelper.GetConfigurationBuilder(env);
            Configuration = builder.Build();
        }

        public void Configure(IApplicationBuilder app)
        {
            app.UseMvc();
            app.UseStaticFiles();
            app.UseMvc(routes => 
            {
                routes.MapRoute(
                    name: "default",
                    template: "{controller}/{action}/{id?}"
                );
            });
            app.UseStatusCodePages();
        }

        public void ConfigureServices(IServiceCollection services)
        {
            services.AddMvc();

            StartupHelper.AddDatabaseConnectionToServices(services, Configuration);
            StartupHelper.AddDependencyInjectionToServices(services);
        }
    }
}
