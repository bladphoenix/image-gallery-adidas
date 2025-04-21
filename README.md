# Next.js & Cloudinary example app

This example shows how to create an image gallery site using Next.js, [Cloudinary](https://cloudinary.com), and [Tailwind](https://tailwindcss.com).

## How to use

## 1 create .env
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=<your_cloud_name>
CLOUDINARY_API_KEY=<your_api_key>
CLOUDINARY_API_SECRET=<your_api_secret>
CLOUDINARY_FOLDER=<your_folder>
CLOUDINARY_URL=cloudinary://<your_api_key>:<your_api_secret>@<cloudname>
NEXT_PUBLIC_CLOUDINARY_API_KEY=<your_next_cloudinary_api_key>
NEXT_PUBLIC_CLOUDINARY_PRIVATE_CDN=<true | false>

## 2 modify next.config.js
pathname: "/my-account/**",  //subpath cloudinary-mu
 