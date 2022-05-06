/** @jsx jsx */
/** @jsxRuntime classic */
import React from 'react'; // eslint-disable-line no-unused-vars
import { jsx } from 'theme-ui';
// import Seo from './Seo';
import StoryCard from './StoryCard';
import CategoriesGroup from './CategoriesGroup';

function Homepage({ data }) {
  return (
    <>
      {/* <Seo title={dega.space.site_title} canonical={dega.space.site_address} type="website" /> */}
      <div
        sx={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'center',
          gap: '1rem',
          borderBottomWidth: [null, null, null, 'px'],
        }}
      >
        {/* Left sidebar */}
        {/* <div
          className="sidebar"
          sx={{
            display: [null, null, null, null, 'flex'],
            width: [null, null, null, null, '1/4'],
            borderRightWidth: 'px',
            position: 'sticky',
          }}
        >
          <div sx={{ display: 'block' }}>
            <div
              sx={{
                mb: (theme) => `${theme.space.spacing5}`,
                py: (theme) => `${theme.space.spacing5}`,
                px: (theme) => `${theme.space.spacing6}`,
                borderBottomWidth: 'px',
              }}
            >
              <h5 className="heading">Categories</h5>
              <CategoriesGroup categories={data.categories.nodes} />
            </div>
          </div>
        </div> */}
        {/* Main/ Middle part of the homepage */}
        <div
          className="main-content"
          sx={{ width: ['full', null, '3/4', null, '2/4'], }}
        >
          {/* Featured Card */}
          {data.posts.nodes.length > 0 ? (
            <div className='featured' sx={{
              transition: 'all 0.5s',
              '&:hover': { textDecoration: 'none', transform: 'scale(1.04)', },
            }}>
              <StoryCard
              cardStyle="featured"
              storyData={data.posts.nodes[0]}
              // imageSize="w-full h-64"
              imageSize={{ width: 'full', height: 64 }}
            />
            </div>

          ) : null}

          {/* Articles list */}
          <div
            sx={{
              display: 'flex',
              flexDirection: 'column',
              py: (theme) => `${theme.space.spacing6}`,
            }}
          >
            {data?.posts.nodes.slice(1, 20).map((item, index) => (
              <StoryCard
                key={`homepage-post-${index}`}
                cardStyle="card"
                storyData={item}
                imageSize={{
                  width: ['full', null, '1/3'],
                  height: [48, null, 'full'],
                  py: [(theme) => `${theme.space.spacing6}`, null, 0],
                }}
              />
            ))}
          </div>
        </div>
        {/* Right sidebar */}
        <div
          className="sidebar"
          sx={{
            display: [null, null, null, 'flex'],
            width: [null, null, null, '2/6', '1/4'],
            borderLeftWidth: 'px',
            position: 'sticky',
          }}
        >
          <div sx={{ display: 'block' }}>
            <div
              sx={{
                mb: (theme) => `${theme.space.spacing5}`,
                py: (theme) => `${theme.space.spacing5}`,
                px: (theme) => `${theme.space.spacing6}`,
                borderBottomWidth: 'px',
              }}
            >
              <h5 sx={{ fontSize: '1.25rem' }}>Recent In Factchecks</h5>
            </div>
            {data?.factchecks.nodes.map((item, index) => (
              <StoryCard
                key={`homepage-factcheck-${index}`}
                cardStyle="vertical"
                storyData={item}
                imageSize={{ height: 40 }}
              />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
export default Homepage;
