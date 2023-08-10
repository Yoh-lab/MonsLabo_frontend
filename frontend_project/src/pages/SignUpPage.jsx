import SignUp from "../components/SignUp";
import BackIcon from "../assets/BackGround_Only.png";
import Image from "../assets/MONS LAB.png";

const SignUpPage = () => {
  return (
    <div
      className="flash_back flex flex-col items-center justify-center w-screen"
      style={{
        backgroundImage: `url(${BackIcon})`,
        backgroundPosition: "center",
        backgroundSize: "cover",
      }}
    >
    <div className="flex flex-col items-center justify-center h-screen w-screen">
    <img
        src={Image}
        alt="Click to Sign Out"
        className="w-1/2 mb-24 mt-16"
      />
      <div className="border-r-gray-600 border-r-8 border-b-gray-600 border-b-8 bg-gray-400 p-10 pt-16 pb-16 mb-10 w-2/6">
        <SignUp />
      </div>
    </div>
    </div>
  );
};

export default SignUpPage;
