/** @jsx jsx */
/** @jsxRuntime classic */

import React from 'react'; // eslint-disable-line no-unused-vars
import gql from 'graphql-tag';
import { jsx } from 'theme-ui';
import {
  FaEnvelope,
  FaFacebookSquare,
  FaInstagramSquare,
  FaLink,
  FaLinkedin,
  FaTwitterSquare,
} from 'react-icons/fa';
import FormatPageLayout from 'components/FormatPageLayout';
import { client } from 'store/client';
import Head from 'next/head';

function UserDetailsFormat({ data }) {
  //const { dega } = data;
  const getIcon = (name) => {
    switch (name) {
      case 'twitter':
        return <FaTwitterSquare color="#1da1f2" size="1.75rem" />;
      case 'facebook':
        return <FaFacebookSquare color="#3b5998" size="1.75rem" />;
      case 'instagram':
        return <FaInstagramSquare color="#e1306c" size="1.75rem" />;
      case 'linkedin':
        return <FaLinkedin size="1.75rem" color="#0077b5" />;
      case 'email':
        return <FaEnvelope size="1.75rem" color="#172b4d" />;
      default:
        return <FaLink size="1.75rem" />;
    }
  };

  const name = data.user.display_name
    ? `${data.user.display_name}`
    : `${data.user.first_name} ${data.user.last_name}`;

  const header = (item) => {
    return (
      <div sx={{ mb: (theme) => `${theme.space.spacing5}` }}>
        {item.medium && (
          <img
            src={item.medium?.url.proxy}
            alt=""
            sx={{
              borderRadius: '50%',
              width: 40,
              height: 40,
              mx: 'auto',
              padding: (theme) => `${theme.space.spacing8}`,
            }}
          />
        )}
        <h1
          sx={{
            textAlign: 'center',
            fontSize: (theme) => `${theme.fontSizes.h4}`,
            mb: (theme) => `${theme.space.spacing5}`,
            textTransform: 'capitalize',
          }}
        >
          {name}
        </h1>
        {item.description && (
          <p sx={{ textAlign: 'center', pb: (theme) => `${theme.space.spacing5}` }}>
            {item.description}
          </p>
        )}
        <div sx={{ display: 'flex', justifyContent: 'center' }}>
          {item.social_media_urls &&
            Object.keys(item.social_media_urls).map((name) => (
              <a
                key={name}
                title={name}
                href={item.social_media_urls[name]}
                target="_blank"
                rel="noopener noreferrer"
                sx={{ mr: (theme) => `${theme.space.spacing3}` }}
              >
                {getIcon(name)}
              </a>
            ))}
          <a href={`mailto:${item.email}`} title="email">
            {getIcon('email')}
          </a>
        </div>
      </div>
    );
  };
  return (
    <>
      <Head>
        <title>{name}</title>
      </Head>
      <FormatPageLayout
        type="author"
        posts={data.posts.nodes}
        formats={data.formats.nodes}
        item={data.user}
        header={header}
        useSlug={false}
      />
    </>
  );
}

export default UserDetailsFormat;

export async function getServerSideProps({ params }) {
  const { data } = await client.query({
    query: gql`
      query ($id: Int!, $formatSlug: String!) {
        user(id: $id) {
          id
          first_name
          last_name
          email
          display_name
          social_media_urls
          description
          medium {
            url
            dimensions
          }
        }
        formats {
          nodes {
            id
            slug
            name
          }
        }
        posts(users: { ids: [$id] }, formats: { slugs: [$formatSlug] }) {
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
            format {
              name
              slug
            }
            published_date
            id
            excerpt
            status
            subtitle
            title
            slug
          }
        }
      }
    `,
    variables: {
      id: params.id,
      formatSlug: params.formatSlug,
    },
  });

  if (!data || !data.user) {
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
