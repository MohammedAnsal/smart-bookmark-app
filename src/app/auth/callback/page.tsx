"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { getSession } from "@/lib/services/authService";
import LoadingSpinner from "@/components/ui/LoadingSpinner";

export default function AuthCallbackPage() {
  const router = useRouter();

  useEffect(() => {
    const handleCallback = async () => {
      const session = await getSession();

      if (!session) {
        toast.error("Authentication failed");
        router.replace("/");
        return;
      }

      toast.success("Successfully signed in");
      router.replace("/dashboard");
    };

    handleCallback();
  }, [router]);

  return <LoadingSpinner message="Completing sign in…" />;
}
