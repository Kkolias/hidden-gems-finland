<template>
  <div class="component-LocationPointEditView shadow">
    <button class="blank close-icon" @click="closeEdit()"></button>
    <h2>Muokkaa kohdetta</h2>
    <div class="edit-form">
      <div class="input-wrapper">
        <label for="name"></label>
        <input type="text" id="name" placeholder="name" v-model="location.name" />
      </div>
      <div class="input-wrapper">
        <label for="city"></label>
        <input type="text" id="city" placeholder="location" v-model="location.city" />
      </div>
      <div class="input-wrapper">
        <label for="description"></label>
        <textarea
          id="description"
          placeholder="description"
          rows="10"
          v-model="location.description"
        ></textarea>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
export default {
  data: () => ({
    location: {
      name: '',
      city: '',
      description: '',
    },
  }),
  computed: {
    queryParams() {
      return this.$route?.query
    },
    selectedLocation(): number | null {
      const locationRaw = this.queryParams?.location
      if (!locationRaw) return null

      const p = Number(locationRaw)
      if (isNaN(p)) return null
      return p
    },
  },
  methods: {
    closeEdit(): void {
      this.$router.push({ query: {} })
    },
  },
}
</script>

<style lang="less" scoped>
.component-LocationPointEditView {
  padding: 24px;
  max-width: 50vw;
  width: 100%;
  height: 80vh;
  background: var(--bg-dark);
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  border-radius: 10px 10px 0 0;
  display: flex;
  flex-direction: column;
  gap: 16px;
  align-items: center;

  .close-icon {
    position: absolute;
    top: 6px;
    right: 6px;
    background-image: url('/close-icon.svg');
    background-size: contain;
    width: 30px;
    height: 30px;
  }

  input,
  textarea {
    width: 400px;
  }
  textarea {
    resize: none;
  }

  .edit-form {
    display: inline-block;
    // margin: auto;
    .input-wrapper {
      margin-bottom: 16px;
    }
  }

  @media only screen and (max-width: 1090px) {
    max-width: 80vw;
  }

  @media only screen and (max-width: 530px) {
    input, textarea {
      width: 70vw;
    }
  }
}
</style>
