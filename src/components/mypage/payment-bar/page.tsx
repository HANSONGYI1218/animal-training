"use client";

import { Button } from "@/components/ui/button";
import PortOne, { PaymentRequest } from "@portone/browser-sdk/v2";
import { RequestPayParams } from "./payone-type";

declare const window: typeof globalThis & {
  IMP: any;
};

export default function PaymentContainer() {
  const handlePayment = () => {
    const { IMP } = window;
    IMP.init(process.env.NEXT_PUBLIC_IMP_UID);

    const data: RequestPayParams = {
      pg: "tosspayments",
      pay_method: "card",
      merchant_uid: "orderN3535353535",
      name: "주문명:결제테스트",
      amount: 1004,
      buyer_email: "test@portone.io",
    };

    const callback = async (rsp: any) => {
      if (rsp.success) {
        console.log("성공");
      } else {
        console.log("실패");
      }
    };

    IMP.request_pay(data, callback);
  };

  return (
    <main className="flex flex-col gap-10">
      <section className="flex flex-col">
        <span className="text-lg font-semibold">멤버십</span>
        <Button
          onClick={() => {
            handlePayment();
          }}
          className="flex flex-col gap-6 p-6"
        >
          구독하기
        </Button>
      </section>
    </main>
  );
}
