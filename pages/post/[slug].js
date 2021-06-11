import React from "react";
import Link from "next/link";

import { client } from "../../store/client";
import gql from "graphql-tag";

export default function Home({ post }) {
  return (
    <div key={post.slug} style={{ marginLeft: "50%" }}>
      <Link href={"/posts/" + post.slug}>
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
  );
}

export async function getServerSideProps(context) {
  const res = await client.query({
    query: gql`
      {
        post(id: 10) {
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
      }
    `,
  });
  const data = res;

  if (!data) {
    return {
      notFound: true,
    };
  }

  console.log({ data });

  return {
    props: {
      post: data.data.post,
    },
  };
}
