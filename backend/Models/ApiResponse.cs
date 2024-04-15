using System.Net;

namespace WebAPIBasedApp.Models
{
    public class ApiResponse
    {
        public HttpStatusCode StatusCode;
        public bool IsSuccess { get; set; } = true;
        public List<string> Errors { get; set; }
        public object Result { get; set; }
        public ApiResponse() {
        Errors = new List<string>();
        }
    }
}
