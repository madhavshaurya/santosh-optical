<template>
  <div class="hamenu valign">
    <div class="container">
      <div class="row">
        <div class="col-lg-8">
          <div class="menu-links">
            <ul class="main-menu rest">
              <li @mouseenter="handleMouseEnter" @mouseleave="handleMouseLeave">
                <div class="o-hidden">
                  <a href="/" class="link animsition-link" @click="closeMenu">
                    <span class="nm">01.</span> Home
                  </a>
                </div>
              </li>

              <li @mouseenter="handleMouseEnter" @mouseleave="handleMouseLeave">
                <div class="o-hidden">
                  <a href="/about" class="link animsition-link" @click="closeMenu">
                    <span class="nm">02.</span> About
                  </a>
                </div>
              </li>

              <li @mouseenter="handleMouseEnter" @mouseleave="handleMouseLeave">
                <div class="o-hidden">
                  <a href="/portfolio-grid" class="link animsition-link" @click="closeMenu">
                    <span class="nm">03.</span> Collections
                  </a>
                </div>
              </li>

              <li @mouseenter="handleMouseEnter" @mouseleave="handleMouseLeave">
                <div class="o-hidden">
                  <a href="/blog" class="link animsition-link" @click="closeMenu">
                    <span class="nm">04.</span> Stories
                  </a>
                </div>
              </li>

              <li @mouseenter="handleMouseEnter" @mouseleave="handleMouseLeave">
                <div class="o-hidden">
                  <a href="/contact" class="link animsition-link" @click="closeMenu">
                    <span class="nm">05.</span> Contact
                  </a>
                </div>
              </li>
            </ul>
          </div>
        </div>

        <div class="col-lg-4 valign">
          <div class="cont-info">
            <div class="item mb-50">
              <h6 class="text-u fw-600 mb-20">Base</h6>
              <p class="fw-400 fz-18" v-html="contactData.address"></p>
            </div>

            <div class="item mb-50">
              <h6 class="text-u fw-600 mb-20">How to Connect</h6>
              <p class="fw-400 fz-18">{{ contactData.phone }}</p>
              <p class="fw-400 fz-18">{{ contactData.email }}</p>
            </div>

            <div class="bottom">
              <h6 class="text-u fw-600 mb-20">Follow Us</h6>
              <ul class="rest social-text d-flex fz-13">
                <li class="mr-20">
                  <a href="https://www.facebook.com/" target="_blank" rel="noopener" class="hover-this">
                    <span class="hover-anim">Facebook</span>
                  </a>
                </li>
                <li class="mr-20">
                  <a href="https://x.com/" target="_blank" rel="noopener" class="hover-this">
                    <span class="hover-anim">X</span>
                  </a>
                </li>
                <li class="mr-20">
                  <a href="https://www.linkedin.com/" target="_blank" rel="noopener" class="hover-this">
                    <span class="hover-anim">LinkedIn</span>
                  </a>
                </li>
                <li>
                  <a href="https://www.instagram.com/santoshoptical123/" target="_blank" rel="noopener" class="hover-this">
                    <span class="hover-anim">Instagram</span>
                  </a>
                </li>
              </ul>
            </div>

          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import contactData from '@/data/contactDetails.json'

const closeMenu = () => {
  const el = document.querySelector('.hamenu');
  if (el) el.classList.remove('open');
};

const handleMouseEnter = (event) => {
  const parentChildren = Array.from(event.currentTarget.parentElement.children);
  parentChildren.forEach(el => (el.style.opacity = "0.5"));
  event.currentTarget.style.opacity = "1";
};

const handleMouseLeave = (event) => {
  const parentChildren = Array.from(event.currentTarget.parentElement.children);
  parentChildren.forEach(el => (el.style.opacity = "1"));
};
</script>
