import { useState } from "react";

const SearchFilter = ({ setForms, originalForms }) => {
  const [filters, setFilters] = useState({
    traineeName: "",
    status: "",
    updatedAt: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFilters({ ...filters, [name]: value });
  };

  const applyFilters = () => {
    const filtered = originalForms.filter((form) => {
      const formUpdatedAt = new Date(form.updatedAt);
      const filterDate = filters.updatedAt ? new Date(filters.updatedAt) : null;
      return (
        form.trainee.name
          .toLowerCase()
          .includes(filters.traineeName.toLowerCase()) &&
        (filters.status === "" ||
          form.status.toLowerCase().includes(filters.status.toLowerCase())) &&
        (!filterDate || formUpdatedAt > filterDate)
      );
    });
    setForms(filtered);
  };

  const resetFilters = () => {
    setForms(originalForms);
    setFilters({ traineeName: "", status: "", updatedAt: "" });
  };

  return (
    <div className="rounded-lg p-6 w-full max-w-sm md:max-w-md lg:max-w-lg mx-auto md:mx-0">
      <h2 className="text-2xl font-bold text-[#29504D] mb-4 text-center">
        بحث
      </h2>

      <div className="flex flex-col md:flex-row gap-2">
        {/* Name Input */}
        <div className="w-full md:w-1/3">
          <label className="block text-right font-bold text-gray-700">
            الاسم:
          </label>
          <input
            type="text"
            name="traineeName"
            value={filters.traineeName}
            onChange={handleInputChange}
            className="w-full p-3 border rounded"
            placeholder="اسم المتدرب"
          />
        </div>

        {/* Status Select */}
        <div className="w-full md:w-1/3">
          <label className="block text-right font-bold text-gray-700">
            الحالة:
          </label>
          <select
            name="status"
            value={filters.status}
            onChange={handleInputChange}
            className="w-full p-1 border rounded"
          >
            <option value="">الكل</option>
            <option value="تحت المراجعة">تحت المراجعة</option>
            <option value="مُعادة">مُعادة</option>
            <option value="مقبولة">مقبولة</option>
            <option value="مرفوضة">مرفوضة</option>
          </select>
        </div>

        {/* Date Input */}
        <div className="w-full md:w-1/3">
          <label className="block text-right font-bold text-gray-700">
            من تاريخ:
          </label>
          <input
            type="date"
            name="updatedAt"
            value={filters.updatedAt}
            onChange={handleInputChange}
            className="w-full p-3 border rounded"
          />
        </div>
      </div>

      {/* Buttons */}
      <div className="flex justify-center gap-2 mt-6">
        <button
          onClick={resetFilters}
          className="bg-transparent border border-blue-500 text-blue-500 hover:bg-blue-100 font-bold px-4 py-2 rounded"
        >
          إعادة تعيين
        </button>
        <button
          onClick={applyFilters}
          className="bg-transparent border border-blue-500 text-blue-500 hover:bg-blue-100 font-bold px-4 py-2 rounded"
        >
          بحث
        </button>
      </div>
    </div>
  );
};

export default SearchFilter;
