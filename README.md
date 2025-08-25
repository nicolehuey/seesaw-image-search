# 📸 Image Search - React TypeScript + Tailwind CSS

A modern image search application built with React, TypeScript, and Tailwind CSS that allows users to search and download beautiful photos from Flickr. 
Deployed at: https://seesaw-image-search.vercel.app/

## 🚀 Features

- **🔍 Image Search** - Search for images using Flickr's powerful API
- **📱 Responsive Design** - Pinterest-style masonry layout that works on all devices
- **♾️ Infinite Scroll** - Automatically loads more images as you scroll
- **💾 Download Images** - Save images directly to your device with one click
- **🖼️ Image Modal** - View full-size images in a beautiful modal
- **⚡ Fast Loading** - Optimized image loading with lazy loading and progressive enhancement
- **🎨 Modern UI** - Beautiful, clean interface with smooth animations and hover effects

## 🛠️ Tech Stack

- **React 19.1.1** - Latest React with modern features
- **TypeScript 4.9.5** - Full type safety and better development experience
- **Tailwind CSS 3.4.0** - Utility-first CSS framework for rapid styling
- **Flickr API** - Integration with Flickr's photo search API
- **Intersection Observer** - For infinite scroll functionality

## 📦 Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd seesaw
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   Create a `.env` file in the root directory and add your Flickr API key:
   ```env
   REACT_APP_FLICKR_API_KEY=your_flickr_api_key_here
   ```

4. **Start development server**
   ```bash
   npm start
   ```

5. **Build for production**
   ```bash
   npm run build
   ```
## 🎨 Features in Detail

### Image Search
- Real-time search with Flickr's API
- Displays search results in a beautiful masonry grid (Pinterest-like)
- Shows total number of results found

### Download Functionality
- **Save Button on Hover**: Click the "Save" button that appears on hover over any image
- **Modal Download**: Download full-size images from the modal view
- **Direct Download**: Images download directly to your device without opening new tabs

### User Experience
- **Infinite Scroll**: Automatically loads more images as you scroll down
- **Loading States**: Beautiful loading animations and skeleton screens
- **Error Handling**: Graceful error handling with user-friendly messages
- **Mobile Responsive**: Supports viewing in mobile responsive sizes

## 🎯 Key Components

### ImageCard
- Displays individual images in the masonry grid
- Hover effects with save button
- Progressive image loading
- Error handling for failed image loads

### ImageModal
- Full-size image viewer
- Download functionality
- Image metadata display
- Keyboard and click-to-close support

## 🚀 Getting Started

1. The development server runs at `http://localhost:3000`
2. Enter a search term in the search bar
3. Browse images in the Pinterest-style grid
4. Hover over images to see the save button
5. Click on images to view them in full size
6. Use the save button in the modal to download full-size images

## 🎨 Styling

This project uses Tailwind CSS for styling:
- **Responsive Design**: Mobile-first approach with breakpoint utilities
- **Custom Animations**: Smooth transitions and hover effects
- **Masonry Layout**: CSS columns for Pinterest-style image grid
- **Modern UI**: Clean, minimalist design with proper spacing and typography

## 🔧 Development

### Available Scripts
- `npm start` - Start development server
- `npm run build` - Build for production
- `npm run eject` - Eject from Create React App

Happy image searching! 📸✨
