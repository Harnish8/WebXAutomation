import { blogs, getBlogBySlug, getRelatedBlogs } from '@/lib/blogs'
import BlogPageTemplate from '@/components/BlogPageTemplate'
import { notFound } from 'next/navigation'

// Tells Next.js all valid slugs at build time — required for static export
export async function generateStaticParams() {
    return blogs.map(blog => ({ slug: blog.slug }))
}

export async function generateMetadata({ params }) {
    const post = getBlogBySlug(params.slug)
    if (!post) return {}
    return {
        title: `${post.cardTitle} | Valtrix Media Blog`,
        description: post.excerpt,
    }
}

export default function BlogPost({ params }) {
    const post = getBlogBySlug(params.slug)
    if (!post) notFound()

    // Resolve related slugs into full objects
    const postWithRelated = {
        ...post,
        related: getRelatedBlogs(post.related || []),
    }

    return <BlogPageTemplate post={postWithRelated} />
}