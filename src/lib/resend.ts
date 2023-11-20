import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY as string);

export default resend;
