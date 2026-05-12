// ══════════════════════════════════════════
//   CURSOR PERSONALIZADO
// ══════════════════════════════════════════
const cursor      = document.getElementById('cursor');
const cursorTrail = document.getElementById('cursorTrail');

let mouseX = 0, mouseY = 0;

document.addEventListener('mousemove', e => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    cursor.style.left = mouseX + 'px';
    cursor.style.top  = mouseY + 'px';
    setTimeout(() => {
        cursorTrail.style.left = mouseX + 'px';
        cursorTrail.style.top  = mouseY + 'px';
    }, 80);
});

document.addEventListener('mousedown', () => cursor.classList.add('clicked'));
document.addEventListener('mouseup',   () => cursor.classList.remove('clicked'));

// ══════════════════════════════════════════
//   BG ESTRELAS
// ══════════════════════════════════════════
const bgCanvas = document.getElementById('bgCanvas');
const bgCtx    = bgCanvas.getContext('2d');

function resizeBg() {
    bgCanvas.width  = window.innerWidth;
    bgCanvas.height = window.innerHeight;
}
resizeBg();
window.addEventListener('resize', resizeBg);

const stars = Array.from({length: 160}, () => ({
    x: Math.random() * window.innerWidth,
    y: Math.random() * window.innerHeight,
    r: Math.random() * 1.6 + 0.2,
    a: Math.random() * Math.PI * 2,
    speed: Math.random() * 0.007 + 0.002
}));

(function animBg() {
    bgCtx.clearRect(0, 0, bgCanvas.width, bgCanvas.height);
    stars.forEach(s => {
        s.a += s.speed;
        const alpha = (Math.sin(s.a) * 0.5 + 0.5) * 0.5 + 0.05;
        bgCtx.beginPath();
        bgCtx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        bgCtx.fillStyle = `rgba(255,137,181,${alpha})`;
        bgCtx.fill();
    });
    requestAnimationFrame(animBg);
})();

// ══════════════════════════════════════════
//   PARTÍCULAS FLUTUANTES
// ══════════════════════════════════════════
const particles = document.getElementById("particles");
for (let i = 0; i < 30; i++) {
    const heart = document.createElement("div");
    heart.classList.add("heart");
    heart.innerHTML = ["❤", "💕", "✨", "💖"][Math.floor(Math.random()*4)];
    heart.style.left = Math.random() * 100 + "vw";
    heart.style.fontSize = Math.random() * 18 + 8 + "px";
    heart.style.animationDuration = Math.random() * 14 + 10 + "s";
    heart.style.animationDelay    = Math.random() * 10 + "s";
    particles.appendChild(heart);
}

// ══════════════════════════════════════════
//   PARALLAX HERO
// ══════════════════════════════════════════
const heroBg = document.getElementById('heroBg');
window.addEventListener('scroll', () => {
    if (heroBg) {
        const scrolled = window.scrollY;
        heroBg.style.transform = `translateY(${scrolled * 0.35}px)`;
    }
});

// ══════════════════════════════════════════
//   HEADER COMPACTO NO SCROLL
// ══════════════════════════════════════════
const mainHeader = document.getElementById('mainHeader');
window.addEventListener('scroll', () => {
    if (mainHeader) {
        mainHeader.classList.toggle('compacto', window.scrollY > 80);
    }
    document.getElementById("btnTopo").classList.toggle("show", window.scrollY > 500);
});

// ══════════════════════════════════════════
//   SCROLL REVEAL
// ══════════════════════════════════════════
const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, { threshold: 0.12 });

document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

// ══════════════════════════════════════════
//   DRAWER MOBILE
// ══════════════════════════════════════════
function abrirDrawer() {
    document.getElementById('navDrawer').classList.add('open');
    document.getElementById('drawerOverlay').classList.add('open');
    document.body.style.overflow = 'hidden';
}
function fecharDrawer() {
    document.getElementById('navDrawer').classList.remove('open');
    document.getElementById('drawerOverlay').classList.remove('open');
    document.body.style.overflow = '';
}

