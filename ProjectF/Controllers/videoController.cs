using ProjectF.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace ProjectF.Controllers
{
    public class videoController : ApiController
    {
        private IRepository<videoHistory> Repository = new Repository<videoHistory>();
        public IEnumerable<string> Get()
        {
            return new string[] { "value1", "value2" };
        }

        // GET api/<controller>/5
        public videoHistory getVideoHistory(int id,string name)
        {
            return Repository.getAll().Where(p=>p.useID==id && p.course==name).Last();
        }

        // POST api/<controller>
        public void Post(videoHistory v)
        {
            Repository.Create(v);
        }

        // PUT api/<controller>/5
        public void Put(int id, [FromBody]string value)
        {
        }

        // DELETE api/<controller>/5
        public void Delete(int id)
        {
        }
    }
}