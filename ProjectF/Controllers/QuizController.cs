using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using ProjectF.Models;

namespace ProjectF.Controllers
{
    public class QuizController : ApiController
    {
        private IRepository<QA> qaRepository = null;
        public QuizController()
        {
            this.qaRepository = new Repository<QA>();
        }
        public IEnumerable<QA> Get()
        {

            return qaRepository.getAll();
        }
        public IEnumerable<QA> GetByID(int id)
        {
            return (qaRepository.getAll()).Where(p => p.CID == id);
        }

        //public QA GetQAs(int id,int b)
        //{
        //    return qaRepository.getByID(id);
        //}

        public void PostQAs(QA qa)
        {
            qaRepository.Create(qa);
        }

        public void PutQAs(QA qa)
        {
            qaRepository.Update(qa);
        }

        public void DeleteQAs(int id)
        {
            qaRepository.Delete(qaRepository.getByID(id));
        }

    }
}
