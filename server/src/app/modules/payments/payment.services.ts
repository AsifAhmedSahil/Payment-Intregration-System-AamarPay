import {  join } from "path";
import orderModel from "../order/order.model";
import { verifyPayment } from "./payment.utils";
import { readFileSync } from "fs";

const confirmationService = async (transactionId: string,status:string) => {
  const verifyResponse = await verifyPayment(transactionId);
  let result;
  if (verifyResponse && verifyResponse.pay_status === "Successful") {
    result = await orderModel.findOneAndUpdate(
      { transactionId },
      {
        paymentStatus: "Paid",
      }
    );
  }

  const filepath = join(__dirname, '../../../views/confirmation.html')
  let template =readFileSync(filepath,"utf-8")
  console.log(template)

  template = template.replace("{{message}}",status)


  return template;
};

export const paymentServices = {
  confirmationService,
};
