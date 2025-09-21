import { Injectable, signal } from '@angular/core';

/**
 * Simple i18n service using Angular Signals.
 * - Keeps the selected language in a signal (and localStorage).
 * - Exposes `t(key)` to read a translation.
 * - Exposes `setLang(lang)` / `toggle()` to switch languages.
 * - Components can inject this service and call `t('some.key')` in TS, or
 *   bind in templates like: {{ i18n.t('nav.about') }}
 */

export type Lang = 'es' | 'en';

type Dict = Record<string, string>;
type Translations = Record<Lang, Dict>;

// --- Minimal dictionary (add keys as you wire more sections) ---
const TRANSLATIONS: Translations = {
  es: {
    // Navbar
    'nav.home': 'Inicio',
    'nav.about': 'Quiénes Somos',
    'nav.gallery': 'Galería',
    'nav.services': 'Servicios',

    // Hero
    'hero.title': 'DJ Máximo',
    'hero.subtitle': 'Elevando tu evento al siguiente nivel',
    'hero.ctaPrimary': 'Cotizar ahora',
    'hero.ctaSecondary': 'Ver galería',

    // About / Quienes Somos (ejemplos)
    'about.title': 'Quiénes Somos',
    'about.body':
      'Somos DJ Máximo: música, producción y energía que transforman cualquier evento. ' +
      'Trabajamos contigo para crear experiencias memorables.',

    // Discover section
    'discover.title': 'Descubre nuestra variedad',
    'discover.text': 'Descubre y conoce el nuevo concepto que tenemos para ti, ofrecemos servicios únicos en el mercado como son: Producción de eventos, DJ, audio e iluminación, animación, experiencias VIP y servicios post-evento.',
    'discover.our': 'Nuestros',
    'discover.services': 'Servicios',
    'discover.desc': 'Ofrecemos servicios integrales de producción audiovisual y animación para eventos, incluyendo sistemas de sonido de alta calidad, iluminación profesional y DJs expertos. Desde pequeñas reuniones hasta grandes eventos, nos encargamos de crear ambientes inolvidables que cautivan a tus invitados.',
    'discover.coverage1': 'Concepto "antro en casa": CDMX y área metropolitana.',
    'discover.coverage2': 'DJ, audio e iluminación: CDMX, EdoMex, Morelos, Pachuca, Puebla y más.',
    'discover.cta': 'Conoce más de nuestros paquetes',

    // About (Quiénes Somos) – full content
    'about.history.title': 'Nuestra Historia',
    'about.history.p1': 'Mega Force tiene su inicio en el año 1983 de la mano de José Luis Gómez✝️, a su corta edad de 18 años. Con un equipo sencillo de audio y un par de luces, tomaba el concepto de discoteque móvil, tocando con viniles los géneros Disco y High Energy que en ese momento sonaban.',
    'about.history.p2': 'Con el paso de los años, tocando música versátil, incursionaba en el ambiente de los eventos sociales familiares, sin dejar a un lado la esencia del concepto con el que inició.',
    'about.history.p3': 'En el año 2000, entra al equipo Luis Daniel Gómez, hijo de José Luis, a la edad de 15 años. Inició como staff, cargando e instalando el equipo. Con el paso del tiempo, empezó a tomar control de la cabina, tocando un poco durante los eventos, dándole a la fiesta el fresh de los temas más actuales para la juventud.',
    'about.history.p4': 'Después de un tiempo, José Luis decide bajar la intensidad de trabajo y agarraba pocos eventos, hasta llegar un momento en el que su equipo ya estaba parado. Es así como su hijo, Luis Daniel, en el año 2010 decide retomar los eventos e integrarse nuevamente en el mundo de la fiesta. Pero lo hace por su lado, en un inicio con el nombre de "Paradise" y más adelante, como por el año 2015, bajo el nombre de "Dj Máximo".',
    'about.history.p5': 'El proyecto de Dj Máximo comienza a agarrar fuerza, con su estilo propio y esencia para trabajar los eventos, llevando como concepto el "antro en casa".',
    'about.history.p6': 'En el año 2021 fallece José Luis Gómez y a partir de ese suceso, su hijo Dj Máximo, decide retomar el nombre de "Mega Force" con el cual se sigue trabajando hasta la fecha.',
    'about.history.p7': 'Sin perder la esencia y estilo que ya estaba manejando. Junto con el proyecto de Dj, audio e iluminación, decide integrar diversos servicios extras para los eventos, tales como show batucada, pista de baile iluminada, periqueras, salas lounge, cámara 360, letras gigantes, servicio de barra, entre otros.',
    'about.history.p8': 'Es así como Mega Force se vuelve una organización para eventos sociales con el mejor concepto de "antro en casa".',

    'about.mission.title': 'Misión',
    'about.mission.body': 'Brindar el mejor servicio de entretenimiento para eventos sociales con el concepto "antro en casa". Creando un espacio de diversión total, donde los anfitriones e invitados disfruten de un momento muy especial.',

    'about.vision.title': 'Visión',
    'about.vision.body': 'Ser la empresa número uno, a nivel Ciudad y Nacional, prestadora de servicios de entretenimiento para eventos sociales con el concepto antro en casa. Con un personal altamente calificado y comprometido con su trabajo.',

    'about.values.title': 'Valores',
    'about.values.body': 'Responsabilidad, compromiso, puntualidad, calidad, pasión, honestidad.',

    // Services (ejemplos, ajusta con el contenido ya migrado)
    'services.title': 'Servicios',
    'services.dj': 'DJ Profesional',
    'services.sound': 'Audio profesional',
    'services.lighting': 'Iluminación',
    'services.screens': 'Pantallas y visuales',
    'services.host': 'Maestro de ceremonias',
    'services.packages': 'Paquetes a la medida',

    // Services section
    'services.card1.title': 'DJ, Audio e Iluminación',
    'services.card1.text': 'Nuestro servicio base de DJ, audio e iluminación te ofrece opciones de acuerdo a lo que tu evento requiere, proporcionando servicio para eventos desde 20 hasta 300 personas. Si las opciones no te convencen, te damos información sobre todo el equipo con el que contamos, y tú mismo seleccionas y armas a tu gusto el servicio que quieres. Ponte en contacto para brindarte atención personalizada y así podamos ofrecer el servicio adecuado y correcto, tanto en audio como en iluminación para tu evento.',

    'services.card2.title': 'Extras para antro en casa',
    'services.card2.text': 'Para brindarte una mejor experiencia de nuestro concepto “antro en casa”, contamos con los complementos perfectos:',
    'services.card2.item1': 'Salas lounge y periqueras.',
    'services.card2.item2': 'Pista de baile (led pixel).',
    'services.card2.item3': 'Show batucada.',
    'services.card2.item4': 'Barra de bebidas iluminada, con bartenders.',

    'services.card3.title': 'DJ (solo)',
    'services.card3.text': 'Si ya cuentas con todo para tu evento y lo único que necesitas es un DJ, nosotros te brindamos el servicio llevando al DJ correcto para el tipo de evento que vas a tener.',

    'services.card4.title': 'Cobertura',
    'services.card4.coverage1': 'Concepto "antro en casa": CDMX y área metropolitana.',
    'services.card4.coverage2': 'DJ, audio e iluminación: CDMX, EdoMex, Morelos, Pachuca, Puebla y más.',
    'services.card4.text': 'Contáctanos y te ayudamos a elegir el paquete ideal.',

    // Testimonials section
    'testimonials.title': 'Testimonios',
    'testimonials.more': 'Ver más comentarios',
    'testimonials.1.text': 'La mejor elección para nuestro evento, team Mega force 10/10 con el servicio de barra y bartenders, mobiliario, iluminación y por supuesto el Dj 🌟. Gracias 🤩',
    'testimonials.1.author': 'Reseña en Facebook',
    'testimonials.2.text': 'Excelente servicio el brindado por Mega Force. Llevo dos eventos contratándolos y siempre han sido puntuales, serviciales y siempre con toda la actitud para ambientar los eventos. 🤠🥳',
    'testimonials.2.author': 'Reseña en Facebook',
    'testimonials.3.text': 'Súper recomendable, muy puntuales, pusieron el ambiente y se adaptan a la música que quieras escuchar en tu evento 100 de 10 🎉🎉🎉🎉',
    'testimonials.3.author': 'Reseña en Facebook',
  },
  en: {
    // Navbar
    'nav.home': 'Home',
    'nav.about': 'About',
    'nav.gallery': 'Gallery',
    'nav.services': 'Services',

    // Hero
    'hero.title': 'DJ Máximo',
    'hero.subtitle': 'Taking your event to the next level',
    'hero.ctaPrimary': 'Get a quote',
    'hero.ctaSecondary': 'View gallery',

    // About
    'about.title': 'About Us',
    'about.body':
      'We are DJ Máximo: music, production and energy that transform any event. ' +
      'We work with you to craft memorable experiences.',

    // Discover section
    'discover.title': 'Discover our variety',
    'discover.text': 'Discover and learn about the new concept we have for you: event production, DJ, sound and lighting, animation, VIP experiences and post-event services.',
    'discover.our': 'Our',
    'discover.services': 'Services',
    'discover.desc': 'We offer comprehensive audiovisual production and animation services for events, including high-quality sound systems, professional lighting, and expert DJs. From small gatherings to large events, we create unforgettable environments that captivate your guests.',
    'discover.coverage1': '"Club at home" concept: CDMX and metro area.',
    'discover.coverage2': 'DJ, sound and lighting: CDMX, EdoMex, Morelos, Pachuca, Puebla and more.',
    'discover.cta': 'See our packages',

    // About – full content
    'about.history.title': 'Our History',
    'about.history.p1': 'Mega Force began in 1983, founded by José Luis Gómez✝️ at the age of 18. With a simple audio setup and a couple of lights, he embraced the mobile discotheque concept, spinning Disco and High Energy records that were trending at the time.',
    'about.history.p2': 'Over the years, while playing versatile music, he entered the world of family social events, without losing the essence of the original concept.',
    'about.history.p3': 'In 2000, his son Luis Daniel Gómez joined the team at age 15. He started as staff, loading and installing equipment. Over time he began to take control of the booth, playing during events and bringing a fresh touch with the latest hits for the youth.',
    'about.history.p4': 'After a while, José Luis decided to slow down and took on fewer events, until the equipment was essentially idle. In 2010, his son Luis Daniel decided to take up events again and re-enter the party scene—first under the name "Paradise" and later, around 2015, as "Dj Máximo".',
    'about.history.p5': 'The Dj Máximo project started gaining momentum, with its own style and essence, bringing the "club at home" concept to events.',
    'about.history.p6': 'In 2021, José Luis Gómez passed away. After that, his son, Dj Máximo, decided to revive the name "Mega Force", which continues to this day.',
    'about.history.p7': 'Without losing the established essence and style, and alongside the DJ, audio and lighting project, he added various extra services such as batucada show, illuminated dance floor, cocktail tables, lounge sofas, 360 camera, giant letters, bar service and more.',
    'about.history.p8': 'This is how Mega Force became a social events organization with the best "club at home" concept.',

    'about.mission.title': 'Mission',
    'about.mission.body': 'To provide the best entertainment service for social events with the "club at home" concept, creating a total fun space where hosts and guests enjoy a very special moment.',

    'about.vision.title': 'Vision',
    'about.vision.body': 'To be the number one company—citywide and nationwide—providing entertainment services for social events with the club-at-home concept, with highly qualified staff committed to their work.',

    'about.values.title': 'Values',
    'about.values.body': 'Responsibility, commitment, punctuality, quality, passion, honesty.',

    // Services
    'services.title': 'Services',
    'services.dj': 'Pro DJ',
    'services.sound': 'Pro Audio',
    'services.lighting': 'Lighting',
    'services.screens': 'Screens & Visuals',
    'services.host': 'Master of ceremonies',
    'services.packages': 'Tailored packages',

    // Services section
    'services.card1.title': 'DJ, Sound & Lighting',
    'services.card1.text': 'Our base DJ, sound and lighting service offers options based on what your event requires, providing service for events from 20 to 300 people. If the options do not convince you, we provide information about all the equipment we have, and you can select and build the service to your liking. Get in touch for personalized attention so we can offer the right audio and lighting for your event.',

    'services.card2.title': 'Club-at-home Extras',
    'services.card2.text': 'To give you the best experience of our “club at home” concept, we have the perfect add-ons:',
    'services.card2.item1': 'Lounge sofas and cocktail tables.',
    'services.card2.item2': 'LED pixel dance floor.',
    'services.card2.item3': 'Batucada show.',
    'services.card2.item4': 'Illuminated bar with bartenders.',

    'services.card3.title': 'DJ only',
    'services.card3.text': 'If you already have everything for your event and only need a DJ, we provide the right DJ for the type of event you are having.',

    'services.card4.title': 'Coverage',
    'services.card4.coverage1': '“Club at home” concept: Mexico City and metro area.',
    'services.card4.coverage2': 'DJ, sound and lighting: CDMX, EdoMex, Morelos, Pachuca, Puebla and more.',
    'services.card4.text': 'Contact us and we will help you choose the ideal package.',

    // Testimonials section
    'testimonials.title': 'Testimonials',
    'testimonials.more': 'See more reviews',
    'testimonials.1.text': 'The best choice for our event. Mega Force 10/10 with bar and bartenders, furniture, lighting and of course the DJ 🌟. Thank you 🤩',
    'testimonials.1.author': 'Facebook review',
    'testimonials.2.text': 'Excellent service from Mega Force. I have hired them for two events and they have always been punctual, helpful and with great attitude to set the mood. 🤠🥳',
    'testimonials.2.author': 'Facebook review',
    'testimonials.3.text': 'Highly recommended, very punctual, they set the vibe and adapt to the music you want to hear at your event. 100 out of 10 🎉🎉🎉🎉',
    'testimonials.3.author': 'Facebook review',
  },
};

