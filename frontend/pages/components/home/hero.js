import Animation from "./animation";
import { Link } from "react-router-dom";

export default function Hero() {
  return (
    <>
      <div className="h-20 pl-40 pt-5 tracking-widest bg-[#42DDBB]">
        <div className="h-20 pb-10 pt-9 tracking-widest ">
          <div className="pb-6 text-5xl font-custom  text-white body-font">
            맛있는 음식 먹고 싶은데,
          </div>
          <div className="font-custom text-5xl text-white body-font">
            혼자 배달비 부담스러우시죠?
          </div>
        </div>

        <div className="pt-10">
          <div className=" text-2xl pt-20 pb-8 text-white body-font">
            당신의 배달비를 저희가 아껴드릴게요!
          </div>
          <div className="flex">
            <div className="pl-4">
              <a
                href="./categorypost"
                className="pl-10 text-xl inline-flex border-2 border-white rounded-full text-white border-1 py-2 px-6 focus:outline-none hover:bg-white hover:text-[#42DDBB] rounded text-lg"
              >
                메뉴 선택하기
                <svg
                  class="w-5 ml-2"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z"
                    clip-rule="evenodd"
                  ></path>
                </svg>
              </a>
            </div>

            <div className="pl-4">
              <a
                href="./locationpost"
                className="pl-10 text-xl inline-flex border-2 border-white rounded-full text-white border-1 py-2 px-6 focus:outline-none hover:bg-white hover:text-[#42DDBB] rounded text-lg"
              >
                1km 반경 내 이웃들 글 보기
                <svg
                  class="w-5 ml-2"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z"
                    clip-rule="evenodd"
                  ></path>
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
      <div className="h-80 rounded-bl-full bg-[#42DDBB]"></div>

      <div className="flex justify-between p-20 ml-20">
        <div className="">
          <div className="text-[#42DDBB] text-2xl font-bold">서비스 소개</div>
          <div className=" tracking-wide text-4xl pt-5 pb-3  font-semibold body-font">
            매일 다양한 음식을
          </div>
          <div className=" tracking-wide text-4xl font-semibold body-font">
            저렴한 가격에 즐길 수 있습니다.
          </div>
          <div className=" tracking-wide text-2xl pt-9  font-ligth ">
            비싸져만 가는 배달비를 다른 사람들과 함께
          </div>
          <div className=" tracking-wide text-2xl pt-1 font-ligth ">
            나눠서 내서 저렴하게 맛있는 음식을
          </div>
          <div className=" tracking-wide text-2xl pt-1 font-ligth ">
            즐겨보실 수 있습니다.
          </div>
        </div>
        <div className="lg:max-w-lg lg:w-full md:w-1/2 w-5/6">
          <Animation />
        </div>
      </div>
    </>
  );
}
