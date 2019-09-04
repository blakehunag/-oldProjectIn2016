using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ProjectF.Models
{
    interface IRepository<T>
    {
        void Create(T _repository);
        void Delete(T _repository);
        void Update(T _repository);
        IEnumerable<T> getAll();
        T getByID(int id);
    }
}
