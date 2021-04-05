console.log('js connected');

class Bar {
    constructor() {
        this.x = 200;
        this.y = 650;
        this.width = 120;
        this.height = 10;
    }

    draw() {
        context.fillStyle = '#00c4c9';
        context.fillRect(this.x, this.y, this.width, this.height);
    }
    
    moveLeft() {
        this.x -= 45;
    }
    moveRight() {
        this.x += 45;
    }
    
    moveBar(keyCode) {
        context.clearRect(this.x, this.y, this.width, this.height);
        switch(keyCode) {
            case 37: 
            if (this.x > 20) {
                this.x -= 10;
            }
            break;
            case 39: 
            if (this.x < 530) {
                this.x += 10
            }
            break;
        }
    } 
}


