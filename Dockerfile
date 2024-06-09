# Sử dụng hình ảnh gốc của Node.js
FROM node:20

# Thiết lập thư mục làm việc trong container
WORKDIR /app

# Sao chép tệp package.json và package-lock.json (nếu có) vào thư mục làm việc
COPY package*.json ./

# Cài đặt các gói phụ thuộc
RUN npm i

# Sao chép toàn bộ mã nguồn của dự án vào thư mục làm việc
COPY . .

# Biên dịch ứng dụng NestJS
RUN npm run build

# Mở cổng 3000 để truy cập từ bên ngoài
EXPOSE 3000

# Khởi động ứng dụng NestJS
CMD ["npm", "run", "dev"]
