using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using ProjectF.Models;
using System.Data.Entity;
using System.Diagnostics;
using Newtonsoft.Json;

namespace ProjectF.Controllers
{
    public class quizResultController : ApiController
    {


        private IRepository<quizResult> qaRepository = null;
        public quizResultController()
        {
            this.qaRepository = new Repository<quizResult>();
        }

        public IEnumerable<quizResult> Get()
        {
 
            return qaRepository.getAll();
        }

        //[Route("GetByID/{id}")]
        public IEnumerable<quizResult> GetByID(int id)
        {
            return (qaRepository.getAll()).Where(p => p.userID == id);
        }

        //[Route("GetByID/{id}/{name}")]
        public quizResult GetByID(int id,string name)
        {
            return (qaRepository.getAll()).Where(p => p.userID == id && p.course== name).Last();
        }

        public void PostQAs(quizResult qr)
        {
            IRepository<QA> QARepository = new Repository<QA>();
            //IRepository<courses> coursesRepository = new Repository<courses>();
            int courseID=1; //預設值!?
            //傳回來的是哪種課程
            switch (qr.course)
            {
                case "HTML":
                    courseID = 1;
                    break;
                case "Javascript":
                    courseID = 2;
                    break;
                case "AngularJS":
                    courseID = 3;
                    break;
                default:
                    break;
            }
            //課程總共有幾題
            //courses c = coursesRepository.getByID(courseID);
            int qaCounts = QARepository.getAll().Where(p => p.CID == courseID).Count();
            Debug.WriteLine(qaCounts);
            int? score = 100 / qaCounts;
            Debug.WriteLine(score);
            int? sum = 0;

           
            string[] answers= new string[10];
            string[] userAnswers = new string[10];
            //把答案抓回來
            for (int i = 0; i < qaCounts; i++)
            {
                //這裡q.number會依照題目數量遞增，所以如果我有兩qNumber一樣，就會出錯
                answers[i] = QARepository.getAll().Where(p => p.qNumber == i+1 && p.CID == courseID).First().Answer;
                Debug.WriteLine(answers[i]);
            }


            if (answers[0]!=null && qr.A1 == answers[0])
            {
                sum += score;
            }
            if (answers[1] != null && qr.A2 == answers[1])
            {
                sum += score;
            }
            if (answers[2] != null && qr.A3 == answers[2])
            {
                sum += score;
            }
            if (answers[3] != null && qr.A4 == answers[3])
            {
                sum += score;
            }
            if (answers[4] != null && qr.A5 == answers[4])
            {
                sum += score;
            }
            if (answers[5] != null && qr.A6 == answers[5])
            {
                sum += score;
            }
            if (answers[6] != null && qr.A7 == answers[6])
            {
                sum += score;
            }
            if (answers[7] != null && qr.A8 == answers[7])
            {
                sum += score;
            }
            if (answers[8] != null && qr.A9 == answers[8])
            {
                sum += score;
            }
            if (answers[9] != null && qr.A10 == answers[9])
            {
                sum += score;
            }
  
            qr.scrore = sum.ToString();
            qaRepository.Create(qr);
        }

        public void PutQAs(quizResult qr)
        {
            qaRepository.Update(qr);
        }

        public void DeleteQAs(int id)
        {
            qaRepository.Delete(qaRepository.getByID(id));
        }


    }
}
