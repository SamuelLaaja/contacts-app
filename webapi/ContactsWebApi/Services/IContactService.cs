﻿using System.Collections.Generic;
using ContactsWebApi.Models;

namespace ContactsWebApi.Services
{
    public interface IContactService
    {
        List<Contact> FindContacts();
        Contact FindContactById(int id);
        Contact AddContact(Contact contact);
        void DeleteContact(Contact contact);
        void EditContact(Contact contact);
    }
}