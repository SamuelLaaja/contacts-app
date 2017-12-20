using System.Collections.Generic;
using ContactsWebApi.Models;

namespace ContactsWebApi.Repositories
{
    public interface IContactRepository
    {
        List<Contact> GetAll();
        Contact GetById(int id);
        Contact Add(Contact contact);
        void Delete(Contact contact);
        void Edit(Contact contact);
        
    }
}
