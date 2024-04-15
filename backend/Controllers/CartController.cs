using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WebAPIBasedApp.Data;
using WebAPIBasedApp.Models;

namespace WebAPIBasedApp.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CartController : ControllerBase
    {
        private readonly AppDbContext _db;
        private ApiResponse _reponse;
        public CartController(AppDbContext db)
        {
            _db = db;
            _reponse = new();
        }
        [HttpGet]
        public async Task<ActionResult<ApiResponse>> MyCart(string userId)
        {
            Cart cart = _db.Carts.Where(m => m.UserId == userId).Include(m => m.CartItems).ThenInclude(m => m.MenuItem).FirstOrDefault();
            if (cart == null) { _reponse.Errors.Add("Cart Not Found"); return Ok(_reponse); }
            _reponse.Result = cart;
            return Ok(_reponse);
        }
        [HttpPost]
        public async Task<ActionResult<ApiResponse>> AddOrUpdateItemsInCart(string userId,int menuItemId,int updateQuantityBy)
        {
            var userCart = _db.Carts.Where(m => m.UserId == userId).FirstOrDefault();
            var menuItem = _db.MenuItems.FirstOrDefault(m => m.Id == menuItemId);
            if (menuItem == null) { _reponse.Errors.Add("Invalid Product Id"); return BadRequest(_reponse); }
            // If user cart does not exist , create one first then add to it
            if (userCart == null)
            {
                if(updateQuantityBy <= 0) { _reponse.Errors.Add("Invalid Quanitity"); return BadRequest(_reponse); }
               
                Cart newCart = new()
                {
                    UserId = userId,
                    CartItems=new List<CartItem>(),

                };
                _db.Carts.Add(newCart);
                _db.SaveChanges();
                CartItem cartItem = new()
                {
                    CartId = newCart.Id,
                    MenuItem = menuItem,
                    MenuItemId = menuItemId,
                    Quantity = updateQuantityBy
                };
                newCart.CartItems.Add(cartItem);
                newCart.CartTotal = menuItem.Price * updateQuantityBy;
                try
                {
                _db.SaveChanges();

                _reponse.Result = newCart;
                }
                catch(Exception ec)
                {

                }
                return Ok(_reponse);

            }
            // If Cart already exists
            else
            {
                CartItem cartItemExists = _db.CartItems.Where(m => m.CartId == userCart.Id && m.MenuItemId == menuItemId).FirstOrDefault();
               //If the particular item doesnot already exists
                if (cartItemExists == null)
                {
                    CartItem cartItem = new()
                    {
                        CartId = userCart.Id,
                        MenuItem = menuItem,
                        MenuItemId = menuItemId, 
                        Quantity = updateQuantityBy
                    };
                    _db.CartItems.Add(cartItem );
                    _db.SaveChanges();
                    userCart.CartItems.Add(cartItem);
                    userCart.CartTotal+= menuItem.Price * updateQuantityBy;
                    _db.SaveChanges();
                }
                //If the particular item  already exists
                else
                {
                    int total = cartItemExists.Quantity;
                    if(updateQuantityBy+total < 0) { _reponse.Errors.Add("INvalid Quanitity");return Ok(_reponse); }
                    if (updateQuantityBy + total == 0)
                    {
                        _db.Remove(cartItemExists);
                        _db.SaveChanges();
                        _reponse.Result = userCart;
                       
                    }
                    cartItemExists.Quantity+= updateQuantityBy;
                    userCart.CartTotal += menuItem.Price * updateQuantityBy;
                    _db.SaveChanges();
                    
                }
                _reponse.Result = userCart;
                return Ok(_reponse);
            }
        }
    }
}
