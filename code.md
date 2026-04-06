<!DOCTYPE html>

<html lang="en"><head>
<meta charset="utf-8"/>
<meta content="width=device-width, initial-scale=1.0" name="viewport"/>
<title>Aura Reserve | Portfolio Overview</title>
<script src="https://cdn.tailwindcss.com?plugins=forms,container-queries"></script>
<link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&amp;display=swap" rel="stylesheet"/>
<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&amp;display=swap" rel="stylesheet"/>
<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&amp;display=swap" rel="stylesheet"/>
<script id="tailwind-config">
      tailwind.config = {
        darkMode: "class",
        theme: {
          extend: {
            colors: {
              "surface-dim": "#d9dadb",
              "secondary": "#6e3aca",
              "on-surface": "#191c1d",
              "tertiary": "#7d3d00",
              "primary-fixed": "#eaddff",
              "background": "#f8f9fa",
              "surface-bright": "#f8f9fa",
              "on-secondary-container": "#fffbff",
              "tertiary-fixed": "#ffdcc6",
              "primary": "#630ed4",
              "on-tertiary-fixed": "#301400",
              "secondary-fixed": "#ebddff",
              "surface-tint": "#732ee4",
              "on-primary-fixed": "#25005a",
              "primary-fixed-dim": "#d2bbff",
              "on-tertiary-fixed-variant": "#713700",
              "primary-container": "#7c3aed",
              "on-secondary-fixed": "#250059",
              "surface-container-highest": "#e1e3e4",
              "surface-container": "#edeeef",
              "on-primary": "#ffffff",
              "on-error": "#ffffff",
              "error-container": "#ffdad6",
              "tertiary-fixed-dim": "#ffb784",
              "surface-variant": "#e1e3e4",
              "on-surface-variant": "#4a4455",
              "surface": "#f8f9fa",
              "inverse-primary": "#d2bbff",
              "surface-container-low": "#f3f4f5",
              "surface-container-high": "#e7e8e9",
              "error": "#ba1a1a",
              "on-secondary": "#ffffff",
              "on-primary-fixed-variant": "#5a00c6",
              "on-tertiary": "#ffffff",
              "outline": "#7b7487",
              "secondary-fixed-dim": "#d3bbff",
              "surface-container-lowest": "#ffffff",
              "on-tertiary-container": "#ffe0cd",
              "on-primary-container": "#ede0ff",
              "outline-variant": "#ccc3d8",
              "secondary-container": "#8856e5",
              "inverse-on-surface": "#f0f1f2",
              "on-background": "#191c1d",
              "tertiary-container": "#a15100",
              "inverse-surface": "#2e3132",
              "on-error-container": "#93000a",
              "on-secondary-fixed-variant": "#581db3"
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
      .material-symbols-outlined { font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24; }
      .glass-card { backdrop-filter: blur(12px); background-color: rgba(255, 255, 255, 0.7); }
    </style>
</head>
<body class="bg-surface text-on-surface flex min-h-screen">
<!-- SideNavBar (Authority Source: JSON) -->
<aside class="hidden md:flex flex-col h-screen w-72 bg-slate-50 sticky top-0 p-6 space-y-8 rounded-r-[3rem] z-20">
<div class="flex flex-col space-y-1">
<h1 class="text-2xl font-extrabold text-violet-700">Aura Reserve</h1>
<p class="text-sm font-medium text-slate-500">Portfolio Manager</p>
</div>
<nav class="flex-1 space-y-2">
<!-- Active Tab: Portfolio Overview -->
<a class="flex items-center space-x-3 px-4 py-3 bg-white text-violet-700 shadow-sm rounded-2xl font-['Plus_Jakarta_Sans'] text-sm font-medium transition-transform duration-300" href="#">
<span class="material-symbols-outlined" data-icon="dashboard">dashboard</span>
<span>Portfolio Overview</span>
</a>
<a class="flex items-center space-x-3 px-4 py-3 text-slate-500 hover:text-violet-600 hover:translate-x-1 transition-transform duration-300 font-['Plus_Jakarta_Sans'] text-sm font-medium" href="#">
<span class="material-symbols-outlined" data-icon="storefront">storefront</span>
<span>All Venues</span>
</a>
<a class="flex items-center space-x-3 px-4 py-3 text-slate-500 hover:text-violet-600 hover:translate-x-1 transition-transform duration-300 font-['Plus_Jakarta_Sans'] text-sm font-medium" href="#">
<span class="material-symbols-outlined" data-icon="analytics">analytics</span>
<span>Global Analytics</span>
</a>
</nav>
<div class="mt-auto pt-6 border-t border-slate-200">
<button class="w-full bg-primary text-on-primary py-4 px-6 rounded-2xl font-semibold flex items-center justify-center space-x-2 shadow-lg shadow-primary/20 hover:bg-primary-container transition-colors duration-200">
<span class="material-symbols-outlined" data-icon="add">add</span>
<span>Add New Venue</span>
</button>
</div>
</aside>
<main class="flex-1 flex flex-col min-w-0 bg-surface">
<!-- TopNavBar (Authority Source: JSON) -->
<header class="docked full-width top-0 sticky z-10 bg-white/70 backdrop-blur-xl shadow-[0_40px_40px_-15px_rgba(99,14,212,0.04)] px-8 py-4 flex justify-between items-center w-full">
<div class="flex items-center space-x-8">
<span class="text-xl font-bold tracking-tight text-slate-900">Aura Reserve</span>
<div class="hidden lg:flex items-center bg-slate-100/50 rounded-full px-4 py-2 w-96">
<span class="material-symbols-outlined text-slate-400 mr-2" data-icon="search">search</span>
<input class="bg-transparent border-none focus:ring-0 text-sm w-full font-body" placeholder="Search portfolio..." type="text"/>
</div>
</div>
<div class="flex items-center space-x-4">
<button class="p-2 text-slate-500 hover:bg-slate-100/50 rounded-full transition-colors">
<span class="material-symbols-outlined" data-icon="notifications">notifications</span>
</button>
<button class="text-sm font-semibold text-violet-600 hover:bg-slate-100/50 px-4 py-2 rounded-full transition-colors">Help</button>
<div class="h-10 w-10 rounded-full bg-slate-200 overflow-hidden ring-2 ring-violet-100">
<img class="h-full w-full object-cover" data-alt="Portrait of a sophisticated male executive in his 40s, Julian Vane, professional lighting and neutral background" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBvT41v7qNPr7SKyWVcf8zt7esvK4QVtLlOs2Yy1OYLu3VR9UcJbFvEK7Jx39TxSx_5kLgSXhWFdLFUHnH2wiMzghgyJEXCvfy4QbQv7e5vThyVeqI-pbh_yp3VMLTtWMRlDUBCPGxjvc6diPCyUUabzuJaW1AU0xUJhYfpCvplUBM5HUDoi590aX3GgzGq1RVqbYu4T1m-e_GLE8f4Tx2u6OYq_4Vh8EdcWxZNf0eUgimQkG3Iog1417xLByUrzqz0BepbTSroQuM_"/>
</div>
</div>
</header>
<div class="p-8 max-w-7xl mx-auto w-full space-y-20">
<!-- Header Welcome Section -->
<section class="space-y-2">
<h2 class="text-4xl font-extrabold text-on-surface tracking-tight font-headline">Good morning, Julian Vane</h2>
<p class="text-lg text-on-surface-variant font-body">Your portfolio is performing <span class="text-primary font-bold">12.5% above target</span> this month. All 12 venues are currently operational with peak booking hours approaching.</p>
</section>
<!-- KPI Section (Asymmetric Grid) -->
<section class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
<div class="bg-surface-container-lowest p-8 rounded-xl shadow-[0_40px_40px_-15px_rgba(99,14,212,0.04)] space-y-4">
<div class="h-12 w-12 bg-primary-fixed rounded-2xl flex items-center justify-center text-primary">
<span class="material-symbols-outlined" data-icon="payments">payments</span>
</div>
<div>
<p class="text-sm font-bold text-on-surface-variant uppercase tracking-widest">Total Revenue</p>
<p class="text-3xl font-extrabold text-on-surface">$1,248,300</p>
</div>
<div class="flex items-center text-emerald-600 text-sm font-bold">
<span class="material-symbols-outlined text-xs mr-1" data-icon="trending_up">trending_up</span>
                        8.2% vs last month
                    </div>
</div>
<div class="bg-surface-container-lowest p-8 rounded-xl shadow-[0_40px_40px_-15px_rgba(99,14,212,0.04)] space-y-4">
<div class="h-12 w-12 bg-secondary-fixed rounded-2xl flex items-center justify-center text-secondary">
<span class="material-symbols-outlined" data-icon="calendar_month">calendar_month</span>
</div>
<div>
<p class="text-sm font-bold text-on-surface-variant uppercase tracking-widest">Total Bookings</p>
<p class="text-3xl font-extrabold text-on-surface">14,202</p>
</div>
<div class="flex items-center text-emerald-600 text-sm font-bold">
<span class="material-symbols-outlined text-xs mr-1" data-icon="trending_up">trending_up</span>
                        14% vs last month
                    </div>
</div>
<div class="bg-surface-container-lowest p-8 rounded-xl shadow-[0_40px_40px_-15px_rgba(99,14,212,0.04)] space-y-4">
<div class="h-12 w-12 bg-tertiary-fixed rounded-2xl flex items-center justify-center text-tertiary">
<span class="material-symbols-outlined" data-icon="star">star</span>
</div>
<div>
<p class="text-sm font-bold text-on-surface-variant uppercase tracking-widest">Avg. Review Score</p>
<p class="text-3xl font-extrabold text-on-surface">4.8</p>
</div>
<div class="flex items-center text-slate-400 text-sm font-medium">
                        Based on 3.2k reviews
                    </div>
</div>
<div class="bg-primary text-on-primary p-8 rounded-xl shadow-xl shadow-primary/20 space-y-4">
<div class="h-12 w-12 bg-white/20 rounded-2xl flex items-center justify-center">
<span class="material-symbols-outlined" data-icon="restaurant">restaurant</span>
</div>
<div>
<p class="text-sm font-bold text-on-primary-container uppercase tracking-widest opacity-80">Active Venues</p>
<p class="text-3xl font-extrabold">12 / 12</p>
</div>
<div class="flex items-center text-on-primary text-sm font-bold">
                        100% operational
                    </div>
</div>
</section>
<!-- Analytics Section -->
<section class="bg-surface-container-low rounded-xl p-8 space-y-8">
<div class="flex justify-between items-end">
<div>
<h3 class="text-2xl font-bold font-headline text-on-surface">Portfolio Performance</h3>
<p class="text-on-surface-variant">Monthly revenue growth and occupancy trends</p>
</div>
<div class="flex space-x-2">
<button class="px-4 py-2 rounded-full text-sm font-bold bg-white text-primary border border-outline-variant/20 shadow-sm">Revenue</button>
<button class="px-4 py-2 rounded-full text-sm font-bold text-on-surface-variant hover:bg-white/50 transition-colors">Bookings</button>
</div>
</div>
<!-- Mock Chart Area -->
<div class="h-[400px] w-full flex items-end space-x-4 pb-8">
<div class="flex-1 flex flex-col justify-end space-y-2 group">
<div class="bg-primary-fixed w-full rounded-t-lg transition-all duration-500 hover:bg-primary" style="height: 60%;"></div>
<p class="text-center text-xs font-bold text-on-surface-variant">JAN</p>
</div>
<div class="flex-1 flex flex-col justify-end space-y-2 group">
<div class="bg-primary-fixed w-full rounded-t-lg transition-all duration-500 hover:bg-primary" style="height: 45%;"></div>
<p class="text-center text-xs font-bold text-on-surface-variant">FEB</p>
</div>
<div class="flex-1 flex flex-col justify-end space-y-2 group">
<div class="bg-primary-fixed w-full rounded-t-lg transition-all duration-500 hover:bg-primary" style="height: 75%;"></div>
<p class="text-center text-xs font-bold text-on-surface-variant">MAR</p>
</div>
<div class="flex-1 flex flex-col justify-end space-y-2 group">
<div class="bg-primary-fixed w-full rounded-t-lg transition-all duration-500 hover:bg-primary" style="height: 55%;"></div>
<p class="text-center text-xs font-bold text-on-surface-variant">APR</p>
</div>
<div class="flex-1 flex flex-col justify-end space-y-2 group">
<div class="bg-primary-fixed w-full rounded-t-lg transition-all duration-500 hover:bg-primary" style="height: 85%;"></div>
<p class="text-center text-xs font-bold text-on-surface-variant">MAY</p>
</div>
<div class="flex-1 flex flex-col justify-end space-y-2 group">
<div class="bg-primary-container w-full rounded-t-lg ring-4 ring-primary/10" style="height: 95%;"></div>
<p class="text-center text-xs font-bold text-primary">JUN</p>
</div>
</div>
</section>
<!-- Venue Management Section (Bento Grid Style) -->
<section class="space-y-8">
<div class="flex justify-between items-center">
<h3 class="text-2xl font-bold font-headline text-on-surface">Managed Venues</h3>
<button class="text-primary font-bold text-sm uppercase tracking-widest border-b-2 border-primary hover:border-b-4 transition-all pb-1">View Portfolio Map</button>
</div>
<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
<!-- Venue Card 1 -->
<div class="group bg-surface-container-lowest rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300">
<div class="h-56 relative overflow-hidden">
<img class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" data-alt="Sleek modern restaurant interior with marble tables, moody lighting, and gold accents, luxury dining atmosphere" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDt9FoU3g2-3UJdUhVl8wx1wVOZKgQtQEWla7pZ3972LtEZW8CPcOdMHNFL9gNg2aSOxa3uQnyL-EcI_PEjDWIoHgBUM84ic3o0QLopYYYzYkN-Ehpf9HUQDl-olX8UoAjy7wPS2eAxdSpjFiFglS1qu1Bf0q8lI3kzi_yWKz-tdiSDeXzCjE1PsVIelnbJgEQkb1HuRh2oamzGNWp6nyz7B9E6o33qotrUq7l0OH_lFu8Ck45orqM44wdvOscljEtvMTbhJezruAEk"/>
<div class="absolute top-4 right-4 bg-white/90 backdrop-blur px-3 py-1 rounded-full flex items-center space-x-1 shadow-sm">
<div class="w-2 h-2 rounded-full bg-emerald-500"></div>
<span class="text-[10px] font-bold uppercase tracking-wider text-on-surface">Active</span>
</div>
</div>
<div class="p-8 space-y-4">
<h4 class="text-xl font-bold font-headline text-on-surface">L'Ambroisie Luxe</h4>
<div class="grid grid-cols-2 gap-4">
<div>
<p class="text-[10px] font-bold text-on-surface-variant uppercase tracking-widest">Today's Bookings</p>
<p class="text-lg font-bold">142</p>
</div>
<div>
<p class="text-[10px] font-bold text-on-surface-variant uppercase tracking-widest">Revenue</p>
<p class="text-lg font-bold">$18,420</p>
</div>
</div>
<button class="w-full py-3 rounded-full border border-outline-variant text-primary font-bold text-sm hover:bg-primary hover:text-white hover:border-primary transition-all">Manage Venue</button>
</div>
</div>
<!-- Venue Card 2 -->
<div class="group bg-surface-container-lowest rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300">
<div class="h-56 relative overflow-hidden">
<img class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" data-alt="Vibrant rooftop bar with lush plants, neon lights, and city skyline at sunset, trendy atmosphere" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAmECE3IfHvlX_KED6wA1_LocLyH1NMyn-734EaGOUXTfruJfFKbDOdxbXMuLtW9hqxfxRrMwQRpoHdLEq3mawgjH1Uw_TkrFBYX-UxlY7tRdVrxc3YSpsaHXOEHPeOBpf278flmSfjN8acwJiEza7467pRKAUSFr7G-pc9sLW37dn-cuCJvXmEqxFsgOMXPJTs1uqV7-aCDwauXYzcs_HnMeUDREH2OXI_BuXOWSmGxpos5H1j_7_XyNj6_0s2Y-WNo8aThFqdzFMK"/>
<div class="absolute top-4 right-4 bg-white/90 backdrop-blur px-3 py-1 rounded-full flex items-center space-x-1 shadow-sm">
<div class="w-2 h-2 rounded-full bg-emerald-500"></div>
<span class="text-[10px] font-bold uppercase tracking-wider text-on-surface">Active</span>
</div>
</div>
<div class="p-8 space-y-4">
<h4 class="text-xl font-bold font-headline text-on-surface">Neon Horizon</h4>
<div class="grid grid-cols-2 gap-4">
<div>
<p class="text-[10px] font-bold text-on-surface-variant uppercase tracking-widest">Today's Bookings</p>
<p class="text-lg font-bold">89</p>
</div>
<div>
<p class="text-[10px] font-bold text-on-surface-variant uppercase tracking-widest">Revenue</p>
<p class="text-lg font-bold">$9,150</p>
</div>
</div>
<button class="w-full py-3 rounded-full border border-outline-variant text-primary font-bold text-sm hover:bg-primary hover:text-white hover:border-primary transition-all">Manage Venue</button>
</div>
</div>
<!-- Venue Card 3 -->
<div class="group bg-surface-container-lowest rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300">
<div class="h-56 relative overflow-hidden">
<img class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" data-alt="Rustic high-end steakhouse with dark wood and warm hanging Edison bulbs, cozy intimate lighting" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDTzYHgdwq4PD1J4Spaexr4JlVQK3WhQyrHzHuFut1vkbR3KmoPvSSXpfQoM7Gzf3y_QNpsekA1n_NYzHEjRYMgShy88sTi6_LaTVxsFa0NNGPLYODp1il__c0wVW7MjjZTxyemFcv2RWDEbsZqlmI8J2C6zeuKylA4YWgrXumM94wjYGq3R8gti287u3qr48fA3Wm_fOxSpX_rOBVk7peWd1VOcDNmfcqJp-fKAUU_9196PO3Bit-sYNOOjaeowaOLYASti5PyhKlO"/>
<div class="absolute top-4 right-4 bg-white/90 backdrop-blur px-3 py-1 rounded-full flex items-center space-x-1 shadow-sm">
<div class="w-2 h-2 rounded-full bg-amber-500"></div>
<span class="text-[10px] font-bold uppercase tracking-wider text-on-surface">Pending</span>
</div>
</div>
<div class="p-8 space-y-4">
<h4 class="text-xl font-bold font-headline text-on-surface">Iron &amp; Oak</h4>
<div class="grid grid-cols-2 gap-4">
<div>
<p class="text-[10px] font-bold text-on-surface-variant uppercase tracking-widest">Today's Bookings</p>
<p class="text-lg font-bold">0</p>
</div>
<div>
<p class="text-[10px] font-bold text-on-surface-variant uppercase tracking-widest">Revenue</p>
<p class="text-lg font-bold">$0</p>
</div>
</div>
<button class="w-full py-3 rounded-full bg-slate-100 text-slate-500 font-bold text-sm cursor-not-allowed">Awaiting Review</button>
</div>
</div>
</div>
</section>
<!-- Growth Intelligence Panel -->
</div>
<footer class="mt-20 px-8 py-12 bg-white text-on-surface-variant border-t border-slate-100">
<div class="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
<p class="text-sm font-medium">© 2024 Aura Reserve. Portfolio Intelligence System.</p>
<div class="flex space-x-6 text-sm font-bold">
<a class="hover:text-primary transition-colors" href="#">Privacy</a>
<a class="hover:text-primary transition-colors" href="#">Compliance</a>
<a class="hover:text-primary transition-colors" href="#">Export Logs</a>
</div>
</div>
</footer>
</main>
</body></html>