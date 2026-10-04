# METRICS_DASHBOARD

# 📊 Metrics Dashboard

A modern, responsive **Analytics Dashboard** built with React, Vite, Tailwind CSS, Recharts, and Lucide React.

The dashboard provides business performance insights through KPI cards, interactive charts, transaction management, filtering, searching, sorting, pagination, and CSV export.

## 🚀 Features

* 📊 Analytics Overview Dashboard
* 👥 Total Users KPI
* 💰 Revenue KPI
* 🛒 Orders KPI
* 📈 Conversion Rate KPI
* 📉 Monthly Revenue Line Chart
* 📊 Top Products Bar Chart
* 👥 Daily Active Users Area Chart
* 🍩 Traffic Sources Donut Chart
* 🔍 Transaction Search
* 🏷️ Category Filtering
* ↕️ Table Sorting
* 📄 Pagination
* 📥 Export Transactions to CSV
* 📱 Fully Responsive Design
* 📱 Mobile Sidebar Navigation
* ⏳ Loading Screen
* 🎨 Modern Dark UI
* ⚡ Fast development with Vite

## 🛠️ Technologies Used

* **React.js** – UI development
* **Vite** – Development server and build tool
* **Tailwind CSS** – Styling and responsive design
* **Recharts** – Charts and data visualization
* **Lucide React** – Icons
* **JavaScript (ES6+)** – Application logic
* **HTML5** – Page structure
* **CSS3** – Styling

## 📁 Project Structure

```text
app/
│
├── App.jsx              # Main dashboard component
├── main.jsx             # React entry point
├── index.css            # Tailwind CSS
├── index.html           # HTML entry file
├── package.json         # Project dependencies and scripts
├── package-lock.json    # Locked dependency versions
├── vite.config.js       # Vite configuration
└── node_modules/        # Installed dependencies
```

## ⚙️ Installation & Setup

### 1. Clone the Repository

```bash
git clone YOUR_GITHUB_REPOSITORY_URL
```

### 2. Open the Project Folder

```bash
cd app
```

### 3. Install Dependencies

```bash
npm install
```

### 4. Start the Development Server

```bash
npm run dev
```

After running the command, Vite will show a local URL in the terminal, for example:

```text
http://localhost:5173/
```

Open that URL in your browser.

> If port `5173` is already being used, Vite may automatically use another port such as `5174`. Use the **Local URL shown in your terminal**.

## 📦 Required Packages

The project uses the following packages:

```bash
npm install react react-dom
npm install recharts
npm install lucide-react
npm install tailwindcss @tailwindcss/vite
```

## 🎨 Tailwind CSS Setup

The project uses Tailwind CSS through the Vite plugin.

`index.css`:

```css
@import "tailwindcss";
```

`vite.config.js`:

```js
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [react(), tailwindcss()],
});
```

## 📊 Dashboard Sections

### KPI Cards

The dashboard displays:

* Total Users
* Revenue
* Orders
* Conversion Rate

### Charts

The analytics section includes:

* Monthly Revenue
* Top Products
* Daily Active Users
* Traffic Sources

### Recent Transactions

The transaction table supports:

* Search
* Category filtering
* Sorting
* Pagination
* Status indicators
* CSV export

## 📱 Responsive Design

The dashboard is designed to work across:

* 💻 Desktop
* 💻 Laptop
* 📱 Tablet
* 📱 Mobile

On smaller screens, the sidebar changes to a mobile-friendly navigation menu and transactions are displayed as cards.

## 📥 CSV Export

Users can export the currently processed transaction data as:

```text
analytics_export.csv
```

The exported file contains:

```text
ID
Name
Date
Amount
Status
Category
```
## Dashboard Preview

![Dashboard Screenshot](./<img width="1890" height="952" alt="Screenshot 2026-10-04 121922" src="https://github.com/user-attachments/assets/b8dc2dce-3515-4288-9831-dcb6737066c5" />
)

## 🔮 Future Improvements

Possible future improvements include:

* Backend API integration
* Real database integration
* User authentication
* Real-time analytics
* Advanced date-range filtering
* More dashboard pages
* User profile management
* Real transaction data
* Deployment with Vercel or Netlify

## 👨‍💻 Author

**Sonu Kumar**

Frontend Developer | React Developer

## 📄 License

This project is created for learning and development purposes.
