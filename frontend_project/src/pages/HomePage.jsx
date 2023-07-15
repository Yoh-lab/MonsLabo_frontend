import LogIn from "../components/LogIn";
import Frame_468 from "../assets/Frame_468.png";
import Icon_backBlack from "../assets/Icon_backBlack.png";

const HomePage = () => {
  return (
    // <div className="flex flex-col items-center justify-end h-screen w-screen">
    //   <div className="bg-gray-400 p-10 pt-16 pb-16 mb-10 w-2/6 ">
    //     <LogIn />
    //   </div>
    // </div>
    <div
      className="flex flex-col items-center justify-center w-screen"
      style={{
        backgroundImage: `url(${Frame_468})`,
        backgroundPosition: "center",
        backgroundSize: "cover",
      }}
    >
      <div className="flex flex-col justify-center">
        <section className="min-h-screen ">
          {/* <div className="">
          <image src={Icon_backBlack} className="" />
          <MainLogoDark className="w-72 xl:w-full h-24 xl:h-40 mx-auto mb-8" />
          <Typography component="h1" variant="h6">
            全ては、1つのタネから。
          </Typography>
        </div> */}
          <div>
            <image
              src={Icon_backBlack}
              className="w-72 xl:w-full h-24 xl:h-40 mx-auto mb-8"
            />
          </div>
        </section>
        <section className="min-h-screen flex items-center justify-center py-20 text-dark dark:text-light">
          <div>
            <LogIn />
          </div>
        </section>
      </div>
    </div>
  );
};

export default HomePage;
