<template>
  <div class="drippy-avatar-scene">
    <div class="scene-wrapper">
      <div class="scene-background-container">
        <img :src="sceneMap[scene]" class="scene-background" />
      </div>
      <div class="drippy-content">
        <img src="/assets/drippy_base.png" class="base-avatar" alt="Drippy Avatar" />
        <img v-if="actionOverlay" :src="actionOverlay" class="overlay-avatar" />
        <div class="speech-bubble" v-if="message">
          {{ message }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "DrippyAvatar",
  props: {
    scene: {
      type: String,
      default: "kitchen",
    },
    mood: String,
    action: String,
    message: String,
  },
  computed: {
    sceneMap() {
      return {
        kitchen: "/assets/bg_kitchen.png",
        bathroom: "/assets/bg_bathroom.png",
        garage: "/assets/bg_garage.png",
        laundry: "/assets/bg_laundry.png",
        outside: "/assets/bg_outside.png",
      };
    },
    actionOverlay() {
      const overlays = {
        pointing: "/assets/overlay_pointing.svg",
        sweating: "/assets/overlay_sweating.svg",
        celebrating: "/assets/overlay_celebrating.svg",
        typing: "/assets/overlay_typing.svg",
        plunging: "/assets/overlay_plunging.svg",
      };
      return overlays[this.action] || null;
    },
  },
};
</script>

<style scoped>
.drippy-avatar-scene {
  position: relative;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  background-color: #0e1320;
  display: flex;
  align-items: center;
  justify-content: center;
}

.scene-wrapper {
  position: relative;
  width: 100%;
  max-width: 100vw;
  max-height: 100vh;
  aspect-ratio: 16 / 9;
  overflow: hidden;
}

.scene-background-container {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1;
}

.scene-background {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

.drippy-content {
  position: absolute;
  bottom: 0;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  z-index: 2;
  padding-bottom: 40px;
}

.base-avatar {
  width: 15vmin;
  height: auto;
  display: block;
}

.overlay-avatar {
  position: absolute;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  height: 200px;
  z-index: 3;
}

.speech-bubble {
  margin-top: 16px;
  background: rgba(0, 0, 0, 0.75);
  color: #00eaff;
  padding: 10px 16px;
  border-radius: 12px;
  font-weight: bold;
  max-width: 300px;
  text-align: center;
}
</style>