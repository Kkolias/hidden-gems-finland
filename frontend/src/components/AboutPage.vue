<template>
  <div class="component-AboutPage">
    <h1>About Hidden Gems Finland</h1>
    <div class="about-section">
      <p>
        This project is a modern reimagining of the original Hidden Finland Map — a community-driven
        map where people can share their favorite hidden places across Finland.
      </p>
      <p>
        The idea itself is not new. It was originally created by Jaakko Keso through a simple
        Blogspot page, which gathered a collection of unique and lesser-known locations submitted by
        the community. That project proved there is real interest in discovering places beyond the
        typical tourist spots.
      </p>
      <p>
        This version was built to improve the experience: a cleaner interface, better usability, and
        a more scalable foundation for the future. The goal is to keep the original spirit intact —
        an open map for everyone — while making it easier to explore, contribute, and grow.
      </p>
      <p>
        All credit for the original concept goes to
        <a href="https://www.instagram.com/ug_keso/" target="_blank" rel="noopener noreferrer"
          ><b>Jaakko Keso</b></a
        >
        and the original
        <a href="https://hiddenfinlandmap.blogspot.com/" target="_blank" rel="noopener noreferrer"
          ><b>Hidden Finland Map</b></a
        >. This project exists as an evolution of that idea, not a replacement.
      </p>
    </div>
  </div>
</template>

<script lang="ts">
export default {}
</script>

<style lang="less" scoped>
.component-AboutPage {
  padding: 24px;
  padding-top: 70px;

  .about-section {
    max-width: 800px;
    margin: auto;
    margin-top: 42px;
    line-height: 1.6;

    p {
      margin: 16px 0;
    }
  }

  @media (max-width: 600px) {
    h1 {
      font-size: 3.6rem;
    }
  }
}
</style>
