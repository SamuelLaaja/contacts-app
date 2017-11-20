using ContactsWebApi.Models;
using ContactsWebApi.Services;
using Microsoft.AspNetCore.Mvc;

namespace ContactsWebApi.Controllers
{
    [Route("api/contacts")]
    public class ContactsController : Controller
    {
        private readonly IContactService _contactService;

        //Dependency Injection (scoped)
        public ContactsController(IContactService contactService)
        {
            _contactService = contactService;
        }

        [HttpGet]
        public IActionResult Get()
        {
            var contacts = _contactService.FindContacts();

            return new JsonResult(contacts);
        }

        [HttpGet("{id}")]
        public IActionResult GetById(int id)
        {
            var contact = _contactService.FindContactById(id);
            return new JsonResult(contact);
        }


        // POST / Add
        [HttpPost]
        public void Post([FromBody]Contact inputContact)
        {
            var contacts = _contactService.FindContacts();
            var contact = new Contact(contacts.Count+1, inputContact.FirstName, inputContact.LastName, inputContact.Phone, inputContact.StreetAddress, inputContact.City);
            _contactService.AddContact(contact);
        }

        // DELETE
        [HttpDelete("{id}")]
        public void DeleteContact(int id)
        {
            var contact = _contactService.FindContactById(id);
            _contactService.DeleteContact(contact);
        }

        // PUT / Edit
        [HttpPut("{id}")]
        public void EditContact(int id, [FromBody]string firstName, [FromBody]string lastName, [FromBody]string phone, [FromBody]string streetAddress, [FromBody]string city)
        {
            var contact = new Contact(id, firstName, lastName, phone, streetAddress, city);
            _contactService.EditContact(contact);
        }

    }
}
