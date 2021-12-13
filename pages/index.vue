<template>
  <div class="page home-page">
    <div class="intro">
      Een visuele en cartografische ontdekkingsreis waarin we onderzoeken wat
      Nederland tot Nederland maakt.
    </div>

    <div class="header-image story-header-image">
      <Video id="stadskanaal" />
    </div>

    <div class="container column">
      <!-- Wat is boven.land? -->
      <label>Het project</label>
      <h3 id="project">Wat is Boven.land?</h3>
      <p>
        Nederland is klein en geordend. Aanvliegend op ons land is dit je uitzicht: een pannenkoek van rechthoekige polders, waar sloten doorheen snijden, landbouwgrond, natuurgebieden, water. De grillige vormpjes van dorpen, afgewisseld door de grote variant: de stad, met voorsteden en Vinex-wijken. Het patroon van de snelwegen ligt als een web over ons land, met grote hoekige blokken van kassen data- en distributiecentra ernaast.
      </p>

      <p>
        Waarom ons land er zo uitziet, vragen de meesten van ons zich niet dagelijks af. We zijn ons niet zo bewust van de invloed die regelgeving en ons gedrag heeft op het uiterlijk van het ons omringende landschap. De ruimte in Nederland is beperkt en we delen hem met velen. Regulering van het gebruik is daarom noodzaak en wordt urgenter naarmate we onze ruimte intensiever gebruiken. De Rijksbouwmeesters doen een oproep om meer toezicht te houden op hoe we ons land inrichten en wie daarover beslist, de roep om een minister ruimtelijke ordening klinkt. Er zijn dan ook veel urgente thema’s die invloed hebben op onze omgeving: de energietransitie, CO<sub>2</sub>-uitstoot, de verdichting om er slechts een paar te noemen. Maar ook minder voordehandliggende vragen als: waar kopen we, hoe lopen we, waar is het in Nederland nog stil, hoe ver kunnen we nog zien of wat is het meest afgelegen punt in Nederland?
      </p>

      <p>
        In Boven.land stellen wij deze vragen, de meest urgente afgewisseld met wat misschien op het eerste oog triviaal lijkt, maar bij nadere beschouwing bijzonder belangrijk. Boven.land is een ontdekkingsreis door het Nederlandse landschap, aan de hand van cartografie, tekst en (drone)beeld. Wij, Bert Spaan en Jenny Smets, vertellen de verhalen. Verhalen over ons land en over de ruimtelijke ordening. Dat doen we vanuit vanuit onze achtergrond: Jenny maakt beeldverhalen en Bert is cartograaf en digital designer. We reizen af naar opvallende plekken in het Nederlandse landschap. Of naar alledaagse plekken die we met andere ogen bekijken. We brengen in kaart hoe ons dagelijkse gedrag: consumptie, reizen, werk, vrije tijd, sporen nalaat in onze omgeving. We bieden ons publiek een nieuw en verrassend perspectief.
      </p>

      <!-- Hoofdstukken -->
      <FoldDownMenu v-bind:children="chapters" collapsible="false">
        <template v-slot:waar-we-winkelen>
          <p>
            Ons eerste hoofdstuk gaat over een actueel thema tijdens de huidige pandemie: Waar we Winkelen. Door de toename van online verkoop van goederen, gefaciliteerd door gigantische distributiecentra verspreid door heel Nederland, verandert zowel het Nederlandse landschap als de binnensteden, dorpskernen en hun randen. Een ontwikkeling die is versnelt onder invloed van Covid-19. Niet alleen kopen Nederlanders meer van achter het scherm, ze willen hun producten ook steeds sneller en goedkoper ontvangen. In dit hoofdstuk brengen we de gevolgen van deze ontwikkeling in kaart. We laten zien waar de grote distributiecentra momenteel staan.
          </p>
          <p>
            Ook onderzoeken we de leegloop van de winkelstraten in Nederlandse steden. Waar zien we dit fenomeen het meest, en waarom?
          </p>
          <p>
          We kijken naar het gedrag van de Nederlandse consument, en hoe dit gedrag zich heeft ontwikkeld. Winkelen is meer dan de activiteit van  het kopen van noodzakelijke producten. Het is voor veel Nederlanders een dagje uit, een beleving voor het hele gezin. De bereikbaarheid van de winkel, het parkeergemak, de grote en de hoeveelheid extra -luxe- voorzieningen, dat alles speelt een rol in de keuze van Waar We Winkelen.
          </p>
        </template>

        <template v-slot:vijftien-minuten-verderop>
          <p>
            ‘Vijftien minuten verderop’ is onder andere geïnspireerd op de  15-minute city: een stad waar alle voorzieningen — winkels, scholen, cafés — binnen 15 minuten fietsen te bereiken zijn. Veel Amerikaanse steden, bijvoorbeeld, zijn het tegenovergestelde: iedereen woont in suburbs, zonder enige voorzieningen, en de enige manier om je te verplaatsen is de auto. Zelfs stoepen zijn er nauwelijks.
          <p>
          <p>
            Dezelfde uitgangspunten als in de 15-minute city zijn te gebruiken om dorpen en het platteland te onderzoeken: wat kom je tegen aan voorzieningen als je vanuit de plek waar je woont 15 minuten fietst? In het hoofdstuk Waar we winkelen zagen we dat in veel kleine dorpen geen enkele winkel meer overblijft. Dit heeft invloed op de aantrekkelijkheid van een gebied en op de sociale cohesie. Als de auto als het enige vervoermiddel overblijft, wordt het aantal toevallige ontmoetingen minder.
          </p>
        </template>
      </FoldDownMenu>

      <!-- Wie maken boven.land? -->
      <h3 id="over-ons">Wie maken boven.land?</h3>

      <!-- Profielen -->
      <ul class="profiles">
        <li>
          <DotMask>
            <nuxt-img src="/img/jenny-smets.jpg" />
          </DotMask>
          <h2>Jenny Smets</h2>
          <p>Visuele verhalen &amp; verbeelding</p>
        </li>
        <li>
          <DotMask>
            <nuxt-img src="/img/bert-spaan.jpg" />
          </DotMask>
          <h2>Bert Spaan</h2>
          <p>Cartografie, data &amp; technologie</p>
        </li>
      </ul>

      <h3 id="contact">Contact</h3>

        <!-- Jenny  houdt van het maken van verhalen, en vooral van verhalen verteld met beeld. Deze liefde vormt de rode draad in haar carrière. Verhalen die ze vertelt met materiaal van anderen; fotografen, kunstenaars en andere creatieven. Meestal is het beeld fotografie, maar ook bewegend beeld, interactieve projecten, installaties of andersoortig (digitaal) beeld en kunstprojecten kunnen hier deel van zijn.
        Jenny  werkt in de kunst en in de media. In beide omgevingen probeert ze een breed publiek te vinden. Haar podium kan de tentoonstellingsruimte zijn, een (online) publicatie met beeld en tekst, of een presentatie in de vorm van een lezing. In veel gevallen hebben de verhalen een maatschappelijke relevante inhoud en is documentaire fotografie het voornaamste bestanddeel.
        Jenny studeerde Kunstgeschiedenis aan de Universiteit van Amsterdam en werkte voor diverse organisaties als World Press Photo, de Kabk in Den Haag en media titels als Vrij Nederland, Het Parool en Trouw. -->

      <!--

      Door het landschap van bovenaf te bekijken, via kaarten of luchtfoto’s, zie je patronen en vormen die onzichtbaar blijven als je de wereld vanaf straatniveau bekijkt. Deze patronen vertellen verhalen over de geschiedenis, ze verklaren hedendaagse fenomenen en ze kunnen helpen om inzicht te geven in de toekomst. Bert werkt met kaarten, data en open source-tools om deze patronen in het landschap bloot te leggen en te laten zien.

      Bert studeerde informatica en cartografie, studeerde af bij TomTom, en werkte daarna achtereenvolgens bij Waag en de New York Public Library. Momenteel werkt hij als zelfstandig cartograaf en ontwerper van creatieve technologie.

      Met Boven.land wil Bert zijn nieuwsgierigheid naar de bijzondere eigenschappen van het alledaagse Nederlandse landschap op anderen overbrengen. Door in het onderzoek naar deze eigenschappen gebruik te maken van open data en open source-tools worden deze onderzoeken niet alleen reproduceerbaar maar kunnen ze ook gebruikt worden voor educatie en tijdens meetups over deze data en technologie.
        -->
    </div>
    <Footer />
  </div>
