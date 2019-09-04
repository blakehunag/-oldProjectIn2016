using ProjectF.Models;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ProjectF.Models
{
    class Repository<T> : IRepository<T> where T : class
    {
        private HREntities db = null;
        private DbSet<T> dbset = null;

        public Repository()
        {
            db = new HREntities();
            dbset = db.Set<T>();
        }
        public void Create(T entity)
        {
            dbset.Add(entity);
            db.SaveChanges();
        }

        public void Delete(T entity)
        {
            dbset.Remove(entity);
            db.SaveChanges();
        }

        public IEnumerable<T> getAll()
        {
            return dbset.ToList();
        }

        public T getByID(int id)
        {
            return dbset.Find(id);
        }

        public void Update(T entity)
        {
            db.Entry(entity).State = System.Data.Entity.EntityState.Modified;
            db.SaveChanges();
        }
    }
}
