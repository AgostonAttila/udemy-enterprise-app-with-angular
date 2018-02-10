using System.ComponentModel.DataAnnotations;
using Newtonsoft.Json;

namespace Apple.Models
{
    public class Address
    {
      [Required]
      [JsonProperty(PropertyName = "street")]
      public string Street { get; set; }

      [Required]
      public string City { get; set; }
    }
}
