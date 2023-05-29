using EO_interview.Database;
using EO_interview.Models;
using System.Linq.Expressions;

namespace EO_interview.Interfaces
{
    public interface ILogicService<TEntity, TModel>
    {
        TEntity GetById(DBContext context, int id);
        IQueryable<TEntity> Query(DBContext context, Expression<Func<TEntity, bool>> predicate);
        TEntity Add(DBContext context, TModel entity);
        TEntity Update(DBContext context, TModel entity);
        void Delete(DBContext context, int id);
    }
}
