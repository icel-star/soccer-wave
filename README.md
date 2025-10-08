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
        - Membuat project di PWS dengan nama soccerwave
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
=> Data delivery diperlukan untuk memungkinkan pertukaran data antara client dan server dalam format yang terstruktur dan mudah dipahami. Dalam pengembangan platform, data delivery memungkinkan integrasi dengan berbagai sistem, aplikasi mobile, atau third-party services yang membutuhkan akses ke data dalam format tertentu seperti XML atau JSON.

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
        Saya mengembangkan halaman utama yang menampilkan semua data Product yang ada dalam database. Halaman ini memiliki tombol "Add Product" yang akan mengarahkan pengguna ke halaman form untuk menambahkan data baru. Setiap item Product yang ditampilkan juga memiliki tombol "Read More" yang mengarahkan ke halaman detail dari Product tersebut. Implementasi ini menggunakan template inheritance dengan base.html sebagai kerangka dasar, sehingga memastikan konsistensi tampilan across seluruh halaman aplikasi.
    > Implementasi Form untuk Menambah Data
        Saya membuat form menggunakan ModelForm yang terhubung langsung dengan model Product. Form ini secara otomatis menghasilkan field-field yang sesuai dengan definisi model, termasuk validasi dasar untuk setiap field. Pada halaman form, saya menambahkan csrf_token untuk keamanan, yang melindungi dari serangan CSRF. Form ini akan memvalidasi data input pengguna sebelum menyimpannya ke database, memastikan integritas data yang disimpan.
    > Pembuatan Halaman Detail
        Untuk halaman detail, saya membuat template khusus yang menampilkan semua informasi dari sebuah Product secara lengkap. Halaman ini juga menyertakan tombol untuk kembali ke halaman utama, memberikan navigasi yang intuitif bagi pengguna. Data yang ditampilkan termasuk judul, kategori, konten, thumbnail, serta informasi tambahan seperti status featured dan jumlah views.
    > Pengujian dengan Postman
        Saya melakukan pengujian menyeluruh terhadap keempat endpoint menggunakan Postman untuk memastikan bahwa semua fungsi bekerja dengan benar. Saya menguji berbagai skenario termasuk request untuk semua data, data berdasarkan ID yang valid, dan ID yang tidak valid untuk memverifikasi error handling yang telah diimplementasikan.
    > Proses Deployment ke GitHub dan Push PWS ke web pbp
        Terakhir, saya melakukan push semua perubahan ke repository GitHub dengan melakukan add, commit, dan push secara bertahap. Saya memastikan bahwa semua file yang diperlukan termasuk templates, views, urls, dan konfigurasi lainnya telah tersimpan dengan baik di repository. Lalu, saya juga melakukan push PWS ke web pbp agar segala perubahan dapat terlihat di url web.

6. Apakah ada feedback untuk asdos di tutorial 2 yang sudah kalian kerjakan?
=> Tutorial 2 sudah sangat bagus dan jelas. Penjelasannya mudah dimengerti dan langkah-langkah yang diberikan sangat membantu dalam memahami materi.

7. Screenshot postman
=> https://drive.google.com/drive/folders/1rz6zWepO8WUCyKlMW4KCvEnZ5hBBJarc?usp=sharing

TUGAS 4
1. Apa itu Django AuthenticationForm? Jelaskan juga kelebihan dan kekurangannya.
=> Django AuthenticationForm adalah form bawaan (built-in form) Django yang digunakan untuk melakukan autentikasi pengguna (login). Form ini merupakan bagian dari modul django.contrib.auth dan secara khusus dirancang untuk keperluan login user. Form ini menyediakan field untuk username dan password, serta melakukan validasi terhadap kredensial yang dimasukkan.
=> Kelebihan AuthenticationForm:
    - Sudah terintegrasi dengan sistem autentikasi Django
        Tidak perlu membuat form manual. AuthenticationForm terintegrasi secara langsung dengan sistem autentikasi bawaan Django. Form ini sudah didesain untuk bekerja seamless dengan model User default Django, sehingga tidak diperlukan konfigurasi tambahan untuk fungsi dasar autentikasi.
    - Validasi otomatis
        Form ini melakukan berbagai validasi otomatis, termasuk memeriksa keberadaan user di database, memverifikasi kecocokan password dengan hash yang tersimpan, menangani case sensitivity untuk username, dan memberikan error messages yang informatif
    - Keamanan bawaan 
        AuthenticationForm dilengkapi dengan berbagai fitur keamanan, yaitu CSRF protection yang otomatis, password hashing verification, rate limiting capability melalui integrasi dengan middleware, dan secure cookie handling untuk session management
    - Mudah dikustomisasi
        Meskipun sudah jadi, AuthenticationForm dapat dikustomisasi dengan beberapa cara. Pertama override method dan attribute, kedua penambahan field tambahan, lalu modifikasi error messages, bisa juga dengan custom validation logic, dan styling dan template customization.
    - Konsistensi dan Best Practices
        Dengan menggunakan AuthenticationForm, developer mengikuti standar keamanan dan praktik terbaik yang sudah diuji oleh komunitas Django worldwide.

