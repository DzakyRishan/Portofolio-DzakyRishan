export interface ProjectStat {
  label: string
  value: number
  /** Jumlah angka di belakang koma, misal 4 untuk 0.9103 */
  decimals?: number
  /** Tampilkan tanda "+" berwarna aksen setelah angka */
  plus?: boolean
  caption: string
}

export interface ProjectFeature {
  title: string
  body: string
  /** Opsional, contoh: '/images/projects/farmfresh/catalog.webp' */
  image?: string
  caption?: string
}

export interface ProjectImpact {
  /** Kata kerja manfaat di awal kalimat, ditebalkan (Streamlined, Improved, ...) */
  verb: string
  text: string
}

export interface StackGroup {
  group: string
  items: string[]
}

export interface Project {
  id: string
  index: string
  name: string
  /** Kalimat dampak yang tampil di kartu dan sebagai judul case study */
  headline: string
  /** Subjudul dari slide, misal 'Farm-to-Consumer E-Commerce Marketplace' */
  subtitle: string
  role: string
  /** Kalimat singkat tentang apa yang benar-benar kamu kerjakan */
  roleDetail: string
  tags: string[]
  /** 3-4 tech utama untuk chip di kartu */
  cardStack: string[]
  problem: string
  solution: string
  features: ProjectFeature[]
  stats: ProjectStat[]
  statsTitle: string
  impact: ProjectImpact[]
  keyLearning: string
  stack: StackGroup[]
  /** Warna aksen untuk cahaya di belakang mockup */
  accent: string
  /** Warna bar atas layar di mockup placeholder */
  tone: string
  /** Opsional, gambar cover (mockup perangkat), contoh '/images/projects/farmfresh/cover.webp' */
  cover?: string
  /** Opsional, galeri screenshot tambahan di halaman detail */
  gallery?: { image?: string; caption: string }[]
  github?: string
  liveDemo?: string
}

