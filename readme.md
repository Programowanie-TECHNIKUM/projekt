# Projekt Stake 🎯

Nowoczesna aplikacja webowa do zarządzania użytkownikami z systemem uwierzytelniania JWT, zbudowana w architekturze full-stack z wykorzystaniem najnowszych technologii.

## 📋 Spis treści

- [🚀 Przegląd projektu](#-przegląd-projektu)
- [🛠️ Stack technologiczny](#️-stack-technologiczny)
- [🏗️ Architektura](#️-architektura)
- [🔌 Porty i usługi](#-porty-i-usługi)
- [📁 Struktura projektu](#-struktura-projektu)
- [⚡ Szybki start](#-szybki-start)
- [🔧 Instalacja](#-instalacja)
- [📖 API Documentation](#-api-documentation)
- [🐳 Docker](#-docker)
- [🔐 Uwierzytelnianie](#-uwierzytelnianie)
- [🤝 Wkład w projekt](#-wkład-w-projekt)

## 🚀 Przegląd projektu

Projekt Stake to kompletna aplikacja webowa oferująca:

- **Rejestracja i logowanie użytkowników** z bezpiecznym hashowaniem haseł
- **System uwierzytelniania JWT** z sesją przechowywaną w Redis
- **Nowoczesny frontend** zbudowany w React z Vite
- **Scalalna architektura backend** wykorzystująca Express.js i Bun
- **Konteneryzacja** z Docker Compose
- **Dwubazowy system** - MongoDB dla danych użytkowników, Redis dla sesji

## 🛠️ Stack technologiczny

### Backend
- **Runtime**: [Bun](https://bun.sh/) - ultraszybki runtime JavaScript/TypeScript
- **Framework**: Express.js 5.1.0
- **Język**: TypeScript
- **Bazy danych**: 
  - MongoDB 8.19.1 (dane użytkowników)
  - Redis 5.8.3 (sesje JWT)
- **Uwierzytelnianie**: 
  - bcrypt 6.0.0 (hashowanie haseł)
  - jsonwebtoken 9.0.2 (JWT tokens)
- **Inne**: 
  - CORS 2.8.5
  - random-words 2.0.1

### Frontend
- **Framework**: React 19.1.1
- **Bundler**: Vite 7.1.7
- **Routing**: React Router DOM 7.9.3
- **Język**: JavaScript (JSX)
- **Linting**: ESLint 9.36.0

### DevOps & Tools
- **Konteneryzacja**: Docker & Docker Compose
- **Bazy danych**: MongoDB latest, Redis latest
- **Package Manager**: Bun

## 🏗️ Architektura

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│                 │    │                 │    │                 │
│    Frontend     │◄──►│     Backend     │◄──►│    Databases    │
│   (React/Vite)  │    │  (Express/Bun)  │    │ MongoDB + Redis │
│                 │    │                 │    │                 │
└─────────────────┘    └─────────────────┘    └─────────────────┘
        │                        │                        │
     Port 5173              Port 3000              Ports 27017/6379
```

## 🔌 Porty i usługi

| Usługa | Port | Opis |
|--------|------|------|
| **Frontend** | `5173` | Serwer deweloperski Vite |
| **Backend** | `3000` | API Express.js |
| **MongoDB** | `27017` | Baza danych dokumentów |
| **Redis** | `6379` | Cache i sesje JWT |

## 📁 Struktura projektu

```
projekt-stake/
├── 📄 package.json              # Zależności główne projektu
├── 📄 docker-compose.yml        # Konfiguracja kontenerów
├── 📄 readme.md                 # Dokumentacja projektu
│
├── 📁 backend/                  # Kod serwera API
│   ├── 📄 index.ts              # Punkt wejścia aplikacji
│   ├── 📄 package.json          # Zależności backend
│   ├── 📄 dockerfile            # Kontener backend
│   │
│   ├── 📁 modules/              # Moduły funkcjonalne
│   │   ├── 📄 createUser.ts     # Rejestracja użytkowników
│   │   ├── 📄 loginUser.ts      # Logowanie użytkowników
│   │   ├── 📄 logoutUser.ts     # Wylogowanie
│   │   └── 📄 checkJWTinDB.ts   # Walidacja JWT
│   │
│   ├── 📁 misc/                 # Funkcje pomocnicze
│   │   ├── 📄 checkPassword.ts  # Weryfikacja hasła
│   │   ├── 📄 checkUserExists.ts
│   │   │
│   │   ├── 📁 databases/        # Konfiguracja baz danych
│   │   │   ├── 📄 connectMongo.ts
│   │   │   └── 📄 connectRedis.ts
│   │   │
│   │   └── 📁 JWT/              # Zarządzanie tokenami
│   │       ├── 📄 createJWT.ts
│   │       ├── 📄 checkJWTinDB.ts
│   │       ├── 📄 addJWTintoDatabase.ts
│   │       └── 📄 removeJWTfromDB.ts
│   │
│   └── 📁 middleware/           # Middleware Express
│
└── 📁 frontend/                 # Aplikacja React
    ├── 📄 package.json          # Zależności frontend
    ├── 📄 vite.config.js        # Konfiguracja Vite
    ├── 📄 index.html            # Szablon HTML
    │
    └── 📁 src/                  # Kod źródłowy React
        ├── 📄 App.jsx           # Główny komponent aplikacji
        ├── 📄 main.jsx          # Punkt wejścia React
        │
        ├── 📁 pages/            # Komponenty stron
        │   ├── 📄 HomePage.jsx  # Strona główna
        │   └── 📄 loginPage.jsx # Strona logowania
        │
        ├── 📁 misc/             # Funkcje pomocnicze
        │   ├── 📄 checkValidJWTtoken.js
        │   └── 📄 decodeJWTtoken.js
        │
        └── 📁 assets/           # Zasoby statyczne
```

## ⚡ Szybki start

### Wymagania
- [Bun](https://bun.sh/) (najnowsza wersja)
- [Docker](https://www.docker.com/) & Docker Compose
- Git

### 1. Uruchomienie baz danych
```bash
# Uruchom MongoDB i Redis w kontenerach
docker-compose up -d
```

### 2. Backend
```bash
cd backend
bun install
bun run index.ts
```

### 3. Frontend
```bash
cd frontend
bun install
bun run dev
```

### 4. Dostęp do aplikacji
- **Frontend**: http://localhost:5173
- **Backend API**: http://localhost:3000
- **MongoDB**: mongodb://localhost:27017
- **Redis**: redis://localhost:6379

## 🔧 Instalacja

### Instalacja krok po kroku

1. **Klonowanie repozytorium**
```bash
git clone <repository-url>
cd projekt-stake
```

2. **Instalacja zależności głównych**
```bash
bun install
```

3. **Konfiguracja backend**
```bash
cd backend
bun install
```

4. **Konfiguracja frontend**
```bash
cd frontend
bun install
```

5. **Uruchomienie baz danych**
```bash
# W katalogu głównym
docker-compose up -d
```

6. **Uruchomienie aplikacji**

**Terminal 1 - Backend:**
```bash
cd backend
bun run index.ts
```

**Terminal 2 - Frontend:**
```bash
cd frontend
bun run dev
```

### Zmienne środowiskowe

Backend automatycznie łączy się z bazami danych na portach domyślnych:
- `MONGODB`: mongodb://localhost:27017
- `REDIS_URL`: redis://localhost:6379
- `PORT`: 3000 (domyślny)

## 📖 API Documentation

### Endpointy

#### 🔐 Uwierzytelnianie

**POST** `/users/createUser`
- **Opis**: Rejestracja nowego użytkownika
- **Body**:
```json
{
  "nick": "string",
  "password": "string", 
  "repeatPassword": "string"
}
```
- **Odpowiedź**: `201` - Użytkownik utworzony

**POST** `/users/loginUser`
- **Opis**: Logowanie użytkownika
- **Body**:
```json
{
  "nick": "string",
  "password": "string"
}
```
- **Odpowiedź**: 
```json
{
  "message": "Zalogowano pomyślnie",
  "jwt": "token"
}
```

**DELETE** `/users/logoutUser`
- **Opis**: Wylogowanie użytkownika
- **Body**:
```json
{
  "jwt": "token"
}
```
- **Odpowiedź**: `200` - Wylogowano pomyślnie

**GET** `/users/checkJWT`
- **Opis**: Sprawdzenie ważności tokena JWT
- **Headers**: `Authorization: Bearer <token>`
- **Odpowiedź**: `200` - Token ważny / `401` - Token nieważny

### Funkcje bezpieczeństwa

- **Hashowanie haseł**: bcrypt z automatycznym saltingiem
- **JWT Tokens**: Bezpieczne tokeny z podpisem cyfrowym
- **Sesje w Redis**: Centralne zarządzanie aktywnymi sesjami
- **CORS**: Skonfigurowane dla komunikacji cross-origin
- **Walidacja danych**: Kontrola poprawności danych wejściowych

## 🐳 Docker

### Uruchomienie całego stacku

```bash
# Uruchomienie baz danych
docker-compose up -d

# Sprawdzenie statusu kontenerów
docker-compose ps

# Logi kontenerów
docker-compose logs -f

# Zatrzymanie
docker-compose down
```

### Konfiguracja Docker Compose

```yaml
services:
  mongodb:
    image: mongo:latest
    ports:
      - "27017:27017"
    volumes:
      - mongo-data:/data/db
      
  redis:
    image: redis:latest  
    ports:
      - "6379:6379"
```

## 🔐 Uwierzytelnianie

### Przepływ uwierzytelniania

1. **Rejestracja**: Hasło jest hashowane przez bcrypt przed zapisem
2. **Logowanie**: Weryfikacja hasła i utworzenie JWT
3. **Sesja**: JWT jest przechowywany w Redis dla szybkiej walidacji
4. **Dostęp**: Każde żądanie sprawdza ważność JWT w Redis
5. **Wylogowanie**: Token jest usuwany z Redis

### Bezpieczeństwo

- Hasła nigdy nie są przechowywane w formie jawnej
- JWT zawiera tylko niezbędne informacje (nick użytkownika)
- Sesje mają kontrolowane życie w Redis
- Wszystkie endpointy API używają HTTPS w produkcji

## 🤝 Wkład w projekt

1. Fork repozytorium
2. Utwórz branch feature (`git checkout -b feature/amazing-feature`)
3. Commit zmian (`git commit -m 'Add amazing feature'`)
4. Push do branch (`git push origin feature/amazing-feature`)
5. Otwórz Pull Request

---

**Projekt Stake** - Nowoczesna aplikacja full-stack z uwierzytelnianiem JWT 🚀

projekt slotsow z pytaniami inf04

# projekt
# projekt
# projekt
# projekt
# projekt
# projekt
