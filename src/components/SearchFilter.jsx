import React, { useState } from "react";

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
    <div className="div2">
      <h2>بحث</h2>
      <div>
        <label>
          <input
            type="text"
            name="traineeName"
            value={filters.traineeName}
            onChange={handleInputChange}
          />
          :الاسم
        </label>
      </div>
      <div>
        <label>
          <select
            name="status"
            value={filters.status}
            onChange={handleInputChange}
          >
            <option value="">الكل</option>
            <option value="تحت المراجعة">تحت المراجعة</option>
            <option value="مقبولة">مقبولة</option>
            <option value="مرفوضة">مرفوضة</option>
            <option value="مُعادة">مُعادة</option>
          </select>
          :الحالة
        </label>
      </div>
      <div>
        <label>
          <input
            type="date"
            name="updatedAt"
            value={filters.updatedAt}
            onChange={handleInputChange}
          />
          :من تاريخ
        </label>
      </div>
      <button onClick={applyFilters}>تصفية</button>
      <button onClick={resetFilters}>إظهار الكل</button>
    </div>
  );
};

export default SearchFilter;
