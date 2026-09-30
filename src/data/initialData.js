// Dữ liệu ban đầu cho VECO - Học Viện Nông Nghiệp Việt Nam

export const initialPricingCategories = [
  { id: 'tours', name: 'Gói Tour Trải Nghiệm Nông Nghiệp & Sinh Thái', icon: 'Compass', color: 'emerald' },
  { id: 'accommodations', name: 'Dịch Vụ Lưu Trú Sinh Thái', icon: 'Home', color: 'amber' },
  { id: 'dining', name: 'Ẩm Thực Nông Nghiệp & Tiệc BBQ', icon: 'Utensils', color: 'orange' },
  { id: 'workshops', name: 'Hoạt Động & Workshop Trải Nghiệm', icon: 'Sparkles', color: 'purple' },
  { id: 'services', name: 'Dịch Vụ & Thiết Bị Thuê Ngoài', icon: 'Layers', color: 'blue' },
];

export const initialPricingItems = [
  // Gói Tour Trải Nghiệm
  {
    id: 'pr-tour-01',
    category: 'tours',
    name: 'Tour Trải Nghiệm Nông Nghiệp Thực Nghiệm (Nửa Ngày)',
    code: 'TOUR-0.5D-AGRI',
    target: 'Gia đình, Trẻ em & Khách đoàn',
    price: 180000,
    unit: 'khách',
    minGuests: 10,
    duration: '04 giờ (Sáng hoặc Chiều)',
    description: 'Trồng rau hữu cơ trong nhà màng công nghệ cao, tham quan khu chăn nuôi cừu, dê, thỏ Học Viện, lội mương bắt cá truyền thống, thưởng thức khoai luộc mật ong.',
    features: ['Áo bà ba & nón lá mượn', 'Nước vối thảo mộc Học Viện', 'HDV chuyên đề nông nghiệp', 'Bảo hiểm'],
    status: 'active'
  },
  {
    id: 'pr-tour-02',
    category: 'tours',
    name: 'Tour Trọn Ngày: Một Ngày Làm Kỹ Sư Nông Nghiệp Xanh',
    code: 'TOUR-1D-ECO',
    target: 'Mọi lứa tuổi (Gia đình, Học sinh, Đoàn thể)',
    price: 320000,
    unit: 'khách',
    minGuests: 15,
    duration: '08:00 - 16:30',
    description: 'Trọn gói gồm: Trải nghiệm nông nghiệp công nghệ cao, thu hoạch dâu/cà chua, làm bánh dân gian, thi bắt cá dưới bùn, ăn trưa mâm cơm quê dinh dưỡng, nghỉ trưa nhà sàn, làm tranh lá cây.',
    features: ['Bao gồm 01 bữa trưa thực dưỡng 5 món', 'Nghỉ trưa nhà sàn tập thể có điều hòa/quạt mát', 'Quà nông sản mang về', 'Miễn phí người dẫn đoàn >30 khách'],
    status: 'active'
  },
  {
    id: 'pr-tour-03',
    category: 'tours',
    name: 'Tour 2N1Đ: Trải Nghiệm Sinh Tồn & Lửa Trại Nông Trại',
    code: 'TOUR-2D1N-SURVIVE',
    target: 'Đoàn công ty, Hội nhóm, Học sinh & Gia đình',
    price: 650000,
    unit: 'khách',
    minGuests: 15,
    duration: '2 ngày 1 đêm (Check-in 14:00 - Check-out 12:00)',
    description: 'Dựng lều sinh thái, lọc nước tự nhiên, định vị sao trời & la bàn, tiệc BBQ lửa trại, sinh hoạt văn nghệ giao lưu, trekking vườn thực vật Học Viện.',
    features: ['3 bữa ăn chính + 1 bữa sáng', 'Lưu trú lều glamping hoặc nhà sàn', 'Gói âm thanh lửa trại & khoai nướng', 'Nhân sự hỗ trợ 24/7'],
    status: 'active'
  },
  {
    id: 'pr-tour-04',
    category: 'tours',
    name: 'Gói Trải Nghiệm Gia Đình: Cuối Tuần Về Với Thiên Nhiên',
    code: 'TOUR-FAMILY-DAY',
    target: 'Hộ gia đình (Bố mẹ & các con)',
    price: 850000,
    unit: 'combo gia đình 4 người',
    minGuests: 1,
    duration: '01 ngày',
    description: 'Thu hoạch vườn quả sinh thái, câu cá thư giãn, chèo thuyền kayak trên hồ sen Học Viện, làm bánh/nặn gốm cùng con nhỏ.',
    features: ['Set ăn trưa gia đình nông sản sạch', '1 giỏ nông sản sạch tự thu hoạch', 'Miễn phí thuyền kayak 1 giờ'],
    status: 'active'
  },

  // Lưu Trú Sinh Thái
  {
    id: 'pr-acc-01',
    category: 'accommodations',
    name: 'Bungalow Gỗ Ven Suối (View Vườn Sinh Thái)',
    code: 'ACC-BUNGALOW',
    target: 'Gia đình nhỏ hoặc Cặp đôi (2-3 người)',
    price: 950000,
    unit: 'phòng/đêm',
    minGuests: 1,
    duration: 'Check-in 14:00 | Check-out 12:00',
    description: 'Bungalow gỗ thông tự nhiên, hiên uống trà view hồ sen, trang bị điều hòa 2 chiều, bồn tắm gỗ ngâm thảo dược Học Viện, ban công thoáng đãng.',
    features: ['Bao gồm ăn sáng tại nhà hàng', 'Trà thảo mộc & hoa quả tươi chào mừng', 'Wifi tốc độ cao', 'Xe đạp dạo quanh khuôn viên'],
    status: 'active'
  },
  {
    id: 'pr-acc-02',
    category: 'accommodations',
    name: 'Nhà Sàn Truyền Thống Hoa Ban (Tập Thể)',
    code: 'ACC-STILT-HOUSE',
    target: 'Đoàn khách đông / Doanh nghiệp / Nhóm (30 - 45 khách)',
    price: 3500000,
    unit: 'nguyên căn/đêm',
    minGuests: 15,
    duration: 'Check-in 13:30 | Check-out 11:30',
    description: 'Nhà sàn gỗ thoáng mát, sàn gỗ sạch bóng, chăn ga gối đệm thổ cẩm cao cấp, 6 phòng vệ sinh khép kín hiện đại, quạt công nghiệp mát rượi.',
    features: ['Đầy đủ chăn ga gối đệm riêng từng khách', 'Khu vệ sinh nóng lạnh riêng biệt nam/nữ', 'Sân sinh hoạt chung trước hiên', 'Trà thảo mộc phục vụ cả ngày'],
    status: 'active'
  },
  {
    id: 'pr-acc-03',
    category: 'accommodations',
    name: 'Khu Lều Glamping Trải Nghiệm Bohemian',
    code: 'ACC-GLAMPING',
    target: 'Gia đình / Nhóm bạn trẻ (2 - 4 người/lều)',
    price: 680000,
    unit: 'lều/đêm',
    minGuests: 1,
    duration: 'Check-in 15:00 | Check-out 11:00',
    description: 'Lều vải canvas chống nước phong cách Bohemian, đệm êm ái, quạt điều hòa hơi nước, đèn led trang trí lung linh giữa vườn bưởi sinh thái.',
    features: ['Set bàn ghế chill ngoài trời', 'Ăn sáng bánh mì & sữa chua nếp cẩm Học Viện', 'Khu nướng BBQ liền kề'],
    status: 'active'
  },
  {
    id: 'pr-acc-04',
    category: 'accommodations',
    name: 'Phòng Nghỉ Trưa Tập Thể Đoàn Đông',
    code: 'ACC-DAY-REST',
    target: 'Khách đi tour trải nghiệm trong ngày',
    price: 800000,
    unit: 'phòng/ca trưa (11:30 - 13:30)',
    minGuests: 20,
    duration: '2 tiếng nghỉ trưa',
    description: 'Phòng sinh hoạt chung có điều hòa mát mẻ, chiếu cỏ và quạt cho khách chợp mắt sau giờ ăn trưa trước khi vào hoạt động buổi chiều.',
    features: ['Điều hòa nhiệt độ mát mẻ', 'Chiếu cỏ sạch sẽ vô trùng', 'Nước uống tinh khiết'],
    status: 'active'
  },

  // Ẩm Thực Nông Trại
  {
    id: 'pr-din-01',
    category: 'dining',
    name: 'Suất Cơm Nông Trại Dinh Dưỡng (Trẻ Em)',
    code: 'MEAL-KIDS',
    target: 'Trẻ em dưới 12 tuổi',
    price: 65000,
    unit: 'suất',
    minGuests: 10,
    duration: 'Bữa trưa',
    description: 'Thực đơn 5 món: Cơm gạo sạch Học Viện, Gà đồi chiên xù sốt mật ong, Thịt nạc xào ngô ngọt, Trứng cuộn rau củ, Canh sườn rau ngót, Tráng miệng hoa quả tiêu chuẩn VietGAP.',
    features: ['100% nguyên liệu tươi từ nông trại Học Viện', 'Khay inox chia ngăn an toàn vệ sinh'],
    status: 'active'
  },
  {
    id: 'pr-din-02',
    category: 'dining',
    name: 'Mâm Cơm Quê Nông Sản Học Viện (6 Người Lớn)',
    code: 'MEAL-COUNTRYSIDE',
    target: 'Người lớn, Gia đình & Đoàn thể',
    price: 680000,
    unit: 'mâm (6 người)',
    minGuests: 1,
    duration: 'Trưa hoặc Tối',
    description: 'Gà đồi hấp lá chanh, Cá rô phi chiên giòn chấm mắm tỏi gừng, Thịt ba chỉ rang cháy cạnh, Rau rừng xào tỏi, Nộm hoa chuối tai heo, Canh cua đồng mồng tơi cà pháo.',
    features: ['Bao gồm cơm niêu và trà thảo dược', 'Nông sản an toàn do viện nghiên cứu phát triển'],
    status: 'active'
  },
  {
    id: 'pr-din-03',
    category: 'dining',
    name: 'Set Tiệc BBQ Nướng Lửa Trại',
    code: 'MEAL-BBQ-NIGHT',
    target: 'Khách lưu trú qua đêm / Đoàn teambuilding',
    price: 220000,
    unit: 'người',
    minGuests: 6,
    duration: '18:30 - 21:00',
    description: 'Thịt bò tảng sốt thảo mộc, Ba chỉ heo cuộn nấm kim châm, Cánh gà ướp mật ong, Xúc xích nướng than, Ngô nướng bơ, Khoai lang mật, Salad rau củ sốt chanh leo.',
    features: ['Bao gồm than hoa nướng, vỉ nướng, gia vị sốt đặc biệt', 'Phục vụ tại sân nướng / khu lửa trại'],
    status: 'active'
  },

  // Workshops & Bổ Trợ
  {
    id: 'pr-ws-01',
    category: 'workshops',
    name: 'Workshop: Làm Bánh Dân Gian (Bánh Trôi / Bánh Chay)',
    code: 'WS-CAKE',
    target: 'Mọi lứa tuổi',
    price: 45000,
    unit: 'người',
    minGuests: 10,
    duration: '45 phút',
    description: 'Nghệ nhân hướng dẫn nhào bột nếp, nặn bánh với đường phèn mật mía, luộc bánh và thưởng thức thành phẩm nóng hổi.',
    features: ['Đầy đủ nguyên liệu sạch, tạp dề, khay đựng', 'Mang bánh thành phẩm về làm quà'],
    status: 'active'
  },
  {
    id: 'pr-ws-02',
    category: 'workshops',
    name: 'Workshop: Tái Chế Xanh & Trồng Sen Đá Tự Chọn',
    code: 'WS-PLANT',
    target: 'Người lớn & Trẻ em từ 5 tuổi',
    price: 50000,
    unit: 'người',
    minGuests: 8,
    duration: '45 - 60 phút',
    description: 'Tận dụng chậu xơ dừa hoặc gáo dừa vẽ tranh trang trí, tự tay phối trộn đất xốp dinh dưỡng và trồng 1 cây sen đá mang về chăm sóc.',
    features: ['Chậu dừa mỹ nghệ, cây sen đá tươi khỏe, màu vẽ acrylic'],
    status: 'active'
  },
  {
    id: 'pr-ws-03',
    category: 'workshops',
    name: 'Workshop: Nghệ Thuật Nặn Gốm Vuốt Tay',
    code: 'WS-POTTERY',
    target: 'Người lớn & Trẻ em',
    price: 60000,
    unit: 'người',
    minGuests: 8,
    duration: '60 phút',
    description: 'Nghệ nhân hướng dẫn kỹ thuật xoay bàn xoay, vuốt tay tạo hình bát, lọ hoa, con giống từ đất sét tự nhiên.',
    features: ['Đất sét tự nhiên, hướng dẫn tận tình, hỗ trợ phơi khô'],
    status: 'active'
  },

  // Dịch vụ thuê ngoài & hỗ trợ
  {
    id: 'pr-srv-01',
    category: 'services',
    name: 'Gói Lửa Trại & Loa Kéo / Âm Thanh Acoustic',
    code: 'SRV-CAMPFIRE',
    target: 'Đoàn qua đêm / Gala',
    price: 850000,
    unit: 'gói/buổi tối',
    minGuests: 1,
    duration: '3 tiếng (19:00 - 22:00)',
    description: 'Củi lửa trại đốt ngoài trời, 02 micro không dây, loa kéo công suất lớn 600W, hỗ trợ châm lửa bùng cháy an toàn và 1 giỏ ngô khoai nướng.',
    features: ['Củi khô nỏ không cay mắt, nhân viên trực lửa'],
    status: 'active'
  },
  {
    id: 'pr-srv-02',
    category: 'services',
    name: 'Hướng Dẫn Viên Sinh Thái & Hoạt Náo Viên Chuyên Tuyến',
    code: 'SRV-GUIDE',
    target: 'Đoàn đông / Teambuilding',
    price: 500000,
    unit: 'HDV/ngày',
    minGuests: 1,
    duration: 'Cả ngày (08:00 - 17:00)',
    description: 'HDV Học Viện được đào tạo bài bản về sinh thái học, kỹ năng quản trò, chăm sóc và quản lý an toàn cho đoàn xuyên suốt chuyến đi.',
    features: ['Đầy đủ còi, dụng cụ trò chơi hoạt náo, loa đeo mini'],
    status: 'active'
  }
];

