// DATA SIMULASI TUGAS
const assignments = [
    {
        id: 1,
        title: "Tugas 1",
        category: "tugas1",
        categoryLabel: "Pertemuan 4",
        description: "Tugas membuat contoh algoritma di kehidupan sehari hari.",
        date: "30 Maret 2026",
        link: "https://drive.google.com/file/d/1racHzHq1d7nJ_RzegBh8BZR_xRrz0cSI/view?usp=drive_link"
    },
    {
        id: 2,
        title: "Tugas 2",
        category: "tugas2",
        categoryLabel: "Pertemuan 5",
        description: "Mengerjakan tugas post test sebanyak 5 soal.",
        date: "12 April 2026",
        link: "https://drive.google.com/file/d/1Z7tLLwH1FevbNAX3qkfmwW3Z0LvH7DPw/view?usp=sharing"
    },
    {
        id: 3,
        title: "Tugas 3",
        category: "tugas3",
        categoryLabel: "Pertemuan 9",
        description: "Mengerjakan tugas post test sebanyak 4 soal.",
        date: "02 Mei 2026",
        link: "https://drive.google.com/file/d/1Zcg3efOMPFTFJOA9DOQqqgD4DfKAAlTG/view?usp=drive_link"
    },
    {
        id: 4,
        title: "Tugas 4",
        category: "tugas4",
        categoryLabel: "Pertemuan 10",
        description: "Tugas membuat Algoritma Skuensial dari sebuah kasus, Terdiri dari Flowchart, Psodocode/Diskripsi Program dan Programnya menggunakan bahasa pemrograman python.",
        date: "16 Mei 2026",
        link: "https://drive.google.com/file/d/1RRmwyYhPLGHUvhPvP8a847zcj4RVjwaH/view?usp=drive_link"
    },
    {
        id: 5,
        title: "Tugas 5",
        category: "tugas5",
        categoryLabel: "Pertemuan 11",
        description: "Memuat program yang terdiri dari Perulangan Struktur For, Perulangan Struktur While, Perulangan Struktur Do-While, Perulangan Bersarang (Nested Loop) degan menggunakan bahasa pemrograman python.",
        date: "18 Mei 2026",
        link: "https://drive.google.com/file/d/1jr0LSTVFoPrNets3TNh0uSxqJIoJGeN5/view?usp=sharing"
    },
];

// ELEMEN DOM
const assignmentGrid = document.getElementById('assignmentGrid');
const searchInput = document.getElementById('searchInput');
const filterButtons = document.querySelectorAll('.filter-btn');
const themeToggle = document.getElementById('themeToggle');
const menuToggle = document.getElementById('menuToggle');
const navMenu = document.getElementById('navMenu');

/* =======================================
   1. FITUR DARK / LIGHT MODE
   ======================================= */
// Cek preferensi tema pengguna sebelumnya di localStorage
const currentTheme = localStorage.getItem('theme') || 'light';
document.documentElement.setAttribute('data-theme', currentTheme);
updateThemeIcon(currentTheme);

themeToggle.addEventListener('click', () => {
    let theme = document.documentElement.getAttribute('data-theme');
    let newTheme = theme === 'dark' ? 'light' : 'dark';
    
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    updateThemeIcon(newTheme);
});

function updateThemeIcon(theme) {
    const icon = themeToggle.querySelector('i');
    if (theme === 'dark') {
        icon.className = 'fas fa-sun'; // Tampilkan ikon matahari saat mode gelap
    } else {
        icon.className = 'fas fa-moon'; // Tampilkan ikon bulan saat mode terang
    }
}

/* =======================================
   2. FITUR RESPONSIVE MENU MOBILE
   ======================================= */
menuToggle.addEventListener('click', () => {
    navMenu.classList.toggle('show');
    // Ganti ikon hamburger ke 'X' saat terbuka
    const icon = menuToggle.querySelector('i');
    icon.classList.toggle('fa-bars');
    icon.classList.toggle('fa-times');
});

// Tutup menu otomatis saat link navigasi di-klik (untuk mobile)
document.querySelectorAll('nav ul li a').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('show');
        menuToggle.querySelector('i').className = 'fas fa-bars';
    });
});


/* =======================================
   3. FITUR LOGIKA PORTFOLIO TUGAS
   ======================================= */
function displayAssignments(data) {
    assignmentGrid.innerHTML = ""; 

    if (data.length === 0) {
        assignmentGrid.innerHTML = `<p style="grid-column: 1/-1; text-align: center; color: var(--text-muted); padding: 2rem;">Tugas tidak ditemukan.</p>`;
        return;
    }

    data.forEach(task => {
        const cardHTML = `
            <div class="card">
                <div class="card-header">
                    ${task.title}
                    <span class="badge ${task.category}">${task.categoryLabel}</span>
                </div>
                <div class="card-body">
                    <p>${task.description}</p>
                    <div class="card-footer">
                        <span class="date"><i class="far fa-calendar-alt"></i> ${task.date}</span>
                        <a href="${task.link}" class="view-btn">Buka Tugas <i class="fas fa-external-link-alt"></i></a>
                    </div>
                </div>
            </div>
        `;
        assignmentGrid.insertAdjacentHTML('beforeend', cardHTML);
    });
}

function filterAndSearch() {
    const activeFilter = document.querySelector('.filter-btn.active').getAttribute('data-filter');

    const filteredData = assignments.filter(task => {
        const matchesSearch = task.title.toLowerCase() || task.description.toLowerCase().includes(searchTarget);
        const matchesFilter = activeFilter === 'all' || task.category === activeFilter;
        return matchesSearch && matchesFilter;
    });

    displayAssignments(filteredData);
}

filterButtons.forEach(button => {
    button.addEventListener('click', (e) => {
        filterButtons.forEach(btn => btn.classList.remove('active'));
        e.target.classList.add('active');
        filterAndSearch();
    });
});

// Jalankan saat web pertama kali dibuka
document.addEventListener('DOMContentLoaded', () => {
    displayAssignments(assignments);
});