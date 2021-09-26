import React, { useEffect } from "react";
import { isEmpty } from "lodash";
import { useQuery } from "@apollo/client";

import { clientCache } from "helpers";
import queries from "core/graphql";
import { GET_PROFILE_FRAGMENT } from "./fragment";

const getProfileQuery = queries?.query?.getProfile(GET_PROFILE_FRAGMENT);

const HomePage = () => {
  const { error } = useQuery(getProfileQuery, {
    fetchPolicy: "network-only",
  });

  useEffect(() => {
    if (isEmpty(clientCache.getAuthenTokenWithCookie())) {
      window.location.href = `${window?.location?.origin}/login`;
      return;
    }

    if (!isEmpty(error)) {
      clientCache.removeAuthenTokenWithCookie();
      window.location.href = `${window?.location?.origin}/login`;
    }
  }, [error]);

  return <h1>HomePage</h1>;
};

export default HomePage;