export const initialBookings = [
  {
    id: 'BK-2026-001',
    code: 'BK-VIN-01',
    customerName: 'Cô Nguyễn Thu Trang',
    customerType: 'school',
    organization: 'Trường Tiểu Học Vinschool Ocean Park (Khối 3)',
    phone: '0912 345 678',
    email: 'thutrang.vinschool@edu.vn',
    bookingDate: '2026-10-04',
    tourDate: '2026-10-12',
    duration: '1 ngày (08:00 - 16:30)',
    guestCounts: {
      adults: 20, // 8 giáo viên + 12 phụ huynh
      children: 110,
      total: 130
    },
    services: [
      { itemId: 'pr-tour-02', name: 'Tour Trọn Ngày: Nông Nghiệp Xanh', quantity: 130, price: 320000, total: 41600000 },
      { itemId: 'pr-acc-04', name: 'Phòng Nghỉ Trưa Đoàn Đông (3 phòng)', quantity: 3, price: 800000, total: 2400000 },
      { itemId: 'pr-srv-02', name: 'Hướng Dẫn Viên Bổ Sung (2 HDV)', quantity: 2, price: 500000, total: 1000000 }
    ],
    subtotal: 45000000,
    discountAmount: 2000000,
    discountNote: 'Ưu đãi trường học liên kết khối Vinschool >100 khách',
    totalAmount: 43000000,
    depositAmount: 20000000,
    paidAmount: 20000000,
    remainingAmount: 23000000,
    paymentStatus: 'partial',
    status: 'confirmed',
    assignedLeader: 'Thầy Hoàng Nam (Điều phối trưởng)',
    leadGuide: 'Lê Văn Bách',
    accommodationId: 'ACC-DAY-REST',
    notes: 'Có 3 khách ăn chay, chuẩn bị khay ăn riêng. Khu vực mương bắt cá yêu cầu nhân viên túc trực an toàn.',
    createdAt: '2026-09-28'
  },
  {
    id: 'BK-2026-002',
    code: 'BK-DTI-02',
    customerName: 'Thầy Trần Đình Long',
    customerType: 'school',
    organization: 'Trường THCS Đoàn Thị Điểm (Khối 7)',
    phone: '0983 555 789',
    email: 'long.td@doanthidiem.edu.vn',
    bookingDate: '2026-09-29',
    tourDate: '2026-10-18',
    duration: '2 ngày 1 đêm (18/10 - 19/10)',
    guestCounts: {
      adults: 10,
      children: 75,
      total: 85
    },
    services: [
      { itemId: 'pr-tour-03', name: 'Tour 2N1Đ: Kỹ Năng Sinh Tồn & Đêm Lửa Trại', quantity: 85, price: 650000, total: 55250000 },
      { itemId: 'pr-acc-02', name: 'Nhà Sàn Truyền Thống Hoa Ban (2 căn)', quantity: 2, price: 3500000, total: 7000000 },
      { itemId: 'pr-srv-01', name: 'Gói Lửa Trại & Âm Thanh Acoustic', quantity: 1, price: 850000, total: 850000 }
    ],
    subtotal: 63100000,
    discountAmount: 3100000,
    discountNote: 'Miễn phí tiền lưu trú cho 5 thầy cô phụ trách đoàn',
    totalAmount: 60000000,
    depositAmount: 30000000,
    paidAmount: 30000000,
    remainingAmount: 30000000,
    paymentStatus: 'partial',
    status: 'confirmed',
    assignedLeader: 'Thảo My (Chăm sóc khách hàng)',
    leadGuide: 'Trần Quang Hưng',
    accommodationId: 'ACC-STILT-HOUSE',
    notes: 'Đêm lửa trại cần chuẩn bị 100 bắp ngô và 8kg khoai mật nướng.',
    createdAt: '2026-09-29'
  },
  {
    id: 'BK-2026-003',
    code: 'BK-FAM-HUNG-03',
    customerName: 'Anh Nguyễn Văn Hưng',
    customerType: 'family',
    organization: 'Gia đình Bác sĩ Hưng',
    phone: '0904 123 999',
    email: 'dr.hungnguyen@gmail.com',
    bookingDate: '2026-09-30',
    tourDate: '2026-10-03',
    duration: '2 ngày 1 đêm (Thứ 7 - Chủ Nhật)',
    guestCounts: {
      adults: 2,
      children: 2,
      total: 4
    },
    services: [
      { itemId: 'pr-acc-01', name: 'Bungalow Gỗ Ven Suối (Phòng Hoa Sen)', quantity: 1, price: 950000, total: 950000 },
      { itemId: 'pr-tour-04', name: 'Gói Trải Nghiệm Gia Đình', quantity: 1, price: 850000, total: 850000 },
      { itemId: 'pr-din-03', name: 'Set Tiệc BBQ Nướng Lửa Trại (4 người)', quantity: 4, price: 220000, total: 880000 },
      { itemId: 'pr-ws-03', name: 'Workshop Nặn Gốm Vuốt Tay', quantity: 2, price: 60000, total: 120000 }
    ],
    subtotal: 2800000,
    discountAmount: 100000,
    discountNote: 'Khách hàng thân thiết',
    totalAmount: 2700000,
    depositAmount: 2700000,
    paidAmount: 2700000,
    remainingAmount: 0,
    paymentStatus: 'paid',
    status: 'confirmed',
    assignedLeader: 'Lễ Tân Quỳnh Như',
    leadGuide: 'Nguyễn Văn Minh',
    accommodationId: 'ACC-BUNGALOW',
    notes: 'Khách yêu cầu kê thêm 1 nệm phụ cho bé 7 tuổi. Đến nơi lúc 10h sáng gửi hành lý trước.',
    createdAt: '2026-09-30'
  },
  {
    id: 'BK-2026-004',
    code: 'BK-CP-GREENTOUR-04',
    customerName: 'Chị Phạm Mai Phương',
    customerType: 'company',
    organization: 'Công Ty Du Lịch Sinh Thái Tuổi Trẻ (GreenTravel)',
    phone: '0979 888 345',
    email: 'phuong.pm@greentravel.vn',
    bookingDate: '2026-09-25',
    tourDate: '2026-10-01',
    duration: '1 ngày (08:30 - 15:30)',
    guestCounts: {
      adults: 14,
      children: 40,
      total: 54
    },
    services: [
      { itemId: 'pr-tour-01', name: 'Tour Nông Nghiệp Thực Nghiệm', quantity: 54, price: 180000, total: 9720000 },
      { itemId: 'pr-din-01', name: 'Suất Cơm Nông Trại Trẻ Em', quantity: 40, price: 65000, total: 2600000 },
      { itemId: 'pr-din-02', name: 'Mâm Cơm Quê Người Lớn (2 mâm)', quantity: 2, price: 680000, total: 1360000 },
      { itemId: 'pr-ws-01', name: 'Workshop Làm Bánh Dân Gian', quantity: 40, price: 45000, total: 1800000 }
    ],
    subtotal: 15480000,
    discountAmount: 480000,
    discountNote: 'Đối tác lữ hành chiết khấu đại lý',
    totalAmount: 15000000,
    depositAmount: 8000000,
    paidAmount: 8000000,
    remainingAmount: 7000000,
    paymentStatus: 'partial',
    status: 'in_progress',
    assignedLeader: 'Trần Văn Hải (Điều hành tour)',
    leadGuide: 'Vũ Thị Lan',
    accommodationId: '',
    notes: 'Xe 45 chỗ đỗ tại bãi đỗ số 1. Chuẩn bị sẵn 50 đôi ủng và rổ hái rau lúc 08:45.',
    createdAt: '2026-09-25'
  },
  {
    id: 'BK-2026-005',
    code: 'BK-FAM-CLB-05',
    customerName: 'Anh Đỗ Tuấn Anh',
    customerType: 'family',
    organization: 'CLB Gia Đình Khám Phá Xanh',
    phone: '0936 112 233',
    email: 'tuananh.clb@gmail.com',
    bookingDate: '2026-09-30',
    tourDate: '2026-10-25',
    duration: '1 ngày (08:30 - 16:30)',
    guestCounts: {
      adults: 16,
      children: 20,
      total: 36
    },
    services: [
      { itemId: 'pr-tour-02', name: 'Tour Trọn Ngày: Nông Nghiệp Xanh', quantity: 36, price: 320000, total: 11520000 },
      { itemId: 'pr-ws-02', name: 'Workshop Trồng Sen Đá Tự Chọn', quantity: 20, price: 50000, total: 1000000 }
    ],
    subtotal: 12520000,
    discountAmount: 520000,
    discountNote: 'Hỗ trợ nhóm gia đình thân thiết',
    totalAmount: 12000000,
    depositAmount: 0,
    paidAmount: 0,
    remainingAmount: 12000000,
    paymentStatus: 'unpaid',
    status: 'pending',
    assignedLeader: 'Thảo My',
    leadGuide: 'Chưa phân công',
    accommodationId: '',
    notes: 'Khách xin giữ chỗ trong 2 ngày để chốt danh sách.',
    createdAt: '2026-09-30'
  }
];

