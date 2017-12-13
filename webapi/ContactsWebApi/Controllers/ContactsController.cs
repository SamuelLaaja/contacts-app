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
        public IActionResult Post([FromBody]Contact contact)
        {
            _contactService.AddContact(contact);
            //return new JsonResult(addedContact);
            return new NoContentResult();
        }

        // DELETE
        [HttpDelete("{id}")]
        public IActionResult DeleteContact(int id)
        {
            var contact = _contactService.FindContactById(id);
            if (contact != null)
            {
                _contactService.DeleteContact(contact);
            }
            return new NoContentResult();
        }

        // PUT / Edit
        [HttpPut]
        public IActionResult EditContact([FromBody]Contact contact)
        {
             _contactService.EditContact(contact);
            return new NoContentResult();
            //return new BadRequestResult();;
            //return new BadRequestObjectResult(new {ErrorText = "Error Occured!"});
        }

    }
}
