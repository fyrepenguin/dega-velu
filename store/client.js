import { ApolloClient, InMemoryCache } from "@apollo/client";
import "isomorphic-unfetch";

export const client = new ApolloClient({
  uri: "http://localhost:9001/query",
  headers: {
    Authorization:
      "Basic YjU2M2VmZDIyOTc0NzRhNjYyMjRhYzZmMzNhMDZkYzI4ODc5NzFlNTg5NGQ5MTk3YjA3ZjVjNzg1OThlYjE1MTokMmEkMTAkMmpZSmVNQWNxYTRYaU5hM25qb2xsdVpJcElGREhCTkV3QjB5OVRJdVVobVZNUVZNWVd2Y0c=",
    "X-Space": 1,
  },
  cache: new InMemoryCache(),
});
