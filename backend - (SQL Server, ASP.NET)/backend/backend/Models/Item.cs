using System.ComponentModel.DataAnnotations;

namespace backend.Models
{
    public class Item
    {
        [Key]
        public int ID { get; set; }
        [Required]
        public string? Title { get; set; }
        public string? Description { get; set; }
        [Required]
        public bool finished { get; set; } = false;
        public DateTime Deadline { get; set; }

    }
}