export const initialSchedules = [
  {
    id: 'SCH-01',
    bookingId: 'BK-2026-004',
    title: 'Đoàn GreenTravel & Khách Trải Nghiệm (54 Khách)',
    date: '2026-10-01',
    startTime: '08:30',
    endTime: '15:30',
    location: 'Khu Trại Thực Nghiệm Học Viện & Nhà Hàng Hoa Sen',
    leader: 'Trần Văn Hải',
    guideCount: 3,
    status: 'in_progress',
    timeline: [
      { time: '08:30 - 09:00', title: 'Đón đoàn tại cổng Học Viện & phát nón lá, áo bà ba', pic: 'Vũ Thị Lan', note: 'Phát nước thảo mộc đón khách' },
      { time: '09:00 - 10:15', title: 'Khám phá vườn rau công nghệ cao & thu hoạch cà chua', pic: 'Nguyễn Văn Minh', note: 'Chia thành 3 nhóm nhỏ' },
      { time: '10:15 - 11:15', title: 'Hoạt động tát mương bắt cá lội ruộng', pic: 'Trần Văn Hải', note: 'Chuẩn bị nước ấm tắm lại cho khách' },
      { time: '11:30 - 13:00', title: 'Ăn trưa cơm quê nông sản sạch & nghỉ ngơi tại nhà sàn', pic: 'Tổ Bếp Hoa Sen', note: 'Thực đơn 5 món dinh dưỡng' },
      { time: '13:30 - 14:45', title: 'Workshop Nặn Bánh Dân Gian', pic: 'Nghệ nhân Bác Tám', note: 'Phát mỗi bàn 1 khay bột nếp màu tự nhiên' },
      { time: '15:00 - 15:30', title: 'Tổng kết trao chứng nhận "Chiến Binh Xanh" & tiễn đoàn', pic: 'Vũ Thị Lan', note: 'Chụp ảnh lưu niệm tại vườn hoa' }
    ]
  },
  {
    id: 'SCH-02',
    bookingId: 'BK-2026-003',
    title: 'Gia Đình Bác Sĩ Hưng Check-in Bungalow & Workshop Gốm',
    date: '2026-10-03',
    startTime: '10:00',
    endTime: '19:30',
    location: 'Bungalow Hoa Sen & Xưởng Gốm',
    leader: 'Lễ Tân Quỳnh Như',
    guideCount: 1,
    status: 'upcoming',
    timeline: [
      { time: '10:00 - 11:30', title: 'Đón khách, gửi hành lý & chèo kayak ngắm hồ', pic: 'Nguyễn Văn Minh', note: 'Áo phao an toàn cho trẻ em' },
      { time: '11:45 - 13:00', title: 'Ăn trưa mâm cơm quê thảo dược Học Viện', pic: 'Bếp V-Eco', note: 'Mâm cơm gà đồi lá chanh' },
      { time: '14:00 - 15:00', title: 'Nhận phòng Bungalow ven suối nghỉ ngơi', pic: 'Quỳnh Như', note: 'Phòng chuẩn bị tinh dầu sả quế' },
      { time: '15:30 - 17:00', title: 'Workshop Vuốt Gốm Cổ Truyền', pic: 'Nghệ nhân gốm Khang', note: 'Làm bình hoa và con giống' },
      { time: '18:30 - 20:30', title: 'Tiệc nướng BBQ ven suối bên ánh đèn lồng', pic: 'Tổ nướng BBQ', note: 'Set bò nướng & khoai mật' }
    ]
  },
  {
    id: 'SCH-03',
    bookingId: 'BK-2026-001',
    title: 'Đoàn Vinschool Ocean Park (130 Khách) - Trải Nghiệm Toàn Diện',
    date: '2026-10-12',
    startTime: '08:00',
    endTime: '16:30',
    location: 'Toàn Khu Sinh Thái V-ECO Học Viện',
    leader: 'Thầy Hoàng Nam',
    guideCount: 6,
    status: 'upcoming',
    timeline: [
      { time: '08:00 - 08:30', title: 'Khởi động & Chia tiểu đoàn trải nghiệm', pic: 'Hoàng Nam & Đội HDV', note: 'Âm thanh sân khấu ngoài trời' },
      { time: '08:30 - 10:00', title: 'Trạm 1: Tìm hiểu nông nghiệp công nghệ cao & bón phân trùn quế', pic: 'Lê Văn Bách', note: 'Xoay vòng trạm 1 & 2' },
      { time: '10:00 - 11:30', title: 'Trạm 2: Vượt chướng ngại vật & Bắt cá mương lội nước', pic: 'Trần Quang Hưng', note: 'Cứu hộ túc trực quanh bờ' },
      { time: '11:45 - 13:15', title: 'Ăn trưa & Nghỉ ngơi phòng điều hòa tập thể', pic: 'Quản lý Bếp & Y Tế', note: 'Kiểm tra an toàn thực phẩm' },
      { time: '13:30 - 15:00', title: 'Trạm 3: Workshop sáng tạo Tranh Lá & Bánh Dân Gian', pic: 'Cô Diệu Anh', note: 'Túi đựng sản phẩm mang về' },
      { time: '15:00 - 16:15', title: 'Gala Tổng kết: Thuyết trình nông sản & Trao huy chương xanh', pic: 'Thầy Hoàng Nam', note: 'Chụp flycam toàn đoàn kỷ niệm' },
      { time: '16:30', title: 'Đoàn lên xe ra về', pic: 'Đội điều phối', note: 'Kiểm đếm quân số trước khi xe lăn bánh' }
    ]
  }
];

