# Backend Sistem Pengelolaan Tugas

![Node.js](https://img.shields.io/badge/Node.js-v14.17.0-green.svg)
![Express.js](https://img.shields.io/badge/Express.js-v4.17.1-green.svg)
![TypeScript](https://img.shields.io/badge/TypeScript-v4.4.3-blue.svg)
![Prisma](https://img.shields.io/badge/Prisma-v3.12.1-orange.svg)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-v13.4-blue.svg)

Deskripsi singkat tentang sistem pengelolaan tugas. Deskripsi ini dapat mencakup tujuan sistem, fitur utama, dan gambaran umum dari teknologi yang digunakan.

## Daftar Isi
- [Perkenalan](#introduction)
- [Instalasi](#instalasi)
- [Menjalankan Aplikasi](#menjalankan-aplikasi)
- [Lisensi](#lisensi)

## Introduction

Backend Sistem Pengelolaan Tugas adalah bagian dari aplikasi yang memungkinkan pengguna untuk mengatur dan mengelola tugas-tugas mereka dengan efisien. Sistem ini menyediakan layanan berbasis web yang memudahkan pengguna dalam membuat, mengorganisasi, dan melacak berbagai tugas, proyek, atau aktivitas yang perlu diselesaikan.

## Instalasi

1. **Clone repository ini**
   
    ```bash
    git clone https://github.com/username/backend-tugas-manager.git
    ```

2. **Pemasangan Dependensi**

    Pergi ke direktori proyek dan jalankan perintah berikut untuk menginstal semua dependensi:

    ```bash
    cd backend-tugas-manager
    npm install
    ```

3. **Konfigurasi Database**

    Sesuaikan konfigurasi database PostgreSQL di file `.env`:

    ```plaintext
    DATABASE_URL="postgresql://username:password@localhost:5432/nama_database?schema=public"
    ```

## Menjalankan Aplikasi

1. **Migrasi Database**

    Terapkan migrasi Prisma untuk membuat skema database:

    ```bash
    npx prisma migrate dev --name init
    ```

2. **Menjalankan Server**

    Jalankan server dengan perintah:

    ```bash
    npm run dev
    ```

    Server akan berjalan di `http://localhost:3000`.

## Lisensi
©2023 - CookyNdi