using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ContactsWebApi.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using ContactsWebApi.Config;
using Microsoft.Extensions.Options;

namespace ContactsWebApi.Controllers
{
    [Route("api/auth")]
    public class AuthenticationController
    {
        private readonly AuthenticationService _authService;
        private readonly AzureSettings _azureSettings;
        
        public AuthenticationController(AuthenticationService authService, IOptions<AzureSettings> azureSettings)
        {
            _authService = authService;
            _azureSettings = azureSettings.Value;
        }

        [HttpPost]
        public IActionResult Post([FromBody]Authorization auth)
        {

            var authenticationParams = new List<KeyValuePair<string, string>>
            {
                new KeyValuePair<string, string>("username", auth.UserName),
                new KeyValuePair<string, string>("password", auth.PassWord),
                new KeyValuePair<string, string>("client_id", _azureSettings.ApplicationId),
                new KeyValuePair<string, string>("resource", _azureSettings.DirectoryId),
                new KeyValuePair<string, string>("grant_type", _azureSettings.GrantType),
                new KeyValuePair<string, string>("client_secret", _azureSettings.Key)
            };

            return new JsonResult(_authService.GetToken(authenticationParams, _azureSettings.EndPoint));
        }
    }
}
