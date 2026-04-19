<!DOCTYPE html>

<html lang="en"><head>
<meta charset="utf-8"/>
<meta content="width=device-width, initial-scale=1.0" name="viewport"/>
<title>Withdrawal Requests | SeatNow Admin</title>
<script src="https://cdn.tailwindcss.com?plugins=forms,container-queries"></script>
<link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&amp;display=swap" rel="stylesheet"/>
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
        }
        .tonal-transition {
            background: linear-gradient(to bottom, transparent, rgba(243, 244, 245, 0.8));
        }
        .ambient-shadow {
            box-shadow: 0 20px 40px -15px rgba(99, 14, 212, 0.04);
        }
    </style>
</head>
<body class="bg-surface text-on-surface min-h-screen">
<!-- SideNavBar -->
<aside class="fixed left-0 top-0 h-full flex flex-col p-6 space-y-2 bg-slate-50 dark:bg-slate-950 h-screen w-64 rounded-r-[3rem] z-50">
<div class="flex items-center gap-3 px-2 mb-8">
<div class="w-10 h-10 rounded-xl bg-primary flex items-center justify-center text-on-primary">
<span class="material-symbols-outlined" data-weight="fill" style="font-variation-settings: 'FILL' 1;">restaurant</span>
</div>
<div>
<h1 class="text-xl font-black text-violet-600">SeatNow</h1>
<p class="text-[10px] uppercase tracking-widest text-slate-400 font-bold">Admin Console</p>
</div>
</div>
<nav class="flex-1 space-y-1">
<a class="flex items-center gap-3 px-4 py-3 text-slate-500 hover:text-slate-900 transition-all duration-300 hover:translate-x-1 font-semibold text-sm" href="#">
<span class="material-symbols-outlined">dashboard</span> Dashboard
            </a>
<a class="flex items-center gap-3 px-4 py-3 text-slate-500 hover:text-slate-900 transition-all duration-300 hover:translate-x-1 font-semibold text-sm" href="#">
<span class="material-symbols-outlined">restaurant</span> Restaurants
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
<a class="flex items-center gap-3 px-4 py-3 text-violet-600 bg-violet-50 rounded-2xl transition-all duration-300 hover:translate-x-1 font-semibold text-sm" href="#">
<span class="material-symbols-outlined" style="font-variation-settings: 'FILL' 1;">payments</span> Withdrawals
            </a>
<a class="flex items-center gap-3 px-4 py-3 text-slate-500 hover:text-slate-900 transition-all duration-300 hover:translate-x-1 font-semibold text-sm" href="#">
<span class="material-symbols-outlined">account_balance_wallet</span> Settlements
            </a>
<a class="flex items-center gap-3 px-4 py-3 text-slate-500 hover:text-slate-900 transition-all duration-300 hover:translate-x-1 font-semibold text-sm" href="#">
<span class="material-symbols-outlined">insights</span> AI Analytics
            </a>
<a class="flex items-center gap-3 px-4 py-3 text-slate-500 hover:text-slate-900 transition-all duration-300 hover:translate-x-1 font-semibold text-sm" href="#">
<span class="material-symbols-outlined">settings</span> Settings
            </a>
</nav>
<div class="pt-6">
<button class="w-full py-4 bg-primary text-on-primary rounded-xl font-bold text-sm hover:bg-primary-container transition-colors flex items-center justify-center gap-2">
<span class="material-symbols-outlined text-sm">add_chart</span> New Report
            </button>
