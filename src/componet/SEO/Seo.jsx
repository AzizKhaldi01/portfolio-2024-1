import Head from 'next/head';

const SEO = ({
  title = "Aziz Khaldi | Frontend Developer Portfolio",
  description = "Explore Aziz Khaldi's portfolio showcasing innovative frontend development projects, UI/UX designs, and creative web solutions.",
  image = "/default-image.jpg", // Replace with a valid image path
  url = "https://azizkhaldiportfolio.vercel.app/",
}) => {
  return (
    <Head>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:url" content={url} />
      <meta name="twitter:card" content="summary_large_image" />
    </Head>
  );
};

export default SEO;
