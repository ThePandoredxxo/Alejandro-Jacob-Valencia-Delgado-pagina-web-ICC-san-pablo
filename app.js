document.addEventListener('DOMContentLoaded', () => {
    
    const yugiohCard = document.getElementById('card-summon');
    if (yugiohCard) {
        setTimeout(() => {
            yugiohCard.classList.add('summoned');
        }, 400); 
    }

    const boton = document.getElementById('btn-simular');
    const canvas = document.getElementById('canvas-ondas');
    const ctx = canvas.getContext('2d');

    let animacionID;
    let simulaciónActiva = false;
    let fasedeOnda = 0;

    function mapearResolucion() {
        canvas.width = canvas.offsetWidth;
        canvas.height = canvas.offsetHeight;
    }

    function renderizarOndas() {
        ctx.fillStyle = 'rgba(13, 11, 24, 0.15)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        const medioY = canvas.height / 2;
        const amplitud = 35;
        const frecuencia = 0.015;

        ctx.beginPath();
        ctx.lineWidth = 3;
        ctx.strokeStyle = '#f07167';
        ctx.shadowBlur = 12;
        ctx.shadowColor = '#cc2b7a';

        for (let x = 0; x < canvas.width; x++) {
            const y = medioY + Math.sin(x * frecuencia + fasedeOnda) * amplitud;
            if (x === 0) ctx.moveTo(x, y);
            else ctx.lineTo(x, y);
        }
        ctx.stroke();

        ctx.beginPath();
        ctx.lineWidth = 2.5;
        ctx.strokeStyle = '#4cc9f0';
        ctx.shadowBlur = 10;
        ctx.shadowColor = '#4cc9f0';

        for (let x = 0; x < canvas.width; x++) {
            const y = medioY + Math.cos(x * frecuencia - fasedeOnda) * (amplitud * 0.85);
            if (x === 0) ctx.moveTo(x, y);
            else ctx.lineTo(x, y);
        }
        ctx.stroke();

        ctx.shadowBlur = 0;
        fasedeOnda += 0.04; 

        animacionID = requestAnimationFrame(renderizarOndas);
    }

    if (boton && canvas) {
        boton.addEventListener('click', () => {
            if (!simulaciónActiva) {
                simulaciónActiva = true;
                boton.textContent = "Detener Simulación";
                boton.style.background = "linear-gradient(45deg, #4cc9f0, #321555)";
                boton.style.color = "#fff";
                canvas.classList.add('active');
                
                setTimeout(() => {
                    mapearResolucion();
                    renderizarOndas();
                }, 50);

            } else {
                simulaciónActiva = false;
                boton.textContent = "Iniciar Simulación Cuántica";
                boton.style.background = "";
                boton.style.color = "";
                canvas.classList.remove('active');
                cancelAnimationFrame(animacionID);
            }
        });

        window.addEventListener('resize', () => {
            if (simulaciónActiva) mapearResolucion();
        });
    }
});
