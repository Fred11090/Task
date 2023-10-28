using Microsoft.EntityFrameworkCore;

namespace Task;

public class InputCommandContext : DbContext
{
    public DbSet<InputCommand> Commands { get; set; }
    public InputCommandContext(DbContextOptions<InputCommandContext> options) : base(options)
    {
        Database.EnsureCreated();
    }
}