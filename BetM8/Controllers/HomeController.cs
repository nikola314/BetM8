using BetM8.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace BetM8.Controllers
{
    public class HomeController : Controller
    {
        public db_betm8Entities db = new db_betm8Entities();

        public ActionResult Index()
        {
            return View();
        }

        public ActionResult About()
        {
            ViewBag.Message = "Your application description page.";

            return View();
        }

        public ActionResult Contact()
        {
            ViewBag.Message = "Your contact page.";

            return View();
        }

        public ActionResult Users()
        {
            return View(db.users.ToList());
        }
    }
}