export interface Comment {
  id: number;
  comment: string;
  postedBy: string;
  createdAt: Date;
  post: Post;
}
export interface CommentLike {
  id: number;
  comment: string;
  postedBy: string;
  createdAt: Date;
  post: { id: number };
}

export interface Post {
  id: number;
  name: string;
  content: string;
  postedBy: string;
  img: string;
  date: Date;
  likeCount: number;
  viewCount: number;
  tags: Tag[];
}

export interface Tag {
  id: number;
  name: string;
}
