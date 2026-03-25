export interface HomeProject {
  slug: string;
  title: string;
  bg: string;
  textColor: string;
  btnBg: string;
  imageSrc: string;
  layout: "title-top" | "image-top";
}

export const homeProjects: HomeProject[] = [
  {
    slug: "enabling-mf-underserved-india",
    title: "Enabling Mutual Funds for Underserved India",
    bg: "#4755E3",
    textColor: "#FFFFFF",
    btnBg: "#4755E3",
    imageSrc: "/projects/projects_home_preview/project-1.png",
    layout: "title-top",
  },
  {
    slug: "gold-and-silver",
    title: "Gold & Silver-\nPrecious Metals Investing",
    bg: "#E5E2DB",
    textColor: "#1E2029",
    btnBg: "linear-gradient(-17deg, #1E2029 1%, #0A0C17 99%)",
    imageSrc: "/projects/projects_home_preview/project-2.png",
    layout: "image-top",
  },
  {
    slug: "kuber",
    title: "Kuber- AI Enabled Wealth Experience",
    bg: "#F0EEE9",
    textColor: "#1E2029",
    btnBg: "linear-gradient(-7deg, #1E2029 1%, #0A0C17 99%)",
    imageSrc: "/projects/projects_home_preview/project-3.png",
    layout: "image-top",
  },
  {
    slug: "loans-underserved-india",
    title: "Insta Loans -\nfor Underserved India",
    bg: "#FFFFFF",
    textColor: "#1E2029",
    btnBg: "linear-gradient(-17deg, #1E2029 1%, #0A0C17 99%)",
    imageSrc: "/projects/projects_home_preview/project-4.png",
    layout: "title-top",
  },
  {
    slug: "festive-one-time-investments",
    title: "Supercharge inflows with one-Time Investments",
    bg: "#E5E2DB",
    textColor: "#1E2029",
    btnBg: "linear-gradient(-17deg, #1E2029 1%, #0A0C17 99%)",
    imageSrc: "/projects/projects_home_preview/project-5.png",
    layout: "image-top",
  },
  {
    slug: "jio-offer-store-revamp",
    title: "Revamping India's biggest Jio Offer Store",
    bg: "#F0EEE9",
    textColor: "#1E2029",
    btnBg: "linear-gradient(-7deg, #1E2029 1%, #0A0C17 99%)",
    imageSrc: "/projects/projects_home_preview/project-6.png",
    layout: "image-top",
  },
];
