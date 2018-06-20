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

namespace RentApp.Controllers
{
    public class TypeOfVehiclesController : ApiController
    {
        private readonly IUnitOfWork unitOfWork;

        public TypeOfVehiclesController(IUnitOfWork unitOfWork)
        {
            this.unitOfWork = unitOfWork;
        }

        // GET: api/TypeOfVehicles
        public IEnumerable<TypeOfVehicle> GetTypesOfVehicle()
        {
            return unitOfWork.TypesOfVehicle.GetAll();
        }

        // GET: api/TypeOfVehicles/5
        [ResponseType(typeof(TypeOfVehicle))]
        public IHttpActionResult GetTypeOfVehicle(int id)
        {
            TypeOfVehicle typeOfVehicle = unitOfWork.TypesOfVehicle.Get(id);
            if (typeOfVehicle == null)
            {
                return NotFound();
            }

            return Ok(typeOfVehicle);
        }

        // PUT: api/TypeOfVehicles/5
        [ResponseType(typeof(void))]
        public IHttpActionResult PutTypeOfVehicle(int id, TypeOfVehicle typeOfVehicle)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != typeOfVehicle.Id)
            {
                return BadRequest();
            }

            try
            {
                unitOfWork.TypesOfVehicle.Update(typeOfVehicle);
                unitOfWork.Complete();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!TypeOfVehicleExists(id))
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

        // POST: api/TypeOfVehicles
        [ResponseType(typeof(TypeOfVehicle))]
        public IHttpActionResult PostTypeOfVehicle(TypeOfVehicle typeOfVehicle)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            unitOfWork.TypesOfVehicle.Add(typeOfVehicle);
            unitOfWork.Complete();

            return CreatedAtRoute("DefaultApi", new { id = typeOfVehicle.Id }, typeOfVehicle);
        }

        // DELETE: api/TypeOfVehicles/5
        [ResponseType(typeof(TypeOfVehicle))]
        public IHttpActionResult DeleteTypeOfVehicle(int id)
        {
            TypeOfVehicle typeOfVehicle = unitOfWork.TypesOfVehicle.Get(id);
            if (typeOfVehicle == null)
            {
                return NotFound();
            }

            /*List<Vehicle> vehicles = unitOfWork.Vehicles.GetAll().ToList();

            foreach (var item in vehicles)
            {
                if(item.Type == typeOfVehicle)
                {
                    unitOfWork.Vehicles.Remove(item);
                    unitOfWork.Complete();
                }
            }

            foreach (var item in typeOfVehicle.Vehicles)
            {
                vehicles.Remove(item);
            }*/

            List<Vehicle> vehicles = unitOfWork.Vehicles.GetAll().Where(x => x.Type == typeOfVehicle).ToList();

            unitOfWork.Vehicles.RemoveRange(vehicles);
            unitOfWork.Complete();

            typeOfVehicle.Vehicles.RemoveAll(x => x.Type == typeOfVehicle);

            unitOfWork.TypesOfVehicle.Remove(typeOfVehicle);
            unitOfWork.Complete();

            return Ok(typeOfVehicle);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                unitOfWork.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool TypeOfVehicleExists(int id)
        {
            return unitOfWork.TypesOfVehicle.Get(id) != null;
        }
    }
}