import { SignUp } from "@clerk/nextjs";
import Overlay from "../../(auth)/overlay";

export default function Page() {
    return <Overlay children={<SignUp />} />;
}