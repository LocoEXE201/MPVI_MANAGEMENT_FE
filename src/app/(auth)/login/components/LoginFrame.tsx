import type { NextPage } from "next";
import { useMemo, type CSSProperties } from "react";

export type FrameComponent1Type = {
  registerIndividualAccount?: string;
  propWidth?: CSSProperties["width"];
  propDisplay?: CSSProperties["display"];
};

const LoginFrame: NextPage<FrameComponent1Type> = ({
  registerIndividualAccount,
  propWidth,
  propDisplay,
}) => {
  const registerIndividualAccountStyle: CSSProperties = useMemo(() => {
    return {
      width: propWidth,
    };
  }, [propWidth]);

  const forThePurposeStyle: CSSProperties = useMemo(() => {
    return {
      display: propDisplay,
    };
  }, [propDisplay]);

  return (
    <div className="font-baloo box-border flex max-w-full shrink-0 flex-row items-start justify-start px-px py-0 text-left text-11xl text-black">
      <div className="flex max-w-full flex-1 flex-col items-start justify-start gap-[10px_0px]">
        <h2
          className="text-primay mb-2 text-[2rem] font-inherit mq800:text-5xl mq450:text-lg relative m-0 box-border flex max-w-full items-center pr-5 text-inherit font-bold"
          style={registerIndividualAccountStyle}
        >
          {registerIndividualAccount}
        </h2>
        <div
          className="text-primay font-baloo-2 text-lightslategray relative self-stretch text-lg font-medium leading-[28px]"
          style={forThePurposeStyle}
        >
          {`Vui lòng điền thông tin đăng nhập dưới đây.`}
        </div>
      </div>
    </div>
  );
};

export default LoginFrame;
