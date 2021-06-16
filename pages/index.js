import React from 'react';
import { client } from '../store/client';
import gql from 'graphql-tag';
import Homepage from '../components/Homepage';

export default function Home({ data }) {
  return <Homepage data={data} />;
}

export async function getServerSideProps(context) {
  const { data } = await client.query({
    query: gql`
      query Homepage {
        menu {
          nodes {
            menu
            id
            slug
            name
          }
        }
        space {
          description
          name
          site_title
          tag_line
          site_address
          fav_icon {
            url
            dimensions
          }
          logo {
            url
            dimensions
          }
        }
        categories(limit: 100, page: 1) {
          nodes {
            id
            slug
            name
            description
            meta_fields
            medium {
              url
              dimensions
            }
          }
        }
        posts: posts(formats: [7]) {
          total
          nodes {
            users {
              id
              first_name
              last_name
            }
            categories {
              slug
              name
            }
            medium {
              alt_text
              url
              dimensions
            }
            published_date
            id
            status
            subtitle
            title
            slug
            excerpt
          }
        }
        factchecks: posts(formats: [8]) {
          total
          nodes {
            users {
              id
              first_name
              last_name
            }
            categories {
              slug
              name
            }
            medium {
              alt_text
              url
              dimensions
            }
            published_date
            id
            status
            subtitle
            title
            slug
          }
        }
      }
    `,
  });

  if (!data) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      data,
    },
  };
}
