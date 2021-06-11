import React from "react";
import styles from "../styles/Home.module.css";

import { client } from "../store/client";
import gql from "graphql-tag";

export default function Home({ data }) {
  console.log({ data });
  return <div className={styles.container}>Dega velu</div>;
}

export async function getServerSideProps(context) {
  const res = await client.query({
    query: gql`
      {
        posts {
          nodes {
            space_id
            title
            id
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
      data: data.data.posts.nodes,
    },
  };
}

// export async function getStaticProps() {
//   console.log("Static Props");
//   await client
//     .query({
//       query: gql`
//         {
//           posts {
//             nodes {
//               space_id
//               title
//               id
//             }
//             total
//           }
//         }
//       `,
//     })
//     .then((res) => {
//       console.log({ res: res.data.posts.nodes });
//     })
//     .catch(({ graphQLErrors, networkError }) => {
//       console.log({ graphQLErrors, networkError: networkError.result.errors });
//     })
//     .finally(() => {
//       console.log({ finally: "dsdnasmnda,smn" });
//     });

//   return {
//     props: {
//       launches: null,
//     },
//   };
// }
