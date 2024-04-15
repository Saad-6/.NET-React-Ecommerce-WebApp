using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WebAPIBasedApp.Data;
using WebAPIBasedApp.Models;

namespace WebAPIBasedApp.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class OrderController : ControllerBase
    {
        private readonly AppDbContext _db;
        private ApiResponse _response;
        public OrderController(AppDbContext db)
        {
            _db = db;
            _response = new ApiResponse();
        }
        [HttpGet("Orders")]
        public async Task<IActionResult> getOrders()
        {
            var orders = _db.Orders.Include(m => m.CartItems).ThenInclude(m => m.MenuItem);
            if (orders == null)
            {
                _response.Result = "No Orders yet";
            }
            else
            {
                _response.Result= orders;
            }
            return Ok(_response.Result);
        }  [HttpGet("Analytics")]
        public async Task<IActionResult> Analytics()
        {
            var analytics = new Analytics();
            var orders = _db.Orders.Count();
            var products = _db.MenuItems.Count();
            var pendingOrders = _db.Orders.Where(m => m.Status == "pending").Count();
            var confirmedOrders = _db.Orders.Where(m => m.Status == "confirmed").Count();
            var delieveredOrders = _db.Orders.Where(m => m.Status == "delievered"); // delieverd spelling check
            var canceledOrders = _db.Orders.Where(m => m.Status == "canceled").Count();
            double totalRevenue = 0;
            HashSet<MenuItem> bestProds = new();

            foreach(var order in delieveredOrders)
            {
                totalRevenue = totalRevenue + order.Total;
               
            }
            var users = _db.Users.Count();
            var carts = _db.Carts.Count();

            analytics.totalProducts = products;
            analytics.totalOrders = orders;
            analytics.pendingOrders = pendingOrders;
            analytics.canceledOrders = canceledOrders;
            analytics.confirmedOrders = confirmedOrders;
            analytics.delieveredOrders = delieveredOrders.Count();
            analytics.activeCarts = carts;
            analytics.totalUserAccounts= users;
            analytics.totalRevenue = totalRevenue;

            return Ok(analytics);
        }
        [HttpGet("ConfirmedOrders")]
        public async Task<IActionResult> getConfirmedOrders()
        {
            var orders = _db.Orders.Include(m => m.CartItems).ThenInclude(m => m.MenuItem).Where(m=>m.Status=="confirmed");
            if (orders == null)
            {
                _response.Result = "No Confirmed Orders yet";
            }
            else
            {
                _response.Result= orders;
            }
            return Ok(_response.Result);
        }
        [HttpGet("PendingOrders")]
        public async Task<IActionResult> getPendingOrders()
        {
            var orders = _db.Orders.Include(m => m.CartItems).ThenInclude(m => m.MenuItem).Where(m=>m.Status=="pending");
            if (orders == null)
            {
                _response.Result = "No Pending Orders yet";
            }
            else
            {
                _response.Result= orders;
            }
            return Ok(_response.Result);
        }[HttpGet("DelieveredOrders")]
        public async Task<IActionResult> getDelieveredOrders()
        {
            var orders = _db.Orders.Include(m => m.CartItems).ThenInclude(m => m.MenuItem).Where(m=>m.Status== "delievered");
            if (orders == null)
            {
                _response.Result = "No delievered Orders yet";
            }
            else
            {
                _response.Result= orders;
            }
            return Ok(_response.Result);
        } 
        [HttpGet("GetUserOrders")]
        public async Task<IActionResult> getUserOrders(string userId)
        {
            var orders = _db.Orders.Include(m=>m.CartItems).ThenInclude(m=>m.MenuItem).Where(m=>m.UserId==userId);
            if (orders == null)
            {
                _response.Result = "No Orders yet";
            }
            else
            {
                _response.Result= orders;
            }
            return Ok(_response.Result);
        }
        [HttpPost("PlaceOrder")]
        public async Task<IActionResult> placeOrder(int CartId,string Address)
        {
            //var cart = _db.Carts.FirstOrDefault(m => m.Id == CartId); 
            //   var cart = _db.Carts.Include(m => m.CartItems).ThenInclude(m=>m.MenuItem).Where(m => m.Id == CartId);
            var cart = _db.Carts.Include(c => c.CartItems).ThenInclude(m=>m.MenuItem) .FirstOrDefault(m => m.Id == CartId);
            if (CartId == null || cart==null || Address==null) { _response.Errors.Add("Cart Id cannot be null , also  the possibility of the cart or address being null");  return BadRequest(_response.Errors); }
            List<CartItemInOrder> cartItemsinOrder = new();
            string orderId = Guid.NewGuid().ToString();
            foreach (var cartItem in cart.CartItems)
            {var cartIteminOrder=new CartItemInOrder();
                cartIteminOrder.Quantity = cartItem.Quantity;
                cartIteminOrder.MenuItemId = cartItem.MenuItemId;
                cartIteminOrder.MenuItem=cartItem.MenuItem;
                cartIteminOrder.OrderId = orderId;
                cartItemsinOrder.Add(cartIteminOrder);
            }
            string userId = cart.UserId;
            var order = new Order();

            order.Id = orderId;
            order.UserId = userId;
            order.CartItems = cartItemsinOrder;
            order.DateTime= DateTime.Now;
            order.Status = "pending";
            order.Total = cart.CartTotal;
            order.UserAddress = Address;
          
            _db.Orders.Add(order);
            _db.SaveChanges();
            _db.Remove(cart);
            
            _db.SaveChanges();
            _response.Result = order;
            return Ok(_response.Result);

        }
        [HttpPost("ConfirmOrder")]
        public async Task<IActionResult> confirmOrder(string orderId)
        { 
            var order=_db.Orders.Include(m => m.CartItems).ThenInclude(m => m.MenuItem).FirstOrDefault(m=>m.Id == orderId);
            if (order == null || orderId == null)
            {
                _response.Errors.Add("No Order found for coreesponding id (id may be null)");
                return BadRequest(_response.Errors);
            }
            order.Status = "confirmed";
            _db.SaveChanges();
            _response.Result= order;
            return Ok(_response.Result);
        
        }
        [HttpPost("CancelOrder")]
        public async Task<IActionResult> cancelOrder(string orderId)
        {
            var order = _db.Orders.FirstOrDefault(m => m.Id == orderId);
            if (order == null || orderId == null)
            {
                _response.Errors.Add("No Order found for coreesponding id (id may be null)");
                return BadRequest(_response.Errors);
            }
            order.Status = "cancelled";
            _db.SaveChanges();
            _response.Result = order;
            return Ok(_response.Result);


        } [HttpPost("DelieverOrder")]
        public async Task<IActionResult> delieverOrder(string orderId)
        {
            var order = _db.Orders.FirstOrDefault(m => m.Id == orderId);
            if (order == null || orderId == null)
            {
                _response.Errors.Add("No Order found for coreesponding id (id may be null)");
                return BadRequest(_response.Errors);
            }
            order.Status = "delievered";
            _db.SaveChanges();
            _response.Result = order;
            return Ok(_response.Result);


        }



    }
}
