using EO_interview.Database;
using EO_interview.Interfaces;
using EO_interview.Models;
using System.Linq.Expressions;

namespace EO_interview.Services
{
    public class EmployeeService : ILogicService<Employee, EmployeeModel>
    {
        public Employee Add(DBContext context, EmployeeModel entity)
        {
            Employee employee = new Employee();
            employee.Id = entity.Id;
            employee.Name = entity.Name;
            employee.PhoneNumber = entity.PhoneNumber;
            employee.UserName = entity.UserName;
            employee.Password = entity.Password;
            employee.Position = entity.Position;

            if(entity.SupervisorId.HasValue)
            {
                employee.SupervisorId = entity.SupervisorId;
            }

            if(entity.DepartmentId.HasValue)
            {
                employee.DepartmentId = entity.DepartmentId;
            }
            
            employee.IsSupervisor = entity.IsSupervisor;

            context.Add(employee);

            context.SaveChanges();

          

            return employee;

            
        }

        public void Delete(DBContext context, int id)
        {
            Employee employee = context.Employees.FirstOrDefault(emp => emp.Id == id);
            context.Employees.Remove(employee);

            context.SaveChanges();
        }

        public Employee GetById(DBContext context, int id)
        {
            return context.Employees.Where(x => x.Id == id).FirstOrDefault();

        }

        public IQueryable<Employee> Query(DBContext context, Expression<Func<Employee, bool>> predicate)
        {
            return context.Employees.Where(predicate);
        }

        public Employee Update(DBContext context, EmployeeModel entity)
        {
            Employee employee = context.Employees.FirstOrDefault(emp=> emp.Id == entity.Id);

            employee.Name = entity.Name;
            employee.PhoneNumber = entity.PhoneNumber;
            employee.UserName = entity.UserName;
            employee.Password = entity.Password;
            employee.Position = entity.Position;
            employee.SupervisorId = entity.SupervisorId;
            employee.DepartmentId = entity.DepartmentId;
            employee.IsSupervisor = entity.IsSupervisor;

            context.SaveChanges();

            return employee;
        }
    }
}
