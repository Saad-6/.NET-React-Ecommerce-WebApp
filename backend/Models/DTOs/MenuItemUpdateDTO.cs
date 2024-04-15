namespace WebAPIBasedApp.Models.DTOs
{
    public class MenuItemUpdateDTO
    {
        public int Id { get; set; }
        public int Price { get; set; }
        public string? Name { get; set; }
        public string? Description { get; set; }
        public string? Category { get; set; }
        public IFormFile Image { get; set; }
    }
}
