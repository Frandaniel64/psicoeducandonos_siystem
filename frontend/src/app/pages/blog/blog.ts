import { Component } from '@angular/core';

export interface BlogPost {
  id: string;
  title: string;
  category: string;
  imageUrl: string;
  publishDate: string;
  readTime: number;
}

@Component({
  selector: 'app-blog',
  imports: [],
  templateUrl: './blog.html',
  styleUrl: './blog.css',
})
export class Blog {
  featuredPosts: BlogPost[] = [
    {
      id: '1',
      title: '5 Pasos para calmar la ansiedad en momentos de crisis',
      category: 'Salud Mental',
      imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAK8Hq_laqbpLCTybOnQj2x3dEXWDgrd_wDYCz4Ibtdww49grkRbgDCXKETDRsGiKI03x5ftDrNm83zvkLj_Ya0Ea0O1vaiXBdQ-rb3a4qLm4-TnCANhtsuPaz8QvYFkTiNbCNZe3v6H5X8ADnCxlknm7jSSD-_f-iNG66QOUko9wf9WLxGHEO2tRx8V5eXNmwnybm8u3e6X5wvAB711c6hdDf7eg9-yBi3A0eju1NaQZ083S4qqbO1okQNowU4hQNtS2hsqYG0aJW3',
      publishDate: 'Hace 2 días',
      readTime: 6
    },
    {
      id: '2',
      title: 'La oración como herramienta de regulación emocional',
      category: 'Vida Cristiana',
      imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD8qJmNMNibylxnWcUbxLYo3cJt15GVUOO6zITXBUd5xbWSidnlNz5px4Er20B0vXFtzGJTzh4eNOFKSfgB97GEdqOLgbfYVTTuA19hzsqBEmVnOn0CjQRZok6gaib2PlJ6Mipte0Hz4S7rHGadQ6dCvihvrYlqvMP12htpMzomIJSfWU_OMzlIGeTOTd6XvsKOye-LW3fTbyzcoHBeEptKMX6oTsJcCD_lJGmUN0f-bQIxphzyHMGLs-85UrN32HDvX1YzLCqv5afP',
      publishDate: 'Hace 1 semana',
      readTime: 8
    },
    {
      id: '3',
      title: 'Reencontrando la alegría después de una pérdida significativa',
      category: 'Bienestar',
      imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAfJq66qQOHFMQIe7M0OMW4mnDeYdKn8H77-1hN6XNMhdxT9CArsemWPfep8fX7meh8wPzHmM9w5N8yjGirOxML_MyYGYA5hIDZVJxzdiGnEkHzhs969KeqBwrmlzQjgT0uZ56dJkNvW0uwirkgQ0WD3u5tPhGf2xAyKFPQ64tdut36nPvuofyfIeCRu_dqwJOOAboFmF8DFTwRRjsgty_102rt_8Y54mHtda7HSziMyUFdapzW17ZePYW0fOHFmxKpDQ6nry273ZnN',
      publishDate: 'Hace 2 semanas',
      readTime: 10
    },
    {
      id: '4',
      title: 'El perdón y su impacto psicológico en nuestras relaciones',
      category: 'Relaciones',
      imageUrl: 'https://images.unsplash.com/photo-1517865288-918c5e0daeb3?auto=format&fit=crop&w=800&q=80',
      publishDate: 'Hace 3 semanas',
      readTime: 5
    },
    {
      id: '5',
      title: 'Construyendo hábitos sostenibles desde la paz, no desde la culpa',
      category: 'Productividad',
      imageUrl: 'https://images.unsplash.com/photo-1490730141103-6cac27aaab94?auto=format&fit=crop&w=800&q=80',
      publishDate: 'Hace 1 mes',
      readTime: 7
    },
    {
      id: '6',
      title: 'Manejando el burnout pastoral: Una guía para líderes',
      category: 'Liderazgo',
      imageUrl: 'https://images.unsplash.com/photo-1444653614773-995cb1ef9efa?auto=format&fit=crop&w=800&q=80',
      publishDate: 'Hace 1 mes',
      readTime: 12
    }
  ];
}
