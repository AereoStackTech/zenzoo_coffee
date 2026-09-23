import type { Metadata, Viewport } from 'next';
import { Playfair_Display, Plus_Jakarta_Sans, Amiri } from 'next/font/google';
import './globals.css';

const serifFont = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-serif',
  display: 'swap',
});

const sansFont = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
});

const arabicFont = Amiri({
  subsets: ['arabic', 'latin'],
  weight: ['400', '700'],
  variable: '--font-arabic',
  display: 'swap',
});

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: '#F9F6F0',
};

export const metadata: Metadata = {
  title: 'ZenZoo Café Safi — Menu Table & Horaires en Direct',
  description:
    'Menu digital et guide opérationnel en direct de ZenZoo Café au centre-ville de Safi, Maroc. Boissons, petit-déjeuner et retransmission de matchs.',
  keywords: [
    'Café Safi',
    'ZenZoo Café',
    'Menu café Safi',
    'Café terrasse Safi',
    'Botola Pro Safi café',
    'Café ouvert Safi',
    'Thé à la menthe Safi',
  ],
  authors: [{ name: 'ZenZoo Café Safi' }],
  creator: 'ZenZoo Café',
  publisher: 'ZenZoo Café',
  formatDetection: {
    telephone: true,
    address: true,
  },
  openGraph: {
    title: 'ZenZoo Café Safi — Menu Table & Horaires en Direct',
    description:
      'Consultez le menu sur table, les prix en Dirhams (MAD) et les horaires en direct de ZenZoo Café au centre-ville de Safi.',
    url: 'https://zenzoo-safi.ma',
    siteName: 'ZenZoo Café Safi',
    locale: 'fr_MA',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ZenZoo Café Safi — Menu Table & Horaires en Direct',
    description:
      'Menu digital officiel sur table et horaires en direct à Safi, Maroc.',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Schema.org LocalBusiness / Café structured data for downtown Safi
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'CafeOrCoffeeShop',
    name: 'ZenZoo Café',
    alternateName: 'مقهى زين زو',
    description:
      'Café traditionnel de quartier au centre-ville de Safi avec terrasse ensoleillée, grand écran pour matchs et service continu de 05h00 à 01h00.',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Boulevard Hassan II, Centre-Ville',
      addressLocality: 'Safi',
      postalCode: '46000',
      addressCountry: 'MA',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 32.2995,
      longitude: -9.2372,
    },
    url: 'https://zenzoo-safi.ma',
    telephone: '+212524620000',
    priceRange: '10 - 30 MAD',
    currenciesAccepted: 'MAD',
    paymentAccepted: 'Cash',
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: [
          'Monday',
          'Tuesday',
          'Wednesday',
          'Thursday',
          'Friday',
          'Saturday',
          'Sunday',
        ],
        opens: '05:00',
        closes: '01:00',
      },
    ],
    servesCuisine: ['Moroccan Café', 'Coffee', 'Breakfast', 'Tea'],
  };

  return (
    <html
      lang="fr"
      className={`${serifFont.variable} ${sansFont.variable} ${arabicFont.variable}`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body
        className="font-sans antialiased text-[var(--ink)] bg-[var(--canvas)] selection:bg-[var(--surface-brass)] selection:text-[var(--primary)]"
        suppressHydrationWarning
      >
        {children}
      </body>
    </html>
  );
}
