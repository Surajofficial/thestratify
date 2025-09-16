# Blog System Documentation

## Overview
A complete blog management system has been added to your Stratify project with the following features:

### Features
- ✅ Admin panel with login functionality
- ✅ Create, edit, and delete blog posts
- ✅ Blog listing page with responsive design
- ✅ Individual blog detail pages
- ✅ SEO-friendly URLs with slugs
- ✅ Tag system for blog posts
- ✅ Featured image support with upload functionality
- ✅ Image preview and management
- ✅ Simple text editor with HTML support
- ✅ HTML content rendering with proper styling
- ✅ Latest blogs sidebar section
- ✅ Draft/Published status management
- ✅ Beautiful styling with Bootstrap

## Admin Access

### Default Login Credentials
- **Username:** `admin`
- **Password:** `stratify123`

### Admin URLs
- Admin Login: `/admin/login`
- Admin Dashboard: `/admin/dashboard`
- Create New Blog: `/admin/blog/new`
- Edit Blog: `/admin/blog/edit/[id]`
- User Management: `/admin/users`
- Create New User: `/admin/register`

## Public URLs
- Blog Listing: `/blog`
- Blog Detail: `/blog/[slug]`

## How to Use

### 1. Access Admin Panel
1. Go to `/admin/login`
2. Use the credentials above
3. You'll be redirected to the dashboard

### 2. Create a New Blog Post
1. Click "Add New Blog" on the dashboard
2. Fill in the required fields:
   - **Title**: The blog post title
   - **Slug**: URL-friendly version (auto-generated from title)
   - **Excerpt**: Short description
   - **Content**: Full blog content with rich text editor (HTML formatting)
   - **Featured Image**: Upload image directly or use URL
   - **Author**: Author name
   - **Status**: Draft or Published
   - **Tags**: Comma-separated tags

### 3. Manage Existing Posts
- View all posts in the dashboard table
- Edit posts by clicking "Edit"
- Delete posts by clicking "Delete"
- See post status (Draft/Published)

### 4. Manage Users
1. Click "Manage Users" on the dashboard
2. View all users and their roles
3. Click "Add New User" to create new users
4. Set user roles (Admin/Editor)
5. Deactivate users if needed

### 5. Create New Users
1. Go to `/admin/register` or click "Create New User" on login page
2. Fill in user details:
   - **Username**: Unique username
   - **Password**: Minimum 6 characters
   - **Email**: User's email (optional)
   - **Role**: Admin or Editor
3. Click "Create User"

### 6. View Public Blog
- Visit `/blog` to see all published posts
- Click on any post to read the full content
- Posts are displayed in a responsive grid layout

## File Structure

```
pages/
├── api/
│   ├── blogs/
│   │   ├── index.js          # Public blog API
│   │   └── [id].js          # Individual blog API
│   └── admin/
│       ├── login.js         # Admin authentication
│       └── blogs/
│           ├── index.js     # Admin blog management
│           └── [id].js      # Admin individual blog
├── admin/
│   ├── login.js            # Admin login page
│   ├── dashboard.js        # Admin dashboard
│   └── blog/
│       ├── new.js          # Create new blog
│       └── edit/
│           └── [id].js     # Edit existing blog
├── blog/
│   ├── index.js            # Blog listing page
│   └── [slug].js           # Individual blog page
└── components/
    └── nav.js              # Updated with blog link

public/
└── data/
    └── blog/
        └── blogs.json      # Blog data storage

styles/
└── globals.css             # Blog and admin styling
```

## Data Storage
Blogs are stored in `public/data/blog/blogs.json` as JSON files. Uploaded images are stored in `public/uploads/blog/` directory. In a production environment, you should consider using a proper database and cloud storage for images.

## Image Upload Features
- **Supported Formats**: JPG, PNG, GIF, WebP
- **File Size Limit**: 5MB maximum
- **Upload Location**: `/public/uploads/blog/`
- **Image Preview**: Real-time preview after upload
- **Remove Option**: Easy removal of uploaded images

## Simple Text Editor Features
- **Lightweight & Fast**: No external dependencies
- **HTML Support**: Write HTML directly for formatting
- **Monospace Font**: Easy to read and edit
- **Help Guide**: Built-in HTML formatting help
- **No Compatibility Issues**: Works with all Node.js versions
- **Clean Output**: Direct HTML input for blog posts

## Security Notes
- The current authentication is basic for demo purposes
- For production, implement proper JWT tokens and password hashing
- Add rate limiting and CSRF protection
- Validate and sanitize all user inputs

## Customization
- Modify the styling in `styles/globals.css`
- Update the admin credentials in `/api/admin/login.js`
- Change the blog layout in the React components
- Add more fields to blog posts as needed

## Support
The blog system is now fully functional and ready to use. You can start creating blog posts immediately after logging into the admin panel.