</template>

<style lang="scss" scoped>
@import "@/assets/sass/partials/base.scss";
@import "@/assets/sass/partials/mixins.scss";
.home-page {
  label {
    color: $label-color;
    margin-bottom: 1.25rem;
  }
  h3 {
    margin-top: 1.25rem;
    margin-bottom: 1.25rem;
    color: $aqua;
  }

  .container {
    margin: 0 auto;
    max-width: $column-width !important;

    > p {
      padding: 0.5rem 0;
    }
  }

  div.intro {
    text-align: center;
    padding: 20px 25px 8px 25px;
  }
  div.header-image {
    margin-top: 48px;
    margin-bottom: 8px;
  }

  ul.profiles {
    display: flex;
    align-items: flex-start;
    justify-content: space-evenly;
    margin: 0 -12px;
    margin-top: 32px;
    margin-bottom: 18px;
    padding: 0;
    li {
      margin: 0 12px;
      flex-basis: 400px;
      h2 {
        margin-top: 20px;
        margin-bottom: 0px;
      }
      p {
        margin-top: 0;
      }
    }
  }
}
</style>

<script>
import structure from "/structure.js";

import Video from "./../components/elements/Video";
import Footer from "./../components/elements/Footer";
import FoldDownMenu from "./../components/menu/FoldDownMenu";
import DotMask from "./../components/svg/icons/DotMask";

export default {
  transition: "home",
  data() {
    return structure;
  },
  components: {
    DotMask,
    FoldDownMenu,
    Footer,
    Video,
  },
};
</script>
