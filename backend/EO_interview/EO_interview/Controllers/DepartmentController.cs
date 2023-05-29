using EO_interview.Interfaces;
using EO_interview.Database;
using EO_interview.Services;
using Microsoft.AspNetCore.Mvc;
using EO_interview.Models;

namespace EO_interview.Controllers
{
    [ApiController]
    [Route("[controller]/[action]")]
    public class DepartmentController : ControllerBase
    {

        private readonly ILogger<DepartmentController> _logger;
        private readonly ILogicService<Department, DepartmentModel> _departmentService;
        private readonly DBContext _dbContext;

        public DepartmentController(ILogger<DepartmentController> logger, ILogicService<Department, DepartmentModel> departmentService, DBContext dbContext)
        {
            _logger = logger;
            _departmentService = departmentService;
            _dbContext = dbContext;
        }

        [HttpGet]
        public Department GetById(int id)
        {
            Department dep = _departmentService.GetById(_dbContext, id);

            return dep;
        }

        [HttpGet]
        public IQueryable<Department> GetAll()
        {
            IQueryable<Department> deps = _departmentService.Query(_dbContext, dep => true);

            return deps;
        }

        [HttpPost]
        public Department AddDepartment([FromBody] DepartmentModel department)
        {
            Department dep = _departmentService.Add(_dbContext, department);

            return dep;
        }
    }
}