// ══════════════════════════════════════════
//   ENTRAR NO SITE
// ══════════════════════════════════════════
function entrarSite() {
    const intro  = document.getElementById("intro");
    const site   = document.getElementById("siteConteudo");
    const musica = document.getElementById("musica");
    musica.play().catch(() => {});
    intro.classList.add("sumir");
    setTimeout(() => {
        intro.style.display = "none";
        site.classList.remove("site-hidden");
        site.classList.add("site-show");
        // re-observe reveals após mostrar o site
        document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));
        inicializarDatasEspeciais();
        inicializarTaro();
        inicializarMotivoDots();
        carregarMural();
        setTimeout(calcularEstatisticas, 300);
    }, 1200);
}

// ══════════════════════════════════════════
//   CONTADOR
// ══════════════════════════════════════════
const dataNamoro = new Date("2023-03-13T00:00:00");
let prevSegundos = -1;

function atualizarContador() {
    const diff = new Date() - dataNamoro;
    const totalSec = Math.floor(diff / 1000);

    const anos    = Math.floor(diff / (365.25 * 24 * 3600 * 1000));
    const meses   = Math.floor((diff % (365.25 * 24 * 3600 * 1000)) / (30.44 * 24 * 3600 * 1000));
    const dias    = Math.floor((diff % (30.44 * 24 * 3600 * 1000)) / (24 * 3600 * 1000));
    const horas   = Math.floor((diff / 3600000) % 24);
    const minutos = Math.floor((diff / 60000) % 60);
    const segundos= Math.floor((diff / 1000) % 60);

    setTempoVal('anos',    anos);
    setTempoVal('meses',   meses);
    setTempoVal('dias',    dias);
    setTempoVal('horas',   horas);
    setTempoVal('minutos', minutos);
    setTempoVal('segundos',segundos);

    // aniversário
    const hoje = new Date();
    let proxAniv = new Date(hoje.getFullYear(), 2, 13); // Março = 2
    if (proxAniv <= hoje) proxAniv = new Date(hoje.getFullYear() + 1, 2, 13);
    const diffAniv = proxAniv - hoje;
    const diasAniv = Math.ceil(diffAniv / (1000 * 60 * 60 * 24));
    const el = document.getElementById('diasAniversario');
    if (el) {
        el.textContent = diasAniv === 0 ? '🎉 É hoje!' : `em ${diasAniv} dia${diasAniv !== 1 ? 's' : ''}`;
    }
}

function setTempoVal(id, val) {
    const el = document.getElementById(id);
    if (!el) return;
    const cur = parseInt(el.innerText);
    if (cur !== val) {
        el.classList.add('flip');
        setTimeout(() => el.classList.remove('flip'), 300);
        el.innerText = val;
    }
}

setInterval(atualizarContador, 1000);
atualizarContador();

// ══════════════════════════════════════════
//   ESTATÍSTICAS
// ══════════════════════════════════════════
function calcularEstatisticas() {
    const diff  = new Date() - dataNamoro;
    const totalDias = Math.floor(diff / (1000 * 60 * 60 * 24));

    const targets = {
        statBeijos:    totalDias * 83,
        statNoites:    totalDias - 474,
        statMensagens: totalDias * 267,
        statBatidas:   Math.floor(diff / 1000) * 1.2,
        statCafes:     Math.floor(totalDias / 3),
        statManhas:    totalDias - 474,
    };

    Object.entries(targets).forEach(([id, target]) => {
        animarNumero(id, target);
    });
}

