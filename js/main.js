(function() {
    //Оболочка игры
    let game = document.querySelector('.game');

    //Время
    let time = document.querySelector('#time');
    //Значение времени 
    let input = document.querySelector("#inp");

    //Стартуем при кнопке
    let btn = document.querySelector('.btn');
    btn.addEventListener("click", startGame);

    //Стрик игрока

    //Событие инкута
    input.addEventListener("input", setTime)


    function setTime() {
        let timeInp = +input.value;
        time.textContent = timeInp.toFixed(1)
    }

    //Начало игры
    function startGame() {
        document.querySelector('.game__started').style.display = "none";
        renderGame();
    }


    //Рисуем игру
    function renderGame() {

        //Попадания
        let targetEnemy = 0;
        let targetField = 0;

        //Создание поля
        let fieldWrapper = document.createElement("div");
        fieldWrapper.classList.add('field__wrapper');
        document.querySelector('.field').appendChild(fieldWrapper)

        //Время игры
        let ms = 100;
        input.setAttribute('disabled', 'true')
        let interval = setInterval(() => {
            let count = parseFloat(time.textContent)
            if (count <= 0) {
                clearInterval(interval)
                endGame();
            } else {
                time.textContent = (count - 0.1).toFixed(1)
            }
        }, ms)



        //Создание полей
        for (let i = 1; i < 121; i++) {
            let excel = document.createElement("div");
            excel.classList.add('excel');
            fieldWrapper.appendChild(excel)
        }

        //Рисуем координаты 
        let excels = document.querySelectorAll('.excel');
        let x = 1;
        let y = 10;

        excels.forEach(function(item) {
            if (x > 10) {
                x = 1;
                y--;
            }
            item.setAttribute('posX', x);
            item.setAttribute('posY', y);
            x++;
        })

        //Находим координаты спавна героя
        let hero = document.querySelector('[posX="1"][posY="6"]');
        hero.classList.add('hero')

        //Рандомные координаты противнику
        let coordinates = randomCoordinates();
        let enemy = document.querySelector('[posX = "' + coordinates[0] + '"][posY = "' + coordinates[1] + '"]')
        enemy.classList.add('enemy');

        //Событие клика на цель,если кликаем то генерируем новые позиции
        document.querySelector('.field').addEventListener("click", clickPoint)


        function endGame() {
            document.querySelector('.field').removeEventListener("click", clickPoint);
            game.classList.add("game-end");
            let sumTarget = targetEnemy + targetField;
            //Создаем title
            let h1 = document.createElement("h1");
            h1.innerHTML = `Результат:
		<br>
		${targetEnemy} - точных попаданий
		<br>
	   ${targetField} - неточных попаданий
		<br>
		${sumTarget} - всего попаданий`
            h1.classList.add("endTitle");
            game.appendChild(h1)

            //Создаем button
            let btnEnd = document.createElement("button");
            btnEnd.classList.add("btn", "btn-end");
            btnEnd.textContent = "Вернуться";
            game.appendChild(btnEnd);

            btnEnd.addEventListener("click", function(event) {
                document.querySelector('.game__started').style.display = "flex";
                game.classList.remove("game-end");
                h1.remove();
                fieldWrapper.remove();
                event.target.remove();
                input.value = "10";
                input.removeAttribute("disabled")
                setTime();
            })

        }

        function clickPoint(event) {
            event.stopPropagation()
            let count = parseFloat(time.textContent)
            if (event.target.classList.contains('enemy')) {
                event.target.classList.remove('enemy');
                renderNewPoints();
                time.textContent = (count + 1.0).toFixed(1);
                targetEnemy++;
            } else {
                targetField++;

            }
        }

        //Функция генерации новых позиций для hero и enemy
        function renderNewPoints() {
            document.querySelector('.hero').classList.remove('hero');
            hero = document.querySelector('[posX = "' + coordinates[0] + '"][posY = "' + coordinates[1] + '"]');
            hero.classList.add('hero');
            coordinates = randomCoordinates();
            enemy = document.querySelector('[posX = "' + coordinates[0] + '"][posY = "' + coordinates[1] + '"]')
            enemy.classList.add('enemy');



        }

        function renderNewEnemy() {
            let coordinates = randomCoordinates();
            enemy = document.querySelector('[posX = "' + coordinates[0] + '"][posY = "' + coordinates[1] + '"]');
            enemy.classList.add('enemy')
        }

        //Рандомные координаты
        function randomCoordinates() {
            let x = Math.floor(Math.random() * (12 - 6) + 3);
            let y = Math.floor(Math.random() * (12 - 8) + 4);
            return [x, y]
        }

    }

})()