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
    public class ServicesController : ApiController
    {
        private readonly IUnitOfWork unitOfWork;

        public ServicesController(IUnitOfWork unitOfWork)
        {
            this.unitOfWork = unitOfWork;
        }

        // GET: api/Services
        public IEnumerable<Service> GetServices()
        {

            var retValue = unitOfWork.Services.GetAll();
            foreach (var item in retValue)
            {
                if (item.Activated == true)
                {
                    foreach (var item2 in item.Vehicles)
                    {
                        item2.Images = new List<string>();
                        string[] str = item2.VehicleImagesBase.Split(';');
                        foreach (var img in str)
                        {
                            if (img != "")
                                item2.Images.Add(img);
                        }
                    }
                }
            }

            return retValue;
            
        }


        [Route("api/Services/GetServicesForValidation")]
        [HttpGet]
        public IEnumerable<Service> GetServicesForValidation()
        {

            var retValue = unitOfWork.Services.GetAll();
            List<Service> services = new List<Service>();
            foreach (var item in retValue)
            {
                if(item.Activated == false)
                {
                    services.Add(item);
                }
            }

            return services;

        }

        public IEnumerable<Service> GetServices(int pageIndex, int pageSize)
        {
            var retValue = unitOfWork.Services.GetAll(pageIndex,pageSize);
            foreach (var item in retValue)
            {
                foreach (var item2 in item.Vehicles)
                {
                    item2.Images = new List<string>();
                    string[] str = item2.VehicleImagesBase.Split(';');
                    foreach (var img in str)
                    {
                        if (img != "")
                            item2.Images.Add(img);
                    }
                }
            }

            return retValue;

        }

        // GET: api/Services/5
        [ResponseType(typeof(Service))]
        public IHttpActionResult GetService(int id)
        {

            Service service = unitOfWork.Services.Get(id);

            if (service == null)
            {
                return NotFound();
            }

            foreach (var item in service.Vehicles)
            {
                item.Images = new List<string>();
                string[] str = item.VehicleImagesBase.Split(';');
                foreach (var img in str)
                {
                    if (img != "")
                        item.Images.Add(img);
                }
            }

            return Ok(service);
        }

        // PUT: api/Services/5
        [ResponseType(typeof(void))]
        public IHttpActionResult PutService(int id, Service service)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != service.Id)
            {
                return BadRequest();
            }

            try
            {
                unitOfWork.Services.Update(service);
                unitOfWork.Complete();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ServiceExists(id))
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

        // POST: api/Services
        [ResponseType(typeof(Service))]
        public IHttpActionResult PostService(Service service)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            unitOfWork.Services.Add(service);
            unitOfWork.Complete();

            return CreatedAtRoute("DefaultApi", new { id = service.Id }, service);
        }

        // DELETE: api/Services/5
        [ResponseType(typeof(Service))]
        public IHttpActionResult DeleteService(int id)
        {
            Service service = unitOfWork.Services.Get(id);
            if (service == null)
            {
                return NotFound();
            }

            List<Vehicle> vehicles = unitOfWork.Vehicles.GetAll().Where(x => service.Vehicles.Contains(x)).ToList();
            List<Branch> branches = unitOfWork.Branches.GetAll().Where(x => service.Branches.Contains(x)).ToList();

            unitOfWork.Vehicles.RemoveRange(vehicles);
            unitOfWork.Complete();

            unitOfWork.Branches.RemoveRange(branches);
            unitOfWork.Complete();

            unitOfWork.Services.Remove(service);
            unitOfWork.Complete();

            return Ok(service);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                unitOfWork.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool ServiceExists(int id)
        {
            return unitOfWork.Services.Get(id) != null;
        }
    }
}