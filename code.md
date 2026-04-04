<!DOCTYPE html>

<html lang="en"><head>
<meta charset="utf-8"/>
<meta content="width=device-width, initial-scale=1.0" name="viewport"/>
<script src="https://cdn.tailwindcss.com?plugins=forms,container-queries"></script>
<link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&amp;display=swap" rel="stylesheet"/>
<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght@100..700,0..1&amp;display=swap" rel="stylesheet"/>
<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&amp;display=swap" rel="stylesheet"/>
<script id="tailwind-config">
      tailwind.config = {
        darkMode: "class",
        theme: {
          extend: {
            colors: {
              "on-tertiary-fixed": "#301400",
              "on-tertiary-container": "#ffe0cd",
              "inverse-on-surface": "#f0f1f2",
              "error": "#ba1a1a",
              "surface-variant": "#e1e3e4",
              "outline-variant": "#ccc3d8",
              "background": "#f8f9fa",
              "on-tertiary": "#ffffff",
              "on-error-container": "#93000a",
              "tertiary-fixed": "#ffdcc6",
              "on-primary-container": "#ede0ff",
              "secondary": "#6e3aca",
              "primary": "#630ed4",
              "on-error": "#ffffff",
              "tertiary-fixed-dim": "#ffb784",
              "outline": "#7b7487",
              "tertiary": "#7d3d00",
              "on-background": "#191c1d",
              "surface": "#f8f9fa",
              "primary-fixed": "#eaddff",
              "surface-dim": "#d9dadb",
              "on-secondary-fixed": "#250059",
              "on-primary-fixed": "#25005a",
              "surface-container": "#edeeef",
              "surface-tint": "#732ee4",
              "inverse-primary": "#d2bbff",
              "surface-container-highest": "#e1e3e4",
              "secondary-fixed-dim": "#d3bbff",
              "on-primary": "#ffffff",
              "on-secondary-fixed-variant": "#581db3",
              "on-secondary-container": "#fffbff",
              "inverse-surface": "#2e3132",
              "surface-bright": "#f8f9fa",
              "surface-container-low": "#f3f4f5",
              "secondary-fixed": "#ebddff",
              "secondary-container": "#8856e5",
              "surface-container-lowest": "#ffffff",
              "on-tertiary-fixed-variant": "#713700",
              "on-surface-variant": "#4a4455",
              "on-primary-fixed-variant": "#5a00c6",
              "on-surface": "#191c1d",
              "tertiary-container": "#a15100",
              "surface-container-high": "#e7e8e9",
              "on-secondary": "#ffffff",
              "primary-fixed-dim": "#d2bbff",
              "primary-container": "#7c3aed",
              "error-container": "#ffdad6"
            },
            fontFamily: {
              "headline": ["Plus Jakarta Sans"],
              "body": ["Plus Jakarta Sans"],
              "label": ["Plus Jakarta Sans"]
            },
            borderRadius: {"DEFAULT": "1rem", "lg": "2rem", "xl": "3rem", "full": "9999px"},
          },
        },
      }
    </script>
<style>
      body { font-family: 'Plus Jakarta Sans', sans-serif; }
      .material-symbols-outlined {
        font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24;
      }
      .ambient-shadow {
        shadow-[0_40px_40px_-15px_rgba(99,14,212,0.04)];
      }
    </style>