export const initialBudgetCategories = [
  { id: 'cat-food', name: 'Nguyên Liệu Thực Phẩm & Nông Sản', allocated: 45000000, spent: 28400000, color: 'emerald' },
  { id: 'cat-materials', name: 'Vật Tư Nông Nghiệp & Dụng Cụ Trải Nghiệm', allocated: 25000000, spent: 17200000, color: 'blue' },
  { id: 'cat-labor', name: 'Thù Lao HDV, Chuyên Viên & Nghệ Nhân', allocated: 35000000, spent: 22500000, color: 'purple' },
  { id: 'cat-maintenance', name: 'Bảo Trì Phòng Lưu Trú & Vườn Cây', allocated: 20000000, spent: 14800000, color: 'amber' },
  { id: 'cat-utilities', name: 'Điện, Nước, Nhiên Liệu & Viễn Thông', allocated: 15000000, spent: 11200000, color: 'rose' },
  { id: 'cat-marketing', name: 'Tiếp Thị, Truyền Thông & Quà Tặng Nông Sản', allocated: 12000000, spent: 6500000, color: 'indigo' },
];

export const initialExpenses = [
  {
    id: 'EXP-2026-001',
    code: 'CHI-NL-01',
    date: '2026-09-28',
    category: 'cat-food',
    categoryName: 'Nguyên Liệu Thực Phẩm & Nông Sản',
    title: 'Nhập gà đồi thả vườn & cá giống ao sinh thái',
    amount: 8500000,
    paidBy: 'Chị Mai (Trưởng Bếp)',
    paymentMethod: 'Chuyển khoản (Vietcombank)',
    relatedBooking: 'BK-2026-004',
    invoiceNumber: 'HD-2026-891',
    status: 'paid',
    notes: 'Gà đồi 40 con x 150k + 25kg cá suối tươi sống phục vụ đoàn du lịch xanh'
  },
  {
    id: 'EXP-2026-002',
    code: 'CHI-VT-02',
    date: '2026-09-28',
    category: 'cat-materials',
    categoryName: 'Vật Tư Nông Nghiệp & Dụng Cụ Trải Nghiệm',
    title: 'Mua 150 nón lá & 80 bộ áo bà ba các cỡ',
    amount: 5200000,
    paidBy: 'Thầy Nam (Quản lý đồ dùng)',
    paymentMethod: 'Tiền mặt',
    relatedBooking: 'BK-2026-001',
    invoiceNumber: 'BL-9812',
    status: 'paid',
    notes: 'Trang phục trải nghiệm phục vụ chuỗi tour tháng 10 cho khách đoàn & gia đình'
  },
  {
    id: 'EXP-2026-003',
    code: 'CHI-NS-03',
    date: '2026-09-29',
    category: 'cat-labor',
    categoryName: 'Thù Lao HDV, Chuyên Viên & Nghệ Nhân',
    title: 'Tạm ứng thù lao nghệ nhân nặn gốm & 4 HDV sinh thái',
    amount: 4800000,
    paidBy: 'Kế toán Hương',
    paymentMethod: 'Chuyển khoản (Techcombank)',
    relatedBooking: 'BK-2026-004',
    invoiceNumber: 'PC-2026-0929',
    status: 'paid',
    notes: 'Chi trả thù lao hỗ trợ đoàn trải nghiệm và chuẩn bị tour'
  },
  {
    id: 'EXP-2026-004',
    code: 'CHI-BT-04',
    date: '2026-09-29',
    category: 'cat-maintenance',
    categoryName: 'Bảo Trì Phòng Lưu Trú & Vườn Cây',
    title: 'Bảo dưỡng điều hòa Bungalow & giặt sấy chăn đệm nhà sàn',
    amount: 3600000,
    paidBy: 'Anh Tuấn (Kỹ thuật)',
    paymentMethod: 'Tiền mặt',
    relatedBooking: 'BK-2026-002',
    invoiceNumber: 'HD-DienLanh-33',
    status: 'paid',
    notes: 'Nạp gas 3 máy lạnh, giặt sấy khử khuẩn 40 bộ chăn ga đón đoàn'
  },
  {
    id: 'EXP-2026-005',
    code: 'CHI-NL-05',
    date: '2026-09-30',
    category: 'cat-food',
    categoryName: 'Nguyên Liệu Thực Phẩm & Nông Sản',
    title: 'Nhập rau củ quả VietGAP & gạo chất lượng cao Học Viện',
    amount: 6200000,
    paidBy: 'Chị Mai (Trưởng Bếp)',
    paymentMethod: 'Chuyển khoản (Vietcombank)',
    relatedBooking: 'BK-2026-001',
    invoiceNumber: 'HD-VGAP-4412',
    status: 'paid',
    notes: 'Bí đỏ hồ lô, khoai lang mật, dưa leo, ngô ngọt và 1 tạ gạo thơm'
  },
  {
    id: 'EXP-2026-006',
    code: 'CHI-TIEN-06',
    date: '2026-09-30',
    category: 'cat-utilities',
    categoryName: 'Điện, Nước, Nhiên Liệu & Viễn Thông',
    title: 'Thanh toán hóa đơn điện 3 pha tưới tiêu & Internet tháng 9',
    amount: 7800000,
    paidBy: 'Kế toán Hương',
    paymentMethod: 'Chuyển khoản (EVN & VNPT)',
    relatedBooking: '',
    invoiceNumber: 'EVN-0926-HN',
    status: 'paid',
    notes: 'Khu vực bơm nước tưới tiêu tự động và điện sinh hoạt toàn trung tâm'
  }
];

