const selection_attribute = [
  { title: "Vệ sinh môi trường", filter: "environment", code: "environment" },
  { title: "Dụng cụ chế biến", filter: "appliances", code: "appliances" },
  { title: "Nguồn nước", filter: "waterSource", code: "water_source" },
  { title: "Nguyên liệu sản suất", filter: "ingredients", code: "ingredients" },
  {
    title: "Bảo quản thực phẩm",
    filter: "foodPreservation",
    code: "food_preservation",
  },
  {
    title: "Xử lý chất thải",
    filter: "wasteTreatment",
    code: "waste_treatment",
  },
  { title: "Kiến thức an toàn thực phẩm", filter: "owners", code: "owners" },
  { title: "Quá trình chế biến", filter: "processing", code: "processing" },
];

const table_header = [
  "Tên cơ sở",
  "Địa chỉ",
  "Số điện thoại",
  "Loại hình kinh doanh",
  "Số cấp Giấy chứng nhận",
  "Ngày cấp",
  "Ngày hết hạn / Ngày thu hồi",
  "Vệ sinh môi trường",
  "Dụng cụ chế biến",
  "Nguồn nước",
  "Nguyên liệu sản suất",
  "Bảo quản thực phẩm",
  "Xử lý chất thải",
  "Kiến thức an toàn thực phẩm",
  "Quá trình chế biến",
];

const short_table_header = [
  "Tên cơ sở",
  "Địa chỉ",
  "Số điện thoại",
  "Loại hình kinh doanh",
  "Số cấp Giấy chứng nhận",
  "Ngày cấp",
  "Ngày hết hạn / Ngày thu hồi",
  "Tiêu chí",
];

export { selection_attribute, table_header, short_table_header };
