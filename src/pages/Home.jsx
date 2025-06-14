import logo from "../assets/images/logo.png";
import minigame from "../assets/images/minigame.webp";
import { CompoundLoginModal } from "../components/CompoundLoginModal";
import Attendance from "./Attendance/Index";
import { useUserData } from "../stores/userDataStore";
import LoginBG from "../assets/images/login-page-bg.webp";
import GameBG from "../assets/images/game-bg.webp";

const Home = () => {
  const userData = useUserData();

  return (
    <div
      className="md:w-[500px] min-h-screen mx-auto flex flex-col relative"
      style={{
        background: `url(${
          userData === null ? LoginBG : GameBG
        }) center/cover no-repeat`,
      }}
    >
      <div className="flex flex-col items-center pb-2">
        <a
          className="mt-10 flex"
          href=""
          alt="Truy cập trang chủ Jun88"
          rel="dofollow"
        >
          <img
            src={logo}
            alt="Jun88 nhà cái uy tín"
            className="w-[297px] h-[106px]"
          />
        </a>
      </div>

      <div className="flex flex-col gap-4 items-center justify-center">
        {userData === null && (
          <>
            <img
              className="w-[380px] mt-10"
              src={minigame}
              alt="Jun88 Minigame - Đuổi Hình Đoán Chữ, Trò Chơi Giải Đố Hấp Dẫn"
            />
            <CompoundLoginModal />
          </>
        )}

        {userData !== null && (
          <>
            <Attendance />
          </>
        )}
      </div>
    </div>
  );
};

export default Home;
