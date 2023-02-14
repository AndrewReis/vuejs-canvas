import { v4 }                  from 'uuid'
import { createServer, Model } from "miragejs"

import imgPath from './assets/idle_0.png'


export function makeServer({ environment = "development" } = {}) {
  let server = createServer({
    environment,

    models: {
      chars: Model
    },

    seeds(server) {
      server.create("char", {
        id: v4(),
        playerId: 1,
        name: 'Mago',
        life: 60,
        stamina: 30,
        urlImg: imgPath,
        actions: [
          {id: 1, name: 'bola de fogo', cost: 5, damage: 15},
          {id: 2, name: 'ah chamas!', cost: 7, damage: 20},
        ]
      })
    },

    routes() {
      this.namespace = "api"

      this.get("/chars", (schema) => {
        return schema.chars.all()
      })
    },
  })

  return server
}