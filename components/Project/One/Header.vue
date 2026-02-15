<template>
  <header class="header-project1">
    <div class="container mt-100">
      <div class="row">
        <div class="col-lg-6 valign">
          <div class="full-width mb-30">
            <h1 class="fz-60">Premium Eyewear Showcase</h1>
            <p>
              A curated display of stylish prescription frames and sunglasses from top global brands.
              This project highlights how quality eyewear enhances both vision and personal style.
            </p>
          </div>
        </div>

        <div class="col-lg-5 offset-lg-1">
          <div class="info">
            <div class="row">

              <div class="col-md-6">
                <div class="item mb-30">
                  <span class="opacity-8 mb-5">Category :</span>
                  <h6>Eyewear Collection</h6>
                </div>
              </div>

              <div class="col-md-6">
                <div class="item mb-30">
                  <span class="opacity-8 mb-5">Client :</span>
                  <h6>Santosh Optical Works</h6>
                </div>
              </div>

              <div class="col-md-6">
                <div class="item mb-30">
                  <span class="opacity-8 mb-5">Start Date :</span>
                  <h6>12 September 2025</h6>
                </div>
              </div>

              <div class="col-md-6">
                <div class="item">
                  <span class="opacity-8 mb-5">Designer :</span>
                  <h6>Santosh Optical Team</h6>
                </div>
              </div>

            </div>
          </div>
        </div>

      </div>
    </div>

    <div class="bg-img mt-100" data-background="/assets/imgs/works/projects/0/1.jpg"></div>
  </header>
</template>

<script setup>
import { onMounted } from 'vue'
import loadBackgroudImages from '@/common/loadBackgroudImages'

onMounted(() => {
  loadBackgroudImages()
})
</script>
