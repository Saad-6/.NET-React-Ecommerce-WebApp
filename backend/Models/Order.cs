namespace WebAPIBasedApp.Models
{
    public class Order
    {
        public string Id { get; set; }
        public string UserId { get; set; }
        public string UserAddress { get; set; }
        public List<CartItemInOrder> CartItems { get; set; }
        public double Total {  get; set; }
        public string Status { get; set; } 
        public DateTime DateTime { get; set; }



    }
}
