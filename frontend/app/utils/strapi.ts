import type { HeroSection } from "~/src/types/HeroSection";
import type { Nav } from "~/src/types/Nav";
import type { AboutCard, AboutSection } from "~/src/types/About";
import type { StrapiQueryMany, StrapiQueryOne } from "~/src/types/StrapiQuery";
import type { ServiceSection, ServicesCard } from "~/src/types/Service";
import type { StructureCard, StructureSection } from "~/src/types/Structure";
import type { CapacitySection, CapacityCard } from "~/src/types/Capacity";
import type { MachineCard, MachineSection } from "~/src/types/Machine";

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

  public getStructureSection(currentLocale: string): Promise<StrapiQueryOne<StructureSection>> {
    return $fetch<StrapiQueryOne<StructureSection>>(
      `${apiBaseUrl}/api/structure-section`,
      this.queryParams(currentLocale)
    );
  }

  public getStructureCards(currentLocale: string): Promise<StrapiQueryMany<StructureCard>> {
    return $fetch<StrapiQueryMany<StructureCard>>(`${apiBaseUrl}/api/structure-cards`, this.queryParams(currentLocale));
  }

  public getCapacitySection(currentLocale: string): Promise<StrapiQueryOne<CapacitySection>> {
    return $fetch<StrapiQueryOne<CapacitySection>>(
      `${apiBaseUrl}/api/capacity-section`,
      this.queryParams(currentLocale)
    );
  }
  public getCapacityCards(currentLocale: string): Promise<StrapiQueryMany<CapacityCard>> {
    return $fetch<StrapiQueryMany<CapacityCard>>(`${apiBaseUrl}/api/capacity-cards`, this.queryParams(currentLocale));
  }

  public getMachineSection(currentLocale: string): Promise<StrapiQueryOne<MachineSection>> {
    return $fetch<StrapiQueryOne<MachineSection>>(`${apiBaseUrl}/api/machine-section`, this.queryParams(currentLocale));
  }

  public getMachineCards(currentLocale: string): Promise<StrapiQueryMany<MachineCard>> {
    return $fetch<StrapiQueryMany<MachineCard>>(`${apiBaseUrl}/api/machine-cards`, this.queryParams(currentLocale));
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
