import { redirect } from "next/navigation";

export default function SignUpRedirect() {
  // Redirect to the role selection page
  redirect("/sign-up/employer");
}
