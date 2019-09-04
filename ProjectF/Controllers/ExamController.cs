using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace ProjectF.Controllers
{
    public class ExamController : Controller
    {
        // GET: Exam
        public ActionResult Quiz()
        {
            return View();
        }
        public ActionResult CRUD()
        {
            return View("","~/Views/Shared/_Layout2.cshtml",null);
        }
        public ActionResult quizMain()
        {
            return View();
        }
        public ActionResult videoPage()
        {
            return View();
        }
    }
}