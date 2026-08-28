<template>
  <CommonLoader />
  <div id="smooth-wrapper">
    <CommonNavbar />
    <CommonMenu />
    <div id="smooth-content">
      <main class="main-bg">
        <section class="verify-section section-padding">
          <div class="container">
            <div class="row justify-content-center">
              <div class="col-lg-6">
                <div class="sec-head text-center mb-60">
                  <span class="sub-title mb-15 opacity-8">- Admin Panel</span>
                  <h3 class="text-u fz-50">Coupon Verify.</h3>
                </div>

                <div class="verify-card p-40 mb-80" style="background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.1); border-radius: 15px;">
                  <div class="form-group mb-30">
                    <label class="fz-12 text-u mb-10 opacity-7">Coupon Code</label>
                    <input
                      v-model="couponInput"
                      type="text"
                      placeholder="ENTER COUPON CODE"
                      class="text-center text-u fz-20 fw-700"
                      style="background: transparent; border: 1px solid rgba(255,255,255,0.1); color: #fff; padding: 15px; width: 100%; border-radius: 5px;"
                      @keyup.enter="verifyCoupon"
                    />
                  </div>

                  <div class="row gx-2">
                    <div class="col-12 mb-20">
                      <div class="hover-this cursor-pointer w-100">
                        <button 
                          class="w-100 p-15 text-u fz-14 fw-600" 
                          style="background: #fff; color: #000; border: none; border-radius: 5px;"
                          @click="verifyCoupon" 
                          :disabled="loading"
                        >
                          <span v-if="!loading">Verify Coupon</span>
                          <span v-else>Checking...</span>
                        </button>
                      </div>
                    </div>

                    <div class="col-md-6 mb-10" v-if="couponData">
                      <button 
                        class="w-100 p-12 text-u fz-12 fw-600" 
                        style="background: #2e7d32; color: #fff; border: none; border-radius: 5px;"
                        @click="updateStatus(true)" 
                        :disabled="couponData.is_used || actionLoading"
                        :style="{ opacity: (couponData.is_used || actionLoading) ? 0.3 : 1 }"
                      >
                        Mark as Used
                      </button>
                    </div>

                    <div class="col-md-6 mb-10" v-if="couponData">
                      <button 
                        class="w-100 p-12 text-u fz-12 fw-600" 
                        style="background: transparent; color: #fff; border: 1px solid rgba(255,255,255,0.3); border-radius: 5px;"
                        @click="updateStatus(false)" 
                        :disabled="!couponData.is_used || actionLoading"
                        :style="{ opacity: (!couponData.is_used || actionLoading) ? 0.3 : 1 }"
                      >
                        Reset (Reuse)
                      </button>
                    </div>
                  </div>

                  <div v-if="message" :class="['mt-30 text-center p-15 radius-5', messageClass]">
                    <span class="fz-14 fw-600">{{ message }}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <CommonFooter1 :subBg="true" />
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const supabase = useSupabase()

const couponInput = ref('')
const couponData = ref(null)
const message = ref('')
const messageType = ref('info')
const loading = ref(false)
const actionLoading = ref(false)

// Page Head
useHead({
  title: 'Coupon Verification',
  bodyAttrs: {
    class: 'main-bg'
  },
  script: [
    { src: "/assets/js/smoother-script.js", defer: true }
  ]
})

const messageClass = computed(() => {
  if (messageType.value === 'success') return 'bg-success-subtle text-success border border-success'
  if (messageType.value === 'error') return 'bg-danger-subtle text-danger border border-danger'
  return 'bg-secondary-subtle text-light border border-secondary'
})

const verifyCoupon = async () => {
  if (loading.value) return
  
  message.value = ''
  couponData.value = null
  loading.value = true

  const code = couponInput.value.trim().toUpperCase()
  if (!code) {
    message.value = 'Please enter a coupon code.'
    messageType.value = 'error'
    loading.value = false
    return
  }

  try {
    const { data, error } = await supabase
      .from('coupons')
      .select('*')
      .eq('coupon_code', code)
      .maybeSingle()

    if (error) throw error

    if (!data) {
      message.value = '❌ Invalid coupon code. This coupon does not exist.'
      messageType.value = 'error'
    } else {
      couponData.value = data
      if (data.is_used) {
        message.value = '⚠️ This coupon has already been used.'
        messageType.value = 'error'
      } else {
        message.value = '✅ Success! This coupon is VALID and available.'
        messageType.value = 'success'
      }
    }
  } catch (err) {
    console.error(err)
    message.value = 'Error connecting to database.'
    messageType.value = 'error'
  } finally {
    loading.value = false
  }
}

const updateStatus = async (status) => {
  if (!couponData.value || actionLoading.value) return

  actionLoading.value = true
  const { error } = await supabase
    .from('coupons')
    .update({ is_used: status })
    .eq('coupon_code', couponData.value.coupon_code)

  if (error) {
    console.error('Coupon update error:', error)
    message.value = 'Error updating coupon status. Please try again.'
    messageType.value = 'error'
  } else {
    couponData.value.is_used = status
    message.value = status ? '✅ Coupon marked as USED.' : '✅ Coupon has been RESET and can be used again.'
    messageType.value = 'success'
  }
  actionLoading.value = false
}
</script>

<style scoped>
.verify-section {
  min-height: 80vh;
}

.bg-success-subtle { background-color: rgba(46, 125, 50, 0.1) !important; color: #4caf50 !important; }
.bg-danger-subtle { background-color: rgba(211, 47, 47, 0.1) !important; color: #ef5350 !important; }
.bg-secondary-subtle { background-color: rgba(255, 255, 255, 0.05) !important; }

button:disabled {
  cursor: not-allowed;
}

input:focus {
  outline: none;
  border-color: rgba(255,255,255,0.4) !important;
}

.bord-box {
  border: 1px solid rgba(255, 255, 255, 0.1);
}
</style>
