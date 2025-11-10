import type { HeroSection } from "~/src/types/HeroSection";
import type { Nav } from "~/src/types/Nav";
import type { StrapiQueryMany, StrapiQueryOne } from "~/src/types/StrapiQuery";

const apiBaseUrl = "http://localhost:1337";

class StrapiUtils {
  getHeroSection(currentLocale: string): Promise<StrapiQueryOne<HeroSection>> {
    return $fetch<StrapiQueryOne<HeroSection>>(`${apiBaseUrl}/api/hero-section`, {
      query: {
        populate: "*",
        locale: currentLocale,
      },
    });
  }

  getNavItems(currentLocale: string): Promise<StrapiQueryMany<Nav>> {
    return $fetch<StrapiQueryMany<Nav>>(`${apiBaseUrl}/api/navs`, {
      query: {
        populate: "*",
        locale: currentLocale,
      },
    });
  }
}

const strapi = new StrapiUtils();

export default strapi;