export const projects: Project[] = [
  {
    id: 'pawcation',
    index: '01',
    name: 'PawCation',
    headline: 'An all-in-one pet care platform with AI breed recognition',
    subtitle: 'AI-Integrated Pet Care Platform',
    role: 'Full-Stack Developer',
    roleDetail:
      'I built the React frontend, the Laravel REST API with token authentication, and the Flask AI service that serves the breed classifier and the Gemini-powered PawBot, then connected all three.',
    tags: ['Full-Stack', 'AI Integration', 'Pet Care'],
    cardStack: ['Laravel', 'React', 'Flask', 'PostgreSQL'],
    problem:
      'Pet owners juggle separate places for supplies, boarding, vet consultations and transport. Once a pet is boarded they cannot see how it is doing, and getting a quick answer about a worrying symptom means waiting for a vet.',
    solution:
      'PawCation brings shopping, pet hotel booking, consultation, pet taxi and live CCTV monitoring into one platform with separate dashboards for customers, admins and business owners, plus an AI assistant for breed recognition and first-aid guidance.',
    features: [
      {
        title: 'One place for every pet service',
        body: 'Customers shop for supplies, book a pet hotel stay, schedule a consultation or order a pet taxi from the same account, and every booking shows up in their own history.',
        image: '/images/projects/pawcation/home-customer.webp',
        caption: 'Home',
      },
      {
        title: 'PawBot, an assistant that looks at the photo',
        body: 'Upload a photo and a transfer-learned CNN (MobileNetV2) recognises the breed across 23 dog and cat classes. Describe a symptom and Google Gemini returns initial information and first-aid steps in Bahasa Indonesia.',
        image: '/images/projects/pawcation/pawbot.webp',
        caption: 'PawBot',
      },
      {
        title: 'Watching your pet while it is away',
        body: 'While a pet is boarded, its owner can open a live CCTV view of the room instead of waiting for an update from the staff.',
        caption: 'CCTV monitoring',
      },
    ],
    statsTitle: 'Project Scope',
    // TODO: kalau mau, tambahkan metrik model dari slide (0.9103 / 0.9813 / 0.9084)
    // dengan label yang sesuai (misal Accuracy), gunakan decimals: 4.
    stats: [
      { label: 'Breed classes', value: 23, caption: 'Dogs and cats recognised from a photo.' },
      { label: 'User roles', value: 3, caption: 'Customer, admin and business owner.' },
      { label: 'Services', value: 3, caption: 'React SPA, Laravel API and Flask AI.' },
      { label: 'Pet services', value: 5, caption: 'Shop, hotel, consult, taxi and CCTV.' },
    ],
    impact: [
      {
        verb: 'Streamlined',
        text: 'pet boarding, shopping, vet booking, and pet taxi through a centralized pet care platform.',
      },
      {
        verb: 'Improved',
        text: 'coordination between pet owners, admins, and business owners with role-based dashboards.',
      },
      {
        verb: 'Assisted',
        text: 'pet owners with AI-powered breed recognition and instant health guidance through PawBot.',
      },
      {
        verb: 'Enhanced',
        text: 'peace of mind for owners by letting them monitor their pets remotely via live CCTV.',
      },
    ],
    keyLearning:
      'PawCation taught me how to make three separate services behave like one product: a React SPA, a Laravel API secured with Sanctum tokens, and a Flask microservice for AI. Shipping the model showed me that machine learning is only as reproducible as its environment, since the classifier only loads on TensorFlow 2.10 with Keras 2. Depending on an external AI API also taught me to keep model names configurable, because a model can be retired after launch.',
    stack: [
      { group: 'Backend', items: ['Laravel API', 'Flask'] },
      { group: 'Frontend', items: ['React', 'Tailwind CSS'] },
      { group: 'Database', items: ['PostgreSQL'] },
      { group: 'AI Models', items: ['MobileNetV2 (TensorFlow)', 'Gemini API'] },
    ],
    accent: '#6d8bff',
    tone: '#4a63c9',
    cover: '/images/projects/pawcation/home-customer.webp',
    gallery: [
      { image: '/images/projects/pawcation/shop.webp', caption: 'Pet supermarket' },
      { image: '/images/projects/pawcation/hotel.webp', caption: 'Pet hotel booking' },
      { image: '/images/projects/pawcation/consult.webp', caption: 'Health consultation' },
      { image: '/images/projects/pawcation/admin.webp', caption: 'Admin dashboard' },
    ],
    github: 'https://github.com/DzakyRishan/PawCation-Fullstack',
  },
  {
    id: 'farmfresh',
    index: '02',
    name: 'FarmFresh',
    headline: 'Cutting out the middlemen between local farmers and consumers',
    subtitle: 'Farm-to-Consumer E-Commerce Marketplace',
    role: 'Backend & Database Developer',
    roleDetail:
      'I designed the MySQL schema and built the Spring Boot backend in a layered controller, service and repository architecture, including role-based access and BCrypt password hashing. The Thymeleaf frontend was built by a teammate.',
    tags: ['E-Commerce', 'Backend', 'Database Design'],
    cardStack: ['Spring Boot', 'MySQL', 'Thymeleaf'],
    problem:
      'Farmers sell through a long chain, from middlemen to markets, before their produce reaches consumers. Farmer margins stay small, consumer prices climb, and farmers have no control over the pricing or stock of their own produce.',
    solution:
      'FarmFresh cuts out the middlemen. Farmers register, manage their own products and stock, and sell directly. Consumers browse the catalog, search and filter, add to cart, check out, and track orders, all in one two-role web platform.',
    features: [
      {
        title: 'A catalog straight from the farm',
        body: 'Farmers list their own products with price, stock and photos. Consumers search and filter the catalog without anyone in between setting the price.',
        image: '/images/projects/farmfresh/catalog.webp',
        caption: 'Catalog',
      },
      {
        title: 'Orders both sides can follow',
        body: 'An order moves from cart to checkout to a status the farmer updates, until it is completed or cancelled, so the consumer always knows where it stands.',
        image: '/images/projects/farmfresh/orders.webp',
        caption: 'Order tracking',
      },
      {
        title: 'A storefront farmers run themselves',
        body: 'Each farmer has a dashboard to manage products, stock and incoming orders, with access separated from consumer accounts.',
        image: '/images/projects/farmfresh/farmer-dashboard.webp',
        caption: 'Farmer dashboard',
      },
    ],
    statsTitle: 'Project Scope',
    stats: [
      { label: 'User roles', value: 2, caption: 'Farmer and consumer on one platform.' },
      { label: 'Entity models', value: 6, caption: 'Relational schema designed in MySQL.' },
      { label: 'Controllers', value: 4, caption: 'Backed by 4 services and 5 repositories.' },
      { label: 'Catalog products', value: 25, caption: 'Seeded for a realistic demo.' },
    ],
    impact: [
      {
        verb: 'Streamlined',
        text: 'the farm-to-consumer supply chain by removing middlemen, giving farmers direct control over their own pricing and stock.',
      },
      {
        verb: 'Empowered',
        text: 'farmers to run their own storefront: list products, manage stock, and handle incoming orders without a third party.',
      },
      {
        verb: 'Simplified',
        text: 'the shopping experience for consumers with catalog search, cart, checkout, and order tracking in one place.',
      },
      {
        verb: 'Improved',
        text: 'account security for all users through BCrypt password hashing and role-based access.',
      },
    ],
    keyLearning:
      'FarmFresh taught me how to build a full layered MVC application in Spring Boot: Controller → Service → Repository → Entity. The hardest part was designing the relationships between entities (Order, OrderItem, Product) and keeping data integrity intact during checkout. I also learned the value of database constraints, such as a UNIQUE key to prevent duplicate products, and basic security like hashing passwords instead of storing them in plain text.',
    stack: [
      { group: 'Backend', items: ['Java 11', 'Spring Boot', 'Spring Security'] },
      { group: 'Frontend', items: ['Thymeleaf', 'HTML / CSS'] },
      { group: 'Database', items: ['MySQL'] },
      { group: 'Build', items: ['Maven'] },
    ],
    accent: '#6d8bff',
    tone: '#4fa063',
    cover: '/images/projects/farmfresh/home.webp',
    gallery: [
      { image: '/images/projects/farmfresh/product.webp', caption: 'Product detail' },
      { image: '/images/projects/farmfresh/cart.webp', caption: 'Cart' },
      { image: '/images/projects/farmfresh/farmer-orders.webp', caption: 'Orders for the farmer' },
    ],
    github: 'https://github.com/DzakyRishan/FarmFresh',
  },
  {
    id: 'campus-inventory',
    index: '03',
    name: 'Campus Inventory',
    headline: 'Campus equipment lending, with stock and fines enforced by the database',
    subtitle: 'Campus Inventory Borrowing System',
    // TODO: konfirmasi role ini sesuai yang kamu kerjakan
    role: 'Backend & Database Developer',
    roleDetail:
      'I designed the database with its stored procedures, triggers and views, built the Go REST API with JWT authentication and role-based access, and connected the React frontend to it.',
    tags: ['Database Design', 'Backend', 'Go'],
    cardStack: ['Go', 'MySQL', 'React'],
    problem:
      'Borrowing campus equipment is usually tracked by hand. Stock records drift away from what is actually on the shelf, overdue items are noticed late, and fines are calculated manually, so mistakes and disputes are common.',
    solution:
      'CampusINV gives students, staff and admins one system. Borrowers request several items in a single loan, staff approve or reject and process returns, and late fines are recorded automatically. The core rules live in the database itself, so no client can bypass them.',
    features: [
      {
        title: 'One request, several items',
        body: 'A loan uses a header and detail structure, so a student can borrow multiple items in one request and the full history stays together.',
        image: '/images/projects/campus-inventory/bookings.webp',
        caption: 'Bookings',
      },
      {
        title: 'Stock that cannot go negative',
        body: 'A trigger rejects any request that exceeds available stock, and the whole transaction rolls back, so the numbers on screen always match the shelf.',
        image: '/images/projects/campus-inventory/inventory.webp',
        caption: 'Equipment library',
      },
      {
        title: 'Fines without a calculator',
        body: 'When an item comes back late, a fine of Rp5,000 per day is created automatically. Staff can add damage or loss fines and mark them as paid.',
        image: '/images/projects/campus-inventory/penalties.webp',
        caption: 'Penalty control',
      },
    ],
    statsTitle: 'Database Design',
    stats: [
      { label: 'Tables', value: 11, caption: 'Header and detail tables for loans and returns.' },
      { label: 'Stored procedures', value: 9, caption: 'Borrowing, approval, returns and fines.' },
      { label: 'Triggers', value: 4, caption: 'Stock checks and stock updates.' },
      { label: 'Views', value: 4, caption: 'Active loans, unpaid fines and stock.' },
    ],
    impact: [
      {
        verb: 'Streamlined',
        text: 'borrowing for students by letting them request several items in one online loan.',
      },
      {
        verb: 'Simplified',
        text: 'approvals and returns for staff with one queue of pending requests and active loans.',
      },
      {
        verb: 'Improved',
        text: 'stock reliability for the campus by rejecting requests that exceed available items before they are recorded.',
      },
      {
        verb: 'Assisted',
        text: 'staff in enforcing borrowing rules with late fines calculated automatically on return.',
      },
    ],
    keyLearning:
      'Campus Inventory taught me where business rules belong. Putting stock checks and fine calculation into stored procedures and triggers kept the data correct no matter which client calls it, and left the API thin. Writing the backend in Go with plain SQL through database/sql, without an ORM, made me understand every query and transaction the application runs.',
    stack: [
      { group: 'Backend', items: ['Go', 'Gin', 'JWT & bcrypt'] },
      { group: 'Frontend', items: ['React', 'TypeScript', 'Tailwind CSS'] },
      { group: 'Database', items: ['MariaDB (MySQL)'] },
    ],
    accent: '#8b7bff',
    tone: '#4a63c9',
    cover: '/images/projects/campus-inventory/dashboard.webp',
    gallery: [
      { image: '/images/projects/campus-inventory/landing.webp', caption: 'Landing page' },
      { image: '/images/projects/campus-inventory/dashboard.webp', caption: 'Dashboard' },
    ],
    github: 'https://github.com/DzakyRishan/CampusINV',
  },
  {
    id: 'edja-corner',
    index: '04',
    name: 'Edja Corner',
    headline: 'A minimarket POS that keeps stock, orders and cashiers in sync',
    subtitle: 'Online Minimarket & POS System for a Family-Owned Store',
    role: 'Project Manager',
    roleDetail:
      'I led Edja Corner as Project Manager. I turned the store owner’s needs into requirements and user stories, split the work across the team, planned the timeline and tracked progress toward each deadline, and reviewed every feature against the requirements before it was accepted.',
    tags: ['POS', 'Project Management', 'Retail'],
    cardStack: ['Express', 'React', 'PostgreSQL'],
    problem:
      'Edja Corner is a neighborhood minimarket whose operations were all manual. Sales were recorded by hand, stock was counted by eye, and nobody knew a product was running out until the shelf was already empty. Customers could only shop in person, and the owner had no clear view of daily revenue or which products actually sold.',
    solution:
      'Edja Corner moves the store online with one web platform for three roles. Customers browse the catalog, add to cart and place orders. Cashiers handle in-store sales through a POS screen that updates stock automatically. The owner manages products, categories, suppliers and staff, and monitors sales through a dashboard and reports.',
    features: [
      {
        title: 'Shopping without coming to the store',
        body: 'Customers browse the catalog with real product photos, add items to a cart and place an order online.',
        image: '/images/projects/edja-corner/katalog.webp',
        caption: 'Catalog',
      },
      {
        title: 'A POS screen for the cashier',
        body: 'In-store sales go through a POS screen, and every sale reduces stock immediately, the same way an online order does.',
        image: '/images/projects/edja-corner/pos-stok.webp',
        caption: 'POS cashier',
      },
      {
        title: 'Numbers the owner can act on',
        body: 'The owner sees revenue, best-selling products and transaction reports in one dashboard, next to suppliers and staff management.',
        image: '/images/projects/edja-corner/owner.webp',
        caption: 'Owner dashboard',
      },
    ],
    statsTitle: 'Project Scope',
    stats: [
      { label: 'User roles', value: 3, caption: 'Owner, cashier and customer.' },
      { label: 'Sales channels', value: 2, caption: 'Online orders and in-store POS.' },
      { label: 'Catalog products', value: 15, caption: 'With real product photos.' },
    ],
    impact: [
      {
        verb: 'Streamlined',
        text: 'daily store operations for the owner by replacing handwritten sales notes with recorded POS transactions.',
      },
      {
        verb: 'Improved',
        text: 'stock accuracy for the staff by logging every sale, order and restock as a stock movement.',
      },
      {
        verb: 'Expanded',
        text: 'the store’s reach by letting customers browse the catalog and order online instead of only in person.',
      },
      {
        verb: 'Empowered',
        text: 'the owner to make decisions with revenue, best-seller and transaction reports in one dashboard.',
      },
    ],
    keyLearning:
      'Edja Corner taught me that most of a project manager’s work is making requirements unambiguous before anyone writes code. Stock is the clearest example: an online order and an in-store POS sale can both reduce the same product, so the team had to agree early that every change goes through a single stock movement log. Keeping three roles, two sales channels and one deadline aligned showed me how to prioritise scope and say no to features that would not make the release.',
    stack: [
      { group: 'Backend', items: ['Node.js', 'Express.js', 'JWT & bcrypt'] },
      { group: 'Frontend', items: ['React', 'Vite'] },
      { group: 'Database', items: ['PostgreSQL', 'Sequelize'] },
    ],
    accent: '#6d8bff',
    tone: '#c9873f',
    cover: '/images/projects/edja-corner/katalog.webp',
    gallery: [
      { image: '/images/projects/edja-corner/login.webp', caption: 'Login' },
      { image: '/images/projects/edja-corner/owner.webp', caption: 'Owner dashboard' },
      { image: '/images/projects/edja-corner/pos.webp', caption: 'POS dashboard' },
      { image: '/images/projects/edja-corner/pos-pesanan.webp', caption: 'POS online orders' },
      { image: '/images/projects/edja-corner/pos-barang-masuk.webp', caption: 'POS stock-in' },
    ],
    github: 'https://github.com/DzakyRishan/Edja-Corner',
  },
]

export function getProject(id: string | undefined) {
  return projects.find((project) => project.id === id)
}
