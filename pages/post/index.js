import React from "react";
import Link from "next/link";

import { client } from "../../store/client";
import gql from "graphql-tag";

export default function Home({ posts }) {
  return posts.map((post) => (
    <div key={post.slug} style={{ marginLeft: "50%" }}>
      <Link href={"/post/" + post.slug}>
        <h1>{post.title}</h1>
      </Link>
      <div>
        <image src={post?.medium?.url?.proxy || post?.medium?.url?.raw} />
        <b>Published Date:</b> {post.published_date}
        <br />
        <b>Authors</b>
        {post.users.map((user) => (
          <p>
            {user.first_name} {user.last_name} {user.email}
          </p>
        ))}
        <br />
        <b>Format:</b> {post.format.name}
        <br />
        <p>{post.excerpt}</p>
      </div>
    </div>
  ));
}

export async function getServerSideProps(context) {
  const res = await client.query({
    query: gql`
      {
        posts {
          nodes {
            excerpt
            title
            slug
            published_date
            medium {
              url
            }
            users {
              first_name
              last_name
              email
            }
            format {
              name
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
      posts: data.data.posts.nodes,
    },
  };
}
