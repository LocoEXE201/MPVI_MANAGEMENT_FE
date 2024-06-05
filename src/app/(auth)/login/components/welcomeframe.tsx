import type { NextPage } from "next";
import { useMemo, type CSSProperties } from "react";

export type WelcomeframeType = {
  propMargin?: CSSProperties["margin"];
};

const Welcomeframe: NextPage<WelcomeframeType> = ({ propMargin }) => {
  const welcomeToOurStyle: CSSProperties = useMemo(() => {
    return {
      margin: propMargin,
    };
  }, [propMargin]);

  return (
    <div className="mq1200:hidden w-[50%] box-border flex min-h-screen max-w-full shrink-0 flex-row items-center justify-start overflow-hidden bg-[url('/Background/Login_frame.jpg')] bg-cover bg-[center] bg-no-repeat py-[5.25rem] text-left text-[2rem] text-neutral-white">
      <div
        style={{
          backgroundColor: "rgba(0, 0, 0, 0.8)",
          backdropFilter: "blur(15px)",
        }}
        className="rounded-md mx-[4rem] rounded-11xl mq800:pl-[1.938rem] mq800:pr-[1.5rem] mq800:box-border box-border flex max-w-full flex-1 flex-col items-start justify-start gap-[1.5rem_0rem] overflow-hidden py-[2.5rem] px-[3rem]"
      >
        <h2
          style={{ fontWeight: "bolder" }}
          className="text-primary text-center w-full font-inherit mq800:text-[1.625rem] mq450:text-[1.188rem] relative m-0 inline-block max-w-full text-inherit font-semibold"
        >
          Loco. - Love Connection
        </h2>
        <div
          className="text-white text-center mq450:text-[1.125rem] relative flex shrink-0 items-center self-stretch text-[1.375rem] font-medium leading-[145%]"
          style={welcomeToOurStyle}
        >
          Chào mừng bạn quay trở lại với trang quản lý. <br />
          Hãy điền thông tin của bạn vào bên cạnh để được cấp quyền truy cập vào
          khu vực quản lý.
          <br />
        </div>
      </div>
    </div>
  );
};

export default Welcomeframe;
