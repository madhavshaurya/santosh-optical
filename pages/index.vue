<template>
  <CommonLoader />
  <div class="noise"></div>
  <div id="smooth-wrapper">
    <CommonNavbar />
    <CommonMenu />
    <div id="smooth-content">
      <main class="main-bg">
        <div class="main-box main-bg ontop">
          <CreativePortfolioHeader />
          <CreativePortfolioMarquee />
          <CreativePortfolioAbout />
          <CreativePortfolioServices />
          <CreativePortfolioWorks />
          <CreativePortfolioTestimonials />
          <CreativePortfolioBlog />
        </div>
        <CreativePortfolioContact />
      </main>
      <CommonFooter1 />
    </div>
  </div>
</template>

<script setup>
//= Page Head
const contactData = {
  name: "Santosh Optical",
  address: "Hotel Lalita, East Boring Canal Rd, Opp. Vidya Mandir Classes, Patna, Bihar 800001",
  phone: "+91 9155506716",
  email: "hello@santoshoptical.com",
  url: "https://santoshoptical.com"
}

//= Page Head
useHead({
  titleTemplate: `%s - Santosh Optical`,
  bodyAttrs: {
    class: 'crev-portfolio'
  },
  script: [
    { src: "/assets/js/smoother-script.js", defer: true },
    {
      type: 'application/ld+json',
      children: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "LocalBusiness",
        "name": contactData.name,
        "image": "https://santoshoptical.com/assets/imgs/logo-light.png",
        "@id": contactData.url,
        "url": contactData.url,
        "telephone": contactData.phone,
        "address": {
          "@type": "PostalAddress",
          "streetAddress": "Hotel Lalita, East Boring Canal Rd, Opp. Vidya Mandir Classes",
          "addressLocality": "Patna",
          "postalCode": "800001",
          "addressRegion": "Bihar",
          "addressCountry": "IN"
        },
        "geo": {
          "@type": "GeoCoordinates",
          "latitude": 25.6174,
          "longitude": 85.1376
        },
        "openingHoursSpecification": {
          "@type": "OpeningHoursSpecification",
          "dayOfWeek": [
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Friday",
            "Saturday"
          ],
          "opens": "10:00",
          "closes": "20:00"
        }
      })
    }
  ]
});
</script>
