const UserInfo = ({ userInfo, loading }) => {
  if (loading) return <h1></h1>;
  if (!userInfo)
    return <p></p>;

  return (
    <div>
      {localStorage.getItem("userType") == 1 ? (
        <div className="max-w-3xl mx-auto p-6 flex text-center flex-col rounded mt-4">
          <h2 className="text-3xl text-[#29504D] font-bold mb-6">
            المعلومات الشخصية
          </h2>
          <p className="mb-2 text-xl text-right">
            <strong>الاسم:</strong> {userInfo.name}
          </p>
          <p className="text-xl text-right">
            <strong>المسار:</strong> {userInfo.track}
          </p>
        </div>
      ) : (
        <div className="max-w-3xl mx-auto p-6 flex flex-col text-[#29504D] rounded mt-8 mb-4 ">
          <h2 className="text-2xl text-center font-bold mb-8 ">
            المعلومات الشخصية
          </h2>
          <div className="flex text-center flex-row gap-2 w-full">
            <div className="flex flex-col gap-2 w-full">
              <div className="flex flex-col gap-2 w-full">
                <strong>الاسم:</strong>
                <p>{userInfo.name}</p>
              </div>
              <div className="flex flex-col gap-2 w-full">
                <strong>رقم الهوية:</strong>
                <p>{userInfo.nationalId}</p>
              </div>
            </div>

            <div className="flex flex-col gap-2 w-full">
              <div className="flex flex-col gap-2 w-full">
                <strong>المسار:</strong>
                <p>{userInfo.track}</p>
              </div>
              <div className="flex flex-col gap-2 w-full">
                <strong>التخصص الجامعي:</strong>
                <p>{userInfo.major}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserInfo;
