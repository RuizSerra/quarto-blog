let capacityRegionsInitialized = false;

function initCapacityRegions() {
    const canvases = document.querySelectorAll('.region-canvas');
    canvases.forEach((canvas) => {
        if (canvas.dataset.initialized === 'true') return;
        canvas.dataset.initialized = 'true';
        setupCapacityRegion(canvas);
    });
}

function setupCapacityRegion(canvas) {
    const ctx = canvas.getContext('2d');

    // Capacity parameters (in bits)
    const CapA = 1.50;      // Max individual capacity of A
    const CapB = 1.50;      // Max individual capacity of B
    const CapTotal = 2.20;  // Joint capacity boundary constraint

    // Target operational rate pair state
    let rateA = 0.8;
    let rateB = 0.8;

    // Grid plotting variables
    const padding = 100;
    const scale = 400; // Pixels per bit
    const originX = padding;
    const originY = canvas.height - padding;

    let isDragging = false;

    // Sibling elements in same slide container
    const container = canvas.closest('.video-slide-container');

    function checkBoundsAndConstrain(targetA, targetB) {
        let a = Math.max(0, targetA);
        let b = Math.max(0, targetB);

        a = Math.min(a, CapA);
        b = Math.min(b, CapB);

        if (a + b > CapTotal) {
            let diff = (a + b) - CapTotal;
            a -= diff / 2;
            b -= diff / 2;

            if (a > CapA) {
                a = CapA;
                b = CapTotal - CapA;
            } else if (b > CapB) {
                b = CapB;
                a = CapTotal - CapB;
            }
        }

        return { a, b };
    }

    function updateMetrics(a, b) {
        const overall = a + b;
        const magnitude = Math.sqrt(a * a + b * b);
        
        const elA = container ? container.querySelector('.valRA') : null;
        const elB = container ? container.querySelector('.valRB') : null;
        const elOverall = container ? container.querySelector('.valOverall') : null;
        const elMag = container ? container.querySelector('.valMag') : null;

        if(elA) elA.innerText = a.toFixed(3) + " bits";
        if(elB) elB.innerText = b.toFixed(3) + " bits";
        if(elOverall) elOverall.innerText = overall.toFixed(3) + " bits";
        if(elMag) elMag.innerText = magnitude.toFixed(3) + " bits";
    }

    function draw() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        ctx.strokeStyle = '#e0e0e0';
        ctx.lineWidth = 2;
        for(let i = 0.5; i <= 2.0; i += 0.5) {
            ctx.beginPath();
            ctx.moveTo(originX + i * scale, padding);
            ctx.lineTo(originX + i * scale, originY);
            ctx.stroke();

            ctx.beginPath();
            ctx.moveTo(originX, originY - i * scale);
            ctx.lineTo(canvas.width - padding, originY - i * scale);
            ctx.stroke();
        }

        ctx.strokeStyle = '#333333';
        ctx.lineWidth = 4;
        ctx.beginPath();
        ctx.moveTo(originX, padding);
        ctx.lineTo(originX, originY);
        ctx.lineTo(canvas.width - padding, originY);
        ctx.stroke();

        const ptOrigin = { x: originX, y: originY };
        const ptMaxB   = { x: originX, y: originY - CapB * scale };
        const ptCornerB= { x: originX + (CapTotal - CapB) * scale, y: originY - CapB * scale };
        const ptCornerA= { x: originX + CapA * scale, y: originY - (CapTotal - CapA) * scale };
        const ptMaxA   = { x: originX + CapA * scale, y: originY };

        ctx.fillStyle = 'rgba(0, 102, 204, 0.15)';
        ctx.beginPath();
        ctx.moveTo(ptOrigin.x, ptOrigin.y);
        ctx.lineTo(ptMaxB.x, ptMaxB.y);
        ctx.lineTo(ptCornerB.x, ptCornerB.y);
        ctx.lineTo(ptCornerA.x, ptCornerA.y);
        ctx.lineTo(ptMaxA.x, ptMaxA.y);
        ctx.closePath();
        ctx.fill();

        ctx.strokeStyle = '#0066cc';
        ctx.lineWidth = 4;
        ctx.stroke();

        const vectorX = originX + rateA * scale;
        const vectorY = originY - rateB * scale;

        ctx.setLineDash([8, 8]);
        ctx.lineWidth = 2;
        ctx.strokeStyle = '#cc0000';
        ctx.beginPath(); ctx.moveTo(vectorX, vectorY); ctx.lineTo(vectorX, originY); ctx.stroke();
        ctx.strokeStyle = '#00aa00';
        ctx.beginPath(); ctx.moveTo(vectorX, vectorY); ctx.lineTo(originX, vectorY); ctx.stroke();
        ctx.setLineDash([]);

        ctx.strokeStyle = '#8800cc';
        ctx.lineWidth = 6;
        ctx.beginPath();
        ctx.moveTo(originX, originY);
        ctx.lineTo(vectorX, vectorY);
        ctx.stroke();

        ctx.fillStyle = '#8800cc';
        ctx.beginPath();
        ctx.arc(vectorX, vectorY, 12, 0, 2 * Math.PI);
        ctx.fill();

        ctx.fillStyle = '#333';
        ctx.font = '24px sans-serif';
        ctx.fillText("R_A (Actuator A Rate)", canvas.width - 320, originY + 40);
        
        ctx.save();
        ctx.translate(originX - 40, padding + 220);
        ctx.rotate(-Math.PI / 2);
        ctx.fillText("R_B (Actuator B Rate)", 0, 0);
        ctx.restore();

        ctx.fillText("0.0", originX - 40, originY + 30);
        ctx.fillText(CapA.toFixed(1), originX + CapA * scale - 20, originY + 40);
        ctx.fillText(CapB.toFixed(1), originX - 60, originY - CapB * scale + 10);
    }

    function handleInteraction(clientX, clientY) {
        const rect = canvas.getBoundingClientRect();
        const scaleX = canvas.width / rect.width;
        const scaleY = canvas.height / rect.height;
        
        const mouseX = (clientX - rect.left) * scaleX;
        const mouseY = (clientY - rect.top) * scaleY;

        const targetA = (mouseX - originX) / scale;
        const targetB = (originY - mouseY) / scale;

        const constrained = checkBoundsAndConstrain(targetA, targetB);
        rateA = constrained.a;
        rateB = constrained.b;

        updateMetrics(rateA, rateB);
        draw();
    }

    canvas.addEventListener('mousedown', (e) => {
        isDragging = true;
        handleInteraction(e.clientX, e.clientY);
    });

    window.addEventListener('mousemove', (e) => {
        if (!isDragging) return;
        handleInteraction(e.clientX, e.clientY);
    });

    window.addEventListener('mouseup', () => {
        isDragging = false;
        document.body.focus();
    });
    
    canvas.addEventListener('touchstart', (e) => {
        if(e.touches.length > 0) {
            isDragging = true;
            handleInteraction(e.touches[0].clientX, e.touches[0].clientY);
            e.preventDefault();
        }
    });

    window.addEventListener('touchmove', (e) => {
        if (!isDragging || e.touches.length === 0) return;
        handleInteraction(e.touches[0].clientX, e.touches[0].clientY);
    }, {passive: false});

    window.addEventListener('touchend', () => {
        isDragging = false;
        document.body.focus();
    });

    const initialConstrain = checkBoundsAndConstrain(rateA, rateB);
    rateA = initialConstrain.a;
    rateB = initialConstrain.b;
    updateMetrics(rateA, rateB);
    draw();
}