const STORAGE_KEY = 'djmax_lang';

@Injectable({ providedIn: 'root' })
export class TranslationService {
  // Keep current language in a signal (fast & template-friendly)
  readonly lang = signal<Lang>(this.readInitialLang());

  /** Get current language value */
  get current(): Lang {
    return this.lang();
  }

  /** Set language and persist */
  setLang(lang: Lang): void {
    if (this.lang() === lang) return;
    this.lang.set(lang);
    localStorage.setItem(STORAGE_KEY, lang);
  }

  /** Toggle between ES & EN */
  toggle(): void {
    this.setLang(this.lang() === 'es' ? 'en' : 'es');
  }

  /**
   * Translate a key. If the key is missing, returns the key itself to make it visible.
   * You can safely call this from templates: {{ i18n.t('nav.home') }}
   */
  t(key: string): string {
    const dict = TRANSLATIONS[this.lang()];
    return dict[key] ?? key;
  }

  /**
   * Optionally expose a typed helper to fetch many keys at once.
   * Example (TS): const { title, subtitle } = i18n.pick('hero.title','hero.subtitle')
   */
  pick<K extends string>(...keys: K[]): Record<K, string> {
    const out = {} as Record<K, string>;
    keys.forEach((k) => (out[k] = this.t(k)));
    return out;
  }

  private readInitialLang(): Lang {
    const saved = localStorage.getItem(STORAGE_KEY) as Lang | null;
    if (saved === 'es' || saved === 'en') return saved;
    // Try to infer from browser
    const nav = (navigator.language || navigator.languages?.[0] || 'es').toLowerCase();
    return nav.startsWith('en') ? 'en' : 'es';
  }
}