</div>
</aside>
<main class="ml-64 min-h-screen p-8">
<!-- TopNavBar -->
<header class="flex justify-between items-center mb-12">
<div>
<h2 class="text-3xl font-extrabold tracking-tight text-on-surface">Withdrawal Requests</h2>
<p class="text-on-surface-variant font-medium mt-1">Manage and verify restaurant payout requests</p>
</div>
<div class="flex items-center gap-6">
<div class="relative">
<span class="absolute left-4 top-1/2 -translate-y-1/2 material-symbols-outlined text-outline">search</span>
<input class="pl-12 pr-6 py-3 bg-surface-container-low border-none rounded-full w-72 focus:ring-2 focus:ring-primary/40 transition-all text-sm font-medium" placeholder="Search requests..." type="text"/>
</div>
<button class="p-3 bg-surface-container-low rounded-full text-on-surface-variant hover:bg-surface-container transition-colors relative">
<span class="material-symbols-outlined">notifications</span>
<span class="absolute top-2.5 right-2.5 w-2 h-2 bg-primary rounded-full border-2 border-surface"></span>
</button>
<div class="flex items-center gap-3 pl-4 border-l border-outline-variant/30">
<div class="text-right">
<p class="text-sm font-bold text-on-surface leading-none">Admin Profile</p>
<p class="text-[10px] text-primary font-bold uppercase tracking-tighter mt-1">Super Admin</p>
</div>
<img alt="Admin Avatar" class="w-10 h-10 rounded-full object-cover border-2 border-primary/10" data-alt="professional headshot of a smiling business executive with a clean minimalist background and soft studio lighting" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBoh3pdsBsDwqDqlJOL0m8m7PBK_Xr2AyQUsjtfMzbjaAU5Zomv9msgP-OkPqe4wmIZ94aiJ4eSvkAPoxYCq7EE2ACG3RMbor4ObX1DUjtplGoTe1PuTlqOxfm1o0RzTCrzW5L-rQI2gVQN5KuqwKufW7Mh2rHrNOLrySsz95iLWF1y0VK2OAkFhP2jTLZ9xFdv1w2IW_mvWRw4Xmo46A5dmAcOW9MXR8t2Wl1zT_oPjOM2w92Sw4kQiH4fey1pM1m7ozJIL9wV_XVp"/>
</div>
</div>
</header>
<div class="grid grid-cols-12 gap-8">
<!-- Main List Area -->
<div class="col-span-12 lg:col-span-8 space-y-6">
<div class="bg-surface-container-lowest rounded-xl p-2 ambient-shadow overflow-hidden">
<table class="w-full text-left">
<thead>
<tr class="text-on-surface-variant text-[11px] font-bold uppercase tracking-widest border-b border-surface-container">
<th class="px-6 py-5">Restaurant</th>
<th class="px-6 py-5">Wallet Balance</th>
<th class="px-6 py-5">Requested</th>
<th class="px-6 py-5">Status</th>
<th class="px-6 py-5 text-right">Action</th>
</tr>
</thead>
<tbody class="divide-y divide-surface-container">
<!-- Row 1 -->
<tr class="group hover:bg-surface-container-low transition-colors">
<td class="px-6 py-6">
<div class="flex items-center gap-3">
<div class="w-12 h-12 rounded-lg bg-surface-container overflow-hidden">
<img class="w-full h-full object-cover" data-alt="luxurious dim lit cocktail bar with velvet seating and golden accents premium restaurant interior" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAB8kxovU7XHGzKvYE-9Gfn0iwEoELDNLSWi0lCXkYd0RzA03B-GI13hx3mDE48cSEaBibs4xLXv1nKnzmqpgtJ1cgUIMG8oHzVZW614-8wht4ojl-x_OIaX37wu352QWNZtdIgedWvEvfClblTS_DPKgOHx3e_vUhGxJmb6UZos4KIb7kqr2L8ghbGXBd5Nvhz-6WGoMsyWFavSsH5iQw_MJtjUgvc3TGgECZtCM-UyWM0jrButEr4EZyArWjRaJOjrcultL2Zd-zJ"/>
</div>
<div>
<p class="font-bold text-on-surface">The Velvet Room</p>
<p class="text-xs text-on-surface-variant">Owner: Marcus Thorne</p>
</div>
</div>
</td>
<td class="px-6 py-6">
<p class="font-bold text-on-surface">$12,450.00</p>
<p class="text-[10px] text-primary font-bold">Verified Revenue</p>
</td>
<td class="px-6 py-6">
<p class="font-bold text-primary text-lg">$5,000.00</p>
<p class="text-[10px] text-on-surface-variant uppercase font-bold">Requested 2h ago</p>
</td>
<td class="px-6 py-6">
<span class="inline-flex items-center px-3 py-1 bg-tertiary-fixed text-on-tertiary-fixed text-[10px] font-black uppercase rounded-full">Pending</span>
</td>
<td class="px-6 py-6 text-right">
<button class="text-primary hover:bg-primary/5 p-2 rounded-full transition-transform active:scale-90">
<span class="material-symbols-outlined">chevron_right</span>
</button>
</td>
</tr>
<!-- Row 2 -->
<tr class="group hover:bg-surface-container-low transition-colors">
<td class="px-6 py-6">
<div class="flex items-center gap-3">
<div class="w-12 h-12 rounded-lg bg-surface-container overflow-hidden">
<img class="w-full h-full object-cover" data-alt="modern minimalist fine dining restaurant with white tablecloths and high ceilings bright airy atmosphere" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCel4ySdtXYnLSqNFFvIwicWgwCPnUwx6u2m2yshJUchPujWS1ACS7BfRbxTpC7N9sIkbA23bG35skntwZiLFYhqbKzArHeSlWRwdEZau19H7AewXw0Q2XDvhRtMBDj2K3RozeZmsn96ZVy_P-Amun3UAu3rKoHENV67E57Wkf9hcbnGulS5EF3FzYA6t-X69VNZTxIfr-Atfk1P2THZPQS3GZ9dGBnLNtGT-p-puf0a1oVq2bdxwRv4cIkYWYtwjmqvLsevyuq97_p"/>
</div>
<div>
<p class="font-bold text-on-surface">Lumière Bistro</p>
<p class="text-xs text-on-surface-variant">Owner: Elena Vance</p>
</div>
</div>
</td>
<td class="px-6 py-6">
<p class="font-bold text-on-surface">$8,210.50</p>
<p class="text-[10px] text-primary font-bold">Verified Revenue</p>
</td>
<td class="px-6 py-6">
<p class="font-bold text-primary text-lg">$8,000.00</p>
<p class="text-[10px] text-on-surface-variant uppercase font-bold">Requested 5h ago</p>
</td>
<td class="px-6 py-6">
<span class="inline-flex items-center px-3 py-1 bg-tertiary-fixed text-on-tertiary-fixed text-[10px] font-black uppercase rounded-full">Pending</span>
</td>
<td class="px-6 py-6 text-right">
<button class="text-primary hover:bg-primary/5 p-2 rounded-full transition-transform active:scale-90">
<span class="material-symbols-outlined">chevron_right</span>
</button>
</td>
</tr>
<!-- Row 3 -->
<tr class="group hover:bg-surface-container-low transition-colors">
<td class="px-6 py-6">
<div class="flex items-center gap-3">
<div class="w-12 h-12 rounded-lg bg-surface-container overflow-hidden">
<img class="w-full h-full object-cover" data-alt="vibrant urban Italian restaurant with open kitchen and exposed brick walls warm evening lighting" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBDNM0mL_A1q-mHk_gm7UwiAK8hc83Ac1wD0D7STFsNVeROLmtuiSGaOAWhwtivuYF1-py6nReFWww4YoM9VPqMozIKS715nd-e0LdO__pOfezuh5HM3iexW-fHsdzM0ybNqy3n566E-lF9wAZeIpArfm27B5NSV1SmVhdgjO6kY-lUGB0sdVQY2pACND6dPGm940UVRIL6qzRc4u-X1RTJGHvz3cYOHbT09SgovxW-4uClxNR8q8FckipJGd_1Mdl69KAvUIvuaP9F"/>
</div>
<div>
<p class="font-bold text-on-surface">Osteria Milano</p>
<p class="text-xs text-on-surface-variant">Owner: Pietro Rossi</p>
</div>
</div>
</td>
<td class="px-6 py-6">
<p class="font-bold text-on-surface">$42,900.00</p>
<p class="text-[10px] text-primary font-bold">Verified Revenue</p>
</td>
<td class="px-6 py-6">
<p class="font-bold text-primary text-lg">$15,000.00</p>
<p class="text-[10px] text-on-surface-variant uppercase font-bold">Requested 12h ago</p>
</td>
<td class="px-6 py-6">
<span class="inline-flex items-center px-3 py-1 bg-tertiary-fixed text-on-tertiary-fixed text-[10px] font-black uppercase rounded-full">Pending</span>
</td>
<td class="px-6 py-6 text-right">
<button class="text-primary hover:bg-primary/5 p-2 rounded-full transition-transform active:scale-90">
<span class="material-symbols-outlined">chevron_right</span>
</button>
</td>
</tr>
</tbody>
</table>
</div>
<!-- Pagination/Tonal Transition Footer -->
<div class="flex items-center justify-between px-4">
<p class="text-xs font-semibold text-on-surface-variant">Showing 3 of 24 active requests</p>
<div class="flex gap-2">
<button class="p-2 rounded-lg bg-surface-container-low text-on-surface hover:bg-surface-container-high transition-colors">
<span class="material-symbols-outlined">chevron_left</span>
</button>
<button class="p-2 rounded-lg bg-primary text-on-primary transition-colors">
<span class="material-symbols-outlined">chevron_right</span>
</button>
</div>
</div>
</div>
<!-- Risk/Review Sidebar -->
<div class="col-span-12 lg:col-span-4 space-y-8">
<!-- Detailed Inspection Panel -->
<div class="bg-surface-container-low rounded-xl p-8 ambient-shadow border border-outline-variant/20">
<div class="flex items-center gap-3 mb-6">
<span class="material-symbols-outlined text-primary">security</span>
<h3 class="font-bold text-lg">Request Review</h3>
</div>
<div class="space-y-6">
<div class="bg-surface-container-lowest p-5 rounded-lg border border-outline-variant/10">
<div class="flex justify-between items-start mb-4">
<div>
<p class="text-[10px] uppercase font-black text-on-surface-variant tracking-wider">Restaurant Status</p>
<p class="font-bold text-on-surface">Lumière Bistro</p>
</div>
<span class="px-2 py-1 bg-green-100 text-green-700 text-[9px] font-black uppercase rounded">Verified Elite</span>
</div>
<div class="grid grid-cols-2 gap-4">
<div>
<p class="text-[10px] text-on-surface-variant font-medium">Monthly Vol.</p>
<p class="font-bold text-sm">$45.2k</p>
</div>
<div>
<p class="text-[10px] text-on-surface-variant font-medium">Chargeback Rate</p>
<p class="font-bold text-sm text-green-600">0.02%</p>
</div>
</div>
</div>
<div>
<h4 class="text-xs font-black uppercase text-on-surface-variant tracking-widest mb-4">Recent Activity Flag</h4>
<div class="space-y-3">
<div class="flex gap-3 items-start">
<div class="w-1.5 h-1.5 rounded-full bg-primary mt-1.5"></div>
<p class="text-xs font-medium text-on-surface leading-relaxed">Requested amount (97% of balance) is significantly higher than 30-day average ($2.4k).</p>
</div>
<div class="flex gap-3 items-start">
<div class="w-1.5 h-1.5 rounded-full bg-green-500 mt-1.5"></div>
<p class="text-xs font-medium text-on-surface leading-relaxed">No pending disputes or user complaints in the last 72 hours.</p>
</div>
</div>
</div>
<div class="pt-4 space-y-3">
<button class="w-full py-4 bg-primary text-on-primary rounded-xl font-bold text-sm shadow-lg shadow-primary/20 transition-all hover:translate-y-[-2px] active:translate-y-0">
                                Approve Withdrawal
                            </button>
