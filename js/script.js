$(document).ready(function () {
    alert('Instrucciones: Dale al boton Iniciar, tienes que tocar la bola roja unas determinadas veses, si se te termina el tiempo pierdes o si te toca la bola negra tambien pierdes');

    puntos = 0;
    tiempo = 60;
    necesarios = 50;
    var cronometro;
    document.getElementById('ini').addEventListener('click', () => {
        document.getElementById('ini').classList.add('dnone');
        document.getElementById('puntos').classList.remove('dnone');
        document.getElementById('ned').classList.remove('dnone');
        document.getElementById('tiempo').classList.remove('dnone');
        document.getElementById('pau').classList.remove('dnone');
        document.getElementById('player').addEventListener('mouseover', () => {
            puntos++;
            document.getElementById('puntos').innerHTML = 'Puntos: <b>' + puntos + '/' + necesarios + ' <b>';
            ramdNumT = Math.round(Math.random() * 500);
            ramdNumL = Math.round(Math.random() * 500);

            document.getElementById('player').style.marginTop = ramdNumT + "px";
            document.getElementById('player').style.marginLeft = ramdNumL + "px";
            if (puntos == 50) {
                alert('Ganaste');
                location.href = 'index.html';
            }
        });
        document.getElementById('player').addEventListener('click', () => {
            puntos++;
            document.getElementById('puntos').innerHTML = 'Puntos: <b>' + puntos + '/' + necesarios + ' <b>';
            ramdNumT = Math.round(Math.random() * 500);
            ramdNumL = Math.round(Math.random() * 500);

            document.getElementById('player').style.marginTop = ramdNumT + "px";
            document.getElementById('player').style.marginLeft = ramdNumL + "px";
            if (puntos == 50) {
                alert('Ganaste');
                location.href = 'index.html';
            }
        });
    });

    function movimientoEnemigo() {
        if (puntos >= 15) {
            document.getElementById('enemigo').classList.remove('dnone');
            ramdNumTE = Math.round(Math.random() * 500);
            ramdNumLE = Math.round(Math.random() * 500);
            document.getElementById('enemigo').style.marginTop = ramdNumTE + "px";
            document.getElementById('enemigo').style.marginLeft = ramdNumLE + "px";
        }
    }


    function matar(rectone, recttwo) {

        var r1 = $(rectone);
        var r2 = $(recttwo);

        var r1x = r1.offset().left;
        var r1w = r1.width();
        var r1y = r1.offset().top;
        var r1h = r1.height();

        var r2x = r2.offset().left;
        var r2w = r2.width();
        var r2y = r2.offset().top;
        var r2h = r2.height();

        if (r1y + r1h < r2y ||
            r1y > r2y + r2h ||
            r1x > r2x + r2w ||
            r1x + r1w < r2x) {
            return false;
        } else {
            return true;
        }

    }

    function vmatar() {
        if (matar('#player', '#enemigo')) {
            document.getElementById('player').setAttribute('id', 'enemigo');
            setTimeout(() => {
                clearInterval(cronometro);
                alert('Perdiste');
                location.href = '';
            }, 2000);
        }

    }

    document.getElementById('pau').addEventListener('click', () => {
        document.getElementById('pau').classList.add('dnone');
        document.getElementById('rea').classList.remove('dnone');
        document.getElementById('player').setAttribute('id', 'play');
        clearInterval(cronometro);
    });


    document.getElementById('rea').addEventListener('click', () => {
        document.getElementById('rea').classList.add('dnone');
        document.getElementById('pau').classList.remove('dnone');
        document.getElementById('play').setAttribute('id', 'player');
        cronometro = setInterval(restarTiempo, 1000);
    });

    function restarTiempo() {
        tiempo--;
        document.getElementById('tiempo').innerHTML = '&nbsp;&nbsp;Tiempo: ' + tiempo;
        if (tiempo <= 0) {
            clearInterval(cronometro);
            alert('Perdiste');
            location.href = '';
        }
    }
    cronometro = setInterval(restarTiempo, 1000);
    setInterval(movimientoEnemigo, 600);
    setInterval(vmatar, 500);
});