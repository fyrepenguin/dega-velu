import React from "react";
import Link from "next/link";

import { client } from "../../store/client";
import gql from "graphql-tag";

export default function Home({ authors }) {
  return authors.map((author) => (
    <div key={author.slug} style={{}}>
      <h1>{author.first_name}</h1>

      <div>
        <h2>
          <h2>
            {author.first_name} {author.last_name}
          </h2>
        </h2>
        <img src={author?.medium?.url?.proxy || author?.medium?.url?.raw} />
        <br />
        <table>
          <tr>
            <td>
              <b>Description:</b>
            </td>
            <td>{author.description}</td>
          </tr>
          <tr>
            <td>
              <b>Email:</b>
            </td>
            <td>{author.email}</td>
          </tr>
          <tr>
            <td>
              <b>Display Name:</b>
            </td>
            <td>{author.display_name}</td>
          </tr>
          <tr>
            <td>
              <b>Birth Date:</b>
            </td>
            <td>{author.birth_date}</td>
          </tr>
          <tr>
            <td>
              <b>Gender:</b>
            </td>
            <td>{author.gender}</td>
          </tr>
        </table>
        <br />
      </div>
    </div>
  ));
}

export async function getServerSideProps() {
  const res = await client.query({
    query: gql`
      {
        users {
          nodes {
            first_name
            last_name
            slug
            email
            birth_date
            gender
            description
            social_media_urls
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
      authors: data.data.users.nodes,
    },
  };
}
