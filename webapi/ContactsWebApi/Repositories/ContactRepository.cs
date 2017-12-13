using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ContactsWebApi.Config;
using ContactsWebApi.Models;

namespace ContactsWebApi.Repositories
{
    public class ContactRepository : IContactRepository
    {

        private readonly ContactsDbContext _context;

        public ContactRepository(ContactsDbContext context)
        {
            _context = context;
            //Initialize();
        }

        public List<Contact> GetAll()
        {
            return _context.Contacts.ToList();
           
        }

        public Contact GetById(int id)
        {
            return _context.Contacts.FirstOrDefault(c => c.Id == id);
        }

        public Contact Add(Contact contact)
        {
            _context.Contacts.Add(contact);
            _context.SaveChanges();
            return contact;
        }

        public void Delete(Contact contact)
        {
            _context.Contacts.Remove(contact);
            _context.SaveChanges();
        }

        public void Edit(Contact contact)
        {
            _context.Contacts.Update(contact);
            _context.SaveChanges();
        }

        private void Initialize()
        {
            Add(new Contact("Kaarle", "Kuninkaallinen", "01324678", "Kuninkaanpalatsi 1", "Keskimaa"));
            Add(new Contact("Yrjö", "Ylhäinen", "045614165", "Keisarinkuja 2", "Ylämaa"));
        }
    }
}
