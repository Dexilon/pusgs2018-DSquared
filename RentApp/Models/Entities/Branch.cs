using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace RentApp.Models.Entities
{
    public class Branch
    {
        public int Id { get; set; }
        public string Logo { get; set; }
        public string Address { get; set; }
        public long Latitude { get; set; }
        public long Longitude { get; set; }
    }
}