</head>
<body class="bg-surface text-on-surface font-body antialiased">
<!-- Top Navigation Bar -->
<header class="fixed top-0 w-full z-50 bg-white/70 backdrop-blur-xl shadow-[0_40px_40px_-15px_rgba(99,14,212,0.04)] h-20 px-8 flex justify-between items-center max-w-full">
<div class="flex items-center gap-12">
<span class="text-2xl font-bold tracking-tight text-zinc-900">The Culinary Curator</span>
<nav class="hidden md:flex gap-8">
<a class="text-zinc-500 hover:text-violet-500 transition-colors" href="#">Explore</a>
<a class="text-zinc-500 hover:text-violet-500 transition-colors" href="#">Reservations</a>
<a class="text-zinc-500 hover:text-violet-500 transition-colors" href="#">Private Dining</a>
</nav>
</div>
<div class="flex items-center gap-6">
<div class="flex gap-4">
<button class="p-2 text-zinc-500 hover:bg-zinc-50 transition-all rounded-full active:scale-95">
<span class="material-symbols-outlined" data-icon="notifications">notifications</span>
</button>
<button class="p-2 text-zinc-500 hover:bg-zinc-50 transition-all rounded-full active:scale-95">
<span class="material-symbols-outlined" data-icon="favorite">favorite</span>
</button>
</div>
<div class="w-10 h-10 rounded-full bg-zinc-200 overflow-hidden ring-2 ring-violet-100">
<img alt="User profile avatar" data-alt="Close-up portrait of a professional man in a minimal grey studio setting with soft lighting" src="https://lh3.googleusercontent.com/aida-public/AB6AXuD_hSFiicwT9OhAJ2dnQo2ClG2siEH879MQb1d4sg65dzGaBCVO4m5HtXd7QszieEhtuI0G7AU-AhFIfWTVWWHx0Rm98OEv88VvfbIG6JYGbW6_eODCrvtVxoozG-Kj_1Vhv7Pr-_zwZOYhpKiveXs2gEFW2i4r1kEfSEOqOeqbbUwvQJvQkUQhEfzK9-nJd-6d8-a0H1JpPKE091wM-PWF_ylTD1jx2gZNVvLS98Mzm0Z6F9p2szeANDQe9jTk5Wkkjbfyxhq3FTvN"/>
</div>
</div>
</header>
<div class="flex min-h-screen pt-20">
<!-- Side Navigation Bar -->
<aside class="h-[calc(100vh-5rem)] w-64 sticky top-20 bg-zinc-50 flex flex-col py-12 pl-6 space-y-2 font-medium text-sm">
<div class="mb-10 pr-6">
<h3 class="text-lg font-bold text-zinc-900">Alex Mercer</h3>
<p class="text-zinc-400 font-normal">Gold Member</p>
</div>
<a class="flex items-center gap-3 px-4 py-3 text-zinc-500 hover:translate-x-1 transition-transform hover:text-violet-500" href="#">
<span class="material-symbols-outlined" data-icon="dashboard">dashboard</span>
<span>Dashboard</span>
</a>
<a class="flex items-center gap-3 px-4 py-3 bg-white text-violet-600 rounded-l-full shadow-sm transition-all duration-200" href="#">
<span class="material-symbols-outlined" data-icon="history" style="font-variation-settings: 'FILL' 1;">history</span>
<span>Booking History</span>
</a>
<a class="flex items-center gap-3 px-4 py-3 text-zinc-500 hover:translate-x-1 transition-transform hover:text-violet-500" href="#">
<span class="material-symbols-outlined" data-icon="lock">lock</span>
<span>Password</span>
</a>
<div class="pt-8">
<a class="flex items-center gap-3 px-4 py-3 text-zinc-500 hover:translate-x-1 transition-transform hover:text-error" href="#">
<span class="material-symbols-outlined" data-icon="logout">logout</span>
<span>Logout</span>
</a>
</div>
</aside>
<!-- Main Content -->
<main class="flex-1 px-12 py-16 bg-surface">
<!-- Header Section -->
<div class="mb-12">
<h1 class="text-[3.5rem] font-bold text-on-surface leading-tight tracking-tight mb-4 font-headline">Booking History</h1>
<p class="text-body-lg text-on-surface-variant max-w-2xl">Manage your upcoming gastronomic experiences and revisit your past culinary journeys.</p>
</div>
<!-- Filter Tabs -->
<div class="flex items-center gap-4 mb-12 overflow-x-auto pb-4">
<button class="flex items-center gap-2 px-6 py-3 rounded-full bg-primary text-on-primary font-semibold shadow-lg shadow-primary/20 transition-all active:scale-95">
<span>Upcoming</span>
<span class="bg-white/20 px-2 py-0.5 rounded-full text-xs">2</span>
</button>
<button class="flex items-center gap-2 px-6 py-3 rounded-full bg-surface-container-high text-on-surface-variant font-medium hover:bg-surface-container-highest transition-colors">
<span>Completed</span>
<span class="bg-zinc-200 px-2 py-0.5 rounded-full text-xs text-zinc-600">14</span>
</button>
<button class="flex items-center gap-2 px-6 py-3 rounded-full bg-surface-container-high text-on-surface-variant font-medium hover:bg-surface-container-highest transition-colors">
<span>Canceled</span>
<span class="bg-zinc-200 px-2 py-0.5 rounded-full text-xs text-zinc-600">1</span>
</button>
</div>
<!-- Booking List Grid -->
<div class="grid grid-cols-1 gap-8">
<!-- Booking Card 1: Confirmed -->
<div class="group bg-surface-container-lowest rounded-xl p-6 flex flex-col md:flex-row items-center gap-8 shadow-[0_40px_40px_-15px_rgba(99,14,212,0.04)] hover:scale-[1.01] transition-all duration-300">
<div class="w-full md:w-32 h-32 rounded-lg overflow-hidden flex-shrink-0">
<img alt="Restaurant interior" class="w-full h-full object-cover" data-alt="Interior of a luxury French restaurant with white tablecloths, crystal chandeliers, and lush indoor garden walls" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAuKQmCAA6FCPWRPbtWr8dPpre-YRk-O-UcCDSWSv9O2KN6mYcMRpCvUYj9yPLIRZ8rjAqV5ZcnBtny6rIrEkCIYrXPrIDttKPLL02FGS_7gQGepjsLNt0WdlUW-DLkPaxSPLDkN1DsEwgL3UpI25pIayF0ffdJQbTD0dvzjv-C7EuQNbbQIcERVwLqyUcWTYQkCCyEW9B13uiNLLRxqLYeLELH0DZgJtL9wVD382T7Rrjkp1OrTBnZR8EyKfcf7eklwnxmA7eV9un4"/>
</div>
<div class="flex-1 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 w-full">
<div>
<span class="text-xs font-bold text-primary uppercase tracking-widest block mb-1">#CR-78291</span>
<h3 class="text-xl font-bold text-zinc-900">Le Jardin d'Or</h3>
</div>
<div class="flex flex-col justify-center">
<div class="flex items-center gap-2 text-on-surface-variant text-sm mb-1">
<span class="material-symbols-outlined text-base" data-icon="calendar_today">calendar_today</span>
<span>Oct 24, 2024</span>
</div>
<div class="flex items-center gap-2 text-on-surface-variant text-sm font-semibold">
<span class="material-symbols-outlined text-base" data-icon="schedule">schedule</span>
<span>19:00</span>
</div>
</div>
<div class="flex flex-col justify-center">
<div class="flex items-center gap-2 text-on-surface-variant text-sm mb-1">
<span class="material-symbols-outlined text-base" data-icon="group">group</span>
<span>2 Guests</span>
</div>
<div class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-bold w-fit">
<span class="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                                Confirmed
                            </div>
