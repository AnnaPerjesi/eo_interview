using EO_interview.Interfaces;
using EO_interview.Database;
using System.Linq.Expressions;
using EO_interview.Models;

namespace EO_interview.Services
{
    public class DepartmentService : ILogicService<Department, DepartmentModel>
    {
        public Department Add(DBContext context, DepartmentModel entity)
        {
            Department department = new Department();
            department.Name = entity.Name;

            context.Departments.Add(department);
            context.SaveChanges();

            return department;
        }

        public void Delete(DBContext context, Department entity)
        {
            throw new NotImplementedException();
        }

        public Department GetById(DBContext context, int id)
        {
            return context.Departments.Where(x => x.Id == id).FirstOrDefault();
        }

        public IQueryable<Department> Query(DBContext context, Expression<Func<Department, bool>> predicate)
        {
            return context.Departments.Where(predicate);
        }

        public Department Update(DBContext context, Department entity)
        {
            throw new NotImplementedException();
        }
    }
}
