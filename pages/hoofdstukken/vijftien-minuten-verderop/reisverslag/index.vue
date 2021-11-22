<template>
  <div>
    <!-- Intro afbeelding -->
    <div class="header-image story-header-image">
      <video
        src="https://files.boven.land/video/oosterwold-1080.mp4"
        autoplay muted loop
      />
    </div>

    <StoryPage>
      <section>
        <label>Hoofdstuk 2</label>
        <h1>Vijftien minuten verderop</h1>

        <p class="intro">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Ab, maiores illo! Nam atque, sapiente obcaecati, totam eaque sint, quam pariatur modi labore molestias unde. Aperiam sunt quaerat veritatis quasi harum?
        </p>

        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Ab, maiores illo! Nam atque, sapiente obcaecati, totam eaque sint, quam pariatur modi labore molestias unde. Aperiam sunt quaerat veritatis quasi harum?
        </p>

        <VideoContainer video="n384">
          <h3>titel van video</h3>
          <p>Omschrijving!</p>
        </VideoContainer>

        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Ab, maiores illo! Nam atque, sapiente obcaecati, totam eaque sint, quam pariatur modi labore molestias unde. Aperiam sunt quaerat veritatis quasi harum?
        </p>
      </section>
    </StoryPage>
  </div>
</template>

<script>
import StoryPage from './../../../../components/pages/Story'
import VideoContainer from './../../../../components/elements/VideoContainer'

export default {
  transition: 'story',
  components: {
    StoryPage,
    VideoContainer
  }
}
</script>
