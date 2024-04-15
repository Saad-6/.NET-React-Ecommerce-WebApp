namespace WebAPIBasedApp.Models
{
    public class Analytics
    {
        public double totalRevenue { get; set; }
        public int totalOrders { get; set; }
        public int pendingOrders { get; set; }
        public int confirmedOrders { get; set; }
        public int canceledOrders { get; set; }
        public int delieveredOrders { get; set; }
        public int activeCarts { get; set; }
        public int totalUserAccounts { get; set; }
        public int totalProducts { get; set; }
        public List<MenuItem> bestProducts { get; set; }
        public Analytics()
        {
            bestProducts = new List<MenuItem>();
            totalOrders = 0;
            confirmedOrders = 0;
            totalRevenue = 0;
            canceledOrders = 0;
            pendingOrders = 0;
            delieveredOrders = 0;
            activeCarts = 0;
            totalUserAccounts = 0;
            totalProducts = 0;

            
        }

    }
}
