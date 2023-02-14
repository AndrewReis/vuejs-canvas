
export class Sprite {
  constructor(ctx, charId, playerId, imgPath, x, y, life, stamina) {
    this.charId   = charId
    this.playerId = playerId
    this.ctx      = ctx
    this.x        = x;
    this.y        = y;
    this.actions  = [];
    this.target   = null

    this.width  = 50;
    this.height = 50;

    this.life    = life
    this.stamina = stamina

    this.img     = new Image()
    this.img.src = imgPath
  }

  draw() {
    this.ctx.font      = "20px Arial";
    this.ctx.fillStyle = "white";
    
    this.ctx.fillText(`${this.life}`, this.x, this.y + 80);
    this.ctx.drawImage(this.img, this.x, this.y)
  }

  checkClick(event) {
    let rect = event.target.getBoundingClientRect();
    let x = event.clientX - rect.left; // x position within the element.
    let y = event.clientY - rect.top;  // y position within the element.

    const data = {
      playerId: this.playerId,
      id: this.id,
      selected: false
    }

    if (y > this.y && y < this.y + this.height && x > this.x && x < this.x + this.width) {
      data.selected = true
    }
    
    return data
  }

  action(target) {
    target.life -= 20
  }
}