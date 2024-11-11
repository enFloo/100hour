import { Navbar } from '../components/nav'

export default function DashBoard() {
  return (
    <>
      <div className="min-h-screen flex flex-col">
        {/* Navbar */}
        <div className="">
          <Navbar/>
        </div>
        {/* Main Content */}
        <main className="flex-1 flex mt-5 justify-center">
          {/* Main Card */}
          <div className="w-11/12 rounded overflow-hidden shadow-lg">
            <div className="px-6 py-4 bg-white">
              <div className="text-xl mb-2">Dashboard</div>
                <p className="text-gray-700 text-base">
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatibus quia, nulla! Maiores et perferendis eaque, exercitationem praesentium nihil.
                </p>
            </div>
          </div>
          
        </main>

      </div>
      
    </>
  );
}
