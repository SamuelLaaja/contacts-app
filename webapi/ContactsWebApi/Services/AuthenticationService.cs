using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Threading.Tasks;
using ContactsWebApi.Authentication;
using Newtonsoft.Json;

namespace ContactsWebApi.Services
{
    public class AuthenticationService
    {
        
        public async Task<AccessToken> GetToken(IEnumerable<KeyValuePair<string, string>> requestParams,
            string endpoint)
        {

            AccessToken token = null;
            using (var httpClient = new HttpClient())
            {
                httpClient.DefaultRequestHeaders.Add("Cache-Control", "no-cache");
                HttpContent content = new FormUrlEncodedContent(requestParams);
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
