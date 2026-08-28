<template>
  <div class="comments-from section-padding sub-bg">
    <div class="container">
      <div class="row justify-content-center">
        <div class="col-lg-10">
          <div class="text-center mb-60">
            <h3>Leave a comment</h3>
          </div>
        </div>
      </div>

      <div class="row justify-content-center">
        <div class="col-lg-10">
          <div v-if="responseMessage" class="messages">
            <div :class="['alert', isSuccess ? 'alert-success' : 'alert-danger']">
              {{ responseMessage }}
            </div>
          </div>

          <form id="comment-form" @submit.prevent="onSubmit" novalidate>
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
                    <button type="submit" :disabled="submitting">
                      <span class="text">
                        <span v-if="!submitting">Post <br /> Comment</span>
                        <span v-else>Posting…</span>
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
</template>

<script setup>
import { reactive, ref } from 'vue'

// --- CONFIG: Formspree endpoint from runtimeConfig ---
const config = useRuntimeConfig()
const FORMSPREE_URL = `https://formspree.io/f/${config.public.formspreeId}`

// state
const form = reactive({
  name: "",
  email: "",
  message: "",
  _gotcha: "" // honeypot
})

const responseMessage = ref("")
const isSuccess = ref(false)
const submitting = ref(false)

function validate() {
  if (!form.name.trim() || !form.email.trim() || !form.message.trim()) {
    responseMessage.value = 'Please fill in all fields.'
    isSuccess.value = false
    return false
  }
  const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRe.test(form.email)) {
    responseMessage.value = 'Please enter a valid email address.'
    isSuccess.value = false
    return false
  }
  return true
}

async function onSubmit() {
  responseMessage.value = ""
  isSuccess.value = false

  // Honeypot trap
  if (form._gotcha) {
    responseMessage.value = 'Spam detected.'
    isSuccess.value = false
    return
  }

  if (!validate()) return

  submitting.value = true

  try {
    const fd = new FormData()
    fd.append("name", form.name)
    fd.append("email", form.email)
    fd.append("message", form.message)
    fd.append("_subject", "New blog comment on Santosh Optical website")
    fd.append("_replyto", form.email)

    const res = await fetch(FORMSPREE_URL, {
      method: "POST",
      body: fd,
      headers: { Accept: "application/json" }
    })

    const json = await res.json().catch(() => ({}))

    if (res.ok) {
      responseMessage.value = 'Your comment has been posted successfully.'
      isSuccess.value = true
      form.name = ""
      form.email = ""
      form.message = ""
    } else {
      const err = json?.error || "Something went wrong. Please try again."
      responseMessage.value = String(err)
      isSuccess.value = false
    }

  } catch (error) {
    console.error(error)
    responseMessage.value = 'An error occurred. Please try again later.'
    isSuccess.value = false
  } finally {
    submitting.value = false
  }
}
</script>
