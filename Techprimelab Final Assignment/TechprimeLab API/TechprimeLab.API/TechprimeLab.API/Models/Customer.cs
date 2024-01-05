using Microsoft.EntityFrameworkCore;

namespace TechprimeLab.API.Models
{
    public class Customer
    {
        public string Project_Name { get; set; }

        public string Reason { get; set; }

        public string Type { get; set; }

        public string Division { get; set; }

        public string Category { get; set; }

        public string Priority { get; set; }

        public string Department { get; set; }

        public string Start_Date { get; set; }

        public string End_Date { get; set; }

        public string Location { get; set; }

        public string Status { get; set; }


      
    }
}