=> Kekurangan AuthenticationForm:
    - Terbatas pada field default
        AuthenticationForm hanya menyediakan fungsi login dasar, yaitu username dan password. Untuk kebutuhan yang lebih kompleks seperti multi-factor authentication, social authentication, biometric login, maupun single sign-on (SSO), developer perlu mengimplementasikan solusi tambahan atau form custom.
    - Kurang fleksibel untuk kebutuhan autentikasi yang kompleks
        Pada skenario tertentu seperti login dengan email instead of username, authentication dengan multiple credentials, dan custom user model dengan field tambahan, authenticationForm default mungkin tidak mencukupi dan memerlukan extended implementation.
    - Tampilan dasar yang basic sehingga perlu dikustomisasi untuk UI yang lebih menarik
        Secara default, form ini menghasilkan HTML yang sederhana tanpa styling. Untuk aplikasi production dengan design requirements tertentu, diperlukan custom template dan CSS yang signifikan.
    - Dependency pada Django Auth System
        AuthenticationForm sangat bergantung dengan sistem autentikasi Django traditional. Untuk arsitektur yang menggunakan external auth service atau microservices architecture, form ini mungkin tidak cocok.

2. Apa perbedaan antara autentikasi dan otorisasi? Bagaiamana Django mengimplementasikan kedua konsep tersebut?
=> Autentikasi (Authentication) adalah proses verifikasi identitas pengguna, membuktikan bahwa pengguna adalah siapa yang mereka klaim. Dalam konteks web application, autentikasi menjawab pertanyaan "Siapa Anda?". Sedangkan, Otorisasi (Authorization) adalah proses menentukan hak akses dan permissions yang dimiliki oleh pengguna yang sudah terautentikasi. Otorisasi menjawab pertanyaan "Apa yang boleh Anda lakukan?".
=> Implementasi dalam Django:
Autentikasi di Django diimplementasikan melalui:
    - Registrasi user baru dengan UserCreationForm
    - Login user dengan AuthenticationForm dan authenticate()
    - Session management dengan login() dan logout()
    - Maintenance login state dengan session cookies  

Otorisasi di Django diimplementasikan melalui:
    - @login_required decorator untuk membatasi akses halaman
    - User model dengan permissions system
    - Filtering data berdasarkan ownership 
    - Access control untuk halaman yang membutuhkan login
    - Pembatasan akses data berdasarkan user context

3. Apa saja kelebihan dan kekurangan session dan cookies dalam konteks menyimpan state di aplikasi web?
=> Session:
Kelebihan:
    - Keamanan Data yang Tinggi
        Data session disimpan di server side, sehingga tidak dapat diakses atau dimodifikasi langsung oleh client. Hanya session ID yang disimpan di cookie client, sedangkan data aktual berada di server.
    - Kapasitas Penyimpanan yang Besar
        Django session dapat menyimpan data hingga 5 megabyte. Cocok untuk menyimpan data kompleks seperti user preferences, cart items, atau temporary data.
    - Tidak terpapar ke client-side
        Data tidak akan terpapar ke client-side, sehinngga tampilan rapih dan data krusial tidak akan mudah bocor.
    - Mendukung berbagai storage backend (database, cache, file)
    - Automatic Management
        Django menangani session lifecycle secara otomatis, yaitu session creation dan deletion, expiration management, dan security features seperti session hijacking protection
    - Data Consistency
        Data session terjamin konsisten karena disimpan terpusat di server.
Kekurangan:
    - Membutuhkan storage di server
        Setiap session membutuhkan storage di server, yang dapat menjadi bottleneck pada aplikasi high-traffic.
    - Scalability Challenges
        Pada environment distributed dengan multiple servers, session management membutuhkan strategi khusus seperti shared cache atau database.
    - Lebih banyak resource server yang digunakan
    - Session ID masih perlu disimpan di cookie
    - Performance Overhead
        Setiap request membutuhkan session data retrieval dari storage backend, menambah latency.
    - Complexity dalam Distributed Systems
        Session replication dan synchronization menjadi kompleks dalam arsitektur microservices.

