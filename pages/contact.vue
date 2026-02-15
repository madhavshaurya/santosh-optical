<template>
  <CommonLoader />
  <div id="smooth-wrapper">
    <CommonNavbar />
    <CommonMenu />
    <div id="smooth-content">
      <main class="main-bg">
        <ContactHeader />
        <ContactInfo />
        <ContactForm />
      </main>
      <CommonFooter1 :subBg="true" />
    </div>
  </div>
</template>

<script setup>
//= Page Head
useHead({
  titleTemplate: `%s - Contact Santosh Optical`,
  meta: [
    {
      name: 'description',
      content: 'Contact Santosh Optical in Patna for appointments, inquiries about eye glasses, contact lenses, or any eye care services.'
    }
  ],
  bodyAttrs: {
    class: 'main-bg'
  },
  script: [
    { src: "/assets/js/smoother-script.js", defer: true }
  ]
});
</script>
