import { SignUp } from "@clerk/nextjs";
import Overlay from "../../overlay";

export default function Page() {
    return <Overlay children={<SignUp />} />;
}