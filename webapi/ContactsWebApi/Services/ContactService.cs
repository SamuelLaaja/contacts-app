using System.Collections.Generic;
using ContactsWebApi.Models;
using ContactsWebApi.Repositories;

namespace ContactsWebApi.Services
{
    public class ContactService : IContactService
    {
        private readonly IContactRepository _contactRepository;

        public ContactService(IContactRepository contactRepository)
        {
            _contactRepository = contactRepository;
        }

        public List<Contact> FindContacts()
        {
            return _contactRepository.GetAll();
        }

        public Contact FindContactById(int id)
        {
            return _contactRepository.GetById(id);
        }

        public Contact AddContact(Contact contact)
        {
            return _contactRepository.Add(contact);
        }

        public void DeleteContact(Contact contact)
        {
            _contactRepository.Delete(contact);
        }

        public void EditContact(Contact contact)
        {
            _contactRepository.Edit(contact);
        }
    }
}
