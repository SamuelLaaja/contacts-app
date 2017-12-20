using System.Threading.Tasks;
using ContactsWebApi.Authentication;
using ContactsWebApi.Services;
using Microsoft.AspNetCore.Mvc;

namespace ContactsWebApi.Controllers
{
    [Route("api/auth")]
    public class AuthenticationController
    {
        private readonly IAuthenticationService _authService;
        
        public AuthenticationController(
            IAuthenticationService authService )
        {
            _authService = authService;
        }

        [HttpPost]
        public async Task<IActionResult> Authentication([FromBody]Authorization auth)
        {
            AccessToken token = await _authService.GetToken(auth);
            if (token == null)
            {
                return new UnauthorizedResult();
            }
            return new JsonResult(token);
        }
    }
}
