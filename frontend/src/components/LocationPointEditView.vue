<template>
  <div class="component-LocationPointEditView shadow" :class="{ small: !isState('form') }">
    <button class="blank close-icon no-shadow" @click="closeEdit()"></button>
    <button
      v-if="isState('location')"
      class="blank circle back-icon"
      @click="handleSetState('form')"
    ></button>
    <h2>{{ title }}</h2>
    <div class="form-wrapper" v-if="isState('form')">
      <div class="edit-form">
        <div class="input-wrapper">
          <label for="name"></label>
          <input ref="inputName" type="text" id="name" placeholder="name" v-model="location.name" />
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
      <button class="save-btn" @click="handleSetState('location')">Select location on map</button>
    </div>
    <button v-if="isState('location')" class="save-btn" @click="submit()">{{ submitText }}</button>
    <div class="success" v-if="isState('success')">
      <p>{{ successText }}</p>
    </div>
    <div class="error-container" v-if="isState('error')">
      <p class="error">Unexpected error occured on saving location. Try again later</p>
    </div>
  </div>
</template>

<script lang="ts">
import { DEFAULT_POINT } from '../constants/map.const'
import type { LocationPoint } from '../types/location-points'
import api from '../utils/api'

export default {
  props: {
    selectedLocation: {
      type: Object as () => LocationPoint | null,
      default: () => ({}),
    },
    selectedLocationPosition: {
      type: Object as () => { latitude: number; longitude: number },
      default: () => ({}),
    },
  },
  emits: ['locationCreated', 'locationUpdated'],
  data: () => ({
    location: {
      name: '',
      city: '',
      description: '',
      latitude: null,
      longitude: null,
    } as unknown as Partial<LocationPoint>,

    state: 'form' as 'form' | 'location' | 'success' | 'error',

    showSuccess: false,
  }),
  computed: {
    title(): string {
      if (this.isState('location')) return 'Select location on map'
      if (this.selectedLocationId) return 'Edit location'
      return 'Create new location'
    },
    submitText(): string {
      if (this.selectedLocationId) return 'Confirm & Save'
      return 'Confirm & Create'
    },
    successText(): string {
      if (this.selectedLocationId) return 'Location updated succesfully!'
      return 'New location created! Thanks for sharing your spot! :)'
    },
    queryParams() {
      return this.$route?.query
    },
    locationId(): string {
      return (this.queryParams?.location as string) || ''
    },
    selectedLocationId(): number | null {
      const locationRaw = this.queryParams?.location
      if (!locationRaw) return null

      const p = Number(locationRaw)
      if (isNaN(p)) return null
      return p
    },
  },
  mounted() {
    this.setInitial()
    setTimeout(() => {
      const nameInput: HTMLInputElement = this.$refs.inputName as HTMLInputElement
      if (nameInput) nameInput.focus()
    }, 300)
  },
  watch: {
    selectedLocationPosition: {
      handler() {
        this.setLocationPosition()
      },
      immediate: true,
    },
  },
  methods: {
    async submit(): Promise<void> {
      console.log('SAVING', this.location)
      try {
        if (!this.selectedLocationId) {
          const newPoint = await api.createLocation(this.location)
          this.$emit('locationCreated', newPoint)
        } else {
          const updatedPoint = await api.updateLocation(this.location)
          this.$emit('locationUpdated', updatedPoint)
        }
        this.handleSuccess()
      } catch (e) {
        this.showError()
      }
    },
    setInitial(): void {
      if (this.selectedLocationId) {
        this.location = {
          id: this.selectedLocationId,
          name: this.selectedLocation?.name || '',
          city: this.selectedLocation?.city || '',
          description: this.selectedLocation?.description || '',
          latitude: this.selectedLocation?.latitude || DEFAULT_POINT.LATITUDE,
          longitude: this.selectedLocation?.longitude || DEFAULT_POINT.LONGITUDE,
        }
      }
    },
    setLocationPosition(): void {
      if (!this.selectedLocationPosition?.latitude) return

      const latitude = this.selectedLocationPosition?.latitude
      const longitude = this.selectedLocationPosition?.longitude

      this.location = {
        ...this.location,
        latitude,
        longitude,
      }
    },
    closeEdit(): void {
      this.$router.push({ query: {} })
    },

    handleSuccess(): void {},
    showError(): void {},
    handleSetState(val: 'form' | 'location'): void {
      this.setState(val)
      if (this.isState('form')) {
        const query = Object.assign({}, this.queryParams)
        delete query['select-location']
        this.$router.replace({ query })
      } else {
        this.$router.push({
          query: {
            ...this.queryParams,
            'select-location': 'true',
          },
        })
      }
    },
    setState(val: 'form' | 'location' | 'success' | 'error'): void {
      this.state = val
    },

    isState(val: 'form' | 'location' | 'success' | 'error'): boolean {
      return this.state === val
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
  transition: height 0.3s ease-in;

  &.small {
    height: 15vh;
  }

  .close-icon {
    position: absolute;
    top: 6px;
    right: 6px;
    background-image: url('/close-icon.svg');
    background-size: contain;
    width: 30px;
    height: 30px;
  }
  .back-icon {
    position: absolute;
    top: 24px;
    left: 24px;

    &:after {
      content: '';
      display: block;
      width: 22px;
      height: 22px;
      background-image: url('/arrow-white.svg');
      background-repeat: no-repeat;
      background-size: 22px;
      background-position: center;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%) rotate(-90deg);
    }
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
  .form-wrapper {
    display: flex;
    flex-direction: column;
    align-items: center;
    .save-btn {
    }
  }

  @media only screen and (max-width: 1090px) {
    max-width: 80vw;
  }

  @media only screen and (max-width: 530px) {
    input,
    textarea {
      width: 70vw;
    }
  }
}
</style>
