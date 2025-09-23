link aplikasi PWS:
https://giselle-julia-soccerwave.pbp.cs.ui.ac.id/

TUGAS 2
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
=> https://drive.google.com/drive/folders/1GNK3ozSiMizg501xsTO1C1zx-sE6BCS3?usp=sharing

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

TUGAS 3
1. Jelaskan mengapa kita memerlukan data delivery dalam pengimplementasian sebuah platform?
=> Data delivery diperlukan untuk memungkinkan pertukaran data antara client dan server dalam format yang terstruktur dan mudah dipahami. Dalam pengembangan platform, data delivery    memungkinkan integrasi dengan berbagai sistem, aplikasi mobile, atau third-party services yang membutuhkan akses ke data dalam format tertentu seperti XML atau JSON.

2. Menurutmu, mana yang lebih baik antara XML dan JSON? Mengapa JSON lebih populer dibandingkan XML?
=> JSON lebih baik karena:
    - Lebih ringan dan mudah dibaca manusia
    - Parsing lebih cepat dan efisien
    - Native support di JavaScript yang merupakan bahasa utama web development
    - Struktur data yang lebih sederhana dan intuitif
    - Support untuk array sebagai tipe data pertama
=> JSON lebih populer karena kemudahan penggunaannya, ukuran file yang lebih kecil, dan kompatibilitas yang lebih baik dengan teknologi web modern.

3. Jelaskan fungsi dari method is_valid() pada form Django dan mengapa kita membutuhkan method tersebut?
=> Method is_valid() pada form Django digunakan untuk memvalidasi data yang diinput pengguna. Method ini memeriksa apakah semua field form memenuhi aturan validasi yang telah ditentukan (seperti required fields, format email, dll). Kita membutuhkan method ini untuk memastikan data yang dimasukkan user sesuai dengan aturan yang ditetapkan sebelum disimpan ke database, sehingga mencegah data tidak valid atau berbahaya masuk ke sistem.

4. Mengapa kita membutuhkan csrf_token saat membuat form di Django? Apa yang dapat terjadi jika kita tidak menambahkan csrf_token pada form Django? Bagaimana hal tersebut dapat dimanfaatkan oleh penyerang?
=> CSRF token diperlukan untuk melindungi dari Cross-Site Request Forgery attacks. Token ini di-generate secara unik untuk setiap session user dan harus disertakan dalam setiap form POST. Jika tidak menambahkan csrf_token, penyerang dapat membuat website jahat yang memanipulasi pengguna terautentikasi untuk melakukan tindakan tanpa sepengetahuan mereka (seperti mengubah data, transfer dana, dll). Penyerang dapat memanfaatkan kepercayaan server terhadap browser pengguna yang sudah terautentikasi.

5. Jelaskan bagaimana cara kamu mengimplementasikan checklist di atas secara step-by-step (bukan hanya sekadar mengikuti tutorial).
=> > Implementasi Fungsi Views Baru
        Pertama-tama, saya menambahkan empat fungsi views baru pada aplikasi main untuk menyediakan data dalam format XML dan JSON. Keempat fungsi ini adalah show_xml, show_json, show_xml_by_id, dan show_json_by_id. Fungsi-fungsi ini menggunakan modul serializers dari Django yang memungkinkan konversi data dari model Django menjadi format XML dan JSON dengan mudah. Untuk fungsi yang berdasarkan ID, saya menerapkan error handling dengan try-except block untuk menangani kasus dimana data dengan ID tertentu tidak ditemukan, yang akan mengembalikan response status 404. Pendekatan ini memastikan bahwa aplikasi tetap stabil meskipun menerima request dengan parameter ID yang tidak valid.
    > Konfigurasi Routing URL
        Setelah membuat fungsi views, saya mengkonfigurasi routing URL di file urls.py untuk mengakses keempat fungsi tersebut. Saya menambahkan path untuk masing-masing endpoint: '/xml/' untuk show_xml, '/json/' untuk show_json, '/xml/<id>/' untuk show_xml_by_id, dan '/json/<id>/' untuk show_json_by_id. Konfigurasi routing ini memungkinkan client untuk mengakses data dalam format yang diinginkan dengan mudah melalui URL yang terstruktur dan konsisten.
    > Pembuatan Halaman dengan Tombol Add dan Detail
        Saya mengembangkan halaman utama yang menampilkan semua data News yang ada dalam database. Halaman ini memiliki tombol "Add News" yang akan mengarahkan pengguna ke halaman form untuk menambahkan data baru. Setiap item News yang ditampilkan juga memiliki tombol "Read More" yang mengarahkan ke halaman detail dari News tersebut. Implementasi ini menggunakan template inheritance dengan base.html sebagai kerangka dasar, sehingga memastikan konsistensi tampilan across seluruh halaman aplikasi.
    > Implementasi Form untuk Menambah Data
        Saya membuat form menggunakan ModelForm yang terhubung langsung dengan model News. Form ini secara otomatis menghasilkan field-field yang sesuai dengan definisi model, termasuk validasi dasar untuk setiap field. Pada halaman form, saya menambahkan csrf_token untuk keamanan, yang melindungi dari serangan CSRF. Form ini akan memvalidasi data input pengguna sebelum menyimpannya ke database, memastikan integritas data yang disimpan.
    > Pembuatan Halaman Detail
        Untuk halaman detail, saya membuat template khusus yang menampilkan semua informasi dari sebuah News secara lengkap. Halaman ini juga menyertakan tombol untuk kembali ke halaman utama, memberikan navigasi yang intuitif bagi pengguna. Data yang ditampilkan termasuk judul, kategori, konten, thumbnail, serta informasi tambahan seperti status featured dan jumlah views.
    > Pengujian dengan Postman
        Saya melakukan pengujian menyeluruh terhadap keempat endpoint menggunakan Postman untuk memastikan bahwa semua fungsi bekerja dengan benar. Saya menguji berbagai skenario termasuk request untuk semua data, data berdasarkan ID yang valid, dan ID yang tidak valid untuk memverifikasi error handling yang telah diimplementasikan.
    > Proses Deployment ke GitHub dan Push PWS ke web pbp
        Terakhir, saya melakukan push semua perubahan ke repository GitHub dengan melakukan add, commit, dan push secara bertahap. Saya memastikan bahwa semua file yang diperlukan termasuk templates, views, urls, dan konfigurasi lainnya telah tersimpan dengan baik di repository. Lalu, saya juga melakukan push PWS ke web pbp agar segala perubahan dapat terlihat di url web.

6. Apakah ada feedback untuk asdos di tutorial 2 yang sudah kalian kerjakan?
=> Tutorial 2 sudah sangat bagus dan jelas. Penjelasannya mudah dimengerti dan langkah-langkah yang diberikan sangat membantu dalam memahami materi.

7. Screenshot postman
=> https://drive.google.com/drive/folders/1rz6zWepO8WUCyKlMW4KCvEnZ5hBBJarc?usp=sharing

TUGAS 4

