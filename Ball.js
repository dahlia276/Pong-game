class Ball {
    constructor() {
        this.x = 100;
        this.y = 100;
        this.color = "#ffb499";
        this.radius = 15;
        this.vx = 5;
        this.vy = 10;
    }
    
    draw() {
          context.beginPath();
          context.arc(this.x, this.y, this.radius, 0, Math.PI * 2, true);
          context.fillStyle = this.color;
          context.fill();
        }
          
}