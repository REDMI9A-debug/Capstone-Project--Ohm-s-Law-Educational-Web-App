const mensajesError = [
    "❌ Solo números mayores a 0, no proyectes el amor de tu ex!",
    "❌ ¿Resistencia cero? ¡Vas a quemar el laboratorio, fiera!",
    "❌ Esa resistencia tiene menos valor que las promesas de tu ex.",
    "❌ Error: El sistema no acepta negatividad."
];

function calcularTodo() {
    const inputRes = document.getElementById("resistenciasInput");
    const vSlider = document.getElementById("v-slider");
    const vText = document.getElementById("v-val");
    const resultadoDiv = document.getElementById("resultado");
    const consumoDiv = document.getElementById("comparativa-consumo");
    const infoSim = document.getElementById("info-simulacion");
    const bombillos = document.querySelectorAll('.bulb');

    // 1. Obtener Voltaje
    let volt = parseFloat(vSlider.value);
    vText.innerText = volt;

    // 2. Procesar Resistencias
    let input = inputRes.value;
    let valores = input.split(',').map(v => v.trim()).filter(v => v !== "").map(Number);
    let sumaInversas = 0;
    let error = false;

    // Reset visual básico
    bombillos.forEach(b => {
        b.style.backgroundColor = "#333";
        b.style.boxShadow = "none";
        
        
    });
if (input === "") {
        resultadoDiv.innerHTML = "Resultado: --";
        consumoDiv.innerText = "Consumo estimado: Esperando datos...";
        
        // LIMPIEZA TOTAL
        const dashboard = document.querySelector('.seccion-dashboard');
        dashboard.classList.remove('alerta-total', 'flujo-activo');
        
        bombillos.forEach(b => {
            b.classList.remove('foco-quemado');
            b.style.backgroundColor = "#333";
            b.style.boxShadow = "none";
            b.innerText = ""; // Limpia los números dentro del foco
        });
        
        infoSim.innerText = "¿Tu pintaste esto 🗣?";
        return;
    }

    // 3. Validar y Sumar
    valores.forEach((r, i) => {
        if (isNaN(r) || r <= 0) {
            error = true;
        } else {
            sumaInversas += (1 / r);
            if(i < 3) {
                let visElement = document.getElementById("vis-R" + (i+1));
                if(visElement) visElement.innerText = r + " Ω";
            }
        }
    });

    // 4. Lógica de Resultados y Explosión
    if (error) {
        resultadoDiv.innerHTML = mensajesError[Math.floor(Math.random() * mensajesError.length)];
        resultadoDiv.style.color = "#ff4444";
    } else if (valores.length > 0) {
        let rt = 1 / sumaInversas;
        let corriente = volt / rt;
// Actualiza la fórmula dinámica con los datos reales
document.getElementById("formula-dinamica").innerText = `${corriente.toFixed(2)}A = ${volt}V / ${rt.toFixed(2)}Ω`;
    // --- MÓDULO DE SEGURIDAD ECONÓMICO ---
        const dashboard = document.querySelector('.seccion-dashboard'); 
        
        if (corriente > 20) { 
            // Solo vibra el cuadro, no toda la pantalla
            dashboard.classList.add('alerta-total'); 
            bombillos.forEach(b => b.classList.add('foco-quemado'));
            infoSim.innerText = "☢️ ¡SOBRECARGA DETECTADA! ☢️";
        } else {
            dashboard.classList.remove('alerta-total');
            bombillos.forEach(b => b.classList.remove('foco-quemado'));
            infoSim.innerText = "¿Tu pintaste esto 🗣?";
        }

        resultadoDiv.innerHTML = `✅ RT: ${rt.toFixed(2)} Ω | ⚡ Corriente: ${corriente.toFixed(2)}A`;
        resultadoDiv.style.color = "#00ff00";

        // Comparativa de consumo
        if (corriente < 1) consumoDiv.innerText = "🔌 Consumo: Bajo (Como un foco LED)";
        else if (corriente < 10) consumoDiv.innerText = "📺 Consumo: Medio (Como una TV)";
        else consumoDiv.innerText = "⚡ Consumo: ALTO (Como una Plancha)";

        // Brillo de bombillos (Solo si no está explotando)
        if (corriente <= 20) {
            let brillo = Math.min(50, corriente * 4);
            bombillos.forEach(b => {
                b.style.backgroundColor = "#ffeb3b";
                b.style.boxShadow = `0 0 ${brillo}px #ffeb3b`;
            });
        }
    }
}

// Event Listeners
document.getElementById("resistenciasInput").addEventListener("input", calcularTodo);
document.getElementById("v-slider").addEventListener("input", calcularTodo);
document.getElementById("formula-dinamica").innerText = `${corriente.toFixed(2)}A = ${volt}V / ${rt.toFixed(2)}Ω`;