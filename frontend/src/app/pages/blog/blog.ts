import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { BLOG_POSTS, type BlogPostModel } from './blog-posts';

@Component({
  selector: 'app-blog',
  imports: [RouterLink],
  templateUrl: './blog.html',
  styleUrl: './blog.css',
})
export class Blog {
  readonly featuredPosts: BlogPostModel[] = BLOG_POSTS;
}
