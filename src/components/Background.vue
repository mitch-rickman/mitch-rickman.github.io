<template>
  <div class="background">

  </div>
</template>

<script>
export default {
  name: 'background',
  data () {
    return {
      current: 0,
      backgrounds: [
        '#f85032',
        '#e73827',
        '#f79d00',
        '#64f38c',
        '#cb2d3e',
        '#ef473a'
      ]
    }
  },
  mounted () {
    this.updateBackground()
    this.initBackgroundTimer()
  },
  methods: {
    setBackgroundColor (leftColor, rightColor) {
      this.$el.style.background = `linear-gradient(to right, ${leftColor}, ${rightColor})`
    },

    initBackgroundTimer () {
      setTimeout(() => {
        this.current = (this.current + 1) % (this.backgrounds.length - 1)
        this.updateBackground()

        this.initBackgroundTimer()
      }, 500)
    },

    updateBackground () {
      this.setBackgroundColor(this.backgrounds[this.current], this.backgrounds[this.current + 1])
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.background {
  position: fixed;
  z-index: -1;
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
  transition: .5s ease;
}
</style>
