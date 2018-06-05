using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Linq;
using System.Net;
using System.Web;
using System.Web.Mvc;
using RentApp.Models.Entities;
using RentApp.Persistance;

namespace RentApp.Controllers
{
    public class TypeOfVehiclesController : Controller
    {
        private RADBContext db = new RADBContext();

        // GET: TypeOfVehicles
        public ActionResult Index()
        {
            return View(db.TypesOfVehicle.ToList());
        }

        // GET: TypeOfVehicles/Details/5
        public ActionResult Details(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            TypeOfVehicle typeOfVehicle = db.TypesOfVehicle.Find(id);
            if (typeOfVehicle == null)
            {
                return HttpNotFound();
            }
            return View(typeOfVehicle);
        }

        // GET: TypeOfVehicles/Create
        public ActionResult Create()
        {
            return View();
        }

        // POST: TypeOfVehicles/Create
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for 
        // more details see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Create([Bind(Include = "Id,Name")] TypeOfVehicle typeOfVehicle)
        {
            if (ModelState.IsValid)
            {
                db.TypesOfVehicle.Add(typeOfVehicle);
                db.SaveChanges();
                return RedirectToAction("Index");
            }

            return View(typeOfVehicle);
        }

        // GET: TypeOfVehicles/Edit/5
        public ActionResult Edit(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            TypeOfVehicle typeOfVehicle = db.TypesOfVehicle.Find(id);
            if (typeOfVehicle == null)
            {
                return HttpNotFound();
            }
            return View(typeOfVehicle);
        }

        // POST: TypeOfVehicles/Edit/5
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for 
        // more details see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Edit([Bind(Include = "Id,Name")] TypeOfVehicle typeOfVehicle)
        {
            if (ModelState.IsValid)
            {
                db.Entry(typeOfVehicle).State = EntityState.Modified;
                db.SaveChanges();
                return RedirectToAction("Index");
            }
            return View(typeOfVehicle);
        }

        // GET: TypeOfVehicles/Delete/5
        public ActionResult Delete(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            TypeOfVehicle typeOfVehicle = db.TypesOfVehicle.Find(id);
            if (typeOfVehicle == null)
            {
                return HttpNotFound();
            }
            return View(typeOfVehicle);
        }

        // POST: TypeOfVehicles/Delete/5
        [HttpPost, ActionName("Delete")]
        [ValidateAntiForgeryToken]
        public ActionResult DeleteConfirmed(int id)
        {
            TypeOfVehicle typeOfVehicle = db.TypesOfVehicle.Find(id);
            db.TypesOfVehicle.Remove(typeOfVehicle);
            db.SaveChanges();
            return RedirectToAction("Index");
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }
    }
}
