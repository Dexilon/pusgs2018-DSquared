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
    public class VehiclesController : ApiController
    {
        private readonly IUnitOfWork unitOfWork;

        public VehiclesController(IUnitOfWork unitOfWork)
        {
            this.unitOfWork = unitOfWork;
        }

        // GET: api/Vehicles
        public IEnumerable<Vehicle> GetVehicles()
        {
            var retValue = unitOfWork.Vehicles.GetAll();
            foreach (var item in retValue)
            {
                item.Images = new List<string>();
                string[] str = item.VehicleImagesBase.Split(';');
                foreach (var img in str)
                {
                    if(img != "")
                        item.Images.Add(img);
                }
            }

            return retValue;
        }


        public IEnumerable<Vehicle> GetVehicles(int pageIndex, int pageSize)
        {
            var retValue = unitOfWork.Vehicles.GetAll(pageIndex, pageSize);
            foreach (var item in retValue)
            {
                item.Images = new List<string>();
                string[] str = item.VehicleImagesBase.Split(';');
                foreach (var img in str)
                {
                    if (img != "")
                        item.Images.Add(img);
                }
            }

            return retValue;
        }

        // GET: api/Vehicles/5
        [ResponseType(typeof(Vehicle))]
        public IHttpActionResult GetVehicle(int id)
        {
            Vehicle vehicle = unitOfWork.Vehicles.Get(id);
            if (vehicle == null)
            {
                return NotFound();
            }

            return Ok(vehicle);
        }

        // PUT: api/Vehicles/5
        [ResponseType(typeof(void))]
        public IHttpActionResult PutVehicle(int id, Vehicle vehicle)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != vehicle.Id)
            {
                return BadRequest();
            }

            try
            {
                unitOfWork.Vehicles.Update(vehicle);
                unitOfWork.Complete();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!VehicleExists(id))
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

        // POST: api/Vehicles
        [ResponseType(typeof(Vehicle))]
        public IHttpActionResult PostVehicle(VehicleBindingModel vehicleBindingModel)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            string images = "";

            foreach(var item in vehicleBindingModel.Images)
            {
                images += item + ";";
            }

            var vehicle = new Vehicle()
            {
                Model = vehicleBindingModel.Model,
                Manufactor = vehicleBindingModel.Manufactor,
                Year = vehicleBindingModel.Year,
                Description = vehicleBindingModel.Description,
                PricePerHour = vehicleBindingModel.PricePerHour,
                Unavailable = vehicleBindingModel.Unavailable,
                VehicleImagesBase = images
            };

            var typesOfVehicle = unitOfWork.TypesOfVehicle.GetAll();
            var services = unitOfWork.Services.GetAll();

            

            TypeOfVehicle t = new TypeOfVehicle();
            Service s = new Service();
            foreach (var item in typesOfVehicle)
            {
                if(item.Name == vehicleBindingModel.type)
                {
                    vehicle.Type = item;
                    t = item;
                    item.Vehicles.Add(vehicle);
                }
            }

            foreach (var item in services)
            {
                if (item.Name == vehicleBindingModel.Service)
                {
                    s = item;
                    s.Vehicles.Add(vehicle);
                }
            }

            unitOfWork.Vehicles.Add(vehicle);
            unitOfWork.TypesOfVehicle.Update(t);
            unitOfWork.Services.Update(s);
            unitOfWork.Complete();

            return CreatedAtRoute("DefaultApi", new { id = vehicle.Id }, vehicle);
        }

        // DELETE: api/Vehicles/5
        [ResponseType(typeof(Vehicle))]
        public IHttpActionResult DeleteVehicle(int id)
        {
            Vehicle vehicle = unitOfWork.Vehicles.Get(id);
            if (vehicle == null)
            {
                return NotFound();
            }

            unitOfWork.Vehicles.Remove(vehicle);
            unitOfWork.Complete();

            return Ok(vehicle);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                unitOfWork.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool VehicleExists(int id)
        {
            return unitOfWork.Services.Get(id) != null;
        }
    }
}