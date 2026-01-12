import type { Graph as SchemaGraph, Thing, WithContext } from 'schema-dts'

/**
 * Renders a JSON-LD script tag for structured data
 * @param json - The JSON-LD data to render
 * @returns A script element containing the JSON-LD data
 */
export function JsonLd<T extends Thing>(json: WithContext<T>) {
   return (
      <script
         type="application/ld+json"
         dangerouslySetInnerHTML={{ __html: JSON.stringify(json) }}
      />
   )
}

/**
 * Renders a JSON-LD script tag for any schema object (less strict typing)
 * Useful when dealing with complex nested structures
 */
export function JsonLdScript(data: Record<string, unknown>) {
   return (
      <script
         type="application/ld+json"
         dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
      />
   )
}

/**
 * Renders a JSON-LD Graph for multiple interconnected entities
 * @param graph - The graph containing multiple schema entities
 * @returns A script element containing the JSON-LD graph
 */
export function JsonLdGraph(graph: SchemaGraph) {
   return (
      <script
         type="application/ld+json"
         dangerouslySetInnerHTML={{ __html: JSON.stringify(graph) }}
      />
   )
}

/**
 * Helper to create Organization schema for Performix
 */
export function getOrganizationSchema() {
   return {
      '@type': 'Organization' as const,
      '@id': 'https://www.performix.ca/#organization',
      name: 'Performix',
      url: 'https://www.performix.ca',
      logo: 'https://www.performix.ca/performix-logo.png',
      sameAs: [
         'https://www.instagram.com/performix',
         'https://www.youtube.com/@performix',
      ],
      description: 'Elite hockey mentorship platform connecting aspiring players with D1+ mentors.',
      contactPoint: {
         '@type': 'ContactPoint' as const,
         contactType: 'customer service',
         email: 'support@performix.ca',
      },
   }
}

/**
 * Helper to create WebSite schema for Performix
 */
export function getWebSiteSchema() {
   return {
      '@type': 'WebSite' as const,
      '@id': 'https://www.performix.ca/#website',
      url: 'https://www.performix.ca',
      name: 'Performix',
      description: 'Elite hockey mentorship platform connecting aspiring players with D1+ mentors.',
      publisher: { '@id': 'https://www.performix.ca/#organization' },
   }
}

/**
 * Helper to create BreadcrumbList schema
 */
export function getBreadcrumbSchema(items: { name: string; url: string }[]) {
   return {
      '@type': 'BreadcrumbList' as const,
      itemListElement: items.map((item, index) => ({
         '@type': 'ListItem' as const,
         position: index + 1,
         name: item.name,
         item: item.url,
      })),
   }
}

/**
 * Helper to create WebPage schema
 */
export function getWebPageSchema(options: {
   name: string
   description: string
   url: string
   breadcrumbs?: { name: string; url: string }[]
}) {
   return {
      '@type': 'WebPage' as const,
      '@id': `${options.url}#webpage`,
      url: options.url,
      name: options.name,
      description: options.description,
      isPartOf: { '@id': 'https://www.performix.ca/#website' },
      ...(options.breadcrumbs && {
         breadcrumb: getBreadcrumbSchema(options.breadcrumbs),
      }),
   }
}

/**
 * Helper to create Person schema for mentors
 */
export function getPersonSchema(options: {
   name: string
   description?: string
   image?: string
   url: string
   jobTitle?: string
   worksFor?: string
   sameAs?: string[]
}) {
   return {
      '@type': 'Person' as const,
      '@id': `${options.url}#person`,
      name: options.name,
      description: options.description,
      url: options.url,
      ...(options.image && { image: options.image }),
      ...(options.jobTitle && { jobTitle: options.jobTitle }),
      ...(options.worksFor && {
         worksFor: {
            '@type': 'Organization' as const,
            name: options.worksFor,
         },
      }),
      ...(options.sameAs && { sameAs: options.sameAs }),
   }
}

/**
 * Helper to create Course schema for lab modules
 */