=> Cookies:
Kelebihan:
    - Data disimpan di client 
        Cookies disimpan di browser client, mengurangi beban server dan meningkatkan scalability.
    - Automatic Transmission
        Cookies otomatis dikirim dengan setiap request ke domain yang sesuai, memudahkan state maintenance.
    - Mudah diimplementasikan
    - Persistence Options
        Cookies dapat dikonfigurasi dengan berbagai expiration times, yaitu session cookies (hilang saat browser close) atau persistent cookies (bertahan hingga expiration date)
    - Automatic Transmission
        Cookies otomatis dikirim dengan setiap request ke domain yang sesuai, memudahkan state maintenance.
    - No Server Storage Required
        Tidak membutuhkan storage space di server side.
Kekurangan:
    - Terbatas ukuran
        Dibatasi maksimal 4KB per cookie, dan sekitar 20 cookies per domain.
    - Security Vulnerabilities
        Rentan terhadap berbagai serangan seperti XSS (Cross-Site Scripting), CSRF (Cross-Site Request Forgery), dan session hijacking.
    - Client Dependency
        Bergantung pada browser settings dan user preferences yang mungkin memblokir cookies.
    - Data terpapar ke pengguna
        Data cookies dapat dilihat dan dimodifikasi oleh user melalui browser developer tools.
    - Privacy Concerns
        Increasing regulatory requirements (GDPR, CCPA) membatasi penggunaan cookies.

4. Apakah penggunaan cookies aman secara default dalam pengembangan web, atau apakah ada risiko potensial yang harus diwaspadai? Bagaimana Django menangani hal tersebut?
=> Tidak, cookies tidak aman secara default dan memiliki beberapa risiko potensial:
    - Cross-Site Scripting (XSS) 
        Serangan dimana attacker menyuntikkan malicious script yang dapat mencuri cookies pengguna. Script ini berjalan dalam context website target dan dapat mengakses cookies yang tidak dilindungi HttpOnly flag.
    - Cross-Site Request For gery (CSRF) 
        Serangan dimana website jahat membuat pengguna yang sudah login mengirim request tidak sah ke website target. Attack ini memanfaatkan fakta bahwa cookies otomatis dikirim dengan setiap request ke domain.
    - Session Hijacking 
        Pencurian session ID dari cookies yang memungkinkan attacker mengambil alih session pengguna. Dapat terjadi melalui network sniffing, XSS, atau physical access ke device.
    - Man-in-the-Middle Attacks
        Penyadapan komunikasi antara client dan server melalui jaringan tidak aman, memungkinkan pencurian cookies selama transmisi.
    - Cookie Tossing
        Attack dimana attacker memanipulasi cookies untuk mempengaruhi behavior aplikasi atau elevate privileges.

=> Cara Django Menangani:
    - CSRF Protection
        > Setiap form POST request membutuhkan valid CSRF token
        > Token di-generate secara unique per session
        > Mencegah CSRF attacks dengan memverifikasi origin request
    - HttpOnly Flag
        > Mencegah akses cookies melalui JavaScript
        > Melindungi terhadap XSS attacks
        > Session cookies secara default HttpOnly
    - Secure Flag untuk HTTPS
        > Memastikan cookies hanya dikirim melalui HTTPS
        > Mencegah transmission over unencrypted connections
        > Essential untuk production environments
    - SameSite Cookie Attribute 
        > Mengontrol ketika cookies dikirim cross-site
        > 'Lax' memperbolehkan GET requests cross-site tetapi block POST
        > Mencegah CSRF dan other cross-site attacks
    - Session Security 
        > Session ID di-generate secara acak dan aman
        > Automatic session expiration
        > Session hijacking detection
    - Password Hashing
        > Password tidak disimpan dalam bentuk plain text
        > Strong password hashing algorithms
        > Work factor configuration untuk hashing

