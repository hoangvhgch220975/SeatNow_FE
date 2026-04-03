<!DOCTYPE html>

<html lang="en"><head>
<meta charset="utf-8"/>
<meta content="width=device-width, initial-scale=1.0" name="viewport"/>
<title>Le Jardin d'Or | The Culinary Curator</title>
<script src="https://cdn.tailwindcss.com?plugins=forms,container-queries"></script>
<link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&amp;display=swap" rel="stylesheet"/>
<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&amp;display=swap" rel="stylesheet"/>
<script id="tailwind-config">
        tailwind.config = {
          darkMode: "class",
          theme: {
            extend: {
              colors: {
                "on-primary-container": "#ede0ff",
                "surface-container-lowest": "#ffffff",
                "surface-tint": "#732ee4",
                "inverse-on-surface": "#f0f1f2",
                "inverse-primary": "#d2bbff",
                "surface-container-low": "#f3f4f5",
                "secondary": "#6e3aca",
                "primary-container": "#7c3aed",
                "on-tertiary-fixed": "#301400",
                "tertiary": "#7d3d00",
                "primary": "#630ed4",
                "outline-variant": "#ccc3d8",
                "on-tertiary-fixed-variant": "#713700",
                "on-secondary-fixed": "#250059",
                "on-surface-variant": "#4a4455",
                "surface-container-highest": "#e1e3e4",
                "on-tertiary-container": "#ffe0cd",
                "surface-dim": "#d9dadb",
                "secondary-fixed": "#ebddff",
                "on-tertiary": "#ffffff",
                "on-background": "#191c1d",
                "on-surface": "#191c1d",
                "surface-container-high": "#e7e8e9",
                "on-primary-fixed-variant": "#5a00c6",
                "on-primary-fixed": "#25005a",
                "surface-variant": "#e1e3e4",
                "primary-fixed-dim": "#d2bbff",
                "on-secondary": "#ffffff",
                "on-primary": "#ffffff",
                "error": "#ba1a1a",
                "outline": "#7b7487",
                "error-container": "#ffdad6",
                "tertiary-container": "#a15100",
                "tertiary-fixed-dim": "#ffb784",
                "tertiary-fixed": "#ffdcc6",
                "primary-fixed": "#eaddff",
                "on-secondary-container": "#fffbff",
                "inverse-surface": "#2e3132",
                "surface-container": "#edeeef",
                "background": "#f8f9fa",
                "secondary-container": "#8856e5",
                "secondary-fixed-dim": "#d3bbff",
                "on-error": "#ffffff",
                "surface-bright": "#f8f9fa",
                "surface": "#f8f9fa",
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
        .material-symbols-outlined {
            font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24;
        }
        .glass-nav {
            backdrop-filter: blur(12px);
            background-color: rgba(255, 255, 255, 0.7);
        }
        .ambient-shadow {
            box-shadow: 0 20px 40px -15px rgba(99, 14, 212, 0.04);
        }
        .hide-scrollbar::-webkit-scrollbar { display: none; }
        .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
    </style>
</head>
<body class="bg-surface text-on-surface selection:bg-primary-container selection:text-on-primary-container">
<!-- TopNavBar -->
<nav class="fixed top-0 w-full z-50 glass-nav border-b border-outline-variant/10">
<div class="flex justify-between items-center h-20 px-8 max-w-screen-2xl mx-auto">
<div class="text-2xl font-bold tracking-tighter text-zinc-900">The Culinary Curator</div>
<div class="hidden md:flex items-center gap-8 font-plus-jakarta text-sm font-medium tracking-tight">
<a class="text-zinc-600 hover:text-primary transition-all duration-300" href="#">Explore</a>
<a class="text-primary font-semibold border-b-2 border-primary" href="#">Collections</a>
<a class="text-zinc-600 hover:text-primary transition-all duration-300" href="#">Journal</a>
<a class="text-zinc-600 hover:text-primary transition-all duration-300" href="#"> concierge</a>
</div>
<div class="flex items-center gap-6">
<div class="relative hidden sm:block">
<span class="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant text-sm">search</span>
<input class="pl-10 pr-4 py-2 bg-surface-container-low border-none rounded-full text-sm focus:ring-1 focus:ring-primary/40 transition-all w-48" placeholder="Find a table..." type="text"/>
</div>
<button class="bg-primary text-on-primary px-6 py-2.5 rounded-full text-sm font-semibold hover:bg-primary-container transition-all active:scale-95 duration-200">Sign In</button>
</div>
</div>
</nav>
<main class="pt-20">
<!-- Hero Section -->
<section class="relative w-full h-[716px] overflow-hidden">
<img alt="Le Jardin d'Or Interior" class="w-full h-full object-cover" data-alt="Luxury french restaurant interior with golden lighting and garden views" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDda_t41ijXT23nj__wjunbzculqfoxHITMhiNkAK5wlMhm6Dz-gWL6rf1-bHszoTOzNpzO50vNLPXqRCrVtswc7aUy0Ox-xqWZCcb6gWd_HKzSdx6SE1-jRp7LaJPDnBAdUCHwUWi7iDvEOkCDvNV35EZp2BoK3YV34hoVrKbedOnSx1p3YQDXOdjLJmNbraa8X_rk_51F6z-9aAVJ6dZN3wN72eMyizr5r4RqXtGHGvda3zJ5Fj1q2_8Oqsxwa7tuJcPrPGir9YxC"/>
<div class="absolute inset-0 bg-gradient-to-t from-on-surface/80 via-transparent to-transparent"></div>
<div class="absolute bottom-0 left-0 w-full p-8 md:p-20">
<div class="max-w-7xl mx-auto flex flex-col md:flex-row md:items-end justify-between gap-8">
<div class="space-y-4">
<div class="flex items-center gap-3">
<span class="bg-primary-container text-on-primary-container px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest">Modern French</span>
<div class="flex items-center gap-1 text-yellow-400">
<span class="material-symbols-outlined text-sm" style="font-variation-settings: 'FILL' 1;">star</span>
<span class="text-white font-bold text-sm">4.9</span>
<span class="text-white/60 text-sm font-medium">(1200+ reviews)</span>
</div>
</div>
<h1 class="text-white text-5xl md:text-7xl font-bold tracking-tight">Le Jardin d'Or</h1>
<p class="text-white/80 text-lg flex items-center gap-2">
<span class="material-symbols-outlined text-primary-fixed">location_on</span>
                        8th Arrondissement, Paris • $$$$
                    </p>
</div>
<div class="flex gap-4">
<button class="bg-white text-on-surface px-8 py-4 rounded-full font-bold flex items-center gap-2 hover:bg-surface-container-low transition-all active:scale-95">
<span class="material-symbols-outlined">calendar_today</span>
                        Book Now
                    </button>
<button class="bg-white/10 backdrop-blur-md text-white border border-white/20 p-4 rounded-full hover:bg-white/20 transition-all active:scale-95">
<span class="material-symbols-outlined">favorite</span>
</button>
</div>
</div>
</div>
</section>
<!-- Masonry Photo Gallery -->
<section class="px-8 max-w-7xl mx-auto -mt-16 relative z-10 mb-20">
<div class="grid grid-cols-2 md:grid-cols-4 gap-4 h-[500px]">
<div class="col-span-2 row-span-2 rounded-xl overflow-hidden shadow-2xl">
<img alt="Signature Dish" class="w-full h-full object-cover hover:scale-105 transition-transform duration-700" data-alt="Plated gourmet french seafood appetizer" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBYyEtO-oNLdl4yvmceYTnCQT77VYdxkPNUQu2_ihE8L-6CGnOTJ2X6CbPkK06zcLW4gAdRIRexHqVfnpDHtOmisgjJp9gd19_id4yLCitySndUEZaszN_6p2_jyL_JR_LueOdcEBZhc7yNibEEyi9wN06I3iPrU5lW29GYNx45RABQ_oKETZTp-cWr8o96dK9Xp2cdaarh8qS0UTBo3TKyCd_BnsuPdX-jqlfqSAtPP6zveVGfBalmHRdo0d2AgGBy2a0bLKE1zgMP"/>
</div>
<div class="rounded-xl overflow-hidden shadow-2xl">
<img alt="Wine Selection" class="w-full h-full object-cover hover:scale-105 transition-transform duration-700" data-alt="Close up of high-end wine cellar and glass" src="https://lh3.googleusercontent.com/aida-public/AB6AXuD0529xIIVO01TtWyEiBD1urwYtYYAur7CJWbuFX297Hg98OZy10kXsSvZReJkQL4Xzqhrf58x8wCaGw9t3k7qRhcFvpBOQki0uSM9J8vhGvo0wkcsMALZlyV2_p-7Rud-NI30zO2piM5pBSHZAgmHfdBXIyAE5E9U6orYZ0VauAHbcKW3qZKYrPW2iZU23frYqawWL1ZJUCpJpqPIB2_KiZ-eKywCTASNl0TWiCACSMarxLXwfkC5Oj2YFexn--RlKcTeQMF2gSGpi"/>
</div>
<div class="rounded-xl overflow-hidden shadow-2xl">
<img alt="Garden View" class="w-full h-full object-cover hover:scale-105 transition-transform duration-700" data-alt="Outdoor dining terrace with lush greenery" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBWKbJkAGlKyIbWn8Q3ZkI45mvZ1DGyxTFmHbx_E1yHtZZC7QKTEGaG1zm1squgOg0zsvH8VcfoDdEw7llapWJbm-i6OXIhSbFXQyfVprzbEroRIhYZXtr6Xtd2N0wYTtsr2oZHCP-zSjsIV3aAR8g8EYtryjXKUOa7fyN6CQ1TaUi77oBlQLI73OyYrUVcc5VP-HY3NF_4luzJqP1rkMgoq4e_4BtRJwtjcYmPVmUTYL7w4bQrZ7zPpou7W7ArISo1Ti0NDzDM2i8m"/>
</div>
<div class="rounded-xl overflow-hidden shadow-2xl">
<img alt="Table Setting" class="w-full h-full object-cover hover:scale-105 transition-transform duration-700" data-alt="Elegant table setting with crystal glasses" src="https://lh3.googleusercontent.com/aida-public/AB6AXuC6ORo_KdU3_N9KgmGWMKwN3g2rX-S7-6PhL_noizekN6_Vd-Wd32MgqekTTfYaGvXVOArtDnb09iTtIHbt8pMMYpLPFAx3kIpmum8Xsc2NxPyACVpwbM07z69Rf8dfJgKvOq0hMcZeEoyqqxmndpp40TFmDQ6_FQbdNoPyIsFtCLx9IhOpKSHKN7Hl6oc64YF-ke9ZC_MdVrxWfMkDiu21RMNM_-JFiP_QhBdt3TIisYYpXIujYH-2qtDwRZs5YZOyVAg8ICkukGLD"/>
</div>
<div class="rounded-xl overflow-hidden shadow-2xl">
<img alt="Chef at work" class="w-full h-full object-cover hover:scale-105 transition-transform duration-700" data-alt="Professional chef plating a delicate dessert" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAl3HRPrP06adD2uowQ7YP3MEs2HekiSS0vV1HS66xhLV0lz7vNW25LJotix_-RVJ8Ep0SIOUCkUJRxfOCBvHPk2bTfPWfHwlED5Q3FpJMOlXxcRtThQ0jt0JFjCTJ4zPNMtgZlNgBgeYXhNUpCoD5c7OyCA005HVB8S9zmJN9h0XMTLU18hgZCTgjoWzIGwBSQF0B1qTXvnkML7E7dHI_WIMFTJ0R0MtZR0ovA9S--fxm51jS8sJyko9MmdbO2GMSMFpuW_G35P36i"/>
</div>
</div>
</section>
<!-- Main Layout -->
<div class="px-8 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16 mb-20">
<!-- Left Column -->
<div class="lg:col-span-8 space-y-16">
<!-- Description -->
<div class="space-y-6">
<h2 class="text-3xl font-bold tracking-tight text-on-surface">The Soul of the Garden</h2>
<p class="text-lg text-on-surface-variant leading-relaxed font-light">
                    Under the stewardship of Michelin-starred Executive Chef Julian Marcelle, Le Jardin d'Or offers a sensory journey through the French countryside without leaving Paris. Our garden-to-table philosophy isn't just a trend—it's a tribute to the terroir. Every morning, the finest seasonal botanicals are harvested from our private estate in Versailles, ensuring each dish hums with vibrant, unadulterated flavor.
                </p>
<button class="text-primary font-bold border-b-2 border-primary/20 hover:border-primary transition-all pb-1">Read more about our heritage</button>
</div>
<!-- Amenities -->
<div class="grid grid-cols-2 sm:grid-cols-4 gap-6 p-8 bg-surface-container-low rounded-xl">
<div class="flex flex-col items-center text-center gap-2">
<span class="material-symbols-outlined text-primary text-3xl">restaurant</span>
<span class="text-xs font-bold uppercase tracking-widest text-on-surface-variant">Fine Dining</span>
</div>
<div class="flex flex-col items-center text-center gap-2">
<span class="material-symbols-outlined text-primary text-3xl">deck</span>
<span class="text-xs font-bold uppercase tracking-widest text-on-surface-variant">Outdoor Seating</span>
</div>
<div class="flex flex-col items-center text-center gap-2">
<span class="material-symbols-outlined text-primary text-3xl">directions_car</span>
<span class="text-xs font-bold uppercase tracking-widest text-on-surface-variant">Valet Parking</span>
</div>
<div class="flex flex-col items-center text-center gap-2">
<span class="material-symbols-outlined text-primary text-3xl">meeting_room</span>
<span class="text-xs font-bold uppercase tracking-widest text-on-surface-variant">Private Rooms</span>
</div>
</div>
<!-- Menu Preview -->
<div class="space-y-8">
<div class="flex justify-between items-end">
<h2 class="text-3xl font-bold tracking-tight">Signature Offerings</h2>
<button class="text-primary font-bold hover:underline">View Full Menu</button>
</div>
<div class="grid grid-cols-1 md:grid-cols-2 gap-6">
<!-- Menu Item 1 -->
<div class="group bg-surface-container-lowest p-4 rounded-xl ambient-shadow transition-transform hover:-translate-y-1">
<img class="w-full h-48 object-cover rounded-lg mb-4" data-alt="Plate of truffle linguine with parmesan shavings" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDJVH0H6IYMELcjFobefF1rhnMTeTU1TBjZhk1896viPvKlhM0jDkhQ_Uf91DTJ2d7is-Oyb-IXWe-zFfGYcUig4qcVHQMIZjMtDX_UWvN7H_A4Zq4zh_82WOkYCgtVag-4iBAjTNckDZpJ0fdFu4GwCiH5MMgld-Mx6N4Di2PUxN31lY2WB0y1YWmNpRR2GbJZmjERfT1wNBQiuUBR3jZEKHKtHNNrxBAvrRH-9R7iPlg1qws0ZSfN8WcPmbmI2Q4ydD1WyUfDgY0w"/>
<div class="flex justify-between items-start mb-2">
<h3 class="font-bold text-lg">Truffle Linguine</h3>
<span class="text-primary font-bold">€42</span>
</div>
<p class="text-sm text-on-surface-variant">Hand-cut pasta, Perigord black truffle, aged Parmigiano-Reggiano.</p>
</div>
<!-- Menu Item 2 -->
<div class="group bg-surface-container-lowest p-4 rounded-xl ambient-shadow transition-transform hover:-translate-y-1">
<img class="w-full h-48 object-cover rounded-lg mb-4" data-alt="Wagyu A5 steak with balsamic glaze and herbs" src="https://lh3.googleusercontent.com/aida-public/AB6AXuArPqM0XSG5vcxyccw8k3akO0LLeNo42OiG74OMXfAlXIOh3yGApCZBG--s-BQ-g5_GxwDkcVEsBE2cfwHBPyLbiWSVB8MxXWh0_v_C2O-ECK3tox4Yz-CrEHsKabzv_ksPWhdmTpUd8iC7Fq_uuGvINqH0RhLmOU2t1H3uBUmvWG1KIi_WuGJnzkoug9-ZIAp7yEtFvxqoLP1k7c7F2YUR7FiyhnWvie8FNb3oBwqEo75AEDB-7uM1bqqgF_q_lasBLbKau5Yv1K-l"/>
<div class="flex justify-between items-start mb-2">
<h3 class="font-bold text-lg">Wagyu A5 Steak</h3>
<span class="text-primary font-bold">€115</span>
</div>
<p class="text-sm text-on-surface-variant">Miyazaki beef, charcoal-grilled, smoked bone marrow butter.</p>
</div>
<!-- Menu Item 3 -->
<div class="group bg-surface-container-lowest p-4 rounded-xl ambient-shadow transition-transform hover:-translate-y-1">
<img class="w-full h-48 object-cover rounded-lg mb-4" data-alt="Pan-seared scallops with cauliflower puree" src="https://lh3.googleusercontent.com/aida-public/AB6AXuD4Nxx91nYQ_3FKSq1PKxwb24TDpqD7YTKV8PIPI641RGugE3ftl0B9TCfbjU77tRlJS297AZRnlCiTDs8zsFnCsrXRnTL928CUny8EWhBJxYI2NT4smhWAGaYioTNORKi2V9uBsx5FXx522vJiYPIlTosZ0jJoZ6i9n6tCoIxCHBFRnqczgkSCtc-KGBbd7aZ7txn5msq8LbwBXpMv--jPRv_tUYd6sx2hse0HGYUzl68pGEoOKHcjGiqtO59-nfahqeWs4kOF9y-B"/>
<div class="flex justify-between items-start mb-2">
<h3 class="font-bold text-lg">Diver Scallops</h3>
<span class="text-primary font-bold">€38</span>
</div>
<p class="text-sm text-on-surface-variant">Pan-seared, cauliflower silk, lemon verbena emulsion.</p>
</div>
<!-- Menu Item 4 -->
<div class="group bg-surface-container-lowest p-4 rounded-xl ambient-shadow transition-transform hover:-translate-y-1">
<img class="w-full h-48 object-cover rounded-lg mb-4" data-alt="Modern chocolate soufflé with gold leaf" src="https://lh3.googleusercontent.com/aida-public/AB6AXuD-Lda6aMi9Kt3-EUy5TkJMtS1iUnprv0KjRpJVH4xYUnSDsBpCmqomUNTRLHmnz9T2iujUrgFWARl8s9Iq8vI2udIXhO3HDVLJ4fNw08m3VFq6-J5gZNLTFcHBoNenvOl3_0H1CqNCT2e8KDZFj7uwm8_VLtN3CLqSwPHJdUWhPpX_8sGbd4jxTSKYE2UN-EXJNmhbzQcrwcbex8GiQsU3nkk350niYIkhUrCa6u8u6RFXe_IDzuIHjmUL7WhyUGa_Qq5GHYTIkeAH"/>
<div class="flex justify-between items-start mb-2">
<h3 class="font-bold text-lg">Le Chocolat d'Or</h3>
<span class="text-primary font-bold">€24</span>
</div>
<p class="text-sm text-on-surface-variant">70% Valrhona soufflé, gold leaf, Madagascar vanilla bean.</p>
</div>
</div>
</div>
<!-- Reviews -->
<div class="space-y-10">
<div class="flex items-center gap-8 border-b border-outline-variant/20 pb-8">
<div class="text-center">
<div class="text-5xl font-extrabold text-on-surface">4.9</div>
<div class="flex text-yellow-400 mt-2">
<span class="material-symbols-outlined text-xs" style="font-variation-settings: 'FILL' 1;">star</span>
<span class="material-symbols-outlined text-xs" style="font-variation-settings: 'FILL' 1;">star</span>
<span class="material-symbols-outlined text-xs" style="font-variation-settings: 'FILL' 1;">star</span>
<span class="material-symbols-outlined text-xs" style="font-variation-settings: 'FILL' 1;">star</span>
<span class="material-symbols-outlined text-xs" style="font-variation-settings: 'FILL' 1;">star</span>
</div>
</div>
<div class="flex-1 space-y-2">
<div class="flex items-center gap-4">
<span class="text-xs font-bold w-4">5</span>
<div class="flex-1 h-2 bg-surface-container-highest rounded-full overflow-hidden">
<div class="w-[94%] h-full bg-primary"></div>
</div>
</div>
<div class="flex items-center gap-4">
<span class="text-xs font-bold w-4">4</span>
<div class="flex-1 h-2 bg-surface-container-highest rounded-full overflow-hidden">
<div class="w-[4%] h-full bg-primary"></div>
</div>
</div>
<div class="flex items-center gap-4 text-on-surface-variant">
<span class="text-xs font-bold w-4">3</span>
<div class="flex-1 h-2 bg-surface-container-highest rounded-full"></div>
</div>
</div>
</div>
<div class="space-y-8">
<div class="space-y-4">
<div class="flex items-center gap-4">
<div class="w-12 h-12 rounded-full bg-secondary-fixed flex items-center justify-center font-bold text-on-secondary-fixed">MB</div>
<div>
<h4 class="font-bold">Marc-Antoine B.</h4>
<p class="text-xs text-on-surface-variant">Reviewed 3 days ago</p>
</div>
</div>
<p class="text-on-surface-variant italic">"An unparalleled experience. The garden atmosphere creates a tranquility that is rare in the heart of Paris. The Wagyu was divine."</p>
</div>
<div class="space-y-4">
<div class="flex items-center gap-4">
<div class="w-12 h-12 rounded-full bg-tertiary-fixed flex items-center justify-center font-bold text-on-tertiary-fixed">ES</div>
<div>
<h4 class="font-bold">Elena S.</h4>
<p class="text-xs text-on-surface-variant">Reviewed 1 week ago</p>
</div>
</div>
<p class="text-on-surface-variant italic">"The service was impeccable—attentive but never intrusive. A true maître d' experience."</p>
</div>
</div>
</div>
<!-- Policies -->
<div class="p-8 border-2 border-primary/10 rounded-xl space-y-4">
<h3 class="font-bold flex items-center gap-2">
<span class="material-symbols-outlined text-primary">info</span>
                    Dining Policies
                </h3>
<ul class="text-sm text-on-surface-variant space-y-2">
<li>• 15-minute grace period for all reservations.</li>
<li>• Cancellation required 24 hours prior to avoid a fee.</li>
<li>• Dress Code: Business Casual / Smart Elegant.</li>
</ul>
</div>
</div>
<!-- Right Column (Sticky Booking) -->
<div class="lg:col-span-4">
<div class="sticky top-28 bg-surface-container-lowest rounded-xl p-10 ambient-shadow border border-outline-variant/10 text-center space-y-8">
<div class="space-y-3">
<h2 class="text-2xl font-bold text-zinc-900">Reserve Your Table</h2>
<p class="text-on-surface-variant font-light">Experience the finest modern French cuisine in an atmosphere of unparalleled elegance.</p>
</div>
<button class="w-full bg-[#7C3AED] text-white py-5 rounded-full font-bold text-lg hover:bg-opacity-90 transition-all shadow-xl shadow-primary/20 active:scale-[0.98]">
                    Book Now
                </button>
<div class="flex items-center justify-center gap-4 pt-4">
<div class="flex flex-col items-center">
<span class="text-2xl font-bold text-zinc-900">4.9</span>
<span class="text-[10px] uppercase tracking-widest text-on-surface-variant font-bold">Rating</span>
</div>
<div class="w-px h-8 bg-outline-variant/30"></div>
<div class="flex flex-col items-center">
<span class="text-2xl font-bold text-zinc-900">1.2k</span>
<span class="text-[10px] uppercase tracking-widest text-on-surface-variant font-bold">Reviews</span>
</div>
</div>
</div>
</div>
</div>
<!-- Similar Restaurants -->
<section class="bg-surface-container-low py-20">
<div class="px-8 max-w-7xl mx-auto">
<div class="flex justify-between items-end mb-12">
<div>
<span class="text-primary font-bold text-sm tracking-widest uppercase mb-2 block">Curation</span>
<h2 class="text-4xl font-extrabold tracking-tighter">You May Also Exquisite</h2>
</div>
<button class="text-primary font-bold flex items-center gap-1 group">
                    Explore all Paris 
                    <span class="material-symbols-outlined group-hover:translate-x-1 transition-transform">arrow_forward</span>
</button>
</div>
<div class="grid grid-cols-1 md:grid-cols-3 gap-8">
<!-- Card 1 -->
<div class="group bg-surface-container-lowest rounded-xl overflow-hidden ambient-shadow transition-all hover:scale-[1.02]">
<div class="h-64 relative">
<img class="w-full h-full object-cover" data-alt="Chic modern restaurant interior with purple lights" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCbvvXKncT029v-uk9BVoksemYD7hb7iiWT2CK_xcNleENyZH9PCQLrdwATABvISScQIlnqR2pzvHWbMCWkbKMCj11o61Wj-9Qlmic7l9TRLzbFgKzixC_vzddPrPHdR0sygO2Pnm75kNqyeQd9VT-7KtJ43FFi-nVdE3y3k93u7WBRm2ihONt2nVhOiNjBFGDFbpEkia-8cAzo51Xb6GTUKKm2XJSuvTJmXE-3e3PZNLmZAX_xe0AQBHGRmDBfpFGhyynZ8LNkzDx8"/>
<div class="absolute top-4 right-4 bg-white/90 backdrop-blur-sm p-2 rounded-full shadow-sm">
<span class="material-symbols-outlined text-primary text-sm">favorite</span>
</div>
</div>
<div class="p-6">
<div class="flex justify-between items-start mb-2">
<h3 class="font-bold text-xl">L'Ambroisie</h3>
<div class="flex items-center text-yellow-400">
<span class="material-symbols-outlined text-sm" style="font-variation-settings: 'FILL' 1;">star</span>
<span class="text-on-surface text-sm font-bold ml-1">4.8</span>
</div>
</div>
<p class="text-on-surface-variant text-sm mb-4">Place des Vosges, Paris • Classical French</p>
<button class="w-full py-3 border border-primary/20 rounded-full text-primary font-bold text-sm hover:bg-primary hover:text-white transition-colors">Book a Table</button>
</div>
</div>
<!-- Card 2 -->
<div class="group bg-surface-container-lowest rounded-xl overflow-hidden ambient-shadow transition-all hover:scale-[1.02]">
<div class="h-64 relative">
<img class="w-full h-full object-cover" data-alt="Warm cozy upscale restaurant dining room" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDi1QSvMZjh__Cc1ZLAw-oAqFNRKu2guw6F3pF5P6XPMIGqDFBvTShbwa5Vk_u7YA4feEUR7C-4ugeggQWG7zx4jdvBbZOHoTERqoLJFf4a0xwTeMseIKxglVj8roIw_2obxgTzR5h1YshC2yIZBjtUKkFuWLGIC2sP6J_RXnot_5JjH3FFYZ6UR-Mn4aCMc_zYq4Qykm3ALoP_7-uV_xtpiGWpx-xMUsCrpofVMReOMw1EoJS7olY8yz6MvEPxQcIuewh8p7y99wVJ"/>
<div class="absolute top-4 right-4 bg-white/90 backdrop-blur-sm p-2 rounded-full shadow-sm">
<span class="material-symbols-outlined text-primary text-sm">favorite</span>
</div>
</div>
<div class="p-6">
<div class="flex justify-between items-start mb-2">
<h3 class="font-bold text-xl">Septime</h3>
<div class="flex items-center text-yellow-400">
<span class="material-symbols-outlined text-sm" style="font-variation-settings: 'FILL' 1;">star</span>
<span class="text-on-surface text-sm font-bold ml-1">4.7</span>
</div>
</div>
<p class="text-on-surface-variant text-sm mb-4">11th Arr., Paris • Neo-Bistro</p>
<button class="w-full py-3 border border-primary/20 rounded-full text-primary font-bold text-sm hover:bg-primary hover:text-white transition-colors">Book a Table</button>
</div>
</div>
<!-- Card 3 -->
<div class="group bg-surface-container-lowest rounded-xl overflow-hidden ambient-shadow transition-all hover:scale-[1.02]">
<div class="h-64 relative">
<img class="w-full h-full object-cover" data-alt="Sophisticated fine dining plate and wine" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCdk3FqLoZawwU3QHkGZVJfKyfY5ZKNahDssbpxTGyuFlqP8Mi8GiGOvoVhd90B4AKDgZvOYVYaP2DKkXCqiDc9q2PuOHIBavQ2lWnaPdyD5TtnoJjKqeXhtE5kSx0eZVAHmcsBrftcX0TC0E5MYqeFWS76VBvl4R_qwPNDlz0O7i2gL77QpMMa8hBuCDomyOOilpzjCSaDxrKbiAWCoyDA4gGmGCuaAT7NrZ-2m-GGGF0zEURkG-wB8P4I89XZUA8Xs9keT7FMvovi"/>
<div class="absolute top-4 right-4 bg-white/90 backdrop-blur-sm p-2 rounded-full shadow-sm">
<span class="material-symbols-outlined text-primary text-sm">favorite</span>
</div>
</div>
<div class="p-6">
<div class="flex justify-between items-start mb-2">
<h3 class="font-bold text-xl">Le Meurice</h3>
<div class="flex items-center text-yellow-400">
<span class="material-symbols-outlined text-sm" style="font-variation-settings: 'FILL' 1;">star</span>
<span class="text-on-surface text-sm font-bold ml-1">4.9</span>
</div>
</div>
<p class="text-on-surface-variant text-sm mb-4">1st Arr., Paris • Haute Cuisine</p>
<button class="w-full py-3 border border-primary/20 rounded-full text-primary font-bold text-sm hover:bg-primary hover:text-white transition-colors">Book a Table</button>
</div>
</div>
</div>
</div>
</section>
</main>
<!-- Footer -->
<footer class="bg-zinc-50 dark:bg-zinc-900 w-full py-20 px-8 pt-20 border-t border-zinc-200 dark:border-zinc-800">
<div class="grid grid-cols-1 md:grid-cols-4 gap-12 max-w-7xl mx-auto">
<div class="col-span-1 md:col-span-1">
<div class="text-xl font-bold text-zinc-900 dark:text-zinc-50 mb-4">The Culinary Curator</div>
<p class="font-plus-jakarta text-body-lg text-zinc-500 dark:text-zinc-400 max-w-xs">
                Curating the world's most exceptional dining moments for the discerning palate.
            </p>
</div>
<div class="space-y-4">
<h4 class="font-bold text-zinc-900 dark:text-zinc-50">Discovery</h4>
<ul class="space-y-2 text-zinc-500 dark:text-zinc-400 font-medium">
<li><a class="hover:text-primary transition-colors" href="#">Explore Restaurants</a></li>
<li><a class="hover:text-primary transition-colors" href="#">Collections</a></li>
<li><a class="hover:text-primary transition-colors" href="#">Global Cities</a></li>
<li><a class="hover:text-primary transition-colors" href="#">Michelin Guides</a></li>
</ul>
</div>
<div class="space-y-4">
<h4 class="font-bold text-zinc-900 dark:text-zinc-50">Partners</h4>
<ul class="space-y-2 text-zinc-500 dark:text-zinc-400 font-medium">
<li><a class="hover:text-primary transition-colors" href="#">Partner With Us</a></li>
<li><a class="hover:text-primary transition-colors" href="#">Restaurant Portal</a></li>
<li><a class="hover:text-primary transition-colors" href="#">Press &amp; Media</a></li>
<li><a class="hover:text-primary transition-colors" href="#">Careers</a></li>
</ul>
</div>
<div class="space-y-4">
<h4 class="font-bold text-zinc-900 dark:text-zinc-50">Legal &amp; Values</h4>
<ul class="space-y-2 text-zinc-500 dark:text-zinc-400 font-medium">
<li><a class="hover:text-primary transition-colors" href="#">Privacy Policy</a></li>
<li><a class="hover:text-primary transition-colors" href="#">Terms of Service</a></li>
<li><a class="hover:text-primary transition-colors" href="#">Sustainability</a></li>
<li><a class="hover:text-primary transition-colors" href="#">Contact Us</a></li>
</ul>
</div>
</div>
<div class="max-w-7xl mx-auto pt-12 mt-12 border-t border-zinc-200 dark:border-zinc-800 flex flex-col md:flex-row justify-between items-center gap-6">
<p class="font-plus-jakarta text-body-lg text-zinc-500 dark:text-zinc-400 text-sm">
            © 2024 The Culinary Curator. An Editorial Dining Experience.
        </p>
<div class="flex gap-6">
<a class="text-zinc-400 hover:text-primary transition-colors" href="#"><span class="material-symbols-outlined">public</span></a>
<a class="text-zinc-400 hover:text-primary transition-colors" href="#"><span class="material-symbols-outlined">alternate_email</span></a>
<a class="text-zinc-400 hover:text-primary transition-colors" href="#"><span class="material-symbols-outlined">share</span></a>
</div>
</div>
</footer>
</body></html>