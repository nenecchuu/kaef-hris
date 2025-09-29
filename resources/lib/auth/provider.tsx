import * as React from "react";
import {
  useMutation,
  useQuery,
  type UseMutateFunction,
} from "@tanstack/react-query";
import nProgress from "nprogress";

import { InitialFallback } from "@src/components/fallbacks";
import {
  fetchAuthenticatedUser,
  postSignOut,
  queryKeyFactory,
} from "@src/lib/auth/requests";
import type { AuthenticatedUser } from "@src/lib/auth/schema";

interface AuthContextProps {
  user: AuthenticatedUser;
  signOut: UseMutateFunction<Awaited<ReturnType<typeof postSignOut>>>;
}

export const AuthContext = React.createContext<AuthContextProps | undefined>(
  undefined,
);
AuthContext.displayName = "AuthContext";

interface AuthProviderProps {
  children?: React.ReactNode;
}

export function AuthProvider({ ...props }: AuthProviderProps) {
  const { data } = useQuery({
    queryKey: queryKeyFactory.authenticatedUser,
    queryFn: fetchAuthenticatedUser,
  });

  const { mutate: signOut } = useMutation({
    mutationFn: postSignOut,
    onMutate: () => {
      nProgress.start();
    },
    onSuccess: () => {
      nProgress.done();
      window.location.reload();
    },
  });

  const value = React.useMemo(() => {
    if (!data) {
      return undefined;
    }

    return {
      user: data,
      signOut,
    } satisfies AuthContextProps;
  }, [data, signOut]);

  if (!data) {
    return <InitialFallback />;
  }

  return <AuthContext.Provider value={value} {...props} />;
}
