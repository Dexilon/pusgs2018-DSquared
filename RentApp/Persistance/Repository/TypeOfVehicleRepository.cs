﻿using RentApp.Models.Entities;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Web;

namespace RentApp.Persistance.Repository
{
    public class TypeOfVehicleRepository : Repository<TypeOfVehicle, int>, ITypeOfVehicleRepository
    {
        public TypeOfVehicleRepository(DbContext context) : base(context)
        {
        }

        public IEnumerable<TypeOfVehicle> GetAll(int pageIndex, int pageSize)
        {
            return RadbContext.TypesOfVehicle.Skip((pageIndex - 1) * pageSize).Take(pageSize);
        }

        protected RADBContext RadbContext { get { return context as RADBContext; } }
    }
}