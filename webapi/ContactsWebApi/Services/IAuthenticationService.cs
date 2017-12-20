using System.Threading.Tasks;
using ContactsWebApi.Authentication;

namespace ContactsWebApi.Services
{
    public interface IAuthenticationService
    {
        Task<AccessToken> GetToken(Authorization auth);
    }
}
