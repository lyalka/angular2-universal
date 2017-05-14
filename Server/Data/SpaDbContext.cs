using AspCoreServer.Models;
using Microsoft.EntityFrameworkCore;

namespace AspCoreServer.Data
{
    public class SpaDbContext : DbContext
    {
        public SpaDbContext(DbContextOptions<SpaDbContext> options)
            : base(options)
        {
            Database.EnsureCreated();

        }

        public DbSet<User> User { get; set; }
    }
}
