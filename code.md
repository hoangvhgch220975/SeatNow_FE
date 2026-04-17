<!DOCTYPE html>

<html class="light" lang="en"><head>
<meta charset="utf-8"/>
<meta content="width=device-width, initial-scale=1.0" name="viewport"/>
<title>Restaurant Management | SeatNow Admin</title>
<script src="https://cdn.tailwindcss.com?plugins=forms,container-queries"></script>
<link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&amp;display=swap" rel="stylesheet"/>
<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&amp;display=swap" rel="stylesheet"/>
<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&amp;display=swap" rel="stylesheet"/>
<script id="tailwind-config">
        tailwind.config = {
            darkMode: "class",
            theme: {
                extend: {
                    "colors": {
                        "on-background": "#191c1d",
                        "surface-dim": "#d9dadb",
                        "surface-container-high": "#e7e8e9",
                        "surface-bright": "#f8f9fa",
                        "error": "#ba1a1a",
                        "on-primary-container": "#ede0ff",
                        "on-tertiary-fixed-variant": "#713700",
                        "outline": "#7b7487",
                        "secondary-fixed-dim": "#d3bbff",
                        "primary-fixed-dim": "#d2bbff",
                        "inverse-primary": "#d2bbff",
                        "primary-container": "#7c3aed",
                        "tertiary-fixed-dim": "#ffb784",
                        "on-tertiary-fixed": "#301400",
                        "background": "#f8f9fa",
                        "on-secondary-container": "#fffbff",
                        "primary": "#630ed4",
                        "on-secondary-fixed-variant": "#581db3",
                        "error-container": "#ffdad6",
                        "tertiary": "#7d3d00",
                        "on-secondary": "#ffffff",
                        "surface-container-highest": "#e1e3e4",
                        "primary-fixed": "#eaddff",
                        "surface-variant": "#e1e3e4",
                        "secondary": "#6e3aca",
                        "on-surface": "#191c1d",
                        "surface-container-lowest": "#ffffff",
                        "on-surface-variant": "#4a4455",
                        "on-secondary-fixed": "#250059",
                        "surface-tint": "#732ee4",
                        "secondary-fixed": "#ebddff",
                        "on-primary-fixed": "#25005a",
                        "on-primary-fixed-variant": "#5a00c6",
                        "inverse-surface": "#2e3132",
                        "surface-container": "#edeeef",
                        "on-error-container": "#93000a",
                        "surface-container-low": "#f3f4f5",
                        "on-primary": "#ffffff",
                        "inverse-on-surface": "#f0f1f2",
                        "surface": "#f8f9fa",
                        "secondary-container": "#8856e5",
                        "tertiary-container": "#a15100",
                        "on-error": "#ffffff",
                        "tertiary-fixed": "#ffdcc6",
                        "on-tertiary-container": "#ffe0cd",
                        "outline-variant": "#ccc3d8",
                        "on-tertiary": "#ffffff"
                    },
                    "borderRadius": {
                        "DEFAULT": "1rem",
                        "lg": "2rem",
                        "xl": "3rem",
                        "2xl": "1.5rem",
                        "full": "9999px"
                    },
                    "fontFamily": {
                        "headline": ["Plus Jakarta Sans"],
                        "body": ["Plus Jakarta Sans"],
                        "label": ["Plus Jakarta Sans"]
                    }
                },
            },
        }
    </script>
