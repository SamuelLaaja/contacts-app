using ContactsWebApi.Config;
using ContactsWebApi.Repositories;
using ContactsWebApi.Services;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Options;


namespace ContactsWebApi
{
    public class Startup
    {
        public Startup(IConfiguration configuration, IOptions<AzureSettings> azureSettings)
        {
            Configuration = configuration;
            _azureSettings = azureSettings.Value;
        }

        public IConfiguration Configuration { get; }
        private readonly AzureSettings _azureSettings;

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.Configure<AzureSettings>(Configuration.GetSection("AzureSettings")); // hakee configit AzureSettings olioon.

            services.AddScoped<IAuthenticationService, AuthenticationService>();
            services.AddScoped<IContactService, ContactService>();
            services.AddScoped<IContactRepository, ContactRepository>();

            services.AddCors(o => o.AddPolicy("ContactsAppPolicy", builder =>
            {
                builder.AllowAnyOrigin().AllowAnyMethod().AllowAnyHeader();
            }));

            services.AddAuthentication(options =>
                {
                    options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
                    options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
                }
            ).AddJwtBearer(options =>
                {
                    options.Audience = _azureSettings.ApplicationId;
                    options.Authority = _azureSettings.LoginUrl + _azureSettings.DirectoryId;
                }
            );

            services.AddMvc();

            // Configure database
            services.AddDbContext<ContactsDbContext>(options =>
            {
                options.UseSqlServer(Configuration["ConnectionStringAzure"]);
            });
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IHostingEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }

            app.UseAuthentication();
            app.UseCors("ContactsAppPolicy");
            InitializeDataBase(app);
            app.UseMvc();
        }

        private static void InitializeDataBase(IApplicationBuilder app)
        {
            using (var serviceScope = app.ApplicationServices.GetService<IServiceScopeFactory>().CreateScope())
            {
                var context = serviceScope.ServiceProvider.GetRequiredService<ContactsDbContext>();
                context.Database.EnsureCreated();
            }
        }
    }
}
