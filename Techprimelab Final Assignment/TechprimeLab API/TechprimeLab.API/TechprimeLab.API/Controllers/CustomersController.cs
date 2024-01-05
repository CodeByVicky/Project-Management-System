using Microsoft.AspNetCore.Mvc;
using TechprimeLab.API.Data;
using TechprimeLab.API.Models;
using Microsoft.EntityFrameworkCore;

namespace TechprimeLab.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class CustomersController : Controller
    {
        private readonly TechPrimeLabDbContext _techPrimeLabDbContext;

        public CustomersController(TechPrimeLabDbContext techPrimeLabDbContext)
        {
            _techPrimeLabDbContext = techPrimeLabDbContext;
        }


        [HttpGet]
        public async Task<IActionResult> GetAllCustomers()
        {
            var customers = await _techPrimeLabDbContext.Customers.ToListAsync();
            return Ok(customers);

        }
        [HttpPost]
        public async Task<IActionResult> AddCustomers([FromBody] Customer customerRequest)
        {

            await _techPrimeLabDbContext.Customers.AddAsync(customerRequest);
            await _techPrimeLabDbContext.SaveChangesAsync();

            return Ok(customerRequest);
        }


        [HttpPut("Update")]
        public IActionResult UpdateProjectStatus([FromQuery] string projectName, [FromBody] Customer statusUpdate)
        {
            var project = _techPrimeLabDbContext.Customers.FirstOrDefault(c => c.Project_Name == projectName);
            if (project != null)
            {
                project.Status = statusUpdate.Status;
                _techPrimeLabDbContext.SaveChanges();
                return Ok("Status updated successfully");
            }
            return NotFound("Project not found");
        }
    }
}