<style>
        body { font-family: 'Plus Jakarta Sans', sans-serif; }
        .material-symbols-outlined {
            font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24;
            vertical-align: middle;
        }
        .custom-scrollbar::-webkit-scrollbar { width: 4px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #ccc3d8; border-radius: 10px; }
    </style>
</head>
<body class="bg-background text-on-surface flex min-h-screen">
<!-- Sidebar (Shared Component) -->
<aside class="fixed left-0 top-0 h-full flex flex-col p-6 space-y-2 bg-slate-50 dark:bg-slate-950 h-screen w-64 rounded-r-[3rem] z-50">
<div class="flex flex-col mb-10">
<div class="flex items-center gap-3">
<div class="w-10 h-10 bg-primary-container rounded-xl flex items-center justify-center text-white">
<span class="material-symbols-outlined" style="font-variation-settings: 'FILL' 1;">restaurant_menu</span>
</div>
<div>
<h1 class="text-xl font-black text-violet-600 leading-none">SeatNow</h1>
<p class="text-[10px] uppercase tracking-widest text-on-surface-variant/60 font-bold">Admin Console</p>
</div>
</div>
</div>
<nav class="flex-1 space-y-1">
<!-- Navigation Items Mapping -->
<a class="flex items-center gap-3 px-4 py-3 text-slate-500 hover:text-slate-900 transition-all duration-300 hover:translate-x-1 font-semibold text-sm" href="#">
<span class="material-symbols-outlined">dashboard</span> Dashboard
            </a>
<a class="flex items-center gap-3 px-4 py-3 text-violet-600 bg-violet-50 rounded-2xl transition-all duration-300 hover:translate-x-1 font-semibold text-sm" href="#">
<span class="material-symbols-outlined" style="font-variation-settings: 'FILL' 1;">restaurant</span> Restaurants
            </a>
<a class="flex items-center gap-3 px-4 py-3 text-slate-500 hover:text-slate-900 transition-all duration-300 hover:translate-x-1 font-semibold text-sm" href="#">
<span class="material-symbols-outlined">group_add</span> Partner Requests
            </a>
<a class="flex items-center gap-3 px-4 py-3 text-slate-500 hover:text-slate-900 transition-all duration-300 hover:translate-x-1 font-semibold text-sm" href="#">
<span class="material-symbols-outlined">person</span> Users
            </a>
<a class="flex items-center gap-3 px-4 py-3 text-slate-500 hover:text-slate-900 transition-all duration-300 hover:translate-x-1 font-semibold text-sm" href="#">
<span class="material-symbols-outlined">event_available</span> Bookings
            </a>
<a class="flex items-center gap-3 px-4 py-3 text-slate-500 hover:text-slate-900 transition-all duration-300 hover:translate-x-1 font-semibold text-sm" href="#">
<span class="material-symbols-outlined">receipt_long</span> Transactions
            </a>
<a class="flex items-center gap-3 px-4 py-3 text-slate-500 hover:text-slate-900 transition-all duration-300 hover:translate-x-1 font-semibold text-sm" href="#">
<span class="material-symbols-outlined">payments</span> Withdrawals
            </a>
<a class="flex items-center gap-3 px-4 py-3 text-slate-500 hover:text-slate-900 transition-all duration-300 hover:translate-x-1 font-semibold text-sm" href="#">
<span class="material-symbols-outlined">insights</span> AI Analytics
            </a>
<a class="flex items-center gap-3 px-4 py-3 text-slate-500 hover:text-slate-900 transition-all duration-300 hover:translate-x-1 font-semibold text-sm" href="#">
<span class="material-symbols-outlined">settings</span> Settings
            </a>
</nav>
<div class="mt-auto pt-6 border-t border-outline-variant/10">
<button class="w-full py-4 bg-primary text-on-primary rounded-xl font-bold text-sm shadow-lg shadow-primary/20 flex items-center justify-center gap-2">
<span class="material-symbols-outlined text-[18px]">add</span> New Report
            </button>
</div>
</aside>
<!-- Main Content Area -->
<main class="flex-1 ml-64 min-h-screen flex flex-col relative">
<!-- Top Navigation Bar -->
<header class="sticky top-0 w-full flex justify-between items-center px-8 py-4 bg-slate-50/70 backdrop-blur-xl z-40 shadow-sm shadow-violet-500/5">
<div class="flex items-center gap-6">
<h2 class="text-xl font-bold tracking-tight text-slate-900">Restaurant Management</h2>
<div class="relative w-80">
<span class="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">search</span>
<input class="w-full bg-surface-container-low border-none rounded-full pl-10 pr-4 py-2 text-sm focus:ring-2 focus:ring-primary/20" placeholder="Search restaurants, owners..." type="text"/>
</div>
</div>
<div class="flex items-center gap-4">
<button class="w-10 h-10 rounded-full flex items-center justify-center text-slate-500 hover:bg-slate-100 transition-colors">
<span class="material-symbols-outlined">notifications</span>
</button>
<div class="flex items-center gap-3 pl-4 border-l border-outline-variant/20">
<div class="text-right">
<p class="text-xs font-bold text-slate-900">Admin Profile</p>
<p class="text-[10px] text-slate-500">Super Admin</p>
</div>
<img alt="Admin Avatar" class="w-10 h-10 rounded-full object-cover shadow-md" data-alt="professional headshot of a middle-aged man in a charcoal suit with soft office lighting and clean background" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDWlawH0Rw-sYZsCmsbMUqTLo2Nz3cw7Q0EWytBmmzb6wcz_q5Hf3Lt_YRCU7kX9BMn4koEvz5lQ1gTa3VS02R4GaI3Mek9DjQzyVVdWNC5ePkFbwckYAbF_PTJPdKLv0kfWvc6Vhkf4EV_3tPUP2nrYY4gkTc-8QECQHR-sCHCOE7Xm1LmS6WbHcXOCvX4-PxNbXKi-jpMJZ5SwiPddcp_vF7ut0Bgqovrw8fjnSdTRctYzBVDjfp3H5XWX8mM6L2Dwb8I595apWB3"/>
</div>
</div>
</header>
<!-- Content Canvas -->
<div class="p-8 space-y-8">
<!-- Filters & Tabs Section -->
<div class="space-y-6">
<!-- Status Tabs -->
<div class="flex gap-2">
<button class="px-6 py-2.5 rounded-full text-sm font-bold bg-primary text-on-primary shadow-md">All Restaurants</button>
<button class="px-6 py-2.5 rounded-full text-sm font-semibold text-on-surface-variant hover:bg-surface-container-high transition-colors">Pending Approval</button>
<button class="px-6 py-2.5 rounded-full text-sm font-semibold text-on-surface-variant hover:bg-surface-container-high transition-colors">Active</button>
<button class="px-6 py-2.5 rounded-full text-sm font-semibold text-on-surface-variant hover:bg-surface-container-high transition-colors">Suspended</button>
</div>
<!-- Advanced Filter Bar -->
<div class="flex items-center justify-between p-2 bg-surface-container-low rounded-2xl">
<div class="flex gap-4 p-1">
<select class="bg-surface-container-lowest border-none rounded-xl text-xs font-bold px-4 py-2 ring-1 ring-outline-variant/10 focus:ring-primary/40">
<option>Price Range: All</option>
<option>$</option>
<option>$$</option>
<option>$$$</option>
<option>$$$$</option>
</select>
<select class="bg-surface-container-lowest border-none rounded-xl text-xs font-bold px-4 py-2 ring-1 ring-outline-variant/10 focus:ring-primary/40">
<option>Cuisine: All Types</option>
<option>French Editorial</option>
<option>Modern Japanese</option>
<option>Nordic Fusion</option>
<option>Artisan Italian</option>
</select>
<select class="bg-surface-container-lowest border-none rounded-xl text-xs font-bold px-4 py-2 ring-1 ring-outline-variant/10 focus:ring-primary/40">
<option>Commission: Any</option>
<option>5% - 10%</option>
<option>10% - 15%</option>
<option>15%+</option>
</select>
</div>
<button class="flex items-center gap-2 px-4 py-2 text-primary font-bold text-xs uppercase tracking-tight hover:bg-primary/5 rounded-xl transition-colors">
<span class="material-symbols-outlined text-[18px]">filter_list</span>
                        More Filters
                    </button>
</div>
</div>
<!-- Modern Table Layout -->
<div class="bg-surface-container-lowest rounded-xl shadow-sm overflow-hidden border border-outline-variant/10">
<table class="w-full text-left border-collapse">
<thead>
<tr class="bg-surface-container-low/50">
<th class="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-on-surface-variant/70">Restaurant</th>
<th class="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-on-surface-variant/70">Slug &amp; Owner</th>
<th class="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-on-surface-variant/70">Cuisine</th>
<th class="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-on-surface-variant/70 text-center">Rating &amp; Price</th>
<th class="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-on-surface-variant/70 text-center">Commission</th>
<th class="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-on-surface-variant/70">Status</th>
<th class="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-on-surface-variant/70 text-right">Actions</th>
</tr>
</thead>
<tbody class="divide-y divide-outline-variant/5">
<!-- Table Row 1 -->
<tr class="group hover:bg-surface-container-low/30 transition-colors">
<td class="px-6 py-5">
<div class="flex items-center gap-4">
<img alt="Restaurant Image" class="w-12 h-12 rounded-xl object-cover shadow-sm ring-1 ring-outline-variant/20" data-alt="high-end minimalist restaurant interior with soft beige walls, sculptural lighting, and wooden furniture in morning light" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBLz_ulGbEACmSyNuzA0Pxn2ZB7EVH_OKylZIeRI_MB3Ko3Id1DRzHR0kBoVurstroriwrAns13HKQHAh1TGTN5BIF4V-tWdP1TpRL1kFmrkfDKmUiBmpJIyxouLb71MSeLt7kcXqaKG0-LgSZXooRebS8-c6Xkfh_agqGH1vXhL_DsbFkTOE9hYjq9LpMAsM37rxEi03saBPXGk_n-5j7S29WAcpm9H1lHeQ8uxZJhsG0ZjHqRtRHTFalYmdU8glREjpd3Ee2PUWtP"/>
<div>
<p class="text-sm font-bold text-slate-900">Le Monochrome</p>
<p class="text-xs text-slate-500">Paris, France</p>
</div>
</div>
</td>
<td class="px-6 py-5">
<p class="text-xs font-mono text-primary bg-primary/5 px-2 py-0.5 rounded w-fit">le-monochrome-paris</p>
<p class="text-xs mt-1 text-slate-600 font-medium">Marc Antoine</p>
</td>
<td class="px-6 py-5">
<span class="text-xs font-semibold px-3 py-1 bg-surface-container-high rounded-full">Contemporary French</span>
</td>
<td class="px-6 py-5">
<div class="flex flex-col items-center">
<div class="flex items-center gap-1 text-amber-500">
<span class="material-symbols-outlined text-[16px]" style="font-variation-settings: 'FILL' 1;">star</span>
<span class="text-xs font-bold">4.9</span>
</div>
<span class="text-[10px] font-black text-slate-400 mt-1">$$$$</span>
</div>
</td>
<td class="px-6 py-5 text-center">
<span class="text-sm font-bold text-slate-700">12.5%</span>
</td>
<td class="px-6 py-5">
<span class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-emerald-100 text-emerald-700 ring-1 ring-emerald-200">
<span class="w-1.5 h-1.5 rounded-full bg-emerald-500"></span> Active
                                </span>
</td>
<td class="px-6 py-5 text-right">
<div class="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
<button class="p-2 hover:bg-violet-50 text-violet-600 rounded-lg transition-colors" title="View Details">
<span class="material-symbols-outlined text-[20px]">visibility</span>
</button>
<button class="p-2 hover:bg-slate-100 text-slate-500 rounded-lg transition-colors" title="Suspend">
<span class="material-symbols-outlined text-[20px]">block</span>
</button>
</div>
</td>
</tr>
<!-- Table Row 2 -->
<tr class="group hover:bg-surface-container-low/30 transition-colors">
<td class="px-6 py-5">
<div class="flex items-center gap-4">
<img alt="Restaurant Image" class="w-12 h-12 rounded-xl object-cover shadow-sm ring-1 ring-outline-variant/20" data-alt="exquisite sushi platter arranged on a black slate board with edible flowers and gold leaf accents, studio lighting" src="https://lh3.googleusercontent.com/aida-public/AB6AXuA25Pw6gNXtamEneQQottQDFcifLFIzmH2_pG7nLaIGGT-TlQzVxXjFFc5Qq2BZ_rKfKTSwBpKdxnU2p-wZrVN0l-aW8NIAYelX3kIrNYKcm3K-sXHL8Ilv-o7W45OVnNeAJAJVvKa6JV5k_PSOjl2OiHIY-m-sdTPuZjAj2R9WuRDUe13TETvTufrJRC5JBojVaNSXilbjKgZUJj3GxO5EUSC71UATbuhoEFrYdUK3tyayseQQ-OKkS7DsbGD0s4jmc_YL-8eHlORk"/>
<div>
<p class="text-sm font-bold text-slate-900">Umi Shizen</p>
<p class="text-xs text-slate-500">Tokyo, JP</p>
</div>
</div>
</td>
<td class="px-6 py-5">
<p class="text-xs font-mono text-primary bg-primary/5 px-2 py-0.5 rounded w-fit">umi-shizen-tokyo</p>
<p class="text-xs mt-1 text-slate-600 font-medium">Kenji Tanaka</p>
</td>
<td class="px-6 py-5">
<span class="text-xs font-semibold px-3 py-1 bg-surface-container-high rounded-full">Omakase Japanese</span>
</td>
<td class="px-6 py-5">
<div class="flex flex-col items-center">
<div class="flex items-center gap-1 text-slate-300">
<span class="material-symbols-outlined text-[16px]">star</span>
<span class="text-xs font-bold">—</span>
</div>
<span class="text-[10px] font-black text-slate-400 mt-1">$$$$$</span>
</div>
</td>
<td class="px-6 py-5 text-center">
<span class="text-sm font-bold text-slate-700">15.0%</span>
</td>
<td class="px-6 py-5">
<span class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-amber-100 text-amber-700 ring-1 ring-amber-200">
<span class="w-1.5 h-1.5 rounded-full bg-amber-500"></span> Pending
                                </span>
</td>
<td class="px-6 py-5 text-right">
<div class="flex items-center justify-end gap-2">
<button class="px-4 py-1.5 bg-primary text-on-primary text-[10px] font-bold uppercase rounded-lg shadow-sm hover:translate-y-[-1px] transition-transform">
                                        Approve
                                    </button>
<button class="p-2 hover:bg-slate-100 text-slate-500 rounded-lg transition-colors">
<span class="material-symbols-outlined text-[20px]">visibility</span>
</button>
</div>
</td>
</tr>
<!-- Table Row 3 -->
<tr class="group hover:bg-surface-container-low/30 transition-colors">
<td class="px-6 py-5">
<div class="flex items-center gap-4">
<img alt="Restaurant Image" class="w-12 h-12 rounded-xl object-cover shadow-sm ring-1 ring-outline-variant/20" data-alt="dark moody restaurant bar with velvet chairs, neon purple lighting accents and luxury cocktail glasses on marble bar" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCoMAPGhdJr8mcdPrhsJH2dvDf077ltcO8hB7MyeDr6AtRGNCXfSFCUpG7ZJkjSs-avAu7y4k_rpwh2YRYikyIcEoFAy0yuuXfh6JQobx0Vb18eoebWVRRoSFvOAHmeKZ4m7yjb4S9N8eqm1GAx0qeEqaEwfdcP5iruy7zHAsqJsDlcRAApiFsS8dJNLJvTH2reB0CxGKI84II3g07dwRYbRymfPWRYTcPyVLi0heK9leZJ4w-Meh7qWJ_VPn6RERBFRdcxYqQ1RRqL"/>
<div>
<p class="text-sm font-bold text-slate-900">Neon Bistro</p>
<p class="text-xs text-slate-500">Berlin, DE</p>
</div>
</div>
</td>
<td class="px-6 py-5">
<p class="text-xs font-mono text-primary bg-primary/5 px-2 py-0.5 rounded w-fit">neon-bistro-berlin</p>
<p class="text-xs mt-1 text-slate-600 font-medium">Lukas Weber</p>
</td>
<td class="px-6 py-5">
<span class="text-xs font-semibold px-3 py-1 bg-surface-container-high rounded-full">Fusion Kitchen</span>
</td>
<td class="px-6 py-5">
<div class="flex flex-col items-center">
<div class="flex items-center gap-1 text-amber-500">
<span class="material-symbols-outlined text-[16px]" style="font-variation-settings: 'FILL' 1;">star</span>
<span class="text-xs font-bold">4.2</span>
</div>
<span class="text-[10px] font-black text-slate-400 mt-1">$$</span>
</div>
</td>
<td class="px-6 py-5 text-center">
<span class="text-sm font-bold text-slate-700">10.0%</span>
</td>
<td class="px-6 py-5">
<span class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-rose-100 text-rose-700 ring-1 ring-rose-200">
<span class="w-1.5 h-1.5 rounded-full bg-rose-500"></span> Suspended
                                </span>
</td>
<td class="px-6 py-5 text-right">
<div class="flex items-center justify-end gap-2">
<button class="p-2 hover:bg-slate-100 text-slate-500 rounded-lg transition-colors">
<span class="material-symbols-outlined text-[20px]">visibility</span>
</button>
<button class="p-2 hover:bg-emerald-50 text-emerald-600 rounded-lg transition-colors" title="Activate">
<span class="material-symbols-outlined text-[20px]">check_circle</span>
</button>
</div>
</td>
</tr>
</tbody>
</table>
<!-- Pagination -->
<div class="px-6 py-4 flex items-center justify-between border-t border-outline-variant/10">
<p class="text-xs font-medium text-on-surface-variant">Showing 1 to 10 of 248 restaurants</p>
<div class="flex items-center gap-2">
<button class="p-2 border border-outline-variant/20 rounded-lg text-slate-400 hover:bg-slate-50 transition-colors">
<span class="material-symbols-outlined text-[20px]">chevron_left</span>
</button>
<button class="w-8 h-8 flex items-center justify-center bg-primary text-on-primary rounded-lg text-xs font-bold">1</button>
<button class="w-8 h-8 flex items-center justify-center hover:bg-slate-100 rounded-lg text-xs font-bold text-slate-600">2</button>
<button class="w-8 h-8 flex items-center justify-center hover:bg-slate-100 rounded-lg text-xs font-bold text-slate-600">3</button>
<button class="p-2 border border-outline-variant/20 rounded-lg text-slate-400 hover:bg-slate-50 transition-colors">
<span class="material-symbols-outlined text-[20px]">chevron_right</span>
</button>
</div>
</div>
</div>
<!-- Bento Stats Section (Visual Flourish) -->
<div class="grid grid-cols-4 gap-6">
<div class="col-span-1 bg-violet-50 p-6 rounded-xl space-y-2">
<span class="material-symbols-outlined text-violet-600 bg-white p-2 rounded-lg">trending_up</span>
<p class="text-xs font-bold text-violet-600/60 uppercase tracking-widest">Growth Rate</p>
<h3 class="text-2xl font-black text-violet-900">+24% <span class="text-xs font-medium text-slate-500">MTD</span></h3>
</div>
<div class="col-span-1 bg-surface-container-low p-6 rounded-xl space-y-2">
<span class="material-symbols-outlined text-slate-600 bg-white p-2 rounded-lg">hourglass_empty</span>
<p class="text-xs font-bold text-slate-500 uppercase tracking-widest">Avg. Approval</p>
<h3 class="text-2xl font-black text-slate-900">4.2 hrs</h3>
</div>
<div class="col-span-2 bg-primary p-6 rounded-xl relative overflow-hidden flex flex-col justify-end min-h-[140px]">
<div class="absolute top-0 right-0 p-8 opacity-20 transform translate-x-10 -translate-y-10">
<span class="material-symbols-outlined text-[120px] text-white">verified</span>
</div>
<div class="relative z-10">
<h3 class="text-xl font-bold text-white mb-1">Scale your operations</h3>
<p class="text-primary-fixed text-sm">Automate verification for high-tier partners with the new AI verification module.</p>
</div>
</div>
</div>
</div>
<!-- Sidebar Drawer (Restaurant Details) -->
<div class="fixed top-0 right-0 h-full w-[400px] bg-white shadow-2xl z-[60] border-l border-outline-variant/10 flex flex-col transform translate-x-0 transition-transform duration-500">
<!-- Drawer Header -->
<div class="p-6 border-b border-outline-variant/10 flex items-center justify-between">
<div>
<h3 class="text-lg font-bold text-slate-900">Restaurant Details</h3>
<p class="text-xs text-slate-500">Viewing: Le Monochrome</p>
</div>
<button class="w-8 h-8 rounded-full hover:bg-slate-100 flex items-center justify-center transition-colors">
<span class="material-symbols-outlined text-slate-400">close</span>
</button>
</div>
<div class="flex-1 overflow-y-auto custom-scrollbar">
<!-- Cover Image -->
<div class="relative h-48 w-full bg-slate-200">
<img alt="Detail Image" class="w-full h-full object-cover" data-alt="top-down artistic shot of gourmet french dish on ceramic plate with architectural garnish and soft kitchen lighting" src="https://lh3.googleusercontent.com/aida-public/AB6AXuC2klagMxeiKBlNbACTe-OaGTyH5fo7yyN0PtmqzpoTaimEvdpaV0uXhU8ApruyTpPAqxmMZSCyWERTb108S7vs3AbneIli0PvZyLNWFFLDeVeCTSoywoPqMDZYZfwxGADxtRcVdqGXJ_K1XVsSDLvOOcn1khAOagXpSfU7Ffa_97ylT2KiBCDkD2BwAU_QtPU1YtQVgrB8J6qRLqHQEZxtIBZMy3_uVacDyssNBpqF8sdjj5ON51a8V2mNF0bcAUTyT5AIRTesL9Fv"/>
<div class="absolute bottom-4 left-6 bg-white/70 backdrop-blur px-3 py-1 rounded-full border border-white/20">
<p class="text-[10px] font-bold text-primary uppercase">Elite Partner</p>
</div>
</div>
<div class="p-8 space-y-8">
<!-- Owner Info Section -->
<section class="space-y-4">
<h4 class="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Owner Information</h4>
<div class="flex items-center gap-4 bg-slate-50 p-4 rounded-xl">
<img alt="Owner Avatar" class="w-12 h-12 rounded-full object-cover" data-alt="smiling mature man with glasses in a professional white chef coat, warm kitchen lighting" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDzMoRQga6bUV9BGWPw3H6hiW63RSnzKLBRJHMt60V9veR7FbwTPlzrDZBuAI_5HRLVgWlhgMX1-akA5qZda4iIu7mCh6_UQal02iiXyCOqVRK3u-R5ygPFFo3BcncNY2T6WCukah9Q3uIihbxKO7WthGVMyVIBooTbM5uWbRBW98zxt6LsCObw4itwqcUxf6mYdLu78CMyIQRh4Sv2RCNa0WRMM-g9Q0tq4MNSjBkqCaaZrcJ8FX8Z9h_JLrym7fP9O0XAWNZpNRwV"/>
<div>
<p class="text-sm font-bold text-slate-900">Marc Antoine</p>
<p class="text-xs text-slate-500">m.antoine@lemonochrome.com</p>
<p class="text-[10px] font-medium text-slate-400 mt-0.5">+33 1 23 45 67 89</p>
</div>
</div>
</section>
<!-- Opening Hours Section -->
<section class="space-y-4">
<h4 class="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Weekly Schedule</h4>
<div class="grid grid-cols-1 gap-2">
<div class="flex justify-between text-xs py-2 border-b border-outline-variant/5">
<span class="font-semibold text-slate-600">Monday - Friday</span>
<span class="font-bold text-slate-900">12:00 PM — 11:00 PM</span>
</div>
<div class="flex justify-between text-xs py-2 border-b border-outline-variant/5">
<span class="font-semibold text-slate-600">Saturday</span>
<span class="font-bold text-slate-900">11:00 AM — 01:00 AM</span>
</div>
<div class="flex justify-between text-xs py-2 text-rose-500">
<span class="font-semibold">Sunday</span>
<span class="font-bold">Closed</span>
</div>
</div>
</section>
<!-- Policies Section -->
<section class="space-y-4">
<h4 class="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Booking &amp; Deposit</h4>
<div class="p-4 rounded-2xl border-2 border-dashed border-outline-variant/20 space-y-3">
<div class="flex items-start gap-3">
<span class="material-symbols-outlined text-primary text-[18px]">payments</span>
<div>
<p class="text-xs font-bold text-slate-900">Deposit Required</p>
<p class="text-[10px] text-slate-500 leading-relaxed">€25.00 per guest for parties over 4 people. Non-refundable if cancelled within 24 hours.</p>
</div>
</div>
<div class="flex items-start gap-3">
<span class="material-symbols-outlined text-primary text-[18px]">timer</span>
<div>
<p class="text-xs font-bold text-slate-900">Grace Period</p>
<p class="text-[10px] text-slate-500 leading-relaxed">15 minutes grace period before the reservation is automatically cancelled.</p>
</div>
</div>
</div>
</section>
</div>
</div>
<!-- Drawer Footer Actions -->
<div class="p-6 bg-slate-50 border-t border-outline-variant/10 flex gap-3">
<button class="flex-1 py-3 bg-rose-100 text-rose-700 rounded-xl font-bold text-xs uppercase tracking-tight hover:bg-rose-200 transition-colors">
                    Suspend Partner
                </button>
<button class="flex-1 py-3 bg-primary text-on-primary rounded-xl font-bold text-xs uppercase tracking-tight shadow-md shadow-primary/20 hover:translate-y-[-1px] transition-all">
                    Save Changes
                </button>
</div>
</div>
<!-- Overlay -->
<div class="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-[55] pointer-events-none opacity-0 transition-opacity"></div>
</main>
</body></html>