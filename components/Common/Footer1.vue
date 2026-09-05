<template>
  <footer :class="{ 'sub-bg': subBg }">
    <div class="footer-container">
      <div class="container pb-80 pt-80 ontop">
        <div class="row">
          <div class="col-lg-6">
            <div class="eml">
              <h6 class="sub-title opacity-8">
                we would love to hear from you.
              </h6>
              <h2 class="underline fz-60">
                <a :href="'mailto:' + contactData.email">{{ contactData.email }}</a>
              </h2>
            </div>
          </div>
        </div>
        <div class="row mt-80">
          <div class="col-lg-3">
            <div class="logo">
              <img src="/assets/imgs/logo-light.png" alt="" style="transform: scale(1.2); transform-origin: left center;"/>
            </div>
          </div>
          <div class="col-lg-6">
            <div class="column">
              <h6 class="sub-title mb-30">Social Media</h6>
              <ul class="rest">
                <li class="hover-this cursor-pointer">
                  <a href="#0" class="hover-anim">Facebook</a>
                </li>
                <li class="hover-this cursor-pointer">
                  <a href="#0" class="hover-anim">X</a>
                </li>
                <li class="hover-this cursor-pointer">
                  <a href="#0" class="hover-anim">LinkedIn</a>
                </li>
                <li class="hover-this cursor-pointer">
                  <a href="https://www.instagram.com/santoshoptical123/" target="_blank" rel="noopener">Instagram</a>
                </li>
              </ul>
            </div>
          </div>
          <div class="col-lg-3">
            <div class="column">
              <h6 class="sub-title mb-30">Our Outlet :</h6>
              <p v-html="contactData.address"></p>
              <h5 class="mt-15 underline">
                <a :href="'tel:' + contactData.phone">{{ contactData.phone }}</a>
              </h5>
            </div>
          </div>
        </div>
      </div>
      <div class="container bord pt-30 pb-30 bord-thin-top">
        <div class="row">
          <div class="col-lg-6">
            <div class="links">
              <ul class="rest">
                <li>
                  <a href="/about" class="animsition-link">FAQ</a>
                </li>
                <li>
                  <a href="/about" class="animsition-link">Careers</a>
                </li>
                <li>
                  <a href="/contact" class="animsition-link">Contact Us</a>
                </li>
              </ul>
            </div>
          </div>
          <div class="col-lg-6">
            <div class="copyright d-flex">
              <div class="ml-auto">
                <p class="fz-13">
                  © {{ new Date().getFullYear() }} {{ contactData.name }}. Made with&nbsp;❤️&nbsp;by&nbsp;
                  <span class="underline">
                    <!-- Security: target="_blank" without rel="noopener noreferrer" exposes against tabnabbing vulnerabilities -->
                    <a
                      href="https://www.linkedin.com/in/shauryamadhav/"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Shaurya Madhav
                    </a>
                  </span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup>
import { onMounted, onBeforeUnmount } from "vue";
import contactData from '@/data/contactDetails.json'

const { subBg } = defineProps({
  subBg: Boolean,
});

const handleResize = () => {
  if (window.innerWidth > 991) {
    gsap.set(".footer-container", { yPercent: -50 });
    const uncover = gsap.timeline({ paused: true });
    uncover.to(".footer-container", { yPercent: 0, ease: "none" });

    ScrollTrigger.create({
      trigger: "main",
      start: "bottom bottom",
      end: "+=50%",
      animation: uncover,
      scrub: true,
    });
  }
};

onMounted(() => {
  handleResize();
  window.addEventListener("resize", handleResize);
});

onBeforeUnmount(() => {
  window.removeEventListener("resize", handleResize);
});
</script>
