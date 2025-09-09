link aplikasi PWS:
https://giselle-julia-soccerwave.pbp.cs.ui.ac.id/

1. Jelaskan bagaimana cara kamu mengimplementasikan checklist di atas secara step-by-step (bukan hanya sekadar mengikuti tutorial).
=> > Membuat Proyek Django Baru
        - Menggunakan perintah django-admin startproject soccer-wave . untuk membuat proyek
        - Konfigurasi environment variables menggunakan .env dan .env.prod
        - Setup database configuration di settings.py yang mendukung SQLite (development) dan PostgreSQL (production)
    > Membuat Aplikasi main
        - Menggunakan perintah python manage.py startapp main
        - Mendaftarkan aplikasi di INSTALLED_APPS pada settings.py
    > Routing pada Proyek dengan cara mengonfigurasi urls.py di level proyek untuk include URLs dari aplikasi main
    > Membuat Model Product di models.py aplikasi main
    > Membuat fungsi show_main di views.py dan template main.html yang menampilkan data dari context
    > Routing di urls.py Aplikasi Main
    > Deployment ke PWS
        - Membuat project di PWS dengan nama footballnews
        - Menambahkan environment variables di PWS dashboard
        - Menambahkan URL deployment ke ALLOWED_HOSTS
        - Melakukan push ke remote PWS dengan git push pws master
    > Unit Testing
        Membuat test cases di tests.py untuk menguji:
        - URL existence dan template yang digunakan
        - Pembuatan model Product dengan berbagai skenario
        - Nilai default dari field-field model

2. Buatlah bagan yang berisi request client ke web aplikasi berbasis Django beserta responnya dan jelaskan pada bagan tersebut kaitan antara urls.py, views.py, models.py, dan berkas html.

3. Jelaskan peran settings.py dalam proyek Django!
=> settings.py adalah file konfigurasi utama yang mengontrol semua aspek proyek Django, termasuk:
    - Konfigurasi database (engine, nama, credentials)
    - Daftar aplikasi yang terinstall (INSTALLED_APPS)
    - Middleware yang digunakan
    - Konfigurasi template
    - Static files dan media files settings
    - Internationalization settings
    - Security settings (SECRET_KEY, ALLOWED_HOSTS, etc.)
    - Dan berbagai konfigurasi penting lainnya

4. Bagaimana cara kerja migrasi database di Django?
=> Migrasi database di Django bekerja melalui 2 langkah utama:
    > makemigrations 
        - Membuat file migrasi berdasarkan perubahan model
        - Django membandingkan model saat ini dengan versi sebelumnya
        - Membuat operasi database yang diperlukan (create table, add column, etc.)
        - Menyimpannya sebagai file Python di folder migrations/
    > migrate 
        - Mengaplikasikan migrasi ke database
        - Django mengeksekusi operasi database yang didefinisikan dalam file migrasi
        - Menjaga track migrasi yang sudah diaplikasikan melalui tabel django_migrations

5. Menurut Anda, dari semua framework yang ada, mengapa framework Django dijadikan permulaan pembelajaran pengembangan perangkat lunak?
=> Django dipilih sebagai permulaan pembelajaran karena:
    - Sudah menyediakan banyak fitur built-in (admin panel, authentication, ORM, etc.)
    - Dokumentasi Django sangat lengkap dan terstruktur dengan baik
    - Scalabilitas yang cocok untuk proyek kecil hingga enterprise-level
    - Memiliki built-in security terhadap common web vulnerabilities
    - Community yang Besar, banyak resources, tutorial, dan packages tersedia
    - Pola arsitektur MVT yang jelas membantu pemahaman konsep web development

6.Apakah ada feedback untuk asisten dosen tutorial 1 yang telah kamu kerjakan sebelumnya?
=> Tutorial 1 sudah sangat baik dan terstruktur. Secara keseluruhan, tutorial sangat membantu dalam memahami konsep dasar Django MVT.