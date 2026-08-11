import type { SiteConfigInput } from "@/lib/schema";

// Explicit .ts extensions: scripts/validate-sites.mjs and gen-placeholders.mjs
// import this same file under plain node, which resolves specifiers literally.
import { testConfig } from "./_test.config.ts";
import { attorneyConfig } from "./attorney.config.ts";
import { barberConfig } from "./barber.config.ts";
import { churchConfig } from "./church.config.ts";
import { cleaningConfig } from "./cleaning.config.ts";
import { coffeeConfig } from "./coffee.config.ts";
import { constructionConfig } from "./construction.config.ts";
import { dentistConfig } from "./dentist.config.ts";
import { doctorConfig } from "./doctor.config.ts";
import { estateConfig } from "./estate.config.ts";
import { funeralConfig } from "./funeral.config.ts";
import { guesthouseConfig } from "./guesthouse.config.ts";
import { gymConfig } from "./gym.config.ts";
import { holidayConfig } from "./holiday.config.ts";
import { mechanicConfig } from "./mechanic.config.ts";
import { plumberConfig } from "./plumber.config.ts";
import { restaurantConfig } from "./restaurant.config.ts";
import { securityConfig } from "./security.config.ts";
import { spaConfig } from "./spa.config.ts";
import { turboConfig } from "./turbo.config.ts";

/**
 * The site registry.
 *
 * Adding a client is one line here plus their config file. A static map is used
 * rather than a dynamic `import()` of a template-literal path so that a missing
 * or misspelled site is a compile error instead of a runtime 500 on a live
 * client deployment.
 *
 * The key must equal the config's own `id`, because /public/<id>/ is where that
 * site's images are looked up. validate-sites.mjs enforces it.
 *
 * Configs are authored as `SiteConfigInput` (before Zod defaults are applied);
 * getSiteConfig() parses them into a fully-populated `SiteConfig`.
 */
export const sites: Record<string, SiteConfigInput> = {
  // Flagship demos
  restaurant: restaurantConfig,
  barber: barberConfig,
  attorney: attorneyConfig,
  mechanic: mechanicConfig,
  church: churchConfig,

  // Additional industries
  coffee: coffeeConfig,
  gym: gymConfig,
  spa: spaConfig,
  plumber: plumberConfig,
  guesthouse: guesthouseConfig,
  holiday: holidayConfig,
  dentist: dentistConfig,
  doctor: doctorConfig,
  estate: estateConfig,
  cleaning: cleaningConfig,
  security: securityConfig,
  construction: constructionConfig,
  turbo: turboConfig,
  funeral: funeralConfig,

  /** Engine fixture, not a client. Renders every section in one page. */
  "engine-test": testConfig,
};
