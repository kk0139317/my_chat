"use client";

import { useEffect } from "react";
import { useUser } from "@clerk/nextjs";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";

export default function UserSync() {
  const { user, isLoaded } = useUser();
  const createUser = useMutation(api.users.createUser);

  useEffect(() => {
    if (!isLoaded || !user) return;

    createUser({
      tokenIdentifier: user.id,
      email: user.primaryEmailAddress?.emailAddress ?? "",
      name: user.fullName ?? "Anonymous",
      image: user.imageUrl,
    });
  }, [isLoaded, user]);

  return null;
}
