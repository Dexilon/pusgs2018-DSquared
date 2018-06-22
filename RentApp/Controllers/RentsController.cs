using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Description;
using RentApp.Models.Entities;
using RentApp.Persistance;
using RentApp.Persistance.UnitOfWork;
using RentApp.Models;

namespace RentApp.Controllers
{
    public class RentsController : ApiController
    {
        private readonly IUnitOfWork unitOfWork;
        private static object o = new object();
        public RentsController(IUnitOfWork unitOfWork)
        {
            this.unitOfWork = unitOfWork;
        }

        // GET: api/Rents
        public IEnumerable<Rent> GetRents()
        {
            return unitOfWork.Rents.GetAll();
        }

        [Route("api/RentsByUserId/{email}")]
        [HttpGet]
        public IHttpActionResult GetRentsByUserId(string email)
        {
            List<AppUser> users = unitOfWork.AppUsers.GetAll().Where(x => x.Email == email).ToList();

            var rents = users[0].Rents;

            return Ok(rents);
        }

        // GET: api/Rents/5
        [ResponseType(typeof(Rent))]
        public IHttpActionResult GetRent(int id)
        {
            Rent rent = unitOfWork.Rents.Get(id);
            if (rent == null)
            {
                return NotFound();
            }

            return Ok(rent);
        }

        // PUT: api/Rents/5
        [Authorize(Roles = "Manager, Admin, AppUser")]
        [ResponseType(typeof(void))]
        public IHttpActionResult PutRent(int id, Rent rent)
        {
            lock (o)
            {
                if (!ModelState.IsValid)
                {
                    return BadRequest(ModelState);
                }

                if (id != rent.Id)
                {
                    return BadRequest();
                }

                try
                {
                    unitOfWork.Rents.Update(rent);
                    unitOfWork.Complete();
                }
                catch (DbUpdateConcurrencyException)
                {
                    if (!RentExists(id))
                    {
                        return NotFound();
                    }
                    else
                    {
                        throw;
                    }
                }

                return StatusCode(HttpStatusCode.NoContent);
            }
        }

        // DELETE: api/Rents/5
        [Authorize(Roles = "Manager, Admin, AppUser")]
        [ResponseType(typeof(Rent))]
        public IHttpActionResult DeleteRent(int id)
        {
            lock (o)
            {
                var ren = unitOfWork.Rents.Get(id);

                if (ren == null)
                {
                    return NotFound();
                }

                var listOfUsers = unitOfWork.AppUsers.GetAll();

                foreach (var item in listOfUsers)
                {
                    if (item.Rents.Contains(ren))
                    {
                        item.Rents.Remove(ren);
                        unitOfWork.AppUsers.Update(item);
                    }
                }

                unitOfWork.Rents.Remove(ren);
                unitOfWork.Complete();

                return Ok(ren);
            }
        }

        // POST: api/Rents
        [Authorize(Roles = "Manager, Admin, AppUser")]
        [ResponseType(typeof(Rent))]
        public IHttpActionResult PostRent(RentBindingModel rentBindingModel)
        {
            lock (o)
            {
                if (!ModelState.IsValid)
                {
                    return BadRequest(ModelState);
                }

                var branches = unitOfWork.Branches.GetAll();

                Branch branch = new Branch();

                foreach (var item in branches)
                {
                    if (item.Address == rentBindingModel.Branch)
                    {
                        branch = item;
                    }
                }

                var vehicles = unitOfWork.Vehicles.GetAll();

                Vehicle vehicle = new Vehicle();

                foreach (var item in vehicles)
                {
                    if (item.Id == rentBindingModel.Vehicle.Id)
                    {
                        vehicle = item;
                    }
                }

                var username = User.Identity.Name;

                var users = unitOfWork.AppUsers.GetAll();

                AppUser appUser = new AppUser();

                foreach (var item in users)
                {
                    if (item.Email == rentBindingModel.Email)
                    {
                        appUser = item;
                    }
                }

                Rent rent = new Rent();
                rent.Branch = branch;
                rent.End = rentBindingModel.End;
                rent.Start = rentBindingModel.Start;
                rent.Vehicle = vehicle;

                appUser.Rents.Add(rent);
                unitOfWork.AppUsers.Update(appUser);
                unitOfWork.Rents.Add(rent);
                unitOfWork.Complete();

                return CreatedAtRoute("DefaultApi", new { id = rent.Id }, rent);
            }
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                unitOfWork.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool RentExists(int id)
        {
            return unitOfWork.Rents.Get(id) != null;
        }
    }
}