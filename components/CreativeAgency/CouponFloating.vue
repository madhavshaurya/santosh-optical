<template>
  <!-- Floating Button -->
  <div class="coupon-float" @click="openModal">
    🎁 Generate Your Coupon
  </div>

  <!-- Modal -->
  <div v-if="showModal" class="coupon-overlay" @click.self="closeModal">
    <div class="coupon-modal">
      <button class="close-btn" @click="closeModal">×</button>

      <h3 class="title">Your Coupon Code</h3>

      <div v-if="loading" class="loading">
        Generating your coupon...
      </div>

      <div v-else>
        <p class="coupon-code">{{ coupon }}</p>
        <p class="hint">Show this code at Santosh Optical</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { createClient } from '@supabase/supabase-js'

/* ---------------------------
   Supabase Client (Nuxt-safe)
---------------------------- */
const config = useRuntimeConfig()

const supabase = createClient(
  config.public.supabaseUrl,
  config.public.supabaseAnonKey
)

/* ---------------------------
   State
---------------------------- */
const showModal = ref(false)
const loading = ref(false)
const coupon = ref(null)

/* ---------------------------
   Browser UUID (1 coupon/user)
---------------------------- */
let browserUUID = null

onMounted(() => {
  browserUUID = localStorage.getItem('coupon_uuid')

  if (!browserUUID) {
    browserUUID = crypto.randomUUID()
    localStorage.setItem('coupon_uuid', browserUUID)
  }
})

/* ---------------------------
   UI Handlers
---------------------------- */
const openModal = async () => {
  showModal.value = true
  await generateOrFetchCoupon()
}

const closeModal = () => {
  showModal.value = false
}

/* ---------------------------
   Coupon Logic
---------------------------- */
const generateOrFetchCoupon = async () => {
  loading.value = true

  try {
    // 1️⃣ Check if coupon already exists for this browser
    const { data: existing, error } = await supabase
      .from('coupons')
      .select('coupon_code')
      .eq('browser_uuid', browserUUID)
      .single()

    if (existing && !error) {
      coupon.value = existing.coupon_code
      loading.value = false
      return
    }

    // 2️⃣ Generate new coupon securely using CSPRNG
    const randomBytes = new Uint8Array(5)
    crypto.getRandomValues(randomBytes)
    const randomChars = Array.from(randomBytes)
      .map(b => (b % 36).toString(36))
      .join('')
      .toUpperCase()

    const newCoupon = 'SANTOSH-' + randomChars

    await supabase.from('coupons').insert({
      coupon_code: newCoupon,
      browser_uuid: browserUUID
    })

    coupon.value = newCoupon
  } catch (err) {
    console.error('Coupon error:', err)
    coupon.value = 'ERROR'
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>
/* Floating Button */
.coupon-float {
  position: fixed;
  right: 20px;
  bottom: 20px;
  background: #000;
  color: #fff;
  padding: 14px 20px;
  border-radius: 30px;
  font-size: 14px;
  cursor: pointer;
  z-index: 9999;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.25);
  transition: transform 0.2s ease;
}
.coupon-float:hover {
  transform: translateY(-2px);
}

/* Overlay */
.coupon-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.6);
  z-index: 10000;
  display: flex;
  align-items: center;
  justify-content: center;
}

/* Modal */
.coupon-modal {
  background: #fff;
  padding: 30px 26px;
  border-radius: 16px;
  width: 320px;
  text-align: center;
  position: relative;
}

/* Close Button */
.close-btn {
  position: absolute;
  top: 10px;
  right: 14px;
  border: none;
  background: none;
  font-size: 22px;
  cursor: pointer;
}

/* Text */
.title {
  margin-bottom: 20px;
  font-weight: 600;
}

.coupon-code {
  font-size: 24px;
  font-weight: 700;
  letter-spacing: 1px;
  margin-bottom: 10px;
}

.hint {
  font-size: 13px;
  color: #666;
}

.loading {
  font-size: 14px;
}
</style>
