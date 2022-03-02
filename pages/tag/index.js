import React from "react";
import { client } from "../../store/client";
import gql from "graphql-tag";

export default function Home({ tags }) {
  return tags.map((tag) => (
    <div key={tag.slug} style={{ marginLeft: "50%" }}>
      <h1>{tag.name}</h1>
      <div>
        <br />
        <b>Description</b>
        <div dangerouslySetInnerHTML={{ __html: tag.html_description }} />
        <br />
      </div>
    </div>
  ));
}

export async function getServerSideProps() {
  const res = await client.query({
    query: gql`
      {
        tags {
          nodes {
            name
            slug
            html_description
          }
          total
        }
      }
    `,
  });
  const data = res;

  if (!data) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      tags: data.data.tags.nodes,
    },
  };
}
