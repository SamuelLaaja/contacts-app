using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace ContactsWebApi.Models
{
    [Table("Contact")]
    public class Contact
    {
        [Key]
        public int Id { get; set; }
//        [Column("first_name")] // used if name with db does not match
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Phone { get; set; }
        public string StreetAddress { get; set; }
        public string City { get; set; }

        public Contact()
        {
        }

        public Contact(string firstName, string lastName, string phone, string streetAddress, string city)
        {
            FirstName = firstName;
            LastName = lastName;
            Phone = phone;
            StreetAddress = streetAddress;
            City = city;
        }

    }
}
