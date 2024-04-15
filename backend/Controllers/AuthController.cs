using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using WebAPIBasedApp.Data;
using WebAPIBasedApp.Models;
using WebAPIBasedApp.Models.DTOs;


namespace WebAPIBasedApp.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly AppDbContext _db;
       private readonly UserManager<AppUser> _userManager;
        private readonly SignInManager<AppUser> _signInManager;
        private readonly RoleManager<IdentityRole> _roleManager;
        private string secretkey;
        private ApiResponse _response;
        public AuthController(AppDbContext db,UserManager<AppUser> userManager,SignInManager<AppUser> signInManager,RoleManager<IdentityRole> roleManager,IConfiguration configuration)
        {
            _db = db;
            _response = new ApiResponse();
            _roleManager = roleManager;
            _userManager = userManager;
            _signInManager = signInManager;
            secretkey = configuration.GetValue<string>("ApiResponse:SecretKey");

          
        }
        //

        [HttpPost("Register")]
        public async Task<IActionResult> Register([FromBody] RegisterRequestDTO registerDTO)
        {// This where i have the breakpoint
            // Check for existing users
            var userinDb = _db.Users.FirstOrDefault(m => m.UserName == registerDTO.UserName);
            var userinDb2 = _db.Users.FirstOrDefault(m => m.Email == registerDTO.Email);
            if (userinDb != null || userinDb2 != null)
            {
                _response.IsSuccess = false;
                _response.Errors.Add("User Already Exists");
                return BadRequest(_response.Errors[0]);
            }

            AppUser appUser = new();
            appUser.UserName = registerDTO.UserName;
            appUser.Email = registerDTO.Email;
            appUser.NormalizedUserName = registerDTO.Name;
            var result = await _userManager.CreateAsync(appUser, registerDTO.Password);
            try
            {
                if (result.Succeeded)
                {
                    if (!_roleManager.RoleExistsAsync("Admin").GetAwaiter().GetResult())
                    {
                        await _roleManager.CreateAsync(new IdentityRole("Admin"));
                        await _roleManager.CreateAsync(new IdentityRole("Customer"));
                        await _userManager.AddToRoleAsync(appUser, "Admin");
                    }
                    else
                    {
                        await _userManager.AddToRoleAsync(appUser, "Customer");

                    }
                    _response.IsSuccess = true;
                    return Ok(_response);
                }
                _response.Errors.Add("Password does not meet requirements");
                return BadRequest(_response.Errors[0]);
            }
            catch (Exception ex)
            {
                _response.Errors.Add(ex.ToString());
                return BadRequest(_response.Errors[0]);
            }

        }
        //[HttpPost("Register")]
        //public async Task<IActionResult> Register([FromBody] RegisterDTO registerDTO)
        //
        [HttpPost("Login")]
        public async Task<IActionResult> Login([FromBody] LoginRequestDTO loginDTO)
        {
            var user=_db.Users.FirstOrDefault(m=>m.Email==loginDTO.Email);
            var role = await _userManager.GetRolesAsync(user);

            // Validate Data
            if (loginDTO == null||user==null) { _response.Errors.Add("Invalid Field Input");return BadRequest(_response); }
            bool isValid=await _userManager.CheckPasswordAsync(user, loginDTO.Password);
            if (!isValid)
            {
                _response.Errors.Add("Email or Password invalid"); return BadRequest(_response);
            }

            //If Verified , create a JWT token
            JwtSecurityTokenHandler tokenHandler = new();
            byte[] key=Encoding.ASCII.GetBytes(secretkey);
            SecurityTokenDescriptor tokenDescriptor = new()
            {
                Subject = new ClaimsIdentity(new Claim[]
                {
                    new Claim("fullName",user.NormalizedUserName),
                    new Claim("id",user.Id),
                    new Claim(ClaimTypes.Email,user.Email),
                    new Claim(ClaimTypes.Role,role.FirstOrDefault()),

                }),
                Expires = DateTime.UtcNow.AddDays(7),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
            };
            SecurityToken token = tokenHandler.CreateToken(tokenDescriptor);


            LoginResponseDTO loginResponseDTO = new LoginResponseDTO()
            {
                Email = loginDTO.Email,
                JWT = tokenHandler.WriteToken(token),
            };
            _response.Result = loginResponseDTO;
          
            return Ok(_response);
        }
        /*
          const token=localStorage.getItem("token");
    if(token){

      const {fullName,id,userName,email,role}:UserModel=jwtDecode(token);
           
            dispatch(setUserState({fullName,id,userName,email,role }))
    }
         
         */

    }
}
