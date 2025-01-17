import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

export interface Brand {
  id: number;
  name: string;
  shortName?: string;
  icon?: string;
  image?: string;
  description: string;
}

export interface Product {
  id: number;
  name: string;
  brand: string;
  badge: string;
  image: string;
  description: string;
  rating: number;
  reviewCount: number;
  currentPrice: number;
  originalPrice: number;
  amazonLink: string;
  category: string;
  connectivity?: string;
  compatibility?: string;
  features?: string[];
}

export interface Statistic {
  value: string;
  label: string;
}

export interface Feature {
  icon: string;
  title: string;
  description: string;
}

export interface Testimonial {
  name: string;
  role: string;
  image: string;
  content: string;
  rating: number;
}

export interface FAQ {
  question: string;
  answer: string;
}

export interface ComparisonFeature {
  name: string;
  description: string;
  icon: string;
}

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private brands: Brand[] = [
    { 
      id: 1, 
      name: 'Xbox', 
      icon: 'bi bi-xbox', 
      image: 'assets/brandicons/xbox.png', 
      description: 'Official Xbox controllers featuring premium build quality, wireless connectivity, and perfect compatibility with Xbox consoles and Windows PC.'
    },
    { 
      id: 2, 
      name: 'PlayStation', 
      icon: 'bi bi-playstation', 
      shortName: 'PS', 
      image: 'assets/brandicons/playstation.png', 
      description: 'Innovative PlayStation controllers with advanced haptic feedback, adaptive triggers, and seamless integration with PS5 and PS4 consoles.'
    },
    { 
      id: 3, 
      name: 'Cosmic Byte', 
      shortName: 'CB', 
      image: 'assets/brandicons/cosmicbyte.png', 
      description: 'Budget-friendly gaming controllers offering great value with features like programmable buttons, RGB lighting, and multi-platform compatibility.'
    },
    { 
      id: 4, 
      name: 'Redgear', 
      shortName: 'RG', 
      image: 'assets/brandicons/redgearlogo.png', 
      description: 'Popular Indian gaming brand known for affordable controllers with illuminated buttons, vibration feedback, and durable construction.'
    },
    { 
      id: 5, 
      name: 'PowerA', 
      shortName: 'PA', 
      image: 'assets/brandicons/poweralogo.png', 
      description: 'Licensed gaming accessories manufacturer producing high-quality controllers with advanced gaming features at competitive prices.'
    },
    { 
      id: 6, 
      name: 'Logitech', 
      shortName: 'LG', 
      image: 'assets/brandicons/logitech.png', 
      description: 'Premium gaming peripherals brand offering controllers with precision controls, customizable buttons, and reliable wireless technology.'
    },
    { 
      id: 7, 
      name: 'Razer', 
      shortName: 'RZ', 
      image: 'assets/brandicons/razer.png', 
      description: 'High-end gaming brand known for controllers with mechanical buttons, customizable profiles, and premium build quality with Chroma RGB.'
    },
    { 
      id: 8, 
      name: 'EvoFox', 
      shortName: 'EF', 
      image: 'assets/brandicons/evofoxlogo.png', 
      description: 'Indian gaming brand offering feature-rich controllers with programmable buttons, adjustable vibration, and multi-platform support.'
    },
    { 
      id: 9, 
      name: 'SteelSeries', 
      shortName: 'SS', 
      image: 'assets/brandicons/steelSerieslogo.png', 
      description: 'Professional gaming peripherals manufacturer delivering controllers with customizable settings, precision controls, and cross-platform compatibility.'
    },
    { 
      id: 10, 
      name: 'Nintendo', 
      icon: 'bi bi-nintendo-switch', 
      shortName: 'NS', 
      image: 'assets/brandicons/nintendoLogo.png', 
      description: 'Innovative Nintendo controllers featuring unique designs, motion controls, HD rumble, and perfect integration with Nintendo Switch.'
    },
    { 
      id: 11, 
      name: 'PDP', 
      shortName: 'PDP', 
      image: 'assets/brandicons/pdplogo.png', 
      description: 'Performance Designed Products specializing in gaming controllers with custom features, RGB lighting, and officially licensed designs.'
    },
    { 
      id: 12, 
      name: '8BitDo', 
      shortName: '8BD', 
      image: 'assets/brandicons/8bitdologo.png', 
      description: 'Retro-inspired controllers with modern features, offering excellent build quality, customizable buttons, and broad platform compatibility.'
    }
  ];

  private statistics: Statistic[] = [
    { value: '200+', label: 'Controllers Compared' },
    { value: '20K+', label: 'Happy Gamers' },
    { value: '3.5+', label: 'Average Rating' }
  ];

  private features: Feature[] = [
    {
      icon: 'bi bi-patch-check',
      title: 'Expert Reviews',
      description: 'In-depth analysis across all price ranges and brands'
    },
    {
      icon: 'bi bi-graph-up',
      title: 'Price Tracking',
      description: 'Real-time price comparisons for best value'
    },
    {
      icon: 'bi bi-people',
      title: 'Community Tested',
      description: 'Real feedback from Indian gamers'
    },
    {
      icon: 'bi bi-shield-check',
      title: 'Trusted Links',
      description: 'Direct links to authorized Indian sellers'
    }
  ];

  private testimonials: Testimonial[] = [
    {
      name: 'Rahul Sharma',
      role: 'Pro Gamer',
      image: 'https://i.pravatar.cc/150?img=56',
      content: 'The controller comparisons helped me find the perfect controller for competitive gaming. Excellent recommendations!',
      rating: 5
    },
    {
      name: 'Priya Patel',
      role: 'Casual Gamer',
      image: 'https://i.pravatar.cc/150?img=49',
      content: 'As a casual gamer, I was confused about which controller to buy. This site made the decision process so much easier.',
      rating: 5
    },
    {
      name: 'Amit Kumar',
      role: 'Gaming Streamer',
      image: 'https://i.pravatar.cc/150?img=57',
      content: 'The detailed reviews and price comparisons are invaluable. My viewers always ask where I get my controller recommendations from.',
      rating: 4.5
    },
    {
      name: 'Neha Singh',
      role: 'ESports Player',
      image: 'https://i.pravatar.cc/150?img=45',
      content: 'The in-depth analysis of controller responsiveness and button layouts helped me choose the perfect controller for tournaments.',
      rating: 5
    },
    {
      name: 'Vikram Reddy',
      role: 'Game Developer',
      image: 'https://i.pravatar.cc/150?img=52',
      content: 'As a game developer, I appreciate the technical details in the reviews. It helps me understand how players interact with different controllers.',
      rating: 4.5
    },
    {
      name: 'Ananya Gupta',
      role: 'Gaming Enthusiast',
      image: 'https://i.pravatar.cc/150?img=41',
      content: 'The budget-friendly recommendations are spot on! Found a great controller that didn\'t break the bank.',
      rating: 5
    }
  ];

  private faqs: FAQ[] = [
    {
      question: 'Which gaming controller is best for PC gaming?',
      answer: 'For PC gaming, both Xbox and PlayStation controllers work well. Xbox controllers have native Windows support, while PS controllers might need additional software. We recommend the Xbox Series X controller for the best plug-and-play experience.'
    },
    {
      question: 'Are budget controllers worth buying?',
      answer: 'Yes, many budget controllers from brands like Cosmic Byte and Redgear offer great value for casual gaming. While they might lack premium features, they provide good build quality and functionality at their price point.'
    },
    {
      question: 'How long do gaming controllers typically last?',
      answer: 'With proper care, a quality gaming controller can last 3-5 years. Premium controllers from Xbox and PlayStation typically have better durability than budget options.'
    },
    {
      question: 'Wireless vs Wired controllers - which is better?',
      answer: 'Both have their advantages. Wireless offers freedom of movement but requires battery management. Wired controllers have zero latency and no battery concerns but limit movement. Your choice should depend on your gaming setup and preferences.'
    }
  ];

  private comparisonFeatures: ComparisonFeature[] = [
    {
      name: 'Build Quality',
      description: 'We thoroughly assess the durability and material quality of each controller',
      icon: 'bi bi-tools'
    },
    {
      name: 'Button Response',
      description: 'Testing for input lag and button tactility across different games',
      icon: 'bi bi-lightning'
    },
    {
      name: 'Ergonomics',
      description: 'Evaluating comfort during extended gaming sessions',
      icon: 'bi bi-hand-thumbs-up'
    },
    {
      name: 'Value for Money',
      description: 'Comparing features and performance against price points',
      icon: 'bi bi-currency-rupee'
    }
  ];

  private products: Product[] = [
    // Xbox Controllers
    {
      id: 1,
      name: 'Xbox Wireless Controller',
      brand: 'Xbox',
      badge: 'Best Seller',
      image: 'assets/products/xboxWirelessController.png',
      description: 'Latest Xbox Series X|S controller with share button and USB-C',
      rating: 4.5,
      reviewCount: 514,
      currentPrice: 5990,
      originalPrice: 6590,
      amazonLink: 'https://www.amazon.in/Xbox-Wireless-Controller-Carbon-Black/dp/B0859XX6HC',
      category: 'Xbox Series',
      connectivity: 'Wireless (Bluetooth)',
      compatibility: 'Xbox Series X|S, Xbox One, Windows PC',
      features: [
        'Share button for capturing and sharing content',
        'USB-C port for charging',
        'Textured grip on triggers and bumpers',
        'Hybrid D-pad for precise control',
        'Up to 40 hours of battery life'
      ]
    },
    {
      id: 2,
      name: 'Xbox Elite Controller Series 2 - Core (White)',
      brand: 'Xbox',
      badge: 'Premium',
      image: 'assets/products/series2elite.png',
      description: 'Professional-grade controller with adjustable tension thumbsticks',
      rating: 4.6,
      reviewCount: 2800,
      currentPrice: 12990,
      originalPrice: 15999,
      amazonLink: 'https://www.amazon.in/Microsoft-Xbox-Elite-Wireless-Controller/dp/B0BHZ51YGT',
      category: 'Xbox Series',
      connectivity: 'Wireless (Bluetooth)',
      compatibility: 'Xbox Series X|S, Xbox One, Windows PC',
      features: [
        'Adjustable-tension thumbsticks',
        'Wrap-around rubberized grip',
        'Shorter hair trigger locks',
        'Custom button mapping',
        'Up to 40 hours of battery life',
        'Premium components and build quality'
      ]
    },

    // PlayStation Controllers
    {
      id: 3,
      name: 'PS5 DualSense Controller',
      brand: 'PlayStation',
      badge: 'New',
      image: 'assets/products/ps5dualsense.png',
      description: 'Next-gen controller with haptic feedback and adaptive triggers',
      rating: 4.4,
      reviewCount: 2035,
      currentPrice: 5979,
      originalPrice: 6390,
      amazonLink: 'https://www.amazon.in/PlayStation-DualSense-Wireless-Controller-White/dp/B098439Y2G',
      category: 'PlayStation',
      connectivity: 'Wireless (Bluetooth)',
      compatibility: 'PlayStation 5, Windows PC',
      features: [
        'Haptic feedback for immersive gaming',
        'Adaptive triggers with dynamic resistance',
        'Built-in microphone and headset jack',
        'Create button for content sharing',
        'Touchpad for additional control options',
        'USB-C charging port'
      ]
    },
    {
      id: 4,
      name: 'PS4 DualShock 4',
      brand: 'PlayStation',
      badge: 'Classic',
      image: 'assets/products/ps4dualshock4.png',
      description: 'Playstation Sony Dualshock 4 Version 2 Controller (Eu) For Ps4, Green Camouflage',
      rating: 4.6,
      reviewCount: 15044,
      currentPrice: 5050,
      originalPrice: 6999,
      amazonLink: 'https://www.amazon.in/PlayStation-DualSense-Wireless-Controller-White/dp/B01MQTRR0D',
      category: 'PlayStation',
      connectivity: 'Wireless (Bluetooth)',
      compatibility: 'PlayStation 4, Windows PC',
      features: [
        'Clickable touchpad',
        'Built-in speaker',
        'Share button functionality',
        'Light bar for player identification',
        'Stereo headset jack',
        'Improved analog sticks and triggers'
      ]
    },

    // Cosmic Byte Controllers
    {
      id: 5,
      name: 'Cosmic Byte C3070W',
      brand: 'Cosmic Byte',
      badge: 'Best Value',
      image: 'assets/products/cosmicbytec3070W.png',
      description: 'Cosmic Byte C3070W Nebula 2.4G Wireless Gamepad for PC supports Windows XP/7/8/10/11, Sensitive Triggers, Upgraded with USB C Port, Rubberized Texture (Black)',
      rating: 4.0,
      reviewCount: 8735,
      currentPrice: 1499,
      originalPrice: 1849,
      amazonLink: 'https://www.amazon.in/PlayStation-DualSense-Wireless-Controller-White/dp/B073382B91',
      category: 'Budget Wireless',
      connectivity: 'Wireless (2.4GHz)',
      compatibility: 'Windows PC',
      features: [
        'USB-C charging port',
        'Sensitive triggers',
        'Rubberized texture grip',
        'Dual vibration feedback',
        'Plug and play setup',
        'Low latency wireless connection'
      ]
    },
    {
      id: 6,
      name: 'Cosmic Byte ARES',
      brand: 'Cosmic Byte',
      badge: 'RGB',
      image: 'assets/products/cosmicbyteARES.png',
      description: 'Cosmic Byte ARES Wireless Controller for PC, Magnetic Triggers, Accurate Joysticks, Dual Vibration, Backit LED Buttons, USB Extension Cable (White)',
      rating: 4.2,
      reviewCount: 4137,
      currentPrice: 1649,
      originalPrice: 3299,
      amazonLink: 'https://www.amazon.in/PlayStation-DualSense-Wireless-Controller-White/dp/B0BYKBF8YG',
      category: 'Budget Wireless',
      connectivity: 'Wireless',
      compatibility: 'Windows PC',
      features: [
        'Magnetic triggers',
        'RGB LED backlit buttons',
        'Dual vibration motors',
        'High-precision joysticks',
        'USB extension cable included',
        'Ergonomic design'
      ]
    },

    // Redgear Controllers
    {
      id: 7,
      name: 'Redgear Pro Wireless',
      brand: 'Redgear',
      badge: 'Popular',
      image: 'assets/products/redgearprowireless.png',
      description: 'Redgear Pro Wireless Gamepad with 2.4GHz Wireless Technology, Integrated Dual Intensity Motor, Illuminated Keys for PC(Compatible with Windows 7/8/8.1/10 only)',
      rating: 4.2,
      reviewCount: 30179,
      currentPrice: 1699,
      originalPrice: 1799,
      amazonLink: 'https://www.amazon.in/PlayStation-DualSense-Wireless-Controller-White/dp/B0756CLQWL',
      category: 'Budget Wireless',
      connectivity: 'Wireless (2.4GHz)',
      compatibility: 'Windows PC',
      features: [
        'Dual intensity vibration',
        'Illuminated keys',
        'Low latency wireless',
        'Ergonomic design',
        'Long battery life',
        'Plug and play setup'
      ]
    },
    {
      id: 8,
      name: 'Redgear MS-150',
      brand: 'Redgear',
      badge: 'Premium Budget',
      image: 'assets/products/RedgearMS150.png',
      description: 'Redgear MS-150 Wireless Gamepad with 2.4GHz Wireless Technology, 2 Digital triggers, 2 Analog Sticks, Integrated Dual Intensity Motor, Type-c Charging for PC(Punk Yellow)',
      rating: 3.9,
      reviewCount: 2400,
      currentPrice: 1299,
      originalPrice: 1599,
      amazonLink: 'https://www.amazon.in/PlayStation-DualSense-Wireless-Controller-White/dp/B097TRLKMT',
      category: 'Budget Wireless',
      connectivity: 'Wireless (2.4GHz)',
      compatibility: 'Windows PC',
      features: [
        'Type-C charging port',
        'Digital triggers',
        'Dual analog sticks',
        'Integrated dual vibration',
        'Low latency connection',
        'Stylish punk yellow design'
      ]
    },

    // PowerA Controllers
    {
      id: 9,
      name: 'PowerA Enhanced Wired Controller',
      brand: 'PowerA',
      badge: 'Licensed',
      image: 'assets/products/powerAEnhancedWired.png',
      description: 'Official Xbox licensed controller with advanced gaming buttons',
      rating: 3.9,
      reviewCount: 22620,
      currentPrice: 2543,
      originalPrice: 4999,
      amazonLink: 'https://www.amazon.in/PlayStation-DualSense-Wireless-Controller-White/dp/B09RMTDH99',
      category: 'Mid-Range',
      connectivity: 'Wired (USB)',
      compatibility: 'Xbox Series X|S, Xbox One, Windows PC',
      features: [
        'Advanced gaming buttons',
        'Officially licensed by Xbox',
        'Textured grip',
        'Detachable USB cable',
        'Dual rumble motors',
        'Mappable buttons'
      ]
    },
    {
      id: 10,
      name: 'PowerA FUSION Pro 4',
      brand: 'PowerA',
      badge: 'Pro Gaming',
      image: 'assets/products/powerAfusionpro4.png',
      description: 'Professional controller with swappable parts',
      rating: 4.5,
      reviewCount: 1500,
      currentPrice: 5999,
      originalPrice: 6999,
      amazonLink: 'https://www.amazon.in/PlayStation-DualSense-Wireless-Controller-White/dp/B0D8T82K5C',
      category: 'Premium',
      connectivity: 'Wired (USB)',
      compatibility: 'PlayStation 4, Windows PC',
      features: [
        'Swappable thumbsticks',
        'Programmable back buttons',
        'Custom trigger stops',
        'Premium carrying case included',
        'Anti-friction rings',
        'Pro gaming features'
      ]
    },

    // Logitech Controllers
    {
      id: 11,
      name: 'Logitech G F710',
      brand: 'Logitech',
      badge: 'Classic',
      image: 'assets/products/Logitech_G_F710.png',
      description: 'Logitech G F710 Wireless Gamepad, 2.4 GHz Wireless with USB Nano-Receiver, Controller Dual Vibration Feedback, 4 Switch D-Pad, PC/Steam/Windows/AndroidTV',
      rating: 4.3,
      reviewCount: 21421,
      currentPrice: 3995,
      originalPrice: 5295,
      amazonLink: 'https://www.amazon.in/PlayStation-DualSense-Wireless-Controller-White/dp/B00FZP2O18',
      category: 'Mid-Range',
      connectivity: 'Wireless (2.4GHz)',
      compatibility: 'Windows PC, Android TV',
      features: [
        'Dual vibration motors',
        'Programmable buttons',
        'Nano receiver for wireless',
        '4-switch D-pad',
        'XInput/DirectInput switch',
        'Long wireless range'
      ]
    },
    {
      id: 12,
      name: 'GameSir T4 Cyclone Pro',
      brand: 'GameSir',
      badge: 'Specialty',
      image: 'assets/products/gameSirT4CyclonePro.png',
      description: 'GameSir T4 Cyclone Pro Wireless Controller with Hall Effect Joystick & Trigger for Switch, PC, iOS, Android, 6-Axis Gyro Trigger Motor, 2 Rear Buttons, Continuous Fire, Macro Function',
      rating: 4.1,
      reviewCount: 670,
      currentPrice: 4806,
      originalPrice: 19999,
      amazonLink: 'https://www.amazon.in/PlayStation-DualSense-Wireless-Controller-White/dp/B0CDX449NJ',
      category: 'Premium',
      connectivity: 'Wireless (Bluetooth)',
      compatibility: 'Nintendo Switch, PC, iOS, Android',
      features: [
        'Hall effect joysticks',
        'Hall effect triggers',
        '6-axis gyro sensor',
        'Programmable rear buttons',
        'Macro function support',
        'Multi-platform compatibility'
      ]
    },

    // Razer Controllers
    {
      id: 13,
      name: 'Razer Wolverine V2',
      brand: 'Razer',
      badge: 'Premium',
      image: 'assets/products/razorWolverineV2.png',
      description: 'Razer Wolverine V2 Wired Gaming Controller for Xbox Series X: Remappable Front-Facing Buttons - Mecha-Tactile Action Buttons and D-Pad - Hair Trigger Mode with Trigger Stop-Switches - Black',
      rating: 4.2,
      reviewCount: 3201,
      currentPrice: 12038,
      originalPrice: 19591,
      amazonLink: 'https://www.amazon.in/PlayStation-DualSense-Wireless-Controller-White/dp/B08LRTTGM6',
      category: 'Premium',
      connectivity: 'Wired (USB)',
      compatibility: 'Xbox Series X|S, Xbox One, Windows PC',
      features: [
        'Mecha-tactile action buttons',
        'Hair trigger mode',
        'Remappable front buttons',
        'Ergonomic L-shaped hand grips',
        'Razer Chroma RGB',
        'Additional trigger stops'
      ]
    },
    {
      id: 14,
      name: 'Cosmic Byte Stellaris',
      brand: 'Cosmic Byte',
      badge: 'Wireless',
      image: 'assets/products/cosmicByteStellaris.png',
      description: 'Cosmic Byte Stellaris Controller, 3 Modes Wifi + Bluetooth + Wired for PC, iOS, Android, Hall Effect Magnetic Trigger and Joystick, Macros, 1000mAh Battery, RGB LED',
      rating: 4.1,
      reviewCount: 2722,
      currentPrice: 2599,
      originalPrice: 5499,
      amazonLink: 'https://www.amazon.in/PlayStation-DualSense-Wireless-Controller-White/dp/B0CXTJNJX2',
      category: 'Premium',
      connectivity: 'Wireless (WiFi/Bluetooth) + Wired',
      compatibility: 'PC, iOS, Android',
      features: [
        'Hall effect triggers',
        'Hall effect joysticks',
        'Triple connectivity modes',
        'RGB LED lighting',
        'Macro programming',
        '1000mAh battery capacity'
      ]
    },

    // EKSA Controllers
    {
      id: 15,
      name: 'Kreo',
      brand: 'Kreo',
      badge: 'New Entry',
      image: 'assets/products/kreo.png',
      description: 'Kreo (New & Improved Mirage Wireless RGB Gaming Controller For PC, Android, iOS, PS4, Programmable Buttons, Dual motor force, Haptic Feedback,USB C & B Zero-Lag Connectivity',
      rating: 4.0,
      reviewCount: 181,
      currentPrice: 2128,
      originalPrice: 3500,
      amazonLink: 'https://www.amazon.in/PlayStation-DualSense-Wireless-Controller-White/dp/B0CQYJXHRP',
      category: 'Budget Wired',
      connectivity: 'Wireless + USB-C',
      compatibility: 'PC, Android, iOS, PS4',
      features: [
        'Programmable buttons',
        'Dual motor force feedback',
        'RGB lighting effects',
        'Zero-lag connectivity',
        'USB-C charging port',
        'Multi-platform support'
      ]
    },
    {
      id: 16,
      name: 'EvoFox Elite X',
      brand: 'EvoFox',
      badge: 'Wireless',
      image: 'assets/products/evoFoxEliteX.png',
      description: 'EvoFox Elite X Wireless Gamepad for PC with 2 Programmable Macro Back Buttons, Adjustable Dual Vibration Motors,Turbo Mode,Analog Triggers, High Precision joysticks,Low Latency Plug and Play,Free USB Extender,Translucent Shell Controller for pc',
      rating: 4.0,
      reviewCount: 2039,
      currentPrice: 1539,
      originalPrice: 2299,
      amazonLink: 'https://www.amazon.in/PlayStation-DualSense-Wireless-Controller-White/dp/B0BXCMM828',
      category: 'Budget Wireless',
      connectivity: 'Wireless',
      compatibility: 'Windows PC',
      features: [
        'Programmable macro back buttons',
        'Adjustable vibration motors',
        'Turbo mode function',
        'Analog triggers',
        'High-precision joysticks',
        'Translucent shell design'
      ]
    },

    // New PlayStation Controllers
    {
      id: 18,
      name: 'PS5 DualSense Edge',
      brand: 'PlayStation',
      badge: 'Pro Gaming',
      image: 'assets/products/ps5dualsenseEdge.png',
      description: 'Pro controller with customizable buttons and stick modules, Changeable stick caps, remappable inputs and custom settings make your DualSense Edge wireless controller uniquely yours',
      rating: 4.3,
      reviewCount: 158,
      currentPrice: 17990,
      originalPrice: 24990,
      amazonLink: 'https://www.amazon.in/PlayStation-DualSense-Wireless-Controller-White/dp/B0BMPLHLZ9',
      category: 'Premium',
      connectivity: 'Wireless (Bluetooth)',
      compatibility: 'PlayStation 5, Windows PC',
      features: [
        'Replaceable stick modules',
        'Customizable back buttons',
        'Adjustable trigger stops',
        'Changeable stick caps',
        'Function buttons for profiles',
        'Carrying case included'
      ]
    },

    // New SteelSeries Controllers
    {
      id: 19,
      name: 'SteelSeries Stratus Duo',
      brand: 'SteelSeries',
      badge: 'Versatile',
      image: 'assets/products/steelSeriesStratusDuo.png',
      description: 'SteelSeries Stratus Duo Wireless Gaming Controller Made for Android, Windows, and VR Dual-Wireless Connectivity High-Performance Materials, Tabletop, Black',
      rating: 4.0,
      reviewCount: 1621,
      currentPrice: 6343,
      originalPrice: 10999,
      amazonLink: 'https://www.amazon.in/PlayStation-DualSense-Wireless-Controller-White/dp/B07MTWB122',
      category: 'Mid-Range',
      connectivity: 'Wireless (2.4GHz/Bluetooth)',
      compatibility: 'Windows PC, Android, VR',
      features: [
        'Dual wireless connectivity',
        'High-performance build',
        'Rechargeable battery',
        'Steam compatibility',
        'VR ready design',
        'Ergonomic layout'
      ]
    },
    {
      id: 20,
      name: 'SteelSeries Nimbus+',
      brand: 'SteelSeries',
      badge: 'Apple Certified',
      image: 'assets/products/steelSeriesNimbus+.png',
      description: 'SteelSeries Nimbus+ Bluetooth Mobile Gaming Controller with iPhone Mount, 50+ Hour Battery Life, Apple Licensed, Made for iOS, iPadOS, tvOS',
      rating: 4.0,
      reviewCount: 2596,
      currentPrice: 16929,
      originalPrice: 30135,
      amazonLink: 'https://www.amazon.in/PlayStation-DualSense-Wireless-Controller-White/dp/B088K6LPG2',
      category: 'Premium',
      connectivity: 'Wireless (Bluetooth)',
      compatibility: 'iOS, iPadOS, tvOS',
      features: [
        'MFi certified',
        'iPhone mount included',
        '50+ hour battery life',
        'Clickable L3/R3 joysticks',
        'Menu button support',
        'Ultra-responsive triggers'
      ]
    },

    // Nintendo Controllers
    {
      id: 21,
      name: 'Nintendo Switch Pro Controller',
      brand: 'Nintendo',
      badge: 'Official',
      image: 'assets/products/nintendoSwitchProController.png',
      description: 'Official Switch Pro controller with HD rumble and amiibo support',
      rating: 4.6,
      reviewCount: 20474,
      currentPrice: 7300,
      originalPrice: 9180,
      amazonLink: 'https://www.amazon.in/PlayStation-DualSense-Wireless-Controller-White/dp/B098439Y2G',
      category: 'Premium',
      connectivity: 'Wireless (Bluetooth)',
      compatibility: 'Nintendo Switch',
      features: [
        'HD rumble technology',
        'Amiibo support',
        'Motion controls',
        'Built-in gyroscope',
        'Long battery life',
        'Premium build quality'
      ]
    },
    {
      id: 22,
      name: 'Nintendo Joy-Con',
      brand: 'Nintendo',
      badge: 'Versatile',
      image: 'assets/products/Nintendo_Joy_Con_.png',
      description: 'Versatile Joy-Con pair with multiple play styles',
      rating: 4.6,
      reviewCount: 53425,
      currentPrice: 6499,
      originalPrice: 7999,
      amazonLink: 'https://www.amazon.in/PlayStation-DualSense-Wireless-Controller-White/dp/B01N6QJ58Y',
      category: 'Nintendo Switch',
      connectivity: 'Wireless (Bluetooth)',
      compatibility: 'Nintendo Switch',
      features: [
        'Split controller design',
        'HD rumble technology',
        'IR sensors',
        'Motion controls',
        'Multiple play styles',
        'Sharing functionality'
      ]
    },

    // PDP Controllers
    {
      id: 23,
      name: 'Tjpd Afapril',
      brand: 'TJPD',
      badge: 'Modular',
      image: 'assets/products/TjpdAfapril.png',
      description: 'Modular pro controller with swappable parts, Tjpd Ãƒapril 2022 Newly Updated Versionã Wireless Game Set With 3 Programmable Back Buttons And 1 Sensitivity Control Back Button (Black) - Desktop',
      rating: 4.7,
      reviewCount: 1410,
      currentPrice: 9562,
      originalPrice: 13864,
      amazonLink: 'https://www.amazon.in/PlayStation-DualSense-Wireless-Controller-White/dp/B09KY9H4JR',
      category: 'Premium',
      connectivity: 'Wireless',
      compatibility: 'Windows PC',
      features: [
        'Programmable back buttons',
        'Sensitivity control button',
        'Modular design',
        'Customizable parts',
        'High-precision sensors',
        'Ergonomic grip'
      ]
    },
    {
      id: 24,
      name: 'PDP Afterglow Deluxe+',
      brand: 'PDP',
      badge: 'LED',
      image: 'assets/products/PdpAfterglowDeluxe+.png',
      description: 'Illuminated controller with prismatic LED lighting, Afterglow Deluxe+ Audio Wired Ctrl (NSW - AU)',
      rating: 4.2,
      reviewCount: 3971,
      currentPrice: 8547,
      originalPrice: 12538,
      amazonLink: 'https://www.amazon.in/PlayStation-DualSense-Wireless-Controller-White/dp/B07V3SZY39',
      category: 'Mid-Range',
      connectivity: 'Wired (USB)',
      compatibility: 'Nintendo Switch',
      features: [
        'Prismatic LED lighting',
        'Built-in audio controls',
        'Programmable buttons',
        'Custom LED modes',
        'Transparent design',
        'Enhanced grip texture'
      ]
    },

    // 8BitDo Controllers
    {
      id: 25,
      name: '8BitDo Pro 2 Bluetooth gamepad',
      brand: '8BitDo',
      badge: 'Retro Modern',
      image: 'assets/products/8BitDoPro2.png',
      description: 'Advanced controller with classic design and modern features',
      rating: 4.6,
      reviewCount: 3060,
      currentPrice: 10002,
      originalPrice: 20000,
      amazonLink: 'https://www.amazon.in/PlayStation-DualSense-Wireless-Controller-White/dp/B08XY8H9D5',
      category: 'Mid-Range',
      connectivity: 'Wireless (Bluetooth)',
      compatibility: 'Switch, Windows PC, macOS, Android',
      features: [
        'Custom profile switching',
        'Back paddle buttons',
        'Ultimate software support',
        'Retro-inspired design',
        'Multi-platform support',
        'Rechargeable battery'
      ]
    },
    {
      id: 26,
      name: '8BitDo Ultimate C',
      brand: '8BitDo',
      badge: 'Premium',
      image: 'assets/products/8BitDoUltimateC.png',
      description: '8Bitdo Ultimate C Bluetooth Controller for Switch with 6-axis Motion Control and Rumble Vibration for Nintendo Switch',
      rating: 4.5,
      reviewCount: 493,
      currentPrice: 6409,
      originalPrice: 14367,
      amazonLink: 'https://www.amazon.in/PlayStation-DualSense-Wireless-Controller-White/dp/B0CLM5Q155',
      category: 'Premium',
      connectivity: 'Wireless (Bluetooth)',
      compatibility: 'Nintendo Switch',
      features: [
        '6-axis motion controls',
        'Rumble vibration',
        'Custom button mapping',
        'Enhanced D-pad',
        'Ultimate software support',
        'Charging dock included'
      ]
    },

    // Additional Cosmic Byte Controller
    {
      id: 27,
      name: 'Cosmic Byte Supernova',
      brand: 'Cosmic Byte',
      badge: 'Versatile',
      image: 'assets/products/cosmicByteSupernova.png',
      description: 'Cosmic Byte Blitz Wireless + Wired Controller for PC, Hall Effect Joystick & Triggers, 1000Hz Polling Rate, Adjustable Vibration, Turbo & Auto Turbo (White)',
      rating: 4.0,
      reviewCount: 172,
      currentPrice: 1699,
      originalPrice: 3999,
      amazonLink: 'https://www.amazon.in/PlayStation-DualSense-Wireless-Controller-White/dp/B0DGM1QL18',
      category: 'Mid-Range',
      connectivity: 'Wireless + Wired',
      compatibility: 'Windows PC',
      features: [
        'Hall effect sensors',
        '1000Hz polling rate',
        'Adjustable vibration',
        'Turbo functionality',
        'Dual connectivity mode',
        'Premium white finish'
      ]
    },

    // Additional Razer Controller
    {
      id: 28,
      name: 'Razer Wolverine V2 Chroma',
      brand: 'Razer',
      badge: 'RGB Pro',
      image: 'assets/products/razorWolverineV2Chroma.png',
      description: 'Pro controller with Chroma RGB and extra buttons',
      rating: 4.7,
      reviewCount: 890,
      currentPrice: 14999,
      originalPrice: 16999,
      amazonLink: 'https://www.amazon.in/PlayStation-DualSense-Wireless-Controller-White/dp/B098439Y2G',
      category: 'Premium',
      connectivity: 'Wired (USB)',
      compatibility: 'Xbox Series X|S, Xbox One, Windows PC',
      features: [
        'Razer Chroma RGB',
        'Additional multifunction buttons',
        'Hair trigger mode',
        'Interchangeable thumbsticks',
        'Ergonomic design',
        'Mecha-tactile buttons'
      ]
    },

    // New Xbox Controllers
    {
      id: 17,
      name: 'Microsoft Xbox Wireless Controller Electric Volt',
      brand: 'Xbox',
      badge: 'Special Edition',
      image: 'assets/products/xboxelectricvolt.png',
      description: 'Color-shifting finish with textured grip and share button',
      rating: 4.4,
      reviewCount: 4380,
      currentPrice: 5990,
      originalPrice: 6590,
      amazonLink: 'https://www.amazon.in/PlayStation-DualSense-Wireless-Controller-White/dp/B093HDBP7W',
      category: 'Xbox Series',
      connectivity: 'Wireless (Bluetooth)',
      compatibility: 'Xbox Series X|S, Xbox One, Windows PC',
      features: [
        'Electric Volt color finish',
        'Textured grip surface',
        'Share button',
        'Custom button mapping',
        'Bluetooth connectivity',
        'USB-C port'
      ]
    }
  ];

  private categoryDescriptions: { [key: string]: string } = {
    'premium': 'High-end controllers with advanced features',
    'budget': 'Quality controllers under ₹2,000',
    'wireless': 'Freedom of movement without cables',
    'pc': 'Controllers optimized for PC gaming',
    'ps4': 'Controllers for PlayStation 4',
    'ps5': 'Controllers for PlayStation 5',
    'xbox': 'Controllers for Xbox consoles',
    'mobile': 'Controllers for mobile gaming'
  };

  private categoryIcons: { [key: string]: string } = {
    'premium': 'bi bi-star',
    'budget': 'bi bi-piggy-bank',
    'wireless': 'bi bi-wifi',
    'pc': 'bi bi-pc-display',
    'ps4': 'bi bi-playstation',
    'ps5': 'bi bi-playstation',
    'xbox': 'bi bi-xbox',
    'mobile': 'bi bi-phone'
  };

  constructor() { }

  // Brand Methods
  getBrands(): Observable<Brand[]> {
    return of(this.brands);
  }

  getBrandById(id: number): Observable<Brand | undefined> {
    return of(this.brands.find(brand => brand.id === id));
  }

  // Statistics Methods
  getStatistics(): Observable<Statistic[]> {
    return of(this.statistics);
  }

  // Feature Methods
  getFeatures(): Observable<Feature[]> {
    return of(this.features);
  }

  // Product Methods
  getAllProducts(): Observable<Product[]> {
    return of(this.products);
  }

  getProductById(id: number): Observable<Product | undefined> {
    return of(this.products.find(product => product.id === id));
  }

  getProductsByCategory(category: string): Observable<Product[]> {
    return of(this.products.filter(product => product.category === category));
  }

  getProductsByBrand(brand: string): Observable<Product[]> {
    return of(this.products.filter(product => product.brand === brand));
  }

  // Helper Methods
  getCategories(): Observable<string[]> {
    const categories = [...new Set(this.products.map(product => product.category))];
    return of(categories);
  }

  getBrandNames(): Observable<string[]> {
    const brandNames = [...new Set(this.products.map(product => product.brand))];
    return of(brandNames);
  }

  getTestimonials(): Observable<Testimonial[]> {
    return of(this.testimonials);
  }

  getFAQs(): Observable<FAQ[]> {
    return of(this.faqs);
  }

  getComparisonFeatures(): Observable<ComparisonFeature[]> {
    return of(this.comparisonFeatures);
  }

  formatCategoryName(category: string): string {
    return category.split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  }

  getCategoryDescription(category: string): string {
    return this.categoryDescriptions[category] || `Explore our ${this.formatCategoryName(category)} collection`;
  }

  getCategoryIcon(category: string): string {
    return this.categoryIcons[category] || 'bi bi-controller';
  }
} 