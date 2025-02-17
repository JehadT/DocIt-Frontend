import { useState, useEffect } from "react";
import { DocumentCheckIcon, UserGroupIcon } from "@heroicons/react/24/outline";
import FakhoorImage from "../components/FakhoorImage";


function Home() {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-primary-50 to-white flex flex-col">
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:mt-20 flex-grow">
        <div className="flex flex-col-reverse lg:flex-row items-center gap-8 md:gap-36">
          {/* Right side - Text */}
          <div className={"lg:w-1/2 text-right"}>
            <h2 className="text-3xl font-bold text-[#29504D] sm:text-4xl mb-8">
              قدم ملفاتك بسهولة
            </h2>
            <div className="space-y-4">
              {/* Trainee Card */}
              <div
                className={
                  "group w-full p-6 rounded-xl shadow-sm border-2 hover:shadow-lg text-right flex items-center gap-4 border-gray-200 bg-white hover:border-primary-200"
                }
              >
                <DocumentCheckIcon className="w-12 h-12 text-primary-600 group-hover:scale-110 " />
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-1">
                    بوابة للمتدرب
                  </h3>
                  <p className="text-gray-600 text-sm">
                    معرفة المستندات المطلوبة وتقديمها بشكل سريع.
                  </p>
                </div>
              </div>
              {/* Supervisor Card */}
              <div
                className={
                  "group w-full p-6 rounded-xl shadow-sm border-2 hover:shadow-lg text-right flex items-center gap-4 border-gray-200 bg-white hover:border-primary-200"
                }
              >
                <UserGroupIcon
                  className="w-12 h-12 text-primary-600 group-hover:scale-110"
                />
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-1">
                    لوحة تحكم للمشرف
                  </h3>
                  <p className="text-gray-600 text-sm">
                    مراجعة وإدارة مستندات المتدربين.
                  </p>
                </div>
              </div>
            </div>
          </div>
          {/* Image */}
          <div
            className={'lg:w-1/2'}
          >
            {/* <img
              src={homePhoto}
              alt="فخور"
              className="w-full max-w-2xl mx-auto"
            /> */}
            <FakhoorImage />
          </div>
        </div>
      </main>
    </div>
  );
}
export default Home;
// #b09c6c #29504D
