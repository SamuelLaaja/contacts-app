using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ContactsWebApi.Models;

namespace ContactsWebApi.Repositories
{
    public class ContactRepository : IContactRepository
    {

        private List<Contact> _contacts;

        public ContactRepository()
        {
            Initialize();
        }

        public List<Contact> GetAll()
        {
            return _contacts;
        }

        public Contact GetById(int id)
        {
            var contact = _contacts.FirstOrDefault(c => c.Id == id);
            return contact;
        }

        public Contact Add(Contact contact)
        {
            var newContact = new Contact(_contacts.Count + 1, contact.FirstName, contact.LastName, contact.Phone, contact.StreetAddress, contact.City);
            _contacts.Add(newContact);
            return newContact;
        }

        public void Delete(Contact contact)
        {
            _contacts.Remove(contact);
        }

        public void Edit(Contact contact)
        {
            var id = contact.Id;
            var findContact = _contacts.FirstOrDefault(c => c.Id == id);
            if (findContact == null) return;
            _contacts.Remove(findContact);
            _contacts.Add(contact);
        }

        private void Initialize()
        {
            _contacts = new List<Contact>
            {
                new Contact(1,"Kaarle","Kuninkaallinen", "01324678", "Kuninkaanpalatsi 1", "Keskimaa"),
                new Contact(2, "Yrjö", "Ylhäinen", "045614165", "Keisarinkuja 2", "Ylämaa")
            };
        }
    }
}
