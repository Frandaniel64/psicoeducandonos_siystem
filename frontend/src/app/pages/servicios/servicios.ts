import { Component } from '@angular/core';

export interface ServiceItem {
  id: string;
  title: string;
  description: string;
  icon: string;
  bullets: string[];
  imageUrl: string;
  ctaText: string;
}

@Component({
  selector: 'app-servicios',
  imports: [],
  templateUrl: './servicios.html',
  styleUrl: './servicios.css',
})
export class Servicios {
  servicesList: ServiceItem[] = [
    {
      id: 'online',
      title: 'Psicoterapia Online',
      description: 'Sesiones personalizadas con profesionales especializados en diferentes enfoques terapéuticos, adaptados a tus necesidades. No es solo hablar, es entenderte y ayudarte a transformar tu proceso con herramientas prácticas.',
      icon: 'psychology',
      bullets: [
        'Horarios Flexibles',
        'Desde la comodidad de tu hogar',
        'Seguimiento personalizado'
      ],
      imageUrl: 'https://images.unsplash.com/photo-1573497620053-ea5300f94f21?auto=format&fit=crop&q=80&w=800',
      ctaText: 'Agendar Consulta'
    },
    {
      id: 'talleres',
      title: 'Talleres Psicoeducativos',
      description: 'Aprende herramientas prácticas para gestionar tus emociones y desarrollar habilidades para la vida cotidiana. Crece en comunidad con nuestros programas especializados en gestión emocional y valores.',
      icon: 'groups',
      bullets: [
        'Grupos reducidos',
        'Material didáctico incluido',
        'Certificado de participación'
      ],
      imageUrl: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=800',
      ctaText: 'Ver Próximos Talleres'
    },
    {
      id: 'orientacion',
      title: 'Orientación Inicial',
      description: 'Primera sesión gratuita para conocer tus necesidades y ofrecerte el mejor camino para tu bienestar emocional. Evaluamos tu situación para conectarte con el terapeuta más adecuado para ti.',
      icon: 'handshake',
      bullets: [
        '30 minutos sin costo',
        'Evaluación inicial completa',
        'Recomendaciones personalizadas'
      ],
      imageUrl: 'https://images.unsplash.com/photo-1544027993-37dbfe43562a?auto=format&fit=crop&q=80&w=800',
      ctaText: 'Solicitar Orientación'
    }
  ];
}
