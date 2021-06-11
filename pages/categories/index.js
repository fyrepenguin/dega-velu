import React from "react";

import { client } from "../../store/client";
import gql from "graphql-tag";

export default function Home({ categories }) {
  return categories.map((category) => (
    <div key={category.slug} style={{ marginLeft: "50%" }}>
      <h1>{category.name}</h1>

      <div>
        <img src={category?.medium?.url?.proxy || category?.medium?.url?.raw} />
        <br />
        <b>Description</b>
        <div dangerouslySetInnerHTML={{ __html: category.html_description }} />
        <br />
      </div>
    </div>
  ));
}

export async function getServerSideProps() {
  const res = await client.query({
    query: gql`
      {
        categories {
          nodes {
            name
            slug
            html_description
            medium {
              url
            }
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
      categories: data.data.categories.nodes,
    },
  };
}
