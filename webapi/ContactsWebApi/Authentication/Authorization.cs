using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ContactsWebApi
{
    public class Authorization
    {
        public string UserName { get; set; }
        public string PassWord { get; set; }

        public Authorization(string userName, string passWord)
        {
            UserName = userName;
            PassWord = passWord;
        }
    }
}
