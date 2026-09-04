<template>
  <ClientOnly>
    <div class="coupon-root">
      <!-- Floating Button -->
      <div class="coupon-float" @click="handleClick">
        🎁 Generate Your Coupon
      </div>

      <!-- Modal -->
      <div v-if="showModal" class="coupon-overlay" @click.self="closeModal">
        <div class="coupon-modal">
          <button class="close" @click="closeModal">×</button>

          <h3>Your Coupon Code</h3>

          <div v-if="loading" class="loading">
            Generating coupon…
          </div>

          <div v-else-if="coupon" class="coupon-container">
            <p class="code">{{ coupon }}</p>
            <div class="copy-box" @click="copyToClipboard">
              <span v-if="!copied">📋 Copy Code</span>
              <span v-else>✅ Copied!</span>
            </div>
            <p class="hint">Show this code at Santosh Optical</p>
          </div>

          <div v-else class="loading">
            Unable to generate coupon
          </div>
        </div>
      </div>
    </div>
  </ClientOnly>
</template>

<script setup>
import { ref, onMounted, nextTick } from 'vue'

/* -----------------------------
   State
------------------------------ */
const showModal = ref(false)
const loading = ref(false)
const coupon = ref('')
const copied = ref(false)

let supabase = null
let browserUUID = null

/* -----------------------------
   Client-only init
------------------------------ */
onMounted(() => {
  supabase = useSupabase()

  browserUUID = localStorage.getItem('coupon_uuid')
  if (!browserUUID) {
    browserUUID = crypto.randomUUID()
    localStorage.setItem('coupon_uuid', browserUUID)
  }
})

/* -----------------------------
   UI Handlers
------------------------------ */
const handleClick = async () => {
  showModal.value = true
  await getOrCreateCoupon()
}

const closeModal = () => {
  showModal.value = false
  copied.value = false
}

const copyToClipboard = () => {
  if (!coupon.value) return
  navigator.clipboard.writeText(coupon.value)
  copied.value = true
  setTimeout(() => {
    copied.value = false
  }, 2000)
}

/* -----------------------------
   Coupon Logic
------------------------------ */
const getOrCreateCoupon = async () => {
  if (!supabase || !browserUUID) return

  loading.value = true
  coupon.value = ''

  try {
    // 1️⃣ Fetch existing coupon
    const { data } = await supabase
      .from('coupons')
      .select('coupon_code')
      .eq('browser_uuid', browserUUID)
      .maybeSingle()

    if (data?.coupon_code) {
      coupon.value = data.coupon_code
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

    const { error } = await supabase.from('coupons').insert({
      coupon_code: newCoupon,
      browser_uuid: browserUUID
    })

    if (error) throw error

    await nextTick()
    coupon.value = newCoupon
  } catch (err) {
    console.error('Coupon error:', err)
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>
/* ===============================
   ISOLATED COUPON UI
   (Theme-safe)
================================ */

.coupon-root {
  all: initial;
}

/* Floating Button */
.coupon-float {
  position: fixed;
  bottom: 20px;
  right: 20px;
  background: #000;
  color: #fff;
  padding: 14px 20px;
  border-radius: 30px;
  cursor: pointer;
  z-index: 99999;
  font-family: Arial, sans-serif;
  font-size: 14px;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.3);
}

/* Overlay */
.coupon-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.7);
  z-index: 100000;
  display: flex;
  align-items: center;
  justify-content: center;
}

/* Modal */
.coupon-modal {
  background: #ffffff;
  color: #000;
  padding: 30px;
  border-radius: 16px;
  width: 320px;
  text-align: center;
  font-family: Arial, sans-serif;
  position: relative;
}

/* Close Button */
.close {
  position: absolute;
  top: 10px;
  right: 14px;
  background: none;
  border: none;
  font-size: 22px;
  cursor: pointer;
  color: #000;
}

/* Text */
.coupon-modal h3 {
  font-size: 20px;
  font-weight: 700;
  margin-bottom: 20px;
}

.code {
  font-size: 26px;
  font-weight: 800;
  color: #000;
  background: #f2f2f2;
  padding: 12px;
  border-radius: 8px;
  margin-bottom: 10px;
  letter-spacing: 1px;
}

.copy-box {
  cursor: pointer;
  font-size: 13px;
  background: #000;
  color: #fff;
  display: inline-block;
  padding: 6px 12px;
  border-radius: 4px;
  margin-bottom: 15px;
  transition: all 0.3s;
}

.copy-box:hover {
  background: #333;
}

.hint {
  font-size: 13px;
  color: #333;
}

.loading {
  font-size: 14px;
  color: #555;
}
</style>
