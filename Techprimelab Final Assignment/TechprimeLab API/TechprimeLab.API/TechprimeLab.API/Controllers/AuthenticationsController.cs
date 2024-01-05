using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using TechprimeLab.API.Data;
using TechprimeLab.API.Models;

namespace TechprimeLab.API.Controllers
{


    [ApiController]
    [Route("api/[controller]")]
    public class AuthenticationsController : Controller
    {
        private readonly TechPrimeLabDbContext _techPrimeLabDbContext;

        public AuthenticationsController(TechPrimeLabDbContext techPrimeLabDbContext)
        {
            _techPrimeLabDbContext = techPrimeLabDbContext;
        }


        [HttpPost("autenticate")]
        public async Task<IActionResult> Authenticate([FromBody] Authentication userObj)
        {
            if (userObj == null)
                return BadRequest();

            var user = await _techPrimeLabDbContext.Authentications
                .FirstOrDefaultAsync(x => x.Email == userObj.Email && x.Password == userObj.Password);
            if(user == null)
            
                return NotFound(new { Message = "User Not Fount" });
            return Ok(new
            {
                Message = "Login Success!"
            });


        }

        [HttpPost]
        public async Task<IActionResult> AddAuthentications([FromBody] Authentication authenticationsRequest)
        {

            await _techPrimeLabDbContext.Authentications.AddAsync(authenticationsRequest);
            await _techPrimeLabDbContext.SaveChangesAsync();

            return Ok(authenticationsRequest);
        }
    }
}
