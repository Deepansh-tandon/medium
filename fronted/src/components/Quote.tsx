export const Quote = () => {
  return (
    <div className="bg-slate-200 h-screen flex flex-col justify-center items-center">
      {/* Main Quote Section */}
      <div className="flex flex-col items-center">
        <div className="max-w-lg text-center text-3xl font-semibold mb-4">
          "Success is not final, failure is not fatal: It is the courage to continue that counts."
        </div>
        <div className="max-w-md text-center text-xl font-medium mb-2">
          - Winston Churchill
        </div>
      </div>

      {/* Subtext Section */}
      <div className="max-w-md text-center text-sm font-light text-gray-600 mt-4">
        Keep pushing forward, no matter what challenges come your way. The journey itself is the reward.
      </div>
    </div>
  );
};