</div>
<div class="flex items-center justify-end gap-3">
<button class="px-5 py-2.5 text-sm font-semibold text-primary hover:bg-primary-fixed rounded-full transition-colors">
                                View Details
                            </button>
<button class="px-5 py-2.5 text-sm font-semibold text-error/70 hover:text-error hover:bg-error-container/20 rounded-full transition-colors">
                                Cancel
                            </button>
</div>
</div>
</div>
<!-- Booking Card 2: Pending -->
<div class="group bg-surface-container-lowest rounded-xl p-6 flex flex-col md:flex-row items-center gap-8 shadow-[0_40px_40px_-15px_rgba(99,14,212,0.04)] hover:scale-[1.01] transition-all duration-300">
<div class="w-full md:w-32 h-32 rounded-lg overflow-hidden flex-shrink-0">
<img alt="Modern restaurant interior" class="w-full h-full object-cover" data-alt="Modern high-end sushi bar with dark wood textures, warm amber lighting, and minimalist Japanese decor" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDY1IXdl7LKc3cj51dcyOUIt6EUqU0q1yDn8COsIZZLWo0SH7ebZFswb2MxDt35adIwKEtoRAA_uWGdOVPCf-WKUbydbSoTUY1f7tVcKNctNLV7tWYijKxqdyoEksU90Xikms8akXIxm_aTL0F2rckAIym76jaWHvo9VL6DuW93YU29_KVupOuYtx1GPwc6sg04tXynoY8sHwP6PBJPO3fJo4o-0IjwUqc7WzBNn2GbzBgYVYcK3z-v_FhaKcpQIPRlxna9h5bRnj17"/>
</div>
<div class="flex-1 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 w-full">
<div>
<span class="text-xs font-bold text-primary uppercase tracking-widest block mb-1">#CR-78452</span>
<h3 class="text-xl font-bold text-zinc-900">Umami Heights</h3>
</div>
<div class="flex flex-col justify-center">
<div class="flex items-center gap-2 text-on-surface-variant text-sm mb-1">
<span class="material-symbols-outlined text-base" data-icon="calendar_today">calendar_today</span>
<span>Oct 28, 2024</span>
</div>
<div class="flex items-center gap-2 text-on-surface-variant text-sm font-semibold">
<span class="material-symbols-outlined text-base" data-icon="schedule">schedule</span>
<span>20:30</span>
</div>
</div>
<div class="flex flex-col justify-center">
<div class="flex items-center gap-2 text-on-surface-variant text-sm mb-1">
<span class="material-symbols-outlined text-base" data-icon="group">group</span>
<span>4 Guests</span>
</div>
<div class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-orange-50 text-orange-700 text-xs font-bold w-fit">
<span class="w-1.5 h-1.5 rounded-full bg-orange-500"></span>
                                Pending
                            </div>
