import {
  UserIcon,
  ArchiveBoxIcon,
  CheckCircleIcon,
} from "@heroicons/react/24/outline";

export default function About() {
  return (
    <div className="min-h-screen  flex md:mt-16 justify-center p-2">
      <div className="max-w-3xl p-8 rounded-2xl text-right">
        <h1 className="text-3xl font-bold md:text-center text-[#29504D] mb-4 border-b-0 md:border-b pb-2 border-gray-300">
          عن الموقع
        </h1>
        <p className="text-lg text-gray-700 leading-relaxed">
          يهدف هذا الموقع إلى تسهيل عملية تقديم الوثائق المطلوبة للمتدربين
          المقبولين في برنامج التخرج التابع لوزارة الدفاع. يوفر الموقع بيئة
          إلكترونية آمنة وفعالة لتقديم المستندات ومراجعتها.
        </p>
        <div className="border-t border-gray-300 my-4 sm:hidden" />
        <h2 className="text-2xl font-semibold text-gray-800 mt-10 mb-2 flex items-center">
          <UserIcon className="h-6 w-6 text-gray-800 ml-2" />
          المستخدمون في الموقع
        </h2>
        <ul className="list-disc text-gray-700 leading-relaxed">
          <li className="flex items-start">
            <span>
              <span className="font-bold">المتدرب:</span> يمكنه تقديم المستندات
              المطلوبة بسهولة عبر الموقع.
            </span>
          </li>
          <li className="flex items-start mt-2">
            <span>
              <span className="font-bold">المشرف:</span> يمكنه مراجعة مستندات
              المتدربين، تنزيلها، أو إعادتها في حال وجود أخطاء.
            </span>
          </li>
        </ul>
        <div className="border-t border-gray-300 my-4 sm:hidden" />
        <h2 className="text-2xl font-semibold text-gray-800 mt-10 mb-2 flex items-center">
          <ArchiveBoxIcon className="h-6 w-6 text-gray-800 ml-2" />
          تصنيف حسب المسار
        </h2>
        <p className="text-lg text-gray-700 leading-relaxed">
          يتم تصنيف المتدربين حسب المسار التدريبي الخاص بهم، مثل تقنية
          المعلومات، الموارد البشرية، والمحاسبة. يتمكن كل مشرف من الاطلاع فقط
          على مستندات المتدربين ضمن مساره.
        </p>
        <div className="border-t border-gray-300 my-4 sm:hidden" />
        <h2 className="text-2xl font-semibold text-gray-800 mt-10 mb-2 flex items-center">
          <CheckCircleIcon className="h-6 w-6 text-gray-800 ml-2" />
          مميزات الموقع
        </h2>
        <ul className="list-disc pr-5 text-gray-700 leading-relaxed mb-6">
          <li>رفع المستندات بسهولة وسرعة.</li>
          <li>إمكانية تحميل جميع مستندات المتدرب بضغطة زر واحدة.</li>
          <li>مراجعة المستندات وإعادتها للتعديل عند الحاجة.</li>
          <li>تنظيم المتدربين حسب المسار التدريبي لتسهيل الإشراف.</li>
        </ul>
      </div>
    </div>
  );
}
