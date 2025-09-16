import fs from 'fs';
import path from 'path';

function generateSiteMap(blogs) {
    const baseUrl = 'https://thestratify.com';
    
    return `<?xml version="1.0" encoding="UTF-8"?>
   <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
     <url>
       <loc>${baseUrl}</loc>
       <lastmod>${new Date().toISOString()}</lastmod>
       <changefreq>weekly</changefreq>
       <priority>1.0</priority>
     </url>
     <url>
       <loc>${baseUrl}/about</loc>
       <lastmod>${new Date().toISOString()}</lastmod>
       <changefreq>monthly</changefreq>
       <priority>0.8</priority>
     </url>
     <url>
       <loc>${baseUrl}/services</loc>
       <lastmod>${new Date().toISOString()}</lastmod>
       <changefreq>monthly</changefreq>
       <priority>0.8</priority>
     </url>
     <url>
       <loc>${baseUrl}/contact</loc>
       <lastmod>${new Date().toISOString()}</lastmod>
       <changefreq>monthly</changefreq>
       <priority>0.8</priority>
     </url>
     <url>
       <loc>${baseUrl}/blog</loc>
       <lastmod>${new Date().toISOString()}</lastmod>
       <changefreq>weekly</changefreq>
       <priority>0.9</priority>
     </url>
     <url>
       <loc>${baseUrl}/blog/rss.xml</loc>
       <lastmod>${new Date().toISOString()}</lastmod>
       <changefreq>daily</changefreq>
       <priority>0.8</priority>
     </url>
     ${blogs
       .map((blog) => {
         return `
       <url>
           <loc>${baseUrl}/blog/${blog.slug}</loc>
           <lastmod>${new Date(blog.updatedAt || blog.publishedAt).toISOString()}</lastmod>
           <changefreq>monthly</changefreq>
           <priority>0.7</priority>
           ${blog.featuredImage ? `<image:image>
               <image:loc>${baseUrl}${blog.featuredImage}</image:loc>
               <image:title><![CDATA[${blog.title}]]></image:title>
               <image:caption><![CDATA[${blog.metaDescription || blog.excerpt || ''}]]></image:caption>
           </image:image>` : ''}
       </url>
     `;
       })
       .join('')}
   </urlset>
 `;
}

function SiteMap() {
  // getServerSideProps will do the heavy lifting
}

export async function getServerSideProps({ res }) {
  // Get all blogs
  const blogsDataPath = path.join(process.cwd(), 'public', 'data', 'blog', 'blogs.json');
  let blogs = [];
  
  if (fs.existsSync(blogsDataPath)) {
    const data = fs.readFileSync(blogsDataPath, 'utf8');
    const blogsData = JSON.parse(data);
    blogs = blogsData.blogs.filter(blog => blog.status === 'published');
  }

  // Generate the XML sitemap with the blog data
  const sitemap = generateSiteMap(blogs);

  res.setHeader('Content-Type', 'text/xml');
  // Write the XML to the response
  res.write(sitemap);
  res.end();

  return {
    props: {},
  };
}

export default SiteMap;
