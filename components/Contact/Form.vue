<template>
  <section class="contact section-padding">
    <div class="container">
      <div class="row justify-content-center">
        <div class="col-lg-8">
          <div class="full-width">
            <div class="sec-head text-center mb-80">
              <span class="sub-title mb-15 opacity-8">- Contact Us</span>
              <h3 class="text-u fz-50">Get In Touch.</h3>
            </div>

            <!-- messages will be rendered here safely -->
            <div v-if="responseMessage" class="messages">
              <div :class="['alert', responseType === 'success' ? 'alert-success' : 'alert-danger']">
                {{ responseMessage }}
              </div>
            </div>

            <!-- form -->
            <form id="contact-form" @submit.prevent="onSubmit" novalidate>
              <div class="controls row">
                <div class="col-lg-6">
                  <div class="form-group mb-30">
                    <input
                      v-model="form.name"
                      id="form_name"
                      type="text"
                      name="name"
                      placeholder="Name"
                      required
                    />
                  </div>
                </div>

                <div class="col-lg-6">
                  <div class="form-group mb-30">
                    <input
                      v-model="form.email"
                      id="form_email"
                      type="email"
                      name="email"
                      placeholder="Email"
                      required
                    />
                  </div>
                </div>

                <!-- honeypot field (hidden) to trap bots -->
                <input type="text" name="_gotcha" v-model="form._gotcha" style="display:none" />

                <div class="col-12">
                  <div class="form-group">
                    <textarea
                      v-model="form.message"
                      id="form_message"
                      name="message"
                      placeholder="Message"
                      rows="4"
                      required
                    ></textarea>
                  </div>

                  <div class="text-center">
                    <div class="mt-30 hover-this cursor-pointer">
                      <button
                        type="submit"
                        
                        :disabled="submitting"
                      >
                        <span class="text">
                          <span v-if="!submitting">Let's Talk</span>
                          <span v-else>Sending…</span>
                        </span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </form>

          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { reactive, ref } from 'vue'

// --- CONFIG: Formspree endpoint from runtimeConfig ---
const config = useRuntimeConfig()
const FORMSPREE_URL = `https://formspree.io/f/${config.public.formspreeId}`

// reactive form model
const form = reactive({
  name: '',
  email: '',
  message: '',
  _gotcha: '' // honeypot
})

const responseMessage = ref('')
const responseType = ref('success') // 'success' | 'danger'
const submitting = ref(false)

// basic client-side validation
function validate() {
  if (!form.name.trim() || !form.email.trim() || !form.message.trim()) {
    responseMessage.value = 'Please fill in all required fields.'
    responseType.value = 'danger'
    return false
  }
  // simple email regex
  const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRe.test(form.email)) {
    responseMessage.value = 'Please enter a valid email address.'
    responseType.value = 'danger'
    return false
  }
  return true
}

async function onSubmit() {
  // clear previous message
  responseMessage.value = ''

  // prevent bot submission via honeypot
  if (form._gotcha) {
    // silently ignore
    responseMessage.value = 'Spam detected.'
    responseType.value = 'danger'
    return
  }

  if (!validate()) return

  submitting.value = true

  try {
    const fd = new FormData()
    fd.append('name', form.name)
    fd.append('email', form.email)
    fd.append('message', form.message)
    // optional hidden fields for Formspree behavior:
    fd.append('_subject', 'New message from Santosh Optical website')
    // _replyto is honored by Formspree if present; we'll include visitor email
    fd.append('_replyto', form.email)

    const res = await fetch(FORMSPREE_URL, {
      method: 'POST',
      body: fd,
      headers: {
        Accept: 'application/json'
      }
    })

    const json = await res.json().catch(() => ({}))

    if (res.ok) {
      responseMessage.value = 'Message sent — thank you! We will get back to you shortly.'
      responseType.value = 'success'
      // clear form
      form.name = ''
      form.email = ''
      form.message = ''
    } else {
      // Formspree returns { error: "..." } for validation errors
      // Use text binding to avoid XSS if API response string contains malicious markup
      const err = json?.error || 'Submission failed. Please try again later.'
      responseMessage.value = err
      responseType.value = 'danger'
    }
  } catch (err) {
    console.error(err)
    responseMessage.value = 'An error occurred while sending your message. Please try again later.'
    responseType.value = 'danger'
  } finally {
    submitting.value = false
  }
}
</script>
