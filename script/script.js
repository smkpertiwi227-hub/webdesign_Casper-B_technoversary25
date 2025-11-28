document.addEventListener("DOMContentLoaded", function() {
            AOS.init({
                duration: 1000,
                once: true,
                offset: 100,
                easing: 'ease-in-out'
            });

            const loadingScreen = document.getElementById('preloader');
            const navbar = document.getElementById('navbar');
            const mobileMenuToggle = document.getElementById('mobileMenuToggle');
            const navMenu = document.getElementById('navMenu');
            const navLinks = document.querySelectorAll('.nav-link');
            const filterButtons = document.querySelectorAll('.filter-btn');
            const generateBtn = document.getElementById('generatePlan');
            const contactForm = document.getElementById('contactForm');
            const resultsGrid = document.getElementById('resultsGrid');
            const sections = document.querySelectorAll("section[id]");
            const desktopLinks = document.querySelectorAll(".nav-link");
            const mobileLinks = document.querySelectorAll(".mobile-nav-menu a");


            window.addEventListener("load", () => {
                const loader = document.getElementById("preloader");

                setTimeout(() => {
                    loader.classList.add("hidden");

                    setTimeout(() => {
                        loader.style.display = "none";
                    }, 600);

                }, 2500);
            });

            window.addEventListener('scroll', function() {
                if (window.scrollY > 50) {
                    navbar.classList.add('scrolled');
                } else {
                    navbar.classList.remove('scrolled');
                }
            });

            mobileMenuToggle.addEventListener('click', function() {
                navMenu.classList.toggle('active');
                mobileMenuToggle.classList.toggle('active');
            });

            navLinks.forEach(function(link) {
                link.addEventListener('click', function(e) {
                    if (navMenu.classList.contains('active')) {
                        navMenu.classList.remove('active');
                        mobileMenuToggle.classList.remove('active');
                    }
                });
            });

            filterButtons.forEach(button => {
                button.addEventListener('click', function() {
                    filterButtons.forEach(btn => btn.classList.remove('active'));
                    this.classList.add('active');
                    const filterValue = this.getAttribute('data-filter');
                    const items = document.querySelectorAll('.result-item');

                    items.forEach(item => {
                        const categories = item.getAttribute('data-category').split(' ');
                        if (filterValue === 'all' || categories.includes(filterValue)) {
                            item.style.display = 'block';
                            item.style.opacity = '1';
                        } else {
                            item.style.opacity = '0';
                            setTimeout(() => {
                                item.style.display = 'none';
                            }, 300);
                        }
                    });
                    const visibleCount = Array.from(items).filter(item => item.style.display !== 'none').length;
                    document.querySelector('.results-count').textContent = `${visibleCount} destinations found`;
                });
            });

            if (generateBtn) {
                generateBtn.addEventListener('click', function() {
                    const durationValue = document.querySelector('input[name="duration"]:checked').value;
                    const activityValue = document.querySelector('.activity-select').value;
                    console.log('Generating itinerary for ' + durationValue + ' days and ' + activityValue + ' activity level.');
                    resultsGrid.style.opacity = '0.5';
                    setTimeout(function() {
                        resultsGrid.style.opacity = '1';
                    }, 500);
                });
            }

            if (contactForm) {
                contactForm.addEventListener('submit', function(e) {
                    e.preventDefault();
                    console.log('Form submitted.');
                    contactForm.reset();
                });
            }


            const places = {
                1: {
                    title: 'Telaga Biru Cicerem',
                    img: 'assets/gif/telagaBiru.gif',
                    desc: 'Telaga alami dengan air berwarna biru jernih yang menjadi daya tarik utama. Kejernihan airnya memungkinkan pengunjung melihat ikan-ikan yang berenang di dasar telaga. Suasana sekitarnya tenang dan sejuk, menjadikannya tempat ideal untuk menikmati keindahan alam dan berfoto.',
                    mapQuery: 'Telaga Biru Cicerem Kuningan'
                },
                2: {
                    title: 'Curug Putri',
                    img: 'assets/gif/curugPutri.gif',
                    desc: 'Air terjun mungil yang berada di kawasan Palutungan ini memiliki dinding bebatuan alami yang membentuk koridor unik, menciptakan kesan seperti mini canyon. Kolam airnya jernih dan dingin, cocok untuk bermain air ringan atau sekadar relaksasi sambil menikmati suasana alam.',
                    mapQuery: 'Curug Putri Kuningan'
                },
                3: {
                    title: 'Gunung Ciremai',
                    img: 'assets/gif/gunungCiremai.gif',
                    desc: 'Gunung tertinggi di Jawa Barat yang menawarkan jalur pendakian menantang sekaligus panorama alam luar biasa. Pengunjung dapat menikmati hutan tropis, padang edelweiss, hingga pemandangan puncak yang memukau. Tempat ini sangat populer bagi pecinta alam dan pendaki yang ingin merasakan pengalaman mendaki berkualitas.',
                    mapQuery: 'Gunung Ciremai Kuningan'
                },
                4: {
                    title: 'Kebun Raya Kuningan',
                    img: 'assets/gif/kebun raya Kuningan.gif',
                    desc: 'Kawasan konservasi dan edukasi yang menyajikan koleksi berbagai jenis tanaman tropis, pepohonan besar, dan ruang terbuka hijau yang luas. Tempat ini cocok untuk wisata keluarga, kegiatan edukatif, atau sekadar berjalan santai sembari menikmati udara sejuk khas pegunungan.',
                    mapQuery: 'Kebun Raya Kuningan'
                },
                5: {
                    title: 'cibulan',
                    img: 'assets/gif/cibulan.gif',
                    desc: 'Objek wisata pemandian air jernih yang terkenal dengan ikan-ikan besar yang hidup bersama pengunjung di dalam kolam. Selain kesegaran airnya, tempat ini juga memiliki nilai sejarah dan mitos lokal yang menjadikannya unik. Sangat cocok untuk wisata keluarga atau relaksasi ringan.',
                    mapQuery: 'cibulan Kuningan'
                },

            }

            let next = document.getElementById('next');
            let prev = document.getElementById('prev');
            let slide = document.querySelector('.alamnusa-slide');

            if (next && prev && slide) {
                next.onclick = function() {
                    let list = document.querySelectorAll('.alamnusa-slide .alamnusa-item');
                    slide.appendChild(list[0]);
                }
                prev.onclick = function() {
                    let list = document.querySelectorAll('.alamnusa-slide .alamnusa-item');
                    slide.prepend(list[list.length - 1]);
                }
            }

            const modal = document.getElementById('myModal');
            const closeModalBtn = document.getElementById('closeModalBtn');
            const modalImg = document.getElementById('modalImage');
            const modalTitle = document.getElementById('modalTitle');
            const modalDesc = document.getElementById('modalDescription');
            const modalMap = document.getElementById('modalMap');

            function closeModal() {
                if (modal) {
                    modal.classList.remove('show');
                    modal.setAttribute('aria-hidden', 'true');
                    modalMap.src = '';
                }
            }

            document.querySelectorAll('[data-open]').forEach(btn => {
                btn.addEventListener('click', (event) => {
                    event.stopPropagation();

                    const id = btn.getAttribute('data-open');
                    const info = places[id];
                    if (!info) return console.warn('no data for id', id);

                    modalImg.src = info.img;
                    modalImg.alt = info.title;
                    modalTitle.textContent = info.title;
                    modalDesc.textContent = info.desc;

                    const q = encodeURIComponent(info.mapQuery);
                    modalMap.src = `https://maps.google.com/maps?q=${q}&output=embed`;

                    modal.classList.add('show');
                    modal.setAttribute('aria-hidden', 'false');
                });
            });

            if (closeModalBtn) {
                closeModalBtn.addEventListener('click', closeModal);
            }
            if (modal) {
                modal.addEventListener('click', (e) => {
                    if (e.target === modal) closeModal();
                });
            }

            const options = {
                root: null,
                rootMargin: "-50px 0px -50px 0px",
                threshold: 0.25
            };

            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const id = entry.target.getAttribute("id");

                        navLinks.forEach(link => {
                            link.classList.remove("active");
                            if (link.getAttribute("href") === `#${id}`) {
                                link.classList.add("active");
                            }
                        });
                    }
                });
            }, options);

            document.querySelectorAll("section[id]").forEach(section => {
                observer.observe(section);
            });
            const searchInput = document.getElementById('searchInput');

            if (searchInput) {
                searchInput.addEventListener('keyup', function() {
                    const searchValue = searchInput.value.toLowerCase();
                    const items = document.querySelectorAll('.result-item');

                    items.forEach(item => {
                        const title = item.querySelector('h4').textContent.toLowerCase();

                        if (title.includes(searchValue)) {
                            item.style.display = 'block';
                            item.style.opacity = '1';
                        } else {
                            item.style.opacity = '0';
                            setTimeout(() => {
                                item.style.display = 'none';
                            }, 250);
                        }
                    });
                });
            }
            const chatBtn = document.getElementById("chatbotButton");
            const chatWindow = document.getElementById("chatbotWindow");
            const chatInput = document.getElementById("chatInput");
            const chatMessages = document.getElementById("chatMessages");
            const typingIndicator = document.getElementById("typingIndicator");


            function addMessage(text, sender) {
                const msg = document.createElement("div");
                msg.classList.add("msg", sender);
                msg.textContent = text;
                chatMessages.appendChild(msg);
                chatMessages.scrollTop = chatMessages.scrollHeight;
            }

            function botReply(text) {
                typingIndicator.classList.remove("hidden");

                setTimeout(() => {
                    typingIndicator.classList.add("hidden");
                    addMessage(text, "bot");
                }, 900);
            }

            chatBtn.addEventListener("click", () => {
                chatWindow.style.display = chatWindow.style.display === "flex" ? "none" : "flex";
            });

            function similarityScore(input, pattern) {
                const inputWords = input.split(" ");
                const patternWords = pattern.split(" ");
                let score = 0;

                patternWords.forEach(word => {
                    if (inputWords.includes(word)) score++;
                });

                return score / patternWords.length;
            }

            function findIntent(text) {
                const cleaned = text.toLowerCase().trim();

                const intents = {
                    harga: [
                        "berapa harga tiket",
                        "harga masuk",
                        "htm berapa",
                        "harga tiket nya",
                        "bayar berapa"
                    ],
                    lokasi: [
                        "dimana lokasinya",
                        "alamat dimana",
                        "lokasi wisata",
                        "peta tempatnya",
                        "maps nya mana"
                    ],
                    saran: [
                        "rekomendasi wisata",
                        "saran tempat liburan",
                        "wisata terbaik",
                        "tempat yang bagus",
                        "tujuan liburan"
                    ],
                    cuaca: [
                        "cuaca hari ini",
                        "hujan atau tidak",
                        "panas ga disana",
                        "cerah ga"
                    ],
                    transport: [
                        "cara kesana",
                        "naik apa kesana",
                        "transport apa",
                        "rute ke lokasi"
                    ],
                    buka: [
                        "jam buka",
                        "jam operasional",
                        "tutup jam berapa",
                        "kapan buka"
                    ],
                    makanan: [
                        "tempat makan",
                        "makanan enak",
                        "kuliner",
                        "rekomendasi makanan"
                    ],
                    fasilitas: [
                        "fasilitas apa saja",
                        "toilet ada ga",
                        "spot foto",
                        "ada mushola ga"
                    ],
                    penginapan: [
                        "hotel terdekat",
                        "penginapan",
                        "nginap dimana",
                        "villa sekitar"
                    ],
                    tips: [
                        "tips wisata",
                        "apa yang harus dibawa",
                        "saran perjalanan"
                    ]
                };

                let bestIntent = "unknown";
                let highestScore = 0;

                for (let intent in intents) {
                    intents[intent].forEach(pattern => {
                        let sc = similarityScore(cleaned, pattern);
                        if (sc > highestScore) {
                            highestScore = sc;
                            bestIntent = intent;
                        }
                    });
                }

                return highestScore >= 0.3 ? bestIntent : "unknown";
            }

            function respondToIntent(intent) {
                const replies = {
                    harga: [
                        "Tiket murah kok. Telaga Biru 5–10k, Curug Putri 10k, Kebun Raya 15k.",
                        "Harga rata-rata 5k–20k, mau tanya yang mana?"
                    ],
                    lokasi: [
                        "Sebutkan tempatnya ya biar saya kasih titik Google Maps.",
                        "Contoh: lokasi Telaga Biru? Nanti saya kirimkan map-nya."
                    ],
                    saran: [
                        "Rekomen: Telaga Biru buat chill, Curug Putri buat main air.",
                        "Kalau suka view tinggi, Palutungan & Ciremai cocok banget."
                    ],
                    cuaca: [
                        "Cuaca biasanya cerah pagi dan hujan sore.",
                        "Saran: datang sebelum jam 1 biar aman dari hujan."
                    ],
                    transport: [
                        "Paling gampang: motor atau angkot dari terminal.",
                        "Ojol juga bisa sampai titik tertentu, sisanya jalan dikit."
                    ],
                    buka: [
                        "Rata-rata buka 07.00–17.00, kecuali Ciremai yang ngikut basecamp.",
                        "Datang pagi lebih enak biar gak rame."
                    ],
                    makanan: [
                        "Kuliner sekitar: Sawah Aguas, Sariwangi, Saung Maulana.",
                        "Kalau mau resto estetik, banyak di sekitar Palutungan."
                    ],
                    fasilitas: [
                        "Umumnya ada toilet, mushola, warung, dan spot foto.",
                        "Beberapa tempat juga ada area piknik & gazebo."
                    ],
                    penginapan: [
                        "Ada banyak villa & homestay sekitar Ciremai.",
                        "Kalau mau yang gampang, pilih hotel di pusat kota."
                    ],
                    tips: [
                        "Tips: bawa air, uang cash, jas hujan, powerbank.",
                        "Kalau ke curug: sandal anti slip wajib bro."
                    ],
                    unknown: [
                        "Coba jelasin lagi ya, biar saya nangkep maksud kamu.",
                        "Belum ke-detect nih, kamu tanya soal harga? lokasi? atau apa?"
                    ]
                };

                const list = replies[intent] || replies.unknown;
                return list[Math.floor(Math.random() * list.length)];
            }

            chatInput.addEventListener("keypress", function(e) {
                if (e.key === "Enter") {
                    const text = chatInput.value.toLowerCase().trim();
                    if (!text) return;

                    addMessage(text, "user");
                    chatInput.value = "";

                    const intent = findIntent(text);
                    botReply(respondToIntent(intent));
                }
            });

            const mobileItems = document.querySelectorAll(".mobile-nav .list");

            mobileItems.forEach(item =>
                item.addEventListener("click", () => {
                    mobileItems.forEach(li => li.classList.remove("active"));
                    item.classList.add("active");
                })
            );
            const closeChat = document.getElementById("closeChat");

            closeChat.addEventListener("click", () => {
                chatWindow.style.display = "none";
            });

            function setActiveLink() {
                let scrollY = window.scrollY + 150;

                sections.forEach(section => {
                    if (scrollY >= section.offsetTop && scrollY < section.offsetTop + section.offsetHeight) {
                        const id = section.getAttribute("id");

                        desktopLinks.forEach(link => {
                            link.classList.toggle("active", link.getAttribute("href") === "#" + id);
                        });

                        mobileLinks.forEach(link => {
                            link.classList.toggle("active", link.getAttribute("href") === "#" + id);
                        });
                    }
                });
            }

            window.addEventListener("scroll", setActiveLink);


            const nav = document.querySelector('.navbar');

            window.addEventListener('scroll', () => {
                if (window.scrollY > 20) {
                    nav.classList.add('navbar-scrolled');
                } else {
                    nav.classList.remove('navbar-scrolled');
                }
            });

        });

        const mobileLinks = document.querySelectorAll(".mobile-nav-menu .nav-link");
        const desktopLinks = document.querySelectorAll(".desktop-nav .nav-link");
        const sections = document.querySelectorAll("section[id]");

        mobileLinks.forEach(link => {
            link.addEventListener("click", () => {

                mobileLinks.forEach(l => l.classList.remove("active"));
                desktopLinks.forEach(l => l.classList.remove("active"));

                link.classList.add("active");
            });
        });

        function setActiveOnScroll() {
            let scrollY = window.scrollY + 150;

            sections.forEach(section => {
                if (scrollY >= section.offsetTop && scrollY < section.offsetTop + section.offsetHeight) {
                    const id = section.getAttribute("id");

                    mobileLinks.forEach(link => link.classList.remove("active"));
                    desktopLinks.forEach(link => link.classList.remove("active"));

                    mobileLinks.forEach(link => {
                        if (link.getAttribute("href") === "#" + id) {
                            link.classList.add("active");
                        }
                    });

                    desktopLinks.forEach(link => {
                        if (link.getAttribute("href") === "#" + id) {
                            link.classList.add("active");
                        }
                    });
                }
            });
        }

        window.addEventListener("scroll", setActiveOnScroll);

        function showToast(message) {
  const container = document.getElementById("toast-container");
  const toast = document.createElement("div");
  toast.className = "toast";
  toast.innerText = message;

  container.appendChild(toast);

  setTimeout(() => {
    toast.remove();
  }, 3500);
}
document.getElementById("generatePlan").addEventListener("click", function () {
  showToast("Anda telah memasukkan destinasi ke list!");
});
const canvas = document.getElementById("bgParticles");
const homeSection = document.getElementById("home");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const particles = [];

function createParticles() {
  const count = 35; // jumlah partikel, aman HP low end
  for (let i = 0; i < count; i++) {
    particles.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      radius: Math.random() * 6 + 2,
      color: "rgba(0, 255, 120, 0.45)", // hijau soft neon
      speedX: (Math.random() - 0.5) * 0.3,
      speedY: (Math.random() - 0.5) * 0.3
    });
  }
}

function animateParticles() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  
  particles.forEach(p => {
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
    ctx.fillStyle = p.color;
    ctx.shadowColor = "rgba(0, 255, 120, 0.6)";
    ctx.shadowBlur = 10;
    ctx.fill();

    p.x += p.speedX;
    p.y += p.speedY;

    if (p.x < 0 || p.x > canvas.width) p.speedX *= -1;
    if (p.y < 0 || p.y > canvas.height) p.speedY *= -1;
  });

  requestAnimationFrame(animateParticles);
}

window.addEventListener("resize", () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});

createParticles();
animateParticles();




canvas.style.display = "none";

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      canvas.style.display = "none";  // di home → hide
    } else {
      canvas.style.display = "block"; // keluar dari home → show
    }
  });
}, { threshold: 0.5 });

observer.observe(homeSection);
