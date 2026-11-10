/* ==========================================================================
   Gut and Health Wellness — Domain Data
   3 Gut Health Workshops + 1 Yoga Workshop, Benefits & Home Care Products
   ========================================================================== */

window.AppData = {
  brand: {
    name: 'Gut and Health Wellness',
    shortName: 'Gut and Health Wellness',
    subtitle: 'Gut Health · Yoga · Pure Living',
    /* Replace with client WhatsApp number when live */
    whatsappNumber: '919000000000',
    whatsappDisplay: '+91 90000 00000',
    email: 'hello@gutandhealthwellness.com',
    address: 'Studio Address · City, State, India'
  },

  workshops: [
    {
      id: 'ws-gut-reset',
      title: '21-Day Gut Health & Digestive Reset Workshop',
      category: 'Gut Health Workshop',
      badge: 'Flagship Gut Program',
      duration: '21 Days · Live Guidance',
      mode: 'Online Live + Meal Guide',
      price: 1290,
      oldPrice: 1990,
      image: 'assets/hero-wellness.jpg',
      summary: 'Heal stubborn bloating, acidity, and sluggish afternoon fatigue by restoring your gut microbiome with water-rich living foods, proper meal timing, and natural digestive rhythms.',
      highlights: [
        '7-step daily gut healing routine (morning cleansing & light dinners)',
        'Food combining rules to stop fermentation & post-meal heaviness',
        'Weekly live check-ins on acidity, constipation & energy recovery',
        'Printable 21-day Indian whole-food meal planner included'
      ],
      batches: ['Morning Batch · 7:00 AM IST', 'Morning Batch · 8:00 AM IST', 'Evening Q&A Batch · 7:00 PM IST']
    },
    {
      id: 'ws-gut-cooking',
      title: 'Gut-Friendly Living Food & Clean Kitchen Workshop',
      category: 'Gut Health Workshop',
      badge: 'Weekend Cook-Along',
      duration: '3 Days · Live Kitchen',
      mode: 'Interactive Cook-Along',
      price: 890,
      oldPrice: 1390,
      image: 'assets/workshop-cooking.jpg',
      summary: 'Discover how to cook vibrant, gut-soothing Indian meals and fermented probiotic bowls without refined oil, white sugar, or heavy dairy—using spices and herbs that heal.',
      highlights: [
        '10 live gut-healing recipes: probiotic kanji, sprout bowls & soothing soups',
        'Anti-inflammatory herb & spice pairing for gentle digestion',
        'Smart pantry swaps for wholesome family lunches & snacks',
        'Downloadable illustrated recipe cards included'
      ],
      batches: ['Weekend Batch · Sat–Mon 5:00 PM IST', 'Morning Batch · Fri–Sun 10:00 AM IST']
    },
    {
      id: 'ws-gut-detox',
      title: 'Gut-Brain Harmony & Detox Fasting Workshop',
      category: 'Gut Health Workshop',
      badge: '7-Day Gentle Reset',
      duration: '7 Days · 45 mins/day',
      mode: 'Online Live + Detox Plan',
      price: 990,
      oldPrice: 1490,
      image: 'assets/mind-meditation.jpg',
      summary: 'Calm digestive stress and restore gut-lining balance with structured circadian fasting windows, soothing herbal infusions, and mindful chewing rituals.',
      highlights: [
        'Safe 14-hour overnight digestive rest protocol for working adults',
        'Soothing herbal teas & green elixirs to calm gut inflammation',
        'Mindful eating practices to break stress-triggered cravings',
        'Live facilitator guidance & Q&A support throughout the week'
      ],
      batches: ['Morning Batch · 7:30 AM IST', 'Evening Batch · 7:30 PM IST']
    },
    {
      id: 'ws-yoga-morning',
      title: 'Morning Hatha & Pranayama Yoga Workshop',
      category: 'Yoga Workshop',
      badge: 'Live Daily · 6:30 AM IST',
      duration: '14 Days · 60 mins/day',
      mode: 'Online Live + Recordings',
      price: 990,
      oldPrice: 1490,
      image: 'assets/workshop-vitality.jpg',
      summary: 'A structured sunrise yoga cohort focused on digestive-friendly twists, spinal alignment, Surya Namaskar progression, and calming Pranayama breathwork.',
      highlights: [
        'Posture-safe Hatha Yoga sequence & gentle twists that support digestion',
        'Guided Nadi Shodhana, Bhramari & Kapalbhati breathing foundations',
        '15-minute posture correction & live Q&A after class',
        '30-day session replay access so you never fall behind'
      ],
      batches: ['Morning Batch · 6:30 AM IST', 'Morning Batch · 7:45 AM IST', 'Weekend Intensive · 7:00 AM IST']
    }
  ],

  advantages: {
    gut: [
      {
        title: 'Lightness & Zero Bloating',
        desc: 'Proper food combining and living enzymes eliminate post-meal heaviness, gas, and stubborn acidity naturally.'
      },
      {
        title: 'Stronger Daily Immunity',
        desc: 'Over 70% of your immune cells reside in the gut lining—a balanced microbiome defends against seasonal illness.'
      },
      {
        title: 'Gut-Brain Mental Clarity',
        desc: 'A clean digestive tract produces balanced serotonin and neurotransmitter signals, lifting brain fog and mood.'
      },
      {
        title: 'Clear, Radiant Skin',
        desc: 'Reducing gut inflammation and processed sugar toxins reflects directly as calmer, clearer natural skin.'
      },
      {
        title: 'Steady Energy All Day',
        desc: 'Whole, fiber-rich plant meals prevent sharp blood-sugar crashes so afternoon sluggishness fades away.'
      },
      {
        title: 'Better Nutrient Absorption',
        desc: 'Healthy gut flora helps your body actually absorb iron, B-vitamins, and essential minerals from food.'
      }
    ],
    yoga: [
      {
        title: 'Spine & Posture Relief',
        desc: 'Decompresses stiff lower backs, rounded shoulders, and neck strain caused by long hours at desks or screens.'
      },
      {
        title: 'Nervous System & Stress Calm',
        desc: 'Slow diaphragmatic pranayama lowers cortisol levels, eases anxiety, and brings steady mental clarity.'
      },
      {
        title: 'Hormonal & Metabolic Harmony',
        desc: 'Targeted twists and mindful postures stimulate abdominal organs, supporting digestion and daily vitality.'
      },
      {
        title: 'Deep, Restorative Sleep',
        desc: 'Evening stretches and breathwork quiet mental chatter so you fall asleep faster and wake refreshed.'
      },
      {
        title: 'Joint Mobility & Flexibility',
        desc: 'Lubricates hips, knees, and wrists sustainably without high-impact wear or joint strain.'
      },
      {
        title: 'Heart & Breath Efficiency',
        desc: 'Improves lung capacity, healthy circulation, and calm focus under busy daily pressures.'
      }
    ]
  },

  products: [
    {
      id: 'prod-floor-cleaner',
      group: 'Home Care',
      name: 'Floor Cleaner',
      subtitle: 'Lemon Bio-Enzyme Floor Cleaner',
      category: 'Floor Care',
      size: '750 ml',
      price: 210,
      oldPrice: 250,
      badge: 'Baby & Pet Safe',
      image: 'assets/floor-cleaner.jpg',
      description: 'Cleans, disinfects, and leaves floors shining naturally without toxic SLS, SLES, ammonia, or harsh synthetic fragrances.',
      details: 'Fermented Lemon Bio-Enzyme extract, Soapnut (Reetha) extract, Purified Aqua & Citrus Essential Oils. Mix 15–20 ml in half a bucket of water.'
    },
    {
      id: 'prod-laundry-liquid',
      group: 'Home Care',
      name: 'Laundry Liquid',
      subtitle: 'Plant-Based Bio-Enzyme Laundry Liquid',
      category: 'Laundry Care',
      size: '750 ml',
      price: 210,
      oldPrice: 250,
      badge: 'SLS / SLES Free',
      image: 'assets/laundry-liquid.jpg',
      description: 'Powered by active citrus bio-enzymes and coconut bio-surfactants—tough on stains while gentle on sensitive skin and fabrics.',
      details: 'Citrus Bio-Enzyme active extract, Soapnut extract, Coconut Bio-surfactants & Eucalyptus/Lavender oils. Use 30 ml per machine load or 15 ml for hand wash.'
    },
    {
      id: 'prod-dishwash',
      group: 'Home Care',
      name: 'Dishwash Liquid',
      subtitle: 'Citrus Bio-Enzyme Dishwash Liquid',
      category: 'Kitchen Care',
      size: '750 ml',
      price: 210,
      oldPrice: 250,
      badge: 'No Toxic Residue',
      image: 'assets/dishwash-liquid.jpg',
      description: 'Cuts stubborn oil and grease on cookware, removes odors, and leaves plates sparkling clean with zero chemical residue left behind.',
      details: 'Lemon Bio-Enzymes, Soapnut extract, Tamarind & Aloe Vera skin protectant. Safe for baby bottles and everyday kitchen utensils.'
    },
    {
      id: 'prod-toilet-cleaner',
      group: 'Home Care',
      name: 'Toilet Cleaner',
      subtitle: 'Lemon & Neem Bio-Enzyme Toilet Cleaner',
      category: 'Bathroom Care',
      size: '750 ml',
      price: 210,
      oldPrice: 250,
      badge: 'Acid & Fume Free',
      image: 'assets/toilet-cleaner.jpg',
      description: 'Acid-free bio-enzymatic toilet bowl cleaner that dissolves hard-water stains and eliminates odor-causing bacteria naturally.',
      details: 'Concentrated Bio-Enzyme ferment, Organic Citrus Acids, Soapnut extract & Pure Neem Oil. Zero choking fumes and 100% septic safe.'
    },
    {
      id: 'prod-manjista-shirt',
      group: 'Natural Clothing',
      name: 'Manjista Dyed Shirt',
      subtitle: 'Hita Vastara · Pure Cotton Mandarin Shirt',
      category: 'Natural Clothing',
      size: 'Pure Cotton · S–XL',
      variants: ['Size S', 'Size M', 'Size L', 'Size XL'],
      price: 1200,
      oldPrice: 1490,
      badge: '100% Natural Dye',
      image: 'assets/manjista-shirt.jpg',
      fitContain: true,
      description: 'Pure cotton mandarin-collar shirt naturally dyed with Manjista (Rubia cordifolia) roots—chemical-free, breathable, and ultra skin-friendly.',
      details: '100% Natural Manjista Root Dye, Pure Breathable Cotton, Mandarin Collar with Wooden Button Placket, Fine Stitching & Eco-Friendly Finish.'
    },
    {
      id: 'prod-cotton-kerchief',
      group: 'Natural Clothing',
      name: 'Pure Cotton Kerchief',
      subtitle: 'Naturally Dyed Soft Pocket Kerchief',
      category: 'Natural Clothing',
      size: 'Pure Cotton · 1 Pc',
      variants: ['Manjista Rose', 'Natural Cream', 'Sage Green'],
      price: 80,
      oldPrice: 110,
      badge: 'Chemical Free',
      image: 'assets/kerchief.svg',
      description: 'Soft, breathable pure cotton kerchief dyed naturally with botanical roots and leaves—gentle on sensitive skin and durable for everyday use.',
      details: '100% Combed Pure Cotton, Plant-Based Natural Dye (zero synthetic azo dyes), Finely Hemmed Edges for comfortable daily carry.'
    }
  ],

  faqs: [
    {
      q: 'How does Gut Health or Yoga workshop registration via WhatsApp work?',
      a: 'Fill in your name, phone number, workshop selection, and preferred timing in our registration form and click "Register & Continue to WhatsApp". Your booking details open directly in WhatsApp for instant confirmation.'
    },
    {
      q: 'Are the Gut Health and Yoga workshops suitable for complete beginners?',
      a: 'Yes! Every cohort starts from gentle daily fundamentals with easy Indian home recipes and posture-safe yoga sequences suitable for all age groups.'
    },
    {
      q: 'Are the home cleaners and naturally dyed clothes truly chemical-free?',
      a: 'Yes! Our Floor Cleaner, Laundry Liquid, Dishwash, and Toilet Cleaner use plant bio-enzymes without SLS or acids, and our Manjista Dyed Shirt and Kerchiefs use 100% plant dyes on pure cotton.'
    },
    {
      q: 'How do customers order home care items or clothes from the website?',
      a: 'Select your size or color (for shirts and kerchiefs) and click WhatsApp on any card, or add multiple products to your Bag to send one combined order message directly to WhatsApp.'
    }
  ]
};
