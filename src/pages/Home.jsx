import HomeButton from "../components/HomeButton";

export default function Home({ isLoggedIn, setIsLoggedIn }) {
  return (
    <div className="div3">
      <h1>الصفحة الرئيسية</h1>
      <HomeButton
        isLoggedIn={isLoggedIn}
        setIsLoggedIn={setIsLoggedIn}
        customText="تقديم المستندات"
      />
    </div>
  );
}
