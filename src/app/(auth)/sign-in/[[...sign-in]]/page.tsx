// app/sign-in/[[...sign-in]]/page.tsx
import { SignIn } from "@clerk/nextjs";
import Overlay from "../../overlay";

export default function Page() {
  return <Overlay children={<SignIn />} />;
}
