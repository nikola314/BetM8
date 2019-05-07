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

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

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

        public ActionResult ShowLoginView()
        {
            return View("Login");
        }

        [HttpPost]
        public ActionResult Login(string username, string password)
        {
            var user = db.users.Where(u => u.username == username && u.password == password).FirstOrDefault() as user;

            Session["user"] = user;

            if (user == null)
            {
                ViewBag.message = "Invalid username/password combination!";
                return View("Login");
            }

            return RedirectToAction("Index", "users");
        }
    }
}