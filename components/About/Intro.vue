<template>
  <section class="section-padding">
    <div class="container">
      <div class="row">
        <div class="col-lg-10">
          <div class="text">
            <span class="sub-title mb-15 opacity-8">- Who We Are?</span>
            <div class="text-reval">
              <h2 class="fz-50 text-u mb-30">
                <span class="text">We are a vision studio with focus</span>
                <span class="text">on eye testing, eyewear and</span>
                <span class="text"> optical care.</span>
              </h2>
            </div>
            <p>
              Santosh Optical delivers comprehensive vision solutions — from modern eye examinations
    to handcrafted prescription glasses and stylish sunglasses. We combine professional expertise,
    a wide range of premium frames, and personalised service to ensure your vision is clear,
    comfortable and confident every day.
            </p>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-lg-10 offset-lg-1">
          <div class="row mt-80">
            <div class="col-md-4 sm-mb30">
  <ul class="list rest">
    <li class="fz-18 mb-15"><span class="mr-10">+</span> Computerized Eye Testing</li>
    <li class="fz-18 mb-15"><span class="mr-10">+</span> Prescription Glasses</li>
    <li class="fz-18 mb-15"><span class="mr-10">+</span> Contact Lens Fitting</li>
    <li class="fz-18 mb-15"><span class="mr-10">+</span> Sunglasses Collection</li>
  </ul>
</div>

<div class="col-md-4 sm-mb30">
  <ul class="list rest">
    <li class="fz-18 mb-15"><span class="mr-10">+</span> Kids' Vision Solutions</li>
    <li class="fz-18 mb-15"><span class="mr-10">+</span> Blue Cut & Anti-Glare Lenses</li>
    <li class="fz-18 mb-15"><span class="mr-10">+</span> Frame Repair & Adjustment</li>
    <li class="fz-18 mb-15"><span class="mr-10">+</span> Power Lens Consultation</li>
  </ul>
</div>

<div class="col-md-4">
  <ul class="list rest">
    <li class="fz-18 mb-15"><span class="mr-10">+</span> Branded Eyewear Options</li>
    <li class="fz-18 mb-15"><span class="mr-10">+</span> UV Protection Solutions</li>
    <li class="fz-18 mb-15"><span class="mr-10">+</span> Vision Care Guidance</li>
    <li class="fz-18 mb-15"><span class="mr-10">+</span> Personalized Frame Styling</li>
  </ul>
</div>

          </div>
          <div class="row numbers mt-80">
            <div class="col-lg-4">
              <div class="item md-mb50">
                <h3 class="stroke f-bold num pb-30 mb-30 bord-thin-bottom">56</h3>
                <h6 class="fz-16">Years Completed</h6>
              </div>
            </div>
            <div class="col-lg-4">
              <div class="item md-mb50">
                <h3 class="stroke f-bold num pb-30 mb-30 bord-thin-bottom">64k</h3>
                <h6 class="fz-16">Clients Around the World</h6>
              </div>
            </div>
            <div class="col-lg-4">
              <div class="item">
                <h3 class="stroke f-bold num pb-30 mb-30 bord-thin-bottom">30</h3>
                <h6 class="fz-16">Total Awards</h6>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { onMounted, onUnmounted } from 'vue';

const handleResize = () => {
  if (window.innerWidth > 991) {
    gsap.to(".text-reval .text", {
      backgroundPositionX: "0%",
      stagger: 1,
      ease: "power1.inOut",
      scrollTrigger: {
        trigger: ".text-reval",
        markers: false,
        scrub: 1,
        start: "top center",
        end: "bottom center"
      }
    });
  }
};

onMounted(() => {
  handleResize();
  window.addEventListener('resize', handleResize);
});

onUnmounted(() => {
  window.removeEventListener('resize', handleResize);
});
</script>
