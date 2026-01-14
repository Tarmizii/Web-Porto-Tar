import React from 'react';
import { Helmet } from 'react-helmet-async';

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  image?: string;
  url?: string;
  type?: string;
  author?: string;
}

const SEO: React.FC<SEOProps> = ({
  title = "Tarmizi — UI/UX Designer | Graphic Designer | Game Developer",
  description = "Portofolio profesional Tarmizi (Tar). Spesialis UI/UX Design, Graphic Design, dan Game Development berbasis di Lhokseumawe. Lihat karya terbaru dan hubungi untuk kolaborasi.",
  keywords = "UI/UX designer indonesia, UI UX Lhokseumawe, game developer unity 2d, graphic designer aceh, Tarmizi portfolio, desain grafis lhokseumawe, mobile game design",
  image = "https://picsum.photos/1200/630", // Placeholder until user provides real one
  url = "https://tarmizi.design/",
  type = "website",
  author = "Tarmizi"
}) => {
  const siteTitle = title === "Tarmizi — UI/UX Designer | Graphic Designer | Game Developer" 
    ? title 
    : `${title} | Tarmizi Portfolio`;

  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <title>{siteTitle}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta name="author" content={author} />
      <link rel="canonical" href={url} />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:url" content={url} />
      <meta property="og:title" content={siteTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={url} />
      <meta name="twitter:title" content={siteTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
    </Helmet>
  );
};

export default SEO;