export const initialAccommodations = [
  { id: 'ACC-01', code: 'BG-01', name: 'Bungalow Hoa Sen (Ven Suối)', type: 'Bungalow', capacity: '2-3 khách', pricePerNight: 950000, status: 'occupied', currentGuest: 'Gia đình Bác sĩ Hưng (03/10 - 04/10)' },
  { id: 'ACC-02', code: 'BG-02', name: 'Bungalow Đồi Thông', type: 'Bungalow', capacity: '2-3 khách', pricePerNight: 950000, status: 'available', currentGuest: null },
  { id: 'ACC-03', code: 'BG-03', name: 'Bungalow Vườn Trúc', type: 'Bungalow', capacity: '2-4 khách', pricePerNight: 1100000, status: 'maintenance', currentGuest: 'Đang sơn mới hiên gỗ' },
  { id: 'ACC-04', code: 'NS-01', name: 'Nhà Sàn Hoa Ban (Tầng 1)', type: 'Nhà Sàn', capacity: '30-40 khách', pricePerNight: 3500000, status: 'booked', currentGuest: 'Đoàn THCS Đoàn Thị Điểm (18/10)' },
  { id: 'ACC-05', code: 'NS-02', name: 'Nhà Sàn Hoa Mơ (Tầng 2)', type: 'Nhà Sàn', capacity: '30-40 khách', pricePerNight: 3500000, status: 'booked', currentGuest: 'Đoàn THCS Đoàn Thị Điểm (18/10)' },
  { id: 'ACC-06', code: 'GL-01', name: 'Lều Glamping Bohemian A1', type: 'Glamping', capacity: '2-4 khách', pricePerNight: 680000, status: 'available', currentGuest: null },
  { id: 'ACC-07', code: 'GL-02', name: 'Lều Glamping Bohemian A2', type: 'Glamping', capacity: '2-4 khách', pricePerNight: 680000, status: 'available', currentGuest: null },
  { id: 'ACC-08', code: 'GL-03', name: 'Lều Glamping Bohemian B1', type: 'Glamping', capacity: '2-4 khách', pricePerNight: 680000, status: 'occupied', currentGuest: 'Cặp đôi Hoàng Anh - Trúc Mai' },
  { id: 'ACC-09', code: 'PT-01', name: 'Phòng Nghỉ Trưa Tập Thể 1', type: 'Nghỉ Trong Ngày', capacity: '35 khách', pricePerNight: 800000, status: 'booked', currentGuest: 'Đoàn Vinschool (12/10)' },
  { id: 'ACC-10', code: 'PT-02', name: 'Phòng Nghỉ Trưa Tập Thể 2', type: 'Nghỉ Trong Ngày', capacity: '35 khách', pricePerNight: 800000, status: 'booked', currentGuest: 'Đoàn Vinschool (12/10)' },
];