5. Jelaskan bagaimana cara kamu mengimplementasikan checklist di atas secara step-by-step (bukan hanya sekadar mengikuti tutorial).
=> a. Membuat Fungsi dan Form Registrasi
    > Import Components yang Diperlukan
        Pertama-tama, saya mengimpor UserCreationForm dari django.contrib.auth.forms dan messages dari django.contrib. UserCreationForm adalah form bawaan Django yang sudah menyediakan field-field dasar untuk registrasi user, termasuk username, password1, dan password2 dengan validasi otomatis.
    > Membuat Fungsi Register
        Saya membuat fungsi register yang menerima parameter request. Dalam fungsi ini, pertama-tama saya inisialisasi form kosong dengan form = UserCreationForm(). Kemudian saya memeriksa metode request: jika metode adalah POST, berarti user sedang mengirim data registrasi. Saya membuat form baru dengan data dari request.POST, kemudian memvalidasi form tersebut. Jika form valid, data user disimpan ke database dengan form.save(), ditampilkan pesan sukses, dan user diarahkan ke halaman login. Jika metode bukan POST atau form tidak valid, form akan ditampilkan kembali dengan error messages.
    > Membuat Template Registrasi
        Saya membuat file register.html dalam folder main/templates. Template ini extends base.html dan berisi form registrasi. Saya menggunakan {{ form.as_table }} untuk menampilkan form dalam format tabel secara otomatis. Form menggunakan method POST dan disertakan CSRF token untuk keamanan. Juga ada penanganan messages untuk menampilkan notifikasi sukses atau error.
    > Konfigurasi URL
        Saya menambahkan path untuk registrasi di urls.py dengan mengimpor fungsi register dan menambahkan path('register/', register, name='register') ke urlpatterns.
    
    b.  Membuat Fungsi Login
    > Import Komponen Autentikasi
        Saya mengimpor AuthenticationForm dari django.contrib.auth.forms serta authenticate dan login dari django.contrib.auth. AuthenticationForm khusus digunakan untuk proses login, berbeda dengan UserCreationForm.
    > Membuat Fungsi Login_user
        Fungsi login_user memeriksa metode request. Jika metode POST, saya membuat AuthenticationForm dengan data dari request.POST. Jika form valid, saya mengambil user object dengan form.get_user() dan melakukan login dengan login(request, user). Setelah login berhasil, user di-redirect ke halaman utama. Jika metode bukan POST, form login kosong ditampilkan.
    > Membuat Template Login
        Saya membuat login.html dengan struktur similar to register.html. Template ini menampilkan form login dan link ke halaman registrasi untuk user yang belum punya akun.
    > Konfigurasi URL Login
        Saya menambahkan path untuk login di urls.py dengan path('login/', login_user, name='login').

    c. Membuat Fungsi Logout
    > Import Logout Function
        Saya mengimpor logout dari django.contrib.auth untuk menangani proses logout.
    > Membuat Fungsi Logout_user
        Fungsi logout_user sangat sederhana: memanggil logout(request) untuk menghapus session user, kemudian redirect ke halaman login.
    > Menambah Tombol Logout
        Saya menambahkan tombol logout di main.html dengan link ke URL logout. Tombol ini hanya visible ketika user sudah login.
    > Konfigurasi URL Logout
        Path logout ditambahkan dengan path('logout/', logout_user, name='logout').

    d. Merestriksi Akses Halaman
    > Import Login_required Decorator
        Saya mengimpor login_required dari django.contrib.auth.decorators. Decorator ini digunakan untuk membatasi akses hanya untuk user yang sudah login.
    > Menerapkan Decorator pada View Functions
        Saya menambahkan @login_required(login_url='/login') di atas fungsi show_main dan show_products. Decorator ini akan memeriksa status login user sebelum menjalankan fungsi view. Jika user belum login, akan di-redirect ke halaman login.
    > Testing Restriksi Akses
        Setelah implementasi, saya test dengan mengakses halaman utama tanpa login untuk memastikan redirect ke login page bekerja correctly.
    
    e. Menggunakan Cookies untuk Last Login
    > Import Module yang Diperlukan
        Saya mengimpor datetime untuk timestamp, HttpResponseRedirect untuk redirect, dan reverse untuk URL reversal.
    > Modifikasi Fungsi Login_user untuk Set Cookie
        Pada bagian setelah login berhasil, saya membuat HttpResponseRedirect object, kemudian set cookie dengan response.set_cookie('last_login', str(datetime.datetime.now())). Cookie ini menyimpan timestamp login terakhir.
    > Menampilkan Last Login di Halaman Utama
        Saya menambahkan 'last_login': request.COOKIES.get('last_login', 'Never') ke context di fungsi show_main. Value 'Never' digunakan sebagai default jika cookie tidak ada.
    > Modifikasi Fungsi Logout untuk Hapus Cookie
        Pada fungsi logout_user, setelah logout, saya menghapus cookie last_login dengan response.delete_cookie('last_login') sebelum return response.
    > Menampilkan Last Login di Template
        Saya menambahkan <h5>Sesi terakhir login: {{ last_login }}</h5> di main.html untuk menampilkan informasi last login kepada user.

    f. Menghubungkan Model Product dengan User
    > Modifikasi Model Product
        Saya menambahkan user = models.ForeignKey(User, on_delete=models.CASCADE, null=True) ke model Product. ForeignKey ini menghubungkan setiap product dengan user yang membuatnya. Parameter null=True memungkinkan product existing tanpa user selama transisi.
    > Membuat dan Menjalankan Migrasi
        Saya menjalankan python manage.py makemigrations untuk membuat migration file, kemudian python manage.py migrate untuk menerapkan perubahan ke database.
    > Modifikasi Fungsi Create_product
        Pada fungsi create_product, setelah form valid, saya menggunakan form.save(commit=False) untuk mendapatkan product object tanpa langsung menyimpan ke database. Kemudian saya set product_entry.user = request.user untuk menghubungkan product dengan user yang sedang login, baru kemudian product_entry.save().
    > Implementasi Filter Berdasarkan User
        Saya modifikasi fungsi show_main untuk menangani filter berdasarkan user. Dengan parameter GET 'filter', user bisa memilih melihat semua articles atau hanya articles milik sendiri. Saya menggunakan product.objects.filter(user=request.user) untuk mendapatkan product milik user tertentu.
    > Menampilkan Informasi Author
        Saya menambahkan display author information di product_detail.html dengan conditional: jika product memiliki user, tampilkan username; jika tidak, tampilkan 'Anonymous'.
    > Testing Fungsi Ownership
        Saya test dengan membuat dua user account dan membuat product dari masing-masing account untuk memverifikasi bahwa sistem filter dan ownership bekerja dengan benar.

