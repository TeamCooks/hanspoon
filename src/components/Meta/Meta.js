// components/Meta
/* eslint-disable no-undefined */
import React from 'react';
import { Helmet } from 'react-helmet-async';

const locales = {
  en: 'en_US',
  ko: 'ko_KR',
};

export const Meta = ({ data }) => {
  const lang = locales[data.locale] || locales['en'];
  const title = data.title;
  const description = data.description;
  const image = data.image !== undefined && `${data.image}`;
  const canonical = 'https://hanspoon-31cd9.web.app/';
  const type = data.type === undefined ? 'website' : data.type;
  const width = data.image && (data.width || 1200);
  const height = data.image && (data.height || 630);

  return (
    <Helmet titleTemplate="%s">
      <title>{`${title} - HanSpoon`}</title>
      <meta name="description" content={description} />
      {canonical ? <link rel="canonical" href={canonical} /> : null}
      {image ? <link rel="image_src" href={image} /> : null}
      {image ? <meta itemprop="image" content={image} /> : null}

      <meta property="og:site_name" content="YOUR WEB SITE" />
      <meta property="og:title" content={title} />
      {description ? <meta property="og:description" content={description} /> : null}
      {canonical ? <meta property="og:url" content={canonical} /> : null}
      <meta property="og:locale" content={locales[lang]} />
      <meta property="og:type" content={type} />
      {image ? <meta property="og:image" content={image} /> : null}
      {width ? <meta property="og:image:width" content={width} /> : null}
      {height ? <meta property="og:image:height" content={height} /> : null}
      <meta property="fb:pages" content="YOUR WEB SITE" />

      {/* change type of twitter if there is no image? */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      {description ? <meta name="twitter:description" content={description} /> : null}
      {image ? <meta name="twitter:image" content={image} /> : null}
      <meta name="twitter:site" content="@YOURWEBSITE" />
      {canonical ? <link rel="alternate" href={data.canonical} hreflang={lang} /> : null}
    </Helmet>
  );
};
