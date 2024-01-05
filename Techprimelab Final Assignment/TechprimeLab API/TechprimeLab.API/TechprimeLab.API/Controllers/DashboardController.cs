using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Globalization;
using System.Linq;
using System.Threading.Tasks;
using TechprimeLab.API.Data;

namespace TechprimeLab.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class DashboardController : ControllerBase
    {
        private readonly TechPrimeLabDbContext _techPrimeLabDbContext;

        public DashboardController(TechPrimeLabDbContext techPrimeLabDbContext)
        {
            _techPrimeLabDbContext = techPrimeLabDbContext;
        }

        [HttpGet("projectCounts")]
        public IActionResult GetProjectCounts()
        {
            try
            {
                var projectCounts = _techPrimeLabDbContext.Customers
                    .GroupBy(p => 1)
                    .Select(g => new
                    {
                        TotalProjects = g.Count(),
                        Closed = g.Count(p => p.Status == "Closed"),
                        Running = g.Count(p => p.Status == "Running"),
                        Cancelled = g.Count(p => p.Status == "Cancelled")
                    })
                    .FirstOrDefault();

                return Ok(projectCounts);
            }
            catch (Exception ex)
            {
                var errorResponse = new
                {
                    ErrorMessage = "An error occurred",
                    Timestamp = DateTime.Today.ToString("yyyy-MM-dd"),
                    ErrorDetails = ex.Message
                };

                return StatusCode(500, errorResponse);
            }
        }

        [HttpGet("closureDelayCount")]
        public IActionResult GetClosureDelayCount()
        {
            try
            {
                var closureDelayCount = _techPrimeLabDbContext.Customers
                    .Where(p => p.Status == "Running")
                    .AsEnumerable()
                    .Where(c => !string.IsNullOrEmpty(c.End_Date) &&
                                DateTime.TryParseExact(c.End_Date, "yyyy-MM-dd", CultureInfo.InvariantCulture, DateTimeStyles.None, out var endDate) &&
                                endDate < DateTime.Now)
                    .Count();

                return Ok(closureDelayCount);
            }
            catch (Exception ex)
            {
                // Log or handle the exception appropriately
                return StatusCode(500, "An error occurred while processing the request.");
            }
        }



        [HttpGet("department")]
        public IActionResult GetDepartmentWiseSuccessData()
        {
            var departmentData = _techPrimeLabDbContext.Customers
                .GroupBy(p => p.Department)
                .Select(g => new
                {
                    Department = g.Key,
                    TotalRegistered = g.Count(),
                    TotalClosed = g.Count(p => p.Status == "closed") // Assuming 'closed' is the status for closed projects
                })
                .ToList();

            return Ok(departmentData);
        }
    }
}
