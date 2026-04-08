import { Component, computed, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { map } from 'rxjs/operators';
import { BLOG_POSTS } from '../blog-posts';

@Component({
  selector: 'app-blog-article',
  imports: [RouterLink],
  templateUrl: './blog-article.html',
  styleUrl: './blog-article.css',
})
export class BlogArticle {
  private readonly route = inject(ActivatedRoute);
  private readonly sanitizer = inject(DomSanitizer);

  private readonly id = toSignal(this.route.paramMap.pipe(map((p) => p.get('id'))), {
    initialValue: this.route.snapshot.paramMap.get('id'),
  });

  protected readonly post = computed(() => {
    const raw = this.id();
    return raw ? (BLOG_POSTS.find((b) => b.id === raw) ?? null) : null;
  });

  protected readonly bodyHtml = computed((): SafeHtml | null => {
    const p = this.post();
    return p ? this.sanitizer.bypassSecurityTrustHtml(p.contentHtml) : null;
  });
}
