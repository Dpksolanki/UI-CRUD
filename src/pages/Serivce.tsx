import React, { useState } from 'react';
import 'daisyui/dist/full.css';
import { FaPlus } from 'react-icons/fa';

interface Service {
  id: number;
  category: string;
  serviceName: string;
  type: '' | 'Type 1' | 'Type 2' | 'Type 3';
  price: string;
}

const Service: React.FC = () => {
  const [Services, setServices] = useState<Service[]>([]);
  const [search, setSearch] = useState('');
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [newService, setNewService] = useState<Service>({ id: 0, category: '', serviceName: '', type: '', price: '' });
  const [newCategory, setNewCategory] = useState('');
  const [showCategoryInput, setShowCategoryInput] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setNewService({ ...newService, [name]: value });
  };

  const addService = () => {
    setServices([...Services, { ...newService, id: Services.length + 1 }]);
    setNewService({ id: 0, category: '', serviceName: '', type: '', price: '' });
    setIsPopupOpen(false);
  };

  const addCategory = () => {
    if (newCategory && !Services.some(Service => Service.category === newCategory)) {
      setServices([...Services, { id: Services.length + 1, category: newCategory, serviceName: '', type: '', price: '' }]);
      setNewCategory('');
      setShowCategoryInput(false);
    }
  };

  const filteredServices = Services.filter(Service =>
    Service.serviceName.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <div className="flex-grow">
          <input
            type="text"
            placeholder="Search..."
            className="input input-bordered w-full max-w-xs"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <button className="btn btn-primary ml-4" onClick={() => setIsPopupOpen(true)}>
            Add New Service
          </button>
        </div>
        <div className="relative">
          {showCategoryInput ? (
            <div className="flex items-center">
              <input
                type="text"
                placeholder="New Category"
                className="input input-bordered input-sm w-40 mr-2"
                value={newCategory}
                onChange={(e) => setNewCategory(e.target.value)}
              />
              <button className="btn btn-sm btn-secondary" onClick={addCategory}>
                Add
              </button>
              <button className="btn btn-sm btn-ghost ml-2" onClick={() => setShowCategoryInput(false)}>
                Cancel
              </button>
            </div>
          ) : (
            <div className="tooltip tooltip-left" data-tip="Create Category">
              <button className="btn btn-circle btn-sm" onClick={() => setShowCategoryInput(true)}>
                <FaPlus />
              </button>
            </div>
          )}
        </div>
      </div>
      <div className="space-y-8">
        {Object.entries(
          filteredServices.reduce((acc, Service) => {
            if (!acc[Service.category]) {
              acc[Service.category] = [];
            }
            acc[Service.category].push(Service);
            return acc;
          }, {} as Record<string, Service[]>)
        ).map(([category, Services]) => (
          <div key={category}>
            <div className="border-b-2 border-gray-300 pb-2 mb-4">
              <h2 className="text-2xl font-bold">{category}</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {Services.map((Service) => (
                <div key={Service.id} className="Service bg-base-100 shadow-xl">
                  <div className="Service-body">
                    <h2 className="Service-title">{Service.serviceName}</h2>
                    <p>Type: {Service.type}</p>
                    <p>Price: {Service.price}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
      {
        filteredServices.length === 0 && (
          <div className="flex justify-center items-center h-96">
            <p className="text-gray-500">No Services found</p>
          </div>
        )
      }

      {isPopupOpen && (
        <div className="modal modal-open">
          <div className="modal-box">
            <h3 className="font-bold text-lg">Add New Service</h3>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Category</span>
              </label>
              <select
                name="category"
                value={newService.category}
                onChange={handleInputChange}
                className="select select-bordered"
              >
                <option value="">Select Category</option>
                <option value="Category 1">Category 1</option>
                <option value="Category 2">Category 2</option>
                <option value="Category 3">Category 3</option>
              </select>
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Service Name</span>
              </label>
              <input
                type="text"
                name="serviceName"
                value={newService.serviceName}
                onChange={handleInputChange}
                className="input input-bordered"
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Type</span>
              </label>
              <select
                name="type"
                value={newService.type}
                onChange={handleInputChange}
                className="select select-bordered"
              >
                <option value="">Select Type</option>
                <option value="Type 1">Type 1</option>
                <option value="Type 2">Type 2</option>
                <option value="Type 3">Type 3</option>
              </select>
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Price</span>
              </label>
              <select
                name="price"
                value={newService.price}
                onChange={handleInputChange}
                className="select select-bordered"
              >
                <option value="">Select Price</option>
                <option value="$100">$100</option>
                <option value="$200">$200</option>
                <option value="$300">$300</option>
              </select>
            </div>
            <div className="modal-action">
              <button className="btn btn-primary" onClick={addService}>
                Save
              </button>
              <button className="btn" onClick={() => setIsPopupOpen(false)}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Service;