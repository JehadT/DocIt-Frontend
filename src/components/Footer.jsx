const Footer = () => {
  return (
    <footer className="bg-[#29504D] text-white py-8 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col  justify-between items-center">
          <div className="text-center  mb-4 md:mb-0">
            <h3 className="text-lg font-semibold mb-2">Doc-It</h3>
            <p className="text-sm text-gray-300">
              برنامج فخور {new Date().getFullYear()}
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer