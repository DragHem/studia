import { auth, signIn } from "@/auth";

function SignIn({ provider, ...props }: { provider?: string }) {
  return (
    <form
      action={async () => {
        "use server";
        await signIn(provider);
      }}
    >
      <button {...props}>Sign In</button>
    </form>
  );
}

export default async function Page() {
  const session = await auth();
  console.log("🚀 ~ Page ~ session:", session);

  if (!session?.user)
    return (
      <form
        action={async () => {
          "use server";
          await signIn("google");
        }}
      >
        <button>Sign In</button>
      </form>
    );

  return (
    <div className="space-y-2">
      <p>{session.user.name}</p>
      <p> {session.user.email}</p>
    </div>
  );
}
