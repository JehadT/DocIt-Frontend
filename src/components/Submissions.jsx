import React, { useState, useEffect } from "react";
import api from "../utils/api";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import transformDate from "../utils/transformDate";

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
        console.log(response.data.forms);
      } catch (error) {
        console.error("Error fetching user info:", error);
      } finally {
        setLoading(false);
      }
    })();
  }, []);
  return (
    <div className="div3">
      {loading ? (
        <h2>...جارِ التحميل</h2>
      ) : forms.length === 0 ? (
        <div className="no-forms">لا توجد مستندات</div>
      ) : (
        <table className="forms-table">
          <thead>
            <tr>
              <th>الحالة</th>
              <th>التاريخ</th>
              <th>المسار</th>
              <th>الاسم</th>
            </tr>
          </thead>
          <tbody>
            {forms.map((item, index) => (
              <tr key={item._id} onClick={() => handleRowClick(item._id)}>
                <td>{item.status}</td>
                <td>{transformDate(item.updatedAt)}</td>
                <td>{item.track}</td>
                <td>{item.trainee.name}</td>
                <td>{index + 1}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