TUGAS 5
 1. Jika terdapat beberapa CSS selector untuk suatu elemen HTML, jelaskan urutan prioritas pengambilan CSS selector tersebut!
=> Urutan prioritas CSS selector dihitung berdasarkan specificity (kekhususan) dengan urutan dari tertinggi ke terendah:
    > Inline Styles (style="...") - Specificity: 1000
    > ID Selectors (#id) - Specificity: 100
    > Class Selectors (.class), Attribute Selectors ([type="text"]), Pseudo-classes (:hover) - Specificity: 10
    > Element Selectors (div, p), Pseudo-elements (::before) - Specificity: 1
    > Universal Selector (*) - Specificity: 0
=> Tetapi ada beberapa aturan khusus juga, di mana:
    > !important - Mengabaikan semua specificity
    > Source Order - Jika specificity sama, yang terakhir ditulis yang menang
    > Inheritance - Style yang diwariskan memiliki specificity terendah

 2. Mengapa responsive design menjadi konsep yang penting dalam pengembangan aplikasi web? Berikan contoh aplikasi yang sudah dan belum menerapkan responsive design, serta jelaskan mengapa!
=> Mengapa Responsive Design Penting:
    > Multi-Device Usage: Pengguna mengakses web dari berbagai perangkat (desktop, tablet, mobile)
    > User Experience: Memastikan pengalaman pengguna optimal di semua ukuran layar
    > SEO Benefits: Google memberikan ranking lebih tinggi untuk website mobile-friendly
    > Maintenance: Lebih mudah maintain satu codebase daripada versi terpisah
    > Cost Effective: Pengembangan dan maintenance lebih hemat
=> Contoh Aplikasi:
    > Sudah Responsive:
        - Amazon: Layout menyesuaikan otomatis dari desktop ke mobile
        - Twitter: Navigasi berubah menjadi hamburger menu di mobile
        - Medium: Typography dan spacing menyesuaikan layar
    > Belum Responsive (atau kurang baik):
        - Website pemerintah lama: Sering fixed width, tidak bisa di-scroll properly di mobile
        - Web aplikasi enterprise lawas: Butuh zoom dan scroll horizontal di mobile
        - Blog template tua: Layout broken di layar kecil

 3. Jelaskan perbedaan antara margin, border, dan padding, serta cara untuk mengimplementasikan ketiga hal tersebut!
=> Margin, border, dan padding adalah bagian dari box model di CSS.
    > Margin → Jarak di luar elemen, memisahkan elemen dari elemen lain. Area nya itu di luar border dan warnanya transparan.
    > Border → Garis pembatas di sekeliling elemen, terletak antara margin dan padding. Border bisa diwarnai backgroundnya, style nya bervariasi, dan bisa dibuat rounded.
    > Padding → Jarak antara isi elemen (content) dengan border. Warnanya tergantung atau mengikuti background elemen. Meningkatkan readability content dan memperbesar touch targets
=> Cara untuk mengimplementasinya:
    > Margin
        - Shorthand properties
            = Semua sisi sama → margin: 10px
            = Vertikal | Horizontal → margin: 10px 20px
            = Top | Horizontal | Bottom → margin: 5px 10px 15px
            = Top | Right | Bottom | Left → margin: 5px 10px 15px 20px
        - Individual properties
            = Hanya sisi atas → margin-top: 15px
            = Hanya sisi kanan → margin-right: 20px
            = Hanya sisi bawah → margin-bottom: 25px
            = Hanya sisi kiri → margin-left: 30px
        - Special Values
            = Pusatkan elemen secara horizontal → margin: auto
            = Top-bottom | right-left → margin: 0 auto
            = Percentage relative to PARENT width → margin: 10%;  
            = Warisi dari parent → margin: inherit
            = Reset ke default value → margin: initial
        - Perilaku khusus, jika elemen a dan elemen b bersebelahan, maka jarak margin nya bukan pertambahan dari margin yang bersebelahan tersebut, tetapi margin yang terbesar yang digunakan.
    > Border
        - Shorthand property
            = width | style | color
        - Inividual Properties per sisi
            = border-sisi
            = border-sisi-width
            = border-sisi-style
            = broder-sisi-color
        - Border style variations
            = solid, dashed, dotted, none, dll.
        - Border Radius (sudut melengkung)
            = Semua sudut sama → border-radius: 5px
            = Top-left | Top-right | Bottom-right | Bottom-left → border-radius: 5px 10px 15px 20px
            = Horizontal / Vertical radii (ellipse) → border-radius: 10px 20px 30px 40px / 5px 10px 15px 20px
            = Individual corners → border-top-left-radius: 
            = Membuat circle → border-radius: 50%
    > Padding
        -  Shorthand Properties
            = Semua sisi sama → padding: 10px
            = Vertikal | Horizontal → padding: 10px 20px
            = Top | Horizontal | Bottom → padding: 5px 10px 15px
            = Top | Right | Bottom | Left → padding: 5px 10px 15px 20px
        -  Individual Properties
            = Hanya sisi atas → padding-top: 15px
            = Hanya sisi kanan → padding-right: 20px
            = Hanya sisi bawah → padding-bottom: 25px
            = Hanya sisi kiri → padding-left: 30px
        - Special values
            = Percentage relative to PARENT width → padding: 5%
            = Relative to font size → padding: 1em
            = Relative to root font size → padding: 1rem
            = Warisi dari parent → padding: inherit
            = Reset ke default → padding: initial

 4. Jelaskan konsep flex box dan grid layout beserta kegunaannya!
 => Keduanya digunakan untuk layouting modern di CSS. Bedanya, Flexbox mengatur item dalam satu garis, sedangkan Grid membangun layout keseluruhan.
    > Flexbox
        Flexbox adalah sebuah sistem tata letak di CSS yang dirancang untuk menyusun elemen secara fleksibel dalam satu arah, yaitu horizontal (baris) atau vertikal (kolom). Dengan flexbox, kita bisa dengan mudah mengatur posisi elemen agar rata kiri, rata kanan, berada di tengah, atau bahkan tersebar merata.
        Kegunaannya antara lain:
            - Membuat navbar yang elemen-elemennya sejajar rapi.
            - Menyusun kartu produk yang ukurannya berbeda agar tetap seimbang.
            - Membuat tombol atau konten bisa otomatis menyesuaikan ruang kosong di dalam container.
        Intinya, flexbox sangat efektif untuk mengatur penyusunan elemen dalam satu garis.
    > Grid Layout
        Grid layout adalah sistem tata letak dua dimensi di CSS, artinya kita bisa menyusun elemen baik dalam baris maupun kolom secara bersamaan. Grid memungkinkan kita membuat struktur halaman yang kompleks dengan mudah, seperti membagi layar menjadi area header, sidebar, konten utama, dan footer.
        Kegunaannya antara lain:
            - Membuat layout halaman web yang memiliki beberapa bagian berbeda (misalnya: header di atas, sidebar di kiri, konten di tengah).
            - Menyusun galeri foto dalam bentuk kotak-kotak rapi.
            - Menyediakan dashboard aplikasi dengan banyak panel yang saling sejajar.
            - Intinya, grid sangat cocok jika kita ingin mengatur struktur keseluruhan halaman dengan banyak kolom dan baris.

 5. Jelaskan bagaimana cara kamu mengimplementasikan checklist di atas secara step-by-step (bukan hanya sekadar mengikuti tutorial)!
=> > Setup Tailwind CSS
        - Memodifikasi base.html. Menambahkan viewport meta tag dan CDN Tailwind CSS di bagian head untuk responsive design dan styling framework
        - Membuat file global.css. Membuat custom CSS di /static/css/global.css untuk styling form yang konsisten
        - Menghubungkan CSS ke template. Menambahkan link ke global.css di base.html menggunakan {% static %} tag
    > Fitur Edit News
        - Membuat view edit_news. Fungsi ini mengambil data news berdasarkan ID, memvalidasi form, dan menyimpan perubahan
        - Membuat template edit_news.html. Template form untuk mengedit data news yang sudah ada
        - Konfigurasi URL. Menambahkan route untuk mengakses halaman edit
        - Integrasi ke main.html. Menambahkan tombol edit di setiap news item dengan kondisi hanya tampil untuk pemilik news
    > Fitur Delete News
        - Membuat view delete_news. Fungsi untuk menghapus data news berdasarkan ID
        - Konfigurasi URL. Menambahkan route untuk delete functionality
        - Integrasi ke main.html. Menambahkan tombol delete dengan konfirmasi implisit (langsung eksekusi)
    > Navigation Bar
        - Membuat navbar.html. Komponen navbar terpisah dengan styling Tailwind CSS
        - Responsive design. Mengimplementasikan hamburger menu untuk mobile view
        - JavaScript toggle. Menambahkan script sederhana untuk show/hide mobile menu
        - Integrasi ke main templat. Menggunakan {% include 'navbar.html' %} di main.html
    > Static Files Configuration
        - Menambahkan WhiteNoise. Middleware untuk serving static files di production
        - Konfigurasi STATIC settings. Setup STATIC_URL, STATICFILES_DIRS, dan STATIC_ROOT
        - Membuat struktur direktori. /static/css/ dan /static/image/ untuk organisasi file
    > Styling Halaman
        - Login & Register Pages
            = Layout redesign. Menggunakan card-based design dengan shadow dan border
            = Form styling. Konsisten menggunakan class form-style dari global.css
            = Error handling. Menampilkan error messages dengan styling yang user-friendly
            = Responsive desig. Flexbox layout yang adaptif ke berbagai screen size
        - Home Page (Main)
            = Card component. Membuat card_news.html terpisah untuk reusable news card
            = Grid layout. Menggunakan Tailwind grid system untuk tata letak responsif
            = Empty state. Menampilkan ilustrasi ketika tidak ada news
            = Filter system. Implementasi filter "All News" vs "My News"
        - Detail News Page
            = Article layout. Structured content dengan header, thumbnail, dan content sections
            = Badge system. Menampilkan category, featured, dan hot status dengan color coding
            = Back navigation. Konsisten di semua detail pages
        - Create & Edit News Pages
            = Form consistency. Menggunakan styling yang sama untuk create dan edit forms
            = Layout optimization. Max-width container untuk readability yang baik
            = Action buttons. Clear primary dan secondary actions

TUGAS 6
1. Apa perbedaan antara synchronous request dan asynchronous request?
=> Synchronous Request adalah jenis permintaan yang bersifat memblokir atau blocking. Ketika browser mengirimkan synchronous request ke server, seluruh aktivitas pada halaman web akan terhenti dan pengguna tidak dapat berinteraksi dengan halaman tersebut sampai respons diterima sepenuhnya dari server. Prosesnya berjalan secara sekuensial seperti antrian, di mana setiap permintaan harus menunggu permintaan sebelumnya selesai diproses. Ini mirip dengan mengantri di loket dimana kita harus menunggu sampai orang depan selesai dilayani sebelum giliran kita tiba. Ketika menggunakan synchronous request, browser akan benar-benar freeze dan pengguna akan melihat loading indicator pada tab browser mereka.

=> Asynchronous Request adalah kebalikan dari synchronous, yang bersifat non-blocking. Ketika browser mengirimkan asynchronous request, pengguna tetap dapat berinteraksi dengan halaman web secara normal tanpa gangguan. Permintaan dikirim di background sementara interface tetap responsif. Multiple request dapat dikirim bersamaan tanpa harus menunggu yang sebelumnya selesai. Ini seperti memesan makanan di restoran sambil tetap bisa mengobrol dengan teman - kita tidak perlu diam menunggu sampai makanan datang. AJAX menggunakan pendekatan asynchronous ini sehingga halaman web dapat memperbarui sebagian konten tanpa perlu me-refresh seluruh halaman.

2. Bagaimana AJAX bekerja di Django (alur request–response)?
=> Cara kerja AJAX di Django mengikuti alur request-response yang terstruktur. 
- Pertama, di sisi client (browser), JavaScript mengirimkan permintaan HTTP ke server Django tanpa perlu reload halaman. Permintaan ini biasanya dikenali melalui header 'X-Requested-With' yang bernilai 'XMLHttpRequest'. 
- Kemudian, request tersebut masuk melalui sistem routing URL Django yang akan menuntunnya ke view function yang sesuai.
- Di sisi server, Django view menerima permintaan dan memprosesnya. View function akan melakukan operasi yang diperlukan seperti mengambil data dari database, memproses form, atau melakukan autentikasi. 
- Setelah selesai memproses, Django tidak mengembalikan template HTML lengkap seperti biasanya, melainkan mengembalikan data dalam format JSON melalui JsonResponse. Data JSON ini berisi hanya informasi yang diperlukan, bukan seluruh struktur halaman web.
- Terakhir, di sisi client kembali, JavaScript menerima respons JSON tersebut dan mem-parsing datanya. Berdasarkan data yang diterima, JavaScript kemudian memperbarui bagian tertentu dari halaman web menggunakan DOM manipulation, tanpa perlu me-load ulang seluruh halaman. 
- Seluruh proses ini terjadi di background sehingga pengguna dapat terus menggunakan aplikasi tanpa mengalami interupsi.

3. Apa keuntungan menggunakan AJAX dibandingkan render biasa di Django?
=> Keuntungan utama menggunakan AJAX dibanding render tradisional di Django adalah :
- Peningkatan signifikan dalam pengalaman pengguna. Dengan AJAX, interaksi dengan aplikasi web terasa lebih cepat dan responsif karena hanya bagian tertentu dari halaman yang diperbarui, bukan seluruh halaman. Ini menghilangkan efek "flash" atau "blink" yang terjadi saat halaman direload, menciptakan pengalaman yang lebih smooth dan natural seperti aplikasi desktop.

- AJAX lebih efisien dalam penggunaan bandwidth dari segi performa karena hanya data mentah (biasanya dalam format JSON) yang ditransfer antara client dan server, bukan seluruh struktur HTML yang mungkin mengandung elemen-elemen yang tidak berubah. Hal ini juga mengurangi beban pada server karena tidak perlu merender template HTML untuk setiap permintaan kecil.

- AJAX memungkinkan implementasi fitur-fitur interaktif yang tidak mungkin dilakukan dengan pendekatan tradisional, seperti auto-save, real-time search suggestions, infinite scrolling, dan update real-time. 

- Selain itu, arsitektur yang memisahkan concern antara frontend dan backend membuat kode lebih modular dan mudah dikelola, serta memungkinkan pengembangan yang lebih terstruktur.

4. Bagaimana cara memastikan keamanan saat menggunakan AJAX untuk fitur Login dan Register di Django?
=> - Meningkatkan keamanan di fitur login dan register
        Keamanan saat menggunakan AJAX untuk fitur login dan register di Django harus diperhatikan secara khusus karena menyangkut data sensitif pengguna. Pertama, perlindungan CSRF (Cross-Site Request Forgery) harus tetap diimplementasikan dengan menyertakan token CSRF dalam setiap permintaan AJAX. Token ini memastikan bahwa request berasal dari situs yang sah dan bukan dari sumber yang tidak terpercaya.

    - Validasi input
        Validasi input harus dilakukan baik di sisi client maupun server. Meskipun validasi client memberikan feedback yang cepat kepada pengguna, validasi server tetap wajib dilakukan karena client-side validation dapat di-bypass. Django forms dan model validation harus tetap digunakan untuk memastikan data yang masuk memenuhi kriteria keamanan.

    - Implementasi rate limiting 
        Implementasi rate limiting penting untuk mencegah serangan brute force pada fitur login. Dengan membatasi jumlah percobaan login dalam periode waktu tertentu, kita dapat mengurangi risiko akun dibobol melalui trial and error. Keempat, penggunaan HTTPS wajib untuk mengenkripsi data yang dikirimkan, terutama untuk informasi sensitif seperti password.

    - Pengelolaan session
        Pengelolaan session yang aman harus diperhatikan, seperti mengatur cookie dengan flag HttpOnly dan Secure, serta implementasi timeout session yang wajar. Terakhir, sanitasi data input untuk mencegah serangan XSS (Cross-Site Scripting) dengan membersihkan input dari tag HTML dan JavaScript yang berbahaya sebelum disimpan ke database.

5. Bagaimana AJAX mempengaruhi pengalaman pengguna (User Experience) pada website?
=> AJAX memiliki pengaruh yang sangat signifikan dan positif terhadap pengalaman pengguna pada website. Yang paling terasa adalah peningkatan responsivitas aplikasi - interaksi terasa instan dan langsung tanpa delay yang mengganggu. Pengguna tidak perlu menunggu halaman reload untuk setiap aksi kecil seperti mengklik like, menambah item ke keranjang, atau mengirim pesan.

Dampak positif kedua adalah kelancaran interaksi yang membuat aplikasi web terasa seperti aplikasi native. Transisi yang smooth, update yang seamless, dan feedback yang immediate menciptakan ilusi bahwa semuanya terjadi secara real-time. Ini membangun kesan profesional dan modern pada website.

Ketiga, AJAX memungkinkan implementasi pola interaksi yang lebih canggih seperti infinite scrolling yang menghilangkan kebutuhan untuk klik halaman berikutnya, auto-complete yang membantu pengguna menemukan apa yang mereka cari lebih cepat, dan auto-save yang mencegah kehilangan data secara tidak sengaja.

Namun, ada juga tantangan yang perlu diatasi untuk memastikan pengalaman pengguna tetap optimal. Perlu indikator loading yang jelas untuk operasi yang memakan waktu, penanganan error yang graceful ketika koneksi bermasalah, dan pengelolaan history browser yang tepat agar tombol back/forward tetap berfungsi seperti yang diharapkan pengguna. Dengan implementasi yang baik, AJAX dapat mengubah website statis menjadi aplikasi web yang dinamis dan engaging.
