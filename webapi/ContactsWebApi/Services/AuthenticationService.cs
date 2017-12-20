using System.Collections.Generic;
using System.Net.Http;
using System.Threading.Tasks;
using ContactsWebApi.Authentication;
using ContactsWebApi.Config;
using Microsoft.Extensions.Options;
using Newtonsoft.Json;

namespace ContactsWebApi.Services
{
    public class AuthenticationService : IAuthenticationService
    {

        private readonly AzureSettings _azureSettings;

        public AuthenticationService(IOptions<AzureSettings> AzureSettings)
        {
            _azureSettings = AzureSettings.Value;
        }

        public async Task<AccessToken> GetToken(Authorization auth)
        {

            AccessToken token = null;
            var endpoint = _azureSettings.EndPoint;

            var authenticationParams = new List<KeyValuePair<string, string>>
            {
                new KeyValuePair<string, string>("username", auth.UserName),
                new KeyValuePair<string, string>("password", auth.PassWord),
                new KeyValuePair<string, string>("client_id", _azureSettings.ApplicationId),
                new KeyValuePair<string, string>("resource", _azureSettings.Resource),
                new KeyValuePair<string, string>("grant_type", _azureSettings.GrantType),
                new KeyValuePair<string, string>("client_secret", _azureSettings.Key)
            };

            using (var httpClient = new HttpClient())
            {
                httpClient.DefaultRequestHeaders.Add("Cache-Control", "no-cache");
                HttpContent content = new FormUrlEncodedContent(authenticationParams);
                var response = await httpClient.PostAsync(endpoint, content);

                if (response.IsSuccessStatusCode)
                {
                    var data = await response.Content.ReadAsStringAsync();
                    token = JsonConvert.DeserializeObject<AccessToken>(data);
                }
            }
            return token;
        }

    }
}
