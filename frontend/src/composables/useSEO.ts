import { onMounted, watch, type Ref } from 'vue'
import { useRoute } from 'vue-router'

interface SEOMetaOptions {
  title?: string
  titleTemplate?: string
  description?: string
  ogTitle?: string
  ogDescription?: string
  ogImage?: string
  ogUrl?: string
  ogType?: string
  twitterCard?: string
  twitterTitle?: string
  twitterDescription?: string
  twitterImage?: string
  canonicalUrl?: string
  robots?: string
  keywords?: string
  author?: string
  publishedTime?: string
  modifiedTime?: string
  schema?: object
}

export function useSEO(options: SEOMetaOptions | Ref<SEOMetaOptions>) {
  const route = useRoute()

  const getOptions = (): SEOMetaOptions => {
    return typeof options === 'function' ? options() : options
  }

  const updateMetaTag = (selector: string, attribute: string, value: string, property?: string) => {
    if (!value) return

    let element = document.querySelector(selector) as HTMLElement

    if (!element) {
      element = document.createElement(
        selector.includes('meta') ? 'meta' : selector.includes('link') ? 'link' : 'title'
      )

      if (selector.includes('meta')) {
        if (property) {
          element.setAttribute('property', property)
        } else {
          element.setAttribute('name', attribute)
        }
      } else if (selector.includes('link')) {
        element.setAttribute('rel', attribute)
      }

      document.head.appendChild(element)
    }

    if (selector.includes('title')) {
      document.title = value
    } else if (selector.includes('meta') || selector.includes('link')) {
      if (property) {
        element.setAttribute('content', value)
      } else if (selector.includes('link')) {
        element.setAttribute('href', value)
      } else {
        element.setAttribute('content', value)
      }
    }
  }

  const removeMetaTag = (selector: string) => {
    const element = document.querySelector(selector)
    if (element) {
      element.remove()
    }
  }

  const updateSEO = () => {
    const opts = getOptions()
    const siteName = 'Hidden Gems Finland'
    const baseUrl = 'https://hidden-gems-finland.com'

    const fullTitle = opts.titleTemplate
      ? opts.titleTemplate.replace('%s', opts.title || '')
      : opts.title
        ? `${opts.title} | ${siteName}`
        : siteName

    const description = opts.description || 'Discover hidden gems and secret places in Finland. Explore beautiful locations off the beaten path.'
    const image = opts.ogImage || `${baseUrl}/og-image.jpg`
    const url = opts.ogUrl || `${baseUrl}${route.path}`

    document.title = fullTitle

    const metaTags = [
      { name: 'description', content: description },
      { name: 'keywords', content: opts.keywords || 'Finland, travel, hidden gems, secret places, nature, tourism' },
      { name: 'author', content: opts.author || 'Hidden Gems Finland' },
      { name: 'robots', content: opts.robots || 'index, follow' },

      { property: 'og:title', content: opts.ogTitle || fullTitle },
      { property: 'og:description', content: opts.ogDescription || description },
      { property: 'og:image', content: image },
      { property: 'og:url', content: url },
      { property: 'og:type', content: opts.ogType || 'website' },
      { property: 'og:site_name', content: siteName },
      { property: 'og:locale', content: 'en_US' },

      { name: 'twitter:card', content: opts.twitterCard || 'summary_large_image' },
      { name: 'twitter:title', content: opts.twitterTitle || fullTitle },
      { name: 'twitter:description', content: opts.twitterDescription || description },
      { name: 'twitter:image', content: opts.twitterImage || image },
    ]

    metaTags.forEach(({ name, property, content }) => {
      if (content) {
        const selector = name
          ? `meta[name="${name}"]`
          : `meta[property="${property}"]`
        const attribute = name || property || ''
        updateMetaTag(selector, attribute, content, property ? 'property' : 'name')
      }
    })

    if (opts.canonicalUrl || url) {
      const canonical = opts.canonicalUrl || url
      let link = document.querySelector('link[rel="canonical"]') as HTMLLinkElement
      if (!link) {
        link = document.createElement('link')
        link.setAttribute('rel', 'canonical')
        document.head.appendChild(link)
      }
      link.setAttribute('href', canonical)
    }

    if (opts.schema) {
      const existingScript = document.querySelector('script[type="application/ld+json"]')
      if (existingScript) {
        existingScript.remove()
      }
      const script = document.createElement('script')
      script.type = 'application/ld+json'
      script.textContent = JSON.stringify(opts.schema)
      document.head.appendChild(script)
    }
  }

  onMounted(() => {
    updateSEO()
  })

  watch(
    () => route.path,
    () => {
      updateSEO()
    }
  )

  if (typeof options !== 'function' && options !== null && typeof options === 'object') {
    watch(
      () => options,
      () => updateSEO(),
      { deep: true }
    )
  }

  return { updateSEO }
}
