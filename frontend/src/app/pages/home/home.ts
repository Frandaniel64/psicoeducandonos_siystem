import { isPlatformBrowser } from '@angular/common';
import { AfterViewInit, Component, OnDestroy, PLATFORM_ID, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  imports: [RouterLink],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home implements AfterViewInit, OnDestroy {
  private readonly platformId = inject(PLATFORM_ID);
  private footerObserver?: IntersectionObserver;

  protected readonly activeFaqIndex = signal<number | null>(null);
  protected readonly isFabHidden = signal(false);

  protected readonly faqs = [
    {
      question: '¿Cómo sé si necesito terapia?',
      answer:
        'Si notas ansiedad persistente, cambios en tu ánimo o dificultades para funcionar en tu día a día, una evaluación terapéutica puede darte claridad y un plan de cuidado.',
    },
    {
      question: '¿Es necesario ser creyente para acudir a consulta?',
      answer:
        'No. Atendemos a toda persona con respeto, integrando recursos psicológicos basados en evidencia y, cuando lo deseas, una mirada espiritual cristiana.',
    },
    {
      question: '¿Cómo funcionan las sesiones online?',
      answer:
        'Las sesiones se realizan por videollamada en un enlace privado, duran alrededor de 50 minutos y se acuerdan en horarios que se adaptan a tu disponibilidad.',
    },
    {
      question: '¿Qué métodos de pago aceptan?',
      answer:
        'Actualmente trabajamos con transferencias y pasarelas digitales. Al reservar tu cita, te mostramos las opciones disponibles para tu país.',
    },
  ] as const;

  ngAfterViewInit(): void {
    if (!isPlatformBrowser(this.platformId)) return;

    const footer = document.getElementById('site-footer');
    if (!footer) return;

    this.footerObserver = new IntersectionObserver(([entry]) => {
      this.isFabHidden.set(entry.isIntersecting);
    });

    this.footerObserver.observe(footer);
  }

  ngOnDestroy(): void {
    this.footerObserver?.disconnect();
  }

  protected toggleFaq(index: number): void {
    this.activeFaqIndex.update((current) => (current === index ? null : index));
  }
}