</div>
<div class="flex items-center justify-end gap-3">
<button class="px-5 py-2.5 text-sm font-semibold text-primary hover:bg-primary-fixed rounded-full transition-colors">
                                View Details
                            </button>
<button class="px-5 py-2.5 text-sm font-semibold text-error/70 hover:text-error hover:bg-error-container/20 rounded-full transition-colors">
                                Cancel
                            </button>
</div>
</div>
</div>
<!-- Empty State (Optional Visibility - for design purpose) -->
<!-- <div class="mt-12 py-24 flex flex-col items-center justify-center text-center bg-surface-container-low rounded-xl border-2 border-dashed border-outline-variant/20">
                    <div class="w-48 h-48 mb-6 flex items-center justify-center rounded-full bg-white/50 backdrop-blur">
                        <span class="material-symbols-outlined text-8xl text-zinc-200" data-icon="restaurant_menu">restaurant_menu</span>
                    </div>
                    <h3 class="text-2xl font-bold text-zinc-900 mb-2">No bookings found</h3>
                    <p class="text-on-surface-variant mb-8 max-w-sm">It seems you haven't made any reservations for this period yet. Ready for your next feast?</p>
                    <button class="px-10 py-4 rounded-full bg-primary text-on-primary font-bold shadow-xl shadow-primary/30 transition-all hover:translate-y-[-2px] active:scale-95">
                        Book a Table
                    </button>
                </div> -->
</div>
</main>
</div>
<!-- Footer -->
<footer class="w-full py-20 mt-40 bg-zinc-50 border-t border-zinc-200/20 flex flex-col md:flex-row justify-between items-center px-12 gap-8">
<div class="flex flex-col gap-4 text-center md:text-left">
<span class="text-base font-semibold text-zinc-800">The Culinary Curator</span>
<p class="font-label text-xs uppercase tracking-widest text-zinc-400">© 2024 The Culinary Curator. All rights reserved.</p>
</div>
<div class="flex gap-8">
<a class="font-label text-xs uppercase tracking-widest text-zinc-400 hover:text-violet-500 transition-colors opacity-80 hover:opacity-100" href="#">Privacy Policy</a>
<a class="font-label text-xs uppercase tracking-widest text-zinc-400 hover:text-violet-500 transition-colors opacity-80 hover:opacity-100" href="#">Terms of Service</a>
<a class="font-label text-xs uppercase tracking-widest text-zinc-400 hover:text-violet-500 transition-colors opacity-80 hover:opacity-100" href="#">Contact Us</a>
<a class="font-label text-xs uppercase tracking-widest text-zinc-400 hover:text-violet-500 transition-colors opacity-80 hover:opacity-100" href="#">Careers</a>
</div>
</footer>
</body></html>