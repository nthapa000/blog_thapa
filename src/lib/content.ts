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

export interface HomeSection {
  slug: string;
  label: string;
  description: string;
  templateDir: string;
  posts: Post[];
}

// Fixed display order/copy for the homepage, independent of which
// category folders currently have posts in them.
const HOME_SECTIONS: Omit<HomeSection, 'posts'>[] = [
  {
    slug: 'papers',
    label: 'Papers',
    description: 'Reviews and walkthroughs of research papers.',
    templateDir: 'example-post',
  },
  {
    slug: 'machine-learning',
    label: 'Machine Learning',
    description: 'Notes on ML concepts, models, and techniques.',
    templateDir: 'machine-learning-post',
  },
  {
    slug: 'system-design',
    label: 'System Design',
    description: 'Breakdowns of how real systems are designed and scaled.',
    templateDir: 'system-design-post',
  },
];

export async function getHomeSections(): Promise<HomeSection[]> {
  const posts = await getAllPosts();
  return HOME_SECTIONS.map((section) => ({
    ...section,
    posts: posts.filter((post) => sectionOf(post) === section.slug),
  }));
}
