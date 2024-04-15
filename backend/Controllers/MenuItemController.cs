using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Net;
using WebAPIBasedApp.Data;
using WebAPIBasedApp.Models;
using WebAPIBasedApp.Models.DTOs;


namespace WebAPIBasedApp.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MenuItemController : ControllerBase
    {
        private readonly AppDbContext _db;
 
        private ApiResponse _response;
        public MenuItemController(AppDbContext db)
        {
            _db = db;
            _response = new ApiResponse();
           
        }
        [HttpGet]
        public async Task<IActionResult> GetMenuItems()
        {
            _response.Result = _db.MenuItems;
            var menuItems = await _db.MenuItems.ToListAsync(); 
            if (_response.Result == null)
            {
                _response.StatusCode = HttpStatusCode.NotFound;

                return NotFound(_response);
            }
            _response.StatusCode = HttpStatusCode.OK;
            return Ok(menuItems);

        }
        [HttpGet("{Id}",Name ="GetMenuItem")]
        public async Task<IActionResult> GetMenuItems(int Id)
        {
            _response.Result = _db.MenuItems.FirstOrDefault(m => m.Id == Id);
            if (_response.Result == null)
            {
                _response.StatusCode = HttpStatusCode.NotFound;
                return NotFound(_response);
            }
            else
            {

                _response.StatusCode = HttpStatusCode.OK;
                return Ok(_response);
            }
        }
        [HttpGet("byname/{name}", Name = "GetMenuItemByName")]
        public async Task<IActionResult> GetMenuItemsByName(string name)
        {
            _response.Result = _db.MenuItems.Where(m => m.Name == name);
            if (_response.Result == null)
            {
                _response.StatusCode = HttpStatusCode.NotFound;
                return NotFound(_response);
            }
            else
            {

                _response.StatusCode = HttpStatusCode.OK;
                return Ok(_response);
            }
        }
        [HttpDelete]
       // [Authorize(Roles ="Admin")]
        public async Task<IActionResult> DeleteMenuItems(int Id)
        {
            var menuItem = _db.MenuItems.FirstOrDefault(m => m.Id == Id);
            _response.Result = menuItem;
            if (_response.Result == null)
            {
                _response.StatusCode = HttpStatusCode.NotFound;
                return NotFound(_response);
            }
            else
            {

                _response.StatusCode = HttpStatusCode.OK;
                _db.MenuItems.Remove(menuItem);
                _db.SaveChanges();
                return Ok(_response);
            }
        }
        [HttpPost]
        
        public async Task<ActionResult<ApiResponse>> CreateMenuItem( MenuItemCreateDTO productModel)
        {
            try
            {
                if (ModelState.IsValid)
                {

                    //string fileName = $"{Guid.NewGuid()}{Path.GetExtension(MenuItemDTO.Image.FileName)}";
                    var newMenuItem = new MenuItem
                    {
                        Price = (int)productModel.Price,
                        Name = productModel.Name,
                        Description = productModel.Description,
                        Image = productModel.Image,
                        // Image = await _blob.uploadBlob(fileName, "redmango", MenuItemDTO.Image),
                        Category = productModel.Category,
                        Stock = productModel.Stock,
                        GimmickPrice=productModel.GimmickPrice


                        };
                        _db.MenuItems.Add(newMenuItem);
                        _db.SaveChanges();
                        _response.Result = newMenuItem;
                        _response.StatusCode=HttpStatusCode.Created;
                        //   return CreatedAtRoute("GetMenuItem",new { id = newMenuItem.Id } );
                        return Ok(_response);

                    
              
                }
                else
                {
                    _response.Errors.Add("Input State in not valid");
                    return BadRequest(_response);
                }

            }
            catch (Exception ex)
            {
                _response.StatusCode = HttpStatusCode.BadRequest;
                _response.Errors.Add(ex.ToString());
                return BadRequest(_response);
            }

        }
        [HttpPut]
      
        public async Task<ActionResult<ApiResponse>> UpdateMenuItem(int id, MenuItem MenuItemDTO)
        {
            try
            {
                if (ModelState.IsValid)
                {
                    var item = _db.MenuItems.FirstOrDefault(m => m.Id == id);
                    if (item != null)
                    {
                        item.Price = MenuItemDTO.Price;
                        item.Name = MenuItemDTO.Name;
                        item.Description = MenuItemDTO.Description;
                        item.Category = MenuItemDTO.Category;
                        item.GimmickPrice = MenuItemDTO.GimmickPrice;
                        item.Stock = MenuItemDTO.Stock;
                        _db.MenuItems.Update(item);
                        _db.SaveChanges();
                        _response.StatusCode = HttpStatusCode.NoContent;
                        return Ok(_response);
                    }
                    else
                    {
                        _response.Errors.Add("No item corresponding to the id found");
                        return NotFound(_response);
                    }
                    
                }
                else
                {

                    _response.Errors.Add("Input State in not valid");
                    return BadRequest(_response);
                }

            }
            catch (Exception ex)
            {
                _response.StatusCode = HttpStatusCode.BadRequest;
                _response.Errors.Add(ex.ToString());
                return BadRequest(_response);
            }

        }




    }
}