<button class="w-full py-4 bg-surface-container-lowest text-error border border-error/20 rounded-xl font-bold text-sm hover:bg-error/5 transition-all">
                                Reject Withdrawal
                            </button>
</div>
</div>
</div>
<!-- Secondary Info -->
<div class="bg-surface-container-low/50 rounded-xl p-6 border border-outline-variant/10">
<h4 class="font-bold text-sm mb-4">Withdrawal Summary</h4>
<div class="space-y-3">
<div class="flex justify-between text-xs">
<span class="text-on-surface-variant">Total Pending</span>
<span class="font-bold">$28,000.00</span>
</div>
<div class="flex justify-between text-xs">
<span class="text-on-surface-variant">Processed (Today)</span>
<span class="font-bold">$114,205.10</span>
</div>
<div class="h-px bg-outline-variant/30 my-2"></div>
<div class="flex justify-between text-xs">
<span class="text-on-surface-variant">System Liquidity</span>
<span class="font-bold text-primary">Healthy</span>
</div>
</div>
</div>
</div>
</div>
</main>
<!-- Modal Backdrop (Hidden by default, shown for confirmation) -->
<div class="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-on-surface/20 backdrop-blur-sm hidden">
<div class="bg-surface-container-lowest w-full max-w-md rounded-xl p-8 ambient-shadow relative overflow-hidden">
<div class="absolute top-0 right-0 p-6">
<button class="text-on-surface-variant hover:text-on-surface">
<span class="material-symbols-outlined">close</span>
</button>
</div>
<div class="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center text-primary mb-6">
<span class="material-symbols-outlined text-4xl" data-weight="fill" style="font-variation-settings: 'FILL' 1;">check_circle</span>
</div>
<h3 class="text-2xl font-extrabold text-on-surface mb-2">Confirm Approval</h3>
<p class="text-on-surface-variant font-medium mb-8">You are about to authorize a payout of <span class="text-primary font-bold">$8,000.00</span> to <span class="text-on-surface font-bold">Lumière Bistro</span>. This action is irreversible.</p>
<div class="flex flex-col gap-3">
<button class="w-full py-4 bg-primary text-on-primary rounded-xl font-bold transition-all hover:bg-primary-container">
                    Confirm Payout
                </button>
<button class="w-full py-4 bg-transparent text-on-surface-variant font-bold hover:text-on-surface transition-colors">
                    Cancel Review
                </button>
</div>
</div>
</div>
</body></html>