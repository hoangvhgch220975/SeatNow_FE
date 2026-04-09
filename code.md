<!DOCTYPE html>

<html class="light" lang="en"><head>
<meta charset="utf-8"/>
<meta content="width=device-width, initial-scale=1.0" name="viewport"/>
<title>The Culinary Curator - The Grand Bistro Dashboard</title>
<script src="https://cdn.tailwindcss.com?plugins=forms,container-queries"></script>
<link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&amp;display=swap" rel="stylesheet"/>
<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&amp;display=swap" rel="stylesheet"/>
<script id="tailwind-config">
        tailwind.config = {
            darkMode: "class",
            theme: {
                extend: {
                    colors: {
                        "on-secondary-fixed": "#250059",
                        "surface-container-low": "#f3f4f5",
                        "surface": "#f8f9fa",
                        "error-container": "#ffdad6",
                        "primary": "#630ed4",
                        "on-primary": "#ffffff",
                        "on-tertiary-container": "#ffe0cd",
                        "surface-container": "#edeeef",
                        "on-primary-container": "#ede0ff",
                        "on-primary-fixed-variant": "#5a00c6",
                        "tertiary": "#7d3d00",
                        "surface-container-lowest": "#ffffff",
                        "on-surface": "#191c1d",
                        "surface-container-high": "#e7e8e9",
                        "secondary-container": "#8856e5",
                        "inverse-primary": "#d2bbff",
                        "surface-container-highest": "#e1e3e4",
                        "surface-bright": "#f8f9fa",
                        "inverse-surface": "#2e3132",
                        "on-primary-fixed": "#25005a",
                        "on-surface-variant": "#4a4455",
                        "tertiary-fixed": "#ffdcc6",
                        "on-tertiary-fixed": "#301400",
                        "secondary-fixed": "#ebddff",
                        "primary-fixed": "#eaddff",
                        "on-error-container": "#93000a",
                        "surface-variant": "#e1e3e4",
                        "on-tertiary": "#ffffff",
                        "on-secondary-fixed-variant": "#581db3",
                        "tertiary-fixed-dim": "#ffb784",
                        "outline": "#7b7487",
                        "on-secondary": "#ffffff",
                        "error": "#ba1a1a",
                        "on-secondary-container": "#fffbff",
                        "on-background": "#191c1d",
                        "secondary": "#6e3aca",
                        "surface-tint": "#732ee4",
                        "primary-fixed-dim": "#d2bbff",
                        "outline-variant": "#ccc3d8",
                        "surface-dim": "#d9dadb",
                        "secondary-fixed-dim": "#d3bbff",
                        "tertiary-container": "#a15100",
                        "background": "#f8f9fa",
                        "primary-container": "#7c3aed",
                        "inverse-on-surface": "#f0f1f2",
                        "on-error": "#ffffff",
                        "on-tertiary-fixed-variant": "#713700"
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
        .glass-header { backdrop-filter: blur(12px); }
        ::-webkit-scrollbar { width: 6px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: #ccc3d8; border-radius: 10px; }
    </style>
</head>
<body class="bg-surface text-on-surface">
<!-- SideNavBar -->
<aside class="h-screen w-72 fixed left-0 top-0 overflow-y-auto bg-slate-50 dark:bg-slate-950 flex flex-col p-6 gap-4 z-50">
<div class="flex items-center gap-4 mb-6">
<div class="w-12 h-12 rounded-lg bg-primary flex items-center justify-center text-on-primary">
<span class="material-symbols-outlined" style="font-variation-settings: 'FILL' 1;">restaurant</span>
</div>
<div>
<h2 class="text-lg font-black text-purple-700 leading-tight">The Grand Bistro</h2>
<p class="text-xs font-semibold tracking-wide text-slate-500 uppercase">Premium Tier</p>
</div>
</div>
<nav class="space-y-1">
<!-- Back to Portfolio -->
<a class="flex items-center gap-3 px-4 py-3 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-2xl transition-transform duration-200 hover:translate-x-1 font-['Plus_Jakarta_Sans'] text-sm font-semibold tracking-wide" href="#">
<span class="material-symbols-outlined text-purple-600" data-icon="arrow_back">arrow_back</span>
                Back to Portfolio
            </a>
<!-- Overview (Active) -->
<a class="flex items-center gap-3 px-4 py-3 bg-purple-50 dark:bg-purple-900/20 text-purple-700 dark:text-purple-300 rounded-2xl transition-transform duration-200 hover:translate-x-1 font-['Plus_Jakarta_Sans'] text-sm font-semibold tracking-wide" href="#">
<span class="material-symbols-outlined" data-icon="dashboard">dashboard</span>
                Overview
            </a>
<!-- Restaurant Profile -->
<a class="flex items-center gap-3 px-4 py-3 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-2xl transition-transform duration-200 hover:translate-x-1 font-['Plus_Jakarta_Sans'] text-sm font-semibold tracking-wide" href="#">
<span class="material-symbols-outlined" data-icon="storefront">storefront</span>
                Restaurant Profile
            </a>
<!-- Menu Management -->
<a class="flex items-center gap-3 px-4 py-3 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-2xl transition-transform duration-200 hover:translate-x-1 font-['Plus_Jakarta_Sans'] text-sm font-semibold tracking-wide" href="#">
<span class="material-symbols-outlined" data-icon="restaurant_menu">restaurant_menu</span>
                Menu Management
            </a>
<!-- Table Management -->
<a class="flex items-center gap-3 px-4 py-3 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-2xl transition-transform duration-200 hover:translate-x-1 font-['Plus_Jakarta_Sans'] text-sm font-semibold tracking-wide" href="#">
<span class="material-symbols-outlined" data-icon="table_restaurant">table_restaurant</span>
                Table Management
            </a>
<!-- Booking Management -->
<a class="flex items-center gap-3 px-4 py-3 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-2xl transition-transform duration-200 hover:translate-x-1 font-['Plus_Jakarta_Sans'] text-sm font-semibold tracking-wide" href="#">
<span class="material-symbols-outlined" data-icon="event_available">event_available</span>
                Booking Management
            </a>
<!-- Revenue & Stats -->
<a class="flex items-center gap-3 px-4 py-3 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-2xl transition-transform duration-200 hover:translate-x-1 font-['Plus_Jakarta_Sans'] text-sm font-semibold tracking-wide" href="#">
<span class="material-symbols-outlined" data-icon="analytics">analytics</span>
                Revenue &amp; Stats
            </a>
<!-- Wallet -->
<a class="flex items-center gap-3 px-4 py-3 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-2xl transition-transform duration-200 hover:translate-x-1 font-['Plus_Jakarta_Sans'] text-sm font-semibold tracking-wide" href="#">
<span class="material-symbols-outlined" data-icon="account_balance_wallet">account_balance_wallet</span>
                Wallet
            </a>
<!-- Settings -->
<a class="flex items-center gap-3 px-4 py-3 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-2xl transition-transform duration-200 hover:translate-x-1 font-['Plus_Jakarta_Sans'] text-sm font-semibold tracking-wide" href="#">
<span class="material-symbols-outlined" data-icon="settings">settings</span>
                Settings
            </a>
<div class="pt-4 mt-4 border-t border-slate-200 dark:border-slate-800 space-y-1">
<p class="px-4 py-2 text-[10px] font-black text-slate-400 uppercase tracking-widest">AI Tools</p>
<a class="flex items-center gap-3 px-4 py-3 text-purple-600 hover:bg-purple-50 dark:hover:bg-purple-900/10 rounded-2xl transition-transform duration-200 hover:translate-x-1 font-['Plus_Jakarta_Sans'] text-sm font-bold" href="#">
<span class="material-symbols-outlined" data-icon="auto_awesome" style="font-variation-settings: 'FILL' 1;">auto_awesome</span>
                    Ask Aura AI
                </a>
<a class="flex items-center gap-3 px-4 py-3 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-2xl transition-transform duration-200 hover:translate-x-1 font-['Plus_Jakarta_Sans'] text-sm font-semibold tracking-wide" href="#">
<span class="material-symbols-outlined" data-icon="insights">insights</span>
                    Revenue Insights
                </a>
</div>
</nav>
</aside>
<!-- Main Canvas -->
<main class="ml-72 min-h-screen">
<!-- TopAppBar -->
<header class="fixed top-0 right-0 left-72 h-20 bg-white/70 backdrop-blur-xl z-40 flex items-center justify-between px-8 shadow-[0_40px_40px_rgba(99,14,212,0.04)]">
<div class="flex items-center gap-6">
<div class="relative group">
<button class="flex items-center gap-2 bg-surface-container-low px-4 py-2 rounded-full text-sm font-semibold text-on-surface-variant hover:bg-surface-container transition-colors">
                        Le Jardin d'Or
                        <span class="material-symbols-outlined text-xs">keyboard_arrow_down</span>
</button>
</div>
<div class="relative flex items-center">
<span class="material-symbols-outlined absolute left-4 text-outline">search</span>
<input class="pl-12 pr-6 py-2.5 bg-surface-container-low border-none rounded-full w-80 text-sm focus:ring-2 focus:ring-primary/20" placeholder="Search reservations..." type="text"/>
</div>
</div>
<div class="flex items-center gap-4">
<button class="w-10 h-10 flex items-center justify-center rounded-full hover:bg-surface-container-low text-on-surface-variant relative transition-colors">
<span class="material-symbols-outlined">notifications</span>
<span class="absolute top-2 right-2 w-2 h-2 bg-error rounded-full border-2 border-white"></span>
</button>
<div class="flex items-center gap-3 pl-4 border-l border-outline-variant/30">
<div class="text-right">
<p class="text-sm font-bold text-on-surface">Alex Chen</p>
<p class="text-xs text-on-surface-variant">General Manager</p>
</div>
<div class="w-10 h-10 rounded-full bg-surface-container-highest overflow-hidden">
<img alt="Admin" data-alt="professional portrait of a restaurant manager in a white chef coat, warm lighting, blurred restaurant background" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCnp1Y_-yly_itCViuxy_MsTrY_hPa83zFY2mHuAergaSSlKr0p1W3INKSpX8PV8M-VvGG8Zusdr3oZ7xf87YmvawcLMsjRHaJ8sBSVcGkrrJWx-3N9imj4M05WYOA-lu035Gchsj3Z0Gq_kk8_vDOak9jZxHmBrIXRR74FTBEgAr32S1xJ8QtDUjzphR0awNckNGx484PXHRP1DTi_KH3sNCJRudY6FlOOkqjk9xDhu8zgwKGezZZAUXldljdcC3UY-IAefjsGCy1h"/>
</div>
</div>
</div>
</header>
<!-- Dashboard Content -->
<div class="pt-28 px-8 pb-12 space-y-12">
<!-- Welcome Header -->
<div class="flex items-end justify-between">
<div class="space-y-1">
<h1 class="text-3xl font-bold text-on-surface">Dashboard Overview</h1>
<p class="text-on-surface-variant">Here's what's happening at <span class="text-primary font-semibold">The Grand Bistro</span> today.</p>
</div>
</div>
<!-- KPI Cards Grid -->
<div class="grid grid-cols-5 gap-6">
<!-- KPI 1 -->
<div class="bg-surface-container-lowest p-6 rounded-xl space-y-4 shadow-[0_40px_40px_rgba(99,14,212,0.04)]">
<div class="w-10 h-10 rounded-lg bg-primary-fixed flex items-center justify-center text-primary">
<span class="material-symbols-outlined">calendar_today</span>
</div>
<div>
<p class="text-xs font-bold text-on-surface-variant uppercase tracking-wider">Today's Bookings</p>
<h3 class="text-2xl font-bold text-on-surface mt-1">24</h3>
<p class="text-xs text-primary font-semibold mt-2 flex items-center gap-1">
<span class="material-symbols-outlined text-sm">trending_up</span> +12% vs yesterday
                        </p>
</div>
</div>
<!-- KPI 2 -->
<div class="bg-surface-container-lowest p-6 rounded-xl space-y-4 shadow-[0_40px_40px_rgba(99,14,212,0.04)]">
<div class="w-10 h-10 rounded-lg bg-secondary-fixed flex items-center justify-center text-secondary">
<span class="material-symbols-outlined">analytics</span>
</div>
<div>
<p class="text-xs font-bold text-on-surface-variant uppercase tracking-wider">Weekly Total</p>
<h3 class="text-2xl font-bold text-on-surface mt-1">156</h3>
<p class="text-xs text-on-surface-variant mt-2">Consistent with avg</p>
</div>
</div>
<!-- KPI 3 -->
<div class="bg-surface-container-lowest p-6 rounded-xl space-y-4 shadow-[0_40px_40px_rgba(99,14,212,0.04)]">
<div class="w-10 h-10 rounded-lg bg-tertiary-fixed flex items-center justify-center text-tertiary">
<span class="material-symbols-outlined">payments</span>
</div>
<div>
<p class="text-xs font-bold text-on-surface-variant uppercase tracking-wider">Daily Revenue</p>
<h3 class="text-2xl font-bold text-on-surface mt-1">$1,240</h3>
<p class="text-xs text-primary font-semibold mt-2 flex items-center gap-1">
<span class="material-symbols-outlined text-sm">trending_up</span> +8.4%
                        </p>
</div>
</div>
<!-- KPI 4 -->
<div class="bg-surface-container-lowest p-6 rounded-xl space-y-4 shadow-[0_40px_40px_rgba(99,14,212,0.04)]">
<div class="w-10 h-10 rounded-lg bg-primary-fixed flex items-center justify-center text-primary">
<span class="material-symbols-outlined">account_balance</span>
</div>
<div>
<p class="text-xs font-bold text-on-surface-variant uppercase tracking-wider">Monthly Revenue</p>
<h3 class="text-2xl font-bold text-on-surface mt-1">$32.5k</h3>
<p class="text-xs text-on-surface-variant mt-2">On track for target</p>
</div>
</div>
<!-- KPI 5 -->
<div class="bg-surface-container-lowest p-6 rounded-xl space-y-4 shadow-[0_40px_40px_rgba(99,14,212,0.04)]">
<div class="w-10 h-10 rounded-lg bg-secondary-fixed flex items-center justify-center text-secondary">
<span class="material-symbols-outlined">chair</span>
</div>
<div>
<p class="text-xs font-bold text-on-surface-variant uppercase tracking-wider">Occupancy Rate</p>
<h3 class="text-2xl font-bold text-on-surface mt-1">85%</h3>
<div class="w-full bg-surface-container rounded-full h-1.5 mt-3">
<div class="bg-primary h-full rounded-full w-[85%]"></div>
</div>
</div>
</div>
</div>
<!-- Main Grid: Charts and Table -->
<div class="grid grid-cols-12 gap-8">
<!-- Revenue Analysis Chart (Mockup) -->
<div class="col-span-8 bg-surface-container-lowest p-8 rounded-xl shadow-[0_40px_40px_rgba(99,14,212,0.04)]">
<div class="flex justify-between items-center mb-10">
<h4 class="text-xl font-bold text-on-surface">Revenue Analysis</h4>
<select class="bg-surface-container-low border-none rounded-full text-xs font-bold px-4 focus:ring-primary/20">
<option>Last 7 Days</option>
<option>Last 30 Days</option>
</select>
</div>
<div class="h-64 flex items-end justify-between gap-4">
<div class="relative w-full h-full flex flex-col justify-end">
<div class="absolute inset-0 flex flex-col justify-between py-2 border-b border-outline-variant/10">
<div class="w-full border-t border-outline-variant/5"></div>
<div class="w-full border-t border-outline-variant/5"></div>
<div class="w-full border-t border-outline-variant/5"></div>
<div class="w-full border-t border-outline-variant/5"></div>
</div>
<svg class="w-full h-full drop-shadow-lg" viewbox="0 0 800 200">
<path d="M0,150 Q50,140 100,100 T200,80 T300,120 T400,60 T500,40 T600,90 T700,70 T800,50" fill="none" stroke="#630ed4" stroke-linecap="round" stroke-width="4"></path>
<path class="fill-primary/5" d="M0,150 Q50,140 100,100 T200,80 T300,120 T400,60 T500,40 T600,90 T700,70 T800,50 V200 H0 Z"></path>
</svg>
<div class="flex justify-between mt-4 text-[10px] font-bold text-on-surface-variant uppercase tracking-widest">
<span>Mon</span><span>Tue</span><span>Wed</span><span>Thu</span><span>Fri</span><span>Sat</span><span>Sun</span>
</div>
</div>
</div>
</div>
<!-- Booking Volume Bar Chart (Mockup) -->
<div class="col-span-4 bg-surface-container-lowest p-8 rounded-xl shadow-[0_40px_40px_rgba(99,14,212,0.04)]">
<h4 class="text-xl font-bold text-on-surface mb-10">Booking Volume</h4>
<div class="h-64 flex items-end justify-around gap-2">
<div class="w-8 bg-surface-container-highest rounded-t-lg h-24"></div>
<div class="w-8 bg-surface-container-highest rounded-t-lg h-32"></div>
<div class="w-8 bg-primary rounded-t-lg h-56 relative group">
<div class="absolute -top-10 left-1/2 -translate-x-1/2 bg-on-surface text-white text-[10px] py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity">48</div>
</div>
<div class="w-8 bg-surface-container-highest rounded-t-lg h-40"></div>
<div class="w-8 bg-surface-container-highest rounded-t-lg h-48"></div>
<div class="w-8 bg-surface-container-highest rounded-t-lg h-36"></div>
</div>
<div class="mt-4 text-center">
<p class="text-xs font-bold text-on-surface-variant">PEAK HOURS (7PM - 9PM)</p>
</div>
</div>
<!-- Recent Bookings Table -->
<div class="col-span-8 bg-surface-container-lowest p-8 rounded-xl shadow-[0_40px_40px_rgba(99,14,212,0.04)]">
<div class="flex justify-between items-center mb-8">
<h4 class="text-xl font-bold text-on-surface">Upcoming Arrivals</h4>
<button class="text-primary text-xs font-bold hover:underline">View All Schedule</button>
</div>
<div class="overflow-hidden">
<table class="w-full text-left">
<thead class="border-b border-outline-variant/10">
<tr>
<th class="pb-4 text-[10px] font-black text-on-surface-variant uppercase tracking-widest">Guest</th>
<th class="pb-4 text-[10px] font-black text-on-surface-variant uppercase tracking-widest text-center">Time</th>
<th class="pb-4 text-[10px] font-black text-on-surface-variant uppercase tracking-widest text-center">Party</th>
<th class="pb-4 text-[10px] font-black text-on-surface-variant uppercase tracking-widest text-right">Status</th>
</tr>
</thead>
<tbody class="divide-y divide-outline-variant/5">
<tr>
<td class="py-5">
<div class="flex items-center gap-3">
<div class="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-sm">JS</div>
<div>
<p class="text-sm font-bold text-on-surface">Julianne Smith</p>
<p class="text-[10px] text-on-surface-variant">VIP Guest • Anniversary</p>
</div>
</div>
</td>
<td class="py-5 text-center text-sm font-semibold">19:30</td>
<td class="py-5 text-center text-sm font-semibold">4</td>
<td class="py-5 text-right">
<span class="px-3 py-1 bg-primary/10 text-primary text-[10px] font-black rounded-full uppercase">Arrived</span>
</td>
</tr>
<tr>
<td class="py-5">
<div class="flex items-center gap-3">
<div class="w-10 h-10 rounded-full bg-secondary/10 flex items-center justify-center text-secondary font-bold text-sm">MB</div>
<div>
<p class="text-sm font-bold text-on-surface">Marcus Brown</p>
<p class="text-[10px] text-on-surface-variant">Table #12</p>
</div>
</div>
</td>
<td class="py-5 text-center text-sm font-semibold">20:00</td>
<td class="py-5 text-center text-sm font-semibold">2</td>
<td class="py-5 text-right">
<span class="px-3 py-1 bg-green-100 text-green-700 text-[10px] font-black rounded-full uppercase">Confirmed</span>
</td>
</tr>
<tr>
<td class="py-5">
<div class="flex items-center gap-3">
<div class="w-10 h-10 rounded-full bg-surface-container-high flex items-center justify-center text-on-surface-variant font-bold text-sm">ET</div>
<div>
<p class="text-sm font-bold text-on-surface">Elena Torres</p>
<p class="text-[10px] text-on-surface-variant">Private Dining</p>
</div>
</div>
</td>
<td class="py-5 text-center text-sm font-semibold">20:15</td>
<td class="py-5 text-center text-sm font-semibold">8</td>
<td class="py-5 text-right">
<span class="px-3 py-1 bg-amber-100 text-amber-700 text-[10px] font-black rounded-full uppercase">Pending</span>
</td>
</tr>
</tbody>
</table>
</div>
</div>
<!-- Floor Layout Section -->
<div class="col-span-4 bg-surface-container-lowest p-8 rounded-xl shadow-[0_40px_40px_rgba(99,14,212,0.04)]">
<div class="flex justify-between items-center mb-6">
<h4 class="text-xl font-bold text-on-surface">Live Floor Plan</h4>
<span class="flex items-center gap-1 text-[10px] font-bold text-on-surface-variant uppercase">
<span class="w-2 h-2 rounded-full bg-primary animate-pulse"></span> Live
                        </span>
</div>
<div class="grid grid-cols-4 gap-4 aspect-square bg-surface-container-low p-6 rounded-lg relative overflow-hidden">
<!-- Tables -->
<div class="w-full h-full bg-primary rounded-lg flex items-center justify-center text-on-primary text-xs font-bold" title="Occupied">1</div>
<div class="w-full h-full bg-surface-container-highest rounded-lg border-2 border-dashed border-outline-variant flex items-center justify-center text-on-surface-variant text-xs font-bold" title="Available">2</div>
<div class="w-full h-full bg-primary rounded-lg flex items-center justify-center text-on-primary text-xs font-bold">3</div>
<div class="w-full h-full bg-secondary-container rounded-lg flex items-center justify-center text-on-secondary-container text-xs font-bold" title="Reserved">4</div>
<div class="w-full h-full bg-primary rounded-lg flex items-center justify-center text-on-primary text-xs font-bold">5</div>
<div class="w-full h-full bg-primary rounded-lg flex items-center justify-center text-on-primary text-xs font-bold">6</div>
<div class="w-full h-full bg-surface-container-highest rounded-lg border-2 border-dashed border-outline-variant flex items-center justify-center text-on-surface-variant text-xs font-bold">7</div>
<div class="w-full h-full bg-surface-container-highest rounded-lg border-2 border-dashed border-outline-variant flex items-center justify-center text-on-surface-variant text-xs font-bold">8</div>
<div class="w-full h-full bg-secondary-container rounded-lg flex items-center justify-center text-on-secondary-container text-xs font-bold">9</div>
<div class="w-full h-full bg-primary rounded-lg flex items-center justify-center text-on-primary text-xs font-bold">10</div>
<div class="w-full h-full bg-primary rounded-lg flex items-center justify-center text-on-primary text-xs font-bold">11</div>
<div class="w-full h-full bg-primary rounded-lg flex items-center justify-center text-on-primary text-xs font-bold">12</div>
<div class="w-full h-full bg-surface-container-highest rounded-lg border-2 border-dashed border-outline-variant flex items-center justify-center text-on-surface-variant text-xs font-bold">13</div>
<div class="w-full h-full bg-surface-container-highest rounded-lg border-2 border-dashed border-outline-variant flex items-center justify-center text-on-surface-variant text-xs font-bold">14</div>
<div class="w-full h-full bg-surface-container-highest rounded-lg border-2 border-dashed border-outline-variant flex items-center justify-center text-on-surface-variant text-xs font-bold">15</div>
<div class="w-full h-full bg-secondary-container rounded-lg flex items-center justify-center text-on-secondary-container text-xs font-bold">16</div>
</div>
<div class="mt-8 grid grid-cols-3 gap-2">
<div class="flex items-center gap-2">
<div class="w-2.5 h-2.5 rounded bg-surface-container-highest border border-outline-variant"></div>
<span class="text-[10px] font-bold text-on-surface-variant">Available</span>
</div>
<div class="flex items-center gap-2">
<div class="w-2.5 h-2.5 rounded bg-primary"></div>
<span class="text-[10px] font-bold text-on-surface-variant">Occupied</span>
</div>
<div class="flex items-center gap-2">
<div class="w-2.5 h-2.5 rounded bg-secondary-container"></div>
<span class="text-[10px] font-bold text-on-surface-variant">Reserved</span>
</div>
</div>
</div>
</div>
</div>
</main>
</body></html>