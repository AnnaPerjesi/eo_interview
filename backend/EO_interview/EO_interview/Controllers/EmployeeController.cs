using EO_interview.Database;
using EO_interview.Interfaces;
using EO_interview.Models;
using EO_interview.Services;
using Microsoft.AspNetCore.Mvc;

namespace EO_interview.Controllers
{
    [ApiController]
    [Route("[controller]/[action]")]
    public class EmployeeController : ControllerBase
    {
        private readonly ILogger<EmployeeController> _logger;
        private readonly ILogicService<Employee, EmployeeModel> _employeeService;
        private readonly DBContext _dbContext;

        public EmployeeController(ILogger<EmployeeController> logger, ILogicService<Employee, EmployeeModel> employeeService, DBContext dbContext)
        {
            _logger = logger;
            _employeeService = employeeService;
            _dbContext = dbContext;
        }

        [HttpGet]
        public IQueryable<Employee> GetAll()
        {
            IQueryable<Employee> emps = _employeeService.Query(_dbContext, emp => true);

            return emps;
        }

        [HttpGet]
        public IQueryable<Employee> GetAllByName([FromQuery] string? name)
        {
            IQueryable<Employee> emps = _employeeService.Query(_dbContext, emp => !string.IsNullOrWhiteSpace(name) ? emp.Name.Contains(name): true);

            return emps;
        }

        [HttpGet]
        public IQueryable<Employee> GetAllSupervisors()
        {
            IQueryable<Employee> emps = _employeeService.Query(_dbContext, emp => emp.IsSupervisor == 1);

            return emps;
        }

        [HttpGet]
        public Employee GetById(int id)
        {
            Employee emp = _employeeService.GetById(_dbContext, id);

            return emp;
        }

        [HttpPost]
        public Employee AddEmployee([FromBody] EmployeeModel employee)
        {
            Employee emp = _employeeService.Add(_dbContext, employee);

            return emp;
        }

        [HttpPut]
        public ActionResult<Employee> Update([FromBody] EmployeeModel entity)
        {
            try
            {
                Employee emp = _employeeService.Update(_dbContext, entity);
                return emp;
            }
            catch (Exception ex)
            {

                var errorResponse = new
                {
                    Message = "An error occurred during the update.",
                    Error = ex.Message
                };

                // Return the error response with an appropriate status code
                return BadRequest(errorResponse);
            }
        }

        [HttpDelete]
        public void Delete(int id)
        {
            _employeeService.Delete(_dbContext, id);
        }


    }
}
