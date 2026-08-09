import { getCollection, type CollectionEntry } from 'astro:content';

export type Post = CollectionEntry<'posts'>;

function isPublished(post: Post) {
  return import.meta.env.DEV || !post.data.draft;
}

export async function getAllPosts(): Promise<Post[]> {
  const posts = await getCollection('posts', isPublished);
  return posts.sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf());
}

export function sectionOf(post: Post): string {
  return post.id.split('/')[0];
}

export function humanizeSection(section: string): string {
  return section
    .split('-')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

export async function getNavTree(): Promise<Map<string, Post[]>> {
  const posts = await getAllPosts();
  const groups = new Map<string, Post[]>();
  for (const post of posts) {
    const section = sectionOf(post);
    groups.set(section, [...(groups.get(section) ?? []), post]);
  }
  return groups;
}
