using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Migrations;
using TechprimeLab.API.Models;

namespace TechprimeLab.API.Data
{
    public class TechPrimeLabDbContext : DbContext
    {
        public TechPrimeLabDbContext(DbContextOptions options) : base(options)
        {
        }

        public DbSet<Customer> Customers { get; set; }

        public DbSet<Authentication> Authentications { get; set; }


        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<Customer>()
                .HasKey(c => new { c.Project_Name, c.Reason }); // Creating a composite key
        }
    }
}
