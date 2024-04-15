namespace WebAPIBasedApp.Models.DTOs
{
    public class ProductModel
    {
        public string Name { get; set; }
        public int Price { get; set; }
        public string Description { get; set; }
        public string Category { get; set; }
        public string Image { get; set; }
        public int Stock { get; set; }
        public int GimmickPrice { get; set; }
    }
}
