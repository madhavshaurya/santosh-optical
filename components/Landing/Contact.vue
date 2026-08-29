<template>
  <section class="contact section-padding">
    <div class="contact-container">
      <div class="container">
        <div class="row justify-content-center">
          <div class="col-lg-8">
            <div class="sec-head mb-80">
              <span class="sub-title mb-15 opacity-8">- Contact Us</span>
              <h3 class="text-u f-bold fz-50">Get In <span class="f-ultra-light">Touch</span>.</h3>
            </div>
            <div class="full-width">
              <div v-if="responseMessage" class="messages">
                <div :class="responseClass">{{ responseMessage }}</div>
              </div>
              <form id="contact-form" @submit.prevent="onSubmit" novalidate>
                <div class="controls row">
                  <div class="col-lg-6">
                    <div class="form-group mb-30">
                      <input v-model="form.name" id="form_name" type="text" name="name" placeholder="Name" required />
                    </div>
                  </div>
                  <div class="col-lg-6">
                    <div class="form-group mb-30">
                      <input v-model="form.email" id="form_email" type="email" name="email" placeholder="Email" required />
                    </div>
                  </div>

                  <!-- Honeypot -->
                  <input type="text" v-model="form._gotcha" name="_gotcha" style="display:none;" />

                  <div class="col-12">
                    <div class="form-group">
                      <textarea v-model="form.message" id="form_message" name="message" placeholder="Message" rows="4" required></textarea>
                    </div>
                    <div class="mt-30 hover-this cursor-pointer">
                      <button type="submit" class="hover-anim" :disabled="submitting">
                        <span class="text">
                          <span v-if="!submitting">Let's Talk</span>
                          <span v-else>Sending…</span>
                        </span>
                      </button>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { onMounted, reactive, ref, onUnmounted } from 'vue';

const config = useRuntimeConfig()
const FORMSPREE_URL = `https://formspree.io/f/${config.public.formspreeId}`

const form = reactive({
  name: '',
  email: '',
  message: '',
  _gotcha: ''
})

const submitting = ref(false)
const responseMessage = ref('')
const responseClass = ref('')

function validate() {
  if (!form.name.trim() || !form.email.trim() || !form.message.trim()) {
    responseMessage.value = 'Please fill in all fields.'
    responseClass.value = 'alert alert-danger'
    return false
  }
  const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRe.test(form.email)) {
    responseMessage.value = 'Please enter a valid email.'
    responseClass.value = 'alert alert-danger'
    return false
  }
  return true
}

async function onSubmit() {
  responseMessage.value = ''
  responseClass.value = ''
  if (form._gotcha) return
  if (!validate()) return

  submitting.value = true
  try {
    const fd = new FormData()
    fd.append('name', form.name)
    fd.append('email', form.email)
    fd.append('message', form.message)
    fd.append('_subject', 'New landing page message from Santosh Optical website')
    fd.append('_replyto', form.email)

    const res = await fetch(FORMSPREE_URL, {
      method: "POST",
      body: fd,
      headers: { Accept: "application/json" }
    })

    if (res.ok) {
      responseMessage.value = 'Message sent successfully!'
      responseClass.value = 'alert alert-success'
      form.name = ''
      form.email = ''
      form.message = ''
    } else {
      responseMessage.value = 'Failed to send. Please try again.'
      responseClass.value = 'alert alert-danger'
    }
  } catch (err) {
    console.error(err)
    responseMessage.value = 'An error occurred.'
    responseClass.value = 'alert alert-danger'
  } finally {
    submitting.value = false
  }
}

// Handle the resize and animation setup on mount
onMounted(() => {
  handleResize();
  window.addEventListener('resize', handleResize);
});

onUnmounted(() => {
  window.removeEventListener('resize', handleResize);
})

// Function to handle resize and animation setup
function handleResize() {
  if (window.innerWidth > 991) {
    gsap.set('.contact-container', { yPercent: -50 });
    const gsapAnimation = gsap.timeline({ paused: true });
    gsapAnimation.to('.contact-container', { yPercent: 0, ease: 'none' });

    ScrollTrigger.create({
      trigger: '.main-box',
      start: 'bottom bottom',
      end: '+=50%',
      animation: gsapAnimation,
      scrub: true,
    });
  }
}
</script>
