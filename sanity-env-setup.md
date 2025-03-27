# Sanity CMS Environment Setup

To complete the Sanity CMS integration, you'll need to create a Sanity project and set up environment variables.

## Creating a Sanity Project

1. Visit [sanity.io/manage](https://www.sanity.io/manage) and create a new project
2. Choose the "Blog" starter template (or empty project if you prefer)
3. Name your project (e.g., "Scott Cullum Portfolio")
4. Note your Project ID from the project dashboard

## Setting Up Environment Variables

Create a `.env.local` file in the root of your project with the following variables:

```env
NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id_here
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SANITY_API_VERSION=2023-05-03
```

Replace `your_project_id_here` with the Project ID from your Sanity dashboard.

## Initializing Sanity Studio

After setting up your environment variables, run:

```bash
npm run dev
```

Visit `http://localhost:3000/studio` to access your Sanity Studio and start creating content.

## Deploying Sanity Studio

When you're ready to deploy your Sanity Studio:

```bash
npm run sanity:deploy
```

This will deploy your Sanity Studio to a URL like `https://your-project.sanity.studio`.
