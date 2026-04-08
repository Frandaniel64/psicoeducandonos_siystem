import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SubscribeNewsletterDto } from './dto/subscribe-newsletter.dto';
import { NewsletterSubscriber } from './entities/newsletter-subscriber.entity';

type NewsletterSubscribeResponse = {
  status: 'subscribed' | 'already_subscribed';
  message: string;
};

@Injectable()
export class PublicService {
  constructor(
    @InjectRepository(NewsletterSubscriber)
    private readonly newsletterRepository: Repository<NewsletterSubscriber>,
  ) {}

  async subscribeToNewsletter(
    subscribeDto: SubscribeNewsletterDto,
  ): Promise<NewsletterSubscribeResponse> {
    const normalizedEmail = subscribeDto.email.trim().toLowerCase();

    const existing = await this.newsletterRepository.findOne({
      where: { email: normalizedEmail },
    });

    if (existing) {
      return {
        status: 'already_subscribed',
        message: 'El correo ya está suscrito al newsletter.',
      };
    }

    await this.newsletterRepository.save(
      this.newsletterRepository.create({
        email: normalizedEmail,
      }),
    );

    return {
      status: 'subscribed',
      message: 'Suscripción al newsletter creada correctamente.',
    };
  }

  getFeaturedBlogPosts() {
    return {
      items: [
        {
          id: '1',
          slug: '5-pasos-calmar-ansiedad-crisis',
          title: '5 Pasos para calmar la ansiedad en momentos de crisis',
          category: 'Salud Mental',
          publishDate: 'Hace 2 días',
          readTime: 6,
        },
        {
          id: '2',
          slug: 'oracion-como-herramienta-regulacion-emocional',
          title: 'La oración como herramienta de regulación emocional',
          category: 'Vida Cristiana',
          publishDate: 'Hace 1 semana',
          readTime: 8,
        },
        {
          id: '3',
          slug: 'reencontrando-alegria-despues-de-una-perdida',
          title: 'Reencontrando la alegría después de una pérdida significativa',
          category: 'Bienestar',
          publishDate: 'Hace 2 semanas',
          readTime: 10,
        },
      ],
    };
  }

  getFooterLinks() {
    return {
      source: 'api',
      links: {
        legal: [
          { key: 'privacy', label: 'Privacidad', href: '/legal/privacidad' },
          { key: 'terms', label: 'Términos', href: '/legal/terminos' },
        ],
        contact: [
          { key: 'contact', label: 'Contacto', href: '/contacto' },
          { key: 'instagram', label: 'Instagram', href: '#' },
          { key: 'linkedin', label: 'LinkedIn', href: '#' },
          { key: 'facebook', label: 'Facebook', href: '#' },
        ],
      },
    };
  }
}
