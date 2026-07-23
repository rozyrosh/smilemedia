export type DesignCategory = "Flyers" | "Banners" | "Branding" | "Digital";

export const designFilters: Array<DesignCategory | "All"> = [
  "All",
  "Flyers",
  "Banners",
  "Branding",
  "Digital",
];

const gridClasses = [
  "bc-1",
  "bc-2",
  "bc-3",
  "bc-4",
  "bc-5",
  "bc-6",
  "bc-7",
  "bc-8",
  "bc-9",
  "bc-10",
  "bc-11",
  "bc-12",
];

const filenames = [
  "Baseus 01 09162025.png",
  "Baseus 02 NP.png",
  "Baseus 06 Dec.png",
  "Baseus FEB 02.png",
  "Baseus GDA 01.png",
  "Baseus Giveaway 1 v2.png",
  "Baseus RP 01 post.png",
  "Baseus RP 02.png",
  "Baseus RP 06 post.png",
  "Baseus RP 07 post.png",
  "Baseus RP 12.png",
  "Baseus sales 01 09182025.png",
  "baseus try.png",
  "BMICH 01.png",
  "BMICH Mihilaka Medura 01.png",
  "BMICH Western Terrace 01.png",
  "BMICH-Sapphire-Hall_01.png",
  "BMICH-Sapphire-Hall_02.png",
  "BMICH-Sapphire-Hall_03.png",
  "BMICH-Sapphire-Hall_04.png",
  "Collaboration Post.png",
  "Crystal-Tv-85500.png",
  "Dimo ID Post 2.png",
  "Dimo new _1 090220025.png",
  "Dimo RP FEB 10.png",
  "Ditec 03 RP.png",
  "Ditec 10 CD.png",
  "Ditec Easter post 01.png",
  "DiTec Valentine post.png",
  "DiTec-09-(GRINDING--GREEN-WHEEL).png",
  "Ditect-Labour-Day.png",
  "neewwwwwwwwwww99.png",
  "TIG WELDING PLANT.png",
  "Ultracare post 01 v1.5.png",
  "ultracare _1.png",
];

function titleFromFile(file: string) {
  return file.replace(/\.png$/i, "").replace(/[-_]/g, " ").trim();
}

function categoryFromFile(file: string): DesignCategory {
  const name = file.toLowerCase();
  if (name.includes("bmich") || name.includes("crystal-tv") || name.includes("tig")) {
    return "Banners";
  }
  if (name.includes("baseus")) {
    return "Branding";
  }
  if (name.includes("flyer")) {
    return "Flyers";
  }
  return "Digital";
}

export type Design = {
  id: string;
  file: string;
  image: string;
  title: string;
  category: DesignCategory;
  grid?: string;
};

export const designs: Design[] = filenames.map((file, index) => ({
  id: `design-${index + 1}`,
  file,
  image: `/assets/images/designs/${encodeURI(file)}`,
  title: titleFromFile(file),
  category: categoryFromFile(file),
}));

export const portfolioPreview: Design[] = designs.slice(0, 12).map((item, index) => ({
  ...item,
  grid: gridClasses[index],
}));

export const portfolioMeta = {
  eyebrow: "Creative Work",
  title: "OUR ARTISTRY",
  sub: "Flyers, banners, brand identities & digital campaigns — crafted to stop the scroll.",
  stats: [
    { num: "200", suffix: "+", label: "Projects Delivered" },
    { num: "80", suffix: "+", label: "Happy Clients" },
    { num: "5", suffix: "★", label: "Client Satisfaction" },
    { num: "360", suffix: "°", label: "Creative Coverage" },
  ],
};
