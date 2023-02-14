<template>
  <header>Turno {{ testTurn }}</header>

  <p v-if="loading">Loading...</p>

  <main v-else>
    <canvas id="canvas" ref="canvasGame" width="400" height="200"></canvas>

    <div class="footer">
      <div v-for="char in player.team" :key="char.id">
        <span class="char-name"> {{ char.name }} </span>
        <div class="ctn-actions">
          <button
            v-for="action in char.actions"
            :key="action.id"
            @click="handleAction(char, action)"
          >
            <span class="btn-text">{{ action.name }}</span>
          </button>
        </div>
      </div>

      <div>
       <span class="char-name"> Oponente </span>
        <div class="ctn-actions">
          <button @click="handleOpponentTarget(1)">oponente 1</button>
        </div>
      </div>
    </div>
  </main>
</template>

<script>
import imgPath from "./assets/idle_0.png";
import { Sprite } from "./helpers/sprite";

export default {
  data() {
    return {
      canvas: null,
      context: null,
      loading: false,

      img: imgPath,
      sprite: null,
      opponent: null,
      elements: [],
      player: {
        id: 1,
        team: [],
      },
      charSlots: {
        charId: null,
        actions: [],
      },

      testTurn: 1,
      currentChar: null,
      chars: [],
    };
  },

  mounted() {
    this.init()
  },

/*   async created() {
    this.loading = true;

    let result = await fetch("/api/chars");
    result     = await result.json();
    this.chars = await result.chars;

    this.player.team = this.chars;
    this.loading     = false;
  }, */

  methods: {
    init() {
      this.canvas  = document.getElementById("canvas");
      this.context = this.canvas.getContext("2d");

      this.player.team.forEach((char) => {
        new Sprite(
          this.context,
          char.id,
          this.player.id,
          char.urlImg,
          50,
          50,
          char.life,
          char.stamina
        )
      })

/*       this.opponent = new Sprite(
        this.context,
        1,
        "opponent-id",
        this.img,
        260,
        0
      ); */

      // this.canvas.addEventListener("click", this.handleClickEvent);
      this.animate();
    },

    animate() {
      window.requestAnimationFrame(this.animate);

      this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);

      /* this.opponent.draw(); */
      this.player.team.forEach((t) => {
        t.draw();
      });
    },

/*     handleClickEvent(event) {
      // Collision detection between clicked offset and element.
      this.player.team.forEach(t => {
        const result = t.checkClick(event)
        if (result.selected) {
          const chars = this.getChars()
          this.charSlots = chars.find(c => c.charId === result.id);
        }
      }) 
    }, */

    handleAction(char, action) {
      this.currentChar = char;
      this.currentChar.currentAction = action;
    },

    handleOpponentTarget() {
      this.currentChar.action(this.opponent);
    },

    getChars() {
      return [
        {
          charId: "3a0c6a14-ceb4-489e-b605-51d342ada23a",
          actions: [
            { id: 1, name: "bola de fogo" },
            { id: 2, name: "ah chamas!" },
          ],
        },
        {
          charId: "6e42f5d9-cc7a-4d10-a11f-dc051464b7bc",
          actions: [
            { id: 1, name: "tormenta" },
            { id: 2, name: "furacão cortante" },
          ],
        },
        {
          charId: "ba6aa11f-6723-4cec-8d05-86455f6ec717",
          actions: [
            { id: 1, name: "magia do caos" },
            { id: 2, name: "black hole" },
          ],
        },
      ];
    },
  },
};
</script>


<style scoped>
header {
  line-height: 1.5;
}

.char-name {
  font-size: 18px;
  font-weight: bold;
}

.ctn-actions {
  display: flex;
  align-items: center;
}

button {
  width: 50px;
  height: 50px;
  border-radius: 10px;
  cursor: pointer;

  display: flex;
  align-items: center;
  justify-content: center;

  background-color: #0c420c;
}

.btn-text {
  font-size: 12px;
  color: #c7c5c5;
}

.footer {
  display: grid;
  grid-template-columns: 1fr 1fr;
  align-items: center;
}
</style>
