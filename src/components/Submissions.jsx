import React, { useState, useEffect } from "react";
import api from "../utils/api";
import { useNavigate } from "react-router-dom";
import transformDate from "../utils/transformDate";
import LoadingTable from "./LoadingTable";

export default function Submissions({ forms, setForms, setOriginalForms }) {
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const handleRowClick = (id) => {
    navigate(`/supervisor/form/${id}`);
  };

  useEffect(() => {
    (async () => {
      try {
        const response = await api.get("/getAllForms");
        setForms(response.data.forms);
        setOriginalForms(response.data.forms);
      } catch (error) {
        console.error("Error fetching user info:", error);
      } finally {
        setLoading(false);
      }
    })();
  }, []);
  return (
    <div className="overflow-x-auto rounded-lg md:p-6 w-full">
      <table className="min-w-full bg-white border border-gray-200 rounded-lg table-fixed">
        <thead>
          <tr className="bg-[#29504D] text-white">
            <th className="p-3 w-[10%]">رقم</th>
            <th className="p-3 w-[25%]">الاسم</th>
            <th className="p-3 w-[25%]">المسار</th>
            <th className="p-3 w-[20%]">التاريخ</th>
            <th className="p-3 w-[20%]">الحالة</th>
          </tr>
        </thead>
        <tbody>
          {loading ? (
            <LoadingTable />
          ) : forms.length === 0 ? (
            <tr>
              <td
                colSpan="5"
                className="text-center font-bold text-gray-600 p-3 align-middle"
              >
                لا توجد مستندات
              </td>
            </tr>
          ) : (
            forms.map((item, index) => (
              <tr
                key={item._id}
                className="border-t hover:bg-gray-100 cursor-pointer"
                onClick={() => handleRowClick(item._id)}
              >
                <td className="p-3 text-center">{index + 1}</td>
                <td className="p-3 text-center">{item.trainee.name}</td>
                <td className="p-3 text-center">{item.track}</td>
                <td className="p-3 text-center">
                  {transformDate(item.updatedAt)}
                </td>
                <td className="p-3 text-center">{item.status}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}


