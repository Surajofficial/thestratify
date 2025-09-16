import fs from 'fs';
import path from 'path';

function generateRSSFeed(blogs) {
    const baseUrl = 'https://thestratify.com';
    
    return `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Stratify Technology Blog</title>
    <description>Read the latest insights on web development, technology trends, and business strategies from Stratify Technology.</description>
    <link>${baseUrl}/blog</link>
    <language>en-us</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="${baseUrl}/blog/rss.xml" rel="self" type="application/rss+xml"/>
    <image>
      <url>${baseUrl}/assets/img/favicon.png</url>
      <title>Stratify Technology Blog</title>
      <link>${baseUrl}/blog</link>
    </image>
    ${blogs
      .map((blog) => {
        return `
    <item>
      <title><![CDATA[${blog.title}]]></title>
      <description><![CDATA[${blog.metaDescription || blog.excerpt || 'Read this article on Stratify Technology blog.'}]]></description>
      <link>${baseUrl}/blog/${blog.slug}</link>
      <guid isPermaLink="true">${baseUrl}/blog/${blog.slug}</guid>
      <pubDate>${new Date(blog.publishedAt || blog.createdAt).toUTCString()}</pubDate>
      <author>${blog.author}</author>
      ${blog.tags && blog.tags.map(tag => `<category><![CDATA[${tag}]]></category>`).join('')}
    </item>
  `;
      })
      .join('')}
  </channel>
</rss>`;
}

function RSSFeed() {
  // getServerSideProps will do the heavy lifting
}

export async function getServerSideProps({ res }) {
  // Get all published blogs
  const blogsDataPath = path.join(process.cwd(), 'public', 'data', 'blog', 'blogs.json');
  let blogs = [];
  
  if (fs.existsSync(blogsDataPath)) {
    const data = fs.readFileSync(blogsDataPath, 'utf8');
    const blogsData = JSON.parse(data);
    blogs = blogsData.blogs.filter(blog => blog.status === 'published');
  }

  // Generate the XML RSS feed with the blog data
  const rssFeed = generateRSSFeed(blogs);

  res.setHeader('Content-Type', 'text/xml');
  // Write the XML to the response
  res.write(rssFeed);
  res.end();

  return {
    props: {},
  };
}

export default RSSFeed;
