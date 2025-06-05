import { onAuthenticateUser } from "@/actions/auth";
import { redirect } from "next/navigation";

export const dynamic = "force-dynamic";

const AuthCallbackPage = async () => {
  const auth = await onAuthenticateUser();
  if (auth.status === 200 || auth.status === 201) {
    redirect("/dashboard/home");
  } else if (auth.status === 401 || auth.status === 500) {
    redirect("/");
  } else {
    redirect("/dashboard/home");
  }
};
export default AuthCallbackPage;
