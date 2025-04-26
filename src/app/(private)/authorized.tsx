// import { useEffect } from "react";
import { useAuth } from "@/providers/firebase";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const Authorized = () => {
  const router = useRouter();
  const { user } = useAuth();

  useEffect(() => {
    if (!user.uid) {
      router.push("/");
    }
  }, [router, user]);

  return user && <div>Congratulations {user?.email}! You are logged in.</div>;
};

export default Authorized;
