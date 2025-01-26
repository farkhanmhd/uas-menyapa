import { signIn } from "@/auth";

export default async function SignIn() {
  return (
    <form
      action={async () => {
        "use server";
        await signIn("google", { redirectTo: "/" });
      }}
    >
      <button type='submit' className='border p-2'>
        Signin with Google
      </button>
    </form>
  );
}
