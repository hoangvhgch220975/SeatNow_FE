<!DOCTYPE html>

<html lang="en"><head>
<meta charset="utf-8"/>
<meta content="width=device-width, initial-scale=1.0" name="viewport"/>
<title>The Culinary Curator | Table Management</title>
<script src="https://cdn.tailwindcss.com?plugins=forms,container-queries"></script>
<link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&amp;display=swap" rel="stylesheet"/>
<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&amp;display=swap" rel="stylesheet"/>
<script id="tailwind-config">
      tailwind.config = {
        darkMode: "class",
        theme: {
          extend: {
            colors: {
              "primary": "#7C3AED",
              "on-primary-container": "#ede0ff",
              "error": "#ba1a1a",
              "surface-container-highest": "#e1e3e4",
              "background": "#f8f9fa",
              "tertiary-container": "#a15100",
              "surface-container-low": "#f3f4f5",
              "on-surface-variant": "#4a4455",
              "surface-container-high": "#e7e8e9",
              "surface-container-lowest": "#ffffff",
              "surface-tint": "#7C3AED",
              "error-container": "#ffdad6",
              "on-tertiary": "#ffffff",
              "on-tertiary-container": "#ffe0cd",
              "primary-container": "#7c3aed",
              "on-surface": "#191c1d",
              "on-secondary-container": "#fffbff",
              "on-error": "#ffffff",
              "surface-variant": "#e1e3e4",
              "on-primary-fixed-variant": "#5a00c6",
              "on-tertiary-fixed": "#301400",
              "on-primary-fixed": "#25005a",
              "secondary-fixed-dim": "#d3bbff",
              "secondary-container": "#8856e5",
              "outline-variant": "#ccc3d8",
              "surface-container": "#edeeef",
              "on-primary": "#ffffff",
              "surface-dim": "#d9dadb",
              "on-error-container": "#93000a",
              "primary-fixed": "#eaddff",
              "on-secondary": "#ffffff",
              "inverse-primary": "#d2bbff",
              "inverse-on-surface": "#f0f1f2",
              "tertiary-fixed": "#ffdcc6",
              "outline": "#7b7487",
              "primary-fixed-dim": "#d2bbff",
              "inverse-surface": "#2e3132",
              "on-secondary-fixed-variant": "#581db3",
              "on-secondary-fixed": "#250059",
              "surface": "#f8f9fa",
              "tertiary-fixed-dim": "#ffb784",
              "on-tertiary-fixed-variant": "#713700",
              "secondary-fixed": "#ebddff",
              "secondary": "#6e3aca",
              "tertiary": "#7d3d00",
              "surface-bright": "#f8f9fa",
              "on-background": "#191c1d"
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
        .tonal-bg-shift { background-color: #f3f4f5; }
        .ambient-shadow { box-shadow: 0 20px 40px -10px rgba(124, 58, 237, 0.08); }
    </style>
</head>
<body class="bg-surface text-on-surface flex overflow-hidden">
<!-- SideNavBar Shell -->
<aside class="h-screen w-72 border-r border-slate-200/50 flex flex-col p-6 bg-slate-50">
<div class="mb-10">
<h1 class="text-xl font-bold text-violet-700 tracking-tight">The Culinary Curator</h1>
<p class="text-xs text-on-surface-variant font-medium uppercase tracking-widest mt-1">Maître D' Portal</p>
</div>
<nav class="flex-1 space-y-2">
<a class="flex items-center gap-3 px-4 py-3 text-slate-500 hover:text-violet-600 transition-colors hover:bg-slate-100 rounded-xl font-medium" href="#">
<span class="material-symbols-outlined" data-icon="dashboard">dashboard</span>
                Overview
            </a>
<a class="flex items-center gap-3 px-4 py-3 text-slate-500 hover:text-violet-600 transition-colors hover:bg-slate-100 rounded-xl font-medium" href="#">
<span class="material-symbols-outlined" data-icon="person">person</span>
                Profile
            </a>
<a class="flex items-center gap-3 px-4 py-3 text-slate-500 hover:text-violet-600 transition-colors hover:bg-slate-100 rounded-xl font-medium" href="#">
<span class="material-symbols-outlined" data-icon="restaurant_menu">restaurant_menu</span>
                Menu
            </a>
<a class="flex items-center gap-3 px-4 py-3 text-violet-700 bg-violet-50/50 rounded-xl font-semibold" href="#">
<span class="material-symbols-outlined" data-icon="table_restaurant" style="font-variation-settings: 'FILL' 1;">table_restaurant</span>
                Tables
            </a>
<a class="flex items-center gap-3 px-4 py-3 text-slate-500 hover:text-violet-600 transition-colors hover:bg-slate-100 rounded-xl font-medium" href="#">
<span class="material-symbols-outlined" data-icon="event_available">event_available</span>
                Bookings
            </a>
<a class="flex items-center gap-3 px-4 py-3 text-slate-500 hover:text-violet-600 transition-colors hover:bg-slate-100 rounded-xl font-medium" href="#">
<span class="material-symbols-outlined" data-icon="insights">insights</span>
                Stats
            </a>
<a class="flex items-center gap-3 px-4 py-3 text-slate-500 hover:text-violet-600 transition-colors hover:bg-slate-100 rounded-xl font-medium" href="#">
<span class="material-symbols-outlined" data-icon="account_balance_wallet">account_balance_wallet</span>
                Wallet
            </a>
<a class="flex items-center gap-3 px-4 py-3 text-slate-500 hover:text-violet-600 transition-colors hover:bg-slate-100 rounded-xl font-medium" href="#">
<span class="material-symbols-outlined" data-icon="settings">settings</span>
                Settings
            </a>
</nav>
<div class="mt-auto pt-6">
<button class="w-full py-4 px-6 bg-primary text-on-primary rounded-xl font-bold flex items-center justify-center gap-2 active:scale-95 duration-150 transition-transform shadow-lg shadow-violet-500/20">
<span class="material-symbols-outlined text-lg" data-icon="layers">layers</span>
                View Live Floorplan
            </button>
</div>
</aside>
<!-- Main Canvas -->
<main class="flex-1 flex flex-col h-screen overflow-hidden">
<!-- TopNavBar Shell -->
<header class="flex justify-between items-center w-full px-8 py-4 bg-white/70 backdrop-blur-xl border-b border-slate-100 shadow-sm shadow-violet-500/5 sticky top-0 z-30">
<div class="flex items-center gap-4">
<h2 class="font-headline text-slate-900 font-bold text-2xl tracking-tight">Table Management</h2>
</div>
<div class="flex items-center gap-6">
<!-- Search Bar -->
<div class="relative group">
<span class="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-on-surface-variant text-xl">search</span>
<input class="pl-12 pr-6 py-2.5 bg-surface-container-low border-none rounded-full w-64 focus:ring-2 focus:ring-primary/20 text-sm placeholder:text-slate-400" placeholder="Search tables..." type="text"/>
</div>
<div class="flex items-center gap-2">
<button class="hover:bg-slate-50 rounded-full p-2 transition-all active:opacity-80">
<span class="material-symbols-outlined text-on-surface-variant" data-icon="notifications">notifications</span>
</button>
<button class="hover:bg-slate-50 rounded-full p-2 transition-all active:opacity-80">
<span class="material-symbols-outlined text-on-surface-variant" data-icon="help_outline">help_outline</span>
</button>
</div>
<div class="h-10 w-10 rounded-full overflow-hidden border-2 border-primary/10">
<img alt="Owner Avatar" class="h-full w-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBBpPzKVuZV8QVZYu_B8ACsKwvIM5nrqZ1Q42bdhoymdjuay5Vue6hfnIbalSU8-AVHqe_yP86I0G51oj7fJlWkuGmzyyoR4uUHC2FyGOHeARrJL4OwOCNHxD_igyuK9BX2zydU4RgBE99Xl-ZJtGyG8JZAAymlh6CNPa2mBDKZnl8-bkkbgTCW0_3zGi7jH5g1lagHGyGxMgrKl7Xvh-cFrSzqTCmODGuj5-BnPAYchRMgQJ210cjrVmAvULh5vNyt0BndiuhG0-tT"/>
</div>
</div>
</header>
<section class="flex-1 overflow-y-auto p-8 space-y-10">
<!-- Contextual Header & Actions -->
<div class="flex flex-col md:flex-row justify-between items-end gap-6">
<div class="space-y-4">
<!-- Tab Switcher -->
<div class="flex gap-8 border-b border-slate-100 pb-0">
<button class="text-violet-700 font-bold border-b-2 border-violet-600 pb-4 flex items-center gap-2">
<span class="material-symbols-outlined text-lg" data-icon="format_list_bulleted">format_list_bulleted</span>
                            Table List
                        </button>
<button class="text-slate-500 hover:text-slate-800 font-medium pb-4 flex items-center gap-2 transition-colors">
<span class="material-symbols-outlined text-lg" data-icon="map">map</span>
                            Floor Plan
                        </button>
</div>
</div>
<button class="bg-primary hover:bg-violet-700 text-on-primary px-8 py-4 rounded-full font-bold flex items-center gap-2 ambient-shadow transition-all hover:-translate-y-0.5 active:scale-95 duration-150">
<span class="material-symbols-outlined" data-icon="add">add</span>
                    Add New Table
                </button>
</div>
<!-- Filters Section -->
<div class="space-y-6 bg-white/50 p-6 rounded-2xl border border-slate-100">
<div class="flex flex-wrap items-start gap-10">
<!-- Status Filter -->
<div class="space-y-3">
<label class="text-[10px] uppercase tracking-widest font-bold text-on-surface-variant px-1">Status</label>
<div class="flex flex-wrap gap-2">
<button class="px-5 py-2 bg-primary text-on-primary rounded-full text-sm font-semibold shadow-sm">All</button>
<button class="px-5 py-2 bg-slate-100 text-slate-600 rounded-full text-sm font-medium hover:bg-slate-200 transition-colors">Available</button>
<button class="px-5 py-2 bg-slate-100 text-slate-600 rounded-full text-sm font-medium hover:bg-slate-200 transition-colors">Occupied</button>
<button class="px-5 py-2 bg-slate-100 text-slate-600 rounded-full text-sm font-medium hover:bg-slate-200 transition-colors">Reserved</button>
</div>
</div>
<!-- Capacity Filter -->
<div class="space-y-3">
<label class="text-[10px] uppercase tracking-widest font-bold text-on-surface-variant px-1">Capacity</label>
<div class="flex flex-wrap gap-2">
<button class="px-5 py-2 bg-slate-100 text-slate-600 rounded-full text-sm font-medium hover:bg-slate-200 transition-colors">All</button>
<button class="px-5 py-2 bg-slate-100 text-slate-600 rounded-full text-sm font-medium hover:bg-slate-200 transition-colors">2</button>
<button class="px-4 py-2 bg-slate-100 text-slate-600 rounded-full text-sm font-medium hover:bg-slate-200 transition-colors">4</button>
<button class="px-4 py-2 bg-slate-100 text-slate-600 rounded-full text-sm font-medium hover:bg-slate-200 transition-colors">6</button>
<button class="px-4 py-2 bg-slate-100 text-slate-600 rounded-full text-sm font-medium hover:bg-slate-200 transition-colors">8+</button>
</div>
</div>
<!-- Type Filter -->
<div class="space-y-3">
<label class="text-[10px] uppercase tracking-widest font-bold text-on-surface-variant px-1">Table Type</label>
<div class="flex flex-wrap gap-2">
<button class="px-5 py-2 bg-slate-100 text-slate-600 rounded-full text-sm font-medium hover:bg-slate-200 transition-colors">Standard</button>
<button class="px-5 py-2 bg-slate-100 text-slate-600 rounded-full text-sm font-medium hover:bg-slate-200 transition-colors">VIP</button>
<button class="px-5 py-2 bg-slate-100 text-slate-600 rounded-full text-sm font-medium hover:bg-slate-200 transition-colors">Outdoor</button>
</div>
</div>
</div>
</div>
<!-- Table List Grid -->
<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-8 pb-12">
<!-- Table Card: Available -->
<div class="bg-surface-container-lowest rounded-2xl p-6 flex flex-col gap-6 ambient-shadow hover:scale-[1.02] transition-all cursor-pointer border border-transparent hover:border-violet-100 group">
<div class="flex justify-between items-start">
<div>
<span class="text-[10px] font-bold text-primary uppercase tracking-widest">Table 01</span>
<h3 class="text-xl font-bold text-slate-900 mt-1">Window Alcove</h3>
</div>
<span class="px-3 py-1 bg-emerald-50 text-emerald-700 text-[10px] font-bold uppercase tracking-wider rounded-full border border-emerald-100">Available</span>
</div>
<div class="flex gap-3">
<div class="flex-1 bg-slate-50 rounded-2xl p-4 flex flex-col items-center justify-center gap-1 border border-slate-100">
<span class="material-symbols-outlined text-primary/60" data-icon="groups">groups</span>
<span class="text-xs font-bold text-on-surface">4 Guests</span>
</div>
<div class="flex-1 bg-slate-50 rounded-2xl p-4 flex flex-col items-center justify-center gap-1 border border-slate-100">
<span class="material-symbols-outlined text-primary/60" data-icon="chair">chair</span>
<span class="text-xs font-bold text-on-surface">Standard</span>
</div>
</div>
<div class="flex items-center justify-between pt-4 border-t border-slate-100">
<div class="flex items-center gap-2 text-on-surface-variant text-sm">
<span class="material-symbols-outlined text-lg" data-icon="location_on">location_on</span>
                            Main Floor
                        </div>
<div class="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
<button class="p-2 text-slate-400 hover:text-violet-600 hover:bg-violet-50 rounded-full transition-all">
<span class="material-symbols-outlined text-xl" data-icon="edit">edit</span>
</button>
<button class="p-2 text-slate-400 hover:text-error hover:bg-error-container/20 rounded-full transition-all">
<span class="material-symbols-outlined text-xl" data-icon="delete">delete</span>
</button>
</div>
</div>
</div>
<!-- Table Card: Occupied -->
<div class="bg-surface-container-lowest rounded-2xl p-6 flex flex-col gap-6 ambient-shadow hover:scale-[1.02] transition-all cursor-pointer border border-transparent hover:border-violet-100 group">
<div class="flex justify-between items-start">
<div>
<span class="text-[10px] font-bold text-primary uppercase tracking-widest">Table 08</span>
<h3 class="text-xl font-bold text-slate-900 mt-1">Terrace View</h3>
</div>
<span class="px-3 py-1 bg-rose-50 text-rose-700 text-[10px] font-bold uppercase tracking-wider rounded-full border border-rose-100">Occupied</span>
</div>
<div class="flex gap-3">
<div class="flex-1 bg-slate-50 rounded-2xl p-4 flex flex-col items-center justify-center gap-1 border border-slate-100">
<span class="material-symbols-outlined text-primary/60" data-icon="groups">groups</span>
<span class="text-xs font-bold text-on-surface">2 Guests</span>
</div>
<div class="flex-1 bg-slate-50 rounded-2xl p-4 flex flex-col items-center justify-center gap-1 border border-slate-100">
<span class="material-symbols-outlined text-primary/60" data-icon="deck">deck</span>
<span class="text-xs font-bold text-on-surface">Outdoor</span>
</div>
</div>
<div class="flex items-center justify-between pt-4 border-t border-slate-100">
<div class="flex items-center gap-2 text-on-surface-variant text-sm">
<span class="material-symbols-outlined text-lg" data-icon="location_on">location_on</span>
                            West Terrace
                        </div>
<div class="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
<button class="p-2 text-slate-400 hover:text-violet-600 hover:bg-violet-50 rounded-full transition-all">
<span class="material-symbols-outlined text-xl" data-icon="edit">edit</span>
</button>
<button class="p-2 text-slate-400 hover:text-error hover:bg-error-container/20 rounded-full transition-all">
<span class="material-symbols-outlined text-xl" data-icon="delete">delete</span>
</button>
</div>
</div>
</div>
<!-- Table Card: Reserved -->
<div class="bg-surface-container-lowest rounded-2xl p-6 flex flex-col gap-6 ambient-shadow hover:scale-[1.02] transition-all cursor-pointer border border-transparent hover:border-violet-100 group">
<div class="flex justify-between items-start">
<div>
<span class="text-[10px] font-bold text-primary uppercase tracking-widest">Table 12</span>
<h3 class="text-xl font-bold text-slate-900 mt-1">Chef's Table</h3>
</div>
<span class="px-3 py-1 bg-violet-50 text-violet-700 text-[10px] font-bold uppercase tracking-wider rounded-full border border-violet-100">Reserved</span>
</div>
<div class="flex gap-3">
<div class="flex-1 bg-slate-50 rounded-2xl p-4 flex flex-col items-center justify-center gap-1 border border-slate-100">
<span class="material-symbols-outlined text-primary/60" data-icon="groups">groups</span>
<span class="text-xs font-bold text-on-surface">6 Guests</span>
</div>
<div class="flex-1 bg-slate-50 rounded-2xl p-4 flex flex-col items-center justify-center gap-1 border border-slate-100">
<span class="material-symbols-outlined text-primary/60" data-icon="star">star</span>
<span class="text-xs font-bold text-on-surface">VIP</span>
</div>
</div>
<div class="flex items-center justify-between pt-4 border-t border-slate-100">
<div class="flex items-center gap-2 text-on-surface-variant text-sm">
<span class="material-symbols-outlined text-lg" data-icon="location_on">location_on</span>
                            Kitchen Wing
                        </div>
<div class="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
<button class="p-2 text-slate-400 hover:text-violet-600 hover:bg-violet-50 rounded-full transition-all">
<span class="material-symbols-outlined text-xl" data-icon="edit">edit</span>
</button>
<button class="p-2 text-slate-400 hover:text-error hover:bg-error-container/20 rounded-full transition-all">
<span class="material-symbols-outlined text-xl" data-icon="delete">delete</span>
</button>
</div>
</div>
</div>
<!-- Table Card: Available (Another) -->
<div class="bg-surface-container-lowest rounded-2xl p-6 flex flex-col gap-6 ambient-shadow hover:scale-[1.02] transition-all cursor-pointer border border-transparent hover:border-violet-100 group">
<div class="flex justify-between items-start">
<div>
<span class="text-[10px] font-bold text-primary uppercase tracking-widest">Table 05</span>
<h3 class="text-xl font-bold text-slate-900 mt-1">Garden Corner</h3>
</div>
<span class="px-3 py-1 bg-emerald-50 text-emerald-700 text-[10px] font-bold uppercase tracking-wider rounded-full border border-emerald-100">Available</span>
</div>
<div class="flex gap-3">
<div class="flex-1 bg-slate-50 rounded-2xl p-4 flex flex-col items-center justify-center gap-1 border border-slate-100">
<span class="material-symbols-outlined text-primary/60" data-icon="groups">groups</span>
<span class="text-xs font-bold text-on-surface">8 Guests</span>
</div>
<div class="flex-1 bg-slate-50 rounded-2xl p-4 flex flex-col items-center justify-center gap-1 border border-slate-100">
<span class="material-symbols-outlined text-primary/60" data-icon="deck">deck</span>
<span class="text-xs font-bold text-on-surface">Outdoor</span>
</div>
</div>
<div class="flex items-center justify-between pt-4 border-t border-slate-100">
<div class="flex items-center gap-2 text-on-surface-variant text-sm">
<span class="material-symbols-outlined text-lg" data-icon="location_on">location_on</span>
                            Patio Area
                        </div>
<div class="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
<button class="p-2 text-slate-400 hover:text-violet-600 hover:bg-violet-50 rounded-full transition-all">
<span class="material-symbols-outlined text-xl" data-icon="edit">edit</span>
</button>
<button class="p-2 text-slate-400 hover:text-error hover:bg-error-container/20 rounded-full transition-all">
<span class="material-symbols-outlined text-xl" data-icon="delete">delete</span>
</button>
</div>
</div>
</div>
</div>
</section>
</main>
<!-- Modal Mockup: Add New Table -->
<div class="fixed inset-0 bg-slate-900/40 backdrop-blur-md z-50 flex items-center justify-center pointer-events-none opacity-0 transition-opacity">
<!-- Add 'opacity-100 pointer-events-auto' to show modal -->
<div class="bg-surface-container-lowest w-full max-w-xl rounded-2xl overflow-hidden ambient-shadow transform scale-95 transition-transform">
<div class="p-8 border-b border-slate-100 flex justify-between items-center bg-white">
<h2 class="text-2xl font-bold text-slate-900">Add New Table</h2>
<button class="p-2 hover:bg-slate-50 rounded-full transition-all">
<span class="material-symbols-outlined text-slate-400" data-icon="close">close</span>
</button>
</div>
<form class="p-8 space-y-8 bg-white">
<div class="grid grid-cols-2 gap-6">
<div class="space-y-2">
<label class="text-xs font-bold text-slate-500 uppercase tracking-wider">Table ID</label>
<input class="w-full bg-slate-50 border-slate-100 rounded-xl py-3 px-4 focus:ring-2 focus:ring-primary/40 focus:bg-white transition-all outline-none border" placeholder="e.g. Table 01" type="text"/>
</div>
<div class="space-y-2">
<label class="text-xs font-bold text-slate-500 uppercase tracking-wider">Capacity</label>
<select class="w-full bg-slate-50 border-slate-100 rounded-xl py-3 px-4 focus:ring-2 focus:ring-primary/40 focus:bg-white transition-all outline-none border">
<option>2 Guests</option>
<option>4 Guests</option>
<option>6 Guests</option>
<option>8+ Guests</option>
</select>
</div>
</div>
<div class="space-y-2">
<label class="text-xs font-bold text-slate-500 uppercase tracking-wider">Location Category</label>
<div class="flex gap-4">
<label class="flex-1 relative cursor-pointer group">
<input class="sr-only peer" name="loc" type="radio"/>
<div class="bg-slate-50 p-4 rounded-xl text-center border-2 border-transparent peer-checked:border-primary peer-checked:bg-violet-50 transition-all">
<span class="material-symbols-outlined block mb-2 text-primary/60" data-icon="meeting_room">meeting_room</span>
<span class="text-xs font-bold">Indoor</span>
</div>
</label>
<label class="flex-1 relative cursor-pointer group">
<input class="sr-only peer" name="loc" type="radio"/>
<div class="bg-slate-50 p-4 rounded-xl text-center border-2 border-transparent peer-checked:border-primary peer-checked:bg-violet-50 transition-all">
<span class="material-symbols-outlined block mb-2 text-primary/60" data-icon="wb_sunny">wb_sunny</span>
<span class="text-xs font-bold">Outdoor</span>
</div>
</label>
<label class="flex-1 relative cursor-pointer group">
<input class="sr-only peer" name="loc" type="radio"/>
<div class="bg-slate-50 p-4 rounded-xl text-center border-2 border-transparent peer-checked:border-primary peer-checked:bg-violet-50 transition-all">
<span class="material-symbols-outlined block mb-2 text-primary/60" data-icon="stars">stars</span>
<span class="text-xs font-bold">VIP</span>
</div>
</label>
</div>
</div>
<div class="pt-4 flex gap-4">
<button class="flex-1 py-4 bg-slate-100 text-slate-700 rounded-xl font-bold hover:bg-slate-200 transition-colors" type="button">Cancel</button>
<button class="flex-1 py-4 bg-primary text-on-primary rounded-xl font-bold hover:bg-violet-700 ambient-shadow transition-all active:scale-95 duration-150" type="submit">Create Table</button>
</div>
</form>
</div>
</div>
</body></html>