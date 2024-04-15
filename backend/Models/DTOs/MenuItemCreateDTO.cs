namespace WebAPIBasedApp.Models.DTOs
{
    public class MenuItemCreateDTO
    {
  
        public int? Price { get; set; }
        public int? Stock { get; set; }
        public int? GimmickPrice { get; set; }
        public string? Name { get; set; }
        public string? Description { get; set; }
        public string? Category { get; set; }
        public string? Image { get; set; }
        /*
         
        public int Id { get; set; }
        public int Price { get; set; }
        public int? Stock { get; set; }
        public int? GimmickPrice { get; set; }
        public string? Name { get; set; }
        public string? Description { get; set; }
        public string? Category { get; set; }
        public string? Image { get; set; }
         */
    }
}
