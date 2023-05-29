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

        public void Delete(DBContext context, int id)
        {
            Department department = context.Departments.FirstOrDefault(department => department.Id == id);
            context.Departments.Remove(department);

            context.SaveChanges();
        }

        public Department GetById(DBContext context, int id)
        {
            return context.Departments.Where(x => x.Id == id).FirstOrDefault();
        }

        public IQueryable<Department> Query(DBContext context, Expression<Func<Department, bool>> predicate)
        {
            return context.Departments.Where(predicate);
        }

        public Department Update(DBContext context, DepartmentModel entity)
        {
            Department department = context.Departments.FirstOrDefault(dep => dep.Id == entity.Id);

            department.Name = entity.Name;

            context.SaveChanges();

            return department;

        }
    }
}
