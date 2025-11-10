import type { HeroSection } from "~/src/types/HeroSection";
import type { Nav } from "~/src/types/Nav";
import type { AboutCard, AboutSection } from "~/src/types/About";
import type { StrapiQueryMany, StrapiQueryOne } from "~/src/types/StrapiQuery";
import type { ServiceSection, ServicesCard } from "~/src/types/Service";

const apiBaseUrl = useRuntimeConfig().public.apiEndpoint;

class StrapiUtils {
  public getHeroSection(currentLocale: string): Promise<StrapiQueryOne<HeroSection>> {
    return $fetch<StrapiQueryOne<HeroSection>>(`${apiBaseUrl}/api/hero-section`, this.queryParams(currentLocale));
  }

  public getNavItems(currentLocale: string): Promise<StrapiQueryMany<Nav>> {
    return $fetch<StrapiQueryMany<Nav>>(`${apiBaseUrl}/api/navs`, this.queryParams(currentLocale));
  }

  public getAboutSection(currentLocale: string): Promise<StrapiQueryOne<AboutSection>> {
    return $fetch<StrapiQueryOne<AboutSection>>(`${apiBaseUrl}/api/about-section`, this.queryParams(currentLocale));
  }

  public getAboutCards(currentLocale: string): Promise<StrapiQueryMany<AboutCard>> {
    return $fetch<StrapiQueryMany<AboutCard>>(`${apiBaseUrl}/api/about-cards`, this.queryParams(currentLocale));
  }

  public getServiceSection(currentLocale: string): Promise<StrapiQueryOne<ServiceSection>> {
    return $fetch<StrapiQueryOne<ServiceSection>>(`${apiBaseUrl}/api/service-section`, this.queryParams(currentLocale));
  }

  public getServicesCards(currentLocale: string): Promise<StrapiQueryMany<ServicesCard>> {
    return $fetch<StrapiQueryMany<ServicesCard>>(`${apiBaseUrl}/api/services-cards`, this.queryParams(currentLocale));
  }

  private queryParams(locale: string): { query: { populate: string; locale: string } } {
    return {
      query: {
        populate: "*",
        locale: locale,
      },
    };
  }
}

const strapi = new StrapiUtils();

export default strapi;