export function getCourseSchema(options: {
   name: string
   description: string
   url: string
   image?: string
   provider?: string
   numberOfLessons?: number
}) {
   return {
      '@type': 'Course' as const,
      '@id': `${options.url}#course`,
      name: options.name,
      description: options.description,
      url: options.url,
      ...(options.image && { image: options.image }),
      provider: {
         '@type': 'Organization' as const,
         name: options.provider || 'Performix',
         url: 'https://www.performix.ca',
      },
      ...(options.numberOfLessons && {
         hasCourseInstance: {
            '@type': 'CourseInstance' as const,
            courseMode: 'online',
         },
      }),
   }
}

/**
 * Helper to create Article schema
 */
export function getArticleSchema(options: {
   headline: string
   description: string
   url: string
   image?: string
   datePublished?: string
   dateModified?: string
   author?: string
   keywords?: string[]
}) {
   return {
      '@type': 'Article' as const,
      '@id': `${options.url}#article`,
      headline: options.headline,
      description: options.description,
      url: options.url,
      ...(options.image && { image: options.image }),
      ...(options.datePublished && { datePublished: options.datePublished }),
      ...(options.dateModified && { dateModified: options.dateModified }),
      author: {
         '@type': 'Organization' as const,
         name: options.author || 'Performix',
         url: 'https://www.performix.ca',
      },
      publisher: { '@id': 'https://www.performix.ca/#organization' },
      ...(options.keywords && { keywords: options.keywords.join(', ') }),
      mainEntityOfPage: { '@id': `${options.url}#webpage` },
   }
}

/**
 * Helper to create Product schema for blueprints/plans
 */
export function getProductSchema(options: {
   name: string
   description: string
   url: string
   image?: string
   price?: number
   priceCurrency?: string
}) {
   return {
      '@type': 'Product' as const,
      '@id': `${options.url}#product`,
      name: options.name,
      description: options.description,
      url: options.url,
      ...(options.image && { image: options.image }),
      brand: {
         '@type': 'Brand' as const,
         name: 'Performix',
      },
      ...(options.price !== undefined && {
         offers: {
            '@type': 'Offer' as const,
            price: options.price,
            priceCurrency: options.priceCurrency || 'CAD',
            availability: 'https://schema.org/InStock',
            url: options.url,
         },
      }),
   }
}

/**
 * Helper to create Service schema
 */
export function getServiceSchema(options: {
   name: string
   description: string
   url: string
   provider?: string
   serviceType?: string
}) {
   return {
      '@type': 'Service' as const,
      '@id': `${options.url}#service`,
      name: options.name,
      description: options.description,
      url: options.url,
      serviceType: options.serviceType || 'Mentorship',
      provider: {
         '@type': 'Organization' as const,
         name: options.provider || 'Performix',
         url: 'https://www.performix.ca',
      },
   }
}

/**
 * Helper to create FAQPage schema
 */
export function getFAQPageSchema(faqs: { question: string; answer: string }[]) {
   return {
      mainEntity: faqs.map((faq) => ({
         '@type': 'Question' as const,
         name: faq.question,
         acceptedAnswer: {
            '@type': 'Answer' as const,
            text: faq.answer,
         },
      })),
   }
}

/**
 * Helper to create Review/Testimonial schema
 */
export function getReviewSchema(options: {
   author: string
   reviewBody: string
   ratingValue?: number
   itemReviewed?: {
      name: string
      type: 'Organization' | 'Product' | 'Service'
   }
}) {
   return {
      '@type': 'Review' as const,
      author: {
         '@type': 'Person' as const,
         name: options.author,
      },
      reviewBody: options.reviewBody,
      ...(options.ratingValue && {
         reviewRating: {
            '@type': 'Rating' as const,
            ratingValue: options.ratingValue,
            bestRating: 5,
         },
      }),
      ...(options.itemReviewed && {
         itemReviewed: {
            '@type': options.itemReviewed.type,
            name: options.itemReviewed.name,
         },
      }),
   }
}

/**
 * Helper to create CollectionPage schema for listing pages
 */
export function getCollectionPageSchema(options: {
   name: string
   description: string
   url: string
   numberOfItems?: number
}) {
   return {
      '@type': 'CollectionPage' as const,
      '@id': `${options.url}#collectionpage`,
      name: options.name,
      description: options.description,
      url: options.url,
      isPartOf: { '@id': 'https://www.performix.ca/#website' },
      ...(options.numberOfItems && {
         mainEntity: {
            '@type': 'ItemList' as const,
            numberOfItems: options.numberOfItems,
         },
      }),
   }
}
