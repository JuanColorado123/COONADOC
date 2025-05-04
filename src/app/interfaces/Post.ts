
export interface PostsResponse {
  count: number;
  pages: number;
  posts: Post[];
}

export interface Post {
  id: number;
  name: string;
  content: string;
  postedBy: string;
  img: string | null;
  likeCount: number;
  viewCount: number;
  date: string;
  tags: { name: string }[];
}
