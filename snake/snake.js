window.onload = function () {

    const blockSize = 30;
    let ctx;
    const delay = 100;
    let snakee;
    let applee;
    const canvasWidth = 950;
    const canvasHeight = 500;
    const widthInBlocks = canvasWidth / blockSize;
    const heightInBlocks = canvasHeight / blockSize;
    let score;
    let timeOut;

    init()

    function init() {
        const canvas = document.getElementById("myCanvas");
        ctx = canvas.getContext("2d");
        canvas.style.border = "30px solid gray";
        canvas.style.margin = "10px auto";
        canvas.style.display = "block";
        canvas.style.backgroundColor = "lightgray";
        snakee = new Snake([[6, 4], [5, 4], [4, 4]], "right")
        applee = new Apple([10, 10]);
        score = 0;
        if (localStorage.getItem("score") == null) {
            document.getElementById("score").textContent = "Record = " + 0
        } else {
            document.getElementById("score").textContent = "Record = " + localStorage.getItem("score")
        }
        refreshCanvas()
    }

    function refreshCanvas() {
        snakee.advance();
        if (snakee.checkCollision()) {
            if (score > localStorage.getItem("score")) {
                localStorage.setItem("score", score)
                document.getElementById("score").textContent = "Record = " + localStorage.getItem("score") + " points"
                alert("Nouveau record ! Bien joué !")
            }
            gameOver()
        } else {
            if (snakee.isEatingApple(applee)) {
                score += 10
                snakee.ateApple = true;
                do {
                    applee.setNewPosition()
                }
                while (applee.isOnSnake(snakee))
            }
            ctx.clearRect(0, 0, canvasWidth, canvasHeight);
            drawScore();
            snakee.draw();
            applee.draw();
            timeOut = setTimeout(refreshCanvas, delay);
        }
    }

    function gameOver() {
        ctx.save();
        ctx.font = "bold 70px sans-serif";
        ctx.fillStyle = "black";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.strokeStyle = "white";
        ctx.lineWidth = 5;
        var centreX = canvasWidth / 2;
        var centreY = canvasHeight / 2;
        ctx.strokeText("Game Over", centreX, centreY - 180);
        ctx.fillText("Game Over", centreX, centreY - 180);
        ctx.font = "bold 30px sans-serif";
        ctx.strokeText("Appuyer sur la touche espace pour rejouer", centreX, centreY - 120)
        ctx.fillText("Appuyer sur la touche espace pour rejouer", centreX, centreY - 120)
        ctx.restore()
    }

    function restart() {
        snakee = new Snake([[6, 4], [5, 4], [4, 4]], "right")
        applee = new Apple([10, 10]);
        score = 0;
        clearTimeout(timeOut)
        refreshCanvas()
    }

    function drawScore() {
        ctx.save();
        ctx.font = "bold 200px sans-serif";
        ctx.fillStyle = "gray";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        const centreX = canvasWidth / 2;
        const centreY = canvasHeight / 2;
        ctx.fillText(score.toString(), centreX, centreY);
        ctx.restore();
    }

    function drawBlock(ctx, position) {
        const x = position[0] * blockSize;
        const y = position[1] * blockSize;
        ctx.fillRect(x, y, blockSize, blockSize)
    }

    function Snake(body, direction) {
        this.body = body;
        this.direction = direction;
        this.ateApple = false;
        this.draw = function () {
            ctx.save();
            ctx.fillStyle = "green";
            for (let i = 0; i < this.body.length; i++) {
                drawBlock(ctx, this.body[i])
            }
            ctx.restore()

        };
        this.advance = function () {
            const nextPosition = this.body[0].slice();
            switch (this.direction) {
                case "left":
                    nextPosition[0] -= 1;
                    break;
                case "right":
                    nextPosition[0] += 1;
                    break;
                case "down":
                    nextPosition[1] += 1;
                    break;
                case "up":
                    nextPosition[1] -= 1;
                    break;
                default:
                    throw ("Invalid Direction")

            }
            this.body.unshift(nextPosition)
            if (!this.ateApple)
                this.body.pop()
            else
                this.ateApple = false;
        }
        this.setDirection = (newDirection) => {
            let allowedDirections;
            switch (this.direction) {
                case "left":
                case "right":
                    allowedDirections = ["up", "down"];
                    break;
                case "down":
                case "up":
                    allowedDirections = ["left", "right"];
                    break;
                default:
                    throw ("Invalid Direction")
            }
            if (allowedDirections.indexOf(newDirection) > -1) {
                this.direction = newDirection;
            }
        }
        this.checkCollision = () => {
            let wallCollision = false;
            let snakeCollision = false;
            const head = this.body[0];
            const rest = this.body.slice(1);
            const snakeX = head[0];
            const snakeY = head[1];
            const minX = 0;
            const minY = 0;
            const maxX = widthInBlocks - 1;
            const maxY = heightInBlocks - 1;
            const isNotBetweenHorizontalWalls = snakeX < minX || snakeX > maxX;
            const isNotBetweenVerticalWalls = snakeY < minY || snakeY > maxY;
            if (isNotBetweenHorizontalWalls || isNotBetweenVerticalWalls) {
                wallCollision = true
            }
            for (var i = 0; i < rest.length; i++) {
                if (snakeX === rest[i][0] && snakeY === rest[i][1]) {
                    snakeCollision = true;
                }
            }
            return wallCollision || snakeCollision
        }
        this.isEatingApple = function (appleToEat) {
            const head = this.body[0];
            return head[0] === appleToEat.position[0] && head[1] === appleToEat.position[1];

        }
    }

    function Apple(position) {
        this.position = position;
        this.draw = function () {
            ctx.save();
            ctx.fillStyle = "red";
            ctx.beginPath();
            const radius = blockSize / 2;
            const x = this.position[0] * blockSize + radius;
            const y = this.position[1] * blockSize + radius;
            ctx.arc(x, y, radius, 0, Math.PI * 2, true)
            ctx.fill()
            ctx.restore();
        }
        this.setNewPosition = () => {
            const newX = Math.round(Math.random() * (widthInBlocks - 1));
            const newY = Math.round(Math.random() * (heightInBlocks - 1));
            this.position = [newX, newY]
        };
        this.isOnSnake = (snakeToCheck) => {
            let isOnSnake = false;
            for (let i = 0; i < snakeToCheck.body.length; i++) {
                if (this.position[0] === snakeToCheck.body[i][0] && this.position[1] === snakeToCheck.body[i][1]) {
                    isOnSnake = true
                }
                return isOnSnake;
            }
        }
    }

    document.onkeydown = function handleKeyDown(e) {
        const key = e.keyCode;
        let newDirection;
        switch (key) {
            case 37:
                newDirection = "left"
                break;
            case 38:
                newDirection = "up"
                break;
            case 39:
                newDirection = "right"
                break;
            case 40:
                newDirection = "down"
                break;
            case 32:
                restart()
                return;
            default:
                return;
        }
        snakee.setDirection(newDirection)
    }
}