import { AfterViewInit, Component, ElementRef, ViewChild, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-cms-editor',
  imports: [ReactiveFormsModule],
  templateUrl: './cms-editor.html',
  styleUrl: './cms-editor.css',
})
export class CmsEditor implements AfterViewInit {
  /** Referencia: Stitch "CMS de Artículos" — proyecto 16913179476535550712 */
  @ViewChild('editorHost') editorHost?: ElementRef<HTMLDivElement>;

  private readonly fb = inject(FormBuilder);
  readonly form = this.fb.nonNullable.group({
    title: ['', Validators.required],
  });

  private quill?: import('quill').default;

  ngAfterViewInit(): void {
    const el = this.editorHost?.nativeElement;
    if (!el) return;
    void import('quill').then(({ default: Quill }) => {
      this.quill = new Quill(el, {
        theme: 'snow',
        placeholder: 'Escribe tu artículo psicoeducativo…',
        modules: {
          toolbar: [
            [{ header: [1, 2, false] }],
            ['bold', 'italic', 'underline'],
            [{ list: 'ordered' }, { list: 'bullet' }],
            ['blockquote', 'link'],
            ['clean'],
          ],
        },
      });
    });
  }

  saveDraft(): void {
    if (this.form.invalid) return;
    void this.form.value.title;
    void this.quill?.getSemanticHTML();
    // Publicación vía API cuando exista endpoint CMS.
  }
}
