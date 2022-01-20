<template>
  <footer>
    <p>Mede mogelijk gemaakt door:</p>
    <ul>
      <li>
        <a
          href="https://stimuleringsfonds.nl/nl/toekenningen/bovenland/"
          target="_blank"
          rel="nofollow"
        >
          <img
            src="/img/logos/stimulerings-fonds-creatieve-industrie.svg"
            alt="Stimulerings Fonds Creatieve Industrie"
          />
        </a>
      </li>
    </ul>
  </footer>
</template>

<script>
export default {
  name: "Footer",
  components: {},
};
</script>

<style lang="scss" scoped>
@import "@/assets/sass/partials/base.scss";
footer {
  text-align: center;
  color: $white;
  width: 100%;
  padding: 32px 16px 52px;
  margin-top: 48px;
  background-color: $pink;

  ul {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    align-items: center;
    li {
      padding: 1rem;
      max-width: 220px;
    }
  }
}
</style>
