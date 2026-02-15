<template>
  <CommonLoader />
  <div id="smooth-wrapper">
    <CommonNavbar />
    <CommonMenu />
    <div id="smooth-content">
      <main class="main-bg">
        <AboutHeader />
        <AboutIntro />
        <AboutVideo />
        <AboutTeam />
        <AboutTestimonials />
      </main>
      <CommonFooter1 />
    </div>
  </div>
</template>

<script setup>
//= Page Head
useHead({
  titleTemplate: `%s - About Santosh Optical`,
  meta: [
    {
      name: 'description',
      content: 'Learn more about Santosh Optical, our history, and our commitment to provide the best eye care and eyewear in Patna.'
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