function animarNumero(id, target) {
    const el = document.getElementById(id);
    if (!el) return;
    const duracao = 2200;
    const inicio  = performance.now();
    const numTarget = Math.round(target);

    function step(now) {
        const progresso = Math.min((now - inicio) / duracao, 1);
        const ease = 1 - Math.pow(1 - progresso, 3);
        el.textContent = formatarNumero(Math.round(ease * numTarget));
        if (progresso < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
}

function formatarNumero(n) {
    if (n >= 1_000_000) return (n / 1_000_000).toFixed(1) + 'M';
    if (n >= 1_000)     return (n / 1_000).toFixed(1) + 'k';
    return n.toLocaleString('pt-BR');
}

// ══════════════════════════════════════════
//   DATAS ESPECIAIS
// ══════════════════════════════════════════

const datasEspeciais = [

    { 
        emoji: '💘',
        titulo: 'Início do namoro',
        dia: 13,
        mes: 3,
        ano: 2023,
        desc: 'O dia que tudo começou'
    },

    { 
        emoji: '🎂',
        titulo: 'Aniversário de namoro',
        dia: 13,
        mes: 3,
        anual: true,
        desc: 'Mais um ano juntos'
    },

    { 
        emoji: '💝',
        titulo: 'Dia dos Namorados',
        dia: 12,
        mes: 6,
        anual: true,
        desc: 'Nosso dia especial'
    },

    { 
        emoji: '🎄',
        titulo: 'Natal juntos',
        dia: 25,
        mes: 12,
        anual: true,
        desc: 'Primeira vez que passamos juntos'
    },

    { 
        emoji: '🥂',
        titulo: 'Réveillon',
        dia: 31,
        mes: 12,
        anual: true,
        desc: 'Entrando o ano de mãos dadas'
    }

];

function inicializarDatasEspeciais() {

    const grid = document.getElementById('datasGrid');

    if (!grid) return;

    const hoje = new Date();

    datasEspeciais.forEach(data => {

        let dataAlvo;

        // EVENTOS ANUAIS
        if (data.anual) {

            dataAlvo = new Date(
                hoje.getFullYear(),
                data.mes - 1,
                data.dia
            );

            if (dataAlvo < hoje) {

                dataAlvo = new Date(
                    hoje.getFullYear() + 1,
                    data.mes - 1,
                    data.dia
                );
            }

        } 
        
        // DATA FIXA
        else {

            dataAlvo = new Date(
                data.ano,
                data.mes - 1,
                data.dia
            );
        }

        const diffMs = dataAlvo - hoje;

        const diffDias = Math.ceil(
            diffMs / (1000 * 60 * 60 * 24)
        );

        let countdownTxt;

        // TEXTO DAS DATAS
        if (data.anual) {

            if (diffDias === 0) {

                countdownTxt = '🎉 É hoje!';

            } else {

                countdownTxt =
                    `Em <strong>${diffDias}</strong> ` +
                    `dia${diffDias !== 1 ? 's' : ''}`;
            }

        } else {

            countdownTxt =
                `${data.dia}/${data.mes}/${data.ano}`;
        }

        const card = document.createElement('div');

        card.className =
            'data-card' +
            (
                diffDias >= 0 &&
                diffDias <= 30
                    ? ' proxima'
                    : ''
            );

        card.innerHTML = `
            <div class="data-icon">${data.emoji}</div>
            <div class="data-titulo">${data.titulo}</div>
            <div class="data-desc">${data.desc}</div>
            <div class="data-countdown">${countdownTxt}</div>
        `;

        grid.appendChild(card);

    });

}

// ══════════════════════════════════════════
//   MOTIVOS
// ══════════════════════════════════════════
const motivos = [
    "Porque seu sorriso ilumina meus dias ❤️",
    "Porque você me faz feliz até nos dias difíceis ❤️",
    "Porque ao seu lado tudo fica melhor ❤️",
    "Porque você é minha pessoa favorita ❤️",
    "Porque eu amo cada detalhe seu ❤️",
    "Porque você sempre está do meu lado ❤️",
    "Porque você sempre pensa em mim ❤️",
    "Porque você não sai da minha cabeça ❤️",
    "Porque você me conhece melhor do que eu mesmo ❤️",
    "Porque você me irrita como ninguém 😅",
    "Porque você é perfeita ❤️",
    "Porque você sempre vai ser minha princesa ❤️",
    "Porque você é tudo para mim ❤️"
];

let indiceMotivo = 0;

function inicializarMotivoDots() {
    const container = document.getElementById('motivoProgress');
    if (!container) return;
    container.innerHTML = '';
    motivos.forEach((_, i) => {
        const dot = document.createElement('span');
        dot.className = 'motivo-dot' + (i === 0 ? ' ativo' : '');
        dot.onclick = () => irParaMotivo(i);
        container.appendChild(dot);
    });
    atualizarCounter();
}

function irParaMotivo(i) {
    indiceMotivo = i;
    const el = document.getElementById("motivo");
    el.classList.add('fade-out');
    setTimeout(() => {
        el.innerText = motivos[indiceMotivo];
        el.classList.remove('fade-out');
        atualizarDots();
        atualizarCounter();
    }, 300);
}

function trocarMotivo() {
    indiceMotivo = (indiceMotivo + 1) % motivos.length;
    irParaMotivo(indiceMotivo);
}

function atualizarDots() {
    document.querySelectorAll('.motivo-dot').forEach((d, i) => {
        d.classList.toggle('ativo', i === indiceMotivo);
    });
}

function atualizarCounter() {
    const el = document.getElementById('motivoCounter');
    if (el) el.textContent = `${indiceMotivo + 1} / ${motivos.length}`;
}

// ══════════════════════════════════════════
//   TARÔ DO AMOR
// ══════════════════════════════════════════
const mensagensTaro = [
    "O universo conspira a favor do amor de vocês. ✨ Confie na jornada.",
    "Um momento especial se aproxima. 💕 Preparem seus corações.",
    "A energia do amor de vocês é um farol no mundo. 🌟",
    "Juntos, são mais fortes do que qualquer obstáculo. ❤️",
    "O coração sabe o caminho. Sigam-no juntos. 🌹",
    "Cada abraço de vocês cura o mundo ao redor. 💖",
    "O que foi plantado com amor, floresce com beleza. 🌸",
    "O tempo ao lado de quem amamos nunca é suficiente. Apreciem cada segundo. ⏳",
    "Uma aventura nova está esperando por vocês dois. 🗺️",
    "O amor de vocês é raro. Cuidem dele como o tesouro que é. 💎",
    "Risos compartilhados constroem pontes eternas. 😄",
    "Até nas tempestades, vocês são o abrigo um do outro. 🌧️❤️",
];

let taroMensagens = [];

function inicializarTaro() {
    sortearTaro();
}

function sortearTaro() {
    const shuffled = [...mensagensTaro].sort(() => Math.random() - 0.5);
    taroMensagens = shuffled.slice(0, 3);

    for (let i = 0; i < 3; i++) {
        const verso = document.getElementById(`taroVerso${i}`);
        if (verso) verso.textContent = taroMensagens[i];
        const carta = document.querySelectorAll('.taro-carta')[i];
        if (carta) carta.classList.remove('virada');
    }
}

function virarCarta(i) {
    const carta = document.querySelectorAll('.taro-carta')[i];
    if (carta) carta.classList.toggle('virada');
}

function resetarTaro() {
    sortearTaro();
    mostrarToast('As cartas foram embaralhadas! 🔮');
}

// ══════════════════════════════════════════
//   SURPRESA
// ══════════════════════════════════════════
function mostrarSurpresa() {
    const surpresa = document.getElementById("surpresa");
    const botao    = document.querySelector(".surpresa-btn");
    surpresa.classList.toggle("show");
    botao.innerText = surpresa.classList.contains("show") ? "Fechar Surpresa 💔" : "Abrir Surpresa ✨";
}

const fotos = [
    "/static/img/f20.png",
    "/static/img/f21.png",
    "/static/img/f22.png",
    "/static/img/f23.png"
];
let fotoAtual = 0;

function proximaFoto() {
    fotoAtual = (fotoAtual + 1) % fotos.length;
    const img = document.getElementById("fotoSurpresa");
    img.style.opacity = '0';
    setTimeout(() => {
        img.src = fotos[fotoAtual];
        img.style.opacity = '1';
    }, 200);
    img.style.transition = 'opacity .2s';
}
function fotoAnterior() {
    fotoAtual = (fotoAtual - 1 + fotos.length) % fotos.length;
    const img = document.getElementById("fotoSurpresa");
    img.style.opacity = '0';
    setTimeout(() => {
        img.src = fotos[fotoAtual];
        img.style.opacity = '1';
    }, 200);
    img.style.transition = 'opacity .2s';
}

// ══════════════════════════════════════════
//   LIGHTBOX DA GALERIA
// ══════════════════════════════════════════
const galeriaSrcs = [
    '/static/img/f1.jpeg',
    '/static/img/f5.jpeg',
    '/static/img/f3.jpeg',
    '/static/img/f4.jpeg',
    '/static/img/f6.jpeg',
    '/static/img/f7.jpeg',
    '/static/img/f8.jpeg',
    '/static/img/f9.jpeg',
];
let lbAtual = 0;

function abrirLightbox(src, index) {
    lbAtual = index;
    document.getElementById('lbImg').src = src;
    document.getElementById('lightbox').classList.add('open');
    document.body.style.overflow = 'hidden';
}

function fecharLightbox() {
    document.getElementById('lightbox').classList.remove('open');
    document.body.style.overflow = '';
}

function lbNav(dir, e) {
    e.stopPropagation();
    lbAtual = (lbAtual + dir + galeriaSrcs.length) % galeriaSrcs.length;
    const img = document.getElementById('lbImg');
    img.style.opacity = '0';
    setTimeout(() => {
        img.src = galeriaSrcs[lbAtual];
        img.style.opacity = '1';
    }, 180);
    img.style.transition = 'opacity .18s';
}

// Teclado para o lightbox
document.addEventListener('keydown', e => {
    const lb = document.getElementById('lightbox');
    if (!lb || !lb.classList.contains('open')) return;
    if (e.key === 'Escape') fecharLightbox();
    if (e.key === 'ArrowRight') lbNav(1, {stopPropagation: ()=>{}});
    if (e.key === 'ArrowLeft')  lbNav(-1, {stopPropagation: ()=>{}});
});

// ══════════════════════════════════════════
//   CARTA COM LACRE
// ══════════════════════════════════════════
let cartaAberta = false;
function abrirCarta() {
    if (cartaAberta) return;
    cartaAberta = true;
    const lacre    = document.getElementById('cartaLacre');
    const conteudo = document.getElementById('cartaConteudo');
    lacre.style.transition = 'opacity .5s, transform .5s';
    lacre.style.opacity = '0';
    lacre.style.transform = 'scale(0.9)';
    setTimeout(() => {
        lacre.style.display = 'none';
        conteudo.style.display = 'block';
        mostrarToast('Uma carta foi aberta com amor 💌');
    }, 500);
}

// ══════════════════════════════════════════
//   MURAL DE MENSAGENS
// ══════════════════════════════════════════
function carregarMural() {
    const posts   = JSON.parse(localStorage.getItem('muralPosts') || '[]');
    const container = document.getElementById('muralPosts');
    if (!container) return;
    container.innerHTML = '';

    if (posts.length === 0) {
        container.innerHTML = '<div class="mural-vazio">Nenhuma mensagem ainda... Seja o primeiro! 💕</div>';
        return;
    }

    posts.slice().reverse().forEach((post, i) => {
        renderizarPost(post, posts.length - 1 - i, container);
    });
}

function renderizarPost(post, realIndex, container) {
    const div = document.createElement('div');
    div.className = 'mural-post';
    div.innerHTML = `
        <div class="mural-post-nome">${escapeHtml(post.nome)} ❤️</div>
        <div class="mural-post-texto">${escapeHtml(post.texto)}</div>
        <div class="mural-post-data">${post.data}</div>
        <button class="mural-post-del" onclick="deletarPost(${realIndex})" title="Remover">✕</button>
    `;
    container.appendChild(div);
}

function adicionarMensagem() {
    const nome  = document.getElementById('muralNome').value.trim();
    const texto = document.getElementById('muralTexto').value.trim();

    if (!texto) { mostrarToast('Escreva uma mensagem primeiro 💕'); return; }

    const posts = JSON.parse(localStorage.getItem('muralPosts') || '[]');
    posts.push({
        nome: nome || 'Anônimo',
        texto,
        data: new Date().toLocaleDateString('pt-BR', { day: '2-digit', month: 'long', year: 'numeric' })
    });
    localStorage.setItem('muralPosts', JSON.stringify(posts));

    document.getElementById('muralNome').value  = '';
    document.getElementById('muralTexto').value = '';
    carregarMural();
    mostrarToast('Mensagem adicionada ao mural! 💕');
}

function deletarPost(index) {
    const posts = JSON.parse(localStorage.getItem('muralPosts') || '[]');
    posts.splice(index, 1);
    localStorage.setItem('muralPosts', JSON.stringify(posts));
    carregarMural();
}

function addEmoji(emoji) {
    const textarea = document.getElementById('muralTexto');
    textarea.value += emoji;
    textarea.focus();
}

function escapeHtml(text) {
    return text
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;');
}

// ══════════════════════════════════════════
//   CINEMA
// ══════════════════════════════════════════
function tocarVideo() {
    const video = document.getElementById("videoCinema");
    video.play();
    video.scrollIntoView({ behavior: "smooth", block: "center" });
}

// ══════════════════════════════════════════
//   EASTER EGG
// ══════════════════════════════════════════
const mensagensSecretas = [
    "Você sabia que a probabilidade de duas almas se encontrarem é de 1 em 7 bilhões? E mesmo assim, a gente se achou. ❤️",
    "Se eu pudesse voltar no tempo, escolheria te conhecer de novo. Sempre. 💕",
    "Você é a minha resposta favorita para qualquer pergunta. 🌹",
    "Obrigado por existir na minha vida. Isso muda tudo. ✨",
    "Cada dia ao seu lado é uma aventura que eu nunca quero terminar. 💖",
    "Você não é perfeita, mas pra mim é exatamente o que eu precisava. 😊❤️",
    "O melhor título que já tive foi o de te chamar de minha. 💝",
];

let indiceEaster = Math.floor(Math.random() * mensagensSecretas.length);

function mostrarEasterEgg() {
    document.getElementById('easterMsg').textContent = mensagensSecretas[indiceEaster];
    document.getElementById('easterEggModal').classList.add('open');
    document.body.style.overflow = 'hidden';
}

function fecharEasterEgg() {
    document.getElementById('easterEggModal').classList.remove('open');
    document.body.style.overflow = '';
}

function proximaMensagemSecreta() {
    indiceEaster = (indiceEaster + 1) % mensagensSecretas.length;
    document.getElementById('easterMsg').textContent = mensagensSecretas[indiceEaster];
}

// ══════════════════════════════════════════
//   TOAST
// ══════════════════════════════════════════
let toastTimer;
function mostrarToast(msg) {
    const t = document.getElementById('toast');
    t.textContent = msg;
    t.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => t.classList.remove('show'), 3200);
}

// ══════════════════════════════════════════
//   TECLA KONAMI (Easter egg secreto)
// ══════════════════════════════════════════
const konami = ['ArrowUp','ArrowUp','ArrowDown','ArrowDown','ArrowLeft','ArrowRight','ArrowLeft','ArrowRight','b','a'];
let konamiIdx = 0;
document.addEventListener('keydown', e => {
    if (e.key === konami[konamiIdx]) {
        konamiIdx++;
        if (konamiIdx === konami.length) {
            konamiIdx = 0;
            chuvaDeCoracoes();
        }
    } else {
        konamiIdx = 0;
    }
});

function chuvaDeCoracoes() {
    mostrarToast('🎉 Código secreto encontrado! Chuva de amor!');
    for (let i = 0; i < 60; i++) {
        setTimeout(() => {
            const h = document.createElement('div');
            h.style.cssText = `
                position:fixed; z-index:999998; pointer-events:none;
                left:${Math.random()*100}vw; top:-30px;
                font-size:${Math.random()*24+14}px;
                animation: floatUp ${Math.random()*3+2}s linear forwards;
                color: rgba(255,77,141,0.9);
            `;
            h.textContent = ['❤️','💕','💖','💝','🌹'][Math.floor(Math.random()*5)];
            document.body.appendChild(h);
            setTimeout(() => h.remove(), 5000);
        }, i * 80);
    }
}