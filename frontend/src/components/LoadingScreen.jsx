import { useState, useEffect } from "react";

const LoadingScreen = ({ isLoading }) => {
  const [showLoader, setShowLoader] = useState(false);

  useEffect(() => {
    if (isLoading) {
      setShowLoader(true);
    } else {
      setShowLoader(false);
    }
  }, [isLoading]);

  if (showLoader) {
    return (
      <div className="h-screen flex flex-col items-center justify-center bg-gradient-to-b from-gray-900 to-black">
        <div className="flex items-center">
          <img src="/nav.png" alt="logo" className="h-12 animate-pulse" />
          <div className="ml-3 text-white text-3xl font-bold tracking-wide">
            Bantr
          </div>
        </div>
        <div className="w-64 mt-6 h-2 bg-gray-700 rounded-full overflow-hidden">
          <div className="h-full bg-blue-500 rounded-full animate-[progress_2s_infinite]"></div>
        </div>
      </div>
    );
  }

  return null;
};

export default LoadingScreen;
