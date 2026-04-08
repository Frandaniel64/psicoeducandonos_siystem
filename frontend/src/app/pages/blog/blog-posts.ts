export interface BlogPostModel {
  id: string;
  title: string;
  category: string;
  imageUrl: string;
  publishDate: string;
  readTime: number;
  contentHtml: string;
}

/** Contenido demo local hasta existir API CMS. */
export const BLOG_POSTS: BlogPostModel[] = [
  {
    id: '1',
    title: '5 Pasos para calmar la ansiedad en momentos de crisis',
    category: 'Salud Mental',
    imageUrl:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuAK8Hq_laqbpLCTybOnQj2x3dEXWDgrd_wDYCz4Ibtdww49grkRbgDCXKETDRsGiKI03x5ftDrNm83zvkLj_Ya0Ea0O1vaiXBdQ-rb3a4qLm4-TnCANhtsuPaz8QvYFkTiNbCNZe3v6H5X8ADnCxlknm7jSSD-_f-iNG66QOUko9wf9WLxGHEO2tRx8V5eXNmwnybm8u3e6X5wvAB711c6hdDf7eg9-yBi3A0eju1NaQZ083S4qqbO1okQNowU4hQNtS2hsqYG0aJW3',
    publishDate: 'Hace 2 días',
    readTime: 6,
    contentHtml: `
      <p class="lead text-lg text-on-surface-variant mb-6">La ansiedad puede sentirse abrumadora, pero hay pasos concretos que puedes practicar hoy mismo, junto con el acompañamiento profesional adecuado.</p>
      <h2>1. Nómbrala sin juzgarte</h2>
      <p>Reconocer “estoy ansioso” reduce la lucha interna y abre espacio para regular la respuesta del cuerpo.</p>
      <h2>2. Respiración lenta y prolongada</h2>
      <p>Inhala cuatro tiempos, exhala seis. Repite varios ciclos; esto favorece el sistema parasimpático.</p>
      <h2>3. Ancoraje sensorial 5-4-3-2-1</h2>
      <p>Observa cinco cosas que ves, cuatro que oyes, tres que puedes tocar, dos que hueles y uno que saboreas.</p>
      <blockquote class="border-l-4 border-primary pl-4 my-6 italic font-headline text-primary">“La paz no es la ausencia de tormenta, sino el ancla en medio de ella.”</blockquote>
      <h2>4. Movimiento suave</h2>
      <p>Un paseo corto o estiramientos ligeros ayudan a descargar tensión acumulada.</p>
      <h2>5. Busca apoyo</h2>
      <p>Si los síntomas persisten o interfieren con tu vida, hablar con un psicólogo es un acto de valentía y cuidado.</p>
    `,
  },
  {
    id: '2',
    title: 'La oración como herramienta de regulación emocional',
    category: 'Vida Cristiana',
    imageUrl:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuD8qJmNMNibylxnWcUbxLYo3cJt15GVUOO6zITXBUd5xbWSidnlNz5px4Er20B0vXFtzGJTzh4eNOFKSfgB97GEdqOLgbfYVTTuA19hzsqBEmVnOn0CjQRZok6gaib2PlJ6Mipte0Hz4S7rHGadQ6dCvihvrYlqvMP12htpMzomIJSfWU_OMzlIGeTOTd6XvsKOye-LW3fTbyzcoHBeEptKMX6oTsJcCD_lJGmUN0f-bQIxphzyHMGLs-85UrN32HDvX1YzLCqv5afP',
    publishDate: 'Hace 1 semana',
    readTime: 8,
    contentHtml: `
      <p>La oración puede integrarse con herramientas psicológicas como la atención plena y la autorregulación, sin sustituir el tratamiento clínico cuando es necesario.</p>
      <ul class="list-disc pl-6 space-y-2 my-4">
        <li>Enfoque en la gratitud breve al iniciar el día.</li>
        <li>Oración silenciosa como pausa entre estímulos y respuesta.</li>
        <li>Acompañamiento en comunidad cuando sea posible.</li>
      </ul>
      <p>Si experimentas angustia intensa o ideas de autolesión, busca ayuda profesional y de emergencia de inmediato.</p>
    `,
  },
  {
    id: '3',
    title: 'Reencontrando la alegría después de una pérdida significativa',
    category: 'Bienestar',
    imageUrl:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuAfJq66qQOHFMQIe7M0OMW4mnDeYdKn8H77-1hN6XNMhdxT9CArsemWPfep8fX7meh8wPzHmM9w5N8yjGirOxML_MyYGYA5hIDZVJxzdiGnEkHzhs969KeqBwrmlzQjgT0uZ56dJkNvW0uwirkgQ0WD3u5tPhGf2xAyKFPQ64tdut36nPvuofyfIeCRu_dqwJOOAboFmF8DFTwRRjsgty_102rt_8Y54mHtda7HSziMyUFdapzW17ZePYW0fOHFmxKpDQ6nry273ZnN',
    publishDate: 'Hace 2 semanas',
    readTime: 10,
    contentHtml: `
      <p>El duelo no sigue un guion lineal. Permitirse sentir sin apuro es parte del proceso de sanación.</p>
      <h2>Ritmos pequeños</h2>
      <p>Recuperar rutinas mínimas —higiene, alimentación, descanso— sostiene el cuerpo mientras el corazón procesa la pérdida.</p>
      <h2>Conexión segura</h2>
      <p>Compartir con personas de confianza o con un terapeuta reduce el aislamiento.</p>
    `,
  },
  {
    id: '4',
    title: 'El perdón y su impacto psicológico en nuestras relaciones',
    category: 'Relaciones',
    imageUrl: 'https://images.unsplash.com/photo-1517865288-918c5e0daeb3?auto=format&fit=crop&w=800&q=80',
    publishDate: 'Hace 3 semanas',
    readTime: 5,
    contentHtml: `
      <p>Perdonar no siempre significa reconciliarse; a veces es una decisión interna para dejar de revivir el daño en bucle.</p>
      <p>La terapia puede ayudarte a distinguir límites sanos, responsabilidad propia y cierre emocional.</p>
    `,
  },
  {
    id: '5',
    title: 'Construyendo hábitos sostenibles desde la paz, no desde la culpa',
    category: 'Productividad',
    imageUrl: 'https://images.unsplash.com/photo-1490730141103-6cac27aaab94?auto=format&fit=crop&w=800&q=80',
    publishDate: 'Hace 1 mes',
    readTime: 7,
    contentHtml: `
      <p>Los hábitos impulsados por la culpa suelen agotarse; los anclados en valores y autocuidado perduran.</p>
      <ol class="list-decimal pl-6 space-y-2 my-4">
        <li>Define un hábito mínimo viable (dos minutos).</li>
        <li>Enlázalo a una rutina que ya existe.</li>
        <li>Celebra el esfuerzo, no solo el resultado.</li>
      </ol>
    `,
  },
  {
    id: '6',
    title: 'Manejando el burnout pastoral: Una guía para líderes',
    category: 'Liderazgo',
    imageUrl: 'https://images.unsplash.com/photo-1444653614773-995cb1ef9efa?auto=format&fit=crop&w=800&q=80',
    publishDate: 'Hace 1 mes',
    readTime: 12,
    contentHtml: `
      <p>El liderazgo espiritual conlleva cargas emocionales únicas. Reconocer límites es fidelidad, no debilidad.</p>
      <p>Supervisión, descanso sabático y redes de apoyo entre pares son piezas clave del cuidado pastoral.</p>
    `,
  },
];
