using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.SpaServices.ReactDevelopmentServer;
using Task;

var builder = WebApplication.CreateBuilder();

builder.Services.AddControllers();
builder.Services.AddCors();
builder.Services.AddSpaStaticFiles(configuration =>
{
    configuration.RootPath = "client-app/build";
});
var connection = builder.Configuration.GetConnectionString("DefaultConnection");
builder.Services.AddDbContext<InputCommandContext>(options => options.UseSqlServer(connection));

var app = builder.Build();

app.UseRouting();
app.UseEndpoints(x => x.MapControllers());
app.UseSpaStaticFiles();
app.UseSpa(spa =>
{
    spa.Options.SourcePath = "my-app";

    if (app.Environment.IsDevelopment())
    {
        spa.UseReactDevelopmentServer(npmScript: "start");
    }
});
app.UseCors(corsBuilder => corsBuilder.AllowAnyOrigin()
    .AllowAnyHeader());

app.Run();;