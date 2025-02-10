
const UserInfo = ({ userInfo, loading }) => {
  if (loading) return <p>...جارِ التحميل</p>;
  if (!userInfo) return <p>معلومات الحساب غير متوفرة</p>;

  return (
    <div className="div1">
      <h2>المعلومات الشخصية</h2>
      <p>
        <strong>الاسم:</strong> {userInfo.name}
      </p>
      <p>
        {userInfo.track} <strong>:المسار</strong>
      </p>
    </div>
  );
};

export default UserInfo;
