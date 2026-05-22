/** @format */

export const siteName = "DocAppoint";

export const siteDescription =
  "Book trusted doctors online, manage appointments, and keep your healthcare schedule organized with DocAppoint.";

export const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

export const siteMetadata = {
  metadataBase: new URL(siteUrl),
  applicationName: siteName,
  title: {
    default: siteName,
    template: `%s | ${siteName}`,
  },
  description: siteDescription,
  keywords: [
    "doctor appointment",
    "book doctor online",
    "healthcare scheduling",
    "medical booking",
    "DocAppoint",
  ],
  authors: [{ name: siteName }],
  creator: siteName,
  publisher: siteName,
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "/",
    siteName,
    title: siteName,
    description: siteDescription,
    images: [
      {
        url: "/Asset/DocAppoint.png",
        width: 512,
        height: 512,
        alt: "DocAppoint logo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: siteName,
    description: siteDescription,
    images: ["/Asset/DocAppoint.png"],
  },
  icons: {
    icon: "/Asset/DocAppoint.png",
    shortcut: "/Asset/DocAppoint.png",
    apple: "/Asset/DocAppoint.png",
  },
};

export function createPageMetadata({
  title,
  description,
  path,
  image = "/Asset/DocAppoint.png",
  noindex = false,
}) {
  const metadata = {
    metadataBase: new URL(siteUrl),
    title,
    description,
    alternates: path ? { canonical: path } : undefined,
    openGraph: {
      type: "website",
      title,
      description,
      url: path,
      siteName,
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
    },
  };

  if (noindex) {
    metadata.robots = {
      index: false,
      follow: false,
      nocache: true,
    };
  }

  return metadata;
}

export function createDoctorMetadata(doctor, path) {
  const doctorName = doctor?.name || "Doctor";
  const doctorSpecialty = doctor?.specialty || "Specialist";
  const doctorHospital = doctor?.hospital || "DocAppoint";

  return createPageMetadata({
    title: `${doctorName} | ${doctorSpecialty}`,
    description: `View ${doctorName}, a ${doctorSpecialty} at ${doctorHospital}, and book an appointment online with DocAppoint.`,
    path,
  });
}
